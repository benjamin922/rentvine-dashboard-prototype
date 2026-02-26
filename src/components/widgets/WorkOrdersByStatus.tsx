import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { workOrdersByStatus } from "../../data/maintenance";

export default function WorkOrdersByStatus() {
  return (
    <ResponsiveContainer width="100%" height="100%" minHeight={260}>
      <PieChart>
        <Pie
          data={workOrdersByStatus}
          cx="50%"
          cy="45%"
          innerRadius="45%"
          outerRadius="70%"
          dataKey="count"
          nameKey="status"
          paddingAngle={2}
          stroke="none"
        >
          {workOrdersByStatus.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          formatter={((value: number, name: string) => [`${value}`, name]) as any}
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
      </PieChart>
    </ResponsiveContainer>
  );
}
