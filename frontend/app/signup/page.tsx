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
      <div className="min-w-lg shadow-2xl flex flex-col p-8 rounded-2xl bg-bg-side border border-border">
        <h1 className="text-2xl mb-6 font-bold w-full flex justify-center text-text-pri">
          Signup
        </h1>
        <label htmlFor="name" className="font-semibold text-lg text-text-pri">
          Name
        </label>
        <input
          onChange={(e) => setName(e.target.value)}
          type="text"
          id="name"
          className="outline-none border-border border rounded-lg px-4 py-1 text-lg mb-4 bg-bg-hero text-text-pri"
        />
        <label htmlFor="email" className="font-semibold text-lg text-text-pri">
          Email
        </label>
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          id="email"
          className="outline-none border-border border rounded-lg px-4 py-1 text-lg mb-4 bg-bg-hero text-text-pri"
        />
        <label htmlFor="password" className="font-semibold text-lg my-2 text-text-pri">
          Password
        </label>
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          id="password"
          className="outline-none border-border border rounded-lg px-4 py-1 text-lg bg-bg-hero text-text-pri"
        />
        <p className="font-medium my-2 text-text-sec">
          If you already have an account please{" "}
          <Link
            href={"/signin"}
            className="font-bold hover:font-semibold text-violet-400 underline "
          >
            SignIn
          </Link>
        </p>
        <button
          onClick={() => signup()}
          className="bg-btn-pri text-white py-2 rounded-xl hover:bg-violet-600 font-bold text-lg my-4 transition-all duration-300 cursor-pointer hover:scale-[1.01] active:scale-[0.99]"
        >
          Submit
        </button>
      </div>
    </ScreenLayout>
  );
};

export default SignUp;