// Properties and Units mock data for Rentvine dashboard prototype
// All data is realistic US property management data as of Feb 26, 2026

export interface Property {
  id: number;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  totalUnits: number;
  occupiedUnits: number;
  monthlyRevenue: number;
  type: "residential" | "commercial";
}

export interface Unit {
  id: number;
  propertyId: number;
  unitNumber: string;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  rent: number;
  status: "occupied" | "vacant" | "maintenance";
  tenantName: string | null;
  leaseEnd: string | null;
}

export const properties: Property[] = [
  {
    id: 1,
    name: "Oakwood Apartments",
    address: "1420 Oak Street",
    city: "Austin",
    state: "TX",
    zip: "78701",
    totalUnits: 12,
    occupiedUnits: 11,
    monthlyRevenue: 18500,
    type: "residential",
  },
  {
    id: 2,
    name: "Riverside Commons",
    address: "3200 River Road",
    city: "Nashville",
    state: "TN",
    zip: "37214",
    totalUnits: 8,
    occupiedUnits: 7,
    monthlyRevenue: 12600,
    type: "residential",
  },
  {
    id: 3,
    name: "Summit View Condos",
    address: "850 Mountain Drive",
    city: "Denver",
    state: "CO",
    zip: "80202",
    totalUnits: 6,
    occupiedUnits: 6,
    monthlyRevenue: 13200,
    type: "residential",
  },
  {
    id: 4,
    name: "Magnolia Place",
    address: "2715 Magnolia Boulevard",
    city: "Charleston",
    state: "SC",
    zip: "29403",
    totalUnits: 4,
    occupiedUnits: 3,
    monthlyRevenue: 5400,
    type: "residential",
  },
  {
    id: 5,
    name: "Harbor Point Office Park",
    address: "500 Harbor Boulevard",
    city: "Tampa",
    state: "FL",
    zip: "33602",
    totalUnits: 5,
    occupiedUnits: 4,
    monthlyRevenue: 22000,
    type: "commercial",
  },
  {
    id: 6,
    name: "Elm Street Townhomes",
    address: "1100 Elm Street",
    city: "Raleigh",
    state: "NC",
    zip: "27601",
    totalUnits: 6,
    occupiedUnits: 5,
    monthlyRevenue: 10500,
    type: "residential",
  },
  {
    id: 7,
    name: "Peachtree Lofts",
    address: "445 Peachtree Street NE",
    city: "Atlanta",
    state: "GA",
    zip: "30308",
    totalUnits: 10,
    occupiedUnits: 9,
    monthlyRevenue: 19800,
    type: "residential",
  },
  {
    id: 8,
    name: "Maple Ridge Duplexes",
    address: "2300 Maple Avenue",
    city: "Kansas City",
    state: "MO",
    zip: "64108",
    totalUnits: 4,
    occupiedUnits: 4,
    monthlyRevenue: 5200,
    type: "residential",
  },
  {
    id: 9,
    name: "Downtown Commerce Center",
    address: "100 Main Street",
    city: "Phoenix",
    state: "AZ",
    zip: "85004",
    totalUnits: 8,
    occupiedUnits: 6,
    monthlyRevenue: 28800,
    type: "commercial",
  },
  {
    id: 10,
    name: "Willow Creek Apartments",
    address: "4500 Willow Creek Parkway",
    city: "Orlando",
    state: "FL",
    zip: "32801",
    totalUnits: 16,
    occupiedUnits: 14,
    monthlyRevenue: 22400,
    type: "residential",
  },
  {
    id: 11,
    name: "Cedar Park Homes",
    address: "780 Cedar Lane",
    city: "San Antonio",
    state: "TX",
    zip: "78205",
    totalUnits: 3,
    occupiedUnits: 3,
    monthlyRevenue: 5100,
    type: "residential",
  },
  {
    id: 12,
    name: "Lakeside Retail Plaza",
    address: "1900 Lakeshore Drive",
    city: "Chicago",
    state: "IL",
    zip: "60614",
    totalUnits: 6,
    occupiedUnits: 5,
    monthlyRevenue: 31500,
    type: "commercial",
  },
  {
    id: 13,
    name: "Birchwood Village",
    address: "620 Birchwood Court",
    city: "Portland",
    state: "OR",
    zip: "97205",
    totalUnits: 8,
    occupiedUnits: 7,
    monthlyRevenue: 14700,
    type: "residential",
  },
  {
    id: 14,
    name: "Pinecrest Apartments",
    address: "3050 Pine Street",
    city: "Charlotte",
    state: "NC",
    zip: "28202",
    totalUnits: 10,
    occupiedUnits: 8,
    monthlyRevenue: 14400,
    type: "residential",
  },
  {
    id: 15,
    name: "Sunset Professional Suites",
    address: "2200 Sunset Boulevard",
    city: "Las Vegas",
    state: "NV",
    zip: "89101",
    totalUnits: 4,
    occupiedUnits: 3,
    monthlyRevenue: 15600,
    type: "commercial",
  },
];

