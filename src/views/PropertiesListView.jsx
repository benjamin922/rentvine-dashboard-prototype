import { useState, useMemo, useCallback } from 'react';
import { Plus, X, ChevronDown, RotateCcw, Check, ArrowLeft, Search, SlidersHorizontal, Share2, Star } from 'lucide-react';
import StatusBadge from '../components/StatusBadge';
import { allProperties } from '../data/properties';

const DEFAULT_VIEWS = [
  { id: 'all', name: 'All Properties', filters: [], isDefault: true, shared: false },
  { id: 'active', name: 'Active', filters: [{ field: 'status', operator: 'is', value: 'Active' }], shared: true },
  { id: 'multi-family', name: 'Multi-Family', filters: [{ field: 'type', operator: 'is', value: 'Multi-Family' }], shared: false },
  { id: 'high-vacancy', name: 'High Vacancy', filters: [{ field: 'occupancyRate', operator: 'less_than', value: 90 }], shared: false },
];

const FILTER_FIELDS = [
  { key: 'status', label: 'Status', type: 'select', options: ['Active', 'Inactive'] },
  { key: 'type', label: 'Type', type: 'select', options: ['Multi-Family', 'Single-Family'] },
  { key: 'city', label: 'City', type: 'select', options: ['Austin', 'Round Rock', 'Cedar Park', 'Pflugerville'] },
  { key: 'owner', label: 'Owner', type: 'select', options: [...new Set(allProperties.map(p => p.owner))] },
  { key: 'units', label: 'Units', type: 'number' },
  { key: 'monthlyRevenue', label: 'Monthly Revenue', type: 'number' },
];

const OPERATORS = {
  select: [{ key: 'is', label: 'is' }, { key: 'is_not', label: 'is not' }],
  number: [{ key: 'greater_than', label: '>' }, { key: 'less_than', label: '<' }, { key: 'equals', label: '=' }],
};

