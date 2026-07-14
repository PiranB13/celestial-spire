import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

export default defineTool({
  name: "submit_contact_enquiry",
  title: "Submit contact enquiry",
  description:
    "Send a project enquiry to AI Web Solution. The team responds within 24 hours with a quote and starting plan.",
  inputSchema: {
    name: z.string().trim().min(1).max(100).describe("Full name of the person enquiring."),
    email: z.string().trim().email().max(255).describe("Reply-to email address."),
    industry: z.string().trim().max(100).optional().describe("Industry or type of business."),
    budget: z
      .enum(["300plus", "500plus", "1000plus", "2000plus"])
      .optional()
      .describe("Budget tier: 300plus (£300+ Basic), 500plus (£500+ Pro), 1000plus (£1,000+ Expert), 2000plus (£2,000+ Full Brand)."),
    message: z
      .string()
      .trim()
      .max(1000)
      .optional()
      .describe("What you are building, timelines, and anything else that helps us quote."),
  },
  annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: false, openWorldHint: true },
  handler: async (input) => {
    const env = (globalThis as { Deno?: { env: { get(key: string): string | undefined } } }).Deno?.env;
    const supabaseUrl = env?.get("SUPABASE_URL");
    const anonKey = env?.get("SUPABASE_ANON_KEY") ?? env?.get("SUPABASE_PUBLISHABLE_KEY");
    if (!supabaseUrl || !anonKey) {
      return {
        content: [{ type: "text", text: "Contact form is not available right now." }],
        isError: true,
      };
    }
    try {
      const res = await fetch(`${supabaseUrl}/functions/v1/send-contact-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${anonKey}`,
          apikey: anonKey,
        },
        body: JSON.stringify(input),
      });
      if (!res.ok) {
        const text = await res.text();
        return {
          content: [{ type: "text", text: `Failed to submit enquiry: ${res.status} ${text}` }],
          isError: true,
        };
      }
      return {
        content: [
          {
            type: "text",
            text: `Enquiry submitted for ${input.name} <${input.email}>. The team will respond within 24 hours.`,
          },
        ],
        structuredContent: { ok: true },
      };
    } catch (err) {
      return {
        content: [{ type: "text", text: `Failed to submit enquiry: ${(err as Error).message}` }],
        isError: true,
      };
    }
  },
});
