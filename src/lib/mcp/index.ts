import { defineMcp } from "@lovable.dev/mcp-js";
import getServices from "./tools/get-services";
import getPricing from "./tools/get-pricing";
import getProcess from "./tools/get-process";
import submitContactEnquiry from "./tools/submit-contact-enquiry";

export default defineMcp({
  name: "ai-web-solution-mcp",
  title: "Web Solutions",
  version: "0.1.0",
  instructions:
    "Public MCP server for Web Solutions (aiwebsolution.co.uk). Use `get_services`, `get_pricing`, and `get_process` to describe what the web design studio offers, and `submit_contact_enquiry` to send a project enquiry that the team will respond to within 24 hours.",
  tools: [getServices, getPricing, getProcess, submitContactEnquiry],
});
