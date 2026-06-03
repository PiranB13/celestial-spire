export default function TrustBar() {
  const clients = ['RugbyConnect', 'Growing Futures Cornwall', 'Sensory Cove', 'Serenity Hypnotherapy'];

  return (
    <div className="bg-background/85 backdrop-blur-xl border-t border-border/50 border-b py-3.5 px-10">
      <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-8 flex-wrap">
          <span className="font-mono-tech text-[10px] text-muted-foreground tracking-widest uppercase">Trusted by</span>
          {clients.map((name) => (
            <span key={name} className="text-sm font-semibold text-white/30">{name}</span>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse flex-shrink-0" />
          <span className="font-mono-tech text-[10px] text-primary tracking-widest uppercase">3 slots open this month</span>
        </div>
      </div>
    </div>
  );
}
