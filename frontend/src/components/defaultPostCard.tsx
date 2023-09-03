
type PostCardProps = {
    msg: string
}

const PostCard: React.FC<PostCardProps> = (props: PostCardProps) => {
    if (props.msg.length > 210) {
        var shorten_msg = props.msg.slice(0, 210); 
    } else {
        var shorten_msg = props.msg
    }
    
    return (
        <div className= "w-1/5 h-52 shadow-lg rounded-lg">
            <div className="flex flex-col">
                <div className="flex flex-row relative top-5 left-5">
                    <div className="w-10 h-10 bg-red-600 rounded-full"></div>
                    <strong>Username</strong>
                </div>
                <p className="relative top-7 left-5 text-sm">{shorten_msg}</p>
            </div>
        </div>
    );
};

export default PostCard;