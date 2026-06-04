import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface Payload {
  name: string;
  email: string;
  industry?: string;
  budget?: string;
  message?: string;
}

const RECIPIENT = "piranbeumkes13@gmail.com";

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const body: Payload = await req.json();
    if (!body.name || !body.email) {
      return new Response(JSON.stringify({ error: "Missing fields" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Persist the submission
    const { error: insertErr } = await supabase.from("contact_submissions").insert({
      name: body.name,
      email: body.email,
      industry: body.industry ?? null,
      budget: body.budget ?? null,
      message: body.message ?? null,
    });
    if (insertErr) console.error("Insert error:", insertErr);

    // Forward via Lovable transactional email if available
    try {
      const { error: emailErr } = await supabase.functions.invoke("send-transactional-email", {
        body: {
          templateName: "contact-notification",
          recipientEmail: RECIPIENT,
          idempotencyKey: `contact-${crypto.randomUUID()}`,
          templateData: {
            name: body.name,
            email: body.email,
            industry: body.industry || "Not provided",
            budget: body.budget || "Not provided",
            message: body.message || "No message",
          },
        },
      });
      if (emailErr) console.error("Email forward error:", emailErr);
    } catch (e) {
      console.error("Email infra not ready:", e);
    }

    return new Response(JSON.stringify({ ok: true }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: String(e) }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
