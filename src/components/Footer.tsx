import { Mail, Phone } from 'lucide-react';

const serviceLinks = [
  { label: 'Website design & creation', href: '/#services' },
  { label: 'Redesign & SEO optimisation', href: '/#services' },
  { label: 'E-commerce & web apps', href: '/#services' },
  { label: 'Branding & identity', href: '/#pricing' },
];

const companyLinks = [
  { label: 'Our process', href: '/#process' },
  { label: 'Recent work', href: '/#portfolio' },
  { label: 'Pricing', href: '/#pricing' },
  { label: 'FAQ', href: '/#faq' },
  { label: 'DIY vs. hiring a pro (guide)', href: '/guides/build-vs-hire' },
];

const Footer = () => (
  <footer className="relative border-t border-border/50 pt-14 pb-8 bg-card/20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
        {/* Brand */}
        <div className="lg:col-span-1">
          <a href="/" className="flex items-center gap-2.5 mb-4" aria-label="AI Web Solutions — home">
            <span className="w-8 h-8 rounded-lg bg-primary/15 border border-primary/40 flex items-center justify-center">
              <span className="text-primary font-bold text-sm">AI</span>
            </span>
            <span className="font-semibold text-foreground">AI Web Solutions</span>
          </a>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Expert web design and development for UK small businesses. Fixed
            prices, fast delivery, hand-finished quality.
          </p>
        </div>

        {/* Services */}
        <nav aria-label="Services">
          <h2 className="text-sm font-semibold text-foreground mb-4">Services</h2>
          <ul className="space-y-2.5">
            {serviceLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Company */}
        <nav aria-label="Company">
          <h2 className="text-sm font-semibold text-foreground mb-4">Company</h2>
          <ul className="space-y-2.5">
            {companyLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact */}
        <div>
          <h2 className="text-sm font-semibold text-foreground mb-4">Contact</h2>
          <ul className="space-y-2.5">
            <li>
              <a
                href="mailto:PiranBeumkes@AIWebSolution.co.uk"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors break-all"
              >
                <Mail className="w-4 h-4 shrink-0 text-primary" aria-hidden="true" />
                PiranBeumkes@AIWebSolution.co.uk
              </a>
            </li>
            <li>
              <a
                href="tel:+447435517255"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Phone className="w-4 h-4 shrink-0 text-primary" aria-hidden="true" />
                07435 517255
              </a>
            </li>
            <li>
              <a
                href="/#contact"
                className="inline-block mt-2 px-4 py-2 rounded-lg bg-primary/10 border border-primary/30 text-sm font-medium text-primary hover:bg-primary/20 transition-colors"
              >
                Get a free quote
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border/50 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} AI Web Solutions. All rights reserved.
        </p>
        <p className="text-xs text-muted-foreground font-mono-tech">Crafted with care in the UK</p>
      </div>
    </div>
  </footer>
);

export default Footer;
