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
      <span className="relative flex items-center justify-center p-1.5 rounded-xl bg-card/80 border border-border/60 shadow-lg shadow-primary/10 ring-1 ring-primary/10 transition-all duration-300 group-hover:border-primary/40 group-hover:shadow-primary/20">
        <img
          src={logoAsset}
          alt="AI Web Solutions — Smarter websites, expert craftsmanship"
          height={size}
          style={{ height: size, width: 'auto' }}
          className="object-contain relative z-10"
        />
      </span>
    </a>
  );
};

export default Logo;
