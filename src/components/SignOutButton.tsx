"use client"

import React from 'react';
import { signOut } from "next-auth/react";

export const SignOutButton = () => {
    return (
        <button
            className="text-[#888] text-sm text-999 mt-7 transition duration-150 ease hover:text-white"
            onClick={() => {
                signOut();
            }}
        >
            Logout here
        </button>
    )
}
