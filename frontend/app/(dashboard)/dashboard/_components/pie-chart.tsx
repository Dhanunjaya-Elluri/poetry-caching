"use client"

import { LLMApi } from "@/types/llmApi";
import { useEffect, useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import colors from 'tailwindcss/colors'

const tailwindColors = require('../../../../tailwind.config').theme.extend.colors;

interface Props {
  data: LLMApi[]  ;
}

export function PieChartBox({ data: propData }: Props) {
  const [providerCounts, setProviderCounts] = useState<{ [key: string]: number }>({});
  useEffect(() => {

    const counts = propData.reduce((acc, item) => {
      const category = item.provider_name;

      if (!acc[category]) {
        acc[category] = 0;
      }
      acc[category] += 1;
      return acc;
    }, {} as { [key: string]: number });


    setProviderCounts(counts);
  }, [propData]);

  const chartData = Object.keys(providerCounts).map((provider, index) => ({
    name: provider,
    value: providerCounts[provider],
    color: tailwindColors.validaitorBlueShades[(100*(index % 5))]
  }));



  return (
    <div className="mb-3">
      <div className="chart">
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Tooltip contentStyle={{ background: "white", borderRadius: "5px" }} />
            <Pie
              data={chartData}
              innerRadius={"50%"}
              outerRadius={"90%"}
              paddingAngle={1}
              dataKey="value"
            >
              {chartData.map((item) => (
                <Cell key={item.name} fill={item.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="grid grid-flow-col auto-cols-max justify-evenly">
        {chartData.map((item) => (
          <div key={item.name} className="flex items-center gap-1">
            <div className="w-4 h-3" style={{ backgroundColor: item.color }} />
            <span>{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
