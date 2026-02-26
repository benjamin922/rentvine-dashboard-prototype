import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { properties } from "../../data/properties";
import { Card, CardContent } from "../../components/ui/Card";
import { DataTable, type Column } from "../../components/ui/DataTable";
import { Badge } from "../../components/ui/Badge";

/* ------------------------------------------------------------------ */
/*  Currency formatter                                                  */
/* ------------------------------------------------------------------ */

const fmt = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
});

/* ------------------------------------------------------------------ */
/*  Table columns                                                      */
/* ------------------------------------------------------------------ */

type PropertyRow = (typeof properties)[number];

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
        ((row.totalUnits - row.occupiedUnits) / row.totalUnits) * 100
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
/*  Page component                                                     */
/* ------------------------------------------------------------------ */

export default function PropertiesListPage() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<"all" | "residential" | "commercial">("all");

  const filtered = useMemo(() => {
    return properties.filter((p) => {
      const matchesSearch =
        search === "" ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.address.toLowerCase().includes(search.toLowerCase()) ||
        p.city.toLowerCase().includes(search.toLowerCase()) ||
        p.state.toLowerCase().includes(search.toLowerCase());

      const matchesType = typeFilter === "all" || p.type === typeFilter;

      return matchesSearch && matchesType;
    });
  }, [search, typeFilter]);

  return (
    <div className="space-y-6">
      {/* ---- Header ---- */}
      <div>
        <h1 className="text-2xl font-semibold text-rv-blue-dark leading-tight">
          Properties List
        </h1>
        <p className="text-sm text-rv-gray mt-1">
          Full listing of all managed properties
        </p>
      </div>

      {/* ---- Filter bar ---- */}
      <Card className="!p-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Search input */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-rv-gray pointer-events-none" />
            <input
              type="text"
              placeholder="Search by name, address, city, or state..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-rv-lightgray bg-white text-rv-black placeholder:text-rv-gray focus:outline-none focus:ring-2 focus:ring-rv-blue/30 focus:border-rv-blue transition-colors"
            />
          </div>

          {/* Type filter */}
          <select
            value={typeFilter}
            onChange={(e) =>
              setTypeFilter(e.target.value as "all" | "residential" | "commercial")
            }
            className="px-3 py-2 text-sm rounded-lg border border-rv-lightgray bg-white text-rv-black focus:outline-none focus:ring-2 focus:ring-rv-blue/30 focus:border-rv-blue transition-colors cursor-pointer"
          >
            <option value="all">All Types</option>
            <option value="residential">Residential</option>
            <option value="commercial">Commercial</option>
          </select>
        </div>
      </Card>

      {/* ---- Data table ---- */}
      <Card>
        <CardContent>
          <DataTable
            columns={columns}
            data={filtered}
            emptyMessage="No properties match your search criteria."
          />
        </CardContent>
        {/* Row count footer */}
        <div className="mt-3 pt-3 border-t border-rv-lightgray flex items-center justify-between px-1">
          <p className="text-xs text-rv-gray">
            Showing {filtered.length} of {properties.length} properties
          </p>
        </div>
      </Card>
    </div>
  );
}
