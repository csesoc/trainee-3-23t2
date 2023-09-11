"use client";

import Back from "@/components/Back";
import BinarySwitch from "@/components/BinarySwitch";
import Image from "next/image";
import {
  ChatBubbleBottomCenterIcon,
  HandThumbUpIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { get, post } from "@/util/request";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Spinner from "@/components/Spinner";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";

export default function MakeAPost() {
  const router = useRouter();
  const [anonymous, setAnonymous] = useState(false);
  const [themes, setThemes] = useState([]);
  const [selectedTheme, setSelectedTheme] = useState<{
    themeId: string;
    name: string;
    backgroundColor: string;
    textColor: string;
    image: string;
  }>();
  const [message, setMessage] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const textAreaRef = useRef<HTMLInputElement>(null);
  const { data: session } = useSession();
  const [afterLoading, setAfterLoading] = useState("");

  if (!session) {
    throw new Error("Unauthorised");
  }

  const user = session.user as {
    authorization: string;
    id: string;
    profilePicture: string;
    username: string;
  };

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

  // Get All Themes
  useEffect(() => {
    const getAllThemes = async () => {
      const { themes } = await get("/themes");
      setSelectedTheme(themes[0]);
      setThemes(themes);
    };
    getAllThemes();
  }, []);

  const handleOnSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!session || !session.user || afterLoading || loading) return;
    setLoading(true);
    const { authorization, id } = session.user as {
      authorization: string;
      id: string;
    };
    const res = await post(
      "/post",
      {
        message,
        images,
        anonymous,
        themeId: selectedTheme?.themeId,
      },
      {
        authorization,
        id,
      }
    );
    setLoading(false);
    setAfterLoading("Post created");
    if (res.errorCode) {
      setError(res.errorMessage);
      return;
    }
    setError("");
    router.refresh();
  };

  useEffect(() => {
    if (!afterLoading) return;
    const timeout = setTimeout(() => {
      setAfterLoading("");
    }, 3000);
    return () => clearTimeout(timeout);
  }, [afterLoading]);

  return (
    <div className="flex flex-col min-h-screen gap-8 py-12 px-8 md:px-16">
      <Back />
      <div className="flex flex-wrap flex-grow gap-8">
        {/* Left Side */}
        <div className="flex flex-col gap-y-8 w-full lg:flex-1">
          {/* Make A Post Section */}
          <h1 className="text-2xl font-bold">Make A Post</h1>
          {/* Post Section */}
          <form
            style={{
              backgroundColor: selectedTheme?.backgroundColor,
              color: selectedTheme?.textColor,
            }}
            className="flex flex-col gap-y-4 p-6 rounded-lg shadow-lg flex-grow relative"
            name="make-a-post"
            id="make-a-post"
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
              <label htmlFor="make-a-post-message" className="sr-only">
                Insert Description
              </label>
              <textarea
                name="message"
                id="make-a-post-message"
                value={message}
                onChange={(e: FormEvent<HTMLTextAreaElement>) =>
                  setMessage((e.target as HTMLTextAreaElement).value)
                }
                placeholder="Insert message..."
                className="resize-none outline-none h-full w-full bg-transparent"
              />
            </div>
            {/* Insert Images */}
            <div className="flex justify-between items-center gap-4 flex-wrap">
              <div>
                <label className="cursor-pointer" htmlFor="make-a-post-images">
                  <div className="flex gap-4 items-center">
                    <PhotoIcon className="w-6 h-6" />
                    <span className="font-bold">Insert Images</span>
                  </div>
                </label>
                <input
                  id="make-a-post-images"
                  name="files"
                  type="file"
                  accept="image/png, image/jpeg"
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
                  {500 - message.length} characters left. Min 1 character. Max
                  500 characters and 5 images.{" "}
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
                      className="border-2 border-black/25 p-2 rounded-lg object-contain cursor-pointer"
                      onClick={() => deleteImage(index)}
                    />
                  ))}
                </div>
              </>
            )}
            <Image
              src={selectedTheme?.image ?? ""}
              alt={selectedTheme?.name ?? ""}
              width={64}
              height={32}
              objectFit=""
              className="h-8 absolute right-5 top-5 opacity-25 object-contain"
            />
          </form>
          {/* Display as anonymous */}
          <div className="flex gap-4 items-center">
            <span className="font-bold">Display as Anonymous?</span>
            <BinarySwitch enabled={anonymous} setEnabled={setAnonymous} />
          </div>
        </div>
        {/* Right side */}
        <div className="space-y-8 w-full lg:flex-1">
          <h2 className="text-2xl font-bold">Themes</h2>
          <div className="grid gap-6 grid-cols-[repeat(auto-fit,_minmax(220px,_1fr))]">
            {themes.map(
              (t: {
                themeId: string;
                name: string;
                backgroundColor: string;
                textColor: string;
                image: string;
              }) => (
                <div
                  className={`border-2 rounded-lg p-4 cursor-pointer space-y-4 ${
                    selectedTheme && selectedTheme.themeId === t.themeId
                      ? "border-ll-dark-pink shadow-lg shadow-ll-dark-pink/15"
                      : "border-black/25"
                  }`}
                  onClick={() => setSelectedTheme(t)}
                >
                  {/* Selected Indicator */}
                  <div className="flex flex-wrap-reverse justify-between gap-4">
                    <span className="font-bold capitalize">{t.name}</span>
                    {selectedTheme && selectedTheme.themeId === t.themeId ? (
                      <div className="h-6 w-6 border-2 border-ll-dark-pink rounded-full relative">
                        <div className="h-4 w-4 rounded-full bg-ll-dark-pink absolute top-[2px] left-[2px]"></div>
                      </div>
                    ) : (
                      <div className="h-6 w-6 border-2 border-black/25 rounded-full"></div>
                    )}
                  </div>
                  <div
                    style={{
                      backgroundColor: t.backgroundColor,
                      color: t.textColor,
                    }}
                    className="p-6 space-y-4 rounded-lg shadow-md relative"
                  >
                    {/* Profile */}
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
                    <p className="line-clamp-3 h-[3ch] text-black/50 break-all">
                      Description here...
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <HandThumbUpIcon className="w-6 h-6" />
                      <ChatBubbleBottomCenterIcon className="w-6 h-6" />
                    </div>
                    <Image
                      src={t.image}
                      alt={t.name}
                      width={64}
                      height={32}
                      objectFit=""
                      className="h-8 absolute right-3 top-3 opacity-25 object-contain"
                    />
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
      <button
        className={`px-8 py-3 ml-auto block text-white font-bold rounded-lg transition-all duration-150 ${
          !readyToSubmit || !session || !session.user || afterLoading || loading
            ? afterLoading
              ? "bg-green-500 cursor-not-allowed"
              : "bg-ll-dark-pink/50 cursor-not-allowed"
            : "bg-ll-dark-pink cursor-pointer"
        }`}
        type="submit"
        form="make-a-post"
        disabled={
          (!readyToSubmit ||
            !session ||
            !session.user ||
            afterLoading ||
            loading) as boolean
        }
      >
        {!loading ? (
          afterLoading ? (
            <div className="flex gap-2 items-center">
              <CheckBadgeIcon className="w-4 h-4" />
              <p>{afterLoading}</p>
            </div>
          ) : (
            "Create Post"
          )
        ) : (
          <Spinner />
        )}
      </button>
    </div>
  );
}
