import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SummaryBar from '../../components/SummaryBar';
import AlertCard from '../../components/AlertCard';
import SmallTable from '../../components/SmallTable';
import PipelineView from '../../components/PipelineView';
import ActivityFeed from '../../components/ActivityFeed';
import QuickActions from '../../components/QuickActions';
import AiInsightBanner from '../../components/AiInsightBanner';
import {
  propertySummary,
  needsAttention,
  leasesEndingSoon,
  vacancyPipeline,
  recentActivity,
} from '../../data/properties';

export default function PropertiesLanding() {
  const summaryItems = [
    { label: 'Total Properties', value: propertySummary.totalProperties, trend: propertySummary.trends.totalProperties },
    { label: 'Active Leases', value: propertySummary.activeLeases, trend: propertySummary.trends.activeLeases },
    { label: 'Vacant Units', value: propertySummary.vacantUnits, trend: propertySummary.trends.vacantUnits },
    { label: 'Occupancy Rate', value: propertySummary.avgOccupancy, suffix: '%', trend: propertySummary.trends.avgOccupancy },
    { label: 'Avg Rent', value: '$1,847', trend: 2.1 },
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
        <span className={`font-medium ${(val as number) <= 20 ? 'text-danger-600' : 'text-amber-600'}`}>
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
          'No Renewal': 'bg-danger-50 text-danger-700',
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
      {/* Page Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Properties</h1>
          <p className="text-sm text-slate-500 mt-1">Your property portfolio at a glance</p>
        </div>
        <Link
          to="/manager/properties/list"
          className="flex items-center gap-1.5 text-sm font-medium text-brand-700 hover:text-brand-500 transition-colors mt-1"
        >
          View All Properties <ArrowRight size={15} />
        </Link>
      </div>

      {/* AI Insight Banner */}
      <AiInsightBanner
        insight="Based on current trends, 4 of your 12 vacant units have been listed for 30+ days without showings. Consider adjusting pricing or refreshing listing photos."
        type="warning"
      />

      {/* Summary Bar */}
      <SummaryBar items={summaryItems} />

      {/* Two-Column: Needs Attention + Leases Ending Soon */}
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

      {/* Vacancy Pipeline — Full Width */}
      <PipelineView
        title="Vacancy Pipeline"
        stages={vacancyPipeline}
      />

      {/* Two-Column: Activity Feed + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ActivityFeed title="Recent Activity" items={recentActivity} />
        <div className="bg-white rounded-xl border border-slate-200/60 shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-100">
            <h3 className="text-sm font-semibold text-slate-900">Quick Actions</h3>
          </div>
          <div className="p-4">
            <QuickActions actions={quickActions} />
          </div>
        </div>
      </div>
    </div>
  );
}
