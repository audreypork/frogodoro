import type React from 'react';
import { IndicatorDot } from './IndicatorDot';
import { FoodItem } from './FoodItem';
import type { FrogStats, FoodKey } from '../lib/types';

interface Props {
  stats: FrogStats;
  awaitingSelection: boolean;
  onSelectFood: (key: FoodKey) => void;
}

const FOOD_ITEMS = [
  { key: 'airpods' as const,          label: 'AIRPODS',            icon: '/assets/food-airpods.png' },
  { key: 'airwrap' as const,          label: 'AIRWRAP',            icon: '/assets/food-airwrap.png' },
  { key: 'apple' as const,            label: 'APPLE',              icon: '/assets/food-apple.png' },
  { key: 'banana_milk' as const,      label: 'BANANA MILK',        icon: '/assets/food-banana-milk.png' },
  { key: 'basque_cheesecake' as const, label: 'BASQUE CHEESECAKE', icon: '/assets/food-basque-cheesecake.png' },
  { key: 'black_card' as const,       label: 'BLACK CARD',         icon: '/assets/food-black-card.png' },
  { key: 'boba' as const,             label: 'BOBA',               icon: '/assets/food-boba.png' },
  { key: 'chanel_bag' as const,       label: 'CHANEL BAG',         icon: '/assets/food-chanel-bag.png' },
  { key: 'coffee' as const,           label: 'COFFEE',             icon: '/assets/food-coffee.png' },
  { key: 'dumplings' as const,        label: 'DUMPLINGS',          icon: '/assets/food-dumplings.png' },
  { key: 'gameboy' as const,          label: 'GAMEBOY',            icon: '/assets/food-gameboy.png' },
  { key: 'hong_pao' as const,         label: 'HONG PAO',           icon: '/assets/food-hong-pao.png' },
  { key: 'ice_matcha_latte' as const, label: 'ICE MATCHA LATTE',   icon: '/assets/food-ice-matcha-latte.png' },
  { key: 'lafufu' as const,           label: 'LAFUFU',             icon: '/assets/food-lafufu.png' },
  { key: 'matcha_soft_serve' as const, label: 'MATCHA SOFT SERVE', icon: '/assets/food-matcha-soft-serve.png' },
  { key: 'onigiri' as const,          label: 'ONIGIRI',            icon: '/assets/food-onigiri.png' },
  { key: 'ramen' as const,            label: 'RAMEN',              icon: '/assets/food-ramen.png' },
  { key: 'tamagotchi' as const,       label: 'TAMAGOTCHI',         icon: '/assets/food-tamagotchi.png' },
  { key: 'taro_croissant' as const,   label: 'TARO CROISSANT',     icon: '/assets/food-taro-croissant.png' },
  { key: 'tesla' as const,            label: 'TESLA',              icon: '/assets/food-tesla.png' },
  { key: 'van_cleef' as const,        label: 'VAN CLEEF',          icon: '/assets/food-van-cleef.png' },
];

function formatTotal(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return n.toString();
}

export function FoodPanel({ stats, awaitingSelection, onSelectFood }: Props) {
  const total = FOOD_ITEMS.reduce((sum, item) => sum + stats[item.key], 0);
  const borderColor = awaitingSelection ? 'border-[#f5a89e]' : 'border-[#1D1D1D]';

  return (
    <div className="flex flex-col gap-[8px]">

      {/* Main food container */}
      <div className={`w-[361px] bg-[#ffedeb] border-2 ${borderColor} flex flex-col`}>

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
        <div className="h-[414px] overflow-y-auto">
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

      {/* Stats container — total eaten + total focus */}
      <div className={`w-[361px] bg-[#ffedeb] border-2 ${borderColor} flex flex-col flex-shrink-0`}>
        <div className={`flex items-center justify-between px-4 h-[56px] border-b-2 ${borderColor}`}>
          <span className="font-jersey10 text-[28px] text-[#222222] tracking-[0.02em]">TOTAL EATEN</span>
          <span className="font-jersey10 text-[28px] text-[#222222] tracking-[0.02em]">{formatTotal(total)}</span>
        </div>
        <div className="flex items-center justify-between px-4 h-[56px]">
          <span className="font-jersey10 text-[28px] text-[#5E5E5E] tracking-[0.02em]">TOTAL FOCUS</span>
          <span className="font-jersey10 text-[28px] text-[#5E5E5E] tracking-[0.02em]">{total * 25} MINS</span>
        </div>
      </div>

    </div>
  );
}
