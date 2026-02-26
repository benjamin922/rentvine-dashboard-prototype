import { ArrowUp, ArrowDown, Minus } from 'lucide-react';

interface SummaryItem {
  label: string;
  value: string | number;
  trend?: number;
  prefix?: string;
  suffix?: string;
}

interface SummaryBarProps {
  items: SummaryItem[];
}

/** Mini sparkline SVG -- renders a small upward or downward trend line */
function MiniSparkline({ trend }: { trend?: number }) {
  const isUp = (trend ?? 0) >= 0;
  const points = isUp
    ? '0,20 8,18 16,14 24,16 32,10 40,12 48,6 56,4 64,2'
    : '0,2 8,4 16,6 24,4 32,10 40,12 48,16 56,18 64,20';
  const color = isUp ? '#16a34a' : '#ef4444';

  return (
    <svg
      viewBox="0 0 64 22"
      fill="none"
      className="w-16 h-5"
      preserveAspectRatio="none"
    >
      <polyline
        points={points}
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity="0.5"
      />
    </svg>
  );
}

export default function SummaryBar({ items }: SummaryBarProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {items.map((item) => {
        const trendPositive = (item.trend ?? 0) > 0;
        const trendNegative = (item.trend ?? 0) < 0;
        const trendNeutral = item.trend === 0 || item.trend === undefined;

        return (
          <div
            key={item.label}
            className="bg-white rounded-xl border border-slate-200/60 p-5 shadow-sm hover:shadow-md transition-all cursor-default group"
          >
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
              {item.label}
            </p>
            <div className="flex items-end justify-between gap-2">
              <p className="text-[28px] font-bold text-slate-900 leading-none">
                {item.prefix}
                {typeof item.value === 'number'
                  ? item.value.toLocaleString()
                  : item.value}
                {item.suffix}
              </p>
              <MiniSparkline trend={item.trend} />
            </div>
            {item.trend !== undefined && (
              <div className="flex items-center gap-1.5 mt-3">
                {trendPositive && (
                  <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-green-50 text-green-700 text-[11px] font-semibold">
                    <ArrowUp size={10} />
                    {Math.abs(item.trend)}%
                  </span>
                )}
                {trendNegative && (
                  <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-red-50 text-red-600 text-[11px] font-semibold">
                    <ArrowDown size={10} />
                    {Math.abs(item.trend)}%
                  </span>
                )}
                {trendNeutral && (
                  <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-slate-50 text-slate-400 text-[11px] font-semibold">
                    <Minus size={10} />
                    0%
                  </span>
                )}
                <span className="text-[11px] text-slate-400">
                  vs last month
                </span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
