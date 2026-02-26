import { useState } from 'react';
import { RotateCcw } from 'lucide-react';
import ViewTabs from './ViewTabs';
import FilterChip from './FilterChip';
import FilterDropdown from './FilterDropdown';

interface SavedView {
  id: string;
  name: string;
  isDefault: boolean;
  isShared: boolean;
  filters: Record<string, unknown>;
}

interface ActiveFilter {
  field: string;
  operator: string;
  value: string;
  uncommitted: boolean;
}

interface FilterBarProps {
  views: SavedView[];
}

const statusOptions = ['All', 'Active', 'Inactive', 'Archived'];

const filterDefaults: Record<string, { operator: string; value: string }> = {
  'Portfolio': { operator: 'is', value: 'Downtown' },
  'Property Type': { operator: 'is', value: 'Multi-Family' },
  'City': { operator: 'is', value: 'Austin' },
  'State': { operator: 'is', value: 'TX' },
  'Zip Code': { operator: 'is', value: '78701' },
  'Bedrooms': { operator: '>=', value: '3' },
  'Bathrooms': { operator: '>=', value: '2' },
  'Lease Status': { operator: 'is', value: 'Active' },
  'Owner': { operator: 'is', value: 'Westfield Holdings' },
  'Property Manager': { operator: 'is', value: 'Jessica Rivera' },
  'Tags': { operator: 'includes', value: 'Premium' },
  'Vacant': { operator: 'is', value: 'Yes' },
  'Rent Range': { operator: '>=', value: '$1,500' },
  'Created Date': { operator: 'after', value: '2025-01-01' },
};

export default function FilterBar({ views }: FilterBarProps) {
  const [activeView, setActiveView] = useState(views[0]?.id || 'all');
  const [activeStatus, setActiveStatus] = useState('All');
  const [filters, setFilters] = useState<ActiveFilter[]>([]);
  const [hasUncommitted, setHasUncommitted] = useState(false);

  const addFilter = (field: string) => {
    const defaults = filterDefaults[field] || { operator: 'is', value: '' };
    setFilters([...filters, { field, ...defaults, uncommitted: true }]);
    setHasUncommitted(true);
  };

  const removeFilter = (index: number) => {
    setFilters(filters.filter((_, i) => i !== index));
    setHasUncommitted(true);
  };

  const applyFilters = () => {
    setFilters(filters.map(f => ({ ...f, uncommitted: false })));
    setHasUncommitted(false);
  };

  const resetFilters = () => {
    setFilters([]);
    setHasUncommitted(false);
  };

  return (
    <div className="space-y-3">
      {/* Saved Views */}
      <ViewTabs views={views} activeView={activeView} onViewChange={setActiveView} />

      {/* Filter Bar */}
      <div className="flex items-center gap-2 flex-wrap">
        {/* Fixed Filter: Status */}
        <div className="flex items-center bg-slate-100 rounded-lg p-0.5">
          {statusOptions.map(s => (
            <button
              key={s}
              onClick={() => { setActiveStatus(s); setHasUncommitted(true); }}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                activeStatus === s
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Separator */}
        <div className="w-px h-6 bg-slate-200" />

        {/* Dynamic Filter Chips */}
        {filters.map((filter, i) => (
          <FilterChip
            key={`${filter.field}-${i}`}
            field={filter.field}
            operator={filter.operator}
            value={filter.value}
            uncommitted={filter.uncommitted}
            onRemove={() => removeFilter(i)}
            onClick={() => {}}
          />
        ))}

        {/* Add Filter */}
        <FilterDropdown
          onAdd={addFilter}
          activeFilters={filters.map(f => f.field)}
        />

        {/* Batch commit */}
        {hasUncommitted && (
          <>
            <div className="w-px h-6 bg-slate-200" />
            <button
              onClick={applyFilters}
              className="px-3 py-1 rounded-md text-xs font-semibold bg-brand-900 text-white hover:bg-brand-800 transition-colors cursor-pointer"
            >
              Apply Filters
            </button>
            <button
              onClick={resetFilters}
              className="flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <RotateCcw size={12} />
              Reset
            </button>
          </>
        )}
      </div>
    </div>
  );
}
