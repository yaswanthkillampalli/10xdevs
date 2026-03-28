"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, LogIn, Mail, KeyRound, AlertCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const loginSchema = z.object({
  identifier: z.string().min(1, "Email or Roll ID is required"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const router = useRouter();
  const [serverError, setServerError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setServerError("");
    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Login failed");
      }

      router.push("/home");
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Login failed");
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
            Your gateway to resources, events, and the developer community at our college.
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
            <h2 className="text-3xl font-bold text-gray-900">Welcome back</h2>
            <p className="mt-1 text-gray-500">Sign in to your club portal account</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
            {serverError && (
              <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{serverError}</span>
              </div>
            )}

            {/* Identifier field */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Email or Roll ID</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  {...register("identifier")}
                  placeholder="you@example.com or 21XXXX"
                  className={`w-full pl-10 pr-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition ${
                    errors.identifier ? "border-red-400 bg-red-50" : "border-gray-300 bg-white"
                  }`}
                />
              </div>
              {errors.identifier && (
                <p className="text-xs text-red-600 mt-0.5">{errors.identifier.message}</p>
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
                  placeholder="••••••••"
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
              className="flex items-center justify-center gap-2 w-full bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-semibold py-2.5 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              {isLoading ? (
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  Sign In
                </>
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-red-600 font-medium hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}