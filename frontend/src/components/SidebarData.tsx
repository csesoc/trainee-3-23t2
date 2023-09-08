import React from 'react'
import { HomeIcon, PlusCircleIcon, Cog6ToothIcon, UserCircleIcon, CurrencyDollarIcon, BookmarkIcon } from "@heroicons/react/24/solid"

export const SidebarData = [
    {
        title: 'Home',
        path: '/',
        icon: <HomeIcon className="w-6 h-6 text-ll-dark-pink "/>
    },
    {
        title: 'Post',
        path: '/post',
        icon: <PlusCircleIcon className="w-6 h-6 text-ll-dark-pink "/>
    },
    {
        title: 'Profile',
        path: '/profile',
        icon: <UserCircleIcon className="w-6 h-6 text-ll-dark-pink "/>
    },
    {
        title: 'Saved',
        path: '/saved',
        icon: <BookmarkIcon className="w-6 h-6 text-ll-dark-pink "/>
    },
    {
        title: 'Bribe us',
        path: '/pay',
        icon: <CurrencyDollarIcon className="w-6 h-6 text-ll-dark-pink "/>
    },
    {
        title: 'Settings',
        path: '/settings',
        icon: <Cog6ToothIcon className="w-6 h-6 text-ll-dark-pink "/>
    },
]