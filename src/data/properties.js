const today = new Date();
const daysFromNow = (n) => {
  const d = new Date(today);
  d.setDate(d.getDate() + n);
  return d.toISOString().split('T')[0];
};
const daysAgo = (n) => daysFromNow(-n);

export const propertySummary = {
  totalUnits: 247,
  occupied: 231,
  vacant: 16,
  occupancyRate: 93.5,
  occupancyTrend: 1.2,
  avgRent: 1845,
  avgRentTrend: 3.1,
  leasesExpiringSoon: 12,
  moveInsThisMonth: 4,
  moveOutsThisMonth: 6,
};

export const needsAttention = [
  {
    id: 1,
    type: 'leases_expiring',
    severity: 'high',
    title: '7 leases expiring in 30 days with no renewal started',
    description: 'These tenants have not been contacted about renewal. Leases expire between Mar 15–Apr 2.',
    action: 'Start Renewals',
    count: 7,
  },
  {
    id: 2,
    type: 'vacant_units',
    severity: 'medium',
    title: '4 units vacant for 30+ days with no applications',
    description: 'These units have been listed but have zero applicants. Consider adjusting pricing or marketing.',
    action: 'Review Listings',
    count: 4,
  },
  {
    id: 3,
    type: 'move_out_inspections',
    severity: 'high',
    title: '3 move-out inspections not yet scheduled',
    description: 'Tenants moving out in the next 14 days without scheduled inspections.',
    action: 'Schedule Inspections',
    count: 3,
  },
  {
    id: 4,
    type: 'insurance_expiring',
    severity: 'medium',
    title: '5 renter insurance policies expiring this month',
    description: 'Tenants with expiring insurance who haven\'t uploaded new proof of coverage.',
    action: 'Send Reminders',
    count: 5,
  },
];

export const leasesExpiringSoon = [
  { id: 1, tenant: 'Sarah Mitchell', unit: '4521 Elm St, Unit 3B', city: 'Austin, TX', expiresOn: daysFromNow(18), rent: 1650, renewalStatus: 'Not Started' },
  { id: 2, tenant: 'James Cooper', unit: '892 Oak Ave, Apt 12', city: 'Austin, TX', expiresOn: daysFromNow(22), rent: 2100, renewalStatus: 'Not Started' },
  { id: 3, tenant: 'Maria Gonzalez', unit: '1205 Pine Rd, Unit A', city: 'Round Rock, TX', expiresOn: daysFromNow(25), rent: 1450, renewalStatus: 'Offer Sent' },
  { id: 4, tenant: 'David Kim', unit: '3340 Birch Ln #7', city: 'Cedar Park, TX', expiresOn: daysFromNow(28), rent: 1800, renewalStatus: 'Not Started' },
  { id: 5, tenant: 'Rachel Adams', unit: '750 Maple Dr, Unit 2', city: 'Pflugerville, TX', expiresOn: daysFromNow(30), rent: 1375, renewalStatus: 'Not Started' },
  { id: 6, tenant: 'Kevin Brown', unit: '2210 Cedar St, Apt 5A', city: 'Austin, TX', expiresOn: daysFromNow(35), rent: 2450, renewalStatus: 'Offer Sent' },
];

export const vacantUnits = [
  { id: 1, unit: '1100 Congress Ave, Unit 8C', city: 'Austin, TX', daysVacant: 45, askingRent: 1750, applications: 0, listed: true },
  { id: 2, unit: '560 Lamar Blvd #204', city: 'Austin, TX', daysVacant: 38, askingRent: 2200, applications: 0, listed: true },
  { id: 3, unit: '3421 Guadalupe St, Apt 1', city: 'Austin, TX', daysVacant: 32, askingRent: 1450, applications: 2, listed: true },
  { id: 4, unit: '890 S 1st St, Unit B', city: 'Austin, TX', daysVacant: 21, askingRent: 1900, applications: 1, listed: true },
  { id: 5, unit: '2750 E Riverside Dr #312', city: 'Austin, TX', daysVacant: 12, askingRent: 1350, applications: 3, listed: true },
];

