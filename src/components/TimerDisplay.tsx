interface Props {
  secondsLeft: number;
}

function format(seconds: number): string {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

export function TimerDisplay({ secondsLeft }: Props) {
  return (
    <div className="bg-[#f8e1dd] px-8 py-4 border-2 border-[#1D1D1D]">
      <span className="font-jersey25 text-[100px] leading-none text-[#1d1d1d]">
        {format(secondsLeft)}
      </span>
    </div>
  );
}
