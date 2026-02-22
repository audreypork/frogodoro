import { useState, useRef, useCallback, useEffect } from 'react';
import type { TimerStatus } from '../lib/types';

const TOTAL_SECONDS = 25 * 60;

interface UseTimerReturn {
  secondsLeft: number;
  status: TimerStatus;
  start: () => void;
  pause: () => void;
  reset: () => void;
}

export function useTimer(onComplete: () => void): UseTimerReturn {
  const [secondsLeft, setSecondsLeft] = useState(TOTAL_SECONDS);
  const [status, setStatus] = useState<TimerStatus>('idle');
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const clearTimer = useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (secondsLeft === 0 && status === 'running') {
      setStatus('complete');
      onCompleteRef.current();
    }
  }, [secondsLeft, status]);

  const start = useCallback(() => {
    setSecondsLeft((prev) => {
      const next = prev === 0 ? TOTAL_SECONDS : prev;
      return next;
    });
    setStatus('running');
    intervalRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          intervalRef.current = null;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  const pause = useCallback(() => {
    clearTimer();
    setStatus('paused');
  }, [clearTimer]);

  const reset = useCallback(() => {
    clearTimer();
    setSecondsLeft(TOTAL_SECONDS);
    setStatus('idle');
  }, [clearTimer]);

  return { secondsLeft, status, start, pause, reset };
}
