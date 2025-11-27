import React, { createContext, useContext, useState, ReactNode } from "react";
import {
  EcommerceMetrics,
  ProductMetrics,
  SentimentSnapshot,
  SentimentTrend,
  RoadmapMilestone,
  ReEvaluationSnapshot,
  TrendDataPoint,
  StoreProfile,
} from "@/types/ecommerce";

interface EcommerceContextType {
  metrics: EcommerceMetrics;
  products: ProductMetrics[];
  sentimentSnapshot: SentimentSnapshot;
  sentimentTrend: SentimentTrend[];
  roadmap: RoadmapMilestone[];
  reEvaluation: ReEvaluationSnapshot | null;
  visibilityTrend: TrendDataPoint[];
  revenueTrend: TrendDataPoint[];
  storeProfile: StoreProfile;
  toggleMilestone: (id: string) => void;
  applyImprovements: () => void;
  updateStoreProfile: (profile: StoreProfile) => void;
}

const EcommerceContext = createContext<EcommerceContextType | undefined>(undefined);

// Mock initial data
const initialMetrics: EcommerceMetrics = {
  productCount: 24,
  avgVisibilityScore: 64,
  avgConversionRate: 2.8,
  avgRating: 4.2,
  monthlyRevenue: 12400,
  competitionIndex: 72,
};

const initialProducts: ProductMetrics[] = [
  {
    id: "1",
    name: "Wireless Bluetooth Headphones",
    category: "Electronics",
    price: 79.99,
    avgRating: 4.5,
    reviewCount: 234,
    visibilityScore: 78,
    conversionRate: 3.2,
    competitorAvgPrice: 69.99,
    competitorAvgRating: 4.3,
  },
  {
    id: "2",
    name: "Smart Fitness Tracker",
    category: "Electronics",
    price: 129.99,
    avgRating: 4.1,
    reviewCount: 156,
    visibilityScore: 65,
    conversionRate: 2.1,
    competitorAvgPrice: 99.99,
    competitorAvgRating: 4.4,
  },
  {
    id: "3",
    name: "Yoga Mat Premium",
    category: "Sports",
    price: 34.99,
    avgRating: 4.7,
    reviewCount: 412,
    visibilityScore: 82,
    conversionRate: 4.5,
    competitorAvgPrice: 39.99,
    competitorAvgRating: 4.2,
  },
  {
    id: "4",
    name: "LED Desk Lamp",
    category: "Home",
    price: 45.99,
    avgRating: 3.9,
    reviewCount: 89,
    visibilityScore: 52,
    conversionRate: 1.8,
    competitorAvgPrice: 42.99,
    competitorAvgRating: 4.5,
  },
  {
    id: "5",
    name: "Ceramic Coffee Mug Set",
    category: "Home",
    price: 24.99,
    avgRating: 4.6,
    reviewCount: 324,
    visibilityScore: 71,
    conversionRate: 3.8,
    competitorAvgPrice: 22.99,
    competitorAvgRating: 4.3,
  },
];

const initialSentimentSnapshot: SentimentSnapshot = {
  positivePercentage: 62,
  neutralPercentage: 23,
  negativePercentage: 15,
  topPositiveKeywords: ["fast delivery", "good quality", "great value", "comfortable", "durable"],
  topNegativeKeywords: ["late shipping", "confusing sizing", "poor packaging", "expensive"],
};

const initialSentimentTrend: SentimentTrend[] = [
  { periodLabel: "Week 1", positiveScore: 54, negativeScore: 22 },
  { periodLabel: "Week 2", positiveScore: 58, negativeScore: 19 },
  { periodLabel: "Week 3", positiveScore: 61, negativeScore: 17 },
  { periodLabel: "Week 4", positiveScore: 62, negativeScore: 15 },
];

const initialRoadmap: RoadmapMilestone[] = [
  {
    id: "m1",
    title: "Rewrite top 5 product descriptions",
    description: "Use keyword-rich, clear copy highlighting benefits and features",
    category: "Listings",
    difficulty: "Medium",
    estimatedImpact: "High",
    completed: false,
  },
  {
    id: "m2",
    title: "Respond to all negative reviews within 24 hours",
    description: "Show customers you care and can resolve issues quickly",
    category: "CustomerService",
    difficulty: "Easy",
    estimatedImpact: "Medium",
    completed: false,
  },
  {
    id: "m3",
    title: "Add UGC photos to top 3 products",
    description: "User-generated content builds trust and improves conversion",
    category: "Marketing",
    difficulty: "Easy",
    estimatedImpact: "Medium",
    completed: false,
  },
  {
    id: "m4",
    title: "Experiment with 10% discount on high-competition products",
    description: "Price testing can reveal optimal pricing points",
    category: "Pricing",
    difficulty: "Easy",
    estimatedImpact: "Low",
    completed: false,
  },
  {
    id: "m5",
    title: "Optimize product images for mobile",
    description: "Ensure images load fast and look great on all devices",
    category: "Listings",
    difficulty: "Medium",
    estimatedImpact: "High",
    completed: false,
  },
  {
    id: "m6",
    title: "Implement email follow-up for reviews",
    description: "Automated follow-ups increase review count and ratings",
    category: "CustomerService",
    difficulty: "Hard",
    estimatedImpact: "High",
    completed: false,
  },
];