function FilterChip({ filter, committed, onEdit, onRemove }) {
  const field = FILTER_FIELDS.find(f => f.key === filter.field);
  const opLabel = OPERATORS[field?.type]?.find(o => o.key === filter.operator)?.label || filter.operator;

  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium cursor-pointer transition-colors ${
        committed
          ? 'bg-gray-100 text-text-primary border border-border'
          : 'bg-amber-50 text-amber-800 border border-dashed border-amber-300'
      }`}
      onClick={onEdit}
    >
      <span className="text-text-secondary">{field?.label}</span>
      <span className="text-text-secondary">{opLabel}</span>
      <span className="font-semibold">{String(filter.value)}</span>
      <button
        onClick={(e) => { e.stopPropagation(); onRemove(); }}
        className="ml-0.5 p-0.5 rounded hover:bg-gray-200 transition-colors"
      >
        <X size={10} />
      </button>
    </span>
  );
}

function AddFilterDropdown({ onAdd, existingFields }) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState('field'); // field, operator, value
  const [selectedField, setSelectedField] = useState(null);
  const [selectedOperator, setSelectedOperator] = useState(null);
  const [value, setValue] = useState('');

  const availableFields = FILTER_FIELDS.filter(f => !existingFields.includes(f.key));

  const reset = () => {
    setStep('field');
    setSelectedField(null);
    setSelectedOperator(null);
    setValue('');
    setOpen(false);
  };

  const handleFieldSelect = (field) => {
    setSelectedField(field);
    const ops = OPERATORS[field.type];
    setSelectedOperator(ops[0]);
    setStep('value');
  };

  const handleSubmit = () => {
    if (selectedField && selectedOperator && value) {
      onAdd({
        field: selectedField.key,
        operator: selectedOperator.key,
        value: selectedField.type === 'number' ? Number(value) : value,
      });
      reset();
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => { setOpen(!open); setStep('field'); }}
        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium text-text-secondary border border-dashed border-gray-300 hover:border-brand hover:text-brand transition-colors"
      >
        <Plus size={12} />
        Add Filter
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-lg shadow-lg border border-border z-50">
          {step === 'field' && (
            <div className="py-1">
              <div className="px-3 py-1.5 text-xs font-medium text-text-secondary uppercase">Select Field</div>
              {availableFields.map((field) => (
                <button
                  key={field.key}
                  onClick={() => handleFieldSelect(field)}
                  className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 text-text-primary"
                >
                  {field.label}
                </button>
              ))}
              {availableFields.length === 0 && (
                <div className="px-3 py-2 text-sm text-text-secondary">All filters applied</div>
              )}
            </div>
          )}

          {step === 'value' && selectedField && (
            <div className="p-3">
              <div className="text-xs font-medium text-text-secondary mb-2">{selectedField.label}</div>
              <div className="flex gap-1 mb-2">
                {OPERATORS[selectedField.type].map((op) => (
                  <button
                    key={op.key}
                    onClick={() => setSelectedOperator(op)}
                    className={`px-2 py-1 text-xs rounded ${
                      selectedOperator?.key === op.key
                        ? 'bg-brand text-white'
                        : 'bg-gray-100 text-text-secondary hover:bg-gray-200'
                    }`}
                  >
                    {op.label}
                  </button>
                ))}
              </div>
              {selectedField.type === 'select' ? (
                <div className="max-h-32 overflow-y-auto">
                  {selectedField.options.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => { setValue(opt); }}
                      className={`w-full text-left px-2 py-1.5 text-sm rounded hover:bg-gray-50 ${
                        value === opt ? 'bg-brand-light text-brand font-medium' : 'text-text-primary'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              ) : (
                <input
                  type="number"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="Enter value..."
                  className="w-full px-2 py-1.5 text-sm border border-border rounded focus:outline-none focus:border-brand"
                />
              )}
              <div className="flex gap-2 mt-2">
                <button onClick={reset} className="flex-1 px-2 py-1 text-xs text-text-secondary border border-border rounded hover:bg-gray-50">
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!value}
                  className="flex-1 px-2 py-1 text-xs bg-brand text-white rounded hover:bg-brand-dark disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Apply
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function applyFilters(data, filters) {
  return data.filter((item) => {
    return filters.every((f) => {
      const val = item[f.field];
      const occupancyRate = item.units > 0 ? (item.occupied / item.units) * 100 : 0;
      const compareVal = f.field === 'occupancyRate' ? occupancyRate : val;

      switch (f.operator) {
        case 'is': return String(compareVal) === String(f.value);
        case 'is_not': return String(compareVal) !== String(f.value);
        case 'greater_than': return Number(compareVal) > Number(f.value);
        case 'less_than': return Number(compareVal) < Number(f.value);
        case 'equals': return Number(compareVal) === Number(f.value);
        default: return true;
      }
    });
  });
}

function formatCurrency(n) {
  return '$' + n.toLocaleString();
}

