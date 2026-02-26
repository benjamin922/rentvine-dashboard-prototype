export const userDashboards = [
  { id: 'maint-kpi', name: 'Maintenance Coordinator KPIs', lastModified: '2026-02-25', shared: true, template: true },
  { id: 'acct-overview', name: 'Accounting Overview', lastModified: '2026-02-24', shared: false, template: false },
  { id: 'exec-summary', name: 'Executive Summary', lastModified: '2026-02-20', shared: true, template: false },
];

export const dashboardTemplates = [
  { id: 'tmpl-maint', name: 'Maintenance Coordinator KPIs', description: 'Track work order metrics, vendor performance, and resolution times', icon: 'wrench' },
  { id: 'tmpl-acct', name: 'Accounting Overview', description: 'Monitor trust balances, payables, receivables, and reconciliation status', icon: 'calculator' },
  { id: 'tmpl-lease', name: 'Leasing Pipeline', description: 'Track vacancy rates, applications, showings, and move-ins', icon: 'key' },
  { id: 'tmpl-exec', name: 'Executive Summary', description: 'Cross-functional KPIs for company owners and executives', icon: 'bar-chart-3' },
];

export const sampleWidgets = [
  { id: 'w1', type: 'kpi', title: 'Avg Resolution Time', value: '4.2 days', trend: -6.7, x: 0, y: 0, w: 3, h: 2 },
  { id: 'w2', type: 'kpi', title: 'Open Tickets', value: '23', trend: -3.1, x: 3, y: 0, w: 3, h: 2 },
  { id: 'w3', type: 'kpi', title: 'Overdue %', value: '8.2%', trend: -12.5, x: 6, y: 0, w: 3, h: 2 },
  { id: 'w4', type: 'kpi', title: 'Vendor Response Rate', value: '94%', trend: 2.1, x: 9, y: 0, w: 3, h: 2 },
  { id: 'w5', type: 'bar-chart', title: 'Work Orders by Category', x: 0, y: 2, w: 6, h: 4, data: [
    { name: 'Plumbing', value: 28 },
    { name: 'Electrical', value: 19 },
    { name: 'HVAC', value: 15 },
    { name: 'Appliance', value: 12 },
    { name: 'General', value: 34 },
    { name: 'Landscaping', value: 8 },
  ]},
  { id: 'w6', type: 'line-chart', title: 'Resolution Time Trend (30 Days)', x: 6, y: 2, w: 6, h: 4, data: [
    { day: 'Jan 27', value: 5.1 },
    { day: 'Feb 3', value: 4.8 },
    { day: 'Feb 10', value: 4.5 },
    { day: 'Feb 17', value: 4.9 },
    { day: 'Feb 24', value: 4.2 },
  ]},
  { id: 'w7', type: 'table', title: 'My Assigned Work Orders', x: 0, y: 6, w: 7, h: 4, data: [
    { id: '#4535', property: '456 Elm St', issue: 'Leaking faucet', priority: 'High', status: 'In Progress', days: 2 },
    { id: '#4528', property: '1247 Oakwood Dr', issue: 'Broken window', priority: 'Medium', status: 'Assigned', days: 3 },
    { id: '#4521', property: '892 Maple Ave', issue: 'HVAC not cooling', priority: 'High', status: 'In Progress', days: 1 },
    { id: '#4519', property: '321 Cedar Ln', issue: 'Garage door stuck', priority: 'Low', status: 'New', days: 4 },
  ]},
  { id: 'w8', type: 'activity', title: 'Recent Maintenance Updates', x: 7, y: 6, w: 5, h: 4, data: [
    { message: 'Vendor invoice submitted — $350', time: '1h ago' },
    { message: 'WO #4521 completed — HVAC service', time: '3h ago' },
    { message: 'Tenant request — Leaking faucet', time: '5h ago' },
    { message: 'Vendor assigned to WO #4535', time: 'Yesterday' },
  ]},
];
