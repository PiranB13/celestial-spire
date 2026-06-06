import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { z } from "https://esm.sh/zod@3.23.8";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const RECIPIENT = "piranbeumkes13@gmail.com";

const contactSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  industry: z.string().trim().max(100).optional(),
  budget: z.string().trim().max(50).optional(),
  message: z.string().trim().max(1000).optional(),
});

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    let raw: unknown;
    try {
      raw = await req.json();
    } catch {
      return new Response(JSON.stringify({ error: "Invalid request" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const parsed = contactSchema.safeParse(raw);
    if (!parsed.success) {
      return new Response(JSON.stringify({ error: "Invalid input" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
    const body = parsed.data;

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
    console.error("send-contact-email error:", e);
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
