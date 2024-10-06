import React from "react";
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

function ProjectChart({ projects }) {
  console.log("projects", projects);
  const data = projects.map((project) => ({
    name: project.projectName,
    totalTasks: project.length,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="totalTasks" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default ProjectChart;
