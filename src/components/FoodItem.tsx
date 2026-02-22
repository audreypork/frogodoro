import { playNom } from '../lib/sounds';

interface Props {
  label: string;
  iconSrc: string;
  count: number;
  selectable: boolean;
  borderColor: string;
  onSelect: () => void;
}

export function FoodItem({ label, iconSrc, count, selectable, borderColor, onSelect }: Props) {
  return (
    <div
      className={`flex items-stretch border-b-2 ${borderColor} transition-colors ${selectable ? 'cursor-pointer hover:bg-[#f5a89e]' : ''}`}
      onClick={selectable ? () => { playNom(); onSelect(); } : undefined}
    >
      {/* Icon cell */}
      <div className={`w-[90px] h-[90px] border-r-2 ${borderColor} bg-[#F7DAD6] flex items-center justify-center flex-shrink-0 p-2`}>
        <img src={iconSrc} alt={label} className="w-[70px] h-[70px] object-contain" />
      </div>

      {/* Name */}
      <span className="font-jersey10 text-[28px] text-[#1d1d1d] flex-1 flex items-center px-3">
        {label}
      </span>

      {/* Count */}
      <span className="font-jersey10 text-[28px] text-[#1d1d1d] opacity-40 flex items-center pr-3">
        {count}
      </span>
    </div>
  );
}
