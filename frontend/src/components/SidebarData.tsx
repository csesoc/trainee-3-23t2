import React from "react";
import { HomeIcon, PencilSquareIcon } from "@heroicons/react/24/solid";

export const SidebarData = [
  {
    title: "Home",
    path: "/",
    icon: <HomeIcon className="w-8 h-8 text-ll-dark-pink" />,
    needs_session: false,
  },
  {
    title: "Post",
    path: "/post/create",
    icon: <PencilSquareIcon className="w-8 h-8 text-ll-dark-pink" />,
    needs_session: true,
  },
];