export default function PropertiesListView({ onBack }) {
  const [views, setViews] = useState(DEFAULT_VIEWS);
  const [activeViewId, setActiveViewId] = useState('all');
  const [pendingFilters, setPendingFilters] = useState([]);
  const [committedFilters, setCommittedFilters] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState('address');
  const [sortDir, setSortDir] = useState('asc');

  const activeView = views.find(v => v.id === activeViewId);

  const handleViewChange = useCallback((viewId) => {
    const view = views.find(v => v.id === viewId);
    setActiveViewId(viewId);
    setCommittedFilters(view?.filters || []);
    setPendingFilters(view?.filters || []);
  }, [views]);

  const hasUncommittedChanges = useMemo(() => {
    return JSON.stringify(pendingFilters) !== JSON.stringify(committedFilters);
  }, [pendingFilters, committedFilters]);

  const applyPendingFilters = () => {
    setCommittedFilters([...pendingFilters]);
  };

  const resetFilters = () => {
    setPendingFilters([...committedFilters]);
  };

  const addFilter = (filter) => {
    setPendingFilters(prev => [...prev, filter]);
  };

  const removeFilter = (index) => {
    setPendingFilters(prev => prev.filter((_, i) => i !== index));
  };

  const filteredData = useMemo(() => {
    let data = applyFilters(allProperties, committedFilters);
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      data = data.filter(p =>
        p.address.toLowerCase().includes(q) ||
        p.city.toLowerCase().includes(q) ||
        p.owner.toLowerCase().includes(q)
      );
    }
    data.sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];
      const cmp = typeof aVal === 'string' ? aVal.localeCompare(bVal) : aVal - bVal;
      return sortDir === 'asc' ? cmp : -cmp;
    });
    return data;
  }, [committedFilters, searchQuery, sortField, sortDir]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDir('asc');
    }
  };

  const SortHeader = ({ field, children, className = '' }) => (
    <th
      onClick={() => handleSort(field)}
      className={`px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wide cursor-pointer hover:text-text-primary select-none ${className}`}
    >
      <span className="inline-flex items-center gap-1">
        {children}
        {sortField === field && (
          <span className="text-brand">{sortDir === 'asc' ? '↑' : '↓'}</span>
        )}
      </span>
    </th>
  );

  return (
    <div className="flex-1 overflow-auto">
      <div className="max-w-[1400px] mx-auto px-6 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="p-1.5 rounded-md hover:bg-gray-100 text-text-secondary transition-colors"
            >
              <ArrowLeft size={18} />
            </button>
            <div>
              <h1 className="text-xl font-semibold text-text-primary">Properties</h1>
              <p className="text-xs text-text-secondary">{filteredData.length} properties</p>
            </div>
          </div>
          <button className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium bg-brand text-white rounded-lg hover:bg-brand-dark transition-colors">
            <Plus size={15} />
            Add Property
          </button>
        </div>

        {/* View Tabs */}
        <div className="flex items-center gap-1 border-b border-border mb-4">
          {views.map((view) => (
            <button
              key={view.id}
              onClick={() => handleViewChange(view.id)}
              className={`px-3 py-2 text-sm font-medium border-b-2 transition-colors ${
                activeViewId === view.id
                  ? 'border-brand text-brand'
                  : 'border-transparent text-text-secondary hover:text-text-primary hover:border-gray-300'
              }`}
            >
              {view.name}
              {view.shared && <Share2 size={10} className="inline ml-1 opacity-50" />}
            </button>
          ))}
          <button className="px-2 py-2 text-text-secondary hover:text-text-primary">
            <Plus size={14} />
          </button>
        </div>

        {/* Filter Bar */}
        <div className="bg-white rounded-lg border border-border p-3 mb-4">
          <div className="flex items-center gap-2 flex-wrap">
            <SlidersHorizontal size={14} className="text-text-secondary flex-shrink-0" />

            {/* Fixed status filter as pills */}
            <div className="flex items-center rounded-md border border-border overflow-hidden text-xs">
              {['All', 'Active', 'Inactive'].map((status) => {
                const isActive = status === 'All'
                  ? !pendingFilters.find(f => f.field === 'status')
                  : pendingFilters.find(f => f.field === 'status' && f.value === status);
                return (
                  <button
                    key={status}
                    onClick={() => {
                      if (status === 'All') {
                        setPendingFilters(prev => prev.filter(f => f.field !== 'status'));
                      } else {
                        setPendingFilters(prev => [
                          ...prev.filter(f => f.field !== 'status'),
                          { field: 'status', operator: 'is', value: status }
                        ]);
                      }
                    }}
                    className={`px-3 py-1.5 font-medium transition-colors ${
                      isActive
                        ? 'bg-brand text-white'
                        : 'bg-white text-text-secondary hover:bg-gray-50'
                    }`}
                  >
                    {status}
                  </button>
                );
              })}
            </div>

            <div className="w-px h-5 bg-border"></div>

            {/* Dynamic filter chips */}
            {pendingFilters
              .filter(f => f.field !== 'status')
              .map((filter, i) => {
                const realIndex = pendingFilters.indexOf(filter);
                const isCommitted = committedFilters.some(
                  cf => cf.field === filter.field && cf.operator === filter.operator && String(cf.value) === String(filter.value)
                );
                return (
                  <FilterChip
                    key={`${filter.field}-${i}`}
                    filter={filter}
                    committed={isCommitted}
                    onEdit={() => {}}
                    onRemove={() => removeFilter(realIndex)}
                  />
                );
              })}

            <AddFilterDropdown
              onAdd={addFilter}
              existingFields={pendingFilters.map(f => f.field)}
            />

            <div className="flex-1"></div>

            {/* Apply / Reset */}
            {hasUncommittedChanges && (
              <div className="flex items-center gap-2">
                <button
                  onClick={resetFilters}
                  className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-text-secondary border border-border rounded-md hover:bg-gray-50"
                >
                  <RotateCcw size={11} />
                  Reset
                </button>
                <button
                  onClick={applyPendingFilters}
                  className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium bg-brand text-white rounded-md hover:bg-brand-dark"
                >
                  <Check size={11} />
                  Apply Filters
                </button>
              </div>
            )}

            {/* Search */}
            <div className="relative">
              <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-text-secondary" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search properties..."
                className="pl-8 pr-3 py-1.5 text-xs border border-border rounded-md focus:outline-none focus:border-brand w-48"
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50/80">
                <tr className="border-b border-border">
                  <SortHeader field="address">Address</SortHeader>
                  <SortHeader field="city">City</SortHeader>
                  <SortHeader field="type">Type</SortHeader>
                  <SortHeader field="units">Units</SortHeader>
                  <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wide">Occupancy</th>
                  <SortHeader field="owner">Owner</SortHeader>
                  <SortHeader field="monthlyRevenue">Revenue</SortHeader>
                  <SortHeader field="status">Status</SortHeader>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((prop, i) => {
                  const occ = prop.units > 0 ? Math.round((prop.occupied / prop.units) * 100) : 0;
                  return (
                    <tr key={prop.id} className="border-b border-border last:border-0 hover:bg-gray-50 cursor-pointer">
                      <td className="px-4 py-3">
                        <span className="font-medium text-text-primary">{prop.address}</span>
                      </td>
                      <td className="px-4 py-3 text-text-secondary">{prop.city}, {prop.state}</td>
                      <td className="px-4 py-3 text-text-secondary">{prop.type}</td>
                      <td className="px-4 py-3">
                        <span className="text-text-primary">{prop.occupied}</span>
                        <span className="text-text-secondary">/{prop.units}</span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${occ >= 90 ? 'bg-green-500' : occ >= 75 ? 'bg-yellow-500' : 'bg-red-500'}`}
                              style={{ width: `${occ}%` }}
                            />
                          </div>
                          <span className="text-xs text-text-secondary">{occ}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-text-secondary">{prop.owner}</td>
                      <td className="px-4 py-3 font-medium text-text-primary">{formatCurrency(prop.monthlyRevenue)}</td>
                      <td className="px-4 py-3"><StatusBadge status={prop.status} /></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between px-4 py-3 border-t border-border bg-gray-50/50">
            <span className="text-xs text-text-secondary">Showing {filteredData.length} of {allProperties.length} properties</span>
            <div className="flex items-center gap-1 text-xs">
              <button className="px-2 py-1 rounded border border-border bg-white text-text-secondary hover:bg-gray-50 disabled:opacity-50" disabled>
                Previous
              </button>
              <button className="px-2 py-1 rounded border border-brand bg-brand text-white">1</button>
              <button className="px-2 py-1 rounded border border-border bg-white text-text-secondary hover:bg-gray-50 disabled:opacity-50" disabled>
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
