"use client";

import React, { useState } from 'react'
import { Bars3Icon } from "@heroicons/react/24/solid"
import { SidebarData } from './SidebarData';
import { Link } from 'react-router-dom';
// export default function Sidebar() {
//     return <p>Sidebar :D</p>;
// }


// export default function Sidebar() {
//     return (
//         <div className="container">
//             <div className="flex flex-row h-4 space-x-3">
//                 <HomeIcon className="text-ll-dark-pink"/>
//                 <HomeIcon className="text-ll-dark-pink"/>
//                 <HomeIcon className="text-ll-dark-pink"/>
//                 {/* <div className="border-t border-gray-300 my-4"></div> */}
//                 <hr className="w-11/12 h-0.5 border-0 rounded md:my-1.5 dark:bg-ll-dark-pink"/>
//             </div>
//             <p>
//                 bruhasdasda
//             </p>
//         </div>
//     );
// }

const Sidebar: React.FC = () => {
    const [isClosed, setClose] = useState(false);
    const toggleBar = () => setClose((prev: boolean) => !prev);
    return (
        <div className = "sidebarContainer">

            <div className="flex h-12 bg-indigo-900">
                
                <div 
                    onClick={toggleBar}
                    className="flex flex-row text-2xl ml-8 text-white items-center cursor-pointer"
                >
                    <Bars3Icon className="w-8 h-8 text-ll-dark-pink "/>
                    {/* . bruh */}
                </div>

                <div 
                    className = "absolute right-28 items-center px-4 py-2 text-xl no-underline text-white transition-all duration-300 hover:bg-white hover:text-blue-800 hover:rounded-md cursor-pointer" 
                >
                    <span style={{marginLeft: '8px', marginRight: '0px'}}>{"Sign in"}</span>
                </div>

                <div 
                    className = "absolute right-0 items-center px-4 py-2 text-xl font-bold no-underline text-white transition-all duration-300 hover:bg-white hover:text-blue-800 hover:rounded-md cursor-pointer" 
                >
                    <span style={{marginLeft: '8px', marginRight: '0px'}}>{"Sign up"}</span>
                </div>
                
                
            </div>
            
            <div 
                className={`"w-64 h-screen bg-indigo-900 fixed inset top-0 transform transition-transform ${
                    isClosed ? 'left-0 transition-all duration-600' : '-left-full transition-all duration-600'}`}>
                <div 
                    onClick={toggleBar}
                    className="flex text-2xl mt-3 mr-4 ml-8 text-white cursor-pointer"
                >
                    <Bars3Icon className="w-8 h-8 text-ll-dark-pink "/>
                </div>

                {SidebarData.map((item, index) => {
                    return (
                        <div className = "flex items-center w-full h-24" key={index}>
                            <div 
                                className = "flex items-center px-8 py-2 text-2xl no-underline text-white transition-all duration-300 hover:bg-white hover:text-blue-800 hover:rounded-md hover:mx-8 cursor-pointer" 
                                // to={item.path}
                            >
                                {item.icon}
                                <span style={{marginLeft: '16px'}}>{item.title}</span>
                            </div>
                        </div>
                    )
                })}

                <div
                    className="absolute bottom-10 items-center px-8 py-2 text-2xl no-underline text-white transition-all duration-300 hover:bg-white hover:text-blue-800 hover:rounded-md hover:mx-8 cursor-pointer"
                >
                    <span style={{marginLeft: '16px'}}>{'Sign out'}</span>
                </div>


            </div>
        </div>
    );
};

export default Sidebar;
