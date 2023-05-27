"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Avatar from "./Avatar";

export default function NavBar() {
  const { data: session } = useSession();
  return (
    <nav className="font-bold flex justify-between flex-wrap md:flex-nowrap border-b">
      <div className="w-full text-3xl p-4 sm:w-1/2">
        <Link href="/">Command Survival</Link>
      </div>
      <div className="text-xl">
        <Link className="p-4" href="/about">
          About
        </Link>
        {session ? (
          <>
            <button className="p-4" onClick={() => signOut()}>
              Log out
            </button>
            <div className="hidden items-center justify-end px-4 py-2 sm:flex">
              <span className="mr-4 text-sm text-gray-600">
                {session.user?.name ?? "용사"}님 접속중
              </span>
              <Avatar userImage={session.user?.image} />
            </div>
          </>
        ) : (
          <button className="p-4" onClick={() => signIn()}>
            Log in
          </button>
        )}
      </div>
    </nav>
  );
}
