import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { EcommerceProvider } from "@/context/EcommerceContext";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/navigation/Footer";
import EcommerceDashboard from "@/pages/ecommerce/EcommerceDashboard";
import ProductComparison from "@/pages/ecommerce/ProductComparison";
import SentimentAnalysis from "@/pages/ecommerce/SentimentAnalysis";
import EcommerceRoadmap from "@/pages/ecommerce/EcommerceRoadmap";
import EcommerceReEvaluation from "@/pages/ecommerce/EcommerceReEvaluation";
import StoreProfile from "@/pages/ecommerce/StoreProfile";
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
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Navigate to="/ecommerce/dashboard" replace />} />
                  <Route path="/ecommerce/dashboard" element={<EcommerceDashboard />} />
                  <Route path="/ecommerce/products" element={<ProductComparison />} />
                  <Route path="/ecommerce/sentiment" element={<SentimentAnalysis />} />
                  <Route path="/ecommerce/roadmap" element={<EcommerceRoadmap />} />
                  <Route path="/ecommerce/re-evaluation" element={<EcommerceReEvaluation />} />
                  <Route path="/ecommerce/profile" element={<StoreProfile />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </BrowserRouter>
        </EcommerceProvider>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
