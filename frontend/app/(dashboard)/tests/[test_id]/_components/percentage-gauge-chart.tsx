import React from "react";
import { Cell, PieChart, Pie, ResponsiveContainer, Text } from "recharts";

interface Props {
  percentage: number;
}

const GaugeChart = (
  { percentage }: Props,
  { className }: { className?: string }
) => {
  const data = [
    { value: 100 - percentage, fill: "#2CDA9D" },
    { value: percentage, fill: "#931F1D" },
  ];
  console.log("percentage", percentage);

  console.log("data", data);

  return (
    <ResponsiveContainer height={120} width="100%">
      <PieChart>
        <Pie
          data={data}
          startAngle={180}
          endAngle={0}
          innerRadius={40}
          outerRadius={60}
          dataKey="value"
        ></Pie>
        <text
          x="50%"
          y="40%"
          textAnchor="middle"
          dominantBaseline="middle"
          className="percentage text-xl font-bold"
        >
          {100 - Math.round(percentage)}
        </text>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default GaugeChart;
