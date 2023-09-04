"use client";

import rose from "@/assets/rose.jpg";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";

export default function Login() {
  const router = useRouter();
  const [error, setError] = useState("");

  const searchParams = useSearchParams();

  const handleOnSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    try {
      const res = await signIn("credentials", {
        redirect: false,
        username: target.username.value,
        password: target.password.value,
        callbackUrl: "/",
      });
      if (!res?.error) {
        router.push("/");
      } else {
        setError("Invalid username or password");
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="flex min-h-screen">
      <Image
        src={rose}
        alt="Love Letters"
        className="w-3/5 max-h-screen object-cover hidden md:block"
      />
      <div className="flex-1 flex flex-col justify-center gap-4 p-12">
        <h1 className="text-4xl font-bold break-all">♥ Love Letters</h1>
        <h2>Welcome back {"<3"}</h2>
        {error && <p className="text-red-500">{error}</p>}
        <form className="space-y-8" name="login" onSubmit={handleOnSubmit}>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block">Username</label>
              <input
                type="text"
                className="w-full px-4 py-2 outline-none rounded-md bg-gray-100"
                name="username"
                placeholder="Please enter your username!"
              />
            </div>
            <div className="space-y-2">
              <label className="block">Password</label>
              <input
                type="text"
                className="w-full px-4 py-2 outline-none rounded-md bg-gray-100"
                name="password"
                placeholder="Please enter your password!"
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-[#007AFF] w-full py-2 text-white font-bold rounded-md"
          >
            Log in
          </button>
        </form>
        <div className="flex gap-2 items-center">
          <span>Don't have an account?</span>
          <Link href="/register" className="text-[#007AFF]">
            Register now!
          </Link>
        </div>
      </div>
    </div>
  );
}
