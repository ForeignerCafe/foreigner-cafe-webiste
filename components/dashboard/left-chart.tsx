"use client";

import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";
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
  { month: "Jan", blogs: 17, views: 75 },
  { month: "Feb", blogs: 12, views: 85 },
  { month: "Mar", blogs: 14, views: 92 },
  { month: "Apr", blogs: 18, views: 68 },
  { month: "May", blogs: 16, views: 103 },
  { month: "Jun", blogs: 20, views: 89 },
  { month: "Jul", blogs: 15, views: 97 },
];

const chartConfig = {
  views: {
    label: "Views (k)",
    color: "hsl(174 74% 41%)", // A teal color
  },
  blogs: {
    label: "Blogs",
    color: "hsl(30 98% 50%)", // An orange color
  },
} satisfies ChartConfig;

// Custom tooltip content
const CustomTooltipContent = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg">
        <p className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-1">{`${label}`}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.dataKey === "blogs"
              ? `Blogs: ${entry.value}`
              : `Views: ${entry.value}k`}
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
        <div className="min-w-[400px] sm:min-w-full">
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={chartData}
                margin={{ left: 20, right: 30, top: 20, bottom: 5 }}
                barCategoryGap="20%"
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#E5E7EB"
                  strokeOpacity={0.3}
                  className="dark:stroke-gray-600"
                />
                <XAxis
                  dataKey="month"
                  tick={{ fill: "#6B7280", fontSize: 12 }}
                  tickLine={false}
                  axisLine={{
                    stroke: "#E5E7EB",
                    className: "dark:stroke-gray-600",
                  }}
                />
                {/* Left Y-axis for Blogs */}
                <YAxis
                  yAxisId="blogs"
                  orientation="left"
                  tick={{ fill: "#6B7280", fontSize: 11 }}
                  tickLine={false}
                  axisLine={false}
                  domain={[0, 25]}
                  label={{
                    value: "Blogs",
                    angle: -90,
                    position: "insideLeft",
                    style: {
                      textAnchor: "middle",
                      fill: "#6B7280",
                      fontSize: "12px",
                    },
                  }}
                />
                {/* Right Y-axis for Views */}
                <YAxis
                  yAxisId="views"
                  orientation="right"
                  tick={{ fill: "#6B7280", fontSize: 11 }}
                  tickLine={false}
                  axisLine={false}
                  domain={[0, 120]}
                  tickFormatter={(value) => `${value}k`}
                  label={{
                    value: "Views (k)",
                    angle: 90,
                    position: "insideRight",
                    style: {
                      textAnchor: "middle",
                      fill: "#6B7280",
                      fontSize: "12px",
                    },
                  }}
                />
                <ChartTooltip
                  content={<CustomTooltipContent />}
                  cursor={{ fill: "rgba(0,0,0,0.1)" }}
                />
                <Bar
                  yAxisId="blogs"
                  dataKey="blogs"
                  fill="var(--color-blogs)"
                  radius={[2, 2, 0, 0]}
                  maxBarSize={30}
                />
                <Bar
                  yAxisId="views"
                  dataKey="views"
                  fill="var(--color-views)"
                  radius={[2, 2, 0, 0]}
                  maxBarSize={30}
                />
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  wrapperStyle={{ paddingTop: "20px" }}
                  formatter={(value) => (
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {value === "views" ? "Views (k)" : "Blogs"}
                    </span>
                  )}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}
