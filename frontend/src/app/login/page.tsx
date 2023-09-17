"use client";

import rose from "@/assets/rose.jpg";
import Spinner from "@/components/Spinner";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useMemo, useState } from "react";

type InputType = {
  password: string;
  username: string;
};

export default function Login() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState<InputType>({
    password: "",
    username: "",
  });

  const readyToSubmit = useMemo(
    () => inputs.password && inputs.username,
    [inputs]
  );

  const handleOnSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    setLoading(true);
    try {
      const res = await signIn("credentials", {
        redirect: false,
        username: target.username.value,
        password: target.password.value,
        callbackUrl: "/",
      });
      setLoading(false);
      if (!res?.error) {
        router.push("/");
      } else {
        setError("Invalid username or password");
      }
    } catch (err: any) {
      setLoading(false);
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
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setInputs((prev: InputType) => {
                    const newObj = { ...prev };
                    newObj.username = e.target.value;
                    return newObj;
                  })
                }
                placeholder="Please enter your username!"
              />
            </div>
            <div className="space-y-2">
              <label className="block">Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 outline-none rounded-md bg-gray-100"
                name="password"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setInputs((prev: InputType) => {
                    const newObj = { ...prev };
                    newObj.password = e.target.value;
                    return newObj;
                  })
                }
                placeholder="Please enter your password!"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={!readyToSubmit || loading}
            className={`w-full py-2 text-white font-bold rounded-md ${
              readyToSubmit
                ? "bg-[#007AFF] cursor-pointer"
                : "bg-[#007AFF]/60 cursor-not-allowed"
            }`}
          >
            <div className="m-0 inline-block">
              {loading ? <Spinner /> : <span>Log In</span>}
            </div>
          </button>
        </form>
        <div className="flex gap-2 items-center">
          <span>Don't have an account?</span>
          <a href="/register" className="text-[#007AFF]">
            Register now!
          </a>
        </div>
      </div>
    </div>
  );
}
