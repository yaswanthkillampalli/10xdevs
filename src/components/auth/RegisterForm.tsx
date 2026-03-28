"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, UserPlus, Mail, KeyRound, User, Hash, AlertCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const registerSchema = z.object({
  rollId: z.string().min(1, "Roll ID is required"),
  name: z.string().min(1, "Full name is required"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterForm() {
  const router = useRouter();
  const [serverError, setServerError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setServerError("");
    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Registration failed");
      }

      router.push("/login");
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-gray-50">
      {/* Left branding panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-black flex-col items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-red-950 opacity-90" />
        <div className="relative z-10 flex flex-col items-center gap-8 text-center">
          <div className="w-48 h-48 flex items-center justify-center">
            <Image
              src="/10xdevs-bg-removed.svg"
              alt="10x Devs Club Logo"
              width={192}
              height={192}
              priority
            />
          </div>
          <div>
            <h1 className="text-4xl font-extrabold text-white tracking-tight">
              10x<span className="text-red-500">Devs</span>
            </h1>
            <p className="mt-2 text-gray-400 text-lg">Club Portal</p>
          </div>
          <p className="text-gray-500 text-sm max-w-xs">
            Join our developer community. Access resources, attend events, and grow with fellow engineers.
          </p>
        </div>
        {/* Decorative circles */}
        <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-red-600 opacity-10" />
        <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-red-600 opacity-10" />
      </div>

      {/* Right form panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="flex lg:hidden flex-col items-center mb-8 gap-3">
            <Image
              src="/10xdevs-bg-removed.svg"
              alt="10x Devs Club Logo"
              width={64}
              height={64}
            />
            <h1 className="text-2xl font-extrabold text-black tracking-tight">
              10x<span className="text-red-600">Devs</span>
            </h1>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Create an account</h2>
            <p className="mt-1 text-gray-500">Join the 10x Devs Club Portal today</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
            {serverError && (
              <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{serverError}</span>
              </div>
            )}

            {/* Roll ID field */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Roll ID</label>
              <div className="relative">
                <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  {...register("rollId")}
                  placeholder="e.g. 21CS001"
                  className={`w-full pl-10 pr-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition ${
                    errors.rollId ? "border-red-400 bg-red-50" : "border-gray-300 bg-white"
                  }`}
                />
              </div>
              {errors.rollId && (
                <p className="text-xs text-red-600 mt-0.5">{errors.rollId.message}</p>
              )}
            </div>

            {/* Full Name field */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  {...register("name")}
                  placeholder="Your full name"
                  className={`w-full pl-10 pr-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition ${
                    errors.name ? "border-red-400 bg-red-50" : "border-gray-300 bg-white"
                  }`}
                />
              </div>
              {errors.name && (
                <p className="text-xs text-red-600 mt-0.5">{errors.name.message}</p>
              )}
            </div>

            {/* Email field */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  {...register("email")}
                  type="email"
                  placeholder="you@example.com"
                  className={`w-full pl-10 pr-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition ${
                    errors.email ? "border-red-400 bg-red-50" : "border-gray-300 bg-white"
                  }`}
                />
              </div>
              {errors.email && (
                <p className="text-xs text-red-600 mt-0.5">{errors.email.message}</p>
              )}
            </div>

            {/* Password field */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  placeholder="Min. 8 characters"
                  className={`w-full pl-10 pr-10 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition ${
                    errors.password ? "border-red-400 bg-red-50" : "border-gray-300 bg-white"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-red-600 mt-0.5">{errors.password.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center justify-center gap-2 w-full bg-black hover:bg-gray-900 disabled:bg-gray-600 text-white font-semibold py-2.5 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
            >
              {isLoading ? (
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <UserPlus className="w-4 h-4" />
                  Create Account
                </>
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link href="/login" className="text-red-600 font-medium hover:underline">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}