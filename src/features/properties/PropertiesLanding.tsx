import SummaryBar from '../../components/SummaryBar';
import AlertCard from '../../components/AlertCard';
import SmallTable from '../../components/SmallTable';
import PipelineView from '../../components/PipelineView';
import ActivityFeed from '../../components/ActivityFeed';
import QuickActions from '../../components/QuickActions';
import { propertySummary, needsAttention, leasesEndingSoon, vacancyPipeline, recentActivity } from '../../data/properties';

export default function PropertiesLanding() {
  const summaryItems = [
    { label: 'Total Properties', value: propertySummary.totalProperties, trend: propertySummary.trends.totalProperties },
    { label: 'Active Leases', value: propertySummary.activeLeases, trend: propertySummary.trends.activeLeases },
    { label: 'Vacant Units', value: propertySummary.vacantUnits, trend: propertySummary.trends.vacantUnits },
    { label: 'Avg Occupancy', value: propertySummary.avgOccupancy, suffix: '%', trend: propertySummary.trends.avgOccupancy },
  ];

  const leaseColumns = [
    { key: 'property', label: 'Property' },
    { key: 'unit', label: 'Unit' },
    { key: 'tenant', label: 'Tenant' },
    { key: 'leaseEnd', label: 'Lease End' },
    {
      key: 'daysLeft',
      label: 'Days Left',
      render: (val: unknown) => (
        <span className={`font-medium ${(val as number) <= 20 ? 'text-red-600' : 'text-amber-600'}`}>
          {val as number}d
        </span>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (val: unknown) => {
        const s = val as string;
        const colors: Record<string, string> = {
          'No Renewal': 'bg-red-100 text-red-700',
          'Renewal Sent': 'bg-blue-100 text-blue-700',
          'In Discussion': 'bg-amber-100 text-amber-700',
        };
        return (
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${colors[s] || 'bg-slate-100 text-slate-700'}`}>
            {s}
          </span>
        );
      },
    },
  ];

  const quickActions = [
    { label: 'Add Property', icon: 'plus' },
    { label: 'Create Lease', icon: 'file-text' },
    { label: 'Run Vacancy Report', icon: 'bar-chart-3' },
    { label: 'Send Owner Update', icon: 'send' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Properties</h1>
        <p className="text-sm text-slate-500 mt-0.5">Your property portfolio at a glance</p>
      </div>

      <SummaryBar items={summaryItems} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AlertCard title="Needs Attention" items={needsAttention} />
        <SmallTable
          title="Leases Ending Soon"
          columns={leaseColumns}
          data={leasesEndingSoon}
          viewAllLink="/manager/properties/list"
          viewAllLabel="View All Expiring Leases"
        />
      </div>

      <PipelineView
        title="Vacancy Pipeline"
        stages={vacancyPipeline}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ActivityFeed title="Recent Activity" items={recentActivity} />
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-slate-900">Quick Actions</h3>
          <QuickActions actions={quickActions} />
        </div>
      </div>
    </div>
  );
}
