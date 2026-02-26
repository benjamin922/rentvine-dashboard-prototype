import SummaryBar from '../../components/SummaryBar';
import AlertCard from '../../components/AlertCard';
import PipelineView from '../../components/PipelineView';
import ActivityFeed from '../../components/ActivityFeed';
import QuickActions from '../../components/QuickActions';
import { workOrderSummary, maintenanceAlerts, workOrderPipeline, vendorPerformance, maintenanceActivity } from '../../data/maintenance';
import { Star } from 'lucide-react';

export default function MaintenanceLanding() {
  const summaryItems = [
    { label: 'Open', value: workOrderSummary.open, trend: workOrderSummary.trends.open },
    { label: 'In Progress', value: workOrderSummary.inProgress, trend: workOrderSummary.trends.inProgress },
    { label: 'Awaiting Approval', value: workOrderSummary.awaitingApproval, trend: workOrderSummary.trends.awaitingApproval },
    { label: 'Completed (This Week)', value: workOrderSummary.completedThisWeek, trend: workOrderSummary.trends.completedThisWeek },
    { label: 'Avg Resolution', value: workOrderSummary.avgResolutionTime, suffix: ' days', trend: workOrderSummary.trends.avgResolutionTime },
  ];

  const quickActions = [
    { label: 'Create Work Order', icon: 'wrench' },
    { label: 'Assign Vendor', icon: 'user-plus' },
    { label: 'View Overdue', icon: 'clock' },
    { label: 'Run Maintenance Report', icon: 'file-bar-chart' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Maintenance</h1>
        <p className="text-sm text-slate-500 mt-0.5">Work orders, vendors, and maintenance activity</p>
      </div>

      <SummaryBar items={summaryItems} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AlertCard title="Needs Attention" items={maintenanceAlerts} />

        <PipelineView
          title="Work Order Pipeline"
          stages={workOrderPipeline}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Vendor Performance */}
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-100">
            <h3 className="text-sm font-semibold text-slate-900">Vendor Performance</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wide px-4 py-2">Vendor</th>
                  <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wide px-4 py-2">Avg Response</th>
                  <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wide px-4 py-2">Jobs</th>
                  <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wide px-4 py-2">Rating</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {vendorPerformance.map((v) => (
                  <tr key={v.id} className="hover:bg-slate-50">
                    <td className="text-sm font-medium text-slate-900 px-4 py-2.5">{v.name}</td>
                    <td className="text-sm text-slate-700 px-4 py-2.5">
                      <div className="flex items-center gap-2">
                        <span>{v.avgResponseTime}d</span>
                        <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full bg-brand-500"
                            style={{ width: `${Math.max(10, 100 - v.avgResponseTime * 20)}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="text-sm text-slate-700 px-4 py-2.5">{v.jobsCompleted}</td>
                    <td className="text-sm px-4 py-2.5">
                      <div className="flex items-center gap-1">
                        <Star size={12} className="text-amber-400 fill-amber-400" />
                        <span className="font-medium text-slate-900">{v.rating}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <ActivityFeed title="Recent Activity" items={maintenanceActivity} />
      </div>

      <div>
        <h3 className="text-sm font-semibold text-slate-900 mb-3">Quick Actions</h3>
        <QuickActions actions={quickActions} />
      </div>
    </div>
  );
}
