import {
  Building2,
  AlertTriangle,
  Clock,
  Plus,
  Megaphone,
  ClipboardCheck,
  FileBarChart,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
} from "lucide-react";
import { properties, units, propertyStats } from "../../data/properties";
import { leases } from "../../data/leasing";
import { Card, CardHeader, CardContent } from "../../components/ui/Card";
import { StatCard } from "../../components/ui/StatCard";
import { DataTable, type Column } from "../../components/ui/DataTable";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";

/* ------------------------------------------------------------------ */
/*  Currency formatter                                                  */
/* ------------------------------------------------------------------ */

const fmt = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
});

/* ------------------------------------------------------------------ */
/*  Derived data                                                        */
/* ------------------------------------------------------------------ */

const TODAY = new Date("2026-02-26T00:00:00");

const vacantUnits = units
  .filter((u) => u.status === "vacant")
  .map((u) => {
    const prop = properties.find((p) => p.id === u.propertyId);
    // Simulate days vacant for each unit
    const daysVacantMap: Record<number, number> = {
      7: 42,   // Oakwood 203
      29: 35,  // Magnolia 3
      33: 28,  // Elm TH-3
    };
    return {
      id: u.id,
      unitNumber: u.unitNumber,
      propertyName: prop?.name ?? "Unknown",
      daysVacant: daysVacantMap[u.id] ?? 14,
      lastTenant: "Previous Tenant",
      rent: u.rent,
    };
  })
  .sort((a, b) => b.daysVacant - a.daysVacant);

const maintenanceUnits = units
  .filter((u) => u.status === "maintenance")
  .map((u) => {
    const prop = properties.find((p) => p.id === u.propertyId);
    return {
      id: u.id,
      unitNumber: u.unitNumber,
      propertyName: prop?.name ?? "Unknown",
    };
  });

const expiringIn30 = leases.filter((l) => {
  const end = new Date(l.endDate + "T00:00:00");
  const diffDays = Math.floor(
    (end.getTime() - TODAY.getTime()) / (1000 * 60 * 60 * 24)
  );
  return diffDays >= 0 && diffDays <= 30;
});

const upcomingMoveIns = [
  { tenant: "Marcus Wells", property: "Oakwood Apartments", unit: "203", date: "Mar 5, 2026" },
  { tenant: "Ava Richardson", property: "Magnolia Place", unit: "3", date: "Mar 10, 2026" },
  { tenant: "Darnell Brooks", property: "Elm Street Townhomes", unit: "TH-3", date: "Mar 15, 2026" },
];

const unitsInMaintenance = maintenanceUnits.length;

/* ------------------------------------------------------------------ */
/*  Needs Attention alerts                                              */
/* ------------------------------------------------------------------ */

interface AttentionAlert {
  id: string;
  severity: "error" | "warning";
  title: string;
  description: string;
  cta: string;
}

const vacantOver30 = vacantUnits.filter((u) => u.daysVacant >= 30);

const attentionAlerts: AttentionAlert[] = [
  ...(vacantOver30.length > 0
    ? [
        {
          id: "vacant-30",
          severity: "error" as const,
          title: `${vacantOver30.length} unit${vacantOver30.length > 1 ? "s" : ""} vacant for 30+ days`,
          description: `${vacantOver30.map((u) => `${u.propertyName} #${u.unitNumber}`).join(", ")} — losing ${fmt.format(vacantOver30.reduce((s, u) => s + u.rent, 0))}/mo in potential rent`,
          cta: "List on Marketplace",
        },
      ]
    : []),
  ...(maintenanceUnits.length > 0
    ? [
        {
          id: "maint-inspect",
          severity: "warning" as const,
          title: `${maintenanceUnits.length} unit${maintenanceUnits.length > 1 ? "s" : ""} need maintenance inspection before move-in`,
          description: `${maintenanceUnits.map((u) => `${u.propertyName} #${u.unitNumber}`).join(", ")} — complete inspections to unlock listings`,
          cta: "Schedule Inspections",
        },
      ]
    : []),
  ...(expiringIn30.length > 0
    ? [
        {
          id: "lease-expiring",
          severity: "warning" as const,
          title: `${expiringIn30.length} lease${expiringIn30.length > 1 ? "s" : ""} expiring in 30 days with no renewal started`,
          description: `Tenants: ${expiringIn30.map((l) => l.tenantName).join(", ")} — start renewal conversations to avoid vacancy`,
          cta: "Start Renewals",
        },
      ]
    : []),
];

/* ------------------------------------------------------------------ */
/*  Vacant Units table columns                                          */
/* ------------------------------------------------------------------ */

type VacantRow = (typeof vacantUnits)[number];

const vacantColumns: Column<VacantRow>[] = [
  {
    key: "unitNumber",
    header: "Unit",
    render: (row) => (
      <span className="font-medium text-rv-black">#{row.unitNumber}</span>
    ),
  },
  {
    key: "propertyName",
    header: "Property",
  },
  {
    key: "daysVacant",
    header: "Days Vacant",
    align: "center",
    render: (row) => (
      <Badge
        variant={row.daysVacant >= 30 ? "error" : row.daysVacant >= 14 ? "warning" : "default"}
        hideDot
      >
        {row.daysVacant}d
      </Badge>
    ),
  },
  {
    key: "lastTenant",
    header: "Last Tenant",
    render: () => (
      <span className="text-sm text-rv-gray">Previous Tenant</span>
    ),
  },
  {
    key: "rent",
    header: "Rent",
    align: "right",
    render: (row) => (
      <span className="font-medium text-rv-black">{fmt.format(row.rent)}</span>
    ),
  },
];

