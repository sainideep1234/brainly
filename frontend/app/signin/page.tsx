"use client";

import ScreenLayout from "@/components/ScreenLayout";
import { userSignin } from "@/httpclients/httpclient";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const SignIn = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  function signin() {
    userSignin(email, password)
      .then((c) => {
        localStorage.setItem("token", c.data.token);
      })
      .then(() => router.push("/"))
      .catch((err) => {
        alert("Signin failed: " + (err.response?.data?.message || err.message));
      });
  }
  return (
    <ScreenLayout className="flex justify-center items-center ">
      <div className="min-w-lg shadow-2xl flex flex-col p-8 rounded-2xl bg-bg-side border border-border">
        <h1 className="text-2xl mb-6 font-bold w-full flex justify-center text-text-pri">
          Signin
        </h1>
        <label htmlFor="email" className="font-semibold text-lg text-text-pri">
          Email
        </label>
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="text"
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
          If not has account please{" "}
          <Link
            href={"/signup"}
            className="font-bold hover:font-semibold text-violet-400 underline "
          >
            SignUp
          </Link>
        </p>
        <button
          onClick={() => signin()}
          className="bg-btn-pri text-white py-2 rounded-xl hover:bg-violet-600 font-bold text-lg my-4 transition-all duration-300 cursor-pointer hover:scale-[1.01] active:scale-[0.99]"
        >
          Submit
        </button>
      </div>
    </ScreenLayout>
  );
};

export default SignIn;
