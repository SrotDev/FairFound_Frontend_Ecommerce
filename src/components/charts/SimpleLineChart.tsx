import { TrendDataPoint } from "@/types/ecommerce";

interface SimpleLineChartProps {
  data: TrendDataPoint[];
  color?: string;
  height?: number;
}

export const SimpleLineChart = ({ data, color = "hsl(var(--accent))", height = 200 }: SimpleLineChartProps) => {
  if (data.length === 0) return null;

  const maxValue = Math.max(...data.map((d) => d.value));
  const minValue = Math.min(...data.map((d) => d.value));
  const range = maxValue - minValue || 1;

  const width = 100;
  const padding = 10;

  const points = data
    .map((point, index) => {
      const x = (index / (data.length - 1)) * (width - padding * 2) + padding;
      const y = height - ((point.value - minValue) / range) * (height - padding * 2) - padding;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className="w-full">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full" style={{ height: `${height}px` }}>
        {/* Grid lines */}
        <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="hsl(var(--border))" strokeWidth="0.5" />
        <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="hsl(var(--border))" strokeWidth="0.5" />

        {/* Area fill */}
        <polygon
          points={`${padding},${height - padding} ${points} ${width - padding},${height - padding}`}
          fill={color}
          fillOpacity="0.1"
        />

        {/* Line */}
        <polyline points={points} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

        {/* Points */}
        {data.map((point, index) => {
          const x = (index / (data.length - 1)) * (width - padding * 2) + padding;
          const y = height - ((point.value - minValue) / range) * (height - padding * 2) - padding;
          return <circle key={index} cx={x} cy={y} r="2" fill={color} />;
        })}
      </svg>

      {/* Labels */}
      <div className="flex justify-between mt-2 px-2">
        {data.map((point, index) => (
          <span key={index} className="text-xs text-muted-foreground">
            {point.label}
          </span>
        ))}
      </div>
    </div>
  );
};
