import { Building2, Plus, FileText, UserPlus, Camera, ClipboardList } from 'lucide-react';
import SummaryBar from '../components/SummaryBar';
import NeedsAttentionCard from '../components/NeedsAttentionCard';
import DataSlice from '../components/DataSlice';
import QuickActions from '../components/QuickActions';
import PageHeader from '../components/PageHeader';
import StatusBadge from '../components/StatusBadge';
import { propertySummary, needsAttention, leasesExpiringSoon, vacantUnits } from '../data/properties';

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function formatCurrency(n) {
  return '$' + n.toLocaleString();
}

export default function PropertiesLanding({ onNavigate }) {
  const metrics = [
    { label: 'Total Units', value: propertySummary.totalUnits },
    { label: 'Occupied', value: propertySummary.occupied },
    { label: 'Vacant', value: propertySummary.vacant },
    { label: 'Occupancy Rate', value: propertySummary.occupancyRate + '%', trend: propertySummary.occupancyTrend },
    { label: 'Avg Rent', value: formatCurrency(propertySummary.avgRent), trend: propertySummary.avgRentTrend },
    { label: 'Leases Expiring (60d)', value: propertySummary.leasesExpiringSoon },
  ];

  const quickActions = [
    { label: 'Add Property', icon: Plus },
    { label: 'Create Lease', icon: FileText },
    { label: 'Add Tenant', icon: UserPlus },
    { label: 'Schedule Inspection', icon: Camera },
    { label: 'Run Rent Roll', icon: ClipboardList },
  ];

  const leaseColumns = [
    { label: 'Tenant' },
    { label: 'Unit' },
    { label: 'Expires' },
    { label: 'Rent' },
    { label: 'Renewal Status' },
  ];

  const vacantColumns = [
    { label: 'Unit' },
    { label: 'Days Vacant' },
    { label: 'Asking Rent' },
    { label: 'Applications' },
  ];

  return (
    <div className="flex-1 overflow-auto">
      <div className="max-w-[1200px] mx-auto px-6 py-6">
        <PageHeader
          title="Properties"
          subtitle={`Managing ${propertySummary.totalUnits} units across 15 properties`}
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

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <DataSlice
            title="Leases Expiring Soon"
            columns={leaseColumns}
            data={leasesExpiringSoon}
            onViewAll={() => onNavigate?.('properties-list')}
            renderRow={(item, i) => (
              <tr key={item.id} className={`border-b border-border last:border-0 hover:bg-gray-50 ${i % 2 === 0 ? '' : 'bg-gray-50/50'}`}>
                <td className="px-4 py-2.5 font-medium text-text-primary">{item.tenant}</td>
                <td className="px-4 py-2.5 text-brand text-xs">{item.unit}</td>
                <td className="px-4 py-2.5 text-text-secondary">{formatDate(item.expiresOn)}</td>
                <td className="px-4 py-2.5 text-text-primary">{formatCurrency(item.rent)}</td>
                <td className="px-4 py-2.5"><StatusBadge status={item.renewalStatus} /></td>
              </tr>
            )}
          />

          <DataSlice
            title="Vacant Units"
            columns={vacantColumns}
            data={vacantUnits}
            onViewAll={() => onNavigate?.('properties-list')}
            renderRow={(item, i) => (
              <tr key={item.id} className={`border-b border-border last:border-0 hover:bg-gray-50 ${i % 2 === 0 ? '' : 'bg-gray-50/50'}`}>
                <td className="px-4 py-2.5">
                  <div className="font-medium text-brand text-xs">{item.unit}</div>
                  <div className="text-xs text-text-secondary">{item.city}</div>
                </td>
                <td className="px-4 py-2.5">
                  <span className={`font-medium ${item.daysVacant >= 30 ? 'text-red-600' : 'text-text-primary'}`}>
                    {item.daysVacant} days
                  </span>
                </td>
                <td className="px-4 py-2.5 text-text-primary">{formatCurrency(item.askingRent)}</td>
                <td className="px-4 py-2.5">
                  <span className={item.applications === 0 ? 'text-red-500 font-medium' : 'text-text-primary'}>
                    {item.applications}
                  </span>
                </td>
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
