import { Sparkles, X, ArrowRight } from 'lucide-react';
import { useState } from 'react';

interface AiInsightBannerProps {
  insight: string;
  detail?: string;
  type?: 'info' | 'warning' | 'positive';
}

export default function AiInsightBanner({
  insight,
  detail,
  type = 'info',
}: AiInsightBannerProps) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  // Subtle border tint per type
  const borderClass =
    type === 'warning'
      ? 'border-gold-200/60'
      : type === 'positive'
        ? 'border-brand-200/60'
        : 'border-brand-200/40';

  return (
    <div
      className={`bg-gradient-to-r from-brand-50/80 to-white rounded-xl border ${borderClass} p-4 flex items-start gap-4 animate-fade-in`}
    >
      {/* Sparkles icon in gradient circle */}
      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center shrink-0 shadow-sm">
        <Sparkles size={16} className="text-white" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 pt-0.5">
        <p className="text-[10px] font-bold text-brand-600 uppercase tracking-widest mb-0.5">
          AI Insight
        </p>
        <p className="text-[13px] font-medium text-slate-800 leading-snug">
          {insight}
        </p>
        {detail && (
          <p className="text-[12px] text-slate-500 mt-0.5 leading-snug">
            {detail}
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 shrink-0 pt-0.5">
        <button className="flex items-center gap-1 text-[12px] font-semibold text-brand-600 hover:text-brand-700 transition-colors cursor-pointer whitespace-nowrap">
          View Details
          <ArrowRight size={12} />
        </button>
        <button
          onClick={() => setDismissed(true)}
          className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Dismiss"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}
