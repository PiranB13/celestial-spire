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
      <span className="relative flex items-center justify-center p-1 sm:p-1.5 rounded-xl bg-card/80 shadow-lg shadow-primary/10 transition-all duration-300 group-hover:shadow-primary/20">
        <img
          src={logoAsset}
          alt="AI Web Solutions — Smarter websites, expert craftsmanship"
          height={size}
          style={size ? { height: size, width: 'auto' } : undefined}
          className={`object-contain relative z-10 brightness-0 invert w-auto ${
            size ? '' : 'h-14 sm:h-20 md:h-24 lg:h-32 xl:h-[200px]'
          }`}
        />
      </span>
    </a>
  );
};

export default Logo;
