import Back from "@/components/Back";
import { get } from "@/util/request";
import { notFound } from "next/navigation";
import Image from "next/image";
import { defaultPfp } from "@/util/defaultpfp";
import CommentModal from "@/components/CommentModal";
import Comment from "@/components/Comment";

export default async function PostPage({ params }: { params: { id: string } }) {
  const post = await get(`/post/${params.id}`);

  // Render not found page
  if (post.errorCode) notFound();

  return (
    <div
      style={{
        backgroundColor: post.theme.backgroundColor,
        color: post.theme.textColor,
      }}
      className="px-16 py-12 space-y-8 min-h-screen"
    >
      <Back />
      {/* Profile Picture */}
      <div className="space-y-8 relative">
        <div className="flex gap-4 items-center">
          <Image
            src={post.anonymous ? defaultPfp : post.author.profilePicture}
            alt="Profile Picture"
            width={32}
            height={32}
            className="rounded-full"
          />
          <span className="font-semibold truncate">
            {post.anonymous ? "Anonymous" : post.author.username}
          </span>
        </div>
        <p className="break-all">{post.message}</p>
        <Image
          src={post.theme.image}
          alt={post.theme.name}
          width={64}
          height={32}
          objectFit=""
          className="h-8 absolute right-0 top-0 opacity-25 object-contain"
        />
        {post.images.length !== 0 && (
          <div className="flex flex-wrap gap-4">
            {post.images.map((i: any, index: number) => (
              <Image
                src={i}
                alt={`Image ${index + 1}`}
                width={96}
                height={96}
                objectFit="contain"
                className="contain h-24 w-24"
              />
            ))}
          </div>
        )}
      </div>
      <hr />
      <div className="flex justify-between items-center flex-wrap gap-4">
        <p className="font-bold">{post.comments.length} Comments</p>
        <CommentModal postId={post.postId} />
      </div>
      {/* Zero-length post.comments */}
      {!post.comments.length && (
        <p className="text-black/50">Nothing to show for now :(</p>
      )}
      {/* Comments */}
      <div className="space-y-8">
        {post.comments.map((c: any) => (
          <Comment comment={c} />
        ))}
      </div>
    </div>
  );
}
