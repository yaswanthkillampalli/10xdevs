"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function RegisterForm() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error, setError] = useState("");

  const onSubmit = async (data: any) => {
    setError("");
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

      alert("Registered successfully! Please log in.");
      router.push("/login");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 max-w-sm mx-auto p-6 border rounded-md shadow-sm">
      <h2 className="text-xl font-bold">Register</h2>
      
      {error && <p className="text-red-500 text-sm">{error}</p>}

      <input {...register("rollId", { required: true })} placeholder="Roll ID" className="border p-2 rounded" />
      <input {...register("name", { required: true })} placeholder="Full Name" className="border p-2 rounded" />
      <input {...register("email", { required: true })} type="email" placeholder="Email" className="border p-2 rounded" />
      <input {...register("password", { required: true })} type="password" placeholder="Password" className="border p-2 rounded" />
      
      <select {...register("role")} className="border p-2 rounded">
        <option value="student">Student</option>
        <option value="faculty">Faculty</option>
      </select>

      <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
        Register
      </button>
    </form>
  );
}