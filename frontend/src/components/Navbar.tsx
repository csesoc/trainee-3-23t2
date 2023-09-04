// Sidebar.tsx
"use client";

import React from 'react'
// import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { HandThumbUpIcon } from "@heroicons/react/24/outline"
import { ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/outline"
import Image from "next/image"

// import './sidebar.css';
// const Nav = styled(Link)`
// `;

type PostCardProps = {
    msg: string,
    textColor: string,
    backgroundColor: string,
    image: string,
    name: string,
    likes: number,
    comments: number,
    profile: string,
    username: string,
    anonymous: boolean,
}

// const Nav = styled.div`
//     display: flex;
//     justify-content: start;
//     align-items: center;
//     height: 3.5rem;
//     background-color: #000080;
// `

// export default function Navbar() {
//     return (
//         // <div className="container">
//         <div className="flex flex-row h-4 space-x-3">
//             <HomeIcon className="text-ll-dark-pink"/>
//             <HomeIcon className="text-ll-dark-pink"/>
//             <HomeIcon className="text-ll-dark-pink"/>
//             {/* <div className="border-t border-gray-300 my-4"></div> */}
//             <hr className="w-11/12 h-0.5 border-0 rounded md:my-1.5 dark:bg-ll-dark-pink"/>
//         </div>

//         //     {
//         //     <nav className="nav"></nav>
//         //     }
            
//         // </div>
//     );
// }

const Navbar: React.FC<PostCardProps> = (props: PostCardProps) => {
    // idk why the fuck u have this cause u were tryna truncate it BUT U DONT NEED
    // if (props.msg.length > 210) {
    //     var shorten_msg = props.msg.slice(0, 210); 
    // } else {
    //     var shorten_msg = props.msg
    // }
    
    return (
        <div 
            style={{ 
                backgroundColor: props.backgroundColor,
                color: props.textColor
            }}
            className= "shadow-lg rounded-lg">
            <div className="flex flex-col p-5 left-5 gap-y-3">
                <div className="flex flex-row gap-x-2 relative items-center flex-wrap">
                    {/* <div className="flex flex-row items-center gap-x-3"> */}
                    {/* <div className="w-6 h-6 bg-red-600 rounded-full"></div> */}
                    <img src={props.profile} className="w-6 h-6 bg-red-600 rounded-full"></img>
                    <p className="font-semibold text-xs">{props.anonymous ? props.username : 'Anonymous'}</p>
                    {/* </div> */}
                    <Image
                        src={props.image}
                        alt={props.name}
                        width={30}
                        height={30}
                        objectFit=""
                        className="h-8 absolute right-0 top-0 opacity-25 object-contain"
                    />
                    {/* <img src={props.image} className="w-6 opacity-25"></img> */}
                </div>
                {/* <div className="justify-center relative top-2 w-10/12"> */}
                <p className="text-xs line-clamp-3 h-[11ch]">{props.msg}</p>
                {/* </div> */}
                {/* <div> */}
                <div className="flex flex-row items-center gap-x-2">
                    <HandThumbUpIcon className="w-5"/>
                    <p className="text-xs">{props.likes}</p>
                    <ChatBubbleBottomCenterTextIcon className="w-5" />
                    <p className="text-xs">{props.comments}</p>
                </div>

            </div>
        </div>
    );
};

export default Navbar;

