import { useState } from 'react';
import {
  ChevronUp, ChevronDown, ChevronsUpDown, ChevronLeft, ChevronRight,
  Download, Columns3, Rows3
} from 'lucide-react';

interface Column {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (value: unknown, row: Record<string, unknown>) => React.ReactNode;
}

interface DataTableProps {
  columns: Column[];
  data: Record<string, unknown>[];
  pageSize?: number;
}

export default function DataTable({ columns, data, pageSize: defaultPageSize = 25 }: DataTableProps) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(defaultPageSize);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [compact, setCompact] = useState(false);
  const [visibleCols, setVisibleCols] = useState<Set<string>>(new Set(columns.map(c => c.key)));
  const [showColPicker, setShowColPicker] = useState(false);

  const toggleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  const sorted = [...data].sort((a, b) => {
    if (!sortKey) return 0;
    const aVal = a[sortKey];
    const bVal = b[sortKey];
    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return sortDir === 'asc' ? aVal - bVal : bVal - aVal;
    }
    return sortDir === 'asc'
      ? String(aVal).localeCompare(String(bVal))
      : String(bVal).localeCompare(String(aVal));
  });

  const totalPages = Math.ceil(sorted.length / pageSize);
  const paged = sorted.slice(page * pageSize, (page + 1) * pageSize);
  const allSelected = paged.length > 0 && paged.every((_, i) => selected.has(page * pageSize + i));

  const toggleAll = () => {
    if (allSelected) {
      setSelected(new Set());
    } else {
      const newSet = new Set<number>();
      paged.forEach((_, i) => newSet.add(page * pageSize + i));
      setSelected(newSet);
    }
  };

  const toggleRow = (index: number) => {
    const newSet = new Set(selected);
    if (newSet.has(index)) {
      newSet.delete(index);
    } else {
      newSet.add(index);
    }
    setSelected(newSet);
  };

  const filteredCols = columns.filter(c => visibleCols.has(c.key));

  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
      {/* Bulk Actions Bar */}
      {selected.size > 0 && (
        <div className="px-4 py-2.5 bg-brand-50 border-b border-brand-100 flex items-center gap-3">
          <span className="text-sm font-medium text-brand-900">{selected.size} selected</span>
          <button
            onClick={() => setSelected(new Set())}
            className="text-xs font-medium text-brand-700 hover:text-brand-900 cursor-pointer"
          >
            Deselect All
          </button>
          <div className="w-px h-4 bg-brand-200" />
          <button className="flex items-center gap-1 text-xs font-medium text-slate-600 hover:text-slate-900 cursor-pointer">
            <Download size={12} /> Export
          </button>
          <button className="text-xs font-medium text-slate-600 hover:text-slate-900 cursor-pointer">
            Assign Portfolio
          </button>
          <button className="text-xs font-medium text-slate-600 hover:text-slate-900 cursor-pointer">
            Send Communication
          </button>
        </div>
      )}

      {/* Table toolbar */}
      <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
        <span className="text-xs text-slate-500">
          {sorted.length} results
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCompact(!compact)}
            className="p-1.5 rounded hover:bg-slate-100 text-slate-400 hover:text-slate-600 cursor-pointer"
            title={compact ? 'Comfortable view' : 'Compact view'}
          >
            <Rows3 size={14} />
          </button>
          <div className="relative">
            <button
              onClick={() => setShowColPicker(!showColPicker)}
              className="p-1.5 rounded hover:bg-slate-100 text-slate-400 hover:text-slate-600 cursor-pointer"
              title="Manage columns"
            >
              <Columns3 size={14} />
            </button>
            {showColPicker && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setShowColPicker(false)} />
                <div className="absolute right-0 top-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg py-1 z-20 w-48">
                  {columns.map(col => (
                    <label key={col.key} className="flex items-center gap-2 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={visibleCols.has(col.key)}
                        onChange={() => {
                          const newSet = new Set(visibleCols);
                          if (newSet.has(col.key)) {
                            newSet.delete(col.key);
                          } else {
                            newSet.add(col.key);
                          }
                          setVisibleCols(newSet);
                        }}
                        className="rounded border-slate-300 text-brand-600 focus:ring-brand-500"
                      />
                      {col.label}
                    </label>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="w-10 px-4 py-2">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={toggleAll}
                  className="rounded border-slate-300 text-brand-600 focus:ring-brand-500"
                />
              </th>
              {filteredCols.map((col) => (
                <th
                  key={col.key}
                  className="text-left text-xs font-medium text-slate-500 uppercase tracking-wide px-4 py-2 select-none"
                >
                  {col.sortable !== false ? (
                    <button
                      onClick={() => toggleSort(col.key)}
                      className="flex items-center gap-1 hover:text-slate-700 cursor-pointer"
                    >
                      {col.label}
                      {sortKey === col.key ? (
                        sortDir === 'asc' ? <ChevronUp size={12} /> : <ChevronDown size={12} />
                      ) : (
                        <ChevronsUpDown size={12} className="opacity-40" />
                      )}
                    </button>
                  ) : (
                    col.label
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {paged.map((row, i) => {
              const globalIndex = page * pageSize + i;
              return (
                <tr
                  key={globalIndex}
                  className={`hover:bg-slate-50 transition-colors cursor-pointer ${
                    selected.has(globalIndex) ? 'bg-brand-50/50' : ''
                  }`}
                >
                  <td className="w-10 px-4 py-2">
                    <input
                      type="checkbox"
                      checked={selected.has(globalIndex)}
                      onChange={() => toggleRow(globalIndex)}
                      className="rounded border-slate-300 text-brand-600 focus:ring-brand-500"
                    />
                  </td>
                  {filteredCols.map((col) => (
                    <td
                      key={col.key}
                      className={`text-sm text-slate-700 px-4 ${compact ? 'py-1.5' : 'py-2.5'}`}
                    >
                      {col.render ? col.render(row[col.key], row) : String(row[col.key] ?? '')}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-4 py-3 border-t border-slate-100 flex items-center justify-between bg-slate-50/50">
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500">Rows per page:</span>
          <select
            value={pageSize}
            onChange={(e) => { setPageSize(Number(e.target.value)); setPage(0); }}
            className="text-xs border border-slate-200 rounded px-1.5 py-0.5 focus:outline-none focus:ring-1 focus:ring-brand-500"
          >
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500">
            {page * pageSize + 1}–{Math.min((page + 1) * pageSize, sorted.length)} of {sorted.length}
          </span>
          <button
            onClick={() => setPage(Math.max(0, page - 1))}
            disabled={page === 0}
            className="p-1 rounded hover:bg-slate-200 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
            disabled={page >= totalPages - 1}
            className="p-1 rounded hover:bg-slate-200 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
