import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, Routes } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import Unsubscribe from "./pages/Unsubscribe.tsx";
import BuildVsHire from "./pages/guides/BuildVsHire.tsx";
import AdminAnalytics from "./pages/AdminAnalytics.tsx";

const queryClient = new QueryClient();

// Pages are statically imported (no React.lazy) so the server-rendered tree
// matches the client tree exactly during hydration. The router lives in the
// entry files: BrowserRouter in main.tsx, StaticRouter in entry-server.tsx.
const App = () => (
  <QueryClientProvider client={queryClient}>
    <MotionConfig reducedMotion="user">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/guides/build-vs-hire" element={<BuildVsHire />} />
          <Route path="/unsubscribe" element={<Unsubscribe />} />
          <Route path="/admin/analytics" element={<AdminAnalytics />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TooltipProvider>
    </MotionConfig>
  </QueryClientProvider>
);

export default App;
