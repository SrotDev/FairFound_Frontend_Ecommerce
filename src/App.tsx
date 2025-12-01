import EcommerceRegisterPage from "@/pages/ecommerce/register/EcommerceRegisterPage";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { EcommerceProvider } from "@/context/EcommerceContext";
import { ThemeProvider } from "@/components/ThemeProvider";
import MainLayout from "@/layouts/MainLayout";
import EcommerceDashboard from "@/pages/ecommerce/EcommerceDashboard";
import ProductComparison from "@/pages/ecommerce/ProductComparison";
import SentimentAnalysis from "@/pages/ecommerce/SentimentAnalysis";

import EcommerceRoadmap from "@/pages/ecommerce/EcommerceRoadmap";
import EcommerceReEvaluation from "@/pages/ecommerce/EcommerceReEvaluation";
import StoreProfile from "@/pages/ecommerce/StoreProfile";
import ComparisonHistory from "@/pages/ecommerce/ComparisonHistory";
import ProductComparisonDetail from "@/pages/ecommerce/ProductComparisonDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <TooltipProvider>
        <EcommerceProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <MainLayout>
              <Routes>
                <Route path="/" element={<Navigate to="/ecommerce/dashboard" replace />} />
                <Route path="/ecommerce/dashboard" element={<EcommerceDashboard />} />
                <Route path="/ecommerce/register" element={<EcommerceRegisterPage />} />
                <Route path="/ecommerce/comparison" element={<ProductComparison />} />
                <Route path="/ecommerce/sentiment" element={<SentimentAnalysis />} />
                <Route path="/ecommerce/roadmap" element={<EcommerceRoadmap />} />
                <Route path="/ecommerce/re-evaluation" element={<EcommerceReEvaluation />} />
                <Route path="/ecommerce/profile" element={<StoreProfile />} />
                <Route path="/ecommerce/comparison-history" element={<ComparisonHistory />} />
                <Route path="/ecommerce/comparison/:productId" element={<ProductComparisonDetail />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </MainLayout>
          </BrowserRouter>
        </EcommerceProvider>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
