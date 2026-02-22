import type React from 'react';
import { IndicatorDot } from './IndicatorDot';
import { FoodItem } from './FoodItem';
import { FOOD_ITEMS } from '../lib/foodItems';
import type { FrogStats, FoodKey } from '../lib/types';

interface Props {
  stats: FrogStats;
  awaitingSelection: boolean;
  onSelectFood: (key: FoodKey) => void;
  mobile?: boolean;
}

function formatTotal(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return n.toString();
}

export function FoodPanel({ stats, awaitingSelection, onSelectFood, mobile }: Props) {
  const total = FOOD_ITEMS.reduce((sum, item) => sum + stats[item.key], 0);
  const borderColor = awaitingSelection ? 'border-[#f5a89e]' : 'border-[#1D1D1D]';
  const width = mobile ? 'w-full' : 'w-[361px]';

  return (
    <div className={`flex flex-col gap-[8px] ${mobile ? 'flex-1 min-h-0' : ''}`}>

      {/* Main food container */}
      <div className={`${width} bg-[#ffedeb] border-2 ${borderColor} flex flex-col ${mobile ? 'flex-1 min-h-0' : ''}`}>

        {/* FOOD title bar */}
        <div className={`relative flex items-center gap-2 px-4 h-[56px] border-b-2 ${borderColor} flex-shrink-0 overflow-visible`}>
          <IndicatorDot color="#efc7c1" />
          <span className="font-jersey10 text-[28px] text-[#5E5E5E] tracking-[0.02em] whitespace-nowrap">
            {awaitingSelection ? 'PICK YOUR REWARD!' : 'FOOD'}
          </span>
          {awaitingSelection && (
            <>
              <img src="/assets/star.svg" className="sparkle" style={{ top: '-10px', left: '60px',  '--tx': '-12px', '--ty': '-18px', animationDelay: '0s',    width: '16px', height: '16px' } as React.CSSProperties} alt="" />
              <img src="/assets/star.svg" className="sparkle" style={{ top: '-12px', left: '130px', '--tx': '4px',   '--ty': '-22px', animationDelay: '0.25s',  width: '14px', height: '14px' } as React.CSSProperties} alt="" />
              <img src="/assets/star.svg" className="sparkle" style={{ top: '-8px',  left: '200px', '--tx': '14px',  '--ty': '-16px', animationDelay: '0.5s',   width: '18px', height: '18px' } as React.CSSProperties} alt="" />
              <img src="/assets/star.svg" className="sparkle" style={{ top: '4px',   left: '260px', '--tx': '18px',  '--ty': '-8px',  animationDelay: '0.75s',  width: '14px', height: '14px' } as React.CSSProperties} alt="" />
              <img src="/assets/star.svg" className="sparkle" style={{ top: '-6px',  left: '90px',  '--tx': '-6px',  '--ty': '-20px', animationDelay: '1.0s',   width: '12px', height: '12px' } as React.CSSProperties} alt="" />
              <img src="/assets/star.svg" className="sparkle" style={{ top: '-4px',  left: '170px', '--tx': '10px',  '--ty': '-14px', animationDelay: '1.15s',  width: '16px', height: '16px' } as React.CSSProperties} alt="" />
            </>
          )}
          <div className="flex-1 flex flex-col gap-[3px] ml-2">
            <div className="h-[1.5px] bg-[#1D1D1D]" />
            <div className="h-[1.5px] bg-[#1D1D1D]" />
          </div>
        </div>

        {/* Food list */}
        <div className={mobile ? 'flex-1 overflow-y-auto' : 'h-[414px] overflow-y-auto'}>
          {FOOD_ITEMS.map((item) => (
            <FoodItem
              key={item.key}
              label={item.label}
              iconSrc={item.icon}
              count={stats[item.key]}
              selectable={awaitingSelection}
              borderColor={borderColor}
              onSelect={() => onSelectFood(item.key)}
            />
          ))}
        </div>

      </div>

      {/* Stats container — only shown on desktop */}
      {!mobile && (
        <div className={`${width} bg-[#ffedeb] border-2 ${borderColor} flex flex-col flex-shrink-0`}>
          <div className={`flex items-center justify-between px-4 h-[56px] border-b-2 ${borderColor}`}>
            <span className="font-jersey10 text-[28px] text-[#222222] tracking-[0.02em]">TOTAL EATEN</span>
            <span className="font-jersey10 text-[28px] text-[#222222] tracking-[0.02em]">{formatTotal(total)}</span>
          </div>
          <div className="flex items-center justify-between px-4 h-[56px]">
            <span className="font-jersey10 text-[28px] text-[#5E5E5E] tracking-[0.02em]">TOTAL FOCUS</span>
            <span className="font-jersey10 text-[28px] text-[#5E5E5E] tracking-[0.02em]">{total * 25} MINS</span>
          </div>
        </div>
      )}

    </div>
  );
}
