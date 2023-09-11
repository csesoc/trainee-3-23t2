import { HandThumbUpIcon } from "@heroicons/react/24/outline"
import { ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/outline"
import Image from "next/image"
import Link from 'next/link';

type PostCardProps = {
    msg: string,
    textColor: string,
    backgroundColor: string,
    image: string,
    name: string,
    likes: number,
    comments: number,
    profile: string,
    username: string,
    anonymous: boolean,
    id: string,
}

const PostCard: React.FC<PostCardProps> = (props: PostCardProps) => {
    // idk why the fuck u have this cause u were tryna truncate it BUT U DONT NEED
    // if (props.msg.length > 210) {
    //     var shorten_msg = props.msg.slice(0, 210); 
    // } else {
    //     var shorten_msg = props.msg
    // }
    
    const baseUrl = process.env.API_URL ?? "http://localhost:3000/post/";
    const url = `${baseUrl}${props.id}`;

    return (
        <Link href={url}>
        <div 
            style={{ 
                backgroundColor: props.backgroundColor,
                color: props.textColor
            }}
            className= "shadow-lg rounded-lg">
            <div className="flex flex-col p-5 left-5 gap-y-3">
                <div className="flex flex-row gap-x-2 relative items-center flex-wrap">
                    {/* <div className="flex flex-row items-center gap-x-3"> */}
                    {/* <div className="w-6 h-6 bg-red-600 rounded-full"></div> */}
                    <img src={props.profile} className="w-6 h-6 bg-red-600 rounded-full"></img>
                    <p className="font-semibold text-xs">{props.anonymous ? props.username : 'Anonymous'}</p>
                    {/* </div> */}
                    <Image
                        src={props.image}
                        alt={props.name}
                        width={30}
                        height={30}
                        objectFit=""
                        className="h-8 absolute right-0 top-0 opacity-25 object-contain"
                    />
                    {/* <img src={props.image} className="w-6 opacity-25"></img> */}
                </div>
                {/* <div className="justify-center relative top-2 w-10/12"> */}
                <p className="text-xs line-clamp-3 h-[11ch]">{props.msg}</p>
                {/* </div> */}
                {/* <div> */}
                <div className="flex flex-row items-center gap-x-2">
                    <HandThumbUpIcon className="w-5"/>
                    <p className="text-xs">{props.likes}</p>
                    <ChatBubbleBottomCenterTextIcon className="w-5" />
                    <p className="text-xs">{props.comments}</p>
                </div>

            </div>
        </div>
        </Link>
    );
};

export default PostCard;