"use client";

import { Dialog, Transition } from "@headlessui/react";
import { FormEvent, Fragment, useMemo, useRef, useState } from "react";
import Image from "next/image";
import {
  PhotoIcon,
  ChatBubbleBottomCenterTextIcon,
} from "@heroicons/react/24/outline";
import BinarySwitch from "./BinarySwitch";
import { post } from "@/util/request";
import { useRouter } from "next/navigation";
import Spinner from "./Spinner";
import { useSession } from "next-auth/react";

export default function ReplyModal({
  commentId,
  replyLength,
}: {
  commentId: string;
  replyLength: string;
}) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [anonymous, setAnonymous] = useState(false);
  const [message, setMessage] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const textAreaRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");
  const { data: session } = useSession();

  const user = session?.user as {
    authorization: string;
    id: string;
    username: string;
    profilePicture: string;
  };

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  // Indicate form ready to submit
  const readyToSubmit = useMemo(
    () => message.length > 0 && message.length <= 500 && images.length <= 5,
    [message, images]
  );

  // Display all images uploaded
  const updateImages = (target: HTMLInputElement) => {
    if (target.files) {
      for (let i = 0; i < target.files.length; i++) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          setImages((prev: string[]) => [...prev, e.target.result]);
        };
        reader.readAsDataURL(target.files[i]);
      }
    }
  };

  // Delete target image
  const deleteImage = (index: number) => {
    // Delete image from filelist
    if (textAreaRef.current) {
      const dt = new DataTransfer();
      const files = textAreaRef.current.files ? textAreaRef.current.files : [];

      for (let i = 0; i < files.length; i++) {
        if (index !== i) dt.items.add(files[i]);
      }

      textAreaRef.current.files = dt.files;
    }
    setImages((prev: string[]) => {
      const newArr = [...prev];
      newArr.splice(index, 1);
      return newArr;
    });
  };

  const handleOnSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!session || !session.user) return;
    setLoading(true);
    const { authorization, id } = session.user as {
      authorization: string;
      id: string;
    };
    const res = await post(
      `/reply/${commentId}`,
      {
        message,
        images,
        anonymous,
      },
      {
        authorization,
        id,
      }
    );
    setLoading(false);
    if (res.errorCode) {
      setError(res.errorMessage);
      return;
    }
    setError("");
    closeModal();
    router.refresh();
  };

  return (
    <>
      <div
        className="flex gap-2 items-center cursor-pointer"
        onClick={openModal}
      >
        <ChatBubbleBottomCenterTextIcon className="w-5 h-5" />
        {replyLength}
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all space-y-4">
                  {!session ? (
                    <p>You need to login to use this feature.</p>
                  ) : (
                    <>
                      <Dialog.Title
                        as="p"
                        className="text-lg font-semibold leading-6 text-gray-900"
                      >
                        Add new reply
                      </Dialog.Title>
                      {error && <p className="text-red-500">{error}</p>}
                      {/* Post Section */}
                      <form
                        className="flex flex-col gap-y-4 rounded-lg"
                        name="make-a-reply"
                        id="make-a-reply"
                        onSubmit={handleOnSubmit}
                      >
                        {/* Profile Picture */}
                        <div className="flex gap-4 items-center">
                          <Image
                            src={user.profilePicture}
                            alt="Profile Picture"
                            width={32}
                            height={32}
                            className="rounded-full"
                          />
                          <span className="font-semibold">{user.username}</span>
                        </div>
                        {/* Text area */}
                        <div className="flex-grow">
                          <label
                            htmlFor="make-a-reply-message"
                            className="sr-only"
                          >
                            Insert message
                          </label>
                          <textarea
                            name="message"
                            id="make-a-reply-message"
                            value={message}
                            onChange={(e: FormEvent<HTMLTextAreaElement>) =>
                              setMessage(
                                (e.target as HTMLTextAreaElement).value
                              )
                            }
                            placeholder="Insert message..."
                            className="resize-none outline-none h-full w-full bg-transparent"
                          />
                        </div>
                        {/* Insert Images */}
                        <div className="flex justify-between items-center gap-4 flex-wrap">
                          <div>
                            <label
                              className="cursor-pointer"
                              htmlFor="make-a-reply-images"
                            >
                              <div className="flex gap-4 items-center">
                                <PhotoIcon className="w-6 h-6" />
                                <span className="font-bold">Insert Images</span>
                              </div>
                            </label>
                            <input
                              id="make-a-reply-images"
                              name="files"
                              type="file"
                              accept="image/png, image/jpeg, image/gif"
                              multiple
                              className="hidden"
                              ref={textAreaRef}
                              onChange={(e: FormEvent<HTMLInputElement>) =>
                                updateImages(e.target as HTMLInputElement)
                              }
                            ></input>
                          </div>
                          <div>
                            <span className="text-sm text-gray-500">
                              {500 - message.length} characters left. Min 1
                              character. Max 500 characters and 5 images.{" "}
                            </span>
                          </div>
                        </div>
                        {images.length !== 0 && (
                          <>
                            <span>Uploaded Images:</span>
                            <div className="flex flex-wrap gap-2">
                              {images.map((img: string, index: number) => (
                                <Image
                                  alt={`Image ${index + 1}`}
                                  src={img}
                                  width={96}
                                  height={96}
                                  className="border-2 border-black/25 p-2 rounded-lg cursor-pointer object-contain"
                                  onClick={() => deleteImage(index)}
                                />
                              ))}
                            </div>
                          </>
                        )}
                      </form>
                      {/* Display as anonymous */}
                      <div className="flex gap-4 items-center">
                        <span className="font-bold">Display as Anonymous?</span>
                        <BinarySwitch
                          enabled={anonymous}
                          setEnabled={setAnonymous}
                        />
                      </div>
                      {/* Submit button */}
                      <button
                        className={`px-4 py-2 ml-auto block text-white font-bold rounded-lg transition-all duration-150 ${
                          !readyToSubmit
                            ? "bg-ll-dark-pink/50 cursor-not-allowed"
                            : "bg-ll-dark-pink cursor-pointer"
                        }`}
                        type="submit"
                        form="make-a-reply"
                        disabled={!readyToSubmit}
                      >
                        {!loading ? "Create Reply" : <Spinner />}
                      </button>
                    </>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
