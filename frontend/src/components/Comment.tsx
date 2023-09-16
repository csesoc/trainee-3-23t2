"use client";

import { defaultPfp } from "@/util/defaultpfp";
import Image from "next/image";
import { HandThumbUpIcon } from "@heroicons/react/24/outline";
import ReplyModal from "@/components/ReplyModal";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { post } from "@/util/request";
import { useRouter } from "next/navigation";

export default function Comment({ comment }: { comment: any }) {
  const router = useRouter();
  const [expanded, setExpanded] = useState(false);
  const c = comment;

  const { data: session } = useSession();
  const user = session?.user as {
    authorization: string;
    id: string;
    username: string;
    profilePicture: string;
  };

  const commentLiked = user && c.likes.includes(user.id);

  const likeComment = async (like: boolean) => {
    if (!user) return;
    await post(
      `/comment/like/${c.commentId}`,
      { like },
      { authorization: user.authorization, id: user.id }
    );
    router.refresh();
  };

  const likeReply = async (replyId: string, like: boolean) => {
    if (!user) return;
    await post(
      `/reply/like/${replyId}`,
      { like },
      { authorization: user.authorization, id: user.id }
    );
    router.refresh();
  };

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
        <div
          className={`flex gap-2 items-center relative ${
            user
              ? "cursor-pointer"
              : "cursor-not-allowed hover:after:content-['Not_Signed_In!'] hover:after:-top-8 hover:after:-left-full hover:after:px-2 hover:after:py-1 hover:after:min-w-max hover:after:text-sm hover:after:bg-black/75 hover:after:absolute hover:after:rounded-md hover:after:text-white"
          } ${commentLiked ? "text-ll-dark-pink" : "text-black"}`}
          onClick={() => likeComment(!commentLiked)}
        >
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
                <div
                  className={`flex gap-2 items-center relative ${
                    user
                      ? "cursor-pointer"
                      : "cursor-not-allowed hover:after:content-['Not_Signed_In!'] hover:after:-top-8 hover:after:-left-full hover:after:px-2 hover:after:py-1 hover:after:min-w-max hover:after:text-sm hover:after:bg-black/75 hover:after:absolute hover:after:rounded-md hover:after:text-white"
                  } ${
                    user && r.likes.includes(user.id)
                      ? "text-ll-dark-pink"
                      : "text-black"
                  }`}
                  onClick={() =>
                    likeReply(r.replyId, !(user && r.likes.includes(user.id)))
                  }
                >
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
