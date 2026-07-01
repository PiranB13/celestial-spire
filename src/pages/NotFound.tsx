import { Helmet } from "react-helmet-async";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="relative flex min-h-dvh items-center justify-center bg-background text-foreground overflow-hidden">
      <Helmet>
        <title>Page not found — AI Web Solutions</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <div className="absolute inset-0 bg-grid opacity-30" aria-hidden="true" />
      <main className="relative z-10 text-center px-4">
        <p className="font-mono-tech text-xs text-primary tracking-widest uppercase mb-4">Error 404</p>
        <h1 className="text-5xl lg:text-7xl font-extrabold mb-4">
          Page <span className="text-gradient">not found</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-md mx-auto mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors glow-static"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          Back to home
        </Link>
      </main>
    </div>
  );
};

export default NotFound;
