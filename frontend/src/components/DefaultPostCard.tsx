import { HandThumbUpIcon } from "@heroicons/react/24/outline";
import { ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { defaultPfp } from "@/util/defaultpfp";

type PostCardProps = {
  msg: string;
  textColor: string;
  backgroundColor: string;
  image: string;
  name: string;
  likes: number;
  comments: number;
  profile: string;
  username: string;
  anonymous: boolean;
  id: string;
};

const PostCard: React.FC<PostCardProps> = (props: PostCardProps) => {
  const baseUrl = process.env.API_URL ?? "http://localhost:3000/post/";
  const url = `${baseUrl}${props.id}`;

  return (
    <a href={url}>
      <div
        style={{
          backgroundColor: props.backgroundColor,
          color: props.textColor,
        }}
        className="shadow-lg rounded-lg"
      >
        <div className="flex flex-col p-5 left-5 gap-y-3">
          <div className="flex flex-row gap-x-2 relative items-center flex-wrap">
            <Image
              src={props.anonymous ? defaultPfp : props.profile}
              alt="Profile picture"
              width={24}
              height={24}
              className="rounded-full"
            ></Image>
            <p className="font-semibold text-xs">
              {props.anonymous ? "Anonymous" : props.username}
            </p>
            <Image
              src={props.image}
              alt={props.name}
              width={30}
              height={30}
              objectFit=""
              className="h-8 absolute right-0 top-0 opacity-25 object-contain"
            />
          </div>
          <p className="text-xs line-clamp-3 h-[11ch]">{props.msg}</p>
          <div className="flex flex-row items-center gap-x-2">
            <HandThumbUpIcon className="w-5" />
            <p className="text-xs">{props.likes}</p>
            <ChatBubbleBottomCenterTextIcon className="w-5" />
            <p className="text-xs">{props.comments}</p>
          </div>
        </div>
      </div>
    </a>
  );
};

export default PostCard;
