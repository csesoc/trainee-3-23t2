"use client";

import React, { useState } from "react";
import { HeartIcon, MoonIcon } from "@heroicons/react/24/solid";
import { SidebarData } from "./SidebarData";
import {
  ArrowLeftOnRectangleIcon,
  ArrowRightOnRectangleIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import { signOut, useSession } from "next-auth/react";
import { defaultPfp } from "@/util/defaultpfp";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Sidebar = () => {
  const [isClosed, setClose] = useState(false);
  const toggleBar = () => setClose((prev: boolean) => !prev);
  const { data: session } = useSession();
  const user = session?.user as {
    authorization: string;
    id: string;
    username: string;
    profilePicture: string;
  };
  const router = useRouter();
  return (
    <div>
      <div
        className={`w-screen fixed h-screen inset opacity-50 top-0 bg-black z-0 ${
          isClosed ? "left-0 transition-all" : "-left-full transition-all"
        }`}
      ></div>
      {!isClosed ? (
        <div className="fixed top-0 left-0 flex flex-col items-center justify-between p-4 bg-white shadow-md h-full transition-all duration-150">
          <div className="space-y-4">
            <div
              onClick={toggleBar}
              className="bg-red-300 transition-all duration-150 hover:bg-red-400 p-2 rounded-md flex justify-center items-center cursor-pointer"
            >
              <HeartIcon className="w-8 h-8 text-ll-white" />
            </div>
            <hr />
            {SidebarData.map((item, index) => {
              return (
                <div
                  className={`hover:bg-red-100 hover:text-red-900 cursor-pointer p-2 rounded-md ${
                    !user && item.needs_session && "hidden"
                  }`}
                  key={index}
                >
                  <a href={item.path}>{item.icon}</a>
                </div>
              );
            })}
          </div>
          <div className="space-y-4">
            {user && (
              <div className="hover:bg-red-100 hover:text-red-900 cursor-pointer p-2 rounded-md">
                <a href={`/user/${user.id}`}>
                  <UserCircleIcon className="w-8 h-8 text-ll-dark-pink" />
                </a>
              </div>
            )}
            <div className="hover:bg-red-100 hover:text-red-900 cursor-pointer p-2 rounded-md">
              {!user ? (
                <a href="/login">
                  <ArrowLeftOnRectangleIcon className="w-8 h-8 text-ll-dark-pink" />
                </a>
              ) : (
                <ArrowRightOnRectangleIcon
                  onClick={() => {
                    signOut({ redirect: false });
                    router.refresh();
                  }}
                  className="w-8 h-8 text-ll-dark-pink"
                />
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="fixed top-0 left-0 w-64 flex flex-col justify-between p-4 bg-white shadow-md h-full transition-all duration-150">
          <div className="space-y-4">
            <div
              onClick={toggleBar}
              className="bg-red-300 w-min transition-all duration-150 hover:bg-red-400 p-2 rounded-md flex justify-center items-center cursor-pointer"
            >
              <HeartIcon className="w-8 h-8 text-ll-white" />
            </div>
            <hr />
            {SidebarData.map((item, index) => {
              return (
                <a
                  href={item.path}
                  className={`flex items-center gap-4 hover:bg-red-100 hover:text-red-900 cursor-pointer p-2 rounded-md ${
                    !user && item.needs_session && "hidden"
                  }`}
                  key={index}
                >
                  {item.icon}
                  <span>{item.title}</span>
                </a>
              );
            })}
          </div>
          <div className="space-y-8">
            {user && (
              <a
                href={`/user/${user.id}`}
                className="flex items-center gap-4 w-full cursor-pointer"
              >
                <Image
                  width={32}
                  height={32}
                  alt="Profile Picture"
                  src={!user ? defaultPfp : user.profilePicture}
                  className="rounded-full object-cover"
                />
                <span className="font-semibold">
                  {user ? user.username : "Guest"}
                </span>
              </a>
            )}
            {!user ? (
              <a
                href="/login"
                className="flex gap-4 items-center cursor-pointer border p-4 rounded-xl justify-center hover:bg-ll-dark-pink/25 hover:text-ll-dark-pink duration-150"
              >
                <ArrowLeftOnRectangleIcon className="w-8 h-8" />
                <span>Login</span>
              </a>
            ) : (
              <div
                onClick={() => {
                  signOut({ redirect: false });
                  router.refresh();
                }}
                className="flex gap-4 items-center cursor-pointer border p-4 rounded-xl justify-center hover:bg-ll-dark-pink/25 hover:text-ll-dark-pink duration-150"
              >
                <ArrowRightOnRectangleIcon className="w-8 h-8" />
                <span>Logout</span>
              </div>
            )}
            <p className="text-black/50 text-xs">
              Copyright © 2023 • Trainee 3 23T2
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
