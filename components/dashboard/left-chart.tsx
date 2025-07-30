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
} from "@/components/ui/chart";

interface MonthlyBlogStatsChartProps {
  data?: Array<{
    month: string;
    blogs: number;
    views: number;
  }>;
}

const defaultChartData = [
  { month: "Jan", blogs: 17, views: 750 },
  { month: "Feb", blogs: 12, views: 850 },
  { month: "Mar", blogs: 14, views: 920 },
  { month: "Apr", blogs: 18, views: 680 },
  { month: "May", blogs: 16, views: 1030 },
  { month: "Jun", blogs: 20, views: 890 },
  { month: "Jul", blogs: 15, views: 970 },
];

const chartConfig = {
  views: {
    label: "Views",
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
              : `Views: ${entry.value.toLocaleString()}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// Format large numbers for Y-axis labels
const formatYAxisLabel = (value: number) => {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  } else if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}k`;
  }
  return value.toString();
};

export default function MonthlyBlogStatsChart({
  data,
}: MonthlyBlogStatsChartProps) {
  const chartData = data && data.length > 0 ? data : defaultChartData;

  // Calculate dynamic domains based on data
  const maxViews = Math.max(...chartData.map((d) => d.views));
  const maxBlogs = Math.max(...chartData.map((d) => d.blogs));

  // Set domains with some padding
  const viewsDomain = [0, Math.max(maxViews * 1.1, 100)];
  const blogsDomain = [0, Math.max(maxBlogs * 1.2, 10)];

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
                  domain={blogsDomain}
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
                  domain={viewsDomain}
                  tickFormatter={formatYAxisLabel}
                  label={{
                    value: "Views",
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
                      {value === "views" ? "Views" : "Blogs"}
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
