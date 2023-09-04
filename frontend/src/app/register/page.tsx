"use client";

import rose from "@/assets/rose.jpg";
import { post } from "@/util/request";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useMemo, useState } from "react";

type InputType = {
  email: string;
  password: string;
  username: string;
  confirmation: string;
};

export default function Register() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [inputs, setInputs] = useState<InputType>({
    email: "",
    password: "",
    username: "",
    confirmation: "",
  });

  const readyToSubmit = useMemo(
    () =>
      inputs.email &&
      inputs.password &&
      inputs.username &&
      inputs.confirmation &&
      inputs.password === inputs.confirmation,
    [inputs]
  );

  const handleOnSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const res = await post("/auth/register", {
      username: target.username.value,
      email: target.email.value,
      password: target.password.value,
    });
    if (res.errorCode) {
      return setError(res.errorMessage);
    }
    signIn(undefined, { callbackUrl: "/" });
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
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setInputs((prev: InputType) => {
                    const newObj = { ...prev };
                    newObj.username = e.target.value;
                    return newObj;
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <label className="block">Email</label>
              <input
                type="text"
                className="w-full px-4 py-2 outline-none rounded-md bg-gray-100"
                name="email"
                placeholder="Please enter your email!"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setInputs((prev: InputType) => {
                    const newObj = { ...prev };
                    newObj.email = e.target.value;
                    return newObj;
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <label className="block">Password</label>
              <input
                type="text"
                className="w-full px-4 py-2 outline-none rounded-md bg-gray-100"
                name="password"
                placeholder="Please enter your password!"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setInputs((prev: InputType) => {
                    const newObj = { ...prev };
                    newObj.password = e.target.value;
                    return newObj;
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <label className="block">Confirm Password</label>
              <input
                type="text"
                className="w-full px-4 py-2 outline-none rounded-md bg-gray-100"
                name="confirm-password"
                placeholder="Please enter again your password!"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setInputs((prev: InputType) => {
                    const newObj = { ...prev };
                    newObj.confirmation = e.target.value;
                    return newObj;
                  })
                }
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={!readyToSubmit}
            className={`w-full py-2 text-white font-bold rounded-md ${
              readyToSubmit
                ? "bg-[#007AFF] cursor-pointer"
                : "bg-[#007AFF]/60 cursor-not-allowed"
            }`}
          >
            Log in
          </button>
        </form>
        <div className="flex gap-2 items-center">
          <span>Already have an account?</span>
          <Link href="/register" className="text-[#007AFF]">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
