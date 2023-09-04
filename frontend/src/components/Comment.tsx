"use client";

import { defaultPfp } from "@/util/defaultpfp";
import Image from "next/image";
import { HandThumbUpIcon } from "@heroicons/react/24/outline";
import ReplyModal from "@/components/ReplyModal";
import { useState } from "react";

export default function Comment({ comment }: { comment: any }) {
  const [expanded, setExpanded] = useState(false);
  const c = comment;

  return (
    <div className="space-y-4">
      {/* Profile Picture */}
      <div className="flex gap-4 items-center">
        <Image
          src={c.anonymous ? defaultPfp : c.author.profilePicture}
          alt="Profile Picture"
          width={32}
          height={32}
          className="rounded-full"
        />
        <span className="font-semibold truncate">
          {c.anonymous ? "Anonymous" : c.author.username}
        </span>
      </div>
      <p className="break-all">{c.message}</p>
      {c.images.length !== 0 && (
        <div className="flex flex-wrap gap-4">
          {c.images.map((i: any, index: number) => (
            <Image
              src={i}
              alt={`Image ${index + 1}`}
              width={96}
              height={96}
              className="object-contain h-24 w-24"
            />
          ))}
        </div>
      )}
      <div className="flex gap-4 items-center flex-wrap">
        <div className="flex gap-2 items-center">
          {/* TODO: Like indicator when user already liked */}
          <HandThumbUpIcon className="w-5 h-5" />
          {c.likes.length}
        </div>
        <ReplyModal replyLength={c.replies.length} commentId={c.commentId} />
        <span
          className="font-bold text-md cursor-pointer"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "Hide all replies" : "Show all replies"}
        </span>
      </div>
      {/* Replies */}
      {expanded && (
        <div className="ml-10 space-y-4">
          {c.replies.map((r: any) => (
            <div className="space-y-4">
              {/* Profile Picture */}
              <div className="flex gap-4 items-center">
                <Image
                  src={r.anonymous ? defaultPfp : r.author.profilePicture}
                  alt="Profile Picture"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <span className="font-semibold truncate">
                  {c.anonymous ? "Anonymous" : r.author.username}
                </span>
              </div>
              <p className="break-all">{r.message}</p>
              {r.images.length !== 0 && (
                <div className="flex flex-wrap gap-4">
                  {r.images.map((i: any, index: number) => (
                    <Image
                      src={i}
                      alt={`Image ${index + 1}`}
                      width={96}
                      height={96}
                      className="object-contain h-24 w-24"
                    />
                  ))}
                </div>
              )}
              <div className="flex gap-4 items-center flex-wrap">
                {/* TODO: Like indicator when user already liked */}
                <div className="flex gap-2 items-center">
                  <HandThumbUpIcon className="w-5 h-5" />
                  {r.likes.length}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <hr />
    </div>
  );
}
