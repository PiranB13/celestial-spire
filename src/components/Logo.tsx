import { useState } from 'react';

interface LogoProps {
  domain?: string;
  size?: number;
  className?: string;
  showText?: boolean;
}

const Logo = ({
  domain = 'aiwebsolution.co.uk',
  size = 32,
  className = '',
  showText = true,
}: LogoProps) => {
  const [error, setError] = useState(false);
  const publishableKey = import.meta.env.VITE_LOVABLE_CONNECTOR_LOGO_DEV_API_KEY;

  const hasLogo = publishableKey && !error;

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
        {hasLogo ? (
          <img
            src={`https://img.logo.dev/${domain}?token=${publishableKey}&size=${size * 2}&theme=dark&fallback=monogram`}
            alt="AI Web Solutions logo"
            width={size}
            height={size}
            referrerPolicy="origin"
            className="w-full h-full object-contain p-1"
            onError={() => setError(true)}
          />
        ) : (
          <span className="text-primary font-bold text-sm">AI</span>
        )}
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
