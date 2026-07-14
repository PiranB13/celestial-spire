import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

const tiers = [
  {
    name: "Basic",
    startingPriceGBP: 300,
    description:
      "A single page, built to convert. Good for freelancers, product launches, or a small business that does not need a full site yet.",
    features: [
      "Custom design, hand-reviewed",
      "Works on phones and laptops",
      "SEO and meta tags set up",
      "Contact form that actually sends",
      "Pre-launch QA pass",
      "14 days of support after go-live",
    ],
  },
  {
    name: "Pro",
    startingPriceGBP: 500,
    description:
      "A full website for businesses that need more than one page. Structure, a CMS, and the basics that let you keep editing without us.",
    features: [
      "Everything in Basic",
      "Up to 5 pages",
      "Full SEO and analytics setup",
      "CMS so you can edit copy",
      "Page speed and Core Web Vitals",
      "Blog or news section",
      "30 days of priority support",
    ],
  },
  {
    name: "Expert",
    startingPriceGBP: 1000,
    description:
      "Bigger builds with real depth: 3D scenes, client portals, or a proper e-commerce store. Made to handle traffic and grow as you do.",
    popular: true,
    features: [
      "Everything in Pro",
      "3D scenes or full portal app",
      "E-commerce store and checkout",
      "Custom logic, workflows, roles",
      "Database and user management",
      "Stripe, CRM, and other APIs",
      "Cloud hosting and deployment",
      "90 days of dedicated support",
    ],
  },
  {
    name: "Full Brand",
    startingPriceGBP: 2000,
    description:
      "Brand identity built at the same time as the platform. Logo, type, palette, voice, and how all of it shows up across every page of the Expert build.",
    features: [
      "Everything in Expert",
      "Logo system and identity",
      "Type, colour, and motion rules",
      "Brand voice and messaging guide",
      "Social and marketing asset kit",
      "6 months of ongoing support",
    ],
  },
];

export default defineTool({
  name: "get_pricing",
  title: "Get pricing tiers",
  description:
    "List AI Web Solution's pricing tiers with starting prices in GBP. Prices are starting points; final quotes depend on scope.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(tiers, null, 2) }],
    structuredContent: { tiers, currency: "GBP" },
  }),
});
