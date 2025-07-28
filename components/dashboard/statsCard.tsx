"use client";

import type { ReactNode } from "react";

interface StatsCardProps {
  icon: ReactNode;
  bgColor: string;
  value: string | number;
  label: string;
}

export default function StatsCard({
  icon,
  bgColor,
  value,
  label,
}: StatsCardProps) {
  return (
    <div className="bg-white dark:bg-[#28282B] rounded-lg p-4 shadow-sm" style={{borderRadius: "8px"}}>
      <div className={`w-10 h-10 flex items-center justify-center rounded ${bgColor} mb-4`} style={{borderRadius: "8px"}}>
        {icon}
      </div>
      <h2 className="text-3xl font-bold mb-1">{value}</h2>
      <p className="text-gray-500 dark:text-gray-400 text-sm">{label}</p>
    </div>
  );
}
