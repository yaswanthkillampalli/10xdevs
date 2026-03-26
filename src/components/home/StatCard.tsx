"use client";

import { ReactNode } from "react";
import CountUp from "react-countup";

interface StatCardProps {
  title: string;
  value: number;
  icon: ReactNode;
  iconBgColor: string;
  iconTextColor: string;
}

export default function StatCard({ title, value, icon, iconBgColor, iconTextColor }: StatCardProps) {
  return (
    <div className="relative bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer overflow-hidden">
      {/* Red accent bar slides in from left on hover */}
      <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-red-600 group-hover:w-full transition-all duration-500 ease-out rounded-b-2xl" />

      <div className="flex justify-between items-start">
        <div className={`p-3 rounded-xl group-hover:scale-110 transition-transform duration-300 ${iconBgColor} ${iconTextColor}`}>
          {icon}
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-4xl font-bold text-gray-900">
          <CountUp end={value} duration={2} useEasing />
        </h3>
        <p className="text-sm font-medium text-gray-500 mt-1">{title}</p>
      </div>
    </div>
  );
}