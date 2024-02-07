import Image from 'next/image';
import LogoWhite from '@/public/validaitor_logo_white.svg';

interface LogoProps {
  useLogoWithText?: boolean;
  width?: number;
  height?: number;
}

const Logo: React.FC<LogoProps> = () => {
  return (
    <div className='flex items-center justify-center'>
      <Image
        src={LogoWhite}
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

export default Logo;
