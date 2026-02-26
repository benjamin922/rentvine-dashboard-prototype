// Dashboard widget configuration and catalog for Rentvine dashboard prototype
// Defines default layout and available widgets for the customizable home dashboard

export interface DashboardWidget {
  id: string;
  type: string;
  title: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface WidgetCatalogItem {
  type: string;
  label: string;
  description: string;
  category: "Overview" | "Leasing" | "Maintenance" | "Accounting" | "Properties";
  defaultW: number;
  defaultH: number;
  minW: number;
  minH: number;
}

export const defaultWidgets: DashboardWidget[] = [
  {
    id: "w1",
    type: "unit-statistics",
    title: "Unit Statistics",
    x: 0,
    y: 0,
    w: 12,
    h: 3,
  },
  {
    id: "w2",
    type: "work-order-statistics",
    title: "Work Order Statistics",
    x: 0,
    y: 3,
    w: 12,
    h: 3,
  },
  {
    id: "w3",
    type: "work-orders-by-status",
    title: "Work Orders by Status",
    x: 0,
    y: 6,
    w: 4,
    h: 5,
  },
  {
    id: "w4",
    type: "units-by-month",
    title: "Units by Month",
    x: 4,
    y: 6,
    w: 8,
    h: 5,
  },
  {
    id: "w5",
    type: "lease-balance-statistics",
    title: "Lease Balance Statistics",
    x: 0,
    y: 11,
    w: 12,
    h: 3,
  },
  {
    id: "w6",
    type: "lease-list",
    title: "Leases",
    x: 0,
    y: 14,
    w: 12,
    h: 6,
  },
  {
    id: "w7",
    type: "work-order-list",
    title: "Work Orders",
    x: 0,
    y: 20,
    w: 12,
    h: 6,
  },
  {
    id: "w8",
    type: "rent-statistics",
    title: "Rent Statistics",
    x: 0,
    y: 26,
    w: 12,
    h: 3,
  },
];

export const widgetCatalog: WidgetCatalogItem[] = [
  // Overview category
  {
    type: "unit-statistics",
    label: "Unit Statistics",
    description: "Summary cards showing total units, occupied, vacant, and maintenance counts with occupancy rate.",
    category: "Overview",
    defaultW: 12,
    defaultH: 3,
    minW: 6,
    minH: 2,
  },
  {
    type: "units-by-month",
    label: "Units by Month",
    description: "Stacked bar chart showing occupied, vacant, and maintenance unit counts over the last 6 months.",
    category: "Overview",
    defaultW: 8,
    defaultH: 5,
    minW: 4,
    minH: 4,
  },
  {
    type: "rent-statistics",
    label: "Rent Statistics",
    description: "Summary cards showing total receivable, collected, collection rate, and overdue amounts.",
    category: "Overview",
    defaultW: 12,
    defaultH: 3,
    minW: 6,
    minH: 2,
  },
  {
    type: "revenue-chart",
    label: "Revenue Chart",
    description: "Line chart showing monthly revenue, expenses, and net income over the last 6 months.",
    category: "Overview",
    defaultW: 8,
    defaultH: 5,
    minW: 4,
    minH: 4,
  },

  // Leasing category
  {
    type: "lease-balance-statistics",
    label: "Lease Balance Statistics",
    description: "Summary cards showing total outstanding balances, tenants with balances, average balance, and security deposits held.",
    category: "Leasing",
    defaultW: 12,
    defaultH: 3,
    minW: 6,
    minH: 2,
  },
  {
    type: "lease-list",
    label: "Leases",
    description: "Sortable table of active leases showing tenant, property, unit, rent, end date, status, and balance.",
    category: "Leasing",
    defaultW: 12,
    defaultH: 6,
    minW: 6,
    minH: 4,
  },
  {
    type: "expiring-leases",
    label: "Expiring Leases",
    description: "List of leases expiring within the next 90 days with renewal action buttons.",
    category: "Leasing",
    defaultW: 6,
    defaultH: 5,
    minW: 4,
    minH: 3,
  },
  {
    type: "leases-by-month",
    label: "Leases by Month",
    description: "Bar chart showing new leases, renewals, and move-outs by month for the last 6 months.",
    category: "Leasing",
    defaultW: 6,
    defaultH: 5,
    minW: 4,
    minH: 4,
  },

  // Maintenance category
  {
    type: "work-order-statistics",
    label: "Work Order Statistics",
    description: "Summary cards showing total, open, in progress, completed, and overdue work order counts.",
    category: "Maintenance",
    defaultW: 12,
    defaultH: 3,
    minW: 6,
    minH: 2,
  },
  {
    type: "work-orders-by-status",
    label: "Work Orders by Status",
    description: "Donut chart breaking down work orders by current status with color-coded segments.",
    category: "Maintenance",
    defaultW: 4,
    defaultH: 5,
    minW: 3,
    minH: 4,
  },
  {
    type: "work-order-list",
    label: "Work Orders",
    description: "Sortable table of recent work orders with title, property, status, priority, and assigned vendor.",
    category: "Maintenance",
    defaultW: 12,
    defaultH: 6,
    minW: 6,
    minH: 4,
  },
  {
    type: "work-orders-by-month",
    label: "Work Orders by Month",
    description: "Bar chart comparing opened vs closed work orders by month for the last 6 months.",
    category: "Maintenance",
    defaultW: 6,
    defaultH: 5,
    minW: 4,
    minH: 4,
  },
  {
    type: "work-orders-by-category",
    label: "Work Orders by Category",
    description: "Horizontal bar chart showing work order distribution across categories like Plumbing, HVAC, etc.",
    category: "Maintenance",
    defaultW: 6,
    defaultH: 5,
    minW: 4,
    minH: 4,
  },

  // Accounting category
  {
    type: "financial-summary",
    label: "Financial Summary",
    description: "Summary cards showing receivable, collected, collection rate, overdue, and trust balance figures.",
    category: "Accounting",
    defaultW: 12,
    defaultH: 3,
    minW: 6,
    minH: 2,
  },
  {
    type: "recent-transactions",
    label: "Recent Transactions",
    description: "Table of recent financial transactions with date, type, amount, tenant, and status.",
    category: "Accounting",
    defaultW: 12,
    defaultH: 6,
    minW: 6,
    minH: 4,
  },
  {
    type: "overdue-balances",
    label: "Overdue Balances",
    description: "List of tenants with overdue balances sorted by days past due with contact action buttons.",
    category: "Accounting",
    defaultW: 6,
    defaultH: 5,
    minW: 4,
    minH: 3,
  },
  {
    type: "expense-breakdown",
    label: "Expense Breakdown",
    description: "Pie chart showing expense distribution across categories like maintenance, insurance, and utilities.",
    category: "Accounting",
    defaultW: 4,
    defaultH: 5,
    minW: 3,
    minH: 4,
  },
  {
    type: "rent-collection-by-property",
    label: "Rent Collection by Property",
    description: "Table showing rent collection rates per property with collected vs outstanding amounts.",
    category: "Accounting",
    defaultW: 6,
    defaultH: 5,
    minW: 4,
    minH: 3,
  },

  // Properties category
  {
    type: "property-list",
    label: "Property List",
    description: "Overview table of all managed properties with address, units, occupancy, and revenue.",
    category: "Properties",
    defaultW: 12,
    defaultH: 6,
    minW: 6,
    minH: 4,
  },
  {
    type: "occupancy-by-property",
    label: "Occupancy by Property",
    description: "Horizontal bar chart comparing occupancy rates across all managed properties.",
    category: "Properties",
    defaultW: 6,
    defaultH: 5,
    minW: 4,
    minH: 4,
  },
  {
    type: "units-by-status",
    label: "Units by Status",
    description: "Donut chart showing overall unit status distribution: occupied, vacant, and maintenance.",
    category: "Properties",
    defaultW: 4,
    defaultH: 5,
    minW: 3,
    minH: 4,
  },
];
