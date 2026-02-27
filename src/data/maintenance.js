const today = new Date();
const daysFromNow = (n) => {
  const d = new Date(today);
  d.setDate(d.getDate() + n);
  return d.toISOString().split('T')[0];
};
const daysAgo = (n) => daysFromNow(-n);

export const maintenanceSummary = {
  openWorkOrders: 34,
  openTrend: -4,
  unassigned: 8,
  unassignedTrend: 2,
  avgCompletionDays: 3.2,
  completionTrend: -0.5,
  completedThisMonth: 47,
  completedTrend: 12,
  totalSpendThisMonth: 18450,
  spendTrend: -8.2,
  emergencyOpen: 2,
};

export const needsAttention = [
  {
    id: 1,
    type: 'unassigned',
    severity: 'high',
    title: '5 work orders unassigned for 48+ hours',
    description: 'These work orders were created 2+ days ago and have no vendor assigned. Tenants may escalate.',
    action: 'Assign Vendors',
    count: 5,
  },
  {
    id: 2,
    type: 'emergency',
    severity: 'high',
    title: '2 emergency work orders open',
    description: 'Water leak at 892 Oak Ave (Apt 7) and no heat at 3340 Birch Ln #4. Both reported today.',
    action: 'View Emergencies',
    count: 2,
  },
  {
    id: 3,
    type: 'overdue',
    severity: 'medium',
    title: '6 work orders past estimated completion date',
    description: 'These were expected to be completed by now. Vendors have not submitted completion updates.',
    action: 'Follow Up',
    count: 6,
  },
  {
    id: 4,
    type: 'pending_approval',
    severity: 'medium',
    title: '4 invoices pending owner approval',
    description: 'Vendor invoices that exceed the auto-approval threshold and need owner sign-off.',
    action: 'Review Invoices',
    count: 4,
  },
];

export const unassignedWorkOrders = [
  { id: 1, title: 'Garbage disposal not working', unit: '1100 Congress Ave #8C', priority: 'Normal', created: daysAgo(3), tenant: 'Patricia Moore' },
  { id: 2, title: 'Bathroom faucet leaking', unit: '2750 E Riverside Dr #215', priority: 'Normal', created: daysAgo(3), tenant: 'Michael Chen' },
  { id: 3, title: 'Dishwasher not draining', unit: '8820 Research Blvd #110', priority: 'Normal', created: daysAgo(2), tenant: 'Laura Foster' },
  { id: 4, title: 'Window screen torn', unit: '560 Lamar Blvd #108', priority: 'Low', created: daysAgo(2), tenant: 'Jessica Taylor' },
  { id: 5, title: 'Closet door off track', unit: '3421 Guadalupe St, Apt 1', priority: 'Low', created: daysAgo(2), tenant: 'Brian Nguyen' },
];

export const overdueWorkOrders = [
  { id: 6, title: 'HVAC repair - no cooling', unit: '892 Oak Ave, Apt 12', vendor: 'Comfort Air Solutions', dueDate: daysAgo(4), estimatedCost: 1200, priority: 'High' },
  { id: 7, title: 'Roof leak repair', unit: '750 Maple Dr, Unit 2', vendor: 'Premier Roofing', dueDate: daysAgo(3), estimatedCost: 3500, priority: 'High' },
  { id: 8, title: 'Exterior paint touch-up', unit: '415 W 6th St', vendor: 'ColorPro Painters', dueDate: daysAgo(2), estimatedCost: 950, priority: 'Normal' },
  { id: 9, title: 'Replace kitchen countertop', unit: '4521 Elm St, Unit 3B', vendor: 'Austin Stone & Tile', dueDate: daysAgo(2), estimatedCost: 2800, priority: 'Normal' },
  { id: 10, title: 'Fix garage door opener', unit: '5509 N IH-35, Unit 6', vendor: 'Quick Garage Doors', dueDate: daysAgo(1), estimatedCost: 450, priority: 'Normal' },
  { id: 11, title: 'Replace bathroom exhaust fan', unit: '2210 Cedar St, Apt 5A', vendor: 'Spark Electric Co', dueDate: daysAgo(1), estimatedCost: 325, priority: 'Low' },
];

export const emergencyWorkOrders = [
  { id: 12, title: 'Water leak - ceiling dripping', unit: '892 Oak Ave, Apt 7', tenant: 'Anthony Davis', created: daysAgo(0), priority: 'Emergency', status: 'New' },
  { id: 13, title: 'No heat - furnace not working', unit: '3340 Birch Ln #4', tenant: 'Emily Robinson', created: daysAgo(0), priority: 'Emergency', status: 'New' },
];
