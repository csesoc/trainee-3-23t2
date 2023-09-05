import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex justify-center items-center flex-col h-screen gap-4">
      <h1 className="font-bold text-lg">Not Found</h1>
      <h2 className="font-bold text-9xl">404</h2>
      <p className="max-w-md text-center">
        The page you are looking for may have been moved, deleted, or possibly
        never existed
      </p>
      {/* TODO: CHANGE TO ACCENT COLOR */}
      <Link
        className="bg-red-500 text-white font-bold p-4 inline-block rounded-lg transition-all duration-150 hover:bg-red-500/75"
        href="/"
      >
        Return to Home
      </Link>
    </div>
  );
}
