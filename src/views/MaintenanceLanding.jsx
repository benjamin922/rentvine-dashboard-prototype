import { Wrench, Plus, UserPlus, ClipboardList, FileText, Phone } from 'lucide-react';
import SummaryBar from '../components/SummaryBar';
import NeedsAttentionCard from '../components/NeedsAttentionCard';
import DataSlice from '../components/DataSlice';
import QuickActions from '../components/QuickActions';
import PageHeader from '../components/PageHeader';
import StatusBadge from '../components/StatusBadge';
import {
  maintenanceSummary, needsAttention,
  unassignedWorkOrders, overdueWorkOrders, emergencyWorkOrders
} from '../data/maintenance';

function formatCurrency(n) {
  return '$' + n.toLocaleString();
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function daysAgoLabel(dateStr) {
  const diff = Math.round((new Date() - new Date(dateStr)) / (1000 * 60 * 60 * 24));
  if (diff === 0) return 'Today';
  if (diff === 1) return 'Yesterday';
  return `${diff}d ago`;
}

export default function MaintenanceLanding() {
  const metrics = [
    { label: 'Open Work Orders', value: maintenanceSummary.openWorkOrders, trend: maintenanceSummary.openTrend, trendSuffix: '' },
    { label: 'Unassigned', value: maintenanceSummary.unassigned, trend: maintenanceSummary.unassignedTrend, trendSuffix: '' },
    { label: 'Avg Completion', value: maintenanceSummary.avgCompletionDays + 'd', trend: maintenanceSummary.completionTrend, trendSuffix: 'd' },
    { label: 'Completed (MTD)', value: maintenanceSummary.completedThisMonth, trend: maintenanceSummary.completedTrend, trendSuffix: '%' },
    { label: 'Spend (MTD)', value: formatCurrency(maintenanceSummary.totalSpendThisMonth), trend: maintenanceSummary.spendTrend },
    { label: 'Emergencies', value: maintenanceSummary.emergencyOpen },
  ];

  const quickActions = [
    { label: 'Create Work Order', icon: Plus },
    { label: 'Assign Vendor', icon: UserPlus },
    { label: 'Schedule Inspection', icon: ClipboardList },
    { label: 'View All Work Orders', icon: FileText },
    { label: 'Contact Vendor', icon: Phone },
  ];

  const unassignedColumns = [
    { label: 'Title' },
    { label: 'Unit' },
    { label: 'Priority' },
    { label: 'Created' },
  ];

  const overdueColumns = [
    { label: 'Title' },
    { label: 'Vendor' },
    { label: 'Due Date' },
    { label: 'Est. Cost' },
    { label: 'Priority' },
  ];

  const emergencyColumns = [
    { label: 'Title' },
    { label: 'Unit' },
    { label: 'Tenant' },
    { label: 'Reported' },
    { label: 'Status' },
  ];

  return (
    <div className="flex-1 overflow-auto">
      <div className="max-w-[1200px] mx-auto px-6 py-6">
        <PageHeader
          title="Maintenance"
          subtitle={`${maintenanceSummary.openWorkOrders} open work orders, ${maintenanceSummary.emergencyOpen} emergencies`}
        />

        <SummaryBar metrics={metrics} />

        <div className="mt-6">
          <h2 className="text-sm font-semibold text-text-primary uppercase tracking-wide mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            Needs Attention
          </h2>
          <div className="grid gap-3">
            {needsAttention.map((item) => (
              <NeedsAttentionCard key={item.id} item={item} />
            ))}
          </div>
        </div>

        {emergencyWorkOrders.length > 0 && (
          <div className="mt-6">
            <DataSlice
              title="Emergency Work Orders"
              columns={emergencyColumns}
              data={emergencyWorkOrders}
              renderRow={(item) => (
                <tr key={item.id} className="border-b border-border last:border-0 bg-red-50/30 hover:bg-red-50/60">
                  <td className="px-4 py-2.5 font-medium text-text-primary">{item.title}</td>
                  <td className="px-4 py-2.5 text-brand text-xs">{item.unit}</td>
                  <td className="px-4 py-2.5 text-text-secondary">{item.tenant}</td>
                  <td className="px-4 py-2.5 text-red-600 font-medium">{daysAgoLabel(item.created)}</td>
                  <td className="px-4 py-2.5"><StatusBadge status={item.status} /></td>
                </tr>
              )}
            />
          </div>
        )}

        <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <DataSlice
            title="Unassigned Work Orders"
            columns={unassignedColumns}
            data={unassignedWorkOrders}
            onViewAll={() => {}}
            renderRow={(item) => (
              <tr key={item.id} className="border-b border-border last:border-0 hover:bg-gray-50">
                <td className="px-4 py-2.5 font-medium text-text-primary">{item.title}</td>
                <td className="px-4 py-2.5 text-brand text-xs">{item.unit}</td>
                <td className="px-4 py-2.5"><StatusBadge status={item.priority} /></td>
                <td className="px-4 py-2.5 text-text-secondary">{daysAgoLabel(item.created)}</td>
              </tr>
            )}
          />

          <DataSlice
            title="Overdue Work Orders"
            columns={overdueColumns}
            data={overdueWorkOrders}
            onViewAll={() => {}}
            renderRow={(item) => (
              <tr key={item.id} className="border-b border-border last:border-0 hover:bg-gray-50">
                <td className="px-4 py-2.5 font-medium text-text-primary text-xs">{item.title}</td>
                <td className="px-4 py-2.5 text-text-secondary text-xs">{item.vendor}</td>
                <td className="px-4 py-2.5 text-red-600 font-medium text-xs">{formatDate(item.dueDate)}</td>
                <td className="px-4 py-2.5 text-text-primary text-xs">{formatCurrency(item.estimatedCost)}</td>
                <td className="px-4 py-2.5"><StatusBadge status={item.priority} /></td>
              </tr>
            )}
          />
        </div>

        <div className="mt-6">
          <h2 className="text-xs font-semibold text-text-secondary uppercase tracking-wide mb-3">Quick Actions</h2>
          <QuickActions actions={quickActions} />
        </div>
      </div>
    </div>
  );
}
