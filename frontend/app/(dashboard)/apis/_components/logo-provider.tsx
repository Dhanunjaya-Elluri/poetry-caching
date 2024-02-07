import Image from 'next/image';
import { Providers } from '@/enum/api_providers';

interface LogoProps {
  provider?: string;
  width: number;
  height: number;
}


const LogoProvider: React.FC<LogoProps> = ({ provider, width, height }: LogoProps) => {
  let content;
  if (provider && Object.values(Providers).includes(provider)) {
    const imageSrc = `/${provider}_Logo.svg`; // Use backticks (`) instead of regular quotes
    content = (
      <Image
        src={imageSrc}
        alt={`${provider}_Logo`} // Interpolate the alt text as well
        width={width}
        height={height}
      />
    );
  } else {
    const imageSrc = '/Default_Logo.svg';
    content = (
      <Image
        src={imageSrc}
        alt={`${provider}_Logo`}
        width={width}
        height={width}
      />
    );
  }

  return (
    <div className='flex items-center justify-center'>
      {content}
    </div>
  );
};

export default LogoProvider;
