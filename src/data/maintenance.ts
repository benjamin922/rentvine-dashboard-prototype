export const workOrderSummary = {
  open: 23,
  inProgress: 41,
  awaitingApproval: 8,
  completedThisWeek: 19,
  avgResolutionTime: 4.2,
  trends: {
    open: -3.1,
    inProgress: 5.2,
    awaitingApproval: -12.5,
    completedThisWeek: 8.3,
    avgResolutionTime: -6.7,
  },
};

export const maintenanceAlerts = [
  {
    id: 1,
    icon: 'user-x',
    message: '5 work orders unassigned for 48+ hours',
    count: 5,
    severity: 'error' as const,
    cta: 'Assign Vendors',
  },
  {
    id: 2,
    icon: 'clock',
    message: '3 work orders awaiting owner approval (est. $4,200)',
    count: 3,
    severity: 'warning' as const,
    cta: 'Send Reminders',
  },
  {
    id: 3,
    icon: 'alert-triangle',
    message: '2 emergency requests open',
    count: 2,
    severity: 'error' as const,
    cta: 'View Emergencies',
  },
];

export const workOrderPipeline = [
  { stage: 'New', count: 23, color: '#ef4444' },
  { stage: 'Assigned', count: 15, color: '#f97316' },
  { stage: 'In Progress', count: 26, color: '#3b82f6' },
  { stage: 'Pending Approval', count: 8, color: '#eab308' },
  { stage: 'Completed', count: 19, color: '#22c55e' },
];

export const vendorPerformance = [
  { id: 1, name: 'QuickFix Plumbing', avgResponseTime: 2.1, jobsCompleted: 34, rating: 4.8 },
  { id: 2, name: 'ABC Electric Services', avgResponseTime: 3.4, jobsCompleted: 28, rating: 4.6 },
  { id: 3, name: 'GreenThumb Landscaping', avgResponseTime: 1.8, jobsCompleted: 42, rating: 4.9 },
  { id: 4, name: 'Premier HVAC Solutions', avgResponseTime: 4.2, jobsCompleted: 19, rating: 4.3 },
  { id: 5, name: 'AllStar Handyman', avgResponseTime: 2.8, jobsCompleted: 56, rating: 4.7 },
];

export const maintenanceActivity = [
  { id: 1, message: 'Vendor invoice submitted — $350, Plumbing repair at 123 Oak St', time: '1 hour ago', icon: 'receipt' },
  { id: 2, message: 'Work order #4521 completed — HVAC service', time: '3 hours ago', icon: 'check-circle' },
  { id: 3, message: 'Tenant submitted request — Leaking faucet, 456 Elm Ave', time: '5 hours ago', icon: 'droplets' },
  { id: 4, message: 'Vendor assigned — QuickFix Plumbing to WO #4535', time: 'Yesterday', icon: 'user-plus' },
  { id: 5, message: 'Owner approved repair — $2,100 roof patch, 789 Pine Dr', time: 'Yesterday', icon: 'thumbs-up' },
];
