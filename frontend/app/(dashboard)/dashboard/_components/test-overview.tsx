"use client"
import { useEffect, useState } from "react";
import { ValidaitorTest } from "@/types/validaitorTests";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, LabelList,  Tooltip, XAxis, YAxis } from "recharts"
import Typography from "@mui/material/Typography";
import { TestCategories } from "@/enum/test";

interface Props {
  data: ValidaitorTest[] ;
}

export function BarChartBox({ data: propData }: Props) {

  const [categoryCounts, setCategoryCounts] = useState<{ [key: string]: number }>({});

  useEffect(() => {

    const defaultCategories: TestCategories[] = [
      ...Object.values(TestCategories),
    ];

    const counts = propData.reduce((acc, item) => {
      const category = item.category;

      if (!acc[category]) {
        acc[category] = 0;
      }
      acc[category] += 1;
      return acc;
    }, {} as { [key: string]: number });

    defaultCategories.forEach(category => {
      if (!counts[category]) {
        counts[category] = 0;
      }
    });

    setCategoryCounts(counts);
  }, [propData]);

  const chartData = Object.keys(categoryCounts).map((category) => ({
    name: category,
    count: categoryCounts[category],
  }));

  if (chartData.length === 0) {
    return (
    <div className="flex justify-center" style={{ marginTop: '33%' }}>
      <div className="flex flex-col">
        <Typography color="text.secondary" variant="h6">
        No Test configured yet.
        </Typography >
      </div>
    </div>);

  }
  return (
    <div className="mb-3">
     {chartData.every(item => item.count === 0) ?  (
    <ResponsiveContainer width="100%" height={280}>
      <div className="flex flex-col relative w-full p-20 text-center">
        <Typography color="text.secondary" variant="h6">
        No data found.
        </Typography >
      </div>
  </ResponsiveContainer>
      ) : (
<ResponsiveContainer width="100%" height={280}>
<BarChart data={chartData}
          margin={{
            top: 10,
            right: 60,
            left: 30,
            bottom: 10,
          }}>
  <CartesianGrid stroke="#eee" />
  <XAxis
    dataKey="name"
    stroke="#4E9BD3"
    fontSize={12}
    tickLine={false}
    axisLine={false}
    angle={-15}
    textAnchor="end"
    dx={20}

  /><LabelList dataKey="name" position="bottom" style={{ fontSize: '14px' }} />
  <YAxis
    stroke="#4E9BD3"
    fontSize={12}
    tickLine={true}
    axisLine={true}
    tickFormatter={(value) => `${value} ${value === 1 ? 'Test' : 'Tests'}`}
    tickCount={1}

  />
  <Tooltip />
  <Bar dataKey="count" fill="#4E9BD3" radius={[4, 4, 0, 0]} background={{ fill: '#fafafa' }} > </Bar>
</BarChart>
</ResponsiveContainer>
     )}
    </div>
  )
}
