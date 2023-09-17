"use client";

import Back from "@/components/Back";
import HeartDivider from "@/components/HeartDivider";
import { defaultPfp } from "../../../util/defaultpfp"; 
import DefaultPostCard from "@/components/DefaultPostCard";
import CommentModal from "@/components/CommentModal";
import ReplyModal from "@/components/ReplyModal";


export default function Profile() {
    let username = "Username"
    let description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sagittis massa vel fermentum."
    return (
        <div>
           
            <div className="flex justify-center items-center h-screen ml-[100px]">
                {/* Profile Page Left Section */}
                
                <div className="w-[240px] h-full pt-4">
                    <Back></Back>
                    <div className="w-48 h-48 rounded-full mx-auto pt-4">
                    {/* Profile Picture */}
                    <div className="h-full flex flex-col justify-center items-center relative">
                        <img
                        src={defaultPfp}
                        className="w-52 h52 rounded-full"
                        />                
                    </div>
                    </div>
                    <h1 className="text-left text-xl font-semibold mt-4">@{username}</h1>
                    <p className="text-left pt-4">{description}</p>
                    <div className="flex justify-center pt-4">
                        <button
                            type="button"
                            className="bg-ll-dark-pink text-white p-2 rounded px-14"
                            >
                            Edit Profile
                        </button>
                    </div>                   
                </div>
                <div className="w-[700px] pl-[64px] h-full pt-4"> 
                    <div className="pb-4">
                    <button className="pr-4">Posts</button>
                    <button className="pr-4">Comments</button>
                    <button className="pr-4">Replies</button>
                    </div> 
                    <div className="pb-4" >
                        <HeartDivider></HeartDivider> 
                    </div>
                    
                    
                    <div className="pt-4">
                        {/* Map */}
                        <DefaultPostCard msg={""} textColor={""} backgroundColor={""} image={""} name={""} likes={0} comments={0} profile={""} username={""} anonymous={false} id={""}></DefaultPostCard>
                        <DefaultPostCard msg={""} textColor={""} backgroundColor={""} image={""} name={""} likes={0} comments={0} profile={""} username={""} anonymous={false} id={""}></DefaultPostCard>
                    </div>
                </div>
            </div>  
        </div>
    );
}