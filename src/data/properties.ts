export const propertySummary = {
  totalProperties: 248,
  activeLeases: 231,
  vacantUnits: 17,
  avgOccupancy: 93.1,
  avgRent: 1847,
  trends: {
    totalProperties: 2.4,
    activeLeases: 1.8,
    vacantUnits: -5.2,
    avgOccupancy: 1.2,
  },
};

export const needsAttention = [
  {
    id: 1,
    icon: 'calendar-clock',
    message: '7 leases expiring within 30 days — No renewal started',
    count: 7,
    cta: 'Start Renewals',
    severity: 'warning' as const,
  },
  {
    id: 2,
    icon: 'clipboard-check',
    message: '3 properties with overdue inspections',
    count: 3,
    cta: 'View Properties',
    severity: 'warning' as const,
  },
  {
    id: 3,
    icon: 'home',
    message: '12 units vacant for 30+ days',
    count: 12,
    cta: 'View Vacant Units',
    severity: 'error' as const,
  },
];

export const leasesEndingSoon = [
  { id: 1, property: '1247 Oakwood Dr', unit: '3B', tenant: 'Sarah Mitchell', leaseEnd: '2026-03-15', daysLeft: 17, status: 'No Renewal' },
  { id: 2, property: '892 Maple Ave', unit: '1A', tenant: 'James Thornton', leaseEnd: '2026-03-22', daysLeft: 24, status: 'Renewal Sent' },
  { id: 3, property: '456 Elm St', unit: '2C', tenant: 'Maria Garcia', leaseEnd: '2026-03-28', daysLeft: 30, status: 'No Renewal' },
  { id: 4, property: '321 Cedar Ln', unit: '4D', tenant: 'Robert Chen', leaseEnd: '2026-03-18', daysLeft: 20, status: 'In Discussion' },
  { id: 5, property: '678 Birch Blvd', unit: '1B', tenant: 'Emily Johnson', leaseEnd: '2026-03-25', daysLeft: 27, status: 'No Renewal' },
];

export const vacancyPipeline = [
  { stage: 'Vacant', count: 17, color: '#ef4444' },
  { stage: 'Listed', count: 12, color: '#f97316' },
  { stage: 'Showing', count: 8, color: '#eab308' },
  { stage: 'Application', count: 5, color: '#3b82f6' },
  { stage: 'Approved', count: 3, color: '#22c55e' },
  { stage: 'Move-in Scheduled', count: 2, color: '#1b5e20' },
];

export const recentActivity = [
  { id: 1, message: 'New application received — 123 Oak St, Unit B', time: '2 hours ago', icon: 'file-text' },
  { id: 2, message: 'Lease signed — 456 Elm Ave', time: 'Yesterday', icon: 'pen-tool' },
  { id: 3, message: 'Move-out completed — 789 Pine Dr', time: '2 days ago', icon: 'log-out' },
  { id: 4, message: 'Inspection scheduled — 321 Cedar Ln, Unit 4D', time: '2 days ago', icon: 'clipboard' },
  { id: 5, message: 'Rent payment received — 892 Maple Ave, Unit 1A', time: '3 days ago', icon: 'dollar-sign' },
];

