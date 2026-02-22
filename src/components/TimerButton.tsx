import type { TimerStatus } from '../lib/types';

interface Props {
  status: TimerStatus;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
}

export function TimerButton({ status, onStart, onPause, onReset }: Props) {
  const isRunning = status === 'running';
  const showReset = status !== 'idle';

  return (
    <div className="flex flex-col items-center gap-3 w-full">
      <button
        onClick={isRunning ? onPause : onStart}
        className="bg-[#dbeaa3] w-full py-4 border-2 border-[#1D1D1D] font-jersey25 text-[48px] leading-none text-[#1d1d1d] hover:brightness-95 active:scale-[0.98] transition-all"
      >
        {isRunning ? 'PAUSE' : 'START'}
      </button>
      {showReset && (
        <button
          onClick={onReset}
          className="font-jersey25 text-[24px] text-[#1d1d1d] opacity-60 hover:opacity-100 transition-opacity"
        >
          RESET
        </button>
      )}
    </div>
  );
}
