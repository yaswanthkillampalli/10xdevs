"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FolderGit2, BookOpenText, Award, Trophy } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import StatCard from "@/components/home/StatCard";

interface HomeData {
  user: { name: string; avatarUrl?: string; role: string; };
  stats: { projects: number; academicWorks: number; certifications: number; achievements: number; };
}

function getGreeting(): { greeting: string; emoji: string } {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return { greeting: "Good morning", emoji: "☀️" };
  if (hour >= 12 && hour < 17) return { greeting: "Good afternoon", emoji: "👋" };
  if (hour >= 17 && hour < 21) return { greeting: "Good evening", emoji: "🌆" };
  return { greeting: "Good night", emoji: "🌙" };
}

function SkeletonCard() {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm animate-pulse">
      <div className="h-12 w-12 bg-gray-200 rounded-xl mb-6" />
      <div className="h-10 bg-gray-200 rounded-lg w-16 mb-2" />
      <div className="h-4 bg-gray-200 rounded-lg w-36" />
    </div>
  );
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
      <div className="min-h-screen bg-gray-50 font-sans">
        {/* Skeleton Navbar */}
        <div className="h-16 bg-white border-b border-gray-200 animate-pulse" />

        <main className="max-w-7xl mx-auto px-6 py-10">
          {/* Skeleton Greeting */}
          <div className="mb-10 animate-pulse">
            <div className="h-8 bg-gray-200 rounded-lg w-72 mb-3" />
            <div className="h-4 bg-gray-200 rounded-lg w-96" />
          </div>

          {/* Skeleton Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        </main>
      </div>
    );
  }

  if (!data) return null;

  const { greeting, emoji } = getGreeting();
  const firstName = data.user.name.split(" ")[0];
  const today = new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });

  return (
    <div className="min-h-screen bg-gray-50 font-sans">

      {/* 1. Injected Navbar Component */}
      <Navbar user={data.user} />

      <main className="max-w-7xl mx-auto px-6 py-10">

        {/* 2. Greeting */}
        <div className="mb-10">
          <p className="text-sm font-medium text-red-600 tracking-widest uppercase mb-1">{today}</p>
          <h1 className="text-3xl font-bold text-gray-900">
            {greeting}, {firstName}! {emoji}
          </h1>
          <p className="text-gray-500 mt-2">Here is a quick overview of your academic profile.</p>
        </div>

        {/* 3. Injected Bento Grid Components */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Active Projects" value={data.stats.projects}
            icon={<FolderGit2 className="h-6 w-6" />}
            iconBgColor="bg-red-50" iconTextColor="text-red-600"
          />
          <StatCard
            title="Publications & R&D" value={data.stats.academicWorks}
            icon={<BookOpenText className="h-6 w-6" />}
            iconBgColor="bg-gray-900" iconTextColor="text-white"
          />
          <StatCard
            title="Verified Certifications" value={data.stats.certifications}
            icon={<Award className="h-6 w-6" />}
            iconBgColor="bg-red-100" iconTextColor="text-red-700"
          />
          <StatCard
            title="Awards & Hackathons" value={data.stats.achievements}
            icon={<Trophy className="h-6 w-6" />}
            iconBgColor="bg-gray-100" iconTextColor="text-gray-900"
          />
        </div>

      </main>
    </div>
  );
}