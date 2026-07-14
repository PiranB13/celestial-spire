import { defineTool } from "@lovable.dev/mcp-js";

const steps = [
  { step: 1, name: "Discovery", description: "Understand your business, goals, and audience." },
  { step: 2, name: "Design", description: "Draft directions and refine the visual system with you." },
  { step: 3, name: "Build", description: "Implement the site with clean code, SEO, and accessibility." },
  { step: 4, name: "Launch & Support", description: "Ship the site and support you after go-live." },
];

export default defineTool({
  name: "get_process",
  title: "Get delivery process",
  description: "Return the 4-step delivery process AI Web Solution uses for every project.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(steps, null, 2) }],
    structuredContent: { steps },
  }),
});
