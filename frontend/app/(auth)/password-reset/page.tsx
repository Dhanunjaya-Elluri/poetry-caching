import Logo from "@/components/common/Logo";
import { PasswordResetForm } from "@/components/forms";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Validaitor",
  description:
    "Validaitor is a tool for testing the robustness, fairness, security, and performance of machine learning models.",
};

export default function Page() {
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-slate-900 shadow">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Logo />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
          Reset your password
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <PasswordResetForm />
      </div>
    </div>
  );
}
