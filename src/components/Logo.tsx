import logoAsset from '@/assets/aiweb-logo-transparent.png';

interface LogoProps {
  size?: number;
  className?: string;
  showText?: boolean;
}

const Logo = ({
  size = 40,
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
        src={logoAsset.url}
        alt="AI Web Solutions — Smarter websites, expert craftsmanship"
        height={size}
        style={{ height: size, width: 'auto' }}
        className="object-contain transition-opacity duration-300 group-hover:opacity-90"
      />
    </a>
  );
};

export default Logo;
