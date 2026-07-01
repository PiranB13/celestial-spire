const clients = ['RugbyConnect', 'Growing Futures Cornwall', 'Sensory Cove', 'Serenity Hypnotherapy'];

export default function TrustBar() {
  return (
    <div className="border-y border-border/50 bg-card/30 py-5" aria-label="Clients we have worked with">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center lg:justify-between flex-wrap gap-x-10 gap-y-3">
        <span className="font-mono-tech text-[11px] text-muted-foreground tracking-widest uppercase">
          Trusted by
        </span>
        <ul className="flex items-center gap-x-10 gap-y-2 flex-wrap list-none">
          {clients.map((name) => (
            <li key={name} className="text-sm font-semibold text-foreground/40">{name}</li>
          ))}
        </ul>
        <span className="hidden lg:inline-flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" aria-hidden="true" />
          <span className="font-mono-tech text-[11px] text-primary tracking-widest uppercase">
            Project spots open this month
          </span>
        </span>
      </div>
    </div>
  );
}
