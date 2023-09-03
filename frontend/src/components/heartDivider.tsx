import { HeartIcon } from "@heroicons/react/24/solid"

export default function Divider() {
    return (
        <div className="flex flex-row h-4 space-x-3">
            <HeartIcon className="text-ll-dark-pink"/>
            <HeartIcon className="text-ll-dark-pink"/>
            <HeartIcon className="text-ll-dark-pink"/>
            {/* <div className="border-t border-gray-300 my-4"></div> */}
            <hr className="w-11/12 h-0.5 border-0 rounded md:my-1.5 dark:bg-ll-dark-pink"/>
        </div>
    );
};
