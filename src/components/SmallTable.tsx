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

export default function SmallTable({ title, columns, data, viewAllLink, viewAllLabel = 'View All' }: SmallTableProps) {
  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
      <div className="px-4 py-3 border-b border-slate-100">
        <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-100">
              {columns.map((col) => (
                <th key={col.key} className="text-left text-xs font-medium text-slate-500 uppercase tracking-wide px-4 py-2">
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {data.map((row, i) => (
              <tr key={i} className="hover:bg-slate-50 transition-colors">
                {columns.map((col) => (
                  <td key={col.key} className="text-sm text-slate-700 px-4 py-2.5">
                    {col.render ? col.render(row[col.key], row) : String(row[col.key] ?? '')}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {viewAllLink && (
        <div className="px-4 py-2.5 border-t border-slate-100 bg-slate-50/50">
          <Link
            to={viewAllLink}
            className="text-sm font-medium text-brand-700 hover:text-brand-900 flex items-center gap-1"
          >
            {viewAllLabel} <ArrowRight size={14} />
          </Link>
        </div>
      )}
    </div>
  );
}
