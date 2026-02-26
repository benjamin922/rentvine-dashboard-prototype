import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

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

export default function SummaryBar({ items }: SummaryBarProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {items.map((item) => (
        <div
          key={item.label}
          className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm"
        >
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">
            {item.label}
          </p>
          <p className="text-2xl font-bold text-slate-900">
            {item.prefix}
            {typeof item.value === 'number' ? item.value.toLocaleString() : item.value}
            {item.suffix}
          </p>
          {item.trend !== undefined && (
            <div className={`flex items-center gap-1 mt-1 text-xs font-medium ${
              item.trend > 0 ? 'text-green-600' : item.trend < 0 ? 'text-red-500' : 'text-slate-400'
            }`}>
              {item.trend > 0 ? (
                <TrendingUp size={12} />
              ) : item.trend < 0 ? (
                <TrendingDown size={12} />
              ) : (
                <Minus size={12} />
              )}
              <span>{Math.abs(item.trend)}% vs last month</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
