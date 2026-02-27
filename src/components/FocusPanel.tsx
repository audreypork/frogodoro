import React, { useEffect, useRef, useState } from 'react';
import { useTimer } from '../hooks/useTimer';
import { IndicatorDot } from './IndicatorDot';
import { playClick, playTick, playNom } from '../lib/sounds';
import type { FoodKey } from '../lib/types';

interface Props {
  onSessionComplete: () => void;
  awaitingSelection: boolean;
  onFoodDrop?: (food: FoodKey) => void;
  mobile?: boolean;
  frogOnly?: boolean;
}

function getFrogSrc(secondsLeft: number, awaitingSelection: boolean, isEating: boolean): string {
  if (isEating)                return '/assets/frog-31.png';
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

export function FocusPanel({ onSessionComplete, awaitingSelection, onFoodDrop, mobile, frogOnly }: Props) {
  const { secondsLeft, status, start, pause, reset } = useTimer(onSessionComplete);
  const isRunning = status === 'running';
  const showReset = status !== 'idle';

  const [isDragOver, setIsDragOver] = useState(false);
  const [isEating, setIsEating] = useState(false);
  const dragCounter = useRef(0);

  useEffect(() => {
    if (isRunning && secondsLeft <= 5 && secondsLeft > 0) {
      playTick();
    }
  }, [secondsLeft, isRunning]);

  const prevAwaiting = useRef(awaitingSelection);
  useEffect(() => {
    if (prevAwaiting.current && !awaitingSelection) {
      reset();
      dragCounter.current = 0;
      setIsDragOver(false);
    }
    prevAwaiting.current = awaitingSelection;
  }, [awaitingSelection, reset]);

  const handleDragEnter = (e: React.DragEvent) => { e.preventDefault(); dragCounter.current++; setIsDragOver(true); };
  const handleDragOver  = (e: React.DragEvent) => { e.preventDefault(); e.dataTransfer.dropEffect = 'move'; };
  const handleDragLeave = ()                   => { dragCounter.current--; if (dragCounter.current === 0) setIsDragOver(false); };
  const handleDrop      = (e: React.DragEvent) => {
    e.preventDefault();
    dragCounter.current = 0;
    setIsDragOver(false);
    const key = e.dataTransfer.getData('text/plain') as FoodKey;
    if (key && onFoodDrop) {
      playNom();
      setIsEating(true);
      setTimeout(() => setIsEating(false), 3000);
      onFoodDrop(key);
    }
  };

  return (
    <div className={`${frogOnly ? 'w-full h-[220px] flex-shrink-0' : mobile ? 'w-full flex-1 min-h-0 overflow-hidden' : 'flex-[2] min-w-0 md:h-[500px] lg:h-[600px] xl:flex-none xl:w-[722px] xl:h-[667px]'} bg-[#ffedeb] border-2 border-[#1D1D1D] flex flex-col transition-opacity duration-500 ${awaitingSelection && !frogOnly ? 'opacity-50' : 'opacity-100'}`}>

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
      <div
        className={`flex-1 min-h-0 flex flex-col items-center justify-center border-b-2 border-[#1D1D1D] overflow-hidden py-4 gap-3 transition-colors duration-150 ${isDragOver ? 'bg-[#f5c4bd]' : ''}`}
        onDragEnter={awaitingSelection ? handleDragEnter : undefined}
        onDragOver={awaitingSelection ? handleDragOver : undefined}
        onDragLeave={awaitingSelection ? handleDragLeave : undefined}
        onDrop={awaitingSelection ? handleDrop : undefined}
      >
        <img
          src={getFrogSrc(secondsLeft, awaitingSelection, isEating)}
          alt="frog"
          className={`flex-1 min-h-0 object-contain transition-transform duration-150 ${isDragOver ? 'scale-110' : ''} ${isEating ? 'crunch' : ''}`}
        />
        {!frogOnly && (
          <img
            src={getBubbleSrc(secondsLeft)}
            alt="frog message"
            className="h-[72px] object-contain"
          />
        )}
      </div>

      {/* Bottom bar: timer + action button */}
      {!frogOnly && <div className={`flex items-stretch h-[120px] flex-shrink-0 ${awaitingSelection ? 'pointer-events-none' : ''}`}>
        <div className="flex-1 relative flex items-center justify-center gap-3">
          <span className="font-jersey25 text-[52px] xl:text-[80px] leading-none text-[#1d1d1d]">
            {format(secondsLeft)}
          </span>
          {showReset && (
            <button
              onClick={reset}
              className="opacity-65 hover:opacity-90 transition-opacity flex-shrink-0"
            >
              <img src="/assets/icon-reset.png" alt="Reset" className="w-[40px] h-[40px] xl:w-[52px] xl:h-[52px] object-contain" />
            </button>
          )}
        </div>
        <button
          onClick={() => { isRunning ? pause() : start(); playClick(); }}
          className={`px-6 xl:w-[220px] xl:px-0 border-l-2 border-[#1D1D1D] font-jersey25 text-[48px] leading-none text-[#1d1d1d] hover:brightness-95 active:scale-[0.98] transition-all ${isRunning ? 'bg-[#D69191]' : 'bg-[#dbeaa3]'}`}
        >
          {isRunning ? 'PAUSE' : 'START'}
        </button>
      </div>}

    </div>
  );
}
