import SummaryBar from '../../components/SummaryBar';
import AlertCard from '../../components/AlertCard';
import SmallTable from '../../components/SmallTable';
import QuickActions from '../../components/QuickActions';
import AiInsightBanner from '../../components/AiInsightBanner';
import {
  financialHealth,
  actionRequired,
  overdueBalances,
  recentTransactions,
  upcomingPayments,
} from '../../data/accounting';

function formatCurrency(n: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n);
}

export default function AccountingLanding() {
  const summaryItems = [
    { label: 'Trust Balance', value: formatCurrency(financialHealth.trustBalance), trend: financialHealth.trends.trustBalance },
    { label: 'Outstanding Payables', value: formatCurrency(financialHealth.outstandingPayables), trend: financialHealth.trends.outstandingPayables },
    { label: 'Receivables Overdue', value: formatCurrency(financialHealth.receivablesOverdue), trend: financialHealth.trends.receivablesOverdue, highlightDanger: true },
    { label: 'Distributions Pending', value: formatCurrency(financialHealth.ownerDistributionsPending), trend: financialHealth.trends.ownerDistributionsPending },
  ];

  const txColumns = [
    { key: 'date', label: 'Date' },
    { key: 'description', label: 'Description' },
    { key: 'property', label: 'Property' },
    {
      key: 'amount',
      label: 'Amount',
      render: (val: unknown) => {
        const n = val as number;
        return (
          <span className={`font-medium ${n >= 0 ? 'text-green-700' : 'text-danger-600'}`}>
            {n >= 0 ? '+' : ''}{formatCurrency(n)}
          </span>
        );
      },
    },
    {
      key: 'type',
      label: 'Type',
      render: (val: unknown) => {
        const t = val as string;
        return (
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
            t === 'credit' ? 'bg-green-100 text-green-700' : 'bg-danger-50 text-danger-700'
          }`}>
            {t}
          </span>
        );
      },
    },
  ];

  const quickActions = [
    { label: 'Record Payment', icon: 'credit-card' },
    { label: 'Create Bill', icon: 'receipt' },
    { label: 'Run Owner Statements', icon: 'file-spreadsheet' },
    { label: 'Post Charges', icon: 'zap' },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Accounting</h1>
        <p className="text-sm text-slate-500 mt-1">Financial overview and pending actions</p>
      </div>

      {/* AI Insight Banner */}
      <AiInsightBanner
        insight="Trust account balance is $23,400 higher than usual for this time of month. 14 pending bill approvals totaling $8,422 may be causing the surplus."
        type="info"
      />

      {/* Financial Health Summary */}
      <SummaryBar items={summaryItems} />

      {/* Action Required + Overdue Balances */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AlertCard title="Action Required" items={actionRequired} />

        {/* Overdue Balances Card */}
        <div className="bg-white rounded-xl border border-slate-200/60 shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-100">
            <h3 className="text-sm font-semibold text-slate-900">Overdue Balances</h3>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-xs font-medium text-slate-500 mb-1">Current Balance</p>
                <p className="text-2xl font-bold text-slate-900">{formatCurrency(overdueBalances.currentBalance)}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500 mb-1">Overdue Balance</p>
                <p className="text-2xl font-bold text-danger-600">{formatCurrency(overdueBalances.overdueBalance)}</p>
              </div>
            </div>
            <div className="border-t border-slate-100 pt-3">
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <p className="text-xs text-slate-400">Upcoming Charges</p>
                  <p className="text-sm font-medium text-slate-700 mt-0.5">{formatCurrency(overdueBalances.upcomingCharges)}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Prepayments</p>
                  <p className="text-sm font-medium text-slate-700 mt-0.5">{formatCurrency(overdueBalances.prepayments)}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Security Deposits</p>
                  <p className="text-sm font-medium text-slate-700 mt-0.5">{formatCurrency(overdueBalances.securityDeposits)}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="px-4 py-2.5 border-t border-slate-100 bg-slate-50/50">
            <button className="text-sm font-medium text-brand-700 hover:text-brand-500 cursor-pointer transition-colors">
              View All Balances &rarr;
            </button>
          </div>
        </div>
      </div>

      {/* Recent Transactions + Upcoming Payments */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SmallTable
          title="Recent Transactions"
          columns={txColumns}
          data={recentTransactions}
          viewAllLink="/manager/accounting"
          viewAllLabel="View All Transactions"
        />

        {/* Upcoming Payments Timeline */}
        <div className="bg-white rounded-xl border border-slate-200/60 shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-100">
            <h3 className="text-sm font-semibold text-slate-900">Upcoming Payments (Next 7 Days)</h3>
          </div>
          <div className="divide-y divide-slate-50">
            {upcomingPayments.map((p) => {
              const typeColors: Record<string, string> = {
                distribution: 'bg-purple-100 text-purple-700',
                vendor: 'bg-blue-100 text-blue-700',
                recurring: 'bg-slate-100 text-slate-600',
              };
              return (
                <div key={p.id} className="flex items-center justify-between px-4 py-2.5 hover:bg-slate-50 transition-colors">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-slate-700 truncate">{p.description}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{p.date}</p>
                  </div>
                  <div className="flex items-center gap-2 ml-3">
                    {p.amount > 0 && (
                      <span className="text-sm font-medium text-slate-900">{formatCurrency(p.amount)}</span>
                    )}
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${typeColors[p.type] || ''}`}>
                      {p.type}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl border border-slate-200/60 shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-slate-100">
          <h3 className="text-sm font-semibold text-slate-900">Quick Actions</h3>
        </div>
        <div className="p-4">
          <QuickActions actions={quickActions} />
        </div>
      </div>
    </div>
  );
}
