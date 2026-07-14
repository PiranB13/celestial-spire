import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

const services = [
  {
    title: "Website Design & Creation",
    description:
      "Start-to-finish custom website design. Market and brand research, a few design directions, then built out as a real working site with a hands-on pass before launch.",
    features: [
      "Custom design, not a template",
      "SEO and meta set up properly",
      "Works on phones, tablets, and desktop",
      "CMS so you can edit without us",
    ],
  },
  {
    title: "Redesign & SEO Optimisation",
    description:
      "Audit and fix slow, dated, or under-performing sites. Speed, layout, and accessibility improvements aimed at the things that cost traffic and conversions.",
    features: [
      "Core Web Vitals and page speed",
      "UX clean-up where it matters",
      "WCAG accessibility pass",
      "Analytics and event tracking",
    ],
  },
  {
    title: "E-commerce, Portals & Web Apps",
    description:
      "Client portals, booking systems, retail storefronts, and internal dashboards. Built as full apps, not glued-together plugins, with full ownership handed over.",
    features: [
      "Full apps, not glued-together plugins",
      "Logins, roles, and user areas",
      "Stripe, calendars, CRM integrations",
      "Cloud hosting set up for you",
    ],
  },
];

export default defineTool({
  name: "get_services",
  title: "Get services",
  description: "List the web design, SEO, and web application services offered by AI Web Solution.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(services, null, 2) }],
    structuredContent: { services },
  }),
});
