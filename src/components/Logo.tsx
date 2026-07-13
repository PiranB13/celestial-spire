import logoAsset from '@/assets/ai-web-solutions-icon.png.asset.json';

interface LogoProps {
  size?: number;
  className?: string;
  showText?: boolean;
}

const Logo = ({
  size = 32,
  className = '',
  showText = true,
}: LogoProps) => {
  return (
    <a
      href="/"
      className={`flex items-center gap-2.5 group ${className}`}
      aria-label="AI Web Solutions — home"
    >
      <span
        className="rounded-lg bg-primary/15 border border-primary/40 flex items-center justify-center overflow-hidden group-hover:glow-border transition-shadow duration-300"
        style={{ width: size, height: size }}
      >
        <img
          src={logoAsset.url}
          alt="AI Web Solutions logo"
          width={size}
          height={size}
          className="w-full h-full object-contain p-1"
        />
      </span>
      {showText && (
        <span className="font-semibold text-foreground text-sm lg:text-base">
          AI Web Solutions
        </span>
      )}
    </a>
  );
};

export default Logo;
