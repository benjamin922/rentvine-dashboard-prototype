import { useState, useMemo, useCallback } from "react";
import { Search } from "lucide-react";
import { properties, type Property } from "../../data/properties";
import { CardContent } from "../../components/ui/Card";
import { DataTable, type Column } from "../../components/ui/DataTable";
import { Badge } from "../../components/ui/Badge";
import {
  FilterBar,
  type SavedView,
  type FilterValue,
  type FixedFilter,
  type AvailableField,
} from "../../components/ui/FilterBar";

/* ------------------------------------------------------------------ */
/*  Currency formatter                                                 */
/* ------------------------------------------------------------------ */

const fmt = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
});

/* ------------------------------------------------------------------ */
/*  Table columns                                                      */
/* ------------------------------------------------------------------ */

type PropertyRow = Property;

const columns: Column<PropertyRow>[] = [
  {
    key: "name",
    header: "Name",
    render: (row) => (
      <span className="font-medium text-rv-blue">{row.name}</span>
    ),
  },
  {
    key: "address",
    header: "Address",
  },
  {
    key: "cityState",
    header: "City / State",
    render: (row) => `${row.city}, ${row.state}`,
  },
  {
    key: "type",
    header: "Type",
    render: (row) => (
      <Badge
        variant={row.type === "residential" ? "info" : "default"}
        hideDot
      >
        {row.type === "residential" ? "Residential" : "Commercial"}
      </Badge>
    ),
  },
  {
    key: "totalUnits",
    header: "Total Units",
    align: "center",
  },
  {
    key: "occupiedUnits",
    header: "Occupied",
    align: "center",
  },
  {
    key: "vacancyRate",
    header: "Vacancy %",
    align: "center",
    render: (row) => {
      const rate = Math.round(
        ((row.totalUnits - row.occupiedUnits) / row.totalUnits) * 100,
      );
      return (
        <span
          className={
            rate === 0
              ? "text-rv-green font-medium"
              : rate > 15
                ? "text-rv-red font-medium"
                : "text-rv-black"
          }
        >
          {rate}%
        </span>
      );
    },
  },
  {
    key: "monthlyRevenue",
    header: "Monthly Revenue",
    align: "right",
    render: (row) => (
      <span className="font-medium">{fmt.format(row.monthlyRevenue)}</span>
    ),
  },
];

/* ------------------------------------------------------------------ */
/*  Static config                                                      */
/* ------------------------------------------------------------------ */

const DEFAULT_VIEWS: SavedView[] = [
  { id: "all", name: "All Properties", isDefault: true },
  { id: "residential", name: "Residential" },
  { id: "high-vacancy", name: "High Vacancy" },
  { id: "top-revenue", name: "Top Revenue" },
];

const FIXED_FILTERS: FixedFilter[] = [
  {
    field: "type",
    label: "Type",
    options: [
      { value: "all", label: "All" },
      { value: "residential", label: "Residential" },
      { value: "commercial", label: "Commercial" },
    ],
  },
];

const AVAILABLE_FIELDS: AvailableField[] = [
  { field: "city", label: "City", operators: ["="] },
  { field: "state", label: "State", operators: ["="] },
  { field: "vacancyRate", label: "Vacancy Rate %", operators: [">=", "<=", "="] },
  { field: "monthlyRevenue", label: "Monthly Revenue", operators: [">=", "<=", "="] },
  { field: "totalUnits", label: "Total Units", operators: [">=", "<=", "="] },
];

/* ------------------------------------------------------------------ */
/*  Helpers: preset filter sets per saved view                         */
/* ------------------------------------------------------------------ */

