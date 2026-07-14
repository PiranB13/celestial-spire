import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";

const FN_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-analytics`;
const ANON = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
const PASSWORD_KEY = "admin_dash_pw";

type Row = Record<string, unknown>;

async function callAdmin(password: string, action: string, params: Row = {}) {
  const res = await fetch(FN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${ANON}`,
      apikey: ANON,
    },
    body: JSON.stringify({ password, action, params }),
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(body.error || `HTTP ${res.status}`);
  return body.data;
}

function num(n: unknown) {
  return typeof n === "number" ? n.toLocaleString() : "—";
}

function DataTable({ headers, rows }: { headers: string[]; rows: (string | number)[][] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border/60">
      <table className="w-full text-sm">
        <thead className="bg-muted/40 text-xs uppercase tracking-wider text-muted-foreground">
          <tr>{headers.map((h) => <th key={h} className="px-3 py-2 text-left font-medium">{h}</th>)}</tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr><td colSpan={headers.length} className="px-3 py-6 text-center text-muted-foreground">No data yet.</td></tr>
          ) : rows.map((r, i) => (
            <tr key={i} className="border-t border-border/40">
              {r.map((c, j) => <td key={j} className="px-3 py-2">{c}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Card({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border/60 bg-card/40 p-4">
      <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="mt-1 text-2xl font-semibold">{value}</div>
    </div>
  );
}

export default function AdminAnalytics() {
  const [password, setPassword] = useState(() => sessionStorage.getItem(PASSWORD_KEY) ?? "");
  const [authed, setAuthed] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [sites, setSites] = useState<{ siteUrl: string; permissionLevel: string }[]>([]);
  const [siteUrl, setSiteUrl] = useState<string>("");
  const [gscSummary, setGscSummary] = useState<Row[]>([]);
  const [gscQueries, setGscQueries] = useState<Row[]>([]);
  const [gscPages, setGscPages] = useState<Row[]>([]);

  const [semDomain, setSemDomain] = useState<Row | null>(null);
  const [semBacklinks, setSemBacklinks] = useState<Row | null>(null);
  const [semKeywords, setSemKeywords] = useState<Row[]>([]);
  const [semError, setSemError] = useState<string | null>(null);
  const [gscError, setGscError] = useState<string | null>(null);

  async function login(e: React.FormEvent) {
    e.preventDefault();
    setAuthError(null);
    try {
      await callAdmin(password, "verify");
      sessionStorage.setItem(PASSWORD_KEY, password);
      setAuthed(true);
    } catch (err) {
      setAuthError(err instanceof Error ? err.message : "Login failed");
    }
  }

  useEffect(() => {
    if (!password) return;
    // Try silent auth from stored password on first mount
    callAdmin(password, "verify")
      .then(() => setAuthed(true))
      .catch(() => sessionStorage.removeItem(PASSWORD_KEY));
  }, []);

  useEffect(() => {
    if (!authed) return;
    setLoading(true);
    (async () => {
      // GSC sites
      try {
        const s = await callAdmin(password, "gsc_sites");
        const entries = (s?.siteEntry ?? []) as { siteUrl: string; permissionLevel: string }[];
        setSites(entries);
        if (entries.length > 0) setSiteUrl(entries[0].siteUrl);
      } catch (err) {
        setGscError(err instanceof Error ? err.message : String(err));
      }

      // Semrush (in parallel with GSC per-site)
      try {
        const [d, b, k] = await Promise.all([
          callAdmin(password, "semrush_domain"),
          callAdmin(password, "semrush_backlinks_overview"),
          callAdmin(password, "semrush_organic_keywords"),
        ]);
        setSemDomain(parseSemrush(d)[0] ?? null);
        setSemBacklinks(parseSemrush(b)[0] ?? null);
        setSemKeywords(parseSemrush(k));
      } catch (err) {
        setSemError(err instanceof Error ? err.message : String(err));
      }
      setLoading(false);
    })();
  }, [authed]);

  useEffect(() => {
    if (!authed || !siteUrl) return;
    (async () => {
      try {
        const [sum, q, pg] = await Promise.all([
          callAdmin(password, "gsc_summary", { siteUrl }),
          callAdmin(password, "gsc_queries", { siteUrl }),
          callAdmin(password, "gsc_pages", { siteUrl }),
        ]);
        setGscSummary((sum?.rows ?? []) as Row[]);
        setGscQueries((q?.rows ?? []) as Row[]);
        setGscPages((pg?.rows ?? []) as Row[]);
      } catch (err) {
        setGscError(err instanceof Error ? err.message : String(err));
      }
    })();
  }, [siteUrl, authed]);

  const totals = useMemo(() => {
    const clicks = gscSummary.reduce((s, r) => s + ((r.clicks as number) ?? 0), 0);
    const impr = gscSummary.reduce((s, r) => s + ((r.impressions as number) ?? 0), 0);
    const ctr = impr > 0 ? (clicks / impr) * 100 : 0;
    const pos = gscSummary.length > 0 ? gscSummary.reduce((s, r) => s + ((r.position as number) ?? 0), 0) / gscSummary.length : 0;
    return { clicks, impr, ctr, pos };
  }, [gscSummary]);

  if (!authed) {
    return (
      <div className="min-h-dvh flex items-center justify-center bg-background px-4">
        <Helmet><title>Admin · AI Web Solution</title><meta name="robots" content="noindex,nofollow" /></Helmet>
        <form onSubmit={login} className="w-full max-w-sm space-y-4 rounded-xl border border-border/60 bg-card/40 p-6 backdrop-blur">
          <h1 className="text-xl font-semibold">Admin sign in</h1>
          <p className="text-sm text-muted-foreground">Enter the admin password to view analytics.</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-md border border-border/60 bg-background px-3 py-2 text-sm"
            placeholder="Password"
            autoFocus
          />
          {authError && <p className="text-sm text-destructive">{authError}</p>}
          <button type="submit" className="w-full rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:opacity-90">
            Sign in
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <Helmet><title>Admin analytics · AI Web Solution</title><meta name="robots" content="noindex,nofollow" /></Helmet>
      <div className="mx-auto max-w-6xl px-4 py-10 space-y-10">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Site analytics</h1>
            <p className="text-sm text-muted-foreground">Google Search Console · Semrush (UK) · last 30 days</p>
          </div>
          <button
            onClick={() => { sessionStorage.removeItem(PASSWORD_KEY); setAuthed(false); setPassword(""); }}
            className="rounded-md border border-border/60 px-3 py-1.5 text-sm hover:bg-muted/40"
          >Sign out</button>
        </header>

        {/* GSC */}
        <section className="space-y-4">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <h2 className="text-lg font-semibold">Google Search Console</h2>
            {sites.length > 0 && (
              <select
                value={siteUrl}
                onChange={(e) => setSiteUrl(e.target.value)}
                className="rounded-md border border-border/60 bg-background px-3 py-1.5 text-sm"
              >
                {sites.map((s) => <option key={s.siteUrl} value={s.siteUrl}>{s.siteUrl}</option>)}
              </select>
            )}
          </div>

          {gscError && <p className="text-sm text-destructive">{gscError}</p>}

          {sites.length === 0 && !gscError && (
            <p className="text-sm text-muted-foreground">
              {loading ? "Loading properties…" : "No verified GSC properties on this connection. Add & verify the site in Search Console first."}
            </p>
          )}

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Card label="Clicks" value={num(totals.clicks)} />
            <Card label="Impressions" value={num(totals.impr)} />
            <Card label="CTR" value={`${totals.ctr.toFixed(2)}%`} />
            <Card label="Avg position" value={totals.pos ? totals.pos.toFixed(1) : "—"} />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-semibold mb-2">Top queries</h3>
              <DataTable
                headers={["Query", "Clicks", "Impr", "CTR", "Pos"]}
                rows={gscQueries.map((r) => [
                  String((r.keys as string[])?.[0] ?? ""),
                  num(r.clicks), num(r.impressions),
                  `${(((r.ctr as number) ?? 0) * 100).toFixed(1)}%`,
                  ((r.position as number) ?? 0).toFixed(1),
                ])}
              />
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-2">Top pages</h3>
              <DataTable
                headers={["Page", "Clicks", "Impr", "CTR", "Pos"]}
                rows={gscPages.map((r) => {
                  const url = String((r.keys as string[])?.[0] ?? "");
                  const display = url.replace(/^https?:\/\/[^/]+/, "") || "/";
                  return [display, num(r.clicks), num(r.impressions),
                    `${(((r.ctr as number) ?? 0) * 100).toFixed(1)}%`,
                    ((r.position as number) ?? 0).toFixed(1)];
                })}
              />
            </div>
          </div>
        </section>

        {/* Semrush */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold">Semrush (aiwebsolution.co.uk, UK)</h2>
          {semError && <p className="text-sm text-destructive">{semError}</p>}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Card label="Organic keywords" value={num(semDomain?.Or as number)} />
            <Card label="Est. organic traffic" value={num(semDomain?.Ot as number)} />
            <Card label="Authority score" value={String(semBacklinks?.ascore ?? "—")} />
            <Card label="Backlinks" value={num(semBacklinks?.total as number)} />
          </div>
          <div>
            <h3 className="text-sm font-semibold mb-2">Referring domains & links</h3>
            <DataTable
              headers={["Referring domains", "Backlinks", "Follow", "Nofollow", "Text", "Image"]}
              rows={semBacklinks ? [[
                num(semBacklinks.domains_num as number), num(semBacklinks.total as number),
                num(semBacklinks.follows_num as number), num(semBacklinks.nofollows_num as number),
                num(semBacklinks.texts_num as number), num(semBacklinks.images_num as number),
              ]] : []}
            />
          </div>
          <div>
            <h3 className="text-sm font-semibold mb-2">Top organic keywords</h3>
            <DataTable
              headers={["Keyword", "Pos", "Volume", "CPC (£)", "KD", "URL"]}
              rows={semKeywords.map((r) => [
                String(r.Ph ?? ""),
                String(r.Po ?? ""),
                num(Number(r.Nq)),
                Number(r.Cp).toFixed(2),
                String(r.Kd ?? ""),
                String(r.Ur ?? "").replace(/^https?:\/\/[^/]+/, "") || "/",
              ])}
            />
            {semKeywords.length === 0 && !semError && (
              <p className="mt-2 text-xs text-muted-foreground">
                Semrush has no organic keyword data for this domain yet. This is normal for a brand-new site — data appears once Google starts ranking your pages (usually 4–12 weeks after launch).
              </p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

// Semrush returns { data: { columnNames, rows: ["v1;v2;..."] } }. Parse into objects.
function parseSemrush(payload: unknown): Row[] {
  const data = (payload as { data?: { columnNames?: string[]; rows?: string[] } })?.data;
  if (!data?.columnNames || !data.rows) return [];
  return data.rows.map((line) => {
    const parts = line.split(";");
    const obj: Row = {};
    data.columnNames!.forEach((col, i) => { obj[col] = parts[i]; });
    return obj;
  });
}
