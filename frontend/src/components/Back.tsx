"use client";

import { useRouter } from "next/navigation";
import { ArrowLongLeftIcon } from "@heroicons/react/24/solid";

export default function Back() {
  const router = useRouter();
  return (
    <div
      className="flex gap-4 items-center cursor-pointer"
      onClick={() => router.back()}
    >
      <ArrowLongLeftIcon className="w-6 h-6" />
      <span className="font-bold">Back</span>
    </div>
  );
}
