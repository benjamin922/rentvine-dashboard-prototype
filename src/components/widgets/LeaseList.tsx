import { useState } from "react";
import { leases, type Lease } from "../../data/leasing";
import { DataTable, type Column } from "../ui/DataTable";
import { Badge } from "../ui/Badge";

type BadgeVariant = "success" | "warning" | "error" | "default";

const fmt = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const statusVariant: Record<string, BadgeVariant> = {
  Active: "success",
  Expiring: "warning",
  Expired: "error",
  Pending: "default",
};

const columns: Column<Lease>[] = [
  { key: "tenantName", header: "Tenant" },
  { key: "propertyName", header: "Property" },
  { key: "unitNumber", header: "Unit" },
  {
    key: "monthlyRent",
    header: "Monthly Rent",
    align: "right",
    render: (row) => fmt.format(row.monthlyRent),
  },
  {
    key: "startDate",
    header: "Start Date",
    render: (row) => new Date(row.startDate + "T00:00:00").toLocaleDateString(),
  },
  {
    key: "endDate",
    header: "End Date",
    render: (row) => new Date(row.endDate + "T00:00:00").toLocaleDateString(),
  },
  {
    key: "status",
    header: "Status",
    render: (row) => (
      <Badge variant={statusVariant[row.status] ?? "default"}>
        {row.status}
      </Badge>
    ),
  },
  {
    key: "balance",
    header: "Balance",
    align: "right",
    render: (row) => (
      <span className={row.balance > 0 ? "text-rv-red font-medium" : ""}>
        {fmt.format(row.balance)}
      </span>
    ),
  },
];

const PAGE_SIZE = 8;

export default function LeaseList() {
  const [showAll, setShowAll] = useState(false);

  const data = showAll ? leases : leases.slice(0, PAGE_SIZE);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto">
        <DataTable columns={columns} data={data} />
      </div>

      {!showAll && leases.length > PAGE_SIZE && (
        <button
          type="button"
          onClick={() => setShowAll(true)}
          className="mt-2 w-full text-center text-sm text-rv-blue hover:text-rv-blue/80 font-medium py-1.5"
        >
          Show more ({leases.length - PAGE_SIZE} remaining)
        </button>
      )}
    </div>
  );
}
