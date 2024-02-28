"use client";

import { FormEvent, useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { BiLogoGoogle } from 'react-icons/bi';
import { BiSolidShow } from 'react-icons/bi';
import { BiSolidHide } from 'react-icons/bi';

const Signup = () => {
  const [error, setError] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  const labelStyles = "w-full text-sm";

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session, router]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const formData = new FormData(event.currentTarget);
      const signupResponse = await axios.post(`${process.env.NEXT_PUBLIC_APP_URL}/api/auth/signup`, {
        email: formData.get("email"),
        password: formData.get("password"),
        name: formData.get("name"),
        phone: formData.get("phone"),
      });

      const res = await signIn("credentials", {
        email: signupResponse.data.email,
        password: formData.get("password"),
        redirect: false,
      });

      if (res?.ok) return router.push("/");
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        const errorMessage = error.response?.data.message;
        setError(errorMessage);
      }
    }
  };

  return (
    <section className="w-full h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="p-6 xs:p-10	w-full max-w-[350px] flex flex-col justify-between items-center gap-2.5	
        border border-solid border-[#242424] bg-[#0a0a0a] rounded"
      >
        {error && <div className="">{error}</div>}
        <h1 className="mb-5 w-full text-2xl	font-bold">Signup</h1>

        <label className={labelStyles}>Fullname:</label>
        <input
          type="text"
          placeholder="Fullname"
          className="w-full h-8 border border-solid border-[#242424] py-1 px-2.5 rounded bg-black text-[13px]"
          name="name"
        />

        <label className={labelStyles}>Email:</label>
        <input
          type="email"
          placeholder="Email"
          className="w-full h-8 border border-solid border-[#242424] py-1 px-2.5 rounded bg-black text-[13px]"
          name="email"
        />

        <label className={labelStyles}>Password:</label>
        <div className="flex w-full">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full h-8 border border-solid border-[#242424] py-1 px-2.5 rounded-l bg-black text-[13px]"
            name="password"
          />
          <button
            className="w-2/12	border-y border-r border-solid border-[#242424] bg-black rounded-r 
            flex items-center justify-center transition duration-150 ease hover:bg-[#1A1A1A]"
            onClick={(e) => {
              e.preventDefault();
              setShowPassword(!showPassword)
            }}
          >
            {showPassword ? <BiSolidHide /> : <BiSolidShow />}
          </button>
        </div>

        <label className={labelStyles}>Phone:</label>
        <input
          type="text"
          placeholder="Phone (not required)"
          className="w-full h-8 border border-solid border-[#242424] py-1 px-2.5 rounded bg-black text-[13px]"
          name="phone"
        />

        <button className="w-full bg-black border border-solid border-[#242424] py-1.5 mt-2.5 rounded
        transition duration-150 ease hover:bg-[#1A1A1A] text-[13px]">
          Signup
        </button>

        <div className="w-full h-10	relative flex items-center justify-center">
          <div className="absolute h-px w-full top-2/4 bg-[#242424]"></div>
          <p className="w-8	h-6 bg-[#0a0a0a] z-10 flex items-center justify-center">or</p>
        </div>

        <button
          className="flex py-2 px-4 text-sm	align-middle items-center rounded text-999 bg-black 
          border border-solid border-[#242424] transition duration-150 ease hover:bg-[#1A1A1A] gap-3"
          onClick={() => signIn("google")}>
          <BiLogoGoogle className="text-2xl" /> Sign in with Google
        </button>
        <Link href="/login" className="text-sm	text-[#888] transition duration-150 ease hover:text-white">
          Already have an account?
          </Link>
      </form>
    </section>
  );
}

export default Signup;
