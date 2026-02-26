import { useState } from "react";
import { workOrders, type WorkOrder } from "../../data/maintenance";
import { DataTable, type Column } from "../ui/DataTable";
import { Badge } from "../ui/Badge";

type BadgeVariant = "success" | "warning" | "error" | "info" | "default";

const statusVariant: Record<string, BadgeVariant> = {
  Open: "info",
  "In Progress": "warning",
  "Pending Vendor": "default",
  Completed: "success",
  Closed: "default",
};

const priorityVariant: Record<string, BadgeVariant> = {
  Emergency: "error",
  High: "warning",
  Medium: "info",
  Low: "default",
};

const columns: Column<WorkOrder>[] = [
  { key: "title", header: "Title" },
  { key: "propertyName", header: "Property" },
  { key: "unitNumber", header: "Unit" },
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
    key: "priority",
    header: "Priority",
    render: (row) => (
      <Badge variant={priorityVariant[row.priority] ?? "default"}>
        {row.priority}
      </Badge>
    ),
  },
  {
    key: "assignedVendor",
    header: "Assigned Vendor",
    render: (row) => row.assignedVendor ?? "Unassigned",
  },
  {
    key: "createdDate",
    header: "Created Date",
    render: (row) =>
      new Date(row.createdDate + "T00:00:00").toLocaleDateString(),
  },
  {
    key: "dueDate",
    header: "Due Date",
    render: (row) =>
      new Date(row.dueDate + "T00:00:00").toLocaleDateString(),
  },
];

const PAGE_SIZE = 8;

export default function WorkOrderList() {
  const [showAll, setShowAll] = useState(false);

  const data = showAll ? workOrders : workOrders.slice(0, PAGE_SIZE);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto">
        <DataTable columns={columns} data={data} />
      </div>

      {!showAll && workOrders.length > PAGE_SIZE && (
        <button
          type="button"
          onClick={() => setShowAll(true)}
          className="mt-2 w-full text-center text-sm text-rv-blue hover:text-rv-blue/80 font-medium py-1.5"
        >
          Show more ({workOrders.length - PAGE_SIZE} remaining)
        </button>
      )}
    </div>
  );
}
