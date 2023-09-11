"use client";
import React, { FormEvent, useState } from "react";
import { defaultPfp } from "../../util/defaultpfp"; 
import { put, post } from "@/util/request";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";


export default function EditProfile() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  // // Check if user is logged in
  // const { data: session } = useSession();
  // if (!session) {
  //   throw new Error("Unauthorised");
  // }

  const handleOnSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    const formData = {
      username,
      email,
      description,
      newPassword,
    };
  
    try {
      // erm
      const response = await put('/put', formData, {
        
      });

      if (response.errorCode) {
      } 

    } catch (error) {
      // Handle network or other errors
      console.error('An error occurred:', error);
    }
    router.refresh();
  };

  return (
    <>
    <form onSubmit={handleOnSubmit}>
    <div className="flex justify-center items-center h-screen">
      {/* Profile Page Left Section */}
      <div className="w-[240px] h-full">
        <div className="w-48 h-48 rounded-full mx-auto">
          {/* Profile Picture */}
          <div className="h-full flex flex-col justify-center items-center relative">
            <img
              src={defaultPfp}
              className="w-40 h-40 rounded-full"
            />
            <button
              type="button"
              className="absolute bottom-0 right-0  bg-ll-dark-pink text-white p-2 rounded-full transform translate-x-1/2 translate-y-1/2"
            >
              Edit
            </button>
          </div>
        </div>
        <h1 className="text-center text-xl font-semibold mt-4">Profile Picture</h1>
      </div>
      {/* Acc Details & Change Password */}
      <div className="w-[880px] pl-[64px]">
        <div className="mb-4">
          <h2 className="text-2xl font-bold mb-2">Account Details</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="username" className="block font-medium mb-1">
                Username
              </label>
              <input
                type="text"
                id="username"
                className="w-full border rounded-md p-2 bg-ll-beige placeholder-ll-beige2"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
              />
            </div>
            <div>
              <label htmlFor="email" className="block font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full border rounded-md p-2 bg-ll-beige placeholder-ll-beige2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
              />
            </div>
            <div className="col-span-2">
              <label htmlFor="description" className="block font-medium mb-1">
                Description
              </label>
              <textarea
                id="description"
                className="w-full border rounded-md p-2 bg-ll-beige placeholder-ll-beige2"
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter description"
              ></textarea>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <h2 className="text-2xl font-bold mb-2">Change Password</h2>
          
            <div>
              <label htmlFor="currentPassword" className="block font-medium mb-1 ">
                Current Password
              </label>
              <input
                type="password"
                id="currentPassword"
                className="w-full border rounded-md p-2 bg-ll-beige placeholder-ll-beige2"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter current password"
              />
            </div>
            <div>
              <label htmlFor="newPassword" className="block font-medium mb-1 pt-[16px]">
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                className="w-full border rounded-md p-2 bg-ll-beige placeholder-ll-beige2"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
              />
            </div>
            <div>
              <label htmlFor="confirmNewPassword" className="block font-medium mb-1 pt-[16px]">
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirmNewPassword"
                className="w-full border rounded-md p-2 bg-ll-beige placeholder-ll-beige2"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                placeholder="Enter confirm new password"
              />
            </div>
            <div className="text-right"> 
              <button
                type="submit"
                className="bg-ll-dark-pink text-white p-2 rounded-md mt-[64px]"
              >
                Update Profile
              </button>
            </div>
        </div>
      </div>
    </div>
    </form>
    </>
  );
}
