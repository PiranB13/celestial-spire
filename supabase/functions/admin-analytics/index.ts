// Admin analytics edge function
// Password-gated proxy to Google Search Console + Semrush via the Lovable connector gateway.
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY")!;
const GSC_KEY = Deno.env.get("GOOGLE_SEARCH_CONSOLE_API_KEY")!;
const SEMRUSH_KEY = Deno.env.get("SEMRUSH_API_KEY")!;
const ADMIN_PASSWORD = Deno.env.get("ADMIN_DASHBOARD_PASSWORD")!;

const GATEWAY = "https://connector-gateway.lovable.dev";

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

async function gscFetch(path: string, init: RequestInit = {}) {
  const res = await fetch(`${GATEWAY}/google_search_console${path}`, {
    ...init,
    headers: {
      ...(init.headers || {}),
      Authorization: `Bearer ${LOVABLE_API_KEY}`,
      "X-Connection-Api-Key": GSC_KEY,
    },
  });
  const body = await res.text();
  if (!res.ok) throw new Error(`GSC ${res.status}: ${body}`);
  return body ? JSON.parse(body) : {};
}

async function semrushFetch(path: string) {
  const res = await fetch(`${GATEWAY}/semrush${path}`, {
    headers: {
      Authorization: `Bearer ${LOVABLE_API_KEY}`,
      "X-Connection-Api-Key": SEMRUSH_KEY,
    },
  });
  const body = await res.text();
  if (!res.ok) throw new Error(`Semrush ${res.status}: ${body}`);
  return body ? JSON.parse(body) : {};
}

function daysAgo(n: number) {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - n);
  return d.toISOString().slice(0, 10);
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  try {
    const { password, action, params } = await req.json();
    if (!password || !ADMIN_PASSWORD || !timingSafeEqual(String(password), ADMIN_PASSWORD)) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    let result: unknown;
    const p = params ?? {};
    const end = p.endDate ?? daysAgo(3);
    const start = p.startDate ?? daysAgo(31);

    switch (action) {
      case "verify":
        result = { ok: true };
        break;

      case "gsc_sites":
        result = await gscFetch("/webmasters/v3/sites");
        break;

      case "gsc_summary": {
        if (!p.siteUrl) throw new Error("siteUrl required");
        const encoded = encodeURIComponent(p.siteUrl);
        result = await gscFetch(`/webmasters/v3/sites/${encoded}/searchAnalytics/query`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ startDate: start, endDate: end, dimensions: ["date"], rowLimit: 90 }),
        });
        break;
      }

      case "gsc_queries": {
        if (!p.siteUrl) throw new Error("siteUrl required");
        const encoded = encodeURIComponent(p.siteUrl);
        result = await gscFetch(`/webmasters/v3/sites/${encoded}/searchAnalytics/query`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ startDate: start, endDate: end, dimensions: ["query"], rowLimit: 25 }),
        });
        break;
      }

      case "gsc_pages": {
        if (!p.siteUrl) throw new Error("siteUrl required");
        const encoded = encodeURIComponent(p.siteUrl);
        result = await gscFetch(`/webmasters/v3/sites/${encoded}/searchAnalytics/query`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ startDate: start, endDate: end, dimensions: ["page"], rowLimit: 25 }),
        });
        break;
      }

      case "semrush_limits":
        result = await semrushFetch("/user/limits");
        break;

      case "semrush_domain": {
        const domain = p.domain ?? "aiwebsolution.co.uk";
        const database = p.database ?? "uk";
        const cols = "Db,Dn,Rk,Or,Ot,Oc,Ad,At,Ac,Sh,Sv";
        result = await semrushFetch(
          `/domains/domain_ranks?domain=${encodeURIComponent(domain)}&database=${database}&export_columns=${cols}`,
        );
        break;
      }

      case "semrush_backlinks_overview": {
        const target = p.domain ?? "aiwebsolution.co.uk";
        const cols = "ascore,total,domains_num,urls_num,ips_num,follows_num,nofollows_num,texts_num,images_num";
        result = await semrushFetch(
          `/backlinks/backlinks_overview?target=${encodeURIComponent(target)}&target_type=root_domain&export_columns=${cols}`,
        );
        break;
      }

      case "semrush_organic_keywords": {
        const domain = p.domain ?? "aiwebsolution.co.uk";
        const database = p.database ?? "uk";
        const cols = "Ph,Po,Nq,Cp,Ur,Tr,Kd";
        result = await semrushFetch(
          `/domains/domain_organic?domain=${encodeURIComponent(domain)}&database=${database}&display_limit=25&export_columns=${cols}`,
        );
        break;
      }

      default:
        throw new Error(`Unknown action: ${action}`);
    }

    return new Response(JSON.stringify({ data: result }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("admin-analytics error:", msg);
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
