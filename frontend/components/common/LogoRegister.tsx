import Image from 'next/image';

interface LogoProps {
  useLogoWithText?: boolean;
  width?: number;
  height?: number;
}

const LogoRegister: React.FC<LogoProps> = () => {
  return (
    <div className='flex items-center justify-center'>
      <Image
        src={'/validaitor_logo_black.svg'}
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

export default LogoRegister;
