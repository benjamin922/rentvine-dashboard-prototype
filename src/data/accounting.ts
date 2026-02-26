// Accounting and financial mock data for Rentvine dashboard prototype
// All amounts in USD, dates relative to Feb 26, 2026

export interface FinancialSummary {
  totalReceivable: number;
  totalCollected: number;
  collectionRate: number;
  overdueAmount: number;
  prepayments: number;
  securityDeposits: number;
  trustBalance: number;
}

export interface Transaction {
  id: number;
  date: string;
  type: "Payment" | "Charge" | "Refund" | "Credit";
  description: string;
  amount: number;
  propertyName: string;
  tenantName: string;
  status: "Completed" | "Pending" | "Failed" | "Processing";
}

export interface OverdueBalance {
  tenantName: string;
  propertyName: string;
  unit: string;
  amountDue: number;
  daysPastDue: number;
  lastPaymentDate: string;
}

export interface MonthlyRevenue {
  month: string;
  revenue: number;
  expenses: number;
  net: number;
}

export interface InvoiceStats {
  total: number;
  paid: number;
  unpaid: number;
  overdue: number;
  draftCount: number;
}

export const financialSummary: FinancialSummary = {
  totalReceivable: 243700,
  totalCollected: 228274,
  collectionRate: 93.7,
  overdueAmount: 15426,
  prepayments: 4200,
  securityDeposits: 87500,
  trustBalance: 142380,
};

export const recentTransactions: Transaction[] = [
  {
    id: 5001,
    date: "2026-02-26",
    type: "Payment",
    description: "March 2026 rent payment - Online ACH",
    amount: 1650,
    propertyName: "Oakwood Apartments",
    tenantName: "James Rodriguez",
    status: "Completed",
  },
  {
    id: 5002,
    date: "2026-02-26",
    type: "Payment",
    description: "March 2026 rent payment - Online ACH",
    amount: 2100,
    propertyName: "Summit View Condos",
    tenantName: "Olivia Parker",
    status: "Processing",
  },
  {
    id: 5003,
    date: "2026-02-25",
    type: "Charge",
    description: "Late fee - February 2026 rent",
    amount: 75,
    propertyName: "Peachtree Lofts",
    tenantName: "Diana Howard",
    status: "Pending",
  },
  {
    id: 5004,
    date: "2026-02-25",
    type: "Payment",
    description: "March 2026 rent payment - Check #4521",
    amount: 1800,
    propertyName: "Magnolia Place",
    tenantName: "Tiffany Reed",
    status: "Completed",
  },
  {
    id: 5005,
    date: "2026-02-24",
    type: "Refund",
    description: "Security deposit refund - Move out 02/15",
    amount: -2400,
    propertyName: "Elm Street Townhomes",
    tenantName: "Kevin Moore",
    status: "Completed",
  },
  {
    id: 5006,
    date: "2026-02-24",
    type: "Payment",
    description: "February 2026 rent payment - Online ACH (late)",
    amount: 1950,
    propertyName: "Peachtree Lofts",
    tenantName: "Diana Howard",
    status: "Completed",
  },
  {
    id: 5007,
    date: "2026-02-23",
    type: "Charge",
    description: "Pet deposit - New lease addendum",
    amount: 300,
    propertyName: "Riverside Commons",
    tenantName: "Tyler Brooks",
    status: "Pending",
  },
  {
    id: 5008,
    date: "2026-02-22",
    type: "Payment",
    description: "March 2026 rent payment - Online ACH (early)",
    amount: 2200,
    propertyName: "Elm Street Townhomes",
    tenantName: "Christopher Hill",
    status: "Completed",
  },
  {
    id: 5009,
    date: "2026-02-21",
    type: "Credit",
    description: "Maintenance inconvenience credit - HVAC repair",
    amount: -150,
    propertyName: "Riverside Commons",
    tenantName: "Karen Williams",
    status: "Completed",
  },
  {
    id: 5010,
    date: "2026-02-20",
    type: "Payment",
    description: "February 2026 rent payment - Online ACH",
    amount: 1550,
    propertyName: "Willow Creek Apartments",
    tenantName: "Gregory Sanders",
    status: "Completed",
  },
  {
    id: 5011,
    date: "2026-02-19",
    type: "Charge",
    description: "Lease renewal processing fee",
    amount: 150,
    propertyName: "Oakwood Apartments",
    tenantName: "Emily Chen",
    status: "Completed",
  },
  {
    id: 5012,
    date: "2026-02-18",
    type: "Payment",
    description: "February 2026 rent payment - Money order",
    amount: 1800,
    propertyName: "Magnolia Place",
    tenantName: "Daniel Phillips",
    status: "Completed",
  },
  {
    id: 5013,
    date: "2026-02-17",
    type: "Payment",
    description: "February 2026 rent payment - Online ACH",
    amount: 2450,
    propertyName: "Peachtree Lofts",
    tenantName: "William Price",
    status: "Completed",
  },
  {
    id: 5014,
    date: "2026-02-15",
    type: "Refund",
    description: "Overpayment refund - January 2026",
    amount: -200,
    propertyName: "Oakwood Apartments",
    tenantName: "Patricia Nguyen",
    status: "Completed",
  },
  {
    id: 5015,
    date: "2026-02-14",
    type: "Payment",
    description: "February 2026 rent payment - Online portal",
    amount: 1350,
    propertyName: "Oakwood Apartments",
    tenantName: "Sarah Mitchell",
    status: "Failed",
  },
];

