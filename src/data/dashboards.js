export const dashboardTemplates = [
  {
    id: 'maintenance-kpi',
    name: 'Maintenance Coordinator KPIs',
    description: 'Track work order volume, response times, vendor performance, and spend by category.',
    category: 'Maintenance',
    widgets: 6,
  },
  {
    id: 'accounting-overview',
    name: 'Accounting Manager Overview',
    description: 'Monitor cash flow, receivables aging, owner payouts, and reconciliation status.',
    category: 'Accounting',
    widgets: 8,
  },
  {
    id: 'executive-summary',
    name: 'Executive Summary',
    description: 'High-level portfolio health: occupancy, revenue trends, NOI, and key alerts.',
    category: 'Executive',
    widgets: 5,
  },
  {
    id: 'leasing-pipeline',
    name: 'Leasing Pipeline',
    description: 'Application funnel, vacancy rates, days-on-market, and upcoming lease events.',
    category: 'Leasing',
    widgets: 7,
  },
];

export const userDashboards = [
  {
    id: 'my-1',
    name: 'My Daily Overview',
    description: 'Custom view combining maintenance alerts with occupancy metrics.',
    lastModified: '2026-02-24',
    shared: false,
    widgets: [
      { id: 'w1', type: 'metric', title: 'Open Work Orders', value: 34, x: 0, y: 0, w: 3, h: 2 },
      { id: 'w2', type: 'metric', title: 'Occupancy Rate', value: '93.5%', x: 3, y: 0, w: 3, h: 2 },
      { id: 'w3', type: 'metric', title: 'Monthly Revenue', value: '$298,750', x: 6, y: 0, w: 3, h: 2 },
      { id: 'w4', type: 'metric', title: 'Overdue Balance', value: '$34,200', x: 9, y: 0, w: 3, h: 2 },
      { id: 'w5', type: 'chart', title: 'Rent Collection Trend', chartType: 'line', x: 0, y: 2, w: 6, h: 4, data: [92, 94, 91, 96, 93, 95, 97, 94, 96, 95, 97, 96] },
      { id: 'w6', type: 'chart', title: 'Work Orders by Status', chartType: 'bar', x: 6, y: 2, w: 6, h: 4, data: { New: 8, 'In Progress': 14, 'On Hold': 5, Completed: 47 } },
      { id: 'w7', type: 'list', title: 'Recent Activity', x: 0, y: 6, w: 12, h: 4, items: [
        'Rent payment received - Sarah Mitchell ($1,650)',
        'Work order #1247 completed - HVAC Repair',
        'New application - 560 Lamar Blvd #204',
        'Owner payout processed - Robert Chen ($28,450)',
        'Lease renewal signed - Maria Gonzalez',
      ]},
    ],
  },
  {
    id: 'my-2',
    name: 'Revenue Tracker',
    description: 'Financial performance across all managed properties.',
    lastModified: '2026-02-20',
    shared: true,
    widgets: [
      { id: 'w1', type: 'metric', title: 'Total Revenue (MTD)', value: '$298,750', x: 0, y: 0, w: 4, h: 2 },
      { id: 'w2', type: 'metric', title: 'Outstanding', value: '$127,450', x: 4, y: 0, w: 4, h: 2 },
      { id: 'w3', type: 'metric', title: 'Collection Rate', value: '94.2%', x: 8, y: 0, w: 4, h: 2 },
      { id: 'w4', type: 'chart', title: 'Monthly Revenue (12 mo)', chartType: 'line', x: 0, y: 2, w: 12, h: 4, data: [265000, 271000, 278000, 282000, 285000, 289000, 291000, 293000, 295000, 296000, 297000, 298750] },
    ],
  },
];

export const availableWidgets = [
  { type: 'metric', name: 'Single Metric', description: 'Display a single KPI with trend indicator' },
  { type: 'chart', name: 'Chart', description: 'Line, bar, or donut chart visualization' },
  { type: 'list', name: 'Activity Feed', description: 'Recent items or events in a list' },
  { type: 'table', name: 'Data Table', description: 'Compact table with sortable columns' },
  { type: 'alerts', name: 'Alerts Panel', description: 'Active alerts and notifications' },
];
