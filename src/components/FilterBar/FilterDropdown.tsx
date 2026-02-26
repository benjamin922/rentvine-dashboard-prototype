import { useState } from 'react';
import { Plus, Search } from 'lucide-react';

const availableFilters = [
  'Portfolio', 'Property Type', 'City', 'State', 'Zip Code',
  'Bedrooms', 'Bathrooms', 'Lease Status', 'Owner',
  'Property Manager', 'Tags', 'Vacant', 'Rent Range', 'Created Date',
];

interface FilterDropdownProps {
  onAdd: (field: string) => void;
  activeFilters: string[];
}

export default function FilterDropdown({ onAdd, activeFilters }: FilterDropdownProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');

  const filtered = availableFilters.filter(
    f => !activeFilters.includes(f) && f.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium text-slate-500 hover:bg-slate-100 border border-dashed border-slate-300 transition-colors cursor-pointer"
      >
        <Plus size={12} />
        Add Filter
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute top-full left-0 mt-1 bg-white rounded-xl border border-slate-200 shadow-lg py-2 z-20 w-56">
            {/* Search Input */}
            <div className="px-2 pb-2 border-b border-slate-100">
              <div className="relative">
                <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search filters..."
                  className="w-full pl-8 pr-2 py-1.5 text-sm rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand-500 focus:border-brand-500 transition-colors"
                  autoFocus
                />
              </div>
            </div>
            {/* Filter List */}
            <div className="max-h-48 overflow-y-auto pt-1">
              {filtered.map(f => (
                <button
                  key={f}
                  onClick={() => { onAdd(f); setOpen(false); setSearch(''); }}
                  className="w-full text-left text-sm px-3 py-1.5 hover:bg-slate-50 text-slate-700 cursor-pointer transition-colors"
                >
                  {f}
                </button>
              ))}
              {filtered.length === 0 && (
                <p className="text-xs text-slate-400 px-3 py-2 text-center">No matching filters</p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
