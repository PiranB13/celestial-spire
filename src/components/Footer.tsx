import { motion } from 'framer-motion';

const Footer = () => (
  <motion.footer
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8 }}
    className="relative border-t border-border/50 py-12"
  >
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-primary/20 border border-primary/40 flex items-center justify-center">
            <span className="text-primary font-bold text-xs">AI</span>
          </div>
          <span className="font-semibold text-foreground text-sm">AI Web Solutions</span>
        </div>
        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          <a href="/#services" className="hover:text-primary transition-colors">Services</a>
          <a href="/#portfolio" className="hover:text-primary transition-colors">Portfolio</a>
          <a href="/#pricing" className="hover:text-primary transition-colors">Pricing</a>
          <a href="/guides/build-vs-hire" className="hover:text-primary transition-colors">Guide</a>
          <a href="/#contact" className="hover:text-primary transition-colors">Contact</a>
        </div>
        <p className="text-xs text-muted-foreground font-mono-tech">
          Crafted with care · © {new Date().getFullYear()}
        </p>
      </div>
    </div>
  </motion.footer>
);

export default Footer;
