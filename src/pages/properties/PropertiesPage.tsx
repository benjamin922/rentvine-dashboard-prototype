import { Building2, Users, DollarSign, FileText, Key, Wrench } from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { properties, propertyStats, unitsByStatus } from "../../data/properties";
import { Card, CardHeader, CardContent } from "../../components/ui/Card";
import { StatCard } from "../../components/ui/StatCard";
import { DataTable, type Column } from "../../components/ui/DataTable";
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
/*  Recent activity items                                              */
/* ------------------------------------------------------------------ */

const recentActivity = [
  { icon: Key, text: "Lease signed at Oakwood Apt #102", time: "2 hours ago", color: "text-rv-green" },
  { icon: Wrench, text: "Work order created at Maple Ridge #A", time: "4 hours ago", color: "text-amber-500" },
  { icon: FileText, text: "Lease renewal sent for Summit View #2B", time: "6 hours ago", color: "text-rv-blue" },
  { icon: Users, text: "New tenant application at Pinecrest #205", time: "Yesterday", color: "text-purple-500" },
  { icon: DollarSign, text: "Rent collected at Peachtree Lofts #L-202", time: "Yesterday", color: "text-rv-green" },
];

/* ------------------------------------------------------------------ */
/*  Table columns                                                      */
/* ------------------------------------------------------------------ */

type PropertyRow = (typeof properties)[number];

const columns: Column<PropertyRow>[] = [
  {
    key: "name",
    header: "Name",
    render: (row) => (
      <span className="font-medium text-rv-blue">{row.name}</span>
    ),
  },
  {
    key: "address",
    header: "Address",
    render: (row) => `${row.address}, ${row.city}, ${row.state}`,
  },
  {
    key: "totalUnits",
    header: "Units",
    align: "center",
  },
  {
    key: "occupiedUnits",
    header: "Occupied",
    align: "center",
  },
  {
    key: "vacancyRate",
    header: "Vacancy",
    align: "center",
    render: (row) => {
      const rate = Math.round(
        ((row.totalUnits - row.occupiedUnits) / row.totalUnits) * 100
      );
      return (
        <span className={rate > 15 ? "text-rv-red font-medium" : "text-rv-black"}>
          {rate}%
        </span>
      );
    },
  },
  {
    key: "monthlyRevenue",
    header: "Monthly Revenue",
    align: "right",
    render: (row) => fmt.format(row.monthlyRevenue),
  },
];

/* ------------------------------------------------------------------ */
/*  Custom PieChart label                                              */
/* ------------------------------------------------------------------ */

const renderLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
}) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  if (percent < 0.04) return null;
  return (
    <text
      x={x}
      y={y}
      fill="#fff"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={12}
      fontWeight={600}
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

/* ------------------------------------------------------------------ */
/*  Page component                                                     */
/* ------------------------------------------------------------------ */

export default function PropertiesPage() {
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
              Overview of all managed properties
            </p>
          </div>
        </div>
        <Button icon={<Building2 />}>Add Property</Button>
      </div>

      {/* ---- Stats row ---- */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
      </div>

      {/* ---- Two-column layout ---- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Properties table */}
        <Card className="lg:col-span-8">
          <CardHeader title="All Properties" subtitle={`${propertyStats.totalProperties} properties managed`} />
          <CardContent>
            <DataTable
              columns={columns}
              data={properties}
            />
          </CardContent>
        </Card>

        {/* Right column */}
        <div className="lg:col-span-4 space-y-6">
          {/* Units by Status donut */}
          <Card>
            <CardHeader title="Units by Status" />
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={unitsByStatus}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={90}
                    paddingAngle={3}
                    dataKey="count"
                    nameKey="status"
                    labelLine={false}
                    label={renderLabel as any}
                  >
                    {unitsByStatus.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={((value: number, name: string) => [`${value} units`, name]) as any}
                    contentStyle={{
                      borderRadius: 8,
                      border: "1px solid #EAEAEA",
                      fontSize: 13,
                    }}
                  />
                  <Legend
                    verticalAlign="bottom"
                    iconType="circle"
                    iconSize={8}
                    formatter={((value: string) => (
                      <span className="text-xs text-rv-gray">{value}</span>
                    )) as any}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader title="Recent Activity" />
            <CardContent>
              <ul className="divide-y divide-rv-lightgray">
                {recentActivity.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 py-3 first:pt-0 last:pb-0">
                    <div className={`mt-0.5 shrink-0 ${item.color}`}>
                      <item.icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm text-rv-black leading-snug">
                        {item.text}
                      </p>
                      <p className="text-xs text-rv-gray mt-0.5">{item.time}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
