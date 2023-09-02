import { HeartIcon } from "@heroicons/react/24/solid"

export default function Divider() {
    return (
        <div className="flex justify-startt">
            <HeartIcon className="text-ll-dark-pink scale-50"/>
            <HeartIcon className="text-ll-dark-pink scale-50"/>
            <HeartIcon className="text-ll-dark-pink scale-50"/>
            <div className="border-t border-gray-300 my-4"></div>
        </div>
    );
};
