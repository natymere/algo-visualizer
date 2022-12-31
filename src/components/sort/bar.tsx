type BarProps = {
  val: number;
  containerHeight: number;
};

const max = 1000;

export function Bar({ val, containerHeight }: BarProps) {
  const relativeHeight = Math.floor((val / max) * containerHeight);
  return (
    <div className="bar tooltip" style={{ height: relativeHeight + 'px' }}>
      <div className="tooltiptext">{val}</div>
    </div>
  );
}
