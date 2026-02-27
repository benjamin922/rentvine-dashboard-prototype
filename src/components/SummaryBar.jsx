import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

function TrendIndicator({ value, suffix = '' }) {
  if (value === 0 || value === undefined) {
    return <span className="flex items-center gap-0.5 text-xs text-gray-400"><Minus size={12} /> 0{suffix}</span>;
  }
  const isPositive = value > 0;
  return (
    <span className={`flex items-center gap-0.5 text-xs ${isPositive ? 'text-green-600' : 'text-red-500'}`}>
      {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
      {isPositive ? '+' : ''}{value}{suffix}
    </span>
  );
}

export default function SummaryBar({ metrics }) {
  return (
    <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${metrics.length}, minmax(0, 1fr))` }}>
      {metrics.map((metric, i) => (
        <div
          key={i}
          className="bg-white rounded-lg border border-border p-4"
        >
          <p className="text-xs font-medium text-text-secondary uppercase tracking-wide mb-1">{metric.label}</p>
          <div className="flex items-end justify-between">
            <span className="text-2xl font-semibold text-text-primary">{metric.value}</span>
            {metric.trend !== undefined && (
              <TrendIndicator value={metric.trend} suffix={metric.trendSuffix || '%'} />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