export const propertiesListData = [
  { id: 1, address: '1247 Oakwood Dr', city: 'Austin', state: 'TX', zip: '78701', type: 'Multi-Family', units: 8, occupied: 7, status: 'Active', owner: 'Westfield Holdings LLC', manager: 'Jessica Rivera', rent: 1850, portfolio: 'Downtown' },
  { id: 2, address: '892 Maple Ave', city: 'Austin', state: 'TX', zip: '78702', type: 'Single Family', units: 1, occupied: 1, status: 'Active', owner: 'David & Lisa Park', manager: 'Jessica Rivera', rent: 2200, portfolio: 'East Side' },
  { id: 3, address: '456 Elm St', city: 'Round Rock', state: 'TX', zip: '78664', type: 'Multi-Family', units: 12, occupied: 10, status: 'Active', owner: 'Greenfield Properties Inc', manager: 'Marcus Thompson', rent: 1450, portfolio: 'Suburban' },
  { id: 4, address: '321 Cedar Ln', city: 'Austin', state: 'TX', zip: '78745', type: 'Townhome', units: 4, occupied: 4, status: 'Active', owner: 'Patricia Hughes', manager: 'Marcus Thompson', rent: 1675, portfolio: 'South Austin' },
  { id: 5, address: '678 Birch Blvd', city: 'Georgetown', state: 'TX', zip: '78626', type: 'Single Family', units: 1, occupied: 0, status: 'Active', owner: 'Michael Sawyer', manager: 'Jessica Rivera', rent: 2400, portfolio: 'Suburban' },
  { id: 6, address: '910 Willow Way', city: 'Austin', state: 'TX', zip: '78703', type: 'Condo', units: 1, occupied: 1, status: 'Active', owner: 'Sandra Morales', manager: 'Jessica Rivera', rent: 1950, portfolio: 'Downtown' },
  { id: 7, address: '1533 Pecan St', city: 'Pflugerville', state: 'TX', zip: '78660', type: 'Multi-Family', units: 6, occupied: 5, status: 'Active', owner: 'Lakeview Capital Group', manager: 'Marcus Thompson', rent: 1325, portfolio: 'Suburban' },
  { id: 8, address: '2101 Congress Ave', city: 'Austin', state: 'TX', zip: '78701', type: 'Multi-Family', units: 24, occupied: 22, status: 'Active', owner: 'Downtown Realty Partners', manager: 'Jessica Rivera', rent: 2100, portfolio: 'Downtown' },
  { id: 9, address: '745 Live Oak Rd', city: 'Cedar Park', state: 'TX', zip: '78613', type: 'Single Family', units: 1, occupied: 1, status: 'Active', owner: 'Thomas & Angela Weber', manager: 'Marcus Thompson', rent: 2650, portfolio: 'Suburban' },
  { id: 10, address: '388 Magnolia Dr', city: 'Austin', state: 'TX', zip: '78704', type: 'Duplex', units: 2, occupied: 2, status: 'Active', owner: 'Rebecca Stone', manager: 'Jessica Rivera', rent: 1800, portfolio: 'South Austin' },
  { id: 11, address: '1022 Riverside Pkwy', city: 'Austin', state: 'TX', zip: '78741', type: 'Multi-Family', units: 16, occupied: 14, status: 'Active', owner: 'Riverside Management LLC', manager: 'Marcus Thompson', rent: 1575, portfolio: 'East Side' },
  { id: 12, address: '567 Sunset Blvd', city: 'Lakeway', state: 'TX', zip: '78734', type: 'Single Family', units: 1, occupied: 0, status: 'Active', owner: 'Jonathan Pierce', manager: 'Jessica Rivera', rent: 3200, portfolio: 'Lake Travis' },
  { id: 13, address: '834 Highland Loop', city: 'Austin', state: 'TX', zip: '78731', type: 'Condo', units: 1, occupied: 1, status: 'Active', owner: 'Claire Nakamura', manager: 'Jessica Rivera', rent: 1700, portfolio: 'Northwest Hills' },
  { id: 14, address: '2290 Barton Springs', city: 'Austin', state: 'TX', zip: '78704', type: 'Multi-Family', units: 8, occupied: 8, status: 'Active', owner: 'Barton Creek Holdings', manager: 'Marcus Thompson', rent: 2350, portfolio: 'South Austin' },
  { id: 15, address: '441 Lamar Blvd', city: 'Austin', state: 'TX', zip: '78701', type: 'Multi-Family', units: 20, occupied: 18, status: 'Active', owner: 'Lamar Street Partners', manager: 'Jessica Rivera', rent: 1900, portfolio: 'Downtown' },
  { id: 16, address: '1678 Ranch Rd', city: 'Dripping Springs', state: 'TX', zip: '78620', type: 'Single Family', units: 1, occupied: 1, status: 'Active', owner: 'William & Karen Foster', manager: 'Marcus Thompson', rent: 2800, portfolio: 'Hill Country' },
  { id: 17, address: '923 Brazos St', city: 'Austin', state: 'TX', zip: '78701', type: 'Condo', units: 1, occupied: 0, status: 'Inactive', owner: 'David Reeves', manager: 'Jessica Rivera', rent: 1650, portfolio: 'Downtown' },
  { id: 18, address: '155 Shoal Creek Blvd', city: 'Austin', state: 'TX', zip: '78705', type: 'Multi-Family', units: 10, occupied: 9, status: 'Active', owner: 'Shoal Creek Investments', manager: 'Marcus Thompson', rent: 1425, portfolio: 'Central' },
  { id: 19, address: '2847 Bee Cave Rd', city: 'Austin', state: 'TX', zip: '78746', type: 'Single Family', units: 1, occupied: 1, status: 'Active', owner: 'Stephanie Brooks', manager: 'Jessica Rivera', rent: 3500, portfolio: 'Westlake' },
  { id: 20, address: '712 Anderson Mill', city: 'Austin', state: 'TX', zip: '78750', type: 'Townhome', units: 3, occupied: 2, status: 'Active', owner: 'Anderson Properties LLC', manager: 'Marcus Thompson', rent: 1550, portfolio: 'Northwest Hills' },
];

export const savedViews = [
  { id: 'all', name: 'All Properties', isDefault: true, isShared: false, filters: {} },
  { id: 'vacant', name: 'Vacant Units', isDefault: false, isShared: true, filters: { vacant: true } },
  { id: 'expiring', name: 'Leases Expiring', isDefault: false, isShared: true, filters: { leaseExpiring: true } },
  { id: 'overdue', name: 'Overdue Balances', isDefault: false, isShared: false, filters: { overdueBalance: true } },
];
