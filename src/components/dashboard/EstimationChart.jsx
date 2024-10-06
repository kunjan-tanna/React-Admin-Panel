import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

function EstimationChart({ estimations }) {
  const data = [
    {
      name: "Active",
      value: estimations.filter((est) => est.status === "Active").length || 10,
    },
    {
      name: "Inactive",
      value:
        estimations.filter((est) => est.status === "Inactive").length || 20,
    },
    {
      name: "Pending",
      value: estimations.filter((est) => est.status === "Pending").length || 40,
    },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#8884d8"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}

export default EstimationChart;
