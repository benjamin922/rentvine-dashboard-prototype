import { workOrderStats } from "../../data/maintenance";
import { StatCard } from "../ui/StatCard";

export default function WorkOrderStatistics() {
  return (
    <div className="flex flex-wrap gap-3">
      <StatCard
        className="flex-1 min-w-[140px] border border-rv-lightgray"
        label="Total Work Orders"
        value={workOrderStats.total}
      />
      <StatCard
        className="flex-1 min-w-[140px] border border-rv-lightgray"
        label="Open"
        value={workOrderStats.open}
      />
      <StatCard
        className="flex-1 min-w-[140px] border border-rv-lightgray"
        label="In Progress"
        value={workOrderStats.inProgress}
      />
      <StatCard
        className="flex-1 min-w-[140px] border border-rv-lightgray"
        label="Completed"
        value={workOrderStats.completed}
      />
      <StatCard
        className={`flex-1 min-w-[140px] border border-rv-lightgray ${workOrderStats.overdue > 0 ? "ring-1 ring-red-300" : ""}`}
        label="Overdue"
        value={
          <span className={workOrderStats.overdue > 0 ? "text-rv-red" : ""}>
            {workOrderStats.overdue}
          </span>
        }
      />
      <StatCard
        className="flex-1 min-w-[140px] border border-rv-lightgray"
        label="Avg Resolution"
        value={`${workOrderStats.avgResolutionDays} days`}
      />
    </div>
  );
}
