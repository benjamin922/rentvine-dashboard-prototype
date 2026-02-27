import { ArrowRight } from 'lucide-react';

export default function DataSlice({ title, columns, data, renderRow, onViewAll, emptyMessage }) {
  return (
    <div className="bg-white rounded-lg border border-border">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <h3 className="text-sm font-semibold text-text-primary">{title}</h3>
        {onViewAll && (
          <button
            onClick={onViewAll}
            className="flex items-center gap-1 text-xs font-medium text-brand hover:text-brand-dark transition-colors"
          >
            View all
            <ArrowRight size={12} />
          </button>
        )}
      </div>
      {data.length === 0 ? (
        <div className="px-4 py-8 text-center">
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-green-50 mb-2">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M7 10l2 2 4-4" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="10" cy="10" r="8" stroke="#16a34a" strokeWidth="1.5"/>
            </svg>
          </div>
          <p className="text-sm text-text-secondary">{emptyMessage || 'All caught up!'}</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                {columns.map((col, i) => (
                  <th key={i} className={`px-4 py-2 text-left text-xs font-medium text-text-secondary uppercase tracking-wide ${col.className || ''}`}>
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((item, i) => renderRow(item, i))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