export const allProperties = [
  { id: 1, address: '4521 Elm Street', city: 'Austin', state: 'TX', zip: '78701', units: 12, occupied: 11, type: 'Multi-Family', owner: 'Robert Chen', status: 'Active', monthlyRevenue: 19800 },
  { id: 2, address: '892 Oak Avenue', city: 'Austin', state: 'TX', zip: '78702', units: 24, occupied: 22, type: 'Multi-Family', owner: 'Linda Marsh', status: 'Active', monthlyRevenue: 46200 },
  { id: 3, address: '1205 Pine Road', city: 'Round Rock', state: 'TX', zip: '78664', units: 8, occupied: 8, type: 'Multi-Family', owner: 'Robert Chen', status: 'Active', monthlyRevenue: 11600 },
  { id: 4, address: '3340 Birch Lane', city: 'Cedar Park', state: 'TX', zip: '78613', units: 16, occupied: 15, type: 'Multi-Family', owner: 'Vista Properties LLC', status: 'Active', monthlyRevenue: 28800 },
  { id: 5, address: '750 Maple Drive', city: 'Pflugerville', state: 'TX', zip: '78660', units: 6, occupied: 5, type: 'Multi-Family', owner: 'Sarah Jennings', status: 'Active', monthlyRevenue: 7500 },
  { id: 6, address: '2210 Cedar Street', city: 'Austin', state: 'TX', zip: '78703', units: 18, occupied: 17, type: 'Multi-Family', owner: 'Linda Marsh', status: 'Active', monthlyRevenue: 40500 },
  { id: 7, address: '1100 Congress Avenue', city: 'Austin', state: 'TX', zip: '78701', units: 32, occupied: 29, type: 'Multi-Family', owner: 'Capital Realty Group', status: 'Active', monthlyRevenue: 55100 },
  { id: 8, address: '560 Lamar Boulevard', city: 'Austin', state: 'TX', zip: '78704', units: 20, occupied: 18, type: 'Multi-Family', owner: 'Capital Realty Group', status: 'Active', monthlyRevenue: 39600 },
  { id: 9, address: '3421 Guadalupe Street', city: 'Austin', state: 'TX', zip: '78705', units: 4, occupied: 3, type: 'Multi-Family', owner: 'Mark Rivera', status: 'Active', monthlyRevenue: 4350 },
  { id: 10, address: '890 S 1st Street', city: 'Austin', state: 'TX', zip: '78704', units: 10, occupied: 9, type: 'Multi-Family', owner: 'Sarah Jennings', status: 'Active', monthlyRevenue: 17100 },
  { id: 11, address: '2750 E Riverside Drive', city: 'Austin', state: 'TX', zip: '78741', units: 48, occupied: 45, type: 'Multi-Family', owner: 'Riverside Investments', status: 'Active', monthlyRevenue: 64800 },
  { id: 12, address: '415 W 6th Street', city: 'Austin', state: 'TX', zip: '78701', units: 1, occupied: 1, type: 'Single-Family', owner: 'Robert Chen', status: 'Active', monthlyRevenue: 3200 },
  { id: 13, address: '8820 Research Blvd', city: 'Austin', state: 'TX', zip: '78758', units: 36, occupied: 33, type: 'Multi-Family', owner: 'Vista Properties LLC', status: 'Active', monthlyRevenue: 52800 },
  { id: 14, address: '1602 Barton Springs Rd', city: 'Austin', state: 'TX', zip: '78704', units: 1, occupied: 0, type: 'Single-Family', owner: 'Mark Rivera', status: 'Inactive', monthlyRevenue: 0 },
  { id: 15, address: '5509 N IH-35', city: 'Round Rock', state: 'TX', zip: '78681', units: 12, occupied: 11, type: 'Multi-Family', owner: 'Vista Properties LLC', status: 'Active', monthlyRevenue: 16500 },
];
