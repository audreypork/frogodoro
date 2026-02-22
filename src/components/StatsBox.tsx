import { FOOD_ITEMS } from '../lib/foodItems';
import type { FrogStats } from '../lib/types';

interface Props {
  stats: FrogStats;
  borderColor?: string;
}

function formatTotal(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return n.toString();
}

export function StatsBox({ stats, borderColor = 'border-[#1D1D1D]' }: Props) {
  const total = FOOD_ITEMS.reduce((sum, item) => sum + stats[item.key], 0);
  return (
    <div className={`w-full bg-[#ffedeb] border-2 ${borderColor} flex flex-col flex-shrink-0`}>
      <div className={`flex items-center justify-between px-4 h-[56px] border-b-2 ${borderColor}`}>
        <span className="font-jersey10 text-[28px] text-[#222222] tracking-[0.02em]">TOTAL EATEN</span>
        <span className="font-jersey10 text-[28px] text-[#222222] tracking-[0.02em]">{formatTotal(total)}</span>
      </div>
      <div className="flex items-center justify-between px-4 h-[56px]">
        <span className="font-jersey10 text-[28px] text-[#5E5E5E] tracking-[0.02em]">TOTAL FOCUS</span>
        <span className="font-jersey10 text-[28px] text-[#5E5E5E] tracking-[0.02em]">{total * 25} MINS</span>
      </div>
    </div>
  );
}