export const overdueBalances: OverdueBalance[] = [
  {
    tenantName: "Diana Howard",
    propertyName: "Peachtree Lofts",
    unit: "L-301",
    amountDue: 3975,
    daysPastDue: 26,
    lastPaymentDate: "2026-01-05",
  },
  {
    tenantName: "Laura Bennett",
    propertyName: "Willow Creek Apartments",
    unit: "215",
    amountDue: 1950,
    daysPastDue: 22,
    lastPaymentDate: "2026-01-02",
  },
  {
    tenantName: "Daniel Phillips",
    propertyName: "Magnolia Place",
    unit: "2",
    amountDue: 1875,
    daysPastDue: 18,
    lastPaymentDate: "2026-02-18",
  },
  {
    tenantName: "Chris Evans",
    propertyName: "Oakwood Apartments",
    unit: "303",
    amountDue: 1525,
    daysPastDue: 15,
    lastPaymentDate: "2026-01-28",
  },
  {
    tenantName: "Brian Ramirez",
    propertyName: "Elm Street Townhomes",
    unit: "TH-4",
    amountDue: 2275,
    daysPastDue: 12,
    lastPaymentDate: "2026-02-01",
  },
  {
    tenantName: "Rachel Martinez",
    propertyName: "Riverside Commons",
    unit: "B3",
    amountDue: 1400,
    daysPastDue: 8,
    lastPaymentDate: "2026-02-10",
  },
  {
    tenantName: "Jason Turner",
    propertyName: "Summit View Condos",
    unit: "2B",
    amountDue: 2676,
    daysPastDue: 5,
    lastPaymentDate: "2026-02-15",
  },
  {
    tenantName: "Robert Garcia",
    propertyName: "Oakwood Apartments",
    unit: "301",
    amountDue: 1450,
    daysPastDue: 3,
    lastPaymentDate: "2026-02-20",
  },
];

export const monthlyRevenue: MonthlyRevenue[] = [
  { month: "Sep 2025", revenue: 228500, expenses: 67200, net: 161300 },
  { month: "Oct 2025", revenue: 231200, expenses: 72400, net: 158800 },
  { month: "Nov 2025", revenue: 229800, expenses: 64800, net: 165000 },
  { month: "Dec 2025", revenue: 227100, expenses: 81500, net: 145600 },
  { month: "Jan 2026", revenue: 235400, expenses: 69300, net: 166100 },
  { month: "Feb 2026", revenue: 243700, expenses: 71800, net: 171900 },
];

export const invoiceStats: InvoiceStats = {
  total: 132,
  paid: 104,
  unpaid: 18,
  overdue: 8,
  draftCount: 2,
};

export const expenseBreakdown: { category: string; amount: number; color: string }[] = [
  { category: "Maintenance & Repairs", amount: 24500, color: "#3B82F6" },
  { category: "Property Management Fees", amount: 14800, color: "#8B5CF6" },
  { category: "Insurance", amount: 9600, color: "#22C55E" },
  { category: "Utilities", amount: 8200, color: "#F59E0B" },
  { category: "Taxes", amount: 7400, color: "#EF4444" },
  { category: "Landscaping", amount: 3800, color: "#06B6D4" },
  { category: "Legal & Admin", amount: 3500, color: "#EC4899" },
];

export const rentCollectionByProperty: { propertyName: string; collected: number; outstanding: number; rate: number }[] = [
  { propertyName: "Oakwood Apartments", collected: 17150, outstanding: 1350, rate: 92.7 },
  { propertyName: "Riverside Commons", collected: 11200, outstanding: 1400, rate: 88.9 },
  { propertyName: "Summit View Condos", collected: 10524, outstanding: 2676, rate: 79.7 },
  { propertyName: "Magnolia Place", collected: 3525, outstanding: 1875, rate: 65.3 },
  { propertyName: "Harbor Point Office Park", collected: 22000, outstanding: 0, rate: 100.0 },
  { propertyName: "Elm Street Townhomes", collected: 8225, outstanding: 2275, rate: 78.3 },
  { propertyName: "Peachtree Lofts", collected: 15825, outstanding: 3975, rate: 79.9 },
  { propertyName: "Maple Ridge Duplexes", collected: 5200, outstanding: 0, rate: 100.0 },
  { propertyName: "Downtown Commerce Center", collected: 28800, outstanding: 0, rate: 100.0 },
  { propertyName: "Willow Creek Apartments", collected: 20450, outstanding: 1950, rate: 91.3 },
];
