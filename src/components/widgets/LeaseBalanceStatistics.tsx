import { leaseStats, leaseBalanceStats } from "../../data/leasing";
import { StatCard } from "../ui/StatCard";

const fmt = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

export default function LeaseBalanceStatistics() {
  return (
    <div className="flex flex-wrap gap-3">
      <StatCard
        className="flex-1 min-w-[140px] border border-rv-lightgray"
        label="Active Leases"
        value={leaseStats.totalActive}
      />
      <StatCard
        className="flex-1 min-w-[140px] border border-rv-lightgray"
        label="Expiring in 30 Days"
        value={leaseStats.expiringIn30Days}
      />
      <StatCard
        className="flex-1 min-w-[140px] border border-rv-lightgray"
        label="Expiring in 60 Days"
        value={leaseStats.expiringIn60Days}
      />
      <StatCard
        className="flex-1 min-w-[140px] border border-rv-lightgray"
        label="Average Rent"
        value={fmt.format(leaseStats.averageRent)}
      />
      <StatCard
        className="flex-1 min-w-[140px] border border-rv-lightgray"
        label="Occupancy Rate"
        value={`${leaseStats.occupancyRate}%`}
      />
      <StatCard
        className="flex-1 min-w-[140px] border border-rv-lightgray"
        label="Outstanding Balance"
        value={fmt.format(leaseBalanceStats.totalOutstandingBalance)}
      />
    </div>
  );
}
