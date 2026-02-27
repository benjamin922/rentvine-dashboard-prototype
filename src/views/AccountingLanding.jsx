import { DollarSign, CreditCard, FileCheck, Receipt, ArrowDownToLine, Send } from 'lucide-react';
import SummaryBar from '../components/SummaryBar';
import NeedsAttentionCard from '../components/NeedsAttentionCard';
import DataSlice from '../components/DataSlice';
import QuickActions from '../components/QuickActions';
import PageHeader from '../components/PageHeader';
import { accountingSummary, needsAttention, overdueBalances, pendingOwnerPayouts, recentTransactions } from '../data/accounting';

function formatCurrency(n) {
  const abs = Math.abs(n);
  const formatted = '$' + abs.toLocaleString();
  return n < 0 ? '-' + formatted : formatted;
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export default function AccountingLanding() {
  const metrics = [
    { label: 'Collected (MTD)', value: formatCurrency(accountingSummary.collectedThisMonth), trend: accountingSummary.collectedTrend },
    { label: 'Total Receivable', value: formatCurrency(accountingSummary.totalReceivable), trend: accountingSummary.receivableTrend },
    { label: 'Total Overdue', value: formatCurrency(accountingSummary.totalOverdue), trend: accountingSummary.overdueTrend },
    { label: 'Pending Payouts', value: formatCurrency(accountingSummary.ownerPayoutsPending) },
    { label: 'Bank Balance', value: formatCurrency(accountingSummary.bankBalance), trend: accountingSummary.bankBalanceTrend },
    { label: 'Unreconciled', value: accountingSummary.unreconciled },
  ];

  const quickActions = [
    { label: 'Record Payment', icon: DollarSign },
    { label: 'Enter Bill', icon: Receipt },
    { label: 'Process Payouts', icon: Send },
    { label: 'Bank Reconciliation', icon: FileCheck },
    { label: 'Create Invoice', icon: CreditCard },
  ];

  const overdueColumns = [
    { label: 'Tenant' },
    { label: 'Unit' },
    { label: 'Balance' },
    { label: 'Days Overdue' },
    { label: 'Notices Sent' },
  ];

  const payoutColumns = [
    { label: 'Owner' },
    { label: 'Properties' },
    { label: 'Amount' },
    { label: 'Statement Date' },
  ];

  const txColumns = [
    { label: 'Date' },
    { label: 'Description' },
    { label: 'Amount' },
    { label: 'Account' },
  ];

  return (
    <div className="flex-1 overflow-auto">
      <div className="max-w-[1200px] mx-auto px-6 py-6">
        <PageHeader
          title="Accounting"
          subtitle="Financial overview for February 2026"
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
            title="Overdue Tenant Balances"
            columns={overdueColumns}
            data={overdueBalances}
            onViewAll={() => {}}
            renderRow={(item, i) => (
              <tr key={item.id} className={`border-b border-border last:border-0 hover:bg-gray-50 ${i % 2 === 0 ? '' : 'bg-gray-50/50'}`}>
                <td className="px-4 py-2.5 font-medium text-text-primary">{item.tenant}</td>
                <td className="px-4 py-2.5 text-brand text-xs">{item.unit}</td>
                <td className="px-4 py-2.5 font-semibold text-red-600">{formatCurrency(item.balance)}</td>
                <td className="px-4 py-2.5">
                  <span className="text-red-600 font-medium">{item.daysOverdue}d</span>
                </td>
                <td className="px-4 py-2.5 text-text-secondary">{item.notices}</td>
              </tr>
            )}
          />

          <DataSlice
            title="Pending Owner Payouts"
            columns={payoutColumns}
            data={pendingOwnerPayouts}
            onViewAll={() => {}}
            renderRow={(item, i) => (
              <tr key={item.id} className={`border-b border-border last:border-0 hover:bg-gray-50 ${i % 2 === 0 ? '' : 'bg-gray-50/50'}`}>
                <td className="px-4 py-2.5 font-medium text-text-primary">{item.owner}</td>
                <td className="px-4 py-2.5 text-text-secondary">{item.properties}</td>
                <td className="px-4 py-2.5 font-semibold text-text-primary">{formatCurrency(item.amount)}</td>
                <td className="px-4 py-2.5 text-text-secondary">{formatDate(item.statementDate)}</td>
              </tr>
            )}
          />
        </div>

        <div className="mt-4">
          <DataSlice
            title="Recent Transactions"
            columns={txColumns}
            data={recentTransactions}
            onViewAll={() => {}}
            renderRow={(item, i) => (
              <tr key={item.id} className={`border-b border-border last:border-0 hover:bg-gray-50 ${i % 2 === 0 ? '' : 'bg-gray-50/50'}`}>
                <td className="px-4 py-2.5 text-text-secondary">{formatDate(item.date)}</td>
                <td className="px-4 py-2.5 text-text-primary">{item.description}</td>
                <td className={`px-4 py-2.5 font-medium ${item.amount < 0 ? 'text-red-600' : 'text-green-600'}`}>
                  {formatCurrency(item.amount)}
                </td>
                <td className="px-4 py-2.5 text-text-secondary">{item.account}</td>
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
