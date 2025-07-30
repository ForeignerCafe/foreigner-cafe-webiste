"use client";

import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Legend } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface MonthlyBlogStatsChartProps {
  data?: Array<{
    month: string;
    blogs: number;
    views: number;
  }>;
}

const defaultChartData = [
  { month: "Mar", blogs: 12, views: 8000 },
  { month: "April", blogs: 10, views: 15000 },
  { month: "May", blogs: 14, views: 26000 },
  { month: "June", blogs: 18, views: 7000 },
  { month: "July", blogs: 10, views: 27000 },
];

const chartConfig = {
  views: {
    label: "Views",
    color: "hsl(174 74% 41%)", // A teal color matching the image
  },
  blogs: {
    label: "Blogs",
    color: "hsl(30 98% 50%)", // An orange color matching the image
  },
} satisfies ChartConfig;

// Helper function to format numbers with K suffix
const formatNumber = (value: number): string => {
  if (value >= 1000) {
    return `${(value / 1000).toFixed(value % 1000 === 0 ? 0 : 1)}k`;
  }
  return value.toString();
};

// Custom tooltip content to show formatted values
const CustomTooltipContent = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg">
        <p className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-1">{`Month: ${label}`}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {`${entry.dataKey === "views" ? "Views" : "Blogs"}: ${
              entry.dataKey === "views"
                ? formatNumber(entry.value)
                : entry.value
            }`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function MonthlyBlogStatsChart({
  data,
}: MonthlyBlogStatsChartProps) {
  const chartData = data && data.length > 0 ? data : defaultChartData;

  return (
    <Card
      className="bg-white dark:bg-[#28282B] text-gray-900 dark:text-gray-100 w-full max-w-full overflow-hidden rounded-lg border-0 shadow-sm"
      style={{ borderRadius: "8px" }}
    >
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-4 pt-4 sm:px-6 sm:pt-6">
        <CardTitle className="text-base font-medium">
          Monthly Blog Stats
        </CardTitle>
      </CardHeader>
      <CardContent className="px-2 sm:px-6 overflow-x-auto !scrollbar-none">
        <div className="min-w-[300px] sm:min-w-full">
          <ChartContainer config={chartConfig}>
            <BarChart
              width={500}
              height={200} // Adjusted height for better spacing
              data={chartData}
              layout="vertical"
              margin={{ left: -20, top: 0, bottom: 0 }}
              barSize={10} // Adjusted bar size
              barCategoryGap={10} // Adjusted gap between month categories
              barGap={2} // Small positive gap to prevent overlap between bars of the same category
            >
              <CartesianGrid
                horizontal
                vertical
                stroke="#E5E7EB"
                strokeDasharray="3 3"
                strokeOpacity={0.3}
                className="dark:stroke-gray-600 stroke-gray-400"
              />
              <YAxis
                dataKey="month"
                type="category"
                tick={{ fill: "#6B7280", fontSize: 12 }}
                tickLine={false}
                axisLine={false}
              />
              <XAxis
                type="number"
                domain={[0, 40000]}
                tickFormatter={(value) => formatNumber(value)}
                tick={{ fill: "#6B7280", fontSize: 12 }}
                className="dark:[&>g>text]:fill-gray-300"
                axisLine={{
                  stroke: "#E5E7EB",
                  className: "dark:stroke-gray-600",
                }}
                tickLine={{
                  stroke: "#E5E7EB",
                  className: "dark:stroke-gray-600",
                }}
              />
              <ChartTooltip cursor={false} content={<CustomTooltipContent />} />
              <Bar dataKey="blogs" fill="var(--color-blogs)" radius={5} />
              <Bar dataKey="views" fill="var(--color-views)" radius={5} />
              <Legend
                verticalAlign="bottom"
                align="center"
                height={36}
                wrapperStyle={{ paddingTop: 10 }}
                formatter={(value) => (
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {value}
                  </span>
                )}
              />
            </BarChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}
