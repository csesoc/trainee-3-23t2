import { HandThumbUpIcon } from "@heroicons/react/24/outline"

type PostCardProps = {
    msg: string
}

const PostCard: React.FC<PostCardProps> = (props: PostCardProps) => {
    // idk why the fuck u have this cause u were tryna truncate it BUT U DONT NEED
    if (props.msg.length > 210) {
        var shorten_msg = props.msg.slice(0, 210); 
    } else {
        var shorten_msg = props.msg
    }
    
    return (
        <div className= "w-1/5 shadow-lg rounded-lg">
            <div className="flex flex-col p-5 left-5 gap-y-3">
                <div className="flex flex-row gap-x-3 items-center flex-wrap">
                    <div className="w-10 h-10 bg-red-600 rounded-full"></div>
                    <p className="font-semibold">Username</p>
                </div>
                {/* <div className="justify-center relative top-2 w-10/12"> */}
                <p className="text-sm line-clamp-3 h-[7ch]">{props.msg}</p>
                {/* </div> */}
                {/* <div> */}
                <HandThumbUpIcon className="w-5"/>

            </div>
        </div>
    );
};

export default PostCard;