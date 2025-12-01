import { useNavigate } from "react-router-dom";
import { useEcommerce } from "@/context/EcommerceContext";
import { StatCard } from "@/components/ui/stat-card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SimpleLineChart } from "@/components/charts/SimpleLineChart";
import { Package, Eye, TrendingUp, Star, DollarSign, Users, ArrowRight, TrendingDown, ClipboardList } from "lucide-react";

const EcommerceDashboard = () => {
  const navigate = useNavigate();
  const { metrics, visibilityTrend, revenueTrend } = useEcommerce();

  const nextSteps = [
    {
      text: "Increase conversion rate by optimizing product descriptions and images.",
      type: "action" as const,
    },
    {
      text: "Run a targeted promotion for underperforming categories.",
      type: "action" as const,
    },
    {
      text: "Request more customer reviews to boost sentiment and trust.",
      type: "action" as const,
    },
    {
      text: "Monitor competitors and adjust pricing for top products.",
      type: "action" as const,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-12">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="mb-2 text-4xl font-bold">E-commerce Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, Seller. Here's where your store stands today.</p>
          </div>
          <Button
            variant="outline"
            className="flex items-center gap-2 border-accent/40 text-accent hover:bg-accent/10 dark:border-white/20 dark:text-white dark:hover:bg-white/10"
            onClick={() => navigate("/ecommerce/comparison-history")}
          >
            <ClipboardList className="h-4 w-4" />
            Comparison History
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6 bg-gradient-to-br from-accent/10 via-primary/5 to-secondary/10 dark:from-[#0E1422] dark:via-[#1B2540] dark:to-[#2A3960] text-foreground dark:text-white border border-accent/20 dark:border-white/10">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="mb-2 text-xl font-bold">Ready to compare your products?</h3>
                  <p className="text-muted-foreground dark:text-white/80">Analyze your product listings and see how you stack up.</p>
                </div>
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground shrink-0 shadow-md" onClick={() => navigate("/ecommerce/comparison")}>Compare Products <ArrowRight className="ml-2 h-4 w-4" /></Button>
              </div>
            </Card>

            {/* Sentiment Analysis CTA Card */}
            <Card className="p-6 border-primary/30 bg-primary/5">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-primary/20 p-2"><Eye className="h-5 w-5 text-primary" /></div>
                  <div>
                    <h3 className="mb-1 text-lg font-bold">Analyze Customer Sentiment</h3>
                    <p className="text-sm text-muted-foreground">Turn reviews & feedback into actionable insights.</p>
                  </div>
                </div>
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shrink-0" onClick={() => navigate("/ecommerce/sentiment")}>Open Sentiment Insights <ArrowRight className="ml-2 h-4 w-4" /></Button>
              </div>
            </Card>

            {/* Key Metrics Grid */}
            <div className="grid gap-6 sm:grid-cols-2">
              <StatCard title="Total Products" value={metrics.productCount} subtitle="Active listings" icon={Package} />
              <StatCard title="Visibility Score" value={`${metrics.avgVisibilityScore}/100`} subtitle="Above average" icon={Eye} trend="up" />
              <StatCard title="Monthly Revenue" value={`$${metrics.monthlyRevenue.toLocaleString()}`} subtitle="+12% from last month" icon={DollarSign} trend="up" />
              <StatCard title="Avg. Rating" value={metrics.avgRating.toFixed(1)} subtitle="Out of 5.0" icon={Star} />
              <StatCard title="Conversion Rate" value={`${metrics.avgConversionRate}%`} subtitle="Needs improvement" icon={TrendingDown} trend="down" />
              <StatCard title="Competition Index" value={`${metrics.competitionIndex}/100`} subtitle="High competition" icon={Users} />
            </div>
            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Visibility Trend</h3>
                <SimpleLineChart data={visibilityTrend} color="hsl(var(--accent))" />
              </Card>
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Revenue Trend</h3>
                <SimpleLineChart data={revenueTrend} color="hsl(var(--secondary))" />
              </Card>
            </div>
          </div>

          <div className="space-y-6">
            {/* Next Steps Card */}
            <Card className="p-6 bg-accent/5 border-accent/20">
              <h3 className="mb-2 text-lg font-semibold">Next Steps</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start">
                  <ArrowRight className="mr-2 mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  Compare your products with competitors
                </li>
                <li className="flex items-start">
                  <ArrowRight className="mr-2 mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  Get AI-powered insights
                </li>
                <li className="flex items-start">
                  <ArrowRight className="mr-2 mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  Follow your personalized roadmap
                </li>
              </ul>
            </Card>

            {/* Generate Roadmap Card (dashboard sidebar, matching dashboard style) */}
            <Card className="p-6 border-primary/30 bg-primary/5 flex flex-col gap-4 items-start">
              <div className="flex items-center gap-3 mb-2">
                <div className="rounded-lg bg-primary/20 p-2"><ClipboardList className="h-5 w-5 text-primary" /></div>
                <h3 className="text-lg font-bold">Generate Your Roadmap</h3>
              </div>
              <p className="text-sm text-muted-foreground">Get a personalized action plan based on your product comparisons. Unlock tailored strategies to boost your product visibility and sales.</p>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground mt-2" onClick={() => navigate('/ecommerce/roadmap')}>
                Start Now <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EcommerceDashboard;
