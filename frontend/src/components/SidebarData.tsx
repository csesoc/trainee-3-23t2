import React from 'react'
import { HomeIcon } from "@heroicons/react/24/solid"
import { Cog6ToothIcon } from "@heroicons/react/24/solid"
import { UserCircleIcon } from "@heroicons/react/24/solid"
import { CurrencyDollarIcon } from "@heroicons/react/24/solid"
import { BookmarkIcon } from "@heroicons/react/24/solid"


export const SidebarData = [
    {
        title: 'Home',
        path: '/',
        icon: <HomeIcon className="w-6 h-6 text-ll-dark-pink "/>
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
        title: 'Pay for my daughter\'s breakfast please',
        path: '/pay',
        icon: <CurrencyDollarIcon className="w-6 h-6 text-ll-dark-pink "/>
    },
    {
        title: 'Settings',
        path: '/settings',
        icon: <Cog6ToothIcon className="w-6 h-6 text-ll-dark-pink "/>
    },
]