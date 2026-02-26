export const financialHealth = {
  trustBalance: 1247832.0,
  outstandingPayables: 34219.0,
  receivablesOverdue: 12847.0,
  ownerDistributionsPending: 89430.0,
  trends: {
    trustBalance: 3.2,
    outstandingPayables: -8.1,
    receivablesOverdue: 12.4,
    ownerDistributionsPending: 0,
  },
};

export const actionRequired = [
  {
    id: 1,
    icon: 'landmark',
    message: 'Bank reconciliation overdue — Last reconciled: 3 days ago',
    severity: 'error' as const,
    cta: 'Reconcile Now',
  },
  {
    id: 2,
    icon: 'file-stack',
    message: '14 bills awaiting approval ($8,422.00)',
    count: 14,
    severity: 'warning' as const,
    cta: 'Review Bills',
  },
  {
    id: 3,
    icon: 'mail',
    message: 'Owner statements not sent for February',
    severity: 'warning' as const,
    cta: 'Generate Statements',
  },
];

export const overdueBalances = {
  currentBalance: 187432.0,
  overdueBalance: 12847.0,
  upcomingCharges: 45230.0,
  prepayments: 8920.0,
  securityDeposits: 142500.0,
};

export const recentTransactions = [
  { id: 1, date: '2026-02-26', description: 'Rent Payment — 1247 Oakwood Dr, 3B', property: '1247 Oakwood Dr', amount: 1850.0, type: 'credit' as const },
  { id: 2, date: '2026-02-26', description: 'Maintenance Invoice — Plumbing repair', property: '456 Elm St', amount: -350.0, type: 'debit' as const },
  { id: 3, date: '2026-02-25', description: 'Rent Payment — 892 Maple Ave', property: '892 Maple Ave', amount: 2200.0, type: 'credit' as const },
  { id: 4, date: '2026-02-25', description: 'Owner Distribution — Westfield Holdings', property: 'Multiple', amount: -4250.0, type: 'debit' as const },
  { id: 5, date: '2026-02-25', description: 'Late Fee Charge — 678 Birch Blvd', property: '678 Birch Blvd', amount: 75.0, type: 'credit' as const },
  { id: 6, date: '2026-02-24', description: 'Rent Payment — 321 Cedar Ln, 4D', property: '321 Cedar Ln', amount: 1675.0, type: 'credit' as const },
  { id: 7, date: '2026-02-24', description: 'Vendor Payment — ABC Landscaping', property: 'Multiple', amount: -1200.0, type: 'debit' as const },
  { id: 8, date: '2026-02-24', description: 'Security Deposit — 910 Willow Way', property: '910 Willow Way', amount: 1950.0, type: 'credit' as const },
];

export const upcomingPayments = [
  { id: 1, date: '2026-02-27', description: 'Owner Distribution — Downtown Realty Partners', amount: 12450.0, type: 'distribution' },
  { id: 2, date: '2026-02-27', description: 'Vendor Payment — QuickFix Plumbing', amount: 875.0, type: 'vendor' },
  { id: 3, date: '2026-02-28', description: 'Owner Distribution — Greenfield Properties', amount: 8920.0, type: 'distribution' },
  { id: 4, date: '2026-03-01', description: 'Monthly Rent Charges Post', amount: 0, type: 'recurring' },
  { id: 5, date: '2026-03-01', description: 'Owner Distribution — Lakeview Capital', amount: 5640.0, type: 'distribution' },
  { id: 6, date: '2026-03-02', description: 'Vendor Payment — GreenThumb Landscaping', amount: 2100.0, type: 'vendor' },
];
