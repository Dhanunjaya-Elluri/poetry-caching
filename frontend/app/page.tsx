import type { Metadata } from "next";
import { LandingNavbar } from "@/components/landing/landing_navbar";
import { LandingHero } from "@/components/landing/landing_hero";
import Footer from "@/components/landing/footer";
import Content from "@/components/landing/landing-content";

export const metadata: Metadata = {
  title: "Validaitor",
  description:
    "Validaitor is a tool for testing the robustness, fairness, security, and performance of machine learning models.",
};

export default function Page() {
  return (
    <div>
      <div>
        <LandingNavbar />
      </div>
      <div className="w-full bg-slate-900 shadow pt-20">
        <LandingHero />
        <Content />
        <Footer />
      </div>
    </div>
  );
}
