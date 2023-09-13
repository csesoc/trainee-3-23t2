"use client";

import React, { useState } from 'react'
import { HeartIcon, MoonIcon } from "@heroicons/react/24/solid"
import { SidebarData } from './SidebarData';
import { ArrowLeftOnRectangleIcon, UserCircleIcon } from "@heroicons/react/24/solid"
import { useSession } from 'next-auth/react';
// import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
    const [isClosed, setClose] = useState(false);
    const toggleBar = () => setClose((prev: boolean) => !prev);
    const session = useSession();
    return (
        <div className = "sidebarContainer">

            {/* <div className="flex h-12 bg-indigo-900">
                
                <div 
                    onClick={toggleBar}
                    className="flex flex-row text-2xl ml-8 text-white items-center cursor-pointer"
                >
                    <Bars3Icon className="w-8 h-8 text-ll-dark-pink "/>
                </div>

                <div 
                    className = "absolute right-28 items-center px-4 py-2 text-xl no-underline text-white transition-all duration-300 hover:bg-white hover:text-blue-800 hover:rounded-md cursor-pointer" 
                >
                    <span style={{marginLeft: '8px', marginRight: '4px'}}>
                        <a href={'/login'}>Sign in</a>
                    </span>
                </div>

                <div 
                    className = "absolute right-0 items-center px-4 py-2 text-xl font-bold no-underline text-white transition-all duration-300 hover:bg-white hover:text-blue-800 hover:rounded-md cursor-pointer" 
                >
                    <span style={{marginLeft: '8px', marginRight: '4px'}}>
                        <a href={'/register'}>Sign up</a>
                    </span>
                </div>
                
                
            </div> */}

            <div className={`w-screen fixed h-screen inset opacity-50 bg-black ${
                    isClosed ? 'left-0 transition-all duration-900' : '-left-full transition-all duration-200'}`}>
            </div>

            <div 
                className={`w-27 h-screen bg-stone-300 fixed inset ${
                    !isClosed ? 'left-0 transition-all duration-800' : 'left-0 transition-all duration-800'}`}>
                
                <div 
                    onClick={toggleBar}
                    className="flex my-7 mx-5 w-16 h-16 text-2xl bg-red-300 transition-all duration-300 hover:bg-red-400 rounded-md items-center cursor-pointer"
                >
                    <HeartIcon className="mx-5 top-10 w-8 h-8 text-ll-white"/>
                    {/* <HeartIcon className="mx-5 top-10 w-8 h-8 text-ll-white"/> */}
                </div>
                
                <div>
                    {SidebarData.map((item, index) => {
                        return (
                            <div className = "flex items-center mx-2 w-full h-20" key={index}>
                                <div 
                                    className = "flex items-center px-8 py-2 text-2xl no-underline text-white transition-all duration-300 hover:bg-white hover:text-blue-800 hover:rounded-md hover:mx-2 cursor-pointer" 
                                >
                                    {item.icon}

                                    {/* {session || !item.needs_session ? (
                                        <div className = "flex items-center px-8 py-2 text-2xl no-underline text-white transition-all duration-300 hover:bg-white hover:text-blue-800 hover:rounded-md hover:mx-2 cursor-pointer">
                                            {item.icon}
                                        </div>
                                    ) : (
                                        {}
                                    )}     */}
                                </div>
                            </div>
                        )
                    })} 


                    <div className = "fixed items-center w-full bottom-7">
                        <div className = "flex items-center mx-2 w-full h-20">
                            <div 
                                className = "flex items-center px-8 py-2 text-2xl no-underline text-white transition-all duration-300 hover:bg-white hover:text-blue-800 hover:rounded-md cursor-pointer" 
                            >
                                {<UserCircleIcon className="w-6 h-6 text-ll-black"/>}
                            </div>
                        </div>
                        <div className = "flex items-center mx-2 w-full h-[75px]">
                            <div 
                                className = "flex items-center px-8 py-2 text-2xl no-underline text-white transition-all duration-300 hover:bg-white hover:text-blue-800 hover:rounded-md cursor-pointer" 
                            >
                                {<MoonIcon className="w-6 h-6 text-ll-black"/>}
                            </div>
                        </div>
                        <div className = "flex items-center mx-2 w-full h-20">
                            <div 
                                className = "flex items-center px-8 py-2 text-2xl no-underline text-white transition-all duration-300 hover:bg-white hover:text-blue-800 hover:rounded-md cursor-pointer" 
                            >
                                {<ArrowLeftOnRectangleIcon className="w-6 h-6 text-ll-black"/>}
                            </div>
                        </div>
                    </div>
                </div>                
            </div>
            
            <div 
                className={`w-[320px] h-screen bg-stone-300 fixed inset ${
                    isClosed ? 'left-0 transition-all duration-800' : '-left-full transition-all duration-800'}`}>
                
                <div 
                    onClick={toggleBar}
                    className="flex my-7 mx-5 w-16 h-16 text-2xl bg-red-300 transition-all duration-300 hover:bg-red-400 rounded-md items-center cursor-pointer"
                >
                    <HeartIcon className="mx-5 top-10 w-8 h-8 text-ll-white"/>
                    {/* <HeartIcon className="mx-5 top-10 w-8 h-8 text-ll-white"/> */}
                </div>
                
                <div>
                {SidebarData.map((item, index) => {
                        return (
                            <div className = "flex items-center mx-2 w-full h-20" key={index}>
                                <div 
                                    className = "flex items-center px-8 py-2 text-2xl no-underline text-black transition-all duration-300 hover:bg-white hover:text-blue-800 hover:rounded-md hover:mx-2 cursor-pointer" 
                                >
                                    {item.icon}
                                    <span style={{marginLeft: '16px'}}>{item.title}</span>
                                </div>
                            </div>
                        )
                    })}

                    <div className = "fixed items-center bottom-12 mx-8">
                        <div className = "h-22 no-underline text-black transition-all duration-300 hover:text-red-900 cursor-pointer">
                            <div 
                                className = "flex items-center py-2"
                            >
                                {<UserCircleIcon className="mx-2 absolute top-5 w-10 h-10 text-ll-dark-pink"/>}
                                <p className = "flex mx-7 text-2xl"> </p>
                                <div className = "flex items-center">
                                    <p className='flex text-2xl'>Username</p>
                                    <p className='absolute top-11'>email@gmail.com</p>
                                    <p className = "flex mx-5 text-2xl"> </p>
                                    {<MoonIcon className="relative top-3 w-10 h-10 text-ll-dark-pink"/>}
                                </div>                                  
                            </div>
                        </div>

                        <br/>
                        <br/>

                        <div className = "outline outline-offset-2 outline-3 outline-red-300 rounded-md">
                            <div 
                                className = "flex items-center px-16 py-2 text-2xl text-black no-underline transition-all duration-300 hover:text-red-900 hover:bg-red-300 hover:rounded-md cursor-pointer" 
                            >
                                {<ArrowLeftOnRectangleIcon className="w-6 h-6 text-ll-dark-pink"/>}
                                <span style={{marginLeft: '16px'}}>{"Logout"}</span>
                            </div>
                        </div>
                    </div>
                </div>                
            </div>



        </div>
    );
};

export default Sidebar;
