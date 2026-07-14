import * as React from "npm:react@18.3.1";
import { renderAsync } from "npm:@react-email/components@0.0.22";
import { createClient } from "npm:@supabase/supabase-js@2";
import { z } from "https://esm.sh/zod@3.23.8";
import { template as contactNotification } from "../_shared/transactional-email-templates/contact-notification.tsx";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const RECIPIENT = "piranbeumkes13@gmail.com";
const SITE_NAME = "aiwebsolution";
const SENDER_DOMAIN = "notify.contact.aiwebsolution.co.uk";
const FROM_DOMAIN = "contact.aiwebsolution.co.uk";

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

    // Render and enqueue the notification email directly (same pattern as auth-email-hook).
    try {
      const templateData = {
        name: body.name,
        email: body.email,
        industry: body.industry || "Not provided",
        budget: body.budget || "Not provided",
        message: body.message || "No message",
      };

      const html = await renderAsync(React.createElement(contactNotification.component, templateData));
      const text = await renderAsync(React.createElement(contactNotification.component, templateData), { plainText: true });
      const subject =
        typeof contactNotification.subject === "function"
          ? contactNotification.subject(templateData)
          : contactNotification.subject;

      const messageId = crypto.randomUUID();

      await supabase.from("email_send_log").insert({
        message_id: messageId,
        template_name: "contact-notification",
        recipient_email: RECIPIENT,
        status: "pending",
      });

      const { error: enqueueError } = await supabase.rpc("enqueue_email", {
        queue_name: "transactional_emails",
        payload: {
          message_id: messageId,
          to: RECIPIENT,
          from: `${SITE_NAME} <noreply@${FROM_DOMAIN}>`,
          sender_domain: SENDER_DOMAIN,
          subject,
          html,
          text,
          purpose: "transactional",
          label: "contact-notification",
          idempotency_key: `contact-${messageId}`,
          queued_at: new Date().toISOString(),
        },
      });

      if (enqueueError) {
        console.error("Enqueue error:", enqueueError);
        await supabase.from("email_send_log").insert({
          message_id: messageId,
          template_name: "contact-notification",
          recipient_email: RECIPIENT,
          status: "failed",
          error_message: "Failed to enqueue notification email",
        });
      }
    } catch (e) {
      console.error("Email render/enqueue failed:", e);
    }

    return new Response(JSON.stringify({ ok: true }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (e) {
    console.error("send-contact-email error:", e);
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
