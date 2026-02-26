import { X } from 'lucide-react';

interface FilterChipProps {
  field: string;
  operator: string;
  value: string;
  uncommitted?: boolean;
  onRemove: () => void;
  onClick: () => void;
}

export default function FilterChip({ field, operator, value, uncommitted, onRemove, onClick }: FilterChipProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 pl-2.5 pr-1 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer ${
        uncommitted
          ? 'bg-amber-50 border border-dashed border-amber-300 text-amber-800'
          : 'bg-slate-100 border border-slate-200 text-slate-700'
      }`}
      onClick={onClick}
    >
      <span className="font-semibold">{field}</span>
      <span className="text-slate-400 mx-0.5">{operator}</span>
      <span>{value}</span>
      <button
        onClick={(e) => { e.stopPropagation(); onRemove(); }}
        className="p-0.5 ml-0.5 rounded hover:bg-slate-200 transition-colors cursor-pointer"
      >
        <X size={12} />
      </button>
    </span>
  );
}