export const units: Unit[] = [
  // Oakwood Apartments (property 1) - 12 units, 11 occupied
  { id: 1, propertyId: 1, unitNumber: "101", bedrooms: 1, bathrooms: 1, sqft: 650, rent: 1350, status: "occupied", tenantName: "Sarah Mitchell", leaseEnd: "2026-08-31" },
  { id: 2, propertyId: 1, unitNumber: "102", bedrooms: 2, bathrooms: 1, sqft: 850, rent: 1650, status: "occupied", tenantName: "James Rodriguez", leaseEnd: "2026-11-30" },
  { id: 3, propertyId: 1, unitNumber: "103", bedrooms: 1, bathrooms: 1, sqft: 650, rent: 1350, status: "occupied", tenantName: "Emily Chen", leaseEnd: "2026-05-31" },
  { id: 4, propertyId: 1, unitNumber: "104", bedrooms: 2, bathrooms: 2, sqft: 950, rent: 1800, status: "occupied", tenantName: "David Washington", leaseEnd: "2027-01-31" },
  { id: 5, propertyId: 1, unitNumber: "201", bedrooms: 1, bathrooms: 1, sqft: 650, rent: 1400, status: "occupied", tenantName: "Lisa Patel", leaseEnd: "2026-07-31" },
  { id: 6, propertyId: 1, unitNumber: "202", bedrooms: 2, bathrooms: 1, sqft: 850, rent: 1700, status: "occupied", tenantName: "Michael Thompson", leaseEnd: "2026-09-30" },
  { id: 7, propertyId: 1, unitNumber: "203", bedrooms: 1, bathrooms: 1, sqft: 650, rent: 1350, status: "vacant", tenantName: null, leaseEnd: null },
  { id: 8, propertyId: 1, unitNumber: "204", bedrooms: 2, bathrooms: 2, sqft: 950, rent: 1800, status: "occupied", tenantName: "Jennifer Kim", leaseEnd: "2026-12-31" },
  { id: 9, propertyId: 1, unitNumber: "301", bedrooms: 1, bathrooms: 1, sqft: 700, rent: 1450, status: "occupied", tenantName: "Robert Garcia", leaseEnd: "2026-06-30" },
  { id: 10, propertyId: 1, unitNumber: "302", bedrooms: 2, bathrooms: 1, sqft: 900, rent: 1750, status: "occupied", tenantName: "Amanda Foster", leaseEnd: "2026-10-31" },
  { id: 11, propertyId: 1, unitNumber: "303", bedrooms: 1, bathrooms: 1, sqft: 700, rent: 1450, status: "occupied", tenantName: "Chris Evans", leaseEnd: "2026-04-30" },
  { id: 12, propertyId: 1, unitNumber: "304", bedrooms: 3, bathrooms: 2, sqft: 1200, rent: 2150, status: "occupied", tenantName: "Patricia Nguyen", leaseEnd: "2027-02-28" },

  // Riverside Commons (property 2) - 8 units, 7 occupied
  { id: 13, propertyId: 2, unitNumber: "A1", bedrooms: 2, bathrooms: 1, sqft: 900, rent: 1650, status: "occupied", tenantName: "Marcus Johnson", leaseEnd: "2026-09-30" },
  { id: 14, propertyId: 2, unitNumber: "A2", bedrooms: 2, bathrooms: 2, sqft: 1050, rent: 1900, status: "occupied", tenantName: "Karen Williams", leaseEnd: "2026-06-30" },
  { id: 15, propertyId: 2, unitNumber: "A3", bedrooms: 1, bathrooms: 1, sqft: 700, rent: 1400, status: "occupied", tenantName: "Tyler Brooks", leaseEnd: "2026-12-31" },
  { id: 16, propertyId: 2, unitNumber: "A4", bedrooms: 3, bathrooms: 2, sqft: 1300, rent: 2200, status: "occupied", tenantName: "Nicole Stewart", leaseEnd: "2027-03-31" },
  { id: 17, propertyId: 2, unitNumber: "B1", bedrooms: 2, bathrooms: 1, sqft: 900, rent: 1650, status: "occupied", tenantName: "Brandon Lee", leaseEnd: "2026-08-31" },
  { id: 18, propertyId: 2, unitNumber: "B2", bedrooms: 2, bathrooms: 2, sqft: 1050, rent: 1900, status: "maintenance", tenantName: null, leaseEnd: null },
  { id: 19, propertyId: 2, unitNumber: "B3", bedrooms: 1, bathrooms: 1, sqft: 700, rent: 1400, status: "occupied", tenantName: "Rachel Martinez", leaseEnd: "2026-05-31" },
  { id: 20, propertyId: 2, unitNumber: "B4", bedrooms: 3, bathrooms: 2, sqft: 1300, rent: 2200, status: "occupied", tenantName: "Derek Clark", leaseEnd: "2026-10-31" },

  // Summit View Condos (property 3) - 6 units, all occupied
  { id: 21, propertyId: 3, unitNumber: "1A", bedrooms: 2, bathrooms: 2, sqft: 1100, rent: 2100, status: "occupied", tenantName: "Olivia Parker", leaseEnd: "2026-11-30" },
  { id: 22, propertyId: 3, unitNumber: "1B", bedrooms: 3, bathrooms: 2, sqft: 1400, rent: 2600, status: "occupied", tenantName: "Steven Wright", leaseEnd: "2026-07-31" },
  { id: 23, propertyId: 3, unitNumber: "2A", bedrooms: 2, bathrooms: 2, sqft: 1100, rent: 2100, status: "occupied", tenantName: "Hannah Murphy", leaseEnd: "2027-01-31" },
  { id: 24, propertyId: 3, unitNumber: "2B", bedrooms: 3, bathrooms: 2, sqft: 1400, rent: 2600, status: "occupied", tenantName: "Jason Turner", leaseEnd: "2026-04-15" },
  { id: 25, propertyId: 3, unitNumber: "3A", bedrooms: 2, bathrooms: 2, sqft: 1150, rent: 2150, status: "occupied", tenantName: "Megan Cooper", leaseEnd: "2026-09-30" },
  { id: 26, propertyId: 3, unitNumber: "3B", bedrooms: 3, bathrooms: 2, sqft: 1450, rent: 2650, status: "occupied", tenantName: "Andrew Campbell", leaseEnd: "2026-06-30" },

  // Magnolia Place (property 4) - 4 units, 3 occupied
  { id: 27, propertyId: 4, unitNumber: "1", bedrooms: 2, bathrooms: 1, sqft: 950, rent: 1800, status: "occupied", tenantName: "Tiffany Reed", leaseEnd: "2026-08-31" },
  { id: 28, propertyId: 4, unitNumber: "2", bedrooms: 2, bathrooms: 1, sqft: 950, rent: 1800, status: "occupied", tenantName: "Daniel Phillips", leaseEnd: "2026-03-31" },
  { id: 29, propertyId: 4, unitNumber: "3", bedrooms: 3, bathrooms: 2, sqft: 1250, rent: 2300, status: "vacant", tenantName: null, leaseEnd: null },
  { id: 30, propertyId: 4, unitNumber: "4", bedrooms: 2, bathrooms: 1, sqft: 950, rent: 1800, status: "occupied", tenantName: "Samantha Bailey", leaseEnd: "2026-12-31" },

  // Elm Street Townhomes (property 6) - selecting a few
  { id: 31, propertyId: 6, unitNumber: "TH-1", bedrooms: 3, bathrooms: 2.5, sqft: 1600, rent: 2200, status: "occupied", tenantName: "Christopher Hill", leaseEnd: "2026-10-31" },
  { id: 32, propertyId: 6, unitNumber: "TH-2", bedrooms: 3, bathrooms: 2.5, sqft: 1600, rent: 2200, status: "occupied", tenantName: "Ashley Collins", leaseEnd: "2026-07-31" },
  { id: 33, propertyId: 6, unitNumber: "TH-3", bedrooms: 2, bathrooms: 1.5, sqft: 1200, rent: 1750, status: "vacant", tenantName: null, leaseEnd: null },
  { id: 34, propertyId: 6, unitNumber: "TH-4", bedrooms: 3, bathrooms: 2.5, sqft: 1600, rent: 2200, status: "occupied", tenantName: "Brian Ramirez", leaseEnd: "2026-05-15" },

  // Peachtree Lofts (property 7)
  { id: 35, propertyId: 7, unitNumber: "L-201", bedrooms: 1, bathrooms: 1, sqft: 800, rent: 1950, status: "occupied", tenantName: "Katherine Morgan", leaseEnd: "2026-09-30" },
  { id: 36, propertyId: 7, unitNumber: "L-202", bedrooms: 2, bathrooms: 2, sqft: 1150, rent: 2450, status: "occupied", tenantName: "William Price", leaseEnd: "2026-06-30" },
  { id: 37, propertyId: 7, unitNumber: "L-301", bedrooms: 1, bathrooms: 1, sqft: 800, rent: 1950, status: "occupied", tenantName: "Diana Howard", leaseEnd: "2026-03-15" },

  // Willow Creek Apartments (property 10)
  { id: 38, propertyId: 10, unitNumber: "110", bedrooms: 2, bathrooms: 1, sqft: 875, rent: 1550, status: "occupied", tenantName: "Gregory Sanders", leaseEnd: "2026-11-30" },
  { id: 39, propertyId: 10, unitNumber: "215", bedrooms: 3, bathrooms: 2, sqft: 1200, rent: 1950, status: "occupied", tenantName: "Laura Bennett", leaseEnd: "2026-04-30" },
  { id: 40, propertyId: 10, unitNumber: "308", bedrooms: 1, bathrooms: 1, sqft: 625, rent: 1250, status: "maintenance", tenantName: null, leaseEnd: null },
];

