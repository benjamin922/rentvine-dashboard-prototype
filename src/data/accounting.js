const today = new Date();
const daysFromNow = (n) => {
  const d = new Date(today);
  d.setDate(d.getDate() + n);
  return d.toISOString().split('T')[0];
};
const daysAgo = (n) => daysFromNow(-n);

export const accountingSummary = {
  totalReceivable: 127450,
  receivableTrend: -2.3,
  totalOverdue: 34200,
  overdueTrend: 5.1,
  collectedThisMonth: 298750,
  collectedTrend: 1.8,
  ownerPayoutsPending: 185400,
  bankBalance: 412650,
  bankBalanceTrend: 0.4,
  unreconciled: 23,
};

export const needsAttention = [
  {
    id: 1,
    type: 'reconciliation',
    severity: 'high',
    title: 'Bank reconciliation is 5 days overdue',
    description: 'Operating account (Chase ****4521) was last reconciled on Feb 20. 23 unmatched transactions.',
    action: 'Reconcile Now',
    count: 23,
  },
  {
    id: 2,
    type: 'owner_payouts',
    severity: 'high',
    title: '12 owner payouts pending review',
    description: 'Owner statements for February are generated but not yet approved for disbursement. Total: $185,400.',
    action: 'Review Payouts',
    count: 12,
  },
  {
    id: 3,
    type: 'overdue_balances',
    severity: 'medium',
    title: '18 tenants with balances overdue 15+ days',
    description: 'Combined overdue amount is $34,200. 6 tenants have not responded to late notices.',
    action: 'View Overdue',
    count: 18,
  },
  {
    id: 4,
    type: 'nsf_checks',
    severity: 'medium',
    title: '3 NSF/returned payments to process',
    description: 'Payments returned by the bank that need to be reversed and tenants notified.',
    action: 'Process Returns',
    count: 3,
  },
];

export const overdueBalances = [
  { id: 1, tenant: 'Marcus Williams', unit: '560 Lamar Blvd #204', balance: 4400, daysOverdue: 32, lastPayment: daysAgo(62), notices: 3 },
  { id: 2, tenant: 'Jessica Taylor', unit: '2750 E Riverside Dr #108', balance: 2700, daysOverdue: 28, lastPayment: daysAgo(58), notices: 2 },
  { id: 3, tenant: 'Anthony Davis', unit: '892 Oak Ave, Apt 7', balance: 2100, daysOverdue: 22, lastPayment: daysAgo(52), notices: 2 },
  { id: 4, tenant: 'Christina Lee', unit: '8820 Research Blvd #215', balance: 1850, daysOverdue: 18, lastPayment: daysAgo(48), notices: 1 },
  { id: 5, tenant: 'Robert Johnson', unit: '3340 Birch Ln #12', balance: 1800, daysOverdue: 16, lastPayment: daysAgo(46), notices: 1 },
  { id: 6, tenant: 'Amanda Wilson', unit: '1100 Congress Ave #3A', balance: 1550, daysOverdue: 15, lastPayment: daysAgo(45), notices: 1 },
];

export const pendingOwnerPayouts = [
  { id: 1, owner: 'Robert Chen', properties: 3, amount: 28450, statementDate: daysAgo(2) },
  { id: 2, owner: 'Linda Marsh', properties: 2, amount: 62300, statementDate: daysAgo(2) },
  { id: 3, owner: 'Vista Properties LLC', properties: 3, amount: 41200, statementDate: daysAgo(3) },
  { id: 4, owner: 'Capital Realty Group', properties: 2, amount: 31500, statementDate: daysAgo(3) },
  { id: 5, owner: 'Sarah Jennings', properties: 2, amount: 15950, statementDate: daysAgo(4) },
];

export const recentTransactions = [
  { id: 1, date: daysAgo(0), description: 'Rent Payment - Sarah Mitchell', amount: 1650, type: 'credit', account: 'Operating' },
  { id: 2, date: daysAgo(0), description: 'Vendor Payment - ABC Plumbing', amount: -875, type: 'debit', account: 'Operating' },
  { id: 3, date: daysAgo(1), description: 'Rent Payment - James Cooper', amount: 2100, type: 'credit', account: 'Operating' },
  { id: 4, date: daysAgo(1), description: 'Management Fee - 892 Oak Ave', amount: -462, type: 'debit', account: 'Operating' },
  { id: 5, date: daysAgo(1), description: 'Rent Payment - David Kim', amount: 1800, type: 'credit', account: 'Operating' },
];
