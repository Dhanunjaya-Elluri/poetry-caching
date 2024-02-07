"use client";

import { CarouselPlugin } from "./carousel";

export const LandingHero = () => {
  return (
    <div>
      <div className="py-24 px-6 text-center bg-slate-900 shadow">
        <h1 className="mt-2 mb-6 text-5xl font-bold tracking-tight md:text-6xl xl:text-7xl text-white">
          Safety & Trust for <br />
          <span className="text-primary text-white">
            Artificial Intelligence
          </span>
        </h1>
        <div className="max-w-xl mx-auto mb-8 text-xl text-center xl.:max-w-2xl text-validaitorBlue">
          The platform for testing, auditing and certifying AI.
        </div>
        <div className="max-w-2xl mx-auto mb-10 text-xl text-center xl.:max-w-2xl text-primary">
          <p className="text-2xl text-primary pt-16 text-white font-bold">
            LLM Safety Made Easy
          </p>
          <p className="text-primary pt-2 text-white">
            Validaitor’s LLM module comprehensively evaluates your LLM based
            applications to ensure maximum control for safety, reliability and
            bias.
          </p>
        </div>
      </div>
      <div className="max-w-4xl mx-auto mb-8 pt-10 text-xl text-center">
        <CarouselPlugin />
      </div>
    </div>
  );
};
