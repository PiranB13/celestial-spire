import { Globe2 } from 'lucide-react';

interface LogoProps {
  size?: number;
  className?: string;
  showText?: boolean;
}

const Logo = ({ className = '', showText = true }: LogoProps) => (
  <a href="/" className={`inline-flex items-center gap-3 shrink-0 text-foreground ${className}`} aria-label="Web Solutions — home">
    <Globe2 className="w-8 h-8 sm:w-9 sm:h-9 text-primary" strokeWidth={1.5} aria-hidden="true" />
    {showText && <span className="text-lg sm:text-xl font-semibold leading-tight">Web<span className="text-primary"> Solutions</span></span>}
  </a>
);

export default Logo;