/* ------------------------------------------------------------------ */
/*  Page component                                                      */
/* ------------------------------------------------------------------ */

export default function PropertiesPage() {
  const hasAlerts = attentionAlerts.length > 0;

  return (
    <div className="space-y-6">
      {/* ---- Header ---- */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-rv-blue-light">
            <Building2 className="h-5 w-5 text-rv-blue" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-rv-blue-dark leading-tight">
              Properties
            </h1>
            <p className="text-sm text-rv-gray">
              What needs your attention today
            </p>
          </div>
        </div>
      </div>

      {/* ---- Summary bar ---- */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <StatCard
          label="Total Properties"
          value={propertyStats.totalProperties}
          className="border border-rv-lightgray"
        />
        <StatCard
          label="Total Units"
          value={propertyStats.totalUnits}
          className="border border-rv-lightgray"
        />
        <StatCard
          label="Occupancy Rate"
          value={`${propertyStats.occupancyRate}%`}
          trend={{ direction: "up", value: "+1.2% vs last month" }}
          className="border border-rv-lightgray"
        />
        <StatCard
          label="Monthly Revenue"
          value={fmt.format(propertyStats.totalMonthlyRevenue)}
          trend={{ direction: "up", value: "+3.5% vs last month" }}
          className="border border-rv-lightgray"
        />
        <StatCard
          label="Vacant Units"
          value={propertyStats.totalVacant}
          className="border border-rv-lightgray"
        />
        <StatCard
          label="In Maintenance"
          value={unitsInMaintenance}
          className="border border-rv-lightgray"
        />
      </div>

      {/* ---- Needs Attention ---- */}
      {hasAlerts ? (
        <div>
          <h2 className="text-lg font-semibold text-rv-black mb-3 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-rv-red" />
            Needs Attention
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {attentionAlerts.map((alert) => (
              <Card
                key={alert.id}
                className={`border-l-4 ${
                  alert.severity === "error"
                    ? "border-l-rv-red"
                    : "border-l-amber-500"
                }`}
              >
                <CardContent className="flex items-start gap-3">
                  <div
                    className={`mt-0.5 shrink-0 ${
                      alert.severity === "error"
                        ? "text-rv-red"
                        : "text-amber-500"
                    }`}
                  >
                    {alert.severity === "error" ? (
                      <AlertTriangle className="h-5 w-5" />
                    ) : (
                      <Clock className="h-5 w-5" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold text-rv-black text-sm">
                          {alert.title}
                        </p>
                        <p className="text-xs text-rv-gray mt-0.5 leading-relaxed">
                          {alert.description}
                        </p>
                      </div>
                      <Button size="sm" variant={alert.severity === "error" ? "primary" : "secondary"} className="shrink-0">
                        {alert.cta}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        <Card className="border-l-4 border-l-rv-green">
          <CardContent className="flex items-center gap-3 py-6">
            <CheckCircle2 className="h-8 w-8 text-rv-green" />
            <div>
              <p className="font-semibold text-rv-black text-lg">
                All caught up!
              </p>
              <p className="text-sm text-rv-gray">
                No properties require your immediate attention. Great work keeping things running smoothly.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* ---- Data slices ---- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Vacant Units table */}
        <Card>
          <CardHeader
            title="Vacant Units"
            action={
              <button className="inline-flex items-center gap-1 text-sm text-rv-blue hover:text-rv-blue-dark font-medium transition-colors">
                View all <ArrowRight className="h-3.5 w-3.5" />
              </button>
            }
          />
          <CardContent>
            <DataTable
              columns={vacantColumns}
              data={vacantUnits.slice(0, 5)}
              emptyMessage="No vacant units"
            />
          </CardContent>
        </Card>

        {/* Upcoming Move-Ins */}
        <Card>
          <CardHeader
            title="Upcoming Move-Ins"
            action={
              <button className="inline-flex items-center gap-1 text-sm text-rv-blue hover:text-rv-blue-dark font-medium transition-colors">
                View all <ArrowRight className="h-3.5 w-3.5" />
              </button>
            }
          />
          <CardContent>
            <ul className="divide-y divide-rv-lightgray">
              {upcomingMoveIns.map((item, i) => (
                <li
                  key={i}
                  className="flex items-center justify-between py-3 first:pt-0 last:pb-0"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-rv-green-light text-rv-green">
                      <CalendarDays className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-rv-black">
                        {item.tenant}
                      </p>
                      <p className="text-xs text-rv-gray">
                        {item.property} #{item.unit}
                      </p>
                    </div>
                  </div>
                  <Badge variant="info" hideDot>
                    {item.date}
                  </Badge>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* ---- Quick Actions ---- */}
      <div>
        <h2 className="text-sm font-medium text-rv-gray mb-2 uppercase tracking-wide">
          Quick Actions
        </h2>
        <div className="flex flex-wrap gap-3">
          <Button variant="secondary" size="sm" icon={<Plus />}>
            Add Property
          </Button>
          <Button variant="secondary" size="sm" icon={<Megaphone />}>
            Create Listing
          </Button>
          <Button variant="secondary" size="sm" icon={<ClipboardCheck />}>
            Schedule Inspection
          </Button>
          <Button variant="secondary" size="sm" icon={<FileBarChart />}>
            Generate Report
          </Button>
        </div>
      </div>
    </div>
  );
}
