export interface EcommerceMetrics {
  productCount: number;
  avgVisibilityScore: number; // 0-100
  avgConversionRate: number; // percentage
  avgRating: number;
  monthlyRevenue: number;
  competitionIndex: number; // 0-100, higher = more competition
}

export interface ProductMetrics {
  id: string;
  name: string;
  category: string;
  price: number;
  avgRating: number;
  reviewCount: number;
  visibilityScore: number;
  conversionRate: number;
  competitorAvgPrice: number;
  competitorAvgRating: number;
}

export interface CompetitorProduct {
  name: string;
  price: number;
  avgRating: number;
  visibilityScore: number;
}

export interface SentimentSnapshot {
  positivePercentage: number;
  neutralPercentage: number;
  negativePercentage: number;
  topPositiveKeywords: string[];
  topNegativeKeywords: string[];
}

export interface SentimentTrend {
  periodLabel: string;
  positiveScore: number;
  negativeScore: number;
}

export type MilestoneCategory = "Listings" | "CustomerService" | "Marketing" | "Pricing";
export type Difficulty = "Easy" | "Medium" | "Hard";
export type Impact = "Low" | "Medium" | "High";

export interface RoadmapMilestone {
  id: string;
  title: string;
  description: string;
  category: MilestoneCategory;
  difficulty: Difficulty;
  estimatedImpact: Impact;
  completed: boolean;
}

export interface ReEvaluationSnapshot {
  before: EcommerceMetrics;
  after: EcommerceMetrics;
}

export interface StoreProfile {
  name: string;
  description: string;
  url: string;
  email: string;
  phone: string;
  location: string;
  founded: string;
  category: string;
  socialMedia: {
    facebook: string;
    twitter: string;
    instagram: string;
    linkedin: string;
  };
}

export interface TrendDataPoint {
  label: string;
  value: number;
}
