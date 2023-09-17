"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { get, put } from "@/util/request";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { PencilIcon } from "@heroicons/react/24/solid";
import Back from "@/components/Back";
import Spinner from "@/components/Spinner";
import { useRouter } from "next/navigation";

type InputType = {
  username: string;
  email: string;
  description: string;
  profilePicture: string;
  currentPassword: string;
  newPassword: string;
  confirmationPassword: string;
};

export default function EditProfile() {
  const router = useRouter();
  const { data: session } = useSession();
  const [error, setError] = useState("");
  const [initialLoading, setInitialLoading] = useState(true);
  const [loading, setLoading] = useState(false);

  // Don't allow access if not logged in
  if (!session) {
    throw new Error("Unauthorised");
  }

  const user = session?.user as {
    authorization: string;
    id: string;
    username: string;
    profilePicture: string;
  };

  const [inputs, setInputs] = useState<InputType>({
    username: "",
    email: "",
    description: "",
    profilePicture: "",
    currentPassword: "",
    newPassword: "",
    confirmationPassword: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      const { username, email, description, profilePicture } = await get(
        `/user/${user.id}`,
        {},
        {
          authorization: user.authorization,
          id: user.id,
        }
      );
      setInputs({
        username,
        email,
        description,
        profilePicture,
        currentPassword: "",
        newPassword: "",
        confirmationPassword: "",
      });
      setInitialLoading(false);
    };
    fetchUser();
  }, []);

  const readyToSubmit = useMemo(
    () =>
      inputs.username &&
      inputs.email &&
      inputs.description &&
      inputs.profilePicture &&
      ((inputs.currentPassword &&
        inputs.newPassword &&
        inputs.confirmationPassword &&
        inputs.newPassword === inputs.confirmationPassword) ||
        !(
          inputs.currentPassword &&
          inputs.newPassword &&
          inputs.confirmationPassword
        )),
    [inputs]
  );

  const updateImage = (target: HTMLInputElement) => {
    if (target.files) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        setInputs((prev: InputType) => ({
          ...prev,
          profilePicture: e.target.result,
        }));
      };
      reader.readAsDataURL(target.files[0]);
    }
  };

  const handleOnSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const {
      username,
      email,
      currentPassword: oldPassword,
      newPassword: newPassword,
      description,
      profilePicture,
    } = inputs;
    const body =
      oldPassword || newPassword
        ? {
            username,
            email,
            oldPassword,
            newPassword,
            description,
            profilePicture,
          }
        : {
            username,
            email,
            description,
            profilePicture,
          };
    setLoading(true);
    const res = await put(`/user/${user.id}`, body, {
      authorization: user.authorization,
      id: user.id,
    });
    if (res.errorCode) {
      setError(res.errorMessage);
      setLoading(false);
      return;
    }
    setLoading(false);
    router.refresh();
  };

  return (
    <div className="space-y-8 p-16">
      <Back />
      {initialLoading ? (
        <div className="flex items-center justify-center">
          <Spinner fill="#000000" />
        </div>
      ) : (
        <>
          <form
            name="edit-user-profile"
            id="edit-user-profile"
            className="space-y-16"
            onSubmit={handleOnSubmit}
          >
            <div className="flex flex-wrap justify-center gap-x-16 gap-y-16">
              {/* Profile Page Left Section */}
              <div className="relative space-y-6">
                <label
                  htmlFor="edit-profile-picture"
                  className="relative cursor-pointer"
                >
                  <Image
                    alt="Profile Picture"
                    src={inputs.profilePicture}
                    width={240}
                    height={240}
                    className="w-60 h-60 rounded-full object-cover"
                  />
                  <div className="absolute bottom-0 right-0 bg-ll-dark-pink p-4 rounded-md">
                    <PencilIcon className="w-5 h-5 text-white" />
                  </div>
                </label>
                <input
                  type="file"
                  id="edit-profile-picture"
                  name="profile-picture"
                  accept="image/png, image/jpeg"
                  className="hidden"
                  onChange={(e: FormEvent<HTMLInputElement>) =>
                    updateImage(e.target as HTMLInputElement)
                  }
                />
                <h1 className="text-2xl font-bold text-center">
                  Profile Picture
                </h1>
                {error && <p className="text-red-500 text-center">{error}</p>}
              </div>
              <div className="space-y-16 flex-1 min-w-[320px]">
                <div className="space-y-8">
                  <h2 className="text-2xl font-bold">Account Details</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        className="block font-medium mb-1"
                        htmlFor="edit-username"
                      >
                        Username
                      </label>
                      <input
                        type="text"
                        name="username"
                        id="edit-username"
                        placeholder="Enter username"
                        value={inputs.username}
                        onChange={(e) =>
                          setInputs((prev: InputType) => ({
                            ...prev,
                            username: e.target.value,
                          }))
                        }
                        className="w-full border rounded-md p-2 bg-ll-beige placeholder-ll-beige2 outline-none"
                      />
                    </div>
                    <div>
                      <label
                        className="block font-medium mb-1"
                        htmlFor="edit-email"
                      >
                        Email
                      </label>
                      <input
                        type="text"
                        name="email"
                        id="edit-email"
                        placeholder="Enter email"
                        value={inputs.email}
                        onChange={(e) =>
                          setInputs((prev: InputType) => ({
                            ...prev,
                            email: e.target.value,
                          }))
                        }
                        className="w-full border rounded-md p-2 bg-ll-beige placeholder-ll-beige2 outline-none"
                      />
                    </div>
                    <div className="col-span-2">
                      <label
                        htmlFor="edit-description"
                        className="block font-medium mb-1"
                      >
                        Description
                      </label>
                      <textarea
                        name="description"
                        id="edit-description"
                        className="w-full border rounded-md p-2 bg-ll-beige placeholder-ll-beige2 outline-none resize-none"
                        rows={4}
                        value={inputs.description}
                        onChange={(e) =>
                          setInputs((prev: InputType) => ({
                            ...prev,
                            description: e.target.value,
                          }))
                        }
                        placeholder="Enter description"
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div className="space-y-8">
                  <h2 className="text-2xl font-bold">Change Password</h2>
                  <div>
                    <label
                      className="block font-medium"
                      htmlFor="edit-current-password"
                    >
                      Current Password
                    </label>
                    <input
                      type="password"
                      name="currentPassword"
                      id="edit-current-password"
                      placeholder="Enter current password"
                      value={inputs.currentPassword}
                      onChange={(e) =>
                        setInputs((prev: InputType) => ({
                          ...prev,
                          currentPassword: e.target.value,
                        }))
                      }
                      className="w-full border rounded-md p-2 bg-ll-beige placeholder-ll-beige2 outline-none"
                    />
                  </div>
                  <div>
                    <label
                      className="block font-medium"
                      htmlFor="edit-new-password"
                    >
                      New Password
                    </label>
                    <input
                      type="password"
                      name="newPassword"
                      id="edit-new-password"
                      placeholder="Enter new password"
                      value={inputs.newPassword}
                      onChange={(e) =>
                        setInputs((prev: InputType) => ({
                          ...prev,
                          newPassword: e.target.value,
                        }))
                      }
                      className="w-full border rounded-md p-2 bg-ll-beige placeholder-ll-beige2 outline-none"
                    />
                  </div>
                  <div>
                    <label
                      className="block font-medium"
                      htmlFor="edit-confirmation-password"
                    >
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      name="confirmationPassword"
                      id="edit-confirmation-password"
                      placeholder="Enter confirmation password"
                      value={inputs.confirmationPassword}
                      onChange={(e) =>
                        setInputs((prev: InputType) => ({
                          ...prev,
                          confirmationPassword: e.target.value,
                        }))
                      }
                      className="w-full border rounded-md p-2 bg-ll-beige placeholder-ll-beige2 outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
            <button
              type="submit"
              disabled={!readyToSubmit || loading}
              className="px-8 py-3 rounded-md bg-ll-dark-pink font-bold text-white ml-auto block hover:bg-ll-dark-pink/80 duration-150 transition-all"
            >
              {loading ? <Spinner /> : "Update Profile"}
            </button>
          </form>
        </>
      )}
    </div>
  );
}
