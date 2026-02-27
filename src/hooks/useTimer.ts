import { useState, useRef, useCallback, useEffect } from 'react';
import type { TimerStatus } from '../lib/types';

const TOTAL_SECONDS = 25 * 60;
const STORAGE_KEY = 'frogodoro-timer';

type PersistedTimer =
  | { status: 'running'; startedAt: number; secondsAtStart: number }
  | { status: 'paused'; secondsLeft: number };

function saveToStorage(data: PersistedTimer) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch {}
}

function clearFromStorage() {
  try { localStorage.removeItem(STORAGE_KEY); } catch {}
}

function loadFromStorage(): PersistedTimer | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as PersistedTimer) : null;
  } catch {
    return null;
  }
}

interface UseTimerReturn {
  secondsLeft: number;
  status: TimerStatus;
  start: () => void;
  pause: () => void;
  reset: () => void;
}

export function useTimer(onComplete: () => void): UseTimerReturn {
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  // Initialize state from localStorage so there's no flicker on restore
  const [secondsLeft, setSecondsLeft] = useState<number>(() => {
    const p = loadFromStorage();
    if (!p) return TOTAL_SECONDS;
    if (p.status === 'paused') return p.secondsLeft;
    const elapsed = Math.floor((Date.now() - p.startedAt) / 1000);
    return Math.max(0, p.secondsAtStart - elapsed);
  });

  const [status, setStatus] = useState<TimerStatus>(() => {
    const p = loadFromStorage();
    if (!p) return 'idle';
    if (p.status === 'paused') return 'paused';
    const elapsed = Math.floor((Date.now() - p.startedAt) / 1000);
    return Math.max(0, p.secondsAtStart - elapsed) > 0 ? 'running' : 'complete';
  });

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startedAtRef = useRef<number>(0);
  const secondsAtStartRef = useRef<number>(TOTAL_SECONDS);
  const secondsLeftRef = useRef<number>(secondsLeft);
  const statusRef = useRef<TimerStatus>(status);

  useEffect(() => { secondsLeftRef.current = secondsLeft; }, [secondsLeft]);
  useEffect(() => { statusRef.current = status; }, [status]);

  const clearTimerInterval = useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // Shared interval starter — uses explicit params so the closure is always fresh
  const startInterval = useCallback((startedAt: number, secondsAtStart: number) => {
    intervalRef.current = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startedAt) / 1000);
      const remaining = Math.max(0, secondsAtStart - elapsed);
      setSecondsLeft(remaining);
      if (remaining <= 0) {
        clearInterval(intervalRef.current!);
        intervalRef.current = null;
      }
    }, 1000);
  }, []);

  // On mount: if we restored a running timer, restart the interval;
  // if it already expired, fire completion immediately.
  useEffect(() => {
    const p = loadFromStorage();
    if (p?.status === 'running') {
      const elapsed = Math.floor((Date.now() - p.startedAt) / 1000);
      const remaining = Math.max(0, p.secondsAtStart - elapsed);
      startedAtRef.current = p.startedAt;
      secondsAtStartRef.current = p.secondsAtStart;
      if (remaining > 0) {
        startInterval(p.startedAt, p.secondsAtStart);
      } else {
        clearFromStorage();
        setStatus('complete');
        onCompleteRef.current();
      }
    } else if (statusRef.current === 'complete') {
      clearFromStorage();
      onCompleteRef.current();
    }
    return () => clearTimerInterval();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Fire completion whenever the tick lands on 0 while running
  useEffect(() => {
    if (secondsLeft === 0 && statusRef.current === 'running') {
      clearFromStorage();
      setStatus('complete');
      onCompleteRef.current();
    }
  }, [secondsLeft]);

  // Immediately catch up when the tab becomes visible again
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState !== 'visible') return;
      if (statusRef.current !== 'running') return;
      const elapsed = Math.floor((Date.now() - startedAtRef.current) / 1000);
      const remaining = Math.max(0, secondsAtStartRef.current - elapsed);
      setSecondsLeft(remaining);
      if (remaining <= 0) {
        clearTimerInterval();
        clearFromStorage();
        setStatus('complete');
        onCompleteRef.current();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [clearTimerInterval]);

  const start = useCallback(() => {
    clearTimerInterval();
    const initial = secondsLeftRef.current === 0 ? TOTAL_SECONDS : secondsLeftRef.current;
    secondsAtStartRef.current = initial;
    startedAtRef.current = Date.now();
    setSecondsLeft(initial);
    setStatus('running');
    saveToStorage({ status: 'running', startedAt: startedAtRef.current, secondsAtStart: initial });
    startInterval(startedAtRef.current, initial);
  }, [clearTimerInterval, startInterval]);

  const pause = useCallback(() => {
    clearTimerInterval();
    setStatus('paused');
    saveToStorage({ status: 'paused', secondsLeft: secondsLeftRef.current });
  }, [clearTimerInterval]);

  const reset = useCallback(() => {
    clearTimerInterval();
    clearFromStorage();
    secondsLeftRef.current = TOTAL_SECONDS;
    setSecondsLeft(TOTAL_SECONDS);
    setStatus('idle');
  }, [clearTimerInterval]);

  return { secondsLeft, status, start, pause, reset };
}
