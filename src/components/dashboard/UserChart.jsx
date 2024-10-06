import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function UserChart({ users }) {
  console.log("users", users);
  const data = users.map((user, index) => ({
    name: `User ${index + 1}`,
    registrations: users.length,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="registrations" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default UserChart;
