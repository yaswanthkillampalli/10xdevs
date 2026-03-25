"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function LoginForm() {
  const router = useRouter();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const onSubmit = async (data: any) => {
    setError("");
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

      localStorage.setItem("token", result.token);
      router.push("/"); 

    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 max-w-sm mx-auto p-6 border rounded-md shadow-sm">
      <h2 className="text-xl font-bold">Login</h2>
      
      {error && <p className="text-red-500 text-sm">{error}</p>}

      <input 
        {...register("identifier", { required: true })} 
        placeholder="Roll ID or Email" 
        className="border p-2 rounded" 
      />
      <input 
        {...register("password", { required: true })} 
        type="password" 
        placeholder="Password" 
        className="border p-2 rounded" 
      />

      <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
        Login
      </button>
    </form>
  );
}