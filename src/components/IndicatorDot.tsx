interface Props {
  color: string;
}

export function IndicatorDot({ color }: Props) {
  return (
    <div
      className="w-3 h-3 rounded-full flex-shrink-0"
      style={{ backgroundColor: color }}
    />
  );
}
