import { propertyStats, unitsByStatus } from "../../data/properties";
import { StatCard } from "../ui/StatCard";

const fmt = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

export default function UnitStatistics() {
  const maintenanceCount =
    unitsByStatus.find((u) => u.status === "Maintenance")?.count ?? 0;

  return (
    <div className="flex flex-wrap gap-3">
      <StatCard
        className="flex-1 min-w-[140px] border border-rv-lightgray"
        label="Total Units"
        value={propertyStats.totalUnits}
      />
      <StatCard
        className="flex-1 min-w-[140px] border border-rv-lightgray"
        label="Occupied"
        value={propertyStats.totalOccupied}
      />
      <StatCard
        className="flex-1 min-w-[140px] border border-rv-lightgray"
        label="Vacant"
        value={propertyStats.totalVacant}
      />
      <StatCard
        className="flex-1 min-w-[140px] border border-rv-lightgray"
        label="Maintenance"
        value={maintenanceCount}
      />
      <StatCard
        className="flex-1 min-w-[140px] border border-rv-lightgray"
        label="Occupancy Rate"
        value={`${propertyStats.occupancyRate}%`}
      />
      <StatCard
        className="flex-1 min-w-[140px] border border-rv-lightgray"
        label="Monthly Revenue"
        value={fmt.format(propertyStats.totalMonthlyRevenue)}
      />
    </div>
  );
}
