import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface Column {
  key: string;
  label: string;
  render?: (value: unknown, row: Record<string, unknown>) => React.ReactNode;
}

interface SmallTableProps {
  title: string;
  columns: Column[];
  data: Record<string, unknown>[];
  viewAllLink?: string;
  viewAllLabel?: string;
}

export default function SmallTable({
  title,
  columns,
  data,
  viewAllLink,
  viewAllLabel = 'View All',
}: SmallTableProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-200/60 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-5 py-3.5 border-b border-slate-100">
        <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-100">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-5 py-2.5"
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {data.map((row, i) => (
              <tr
                key={i}
                className="hover:bg-slate-50/50 transition-colors"
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className="text-[13px] text-slate-700 px-5 py-2.5"
                  >
                    {col.render
                      ? col.render(row[col.key], row)
                      : String(row[col.key] ?? '')}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      {viewAllLink && (
        <div className="px-5 py-3 border-t border-slate-100">
          <Link
            to={viewAllLink}
            className="flex items-center gap-1.5 text-brand-600 font-semibold text-[13px] hover:text-brand-700 transition-colors"
          >
            {viewAllLabel}
            <ArrowRight size={14} />
          </Link>
        </div>
      )}
    </div>
  );
}
