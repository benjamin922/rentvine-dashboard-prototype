import { TrendingUp, TrendingDown } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  trend?: number;
}

export default function MetricCard({ title, value, trend }: MetricCardProps) {
  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-5">
      <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-2">{title}</p>
      <p className="text-3xl font-bold text-slate-900">{value}</p>
      {trend !== undefined && (
        <div className={`flex items-center gap-1 mt-2 text-xs font-medium ${
          trend > 0 ? 'text-green-600' : trend < 0 ? 'text-red-500' : 'text-slate-400'
        }`}>
          {trend > 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          <span>{Math.abs(trend)}% vs last period</span>
        </div>
      )}
    </div>
  );
}