function presetForView(viewId: string): {
  fixedValues: Record<string, string>;
  dynamic: FilterValue[];
} {
  switch (viewId) {
    case "residential":
      return {
        fixedValues: { type: "residential" },
        dynamic: [],
      };
    case "high-vacancy":
      return {
        fixedValues: { type: "all" },
        dynamic: [
          {
            id: "preset-vac",
            field: "vacancyRate",
            operator: ">=",
            value: "15",
          },
        ],
      };
    case "top-revenue":
      return {
        fixedValues: { type: "all" },
        dynamic: [
          {
            id: "preset-rev",
            field: "monthlyRevenue",
            operator: ">=",
            value: "15000",
          },
        ],
      };
    default:
      return {
        fixedValues: { type: "all" },
        dynamic: [],
      };
  }
}

/* ------------------------------------------------------------------ */
/*  Filter logic                                                       */
/* ------------------------------------------------------------------ */

function applyFilters(
  data: Property[],
  fixedValues: Record<string, string>,
  dynamic: FilterValue[],
  search: string,
): Property[] {
  return data.filter((p) => {
    // Text search
    if (search) {
      const q = search.toLowerCase();
      const matchesSearch =
        p.name.toLowerCase().includes(q) ||
        p.address.toLowerCase().includes(q) ||
        p.city.toLowerCase().includes(q) ||
        p.state.toLowerCase().includes(q);
      if (!matchesSearch) return false;
    }

    // Fixed: type
    const typeVal = fixedValues.type ?? "all";
    if (typeVal !== "all" && p.type !== typeVal) return false;

    // Dynamic filters
    for (const f of dynamic) {
      if (!f.value) continue;

      const vacancyRate = Math.round(
        ((p.totalUnits - p.occupiedUnits) / p.totalUnits) * 100,
      );

      let actual: number | string;
      switch (f.field) {
        case "city":
          actual = p.city.toLowerCase();
          if (actual !== f.value.toLowerCase()) return false;
          continue;
        case "state":
          actual = p.state.toLowerCase();
          if (actual !== f.value.toLowerCase()) return false;
          continue;
        case "vacancyRate":
          actual = vacancyRate;
          break;
        case "monthlyRevenue":
          actual = p.monthlyRevenue;
          break;
        case "totalUnits":
          actual = p.totalUnits;
          break;
        default:
          continue;
      }

      const numVal = parseFloat(f.value);
      if (isNaN(numVal)) continue;

      switch (f.operator) {
        case ">=":
          if ((actual as number) < numVal) return false;
          break;
        case "<=":
          if ((actual as number) > numVal) return false;
          break;
        case "=":
          if ((actual as number) !== numVal) return false;
          break;
      }
    }

    return true;
  });
}

/* ------------------------------------------------------------------ */
/*  Page component                                                     */
/* ------------------------------------------------------------------ */

