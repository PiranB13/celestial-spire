import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;

export default function Unsubscribe() {
  const [params] = useSearchParams();
  const token = params.get('token');
  const [state, setState] = useState<'loading' | 'valid' | 'already' | 'invalid' | 'success' | 'error'>('loading');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!token) { setState('invalid'); return; }
    (async () => {
      try {
        const res = await fetch(`${SUPABASE_URL}/functions/v1/handle-email-unsubscribe?token=${encodeURIComponent(token)}`, {
          headers: { apikey: SUPABASE_PUBLISHABLE_KEY },
        });
        const data = await res.json();
        if (data.valid) setState('valid');
        else if (data.reason === 'already_unsubscribed') setState('already');
        else setState('invalid');
      } catch {
        setState('error');
      }
    })();
  }, [token]);

  const confirm = async () => {
    if (!token) return;
    setSubmitting(true);
    try {
      const { data, error } = await supabase.functions.invoke('handle-email-unsubscribe', { body: { token } });
      if (error) throw error;
      if (data?.success) setState('success');
      else if (data?.reason === 'already_unsubscribed') setState('already');
      else setState('error');
    } catch {
      setState('error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4 bg-background">
      <div className="glass rounded-2xl p-8 max-w-md w-full border border-border/50 text-center">
        <h1 className="text-2xl font-bold mb-3 text-foreground">Unsubscribe</h1>
        {state === 'loading' && <p className="text-muted-foreground text-sm">Checking your link...</p>}
        {state === 'valid' && (
          <>
            <p className="text-muted-foreground text-sm mb-6">Click below to unsubscribe from emails.</p>
            <button onClick={confirm} disabled={submitting} className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-semibold disabled:opacity-70">
              {submitting ? 'Processing...' : 'Confirm unsubscribe'}
            </button>
          </>
        )}
        {state === 'already' && <p className="text-muted-foreground text-sm">You're already unsubscribed.</p>}
        {state === 'success' && <p className="text-muted-foreground text-sm">You've been unsubscribed. Sorry to see you go.</p>}
        {state === 'invalid' && <p className="text-muted-foreground text-sm">This unsubscribe link is invalid or expired.</p>}
        {state === 'error' && <p className="text-muted-foreground text-sm">Something went wrong. Please try again later.</p>}
      </div>
    </main>
  );
}
