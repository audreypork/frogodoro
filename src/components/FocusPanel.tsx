import { useEffect, useRef } from 'react';
import { useTimer } from '../hooks/useTimer';
import { IndicatorDot } from './IndicatorDot';
import { playClick, playTick } from '../lib/sounds';

interface Props {
  onSessionComplete: () => void;
  awaitingSelection: boolean;
  mobile?: boolean;
}

function getFrogSrc(secondsLeft: number, awaitingSelection: boolean): string {
  if (awaitingSelection)       return '/assets/frog-36.png';
  if (secondsLeft > 20 * 60)  return '/assets/frog-31.png';
  if (secondsLeft > 15 * 60)  return '/assets/frog-32.png';
  if (secondsLeft > 10 * 60)  return '/assets/frog-33.png';
  if (secondsLeft > 5 * 60)   return '/assets/frog-34.png';
  return '/assets/frog-36.png';
}

function getBubbleSrc(secondsLeft: number): string {
  if (secondsLeft > 20 * 60) return '/assets/bubble-zzzz.png';
  if (secondsLeft > 15 * 60) return '/assets/bubble-hmm.png';
  if (secondsLeft > 10 * 60) return '/assets/bubble-ohhey.png';
  if (secondsLeft > 5 * 60)  return '/assets/bubble-omg.png';
  return '/assets/bubble-waaaah.png';
}

function format(seconds: number): string {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

export function FocusPanel({ onSessionComplete, awaitingSelection, mobile }: Props) {
  const { secondsLeft, status, start, pause, reset } = useTimer(onSessionComplete);
  const isRunning = status === 'running';
  const showReset = status !== 'idle';

  useEffect(() => {
    if (isRunning && secondsLeft <= 5 && secondsLeft > 0) {
      playTick();
    }
  }, [secondsLeft, isRunning]);

  const prevAwaiting = useRef(awaitingSelection);
  useEffect(() => {
    if (prevAwaiting.current && !awaitingSelection) {
      reset();
    }
    prevAwaiting.current = awaitingSelection;
  }, [awaitingSelection, reset]);

  return (
    <div className={`${mobile ? 'w-full flex-1 min-h-0 overflow-hidden' : 'w-[722px] h-[667px]'} bg-[#ffedeb] border-2 border-[#1D1D1D] flex flex-col transition-opacity duration-500 ${awaitingSelection ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>

      {/* Title bar */}
      <div className="flex items-center gap-2 px-5 h-[56px] border-b-2 border-[#1D1D1D] flex-shrink-0">
        <IndicatorDot color="#92bd51" />
        <span className="font-jersey10 text-[28px] text-[#5E5E5E] tracking-[0.02em] whitespace-nowrap">FOCUS TIME</span>
        <div className="flex-1 flex flex-col gap-[3px] ml-2">
          <div className="h-[1.5px] bg-[#1D1D1D]" />
          <div className="h-[1.5px] bg-[#1D1D1D]" />
        </div>
      </div>

      {/* Frog area */}
      <div className="flex-1 min-h-0 flex flex-col items-center justify-center border-b-2 border-[#1D1D1D] overflow-hidden py-4 gap-3">
        <img
          src={getFrogSrc(secondsLeft, awaitingSelection)}
          alt="frog"
          className="flex-1 min-h-0 object-contain"
        />
        <img
          src={getBubbleSrc(secondsLeft)}
          alt="frog message"
          className="h-[72px] object-contain"
        />
      </div>

      {/* Bottom bar: timer + action button */}
      <div className="flex items-stretch h-[120px] flex-shrink-0">
        <div className="flex-1 relative flex items-center justify-center">
          <span className="font-jersey25 text-[52px] lg:text-[80px] leading-none text-[#1d1d1d]">
            {format(secondsLeft)}
          </span>
          {showReset && (
            <button
              onClick={reset}
              className="absolute left-[calc(50%+120px)] opacity-65 hover:opacity-90 transition-opacity"
            >
              <img src="/assets/icon-reset.png" alt="Reset" className="w-[52px] h-[52px] object-contain" />
            </button>
          )}
        </div>
        <button
          onClick={() => { isRunning ? pause() : start(); playClick(); }}
          className={`px-6 lg:w-[220px] lg:px-0 border-l-2 border-[#1D1D1D] font-jersey25 text-[48px] leading-none text-[#1d1d1d] hover:brightness-95 active:scale-[0.98] transition-all ${isRunning ? 'bg-[#D69191]' : 'bg-[#dbeaa3]'}`}
        >
          {isRunning ? 'PAUSE' : 'START'}
        </button>
      </div>

    </div>
  );
}
