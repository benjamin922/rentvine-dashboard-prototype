import {
  Wrench,
  AlertTriangle,
  Clock,
  Plus,
  UserPlus,
  CalendarDays,
  FileBarChart,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { workOrders, workOrderStats } from "../../data/maintenance";
import { Card, CardHeader, CardContent } from "../../components/ui/Card";
import { StatCard } from "../../components/ui/StatCard";
import { DataTable, type Column } from "../../components/ui/DataTable";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";

/* ------------------------------------------------------------------ */
/*  Date reference                                                      */
/* ------------------------------------------------------------------ */

const TODAY = new Date("2026-02-26T00:00:00");

/* ------------------------------------------------------------------ */
/*  Derived data                                                        */
/* ------------------------------------------------------------------ */

const openStatuses = ["Open", "In Progress", "Pending Vendor"];

// Unassigned work orders (open, no vendor, 48+ hours old)
const unassignedOrders = workOrders
  .filter(
    (wo) =>
      wo.status === "Open" && wo.assignedVendor === null
  )
  .map((wo) => {
    const created = new Date(wo.createdDate + "T00:00:00");
    const daysOpen = Math.floor(
      (TODAY.getTime() - created.getTime()) / (1000 * 60 * 60 * 24)
    );
    return { ...wo, daysOpen };
  })
  .sort((a, b) => b.daysOpen - a.daysOpen);

// Overdue work orders (due date passed, still active)
const overdueOrders = workOrders
  .filter((wo) => {
    const due = new Date(wo.dueDate + "T00:00:00");
    return (
      due < TODAY &&
      openStatuses.includes(wo.status) &&
      wo.status !== "Completed" &&
      wo.status !== "Closed"
    );
  })
  .map((wo) => {
    const due = new Date(wo.dueDate + "T00:00:00");
    const daysOverdue = Math.floor(
      (TODAY.getTime() - due.getTime()) / (1000 * 60 * 60 * 24)
    );
    return { ...wo, daysOverdue };
  })
  .sort((a, b) => b.daysOverdue - a.daysOverdue);

// Emergency orders
const emergencyOrders = workOrders.filter(
  (wo) =>
    wo.priority === "Emergency" &&
    wo.status !== "Completed" &&
    wo.status !== "Closed"
);

// Pending Vendor with no response in 72+ hours
const pendingVendorOrders = workOrders.filter((wo) => {
  if (wo.status !== "Pending Vendor") return false;
  const created = new Date(wo.createdDate + "T00:00:00");
  const daysSince = Math.floor(
    (TODAY.getTime() - created.getTime()) / (1000 * 60 * 60 * 24)
  );
  return daysSince >= 3;
});

// Completed this month
const completedThisMonth = workOrders.filter(
  (wo) =>
    wo.completedDate !== null &&
    wo.completedDate.startsWith("2026-02")
).length;

/* ------------------------------------------------------------------ */
/*  Needs Attention alerts                                              */
/* ------------------------------------------------------------------ */

interface AttentionAlert {
  id: string;
  severity: "error" | "warning";
  title: string;
  description: string;
  cta: string;
}

const unassigned48h = unassignedOrders.filter((wo) => wo.daysOpen >= 2);
const overdue5d = overdueOrders.filter((wo) => wo.daysOverdue >= 5);

const attentionAlerts: AttentionAlert[] = [
  ...(unassigned48h.length > 0
    ? [
        {
          id: "unassigned-48h",
          severity: "error" as const,
          title: `${unassigned48h.length} work order${unassigned48h.length > 1 ? "s" : ""} unassigned for 48+ hours`,
          description: `Including: ${unassigned48h.slice(0, 2).map((wo) => `"${wo.title}" at ${wo.propertyName}`).join(", ")}${unassigned48h.length > 2 ? ` and ${unassigned48h.length - 2} more` : ""}`,
          cta: "Assign Vendors",
        },
      ]
    : []),
  ...(emergencyOrders.length > 0
    ? [
        {
          id: "emergency",
          severity: "error" as const,
          title: `${emergencyOrders.length} emergency work order${emergencyOrders.length > 1 ? "s" : ""} require immediate attention`,
          description: `${emergencyOrders.map((wo) => `"${wo.title}" at ${wo.propertyName} #${wo.unitNumber}`).join("; ")}`,
          cta: "View Emergency",
        },
      ]
    : []),
  ...(overdue5d.length > 0
    ? [
        {
          id: "overdue-5d",
          severity: "warning" as const,
          title: `${overdue5d.length} work order${overdue5d.length > 1 ? "s" : ""} overdue by 5+ days`,
          description: `Most overdue: "${overdue5d[0]?.title}" — ${overdue5d[0]?.daysOverdue} days past due date`,
          cta: "Escalate",
        },
      ]
    : []),
  ...(pendingVendorOrders.length > 0
    ? [
        {
          id: "vendor-no-response",
          severity: "warning" as const,
          title: `${pendingVendorOrders.length} vendor${pendingVendorOrders.length > 1 ? "s" : ""} haven't responded in 72+ hours`,
          description: `Vendors: ${[...new Set(pendingVendorOrders.map((wo) => wo.assignedVendor))].filter(Boolean).join(", ")}`,
          cta: "Follow Up",
        },
      ]
    : []),
];

/* ------------------------------------------------------------------ */
/*  Unassigned Work Orders table columns                                */
/* ------------------------------------------------------------------ */

type UnassignedRow = (typeof unassignedOrders)[number];

const priorityVariant: Record<string, "error" | "warning" | "info" | "default"> = {
  Emergency: "error",
  High: "warning",
  Medium: "info",
  Low: "default",
};

const unassignedColumns: Column<UnassignedRow>[] = [
  {
    key: "title",
    header: "Title",
    render: (row) => (
      <span className="font-medium text-rv-black">{row.title}</span>
    ),
  },
  {
    key: "propertyName",
    header: "Property",
    render: (row) => (
      <span className="text-sm text-rv-gray">
        {row.propertyName} #{row.unitNumber}
      </span>
    ),
  },
  {
    key: "priority",
    header: "Priority",
    align: "center",
    render: (row) => (
      <Badge variant={priorityVariant[row.priority] || "default"} hideDot>
        {row.priority}
      </Badge>
    ),
  },
  {
    key: "createdDate",
    header: "Created",
    render: (row) => {
      const d = new Date(row.createdDate + "T00:00:00");
      return (
        <span className="text-sm text-rv-gray">
          {d.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
        </span>
      );
    },
  },
  {
    key: "daysOpen",
    header: "Days Open",
    align: "center",
    render: (row) => (
      <Badge
        variant={row.daysOpen >= 4 ? "error" : row.daysOpen >= 2 ? "warning" : "info"}
        hideDot
      >
        {row.daysOpen}d
      </Badge>
    ),
  },
];

/* ------------------------------------------------------------------ */
/*  Overdue Work Orders table columns                                   */
/* ------------------------------------------------------------------ */

type OverdueRow = (typeof overdueOrders)[number];

const overdueColumns: Column<OverdueRow>[] = [
  {
    key: "title",
    header: "Title",
    render: (row) => (
      <span className="font-medium text-rv-black">{row.title}</span>
    ),
  },
  {
    key: "propertyName",
    header: "Property",
    render: (row) => (
      <span className="text-sm text-rv-gray">
        {row.propertyName} #{row.unitNumber}
      </span>
    ),
  },
  {
    key: "assignedVendor",
    header: "Vendor",
    render: (row) => (
      <span className="text-sm text-rv-gray">
        {row.assignedVendor ?? "Unassigned"}
      </span>
    ),
  },
  {
    key: "dueDate",
    header: "Due Date",
    render: (row) => {
      const d = new Date(row.dueDate + "T00:00:00");
      return (
        <span className="text-sm text-rv-red font-medium">
          {d.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
        </span>
      );
    },
  },
  {
    key: "daysOverdue",
    header: "Days Overdue",
    align: "center",
    render: (row) => (
      <Badge variant="error" hideDot>
        {row.daysOverdue}d
      </Badge>
    ),
  },
];

/* ------------------------------------------------------------------ */
/*  Page component                                                      */
/* ------------------------------------------------------------------ */

export default function MaintenancePage() {
  const hasAlerts = attentionAlerts.length > 0;

  return (
    <div className="space-y-6">
      {/* ---- Header ---- */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-amber-50">
            <Wrench className="h-5 w-5 text-amber-600" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-rv-blue-dark leading-tight">
              Maintenance
            </h1>
            <p className="text-sm text-rv-gray">
              What needs your attention today
            </p>
          </div>
        </div>
      </div>

      {/* ---- Summary bar ---- */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <StatCard
          label="Open Work Orders"
          value={workOrderStats.open}
          className="border border-rv-lightgray"
        />
        <StatCard
          label="In Progress"
          value={workOrderStats.inProgress}
          className="border border-rv-lightgray"
        />
        <StatCard
          label="Overdue"
          value={overdueOrders.length}
          className="border border-rv-lightgray"
        />
        <StatCard
          label="Avg Resolution"
          value={`${workOrderStats.avgResolutionDays}d`}
          trend={{ direction: "down", value: "-0.4d vs last month" }}
          className="border border-rv-lightgray"
        />
        <StatCard
          label="Completed This Month"
          value={completedThisMonth}
          trend={{ direction: "up", value: "+3 vs last month" }}
          className="border border-rv-lightgray"
        />
        <StatCard
          label="Pending Vendor"
          value={workOrderStats.pendingVendor}
          className="border border-rv-lightgray"
        />
      </div>

      {/* ---- Needs Attention ---- */}
      {hasAlerts ? (
        <div>
          <h2 className="text-lg font-semibold text-rv-black mb-3 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-rv-red" />
            Needs Attention
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {attentionAlerts.map((alert) => (
              <Card
                key={alert.id}
                className={`border-l-4 ${
                  alert.severity === "error"
                    ? "border-l-rv-red"
                    : "border-l-amber-500"
                }`}
              >
                <CardContent className="flex items-start gap-3">
                  <div
                    className={`mt-0.5 shrink-0 ${
                      alert.severity === "error"
                        ? "text-rv-red"
                        : "text-amber-500"
                    }`}
                  >
                    {alert.severity === "error" ? (
                      <AlertTriangle className="h-5 w-5" />
                    ) : (
                      <Clock className="h-5 w-5" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold text-rv-black text-sm">
                          {alert.title}
                        </p>
                        <p className="text-xs text-rv-gray mt-0.5 leading-relaxed">
                          {alert.description}
                        </p>
                      </div>
                      <Button
                        size="sm"
                        variant={
                          alert.severity === "error" ? "primary" : "secondary"
                        }
                        className="shrink-0"
                      >
                        {alert.cta}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        <Card className="border-l-4 border-l-rv-green">
          <CardContent className="flex items-center gap-3 py-6">
            <CheckCircle2 className="h-8 w-8 text-rv-green" />
            <div>
              <p className="font-semibold text-rv-black text-lg">
                All caught up!
              </p>
              <p className="text-sm text-rv-gray">
                No maintenance items require your immediate attention. All work orders are on track.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* ---- Data slices ---- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Unassigned Work Orders */}
        <Card>
          <CardHeader
            title="Unassigned Work Orders"
            action={
              <button className="inline-flex items-center gap-1 text-sm text-rv-blue hover:text-rv-blue-dark font-medium transition-colors">
                View all <ArrowRight className="h-3.5 w-3.5" />
              </button>
            }
          />
          <CardContent>
            <DataTable
              columns={unassignedColumns}
              data={unassignedOrders.slice(0, 5)}
              emptyMessage="No unassigned work orders"
            />
          </CardContent>
        </Card>

        {/* Overdue Work Orders */}
        <Card>
          <CardHeader
            title="Overdue Work Orders"
            action={
              <button className="inline-flex items-center gap-1 text-sm text-rv-blue hover:text-rv-blue-dark font-medium transition-colors">
                View all <ArrowRight className="h-3.5 w-3.5" />
              </button>
            }
          />
          <CardContent>
            {overdueOrders.length > 0 ? (
              <DataTable
                columns={overdueColumns}
                data={overdueOrders.slice(0, 5)}
                emptyMessage="No overdue work orders"
              />
            ) : (
              <div className="flex items-center gap-2 py-6 justify-center text-rv-gray">
                <CheckCircle2 className="h-5 w-5 text-rv-green" />
                <span className="text-sm">No overdue work orders</span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* ---- Quick Actions ---- */}
      <div>
        <h2 className="text-sm font-medium text-rv-gray mb-2 uppercase tracking-wide">
          Quick Actions
        </h2>
        <div className="flex flex-wrap gap-3">
          <Button variant="secondary" size="sm" icon={<Plus />}>
            Create Work Order
          </Button>
          <Button variant="secondary" size="sm" icon={<UserPlus />}>
            Assign Vendor
          </Button>
          <Button variant="secondary" size="sm" icon={<CalendarDays />}>
            View Schedule
          </Button>
          <Button variant="secondary" size="sm" icon={<FileBarChart />}>
            Generate Report
          </Button>
        </div>
      </div>
    </div>
  );
}
