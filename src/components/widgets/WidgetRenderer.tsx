import { lazy, Suspense } from "react";

const UnitStatistics = lazy(() => import("./UnitStatistics"));
const WorkOrderStatistics = lazy(() => import("./WorkOrderStatistics"));
const RentStatistics = lazy(() => import("./RentStatistics"));
const LeaseBalanceStatistics = lazy(() => import("./LeaseBalanceStatistics"));
const WorkOrdersByStatus = lazy(() => import("./WorkOrdersByStatus"));
const UnitsByMonth = lazy(() => import("./UnitsByMonth"));
const LeaseList = lazy(() => import("./LeaseList"));
const WorkOrderList = lazy(() => import("./WorkOrderList"));

const widgetMap: Record<string, React.LazyExoticComponent<() => React.JSX.Element>> = {
  "unit-statistics": UnitStatistics,
  "work-order-statistics": WorkOrderStatistics,
  "rent-statistics": RentStatistics,
  "lease-balance-statistics": LeaseBalanceStatistics,
  "work-orders-by-status": WorkOrdersByStatus,
  "units-by-month": UnitsByMonth,
  "lease-list": LeaseList,
  "work-order-list": WorkOrderList,
};

interface WidgetRendererProps {
  type: string;
}

export default function WidgetRenderer({ type }: WidgetRendererProps) {
  const WidgetComponent = widgetMap[type];

  if (!WidgetComponent) {
    return (
      <div className="flex items-center justify-center h-full text-sm text-rv-gray">
        Widget type &ldquo;{type}&rdquo; not found
      </div>
    );
  }

  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-full text-sm text-rv-gray">
          Loading...
        </div>
      }
    >
      <WidgetComponent />
    </Suspense>
  );
}
