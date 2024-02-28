"use client"

import { SignOutButton } from "@/components/SignOutButton";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Home() {
  const { status } = useSession();

  const showSession = () => {
    if (status === "authenticated") {
      return (
        <SignOutButton />
      )
    } else if (status === "loading") {
      return (
        <span className="text-[#888] text-sm mt-7">Loading...</span>
      )
    } else {
      return (
        <Link
          href="/login"
          className="text-[#888] text-sm text-999 mt-7 transition duration-150 ease hover:text-white"
        >
          Login here
        </Link>
      )
    }
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-xl">NextAuth APP</h1>
      {showSession()}
    </main>
  );
}
