import "@/styles/globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import Provider from "@/redux/provider";
import { Setup } from "@/components/utils";
import { Toaster } from "sonner"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Validaitor",
  description:
    "Validaitor is a tool for testing the robustness, fairness, security, and performance of machine learning models.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <Setup />
          {children}
        </Provider>
        <Toaster richColors/>
      </body>
    </html>
  );
}
