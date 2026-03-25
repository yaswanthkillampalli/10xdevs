"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FolderGit2, BookOpenText, Award, Trophy, Loader2 } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import StatCard from "@/components/home/StatCard";

interface HomeData {
  user: { name: string; avatarUrl?: string; role: string; };
  stats: { projects: number; academicWorks: number; certifications: number; achievements: number; };
}

export default function HomePage() {
  const router = useRouter();
  const [data, setData] = useState<HomeData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const res = await fetch("/api/home");
        if (!res.ok) {
          router.push("/login");
          return;
        }
        setData(await res.json());
      } catch (error) {
        console.error("Failed to fetch home data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHomeData();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      
      {/* 1. Injected Navbar Component */}
      <Navbar user={data.user} />

      <main className="max-w-7xl mx-auto px-6 py-10">
        
        {/* 2. Greeting */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {data.user.name.split(" ")[0]}! 👋
          </h1>
          <p className="text-gray-500 mt-2">Here is a quick overview of your academic profile.</p>
        </div>

        {/* 3. Injected Bento Grid Components */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            title="Active Projects" value={data.stats.projects} 
            icon={<FolderGit2 className="h-6 w-6" />} 
            iconBgColor="bg-blue-50" iconTextColor="text-blue-600" 
          />
          <StatCard 
            title="Publications & R&D" value={data.stats.academicWorks} 
            icon={<BookOpenText className="h-6 w-6" />} 
            iconBgColor="bg-purple-50" iconTextColor="text-purple-600" 
          />
          <StatCard 
            title="Verified Certifications" value={data.stats.certifications} 
            icon={<Award className="h-6 w-6" />} 
            iconBgColor="bg-emerald-50" iconTextColor="text-emerald-600" 
          />
          <StatCard 
            title="Awards & Hackathons" value={data.stats.achievements} 
            icon={<Trophy className="h-6 w-6" />} 
            iconBgColor="bg-orange-50" iconTextColor="text-orange-600" 
          />
        </div>

      </main>
    </div>
  );
}