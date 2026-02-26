import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { unitsByMonth } from "../../data/properties";

const COLORS = {
  occupied: "#1473CC",
  vacant: "#db0001",
  maintenance: "#FFA100",
};

export default function UnitsByMonth() {
  return (
    <ResponsiveContainer width="100%" height="100%" minHeight={260}>
      <BarChart
        data={unitsByMonth}
        margin={{ top: 4, right: 12, left: -8, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis
          dataKey="month"
          tick={{ fontSize: 12 }}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          tick={{ fontSize: 12 }}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip
          contentStyle={{
            borderRadius: 8,
            border: "1px solid #e5e7eb",
            fontSize: 13,
          }}
        />
        <Legend
          verticalAlign="bottom"
          iconType="circle"
          iconSize={8}
          wrapperStyle={{ fontSize: 12, paddingTop: 8 }}
        />
        <Bar
          dataKey="occupied"
          name="Occupied"
          stackId="a"
          fill={COLORS.occupied}
          radius={[0, 0, 0, 0]}
        />
        <Bar
          dataKey="vacant"
          name="Vacant"
          stackId="a"
          fill={COLORS.vacant}
          radius={[0, 0, 0, 0]}
        />
        <Bar
          dataKey="maintenance"
          name="Maintenance"
          stackId="a"
          fill={COLORS.maintenance}
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
