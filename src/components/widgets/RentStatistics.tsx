import { financialSummary } from "../../data/accounting";
import { StatCard } from "../ui/StatCard";

const fmt = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

export default function RentStatistics() {
  return (
    <div className="flex flex-wrap gap-3">
      <StatCard
        className="flex-1 min-w-[140px] border border-rv-lightgray"
        label="Total Receivable"
        value={fmt.format(financialSummary.totalReceivable)}
      />
      <StatCard
        className="flex-1 min-w-[140px] border border-rv-lightgray"
        label="Total Collected"
        value={fmt.format(financialSummary.totalCollected)}
      />
      <StatCard
        className="flex-1 min-w-[140px] border border-rv-lightgray"
        label="Collection Rate"
        value={`${financialSummary.collectionRate}%`}
      />
      <StatCard
        className="flex-1 min-w-[140px] border border-rv-lightgray"
        label="Overdue Amount"
        value={fmt.format(financialSummary.overdueAmount)}
      />
      <StatCard
        className="flex-1 min-w-[140px] border border-rv-lightgray"
        label="Prepayments"
        value={fmt.format(financialSummary.prepayments)}
      />
      <StatCard
        className="flex-1 min-w-[140px] border border-rv-lightgray"
        label="Security Deposits"
        value={fmt.format(financialSummary.securityDeposits)}
      />
    </div>
  );
}
