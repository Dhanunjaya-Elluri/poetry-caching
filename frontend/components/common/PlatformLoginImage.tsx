import Image from "next/image";
import loginImage from "@/public/images/login_image.png";

interface LogoProps {
  useLogoWithText?: boolean;
  width?: number;
  height?: number;
}

const PlatformLoginImage: React.FC<LogoProps> = () => {
  return (
    <div className="flex items-center justify-center">
      <Image
        src={loginImage}
        alt="Validaitor-Logo"
        width="0"
        height="0"
        sizes="100vw"
        priority={true}
        className="w-full h-auto"
      />
    </div>
  );
};

export default PlatformLoginImage;
