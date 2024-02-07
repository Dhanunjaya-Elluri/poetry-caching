import { Linkedin } from "lucide-react";
import Link from "next/link";

const Footer = () => (
  <section className="">
    <div className="w-full flex justify-between items-center md:flex-row flex-col pt-6 pb-6 border-t-[1px] border-t-[#3F3E45]">
      <p className="font-poppins font-normal text-center text-[18px] leading-[27px] text-white px-20">
        Copyright Ⓒ 2024 Validaitor. All Rights Reserved.
      </p>
      <div className="flex flex-row md:mt-0 mt-6 text-white px-20">
        <Link
          href="https://www.linkedin.com/company/validaitor/mycompany/"
          key={"link"}
        >
          <Linkedin size={25} />
        </Link>
      </div>
    </div>
  </section>
);

export default Footer;
