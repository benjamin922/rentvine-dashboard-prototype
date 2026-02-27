import { AlertTriangle, ArrowRight } from 'lucide-react';

const severityStyles = {
  high: 'border-l-amber-500 bg-amber-50/50',
  medium: 'border-l-amber-400 bg-amber-50/30',
  low: 'border-l-gray-300 bg-gray-50',
};

export default function NeedsAttentionCard({ item, onAction }) {
  return (
    <div className={`bg-white rounded-lg border border-border border-l-4 p-4 ${severityStyles[item.severity] || severityStyles.medium}`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <AlertTriangle size={14} className="text-amber-600 flex-shrink-0" />
            <h4 className="text-sm font-semibold text-text-primary">{item.title}</h4>
          </div>
          <p className="text-xs text-text-secondary leading-relaxed">{item.description}</p>
        </div>
        <button
          onClick={() => onAction?.(item)}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-brand text-white rounded-md hover:bg-brand-dark transition-colors flex-shrink-0 whitespace-nowrap"
        >
          {item.action}
          <ArrowRight size={12} />
        </button>
      </div>
    </div>
  );
}
