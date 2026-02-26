import {
  DollarSign,
  AlertTriangle,
  Clock,
  CreditCard,
  FileText,
  BarChart3,
  Send,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import {
  financialSummary,
  recentTransactions,
  overdueBalances,
  invoiceStats,
} from "../../data/accounting";
import { Card, CardHeader, CardContent } from "../../components/ui/Card";
import { StatCard } from "../../components/ui/StatCard";
import { DataTable, type Column } from "../../components/ui/DataTable";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";

/* ------------------------------------------------------------------ */
/*  Currency formatter                                                  */
/* ------------------------------------------------------------------ */

const fmt = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
});

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

const overdueCount = overdueBalances.length;
const overdueTotal = overdueBalances.reduce((s, b) => s + b.amountDue, 0);
const pendingDistributions = 4200;

const attentionAlerts: AttentionAlert[] = [
  {
    id: "bank-recon",
    severity: "error",
    title: "Bank reconciliation overdue by 3 days",
    description:
      "Last reconciliation was Feb 23. Unmatched transactions may cause reporting inaccuracies.",
    cta: "Reconcile Now",
  },
  {
    id: "overdue-tenants",
    severity: "error",
    title: `${overdueCount} tenants with overdue balances totaling ${fmt.format(overdueTotal)}`,
    description: `Oldest balance: ${overdueBalances[0]?.tenantName} at ${overdueBalances[0]?.daysPastDue} days past due. Automated reminders paused pending review.`,
    cta: "Send Reminders",
  },
  {
    id: "owner-dist",
    severity: "warning",
    title: `${fmt.format(pendingDistributions)} in pending owner distributions`,
    description:
      "Owner payouts for February are ready to process. 3 owners awaiting distribution.",
    cta: "Process Distributions",
  },
  ...(invoiceStats.draftCount > 0
    ? [
        {
          id: "draft-invoices",
          severity: "warning" as const,
          title: `${invoiceStats.draftCount} draft invoice${invoiceStats.draftCount > 1 ? "s" : ""} need review`,
          description:
            "Draft invoices have been pending for 5+ days. Review and send to avoid delayed collections.",
          cta: "Review Invoices",
        },
      ]
    : []),
];

/* ------------------------------------------------------------------ */
/*  Overdue Balances table columns (compact)                            */
/* ------------------------------------------------------------------ */

type OverdueRow = (typeof overdueBalances)[number];

const overdueColumns: Column<OverdueRow>[] = [
  {
    key: "tenantName",
    header: "Tenant",
    render: (row) => (
      <span className="font-medium text-rv-black">{row.tenantName}</span>
    ),
  },
  {
    key: "propertyName",
    header: "Property",
    render: (row) => (
      <span className="text-sm text-rv-gray">
        {row.propertyName} #{row.unit}
      </span>
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
      <Badge
        variant={
          row.daysPastDue > 20
            ? "error"
            : row.daysPastDue > 10
              ? "warning"
              : "info"
        }
        hideDot
      >
        {row.daysPastDue}d
      </Badge>
    ),
  },
];

/* ------------------------------------------------------------------ */
/*  Recent Transactions table columns (compact)                         */
/* ------------------------------------------------------------------ */

type TransactionRow = (typeof recentTransactions)[number];

const transactionColumns: Column<TransactionRow>[] = [
  {
    key: "date",
    header: "Date",
    render: (row) => {
      const d = new Date(row.date + "T00:00:00");
      return (
        <span className="text-sm text-rv-gray">
          {d.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
        </span>
      );
    },
  },
  {
    key: "description",
    header: "Description",
    render: (row) => (
      <div className="min-w-0">
        <p className="text-sm font-medium text-rv-black truncate max-w-[260px]">
          {row.description}
        </p>
        <p className="text-xs text-rv-gray">{row.tenantName}</p>
      </div>
    ),
  },
  {
    key: "amount",
    header: "Amount",
    align: "right",
    render: (row) => (
      <span
        className={`font-medium ${row.amount < 0 ? "text-rv-red" : "text-rv-green"}`}
      >
        {row.amount < 0 ? "-" : "+"}
        {fmt.format(Math.abs(row.amount))}
      </span>
    ),
  },
  {
    key: "status",
    header: "Status",
    align: "center",
    render: (row) => {
      const variantMap: Record<
        string,
        "success" | "warning" | "error" | "info" | "default"
      > = {
        Completed: "success",
        Processing: "info",
        Pending: "warning",
        Failed: "error",
      };
      return (
        <Badge variant={variantMap[row.status] || "default"} hideDot>
          {row.status}
        </Badge>
      );
    },
  },
];

/* ------------------------------------------------------------------ */
/*  Page component                                                      */
/* ------------------------------------------------------------------ */

export default function AccountingPage() {
  const hasAlerts = attentionAlerts.length > 0;

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
              What needs your attention today
            </p>
          </div>
        </div>
      </div>

      {/* ---- Summary bar ---- */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <StatCard
          label="Total Receivable"
          value={fmt.format(financialSummary.totalReceivable)}
          className="border border-rv-lightgray"
        />
        <StatCard
          label="Collected This Month"
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
          label="Overdue Amount"
          value={fmt.format(financialSummary.overdueAmount)}
          trend={{ direction: "down", value: "-12% vs last month" }}
          className="border border-rv-lightgray"
        />
        <StatCard
          label="Trust Balance"
          value={fmt.format(financialSummary.trustBalance)}
          className="border border-rv-lightgray"
        />
        <StatCard
          label="Outstanding Invoices"
          value={invoiceStats.unpaid + invoiceStats.overdue}
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
                No accounting items require your immediate attention. Finances are in good shape.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* ---- Data slices ---- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Overdue Balances */}
        <Card>
          <CardHeader
            title="Overdue Balances"
            action={
              <button className="inline-flex items-center gap-1 text-sm text-rv-blue hover:text-rv-blue-dark font-medium transition-colors">
                View all <ArrowRight className="h-3.5 w-3.5" />
              </button>
            }
          />
          <CardContent>
            <DataTable
              columns={overdueColumns}
              data={overdueBalances.slice(0, 5)}
              emptyMessage="No overdue balances"
            />
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card>
          <CardHeader
            title="Recent Transactions"
            action={
              <button className="inline-flex items-center gap-1 text-sm text-rv-blue hover:text-rv-blue-dark font-medium transition-colors">
                View all <ArrowRight className="h-3.5 w-3.5" />
              </button>
            }
          />
          <CardContent>
            <DataTable
              columns={transactionColumns}
              data={recentTransactions.slice(0, 5)}
              emptyMessage="No recent transactions"
            />
          </CardContent>
        </Card>
      </div>

      {/* ---- Quick Actions ---- */}
      <div>
        <h2 className="text-sm font-medium text-rv-gray mb-2 uppercase tracking-wide">
          Quick Actions
        </h2>
        <div className="flex flex-wrap gap-3">
          <Button variant="secondary" size="sm" icon={<CreditCard />}>
            Record Payment
          </Button>
          <Button variant="secondary" size="sm" icon={<FileText />}>
            Create Invoice
          </Button>
          <Button variant="secondary" size="sm" icon={<BarChart3 />}>
            Run Report
          </Button>
          <Button variant="secondary" size="sm" icon={<Send />}>
            Process Distribution
          </Button>
        </div>
      </div>
    </div>
  );
}
