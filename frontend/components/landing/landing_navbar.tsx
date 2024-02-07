"use client";

import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import ValidaitorLogo from "@/public/validaitor_cropped_logo_transparent_white.png";

const font = Montserrat({ weight: "600", subsets: ["latin"] });

export const LandingNavbar = () => {
  return (
    <nav
      id="header"
      className="fixed w-full z-30 top-0 text-white bg-slate-900 shadow"
    >
      <div className="w-full mx-auto flex flex-wrap items-center justify-between mt-0 py-5 px-24">
        <div className="pl-4 flex items-center">
          <a
            className="toggleColour text-white no-underline hover:no-underline font-bold text-2xl lg:text-4xl"
            href="/"
          >
            <Image src={ValidaitorLogo} alt="logo" width={270} height={66} />
          </a>
        </div>
       <div
          className="w-full flex-grow sm:flex sm:items-center sm:w-auto mt-2 sm:mt-0 bg-slate-900 shadow sm:bg-transparent text-black p-4 lg:p-0 z-20"
          id="nav-content"
        >
          <ul className="list-reset lg:flex justify-end flex-1 items-center"></ul>
          <Link
              href="/auth/register"
              className="rounded-md bg-validaitorBlue px-6 py-2 text-xl font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              Register
            </Link>
          <Link
              href="/auth/login"
              className="rounded-md bg-validaitorBlue px-6 py-2 text-xl font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ml-8"
            >
              Sign in
            </Link>

        </div>
      </div>
    </nav>
  );
};
