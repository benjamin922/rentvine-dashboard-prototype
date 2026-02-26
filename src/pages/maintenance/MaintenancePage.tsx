import { Wrench } from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  workOrders,
  workOrderStats,
  workOrdersByMonth,
  workOrdersByStatus,
} from "../../data/maintenance";
import { Card, CardHeader, CardContent } from "../../components/ui/Card";
import { StatCard } from "../../components/ui/StatCard";
import { DataTable, type Column } from "../../components/ui/DataTable";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";

/* ------------------------------------------------------------------ */
/*  Status & priority badge variant maps                               */
/* ------------------------------------------------------------------ */

const statusVariant: Record<string, "info" | "warning" | "success" | "default"> = {
  Open: "info",
  "In Progress": "warning",
  Completed: "success",
  Closed: "default",
  "Pending Vendor": "warning",
};

const priorityVariant: Record<string, "error" | "warning" | "info" | "default"> = {
  Emergency: "error",
  High: "warning",
  Medium: "info",
  Low: "default",
};

/* ------------------------------------------------------------------ */
/*  Work orders table columns                                          */
/* ------------------------------------------------------------------ */

type WorkOrderRow = (typeof workOrders)[number];

const columns: Column<WorkOrderRow>[] = [
  {
    key: "title",
    header: "Title",
    render: (row) => (
      <span className="font-medium text-rv-blue">{row.title}</span>
    ),
  },
  {
    key: "property",
    header: "Property / Unit",
    render: (row) => (
      <div>
        <p className="text-sm text-rv-black">{row.propertyName}</p>
        <p className="text-xs text-rv-gray">#{row.unitNumber}</p>
      </div>
    ),
  },
  {
    key: "status",
    header: "Status",
    align: "center",
    render: (row) => (
      <Badge variant={statusVariant[row.status] || "default"}>
        {row.status}
      </Badge>
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
    key: "assignedVendor",
    header: "Vendor",
    render: (row) => (
      <span className="text-sm text-rv-gray">
        {row.assignedVendor || "Unassigned"}
      </span>
    ),
  },
  {
    key: "createdDate",
    header: "Created",
    render: (row) => {
      const d = new Date(row.createdDate + "T00:00:00");
      return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    },
  },
  {
    key: "dueDate",
    header: "Due Date",
    render: (row) => {
      const d = new Date(row.dueDate + "T00:00:00");
      const now = new Date("2026-02-26T00:00:00");
      const isOverdue = d < now && row.status !== "Completed" && row.status !== "Closed";
      return (
        <span className={isOverdue ? "text-rv-red font-medium" : "text-rv-black"}>
          {d.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
          {isOverdue && " (Overdue)"}
        </span>
      );
    },
  },
];

/* ------------------------------------------------------------------ */
/*  Custom PieChart label                                              */
/* ------------------------------------------------------------------ */

const renderPieLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
}) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  if (percent < 0.06) return null;
  return (
    <text
      x={x}
      y={y}
      fill="#fff"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={12}
      fontWeight={600}
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

/* ------------------------------------------------------------------ */
/*  Custom chart tooltip                                               */
/* ------------------------------------------------------------------ */

function BarTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value: number; name: string; color: string }>;
  label?: string;
}) {
  if (!active || !payload) return null;
  return (
    <div className="bg-white border border-rv-lightgray rounded-lg p-3 shadow-sm text-xs">
      <p className="font-medium text-rv-black mb-1.5">{label}</p>
      {payload.map((entry, i) => (
        <div key={i} className="flex items-center gap-2">
          <span
            className="h-2 w-2 rounded-full shrink-0"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-rv-gray">{entry.name}:</span>
          <span className="font-medium text-rv-black">{entry.value}</span>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Sort active work orders first                                      */
/* ------------------------------------------------------------------ */

const activeStatuses = ["Open", "In Progress", "Pending Vendor"];
const sortedWorkOrders = [...workOrders].sort((a, b) => {
  const aActive = activeStatuses.includes(a.status) ? 0 : 1;
  const bActive = activeStatuses.includes(b.status) ? 0 : 1;
  if (aActive !== bActive) return aActive - bActive;
  return new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime();
});

/* ------------------------------------------------------------------ */
/*  Page component                                                     */
/* ------------------------------------------------------------------ */

export default function MaintenancePage() {
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
              Work orders and maintenance tracking
            </p>
          </div>
        </div>
        <Button icon={<Wrench />}>Create Work Order</Button>
      </div>

      {/* ---- Stats row ---- */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <StatCard
          label="Total"
          value={workOrderStats.total}
          className="border border-rv-lightgray"
        />
        <StatCard
          label="Open"
          value={workOrderStats.open}
          className="border border-rv-lightgray"
        />
        <StatCard
          label="In Progress"
          value={workOrderStats.inProgress}
          className="border border-rv-lightgray"
        />
        <StatCard
          label="Completed"
          value={workOrderStats.completed}
          trend={{ direction: "up", value: "+3 this week" }}
          className="border border-rv-lightgray"
        />
        <StatCard
          label="Overdue"
          value={workOrderStats.overdue}
          trend={{ direction: "down", value: "-1 vs last week" }}
          className="border border-rv-lightgray"
        />
        <StatCard
          label="Avg Resolution"
          value={`${workOrderStats.avgResolutionDays}d`}
          trend={{ direction: "down", value: "-0.4d vs last month" }}
          className="border border-rv-lightgray"
        />
      </div>

      {/* ---- Two-column charts ---- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Donut: Work Orders by Status */}
        <Card>
          <CardHeader title="Work Orders by Status" />
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={workOrdersByStatus}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={3}
                  dataKey="count"
                  nameKey="status"
                  labelLine={false}
                  label={renderPieLabel as any}
                >
                  {workOrdersByStatus.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={((value: number, name: string) => [
                    `${value} orders`,
                    name,
                  ]) as any}
                  contentStyle={{
                    borderRadius: 8,
                    border: "1px solid #EAEAEA",
                    fontSize: 13,
                  }}
                />
                <Legend
                  verticalAlign="bottom"
                  iconType="circle"
                  iconSize={8}
                  formatter={((value: string) => (
                    <span className="text-xs text-rv-gray">{value}</span>
                  )) as any}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Bar: Work Orders by Month */}
        <Card>
          <CardHeader title="Work Orders by Month" subtitle="Opened vs Closed" />
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart
                data={workOrdersByMonth}
                margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#EAEAEA" />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 12, fill: "#6B7280" }}
                  axisLine={{ stroke: "#EAEAEA" }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: "#6B7280" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<BarTooltip />} />
                <Legend
                  verticalAlign="top"
                  align="right"
                  iconType="circle"
                  iconSize={8}
                  wrapperStyle={{ fontSize: 12, paddingBottom: 8 }}
                />
                <Bar
                  dataKey="opened"
                  name="Opened"
                  fill="#FFA100"
                  radius={[4, 4, 0, 0]}
                  barSize={24}
                />
                <Bar
                  dataKey="closed"
                  name="Closed"
                  fill="#1473CC"
                  radius={[4, 4, 0, 0]}
                  barSize={24}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* ---- Recent Work Orders (full width) ---- */}
      <Card>
        <CardHeader
          title="Recent Work Orders"
          subtitle={`${workOrderStats.total} total work orders`}
        />
        <CardContent>
          <DataTable
            columns={columns}
            data={sortedWorkOrders}
          />
        </CardContent>
      </Card>
    </div>
  );
}
