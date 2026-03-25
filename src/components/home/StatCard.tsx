import { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: number;
  icon: ReactNode;
  iconBgColor: string;
  iconTextColor: string;
}

export default function StatCard({ title, value, icon, iconBgColor, iconTextColor }: StatCardProps) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all group cursor-pointer">
      <div className="flex justify-between items-start">
        <div className={`p-3 rounded-xl group-hover:scale-110 transition-transform ${iconBgColor} ${iconTextColor}`}>
          {icon}
        </div>
      </div>
      <div className="mt-6">
        <h3 className="text-4xl font-bold text-gray-900">{value}</h3>
        <p className="text-sm font-medium text-gray-500 mt-1">{title}</p>
      </div>
    </div>
  );
}