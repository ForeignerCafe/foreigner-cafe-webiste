// @ts-nocheck
"use client";

import { useState } from "react";
import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
} from "recharts";
import { ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ChartEntry {
  name: string;
  value: number;
  color: string;
}

interface Props {
  chartData: ChartEntry[];
  showDropdown?: boolean;
  timeframes?: string[];
}

export default function RatioOfDevicesChart({
  chartData,
  showDropdown = false,
  timeframes = ["Today", "Last Week", "Last Month", "Last Quarter"],
}: Props) {
  const [timeframe, setTimeframe] = useState(timeframes[0]);

  return (
    <Card className="border-0 shadow-sm dark:bg-[#28282B] bg-white dark:text-white h-full" style={{borderRadius: "8px"}}>
      <CardHeader className="flex flex-row items-center justify-between pb-2 px-6 pt-6">
        <CardTitle className="text-base font-medium">Ratio of Devices</CardTitle>
        {showDropdown && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="h-8 gap-1 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:outline-none"
              >
                {timeframe}
                <ChevronDown className="h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {timeframes.map((item) => (
                <DropdownMenuItem key={item} onClick={() => setTimeframe(item)}>
                  {item}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </CardHeader>

      <CardContent className="px-6 pb-6 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:outline-none">
        <div className="w-full flex flex-col items-center sm:flex-row sm:justify-center gap-6 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:outline-none">
          {/* Chart */}
          <div className="w-full sm:w-[400px] h-[300px] focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:outline-none">
            <ResponsiveContainer width="100%" height="100%" className={"focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:outline-none"}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius="40%"
                  outerRadius="80%"
                  paddingAngle={0}
                  dataKey="value"
                  isAnimationActive={false}
                  startAngle={90}
                  endAngle={-270}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="flex flex-col gap-2 items-end sm:items-start">
            {chartData.map((entry, index) => (
              <div key={index} className="flex items-center gap-1">
                <div
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-xs">
                  {entry.name} {entry.value}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
