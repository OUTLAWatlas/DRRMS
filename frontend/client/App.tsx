import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Layout from "@/components/Layout";
import UserPortal from "@/pages/UserPortal";
import Report from "@/pages/Report";
import UserResources from "@/pages/UserResources";
import UserRescue from "@/pages/UserRescue";
import RescuePortal from "@/pages/RescuePortal";
import Warehouse from "@/pages/Warehouse";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/user" element={<UserPortal />} />
            <Route path="/user/report" element={<Report />} />
            <Route path="/user/resources" element={<UserResources />} />
            <Route path="/user/rescue" element={<UserRescue />} />
            <Route path="/rescue" element={<RescuePortal />} />
            <Route path="/warehouse" element={<Warehouse />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
