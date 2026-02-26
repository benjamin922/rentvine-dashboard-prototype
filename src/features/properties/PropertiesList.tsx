import FilterBar from '../../components/FilterBar/FilterBar';
import DataTable from '../../components/DataTable';
import { propertiesListData, savedViews } from '../../data/properties';

export default function PropertiesList() {
  const columns = [
    { key: 'address', label: 'Address', render: (val: unknown) => <span className="font-medium text-slate-900">{val as string}</span> },
    { key: 'city', label: 'City' },
    { key: 'state', label: 'State' },
    { key: 'type', label: 'Type' },
    { key: 'units', label: 'Units' },
    {
      key: 'occupied',
      label: 'Occupied',
      render: (val: unknown, row: Record<string, unknown>) => {
        const occupied = val as number;
        const total = row.units as number;
        const pct = total > 0 ? Math.round((occupied / total) * 100) : 0;
        return (
          <span>
            {occupied}/{total}{' '}
            <span className={`text-xs ${pct === 100 ? 'text-green-600' : pct >= 80 ? 'text-amber-600' : 'text-red-600'}`}>
              ({pct}%)
            </span>
          </span>
        );
      },
    },
    {
      key: 'status',
      label: 'Status',
      render: (val: unknown) => {
        const s = val as string;
        const colors: Record<string, string> = {
          Active: 'bg-green-100 text-green-700',
          Inactive: 'bg-slate-100 text-slate-600',
          Archived: 'bg-slate-100 text-slate-400',
        };
        return (
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${colors[s] || ''}`}>
            {s}
          </span>
        );
      },
    },
    { key: 'owner', label: 'Owner' },
    { key: 'manager', label: 'Manager' },
    {
      key: 'rent',
      label: 'Avg Rent',
      render: (val: unknown) => <span>${(val as number).toLocaleString()}</span>,
    },
    { key: 'portfolio', label: 'Portfolio' },
  ];

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-bold text-slate-900">All Properties</h1>
        <p className="text-sm text-slate-500 mt-0.5">Manage and filter your entire property portfolio</p>
      </div>

      <FilterBar views={savedViews} />

      <DataTable
        columns={columns}
        data={propertiesListData}
      />
    </div>
  );
}
