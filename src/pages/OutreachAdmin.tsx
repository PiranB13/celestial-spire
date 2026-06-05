import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

const ALLOWED_EMAIL = "piranbeumkes13@gmail.com";

const OutreachAdmin = () => {
  const [sessionEmail, setSessionEmail] = useState<string | null>(null);
  const [checking, setChecking] = useState(true);

  // Auth form
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authBusy, setAuthBusy] = useState(false);

  // Compose form
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    document.title = "Outreach";
    const meta = document.querySelector('meta[name="robots"]');
    if (meta) meta.setAttribute("content", "noindex,nofollow");
    else {
      const m = document.createElement("meta");
      m.name = "robots";
      m.content = "noindex,nofollow";
      document.head.appendChild(m);
    }

    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      setSessionEmail(session?.user?.email ?? null);
    });
    supabase.auth.getSession().then(({ data }) => {
      setSessionEmail(data.session?.user?.email ?? null);
      setChecking(false);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthBusy(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: authEmail,
      password: authPassword,
    });
    setAuthBusy(false);
    if (error) toast({ title: "Sign in failed", description: error.message, variant: "destructive" });
  };

  const handleSignUp = async () => {
    if (!authEmail || !authPassword) {
      toast({ title: "Enter email and password first", variant: "destructive" });
      return;
    }
    setAuthBusy(true);
    const { error } = await supabase.auth.signUp({
      email: authEmail,
      password: authPassword,
      options: { emailRedirectTo: `${window.location.origin}/outreach-admin` },
    });
    setAuthBusy(false);
    if (error) toast({ title: "Sign up failed", description: error.message, variant: "destructive" });
    else toast({ title: "Account created", description: "Check your email if confirmation is required, then sign in." });
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    const { data, error } = await supabase.functions.invoke("send-outreach-email", {
      body: { to, subject, body },
    });
    setSending(false);
    if (error || (data as any)?.error) {
      toast({
        title: "Send failed",
        description: error?.message || (data as any)?.error || "Unknown error",
        variant: "destructive",
      });
      return;
    }
    toast({ title: "Email queued", description: `Sending to ${to}` });
    setTo("");
    setSubject("");
    setBody("");
  };

  if (checking) {
    return <div className="min-h-screen flex items-center justify-center bg-background text-foreground">Loading…</div>;
  }

  const authorized = sessionEmail?.toLowerCase() === ALLOWED_EMAIL.toLowerCase();

  return (
    <div className="min-h-screen bg-background text-foreground px-4 py-10">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Outreach</h1>

        {!sessionEmail && (
          <form onSubmit={handleSignIn} className="space-y-4 border border-border rounded-lg p-6 bg-card">
            <h2 className="text-xl font-semibold">Sign in</h2>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={authEmail} onChange={(e) => setAuthEmail(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value={authPassword} onChange={(e) => setAuthPassword(e.target.value)} required />
            </div>
            <div className="flex gap-2">
              <Button type="submit" disabled={authBusy}>Sign in</Button>
              <Button type="button" variant="outline" onClick={handleSignUp} disabled={authBusy}>
                Create account
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              First time? Click "Create account" with your email ({ALLOWED_EMAIL}) and a strong password.
            </p>
          </form>
        )}

        {sessionEmail && !authorized && (
          <div className="border border-border rounded-lg p-6 bg-card space-y-4">
            <p>Signed in as <strong>{sessionEmail}</strong>, but this page is restricted.</p>
            <Button onClick={handleSignOut} variant="outline">Sign out</Button>
          </div>
        )}

        {authorized && (
          <>
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-muted-foreground">Signed in as {sessionEmail}</p>
              <Button onClick={handleSignOut} variant="ghost" size="sm">Sign out</Button>
            </div>
            <form onSubmit={handleSend} className="space-y-4 border border-border rounded-lg p-6 bg-card">
              <div className="space-y-2">
                <Label htmlFor="to">Recipient email</Label>
                <Input id="to" type="email" value={to} onChange={(e) => setTo(e.target.value)} required placeholder="company@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} required maxLength={200} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="body">Body</Label>
                <Textarea id="body" value={body} onChange={(e) => setBody(e.target.value)} required rows={12} maxLength={10000} />
              </div>
              <Button type="submit" disabled={sending}>{sending ? "Sending…" : "Send email"}</Button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default OutreachAdmin;
