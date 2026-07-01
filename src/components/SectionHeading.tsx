import { type ReactNode } from 'react';
import { StaggerContainer, RevealItem } from './ScrollReveal';

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
}

export default function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <StaggerContainer className="text-center mb-14">
      <RevealItem>
        <p className="font-mono-tech text-xs text-primary tracking-widest uppercase">{eyebrow}</p>
      </RevealItem>
      <RevealItem>
        <h2 className="text-3xl lg:text-5xl font-bold mt-4 mb-4">{title}</h2>
      </RevealItem>
      {description && (
        <RevealItem>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base lg:text-lg">{description}</p>
        </RevealItem>
      )}
    </StaggerContainer>
  );
}
