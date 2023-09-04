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
import { get } from "@/util/request";

export default function MakeAPost() {
  const [enabled, setEnabled] = useState(false);
  const [themes, setThemes] = useState([]);
  const [selectedTheme, setSelectedTheme] = useState<{
    themeId: string;
    name: string;
    backgroundColor: string;
    textColor: string;
    image: string;
  }>();
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const textAreaRef = useRef<HTMLInputElement>(null);

  // Indicate form ready to submit
  const readyToSubmit = useMemo(
    () => description.length > 0 && description.length <= 500,
    [description]
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
    setImages((prev: string[]) => [...prev].splice(index, 1));
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

  // TODO: CALL BACKEND HERE TO CREATE POST ALONG WITH HEADERS (FROM EVAN)
  const handleOnSubmit = (e: FormEvent) => {};

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
                src=""
                alt="Profile Picture"
                width={32}
                height={32}
                className="rounded-full"
              />
              <span className="font-semibold">Username</span>
            </div>
            {/* Text area */}
            <div className="flex-grow">
              <label htmlFor="make-a-post-description" className="sr-only">
                Insert Description
              </label>
              <textarea
                name="description"
                id="make-a-post-description"
                value={description}
                onChange={(e: FormEvent<HTMLTextAreaElement>) =>
                  setDescription((e.target as HTMLTextAreaElement).value)
                }
                placeholder="Insert description..."
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
                  maxLength={10}
                  className="hidden"
                  ref={textAreaRef}
                  onChange={(e: FormEvent<HTMLInputElement>) =>
                    updateImages(e.target as HTMLInputElement)
                  }
                ></input>
              </div>
              <div>
                <span className="text-sm text-gray-500">
                  {500 - description.length} characters left. Min 1 character.
                  Max 500 characters.{" "}
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
                      className="border-2 border-black/25 p-2 rounded-lg cursor-pointer"
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
            <BinarySwitch enabled={enabled} setEnabled={setEnabled} />
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
                      ? "border-accent shadow-lg shadow-accent/15"
                      : "border-black/25"
                  }`}
                  onClick={() => setSelectedTheme(t)}
                >
                  {/* Selected Indicator */}
                  <div className="flex flex-wrap-reverse justify-between gap-4">
                    <span className="font-bold capitalize">{t.name}</span>
                    {selectedTheme && selectedTheme.themeId === t.themeId ? (
                      <div className="h-6 w-6 border-2 border-accent rounded-full relative">
                        <div className="h-4 w-4 rounded-full bg-accent absolute top-[2px] left-[2px]"></div>
                      </div>
                    ) : (
                      <div className="h-6 w-6 border-2 border-black/25 rounded-full"></div>
                    )}
                  </div>
                  {/* TODO: Change to Kris's post card component */}
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
                        src=""
                        alt="Profile Picture"
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                      <span className="font-semibold">Username</span>
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
        className={`px-8 py-3 ml-auto block text-white font-bold rounded-lg ${
          !readyToSubmit
            ? "bg-accent/50 cursor-not-allowed"
            : "bg-accent cursor-pointer"
        }`}
        type="submit"
        form="make-a-post"
        disabled={!readyToSubmit}
      >
        Create Post
      </button>
    </div>
  );
}
