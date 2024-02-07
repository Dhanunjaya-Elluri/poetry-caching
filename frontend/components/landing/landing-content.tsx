import { ThumbsUp } from "lucide-react";
import React from "react";
import Image from "next/image";
import Palace from "@/public/karlsruhe_palace_text.png";
import ValidaitorHelpsImage from "@/public/validaitor-helps-in-every-stage-of-AI-lifecycle.png";

const Content = () => {
  return (
    <section className="">
      <div className="bg-slate-900 shadow py-52">
        <div className="px-44">
          <div className="flex items-center justify-center">
            <h2 className="w-1/2 mb-16 text-center text-4xl md:text-5xl text-white">
              The one-stop shop for AI red-teaming and certification
            </h2>
          </div>
          <p className="mb-16 mx-auto intro sm:max-w-xl text-white">
            The world’s foremost platform that offers comprehensive auditing and
            red teaming capabilities for a wide range of AI systems.
          </p>
          <ul className="flex flex-col flex-wrap justify-center mb-20 text-center sm:flex-row">
            <li className="w-full px-6 mb-8 sm:mb-16 md:w-1/2 lg:w-1/3">
              <span className="flex items-center justify-center w-16 h-16 mx-auto mb-4 text-3xl text-white bg-validaitorBlue rounded-full">
                <ThumbsUp size={30} />
              </span>
              <p className="max-w-xs mx-auto text-lg text-white">
                With a single line of code, get the wholistic MRI of your
                LLM-based application.
              </p>
            </li>
            <li className="w-full px-6 mb-8 sm:mb-16 md:w-1/2 lg:w-1/3">
              <span className="flex items-center justify-center w-16 h-16 mx-auto mb-4 text-3xl text-white bg-validaitorBlue rounded-full">
                <ThumbsUp size={30} />
              </span>
              <p className="max-w-xs mx-auto text-lg text-white">
                No matter you’re evaluating ChatGPT, Anthropic, Llama2 or any
                other one. Validaitor supports every major foundational model.
              </p>
            </li>
            <li className="w-full px-6 mb-8 sm:mb-16 md:w-1/2 lg:w-1/3">
              <span className="flex items-center justify-center w-16 h-16 mx-auto mb-4 text-3xl text-white bg-validaitorBlue rounded-full">
                <ThumbsUp size={30} />
              </span>
              <p className="max-w-xs mx-auto text-lg text-white">
                Full privacy! Thanks to black-box testing.
              </p>
            </li>
          </ul>
        </div>
        <div className="flexCenter max-container relative w-full">
          <div className="px-80">
            <Image
              src={Palace}
              alt="karlsruhe palace"
              className="w-full object-cover object-center rounded-2xl filter mt-5"
            />
          </div>
        </div>
      </div>
      <div>
        <div className="w-3/4 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <p className="font-heading text-center text-4xl md:text-5xl text-white">
              AI Red-Teaming Made Easy
            </p>
          </div>

          <div className="mt-16">
            <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-10 md:gap-y-12">
              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white"></div>
                  <p className="font-heading ml-16 text-xl leading-6 font-bold text-validaitorBlue">
                    Testing as Configuration
                  </p>
                </dt>
                <dd className="mt-2 ml-16 text-lg text-white">
                  Validaitor offers many types of tests just out-of-the-box. You
                  don’t have to write your test code, we cover all major test
                  areas.
                </dd>
              </div>

              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white"></div>
                  <p className="font-heading ml-16 text-xl leading-6 font-bold text-validaitorBlue">
                    CI/CD for ML
                  </p>
                </dt>
                <dd className="mt-2 ml-16 text-lg text-white">
                  Validaitor’s ML testing works behind the scenes. You push your
                  new model and the automated tests run in the background.
                </dd>
              </div>

              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white"></div>
                  <p className="font-heading ml-16 text-xl leading-6 font-bold text-validaitorBlue">
                    Continuous Compliance
                  </p>
                </dt>
                <dd className="mt-2 ml-16 text-lg text-white">
                  As long as you’re using the tests that are provided by
                  Validaitor, we can certify your model automatically.
                </dd>
              </div>

              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white"></div>
                  <p className="font-heading ml-16 text-xl leading-6 font-bold text-validaitorBlue">
                    Iterate Fast
                  </p>
                </dt>
                <dd className="mt-2 ml-16 text-lg text-white">
                  Thanks to our continuous compliance approach, you can shift
                  your models as fast as you like. Be agile. We make
                  certification and compliance automated.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      <div className=" lg:pt-60 sm:pt-20">
        <div className="w-3/4 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <p className="font-heading text-center text-4xl md:text-5xl text-white">
              Validaitor helps in every stage of the AI lifecycle
            </p>
          </div>

          <div className="flexCenter max-container relative w-full">
            <div className="pb-4 px-36 pt-6">
              <Image
                src={ValidaitorHelpsImage}
                alt="boat"
                width={1440}
                height={580}
                className="w-full object-cover object-center rounded-2xl filter mt-5"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="w-3/4 mx-auto px-4 sm:px-6 lg:px-8 xl:mt-40 mt-16 pb-40">
        <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-10 md:gap-y-12">
          <div className="relative">
            <dt>
              <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white"></div>
              <p className="ml-16 text-3xl font-bold text-validaitorBlue">
                We’re on a mission to keep AI safe and trustworthy.
              </p>
            </dt>
            <dd className="pt-10 ml-16 text-lg text-white">
              AI is revolutionary. AI is transformative. AI is used in many
              high-risk application areas that concern human safety and
              security. We enjoy the capabilities of the modern AI systems. BUT…
            </dd>
            <dd className="mt-4 ml-16 text-lg text-white">
              AI systems are vulnerable to adversarial attacks. They can be
              hacked easily. They can leak private information and they can be
              biased as well. Being aware of the problems is the first step in
              fixing them. We took that step and moved further to establish
              trust in AI.
            </dd>
            <dd className="mt-4 ml-16 text-lg text-white">
              We specialize in bringing trust to the AI applications and
              systems. We establish a broader vision to AI quality by bringing
              security, safety, privacy and robustness analysis into the reach
              of the ML practitioners.
            </dd>
          </div>

          <div className="relative">
            <dt>
              <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white"></div>
              <p className="font-heading ml-16 text-2xl leading-6 font-bold text-validaitorBlue">
                We combine cutting-edge AI research with practical industry
                experience.
              </p>
            </dt>
            <dd className="mt-4 ml-16 text-lg text-white">
              Our research and engineering teams strike a sweat balance between
              the research and industry. We take state-of-the-art methods and
              techniques from research and distill them for the practitioners by
              taking applicability and practicality into account.
            </dd>
            <dt>
              <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white"></div>
              <p className="font-heading ml-16 text-2xl leading-6 font-bold text-validaitorBlue xl:pt-12">
                We know your pain, we were there.
              </p>
            </dt>
            <dd className="mt-4 ml-16 text-lg text-white">
              We’re not setting up academic playgrounds. We’re coming from right
              in the middle of the industry and we suffered from the same pains
              and problems. That’s why we’re cracking the barriers of ML testing
              and quality assurance.
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
};

export default Content;
