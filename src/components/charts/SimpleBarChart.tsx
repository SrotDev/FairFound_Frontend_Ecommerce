interface SimpleBarChartProps {
  data: { label: string; value: number; color: string }[];
  maxValue?: number;
}

export const SimpleBarChart = ({ data, maxValue }: SimpleBarChartProps) => {
  const max = maxValue || Math.max(...data.map((d) => d.value));

  return (
    <div className="space-y-3">
      {data.map((item, index) => (
        <div key={index} className="space-y-1">
          <div className="flex items-center justify-between text-sm">
            <span className="text-foreground font-medium">{item.label}</span>
            <span className="text-muted-foreground">{item.value}%</span>
          </div>
          <div className="h-3 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${(item.value / max) * 100}%`,
                backgroundColor: item.color,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
