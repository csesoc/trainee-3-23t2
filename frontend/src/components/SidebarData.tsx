import React from 'react'
import { HomeIcon, PencilSquareIcon, FireIcon, CurrencyDollarIcon, BookmarkIcon } from "@heroicons/react/24/solid"

export const SidebarData = [
    {
        title: 'Home',
        path: '/',
        icon: <HomeIcon className="w-7 h-7 text-ll-dark-pink"/>,
        needs_session: false
    },
    // {
    //     title: 'Profile',
    //     path: '/profile',
    //     icon: <UserCircleIcon className="w-7 h-7 text-ll-dark-pink "/>
    // },
    // {
    //     title: 'Saved',
    //     path: '/',
    //     icon: <BookmarkIcon className="w-7 h-7 text-ll-dark-pink "/>
    // },
    {
        title: 'Hall of Fame',
        path: '/',
        icon: <FireIcon className="w-7 h-7 text-ll-dark-pink"/>,
        needs_session: false
    },
    {
        title: 'Bribe us',
        path: '/',
        icon: <CurrencyDollarIcon className="w-7 h-7 text-ll-dark-pink"/>,
        needs_session: false
    },
    {
        title: 'Post',
        path: '/post/create',
        icon: <PencilSquareIcon className="w-7 h-7 text-ll-dark-pink"/>,
        needs_session: true
    },
    // {
    //     title: 'Settings',
    //     path: '/',
    //     icon: <Cog6ToothIcon className="w-7 h-7 text-ll-dark-pink "/>
    // },
]