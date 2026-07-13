import logoAsset from '@/assets/aiweb-logo-transparent.png';

interface LogoProps {
  size?: number;
  className?: string;
  showText?: boolean;
}

const Logo = ({
  size,
  className = '',
  showText = true,
}: LogoProps) => {
  return (
    <a
      href="/"
      className={`flex items-center group ${className}`}
      aria-label="AI Web Solutions — home"
    >
      <img
        src={logoAsset}
        alt="AI Web Solutions — Smarter websites, expert craftsmanship"
        height={size}
        style={size ? { height: size, width: 'auto' } : undefined}
        className={`object-contain brightness-0 invert w-auto ${
          size ? '' : 'h-16 sm:h-24 md:h-28 lg:h-36 xl:h-[220px]'
        }`}
      />
    </a>
  );
};

export default Logo;
