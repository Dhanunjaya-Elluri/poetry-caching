import Link from "next/link";
import { LoginForm } from "@/components/forms";
import type { Metadata } from "next";
import PlatformLoginImage from "@/components/common/PlatformLoginImage";

export const metadata: Metadata = {
  title: "Validaitor",
  description:
    "Validaitor is a tool for testing the robustness, fairness, security, and performance of machine learning models.",
};

export default function Page() {
  return (
    <div className="flex h-screen bg-slate-900 shadow">
      {/* left side */}
      <div className="hidden lg:flex items-center justify-center lg:w-6/12 xl:w-7/12">
        <div className="w-full ml-20">
          <PlatformLoginImage />
        </div>
      </div>
      {/* right side */}
      <div className="w-full flex items-center sm:w-full md:w-full justify-center lg:w-6/12 xl:w-5/12">
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 ">
          <div className="mt-10 mx-auto w-1/2 max-w-sm sm:mx-auto sm:w-1/2 sm:max-w-sm">
            <div style={{ transform: "scale(1.4)" }} className="mb-10">
              <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-white mb-5">
                Sign in to your account
              </h2>
              <LoginForm />
              <p className="mt-10 text-center text-sm text-white">
                Don&apos;t have an account?{" "}
                <Link
                  href="/auth/register"
                  className="font-semibold leading-6 text-validaitorBlue hover:text-white"
                >
                  Register here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
