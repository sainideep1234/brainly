"use client";

import ScreenLayout from "@/components/ScreenLayout";
import { userSignUp } from "@/httpclients/httpclient";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const SignUp = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function signup() {
    if (!name || !email || !password) {
      alert("Please fill in all fields");
      return;
    }
    userSignUp(email, password, name)
      .then((c) => {
        localStorage.setItem("token", c.data.token);
      })
      .then(() => router.push("/"))
      .catch((err) => {
        alert("Signup failed: " + (err.response?.data?.message || err.message));
      });
  }

  return (
    <ScreenLayout className="flex justify-center items-center ">
      <div className="w-full max-w-md shadow-2xl flex flex-col p-8 rounded-2xl bg-bg-side border border-border">
        <h1 className="text-3xl font-extrabold text-center text-text-pri mb-8">
          Sign Up
        </h1>
        <label htmlFor="name" className="font-semibold text-xs uppercase tracking-wider text-text-sec mb-2">
          Name
        </label>
        <input
          onChange={(e) => setName(e.target.value)}
          type="text"
          id="name"
          placeholder="John Doe"
          className="outline-none border-border border rounded-xl px-4 py-2.5 text-base mb-5 bg-bg-hero text-text-pri focus:border-violet-500/50 transition-colors duration-300 placeholder:text-gray-600"
        />
        <label htmlFor="email" className="font-semibold text-xs uppercase tracking-wider text-text-sec mb-2">
          Email Address
        </label>
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          id="email"
          placeholder="name@example.com"
          className="outline-none border-border border rounded-xl px-4 py-2.5 text-base mb-5 bg-bg-hero text-text-pri focus:border-violet-500/50 transition-colors duration-300 placeholder:text-gray-600"
        />
        <label htmlFor="password" className="font-semibold text-xs uppercase tracking-wider text-text-sec mb-2">
          Password
        </label>
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          id="password"
          placeholder="••••••••"
          className="outline-none border-border border rounded-xl px-4 py-2.5 text-base bg-bg-hero text-text-pri focus:border-violet-500/50 transition-colors duration-300 placeholder:text-gray-600"
        />
        <p className="font-medium mt-4 mb-2 text-text-sec text-sm text-center">
          Already have an account?{" "}
          <Link
            href={"/signin"}
            className="font-bold text-violet-400 hover:text-violet-300 hover:underline transition-colors duration-200"
          >
            Sign In
          </Link>
        </p>
        <button
          onClick={() => signup()}
          className="bg-btn-pri text-white py-2.5 rounded-xl hover:bg-violet-600 font-bold text-base mt-6 mb-2 transition-all duration-300 cursor-pointer hover:scale-[1.01] active:scale-[0.99] w-full"
        >
          Sign Up
        </button>
      </div>
    </ScreenLayout>
  );
};

export default SignUp;