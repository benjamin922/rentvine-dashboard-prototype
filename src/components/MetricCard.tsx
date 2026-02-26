import { ArrowUp, ArrowDown, Minus } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  trend?: number;
}

/** Mini sparkline SVG */
function MiniSparkline({ trend }: { trend?: number }) {
  const isUp = (trend ?? 0) >= 0;
  const points = isUp
    ? '0,18 8,16 16,12 24,14 32,8 40,10 48,5 56,3 64,1'
    : '0,1 8,3 16,5 24,3 32,8 40,10 48,14 56,16 64,18';
  const color = isUp ? '#16a34a' : '#ef4444';

  return (
    <svg
      viewBox="0 0 64 20"
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

export default function MetricCard({ title, value, trend }: MetricCardProps) {
  const trendPositive = (trend ?? 0) > 0;
  const trendNegative = (trend ?? 0) < 0;

  return (
    <div className="bg-white rounded-xl border border-slate-200/60 shadow-sm p-5 hover:shadow-md transition-all cursor-default">
      <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
        {title}
      </p>
      <div className="flex items-end justify-between gap-2">
        <p className="text-[28px] font-bold text-slate-900 leading-none">
          {value}
        </p>
        <MiniSparkline trend={trend} />
      </div>
      {trend !== undefined && (
        <div className="flex items-center gap-1.5 mt-3">
          {trendPositive && (
            <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-green-50 text-green-700 text-[11px] font-semibold">
              <ArrowUp size={10} />
              {Math.abs(trend)}%
            </span>
          )}
          {trendNegative && (
            <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-red-50 text-red-600 text-[11px] font-semibold">
              <ArrowDown size={10} />
              {Math.abs(trend)}%
            </span>
          )}
          {!trendPositive && !trendNegative && (
            <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-slate-50 text-slate-400 text-[11px] font-semibold">
              <Minus size={10} />
              0%
            </span>
          )}
          <span className="text-[11px] text-slate-400">vs last period</span>
        </div>
      )}
    </div>
  );
}
