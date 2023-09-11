import { HeartIcon } from "@heroicons/react/24/solid"

export default function Divider() {
    return (
        <div className="flex flex-row space-x-3 items-center">
            <HeartIcon className="text-ll-dark-pink h-4"/>
            <HeartIcon className="text-ll-dark-pink h-4"/>
            <HeartIcon className="text-ll-dark-pink h-4"/>
            {/* <div className="border-t border-gray-300 my-4"></div> */}
            <hr className="w-11/12 h-0.5 border-0 rounded md:my-1.5 dark:bg-ll-dark-pink"/>
            <HeartIcon className="text-ll-dark-pink h-4"/>
        </div>
    );
};
