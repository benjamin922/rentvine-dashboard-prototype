import { DollarSign, CreditCard, FileText } from "lucide-react";
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  financialSummary,
  recentTransactions,
  overdueBalances,
  monthlyRevenue,
} from "../../data/accounting";
import { Card, CardHeader, CardContent } from "../../components/ui/Card";
import { StatCard } from "../../components/ui/StatCard";
import { DataTable, type Column } from "../../components/ui/DataTable";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";

/* ------------------------------------------------------------------ */
/*  Currency formatters                                                */
/* ------------------------------------------------------------------ */

const fmt = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
});

const fmtCompact = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
  notation: "compact",
});

/* ------------------------------------------------------------------ */
/*  Overdue balances table columns                                     */
/* ------------------------------------------------------------------ */

type OverdueRow = (typeof overdueBalances)[number];

const overdueColumns: Column<OverdueRow>[] = [
  {
    key: "tenantName",
    header: "Tenant",
    render: (row) => (
      <div>
        <p className="font-medium text-rv-black">{row.tenantName}</p>
        <p className="text-xs text-rv-gray">{row.propertyName} #{row.unit}</p>
      </div>
    ),
  },
  {
    key: "amountDue",
    header: "Amount",
    align: "right",
    render: (row) => (
      <span className="font-medium text-rv-red">{fmt.format(row.amountDue)}</span>
    ),
  },
  {
    key: "daysPastDue",
    header: "Days Late",
    align: "center",
    render: (row) => (
      <Badge variant={row.daysPastDue > 20 ? "error" : row.daysPastDue > 10 ? "warning" : "info"} hideDot>
        {row.daysPastDue}d
      </Badge>
    ),
  },
];

/* ------------------------------------------------------------------ */
/*  Recent transactions table columns                                  */
/* ------------------------------------------------------------------ */

type TransactionRow = (typeof recentTransactions)[number];

const transactionColumns: Column<TransactionRow>[] = [
  {
    key: "date",
    header: "Date",
    render: (row) => {
      const d = new Date(row.date + "T00:00:00");
      return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    },
  },
  {
    key: "type",
    header: "Type",
    render: (row) => {
      const variantMap: Record<string, "success" | "info" | "warning" | "error"> = {
        Payment: "success",
        Charge: "info",
        Refund: "warning",
        Credit: "warning",
      };
      return (
        <Badge variant={variantMap[row.type] || "default"} hideDot>
          {row.type}
        </Badge>
      );
    },
  },
  {
    key: "description",
    header: "Description",
    render: (row) => (
      <span className="text-sm text-rv-black truncate block max-w-[280px]">
        {row.description}
      </span>
    ),
  },
  {
    key: "amount",
    header: "Amount",
    align: "right",
    render: (row) => (
      <span
        className={`font-medium ${
          row.amount < 0 ? "text-rv-red" : "text-rv-green"
        }`}
      >
        {row.amount < 0 ? "-" : ""}
        {fmt.format(Math.abs(row.amount))}
      </span>
    ),
  },
  {
    key: "propertyName",
    header: "Property",
    render: (row) => (
      <span className="text-sm text-rv-gray">{row.propertyName}</span>
    ),
  },
  {
    key: "status",
    header: "Status",
    align: "center",
    render: (row) => {
      const variantMap: Record<string, "success" | "warning" | "error" | "info" | "default"> = {
        Completed: "success",
        Processing: "info",
        Pending: "warning",
        Failed: "error",
      };
      return <Badge variant={variantMap[row.status] || "default"}>{row.status}</Badge>;
    },
  },
];

/* ------------------------------------------------------------------ */
/*  Custom tooltip for chart                                           */
/* ------------------------------------------------------------------ */

function ChartTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; name: string; color: string }>; label?: string }) {
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
          <span className="font-medium text-rv-black">{fmt.format(entry.value)}</span>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page component                                                     */
/* ------------------------------------------------------------------ */

export default function AccountingPage() {
  return (
    <div className="space-y-6">
      {/* ---- Header ---- */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-rv-green-light">
            <DollarSign className="h-5 w-5 text-rv-green" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-rv-blue-dark leading-tight">
              Accounting
            </h1>
            <p className="text-sm text-rv-gray">
              Financial overview and transaction management
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" icon={<CreditCard />}>
            Record Payment
          </Button>
          <Button icon={<FileText />}>Create Invoice</Button>
        </div>
      </div>

      {/* ---- Stats row ---- */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <StatCard
          label="Total Receivable"
          value={fmt.format(financialSummary.totalReceivable)}
          className="border border-rv-lightgray"
        />
        <StatCard
          label="Collected"
          value={fmt.format(financialSummary.totalCollected)}
          trend={{ direction: "up", value: "+4.2% vs last month" }}
          className="border border-rv-lightgray"
        />
        <StatCard
          label="Collection Rate"
          value={`${financialSummary.collectionRate}%`}
          trend={{ direction: "up", value: "+1.8%" }}
          className="border border-rv-lightgray"
        />
        <StatCard
          label="Overdue"
          value={fmt.format(financialSummary.overdueAmount)}
          trend={{ direction: "down", value: "-12% vs last month" }}
          className="border border-rv-lightgray"
        />
        <StatCard
          label="Trust Balance"
          value={fmt.format(financialSummary.trustBalance)}
          className="border border-rv-lightgray"
        />
      </div>

      {/* ---- Two-column layout: Chart + Overdue ---- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Revenue vs Expenses chart */}
        <Card className="lg:col-span-7">
          <CardHeader title="Monthly Revenue vs Expenses" subtitle="Last 6 months" />
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <ComposedChart data={monthlyRevenue} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
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
                  tickFormatter={(v: number) => fmtCompact.format(v)}
                />
                <Tooltip content={<ChartTooltip />} />
                <Legend
                  verticalAlign="top"
                  align="right"
                  iconType="circle"
                  iconSize={8}
                  wrapperStyle={{ fontSize: 12, paddingBottom: 8 }}
                />
                <Bar
                  dataKey="revenue"
                  name="Revenue"
                  fill="#1473CC"
                  radius={[4, 4, 0, 0]}
                  barSize={28}
                />
                <Bar
                  dataKey="expenses"
                  name="Expenses"
                  fill="#db0001"
                  radius={[4, 4, 0, 0]}
                  barSize={28}
                />
                <Line
                  dataKey="net"
                  name="Net Income"
                  type="monotone"
                  stroke="#03893f"
                  strokeWidth={2}
                  dot={{ r: 4, fill: "#03893f", strokeWidth: 0 }}
                  activeDot={{ r: 6 }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Overdue Balances */}
        <Card className="lg:col-span-5">
          <CardHeader
            title="Overdue Balances"
            subtitle={`${overdueBalances.length} tenants past due`}
          />
          <CardContent>
            <DataTable
              columns={overdueColumns}
              data={overdueBalances.slice(0, 7)}
            />
          </CardContent>
        </Card>
      </div>

      {/* ---- Recent Transactions (full width) ---- */}
      <Card>
        <CardHeader title="Recent Transactions" subtitle="Last 15 transactions across all properties" />
        <CardContent>
          <DataTable
            columns={transactionColumns}
            data={recentTransactions}
          />
        </CardContent>
      </Card>
    </div>
  );
}