const initialVisibilityTrend: TrendDataPoint[] = [
  { label: "Jan", value: 54 },
  { label: "Feb", value: 58 },
  { label: "Mar", value: 61 },
  { label: "Apr", value: 59 },
  { label: "May", value: 64 },
  { label: "Jun", value: 64 },
];

const initialRevenueTrend: TrendDataPoint[] = [
  { label: "Jan", value: 8200 },
  { label: "Feb", value: 9100 },
  { label: "Mar", value: 10500 },
  { label: "Apr", value: 9800 },
  { label: "May", value: 11200 },
  { label: "Jun", value: 12400 },
];

const initialStoreProfile: StoreProfile = {
  name: "TechGear Haven",
  description: "Your one-stop shop for premium electronics and tech accessories. We pride ourselves on quality products and exceptional customer service.",
  url: "https://techgearhaven.example.com",
  email: "contact@techgearhaven.com",
  phone: "+1 (555) 123-4567",
  location: "San Francisco, CA",
  founded: "2019",
  category: "Electronics & Accessories",
  socialMedia: {
    facebook: "https://facebook.com/techgearhaven",
    twitter: "https://twitter.com/techgearhaven",
    instagram: "https://instagram.com/techgearhaven",
    linkedin: "https://linkedin.com/company/techgearhaven"
  }
};

export const EcommerceProvider = ({ children }: { children: ReactNode }) => {
  const [metrics, setMetrics] = useState<EcommerceMetrics>(initialMetrics);
  const [products] = useState<ProductMetrics[]>(initialProducts);
  const [sentimentSnapshot] = useState<SentimentSnapshot>(initialSentimentSnapshot);
  const [sentimentTrend] = useState<SentimentTrend[]>(initialSentimentTrend);
  const [roadmap, setRoadmap] = useState<RoadmapMilestone[]>(initialRoadmap);
  const [reEvaluation, setReEvaluation] = useState<ReEvaluationSnapshot | null>(null);
  const [visibilityTrend] = useState<TrendDataPoint[]>(initialVisibilityTrend);
  const [revenueTrend] = useState<TrendDataPoint[]>(initialRevenueTrend);
  const [storeProfile, setStoreProfile] = useState<StoreProfile>(initialStoreProfile);

  const toggleMilestone = (id: string) => {
    setRoadmap((prev) =>
      prev.map((milestone) =>
        milestone.id === id ? { ...milestone, completed: !milestone.completed } : milestone
      )
    );
  };

  const applyImprovements = () => {
    const completedCount = roadmap.filter((m) => m.completed).length;
    const improvementFactor = completedCount * 0.15; // Each milestone adds ~15% improvement

    const afterMetrics: EcommerceMetrics = {
      ...metrics,
      avgVisibilityScore: Math.min(100, Math.round(metrics.avgVisibilityScore + (10 * improvementFactor))),
      avgConversionRate: Number((metrics.avgConversionRate + (0.5 * improvementFactor)).toFixed(1)),
      avgRating: Math.min(5, Number((metrics.avgRating + (0.2 * improvementFactor)).toFixed(1))),
      monthlyRevenue: Math.round(metrics.monthlyRevenue * (1 + 0.15 * improvementFactor)),
    };

    setReEvaluation({
      before: metrics,
      after: afterMetrics,
    });

    setMetrics(afterMetrics);
  };

  const updateStoreProfile = (profile: StoreProfile) => {
    setStoreProfile(profile);
  };

  return (
    <EcommerceContext.Provider
      value={{
        metrics,
        products,
        sentimentSnapshot,
        sentimentTrend,
        roadmap,
        reEvaluation,
        visibilityTrend,
        revenueTrend,
        storeProfile,
        toggleMilestone,
        applyImprovements,
        updateStoreProfile,
      }}
    >
      {children}
    </EcommerceContext.Provider>
  );
};

export const useEcommerce = () => {
  const context = useContext(EcommerceContext);
  if (context === undefined) {
    throw new Error("useEcommerce must be used within an EcommerceProvider");
  }
  return context;
};