// Derived statistics
export const propertyStats = {
  totalProperties: properties.length,
  totalUnits: properties.reduce((sum, p) => sum + p.totalUnits, 0),
  totalOccupied: properties.reduce((sum, p) => sum + p.occupiedUnits, 0),
  totalVacant: properties.reduce((sum, p) => sum + (p.totalUnits - p.occupiedUnits), 0),
  occupancyRate: Math.round(
    (properties.reduce((sum, p) => sum + p.occupiedUnits, 0) /
      properties.reduce((sum, p) => sum + p.totalUnits, 0)) *
      100
  ),
  totalMonthlyRevenue: properties.reduce((sum, p) => sum + p.monthlyRevenue, 0),
  residentialCount: properties.filter((p) => p.type === "residential").length,
  commercialCount: properties.filter((p) => p.type === "commercial").length,
};

export const unitsByMonth: { month: string; occupied: number; vacant: number; maintenance: number }[] = [
  { month: "Sep 2025", occupied: 92, vacant: 14, maintenance: 4 },
  { month: "Oct 2025", occupied: 94, vacant: 12, maintenance: 4 },
  { month: "Nov 2025", occupied: 93, vacant: 14, maintenance: 3 },
  { month: "Dec 2025", occupied: 91, vacant: 16, maintenance: 3 },
  { month: "Jan 2026", occupied: 95, vacant: 12, maintenance: 3 },
  { month: "Feb 2026", occupied: 96, vacant: 11, maintenance: 3 },
];

export const unitsByStatus: { status: string; count: number; color: string }[] = [
  { status: "Occupied", count: 96, color: "#22C55E" },
  { status: "Vacant", count: 11, color: "#EF4444" },
  { status: "Maintenance", count: 3, color: "#F59E0B" },
];
