"use client";

import Link from "next/link";

export default function Error({ error }: { error: Error }) {
  return (
    <>
      {error.message === "Unauthorised" ? (
        <div className="flex justify-center items-center flex-col h-screen gap-4">
          <h1 className="font-bold text-lg">Unauthorised</h1>
          <h2 className="font-bold text-9xl">401</h2>
          <p className="max-w-md text-center">
            You don't have the required access to access this page.
          </p>
          <Link
            className="bg-ll-dark-pink text-white font-bold p-4 inline-block rounded-lg transition-all duration-150 hover:bg-red-500/75"
            href="/"
          >
            Return to Home
          </Link>
        </div>
      ) : (
        <div className="flex justify-center items-center flex-col h-screen gap-4">
          <h1 className="font-bold text-lg">Something broke :(</h1>
          <h2 className="font-bold text-9xl">500</h2>
          <p className="max-w-md text-center">
            Sorry, something broke in our end :( Please try again later.
          </p>
          <Link
            className="bg-ll-dark-pink text-white font-bold p-4 inline-block rounded-lg transition-all duration-150 hover:bg-red-500/75"
            href="/"
          >
            Return to Home
          </Link>
        </div>
      )}
    </>
  );
}