export default function PropertiesListPage() {
  // Search state
  const [search, setSearch] = useState("");

  // Saved views
  const [savedViews, setSavedViews] = useState<SavedView[]>(DEFAULT_VIEWS);
  const [activeViewId, setActiveViewId] = useState("all");

  // Filter state: "draft" is the current editing state, "applied" is the committed state
  const [draftFixedValues, setDraftFixedValues] = useState<Record<string, string>>({ type: "all" });
  const [draftDynamic, setDraftDynamic] = useState<FilterValue[]>([]);

  const [appliedFixedValues, setAppliedFixedValues] = useState<Record<string, string>>({ type: "all" });
  const [appliedDynamic, setAppliedDynamic] = useState<FilterValue[]>([]);

  // Detect uncommitted changes
  const hasChanges = useMemo(() => {
    const fixedChanged =
      JSON.stringify(draftFixedValues) !== JSON.stringify(appliedFixedValues);
    const dynamicChanged =
      JSON.stringify(draftDynamic) !== JSON.stringify(appliedDynamic);
    return fixedChanged || dynamicChanged;
  }, [draftFixedValues, draftDynamic, appliedFixedValues, appliedDynamic]);

  // Filtered data uses APPLIED state (not draft) + live search
  const filtered = useMemo(
    () => applyFilters(properties, appliedFixedValues, appliedDynamic, search),
    [appliedFixedValues, appliedDynamic, search],
  );

  // ---- Callbacks ----

  const handleViewChange = useCallback(
    (viewId: string) => {
      setActiveViewId(viewId);
      const preset = presetForView(viewId);
      setDraftFixedValues(preset.fixedValues);
      setDraftDynamic(preset.dynamic);
      // Auto-apply when switching views
      setAppliedFixedValues(preset.fixedValues);
      setAppliedDynamic(preset.dynamic);
    },
    [],
  );

  const handleSaveView = useCallback(
    (name: string) => {
      const newView: SavedView = {
        id: `custom-${Date.now()}`,
        name,
      };
      setSavedViews((prev) => [...prev, newView]);
      setActiveViewId(newView.id);
    },
    [],
  );

  const handleFixedFilterChange = useCallback(
    (field: string, value: string) => {
      setDraftFixedValues((prev) => ({ ...prev, [field]: value }));
    },
    [],
  );

  const handleAddFilter = useCallback((filter: FilterValue) => {
    setDraftDynamic((prev) => [...prev, filter]);
  }, []);

  const handleRemoveFilter = useCallback((id: string) => {
    setDraftDynamic((prev) => prev.filter((f) => f.id !== id));
  }, []);

  const handleUpdateFilter = useCallback(
    (id: string, partial: Partial<FilterValue>) => {
      setDraftDynamic((prev) =>
        prev.map((f) => (f.id === id ? { ...f, ...partial } : f)),
      );
    },
    [],
  );

  const handleApply = useCallback(() => {
    setAppliedFixedValues({ ...draftFixedValues });
    setAppliedDynamic([...draftDynamic]);
  }, [draftFixedValues, draftDynamic]);

  const handleReset = useCallback(() => {
    setDraftFixedValues({ ...appliedFixedValues });
    setDraftDynamic([...appliedDynamic]);
  }, [appliedFixedValues, appliedDynamic]);

  // ---- Render ----

  return (
    <div className="space-y-5">
      {/* ---- Header ---- */}
      <div>
        <h1 className="text-2xl font-semibold text-rv-blue-dark leading-tight">
          Properties List
        </h1>
        <p className="text-sm text-rv-gray mt-1">
          Full listing of all managed properties
        </p>
      </div>

      {/* ---- FilterBar ---- */}
      <FilterBar
        savedViews={savedViews}
        activeViewId={activeViewId}
        onViewChange={handleViewChange}
        onSaveView={handleSaveView}
        fixedFilters={FIXED_FILTERS}
        fixedFilterValues={draftFixedValues}
        onFixedFilterChange={handleFixedFilterChange}
        dynamicFilters={draftDynamic}
        onAddFilter={handleAddFilter}
        onRemoveFilter={handleRemoveFilter}
        onUpdateFilter={handleUpdateFilter}
        availableFields={AVAILABLE_FIELDS}
        hasChanges={hasChanges}
        onApply={handleApply}
        onReset={handleReset}
        trailing={
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-rv-gray pointer-events-none" />
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-48 pl-8 pr-3 py-1.5 text-xs rounded-lg border border-rv-lightgray bg-white text-rv-black placeholder:text-rv-gray focus:outline-none focus:ring-2 focus:ring-rv-blue/30 focus:border-rv-blue transition-colors"
            />
          </div>
        }
      />

      {/* ---- Data table ---- */}
      <div className="bg-white border border-rv-lightgray rounded-xl">
        <CardContent>
          <DataTable
            columns={columns}
            data={filtered}
            emptyMessage="No properties match your filter criteria."
          />
        </CardContent>

        {/* Row count footer */}
        <div className="px-4 py-3 border-t border-rv-lightgray flex items-center justify-between">
          <p className="text-xs text-rv-gray">
            Showing {filtered.length} of {properties.length} properties
          </p>
          {hasChanges && (
            <p className="text-xs text-rv-blue">
              Filters have uncommitted changes. Click "Apply Filters" to update
              results.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
