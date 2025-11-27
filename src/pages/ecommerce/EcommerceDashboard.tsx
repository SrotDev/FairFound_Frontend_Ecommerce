import { useNavigate } from "react-router-dom";
import { useEcommerce } from "@/context/EcommerceContext";
import { StatCard } from "@/components/ui/stat-card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SimpleLineChart } from "@/components/charts/SimpleLineChart";
import { Package, Eye, TrendingUp, Star, DollarSign, Users, ArrowRight, TrendingDown } from "lucide-react";

const EcommerceDashboard = () => {
  const navigate = useNavigate();
  const { metrics, visibilityTrend, revenueTrend } = useEcommerce();

  const insights = [
    {
      text: "Your visibility score is strong but conversion is below market average.",
      type: "warning" as const,
    },
    {
      text: "Products in 'Electronics' category perform better than others.",
      type: "success" as const,
    },
    {
      text: "Customer sentiment has improved by 8% in the last 4 weeks.",
      type: "success" as const,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">E-commerce Dashboard</h1>
          <p className="text-lg text-muted-foreground">See how your store is performing at a glance.</p>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Total Products"
            value={metrics.productCount}
            subtitle="Active listings"
            icon={Package}
          />
          <StatCard
            title="Visibility Score"
            value={`${metrics.avgVisibilityScore}/100`}
            subtitle="Above average"
            icon={Eye}
            trend="up"
          />
          <StatCard
            title="Monthly Revenue"
            value={`$${metrics.monthlyRevenue.toLocaleString()}`}
            subtitle="+12% from last month"
            icon={DollarSign}
            trend="up"
          />
          <StatCard
            title="Avg. Rating"
            value={metrics.avgRating.toFixed(1)}
            subtitle="Out of 5.0"
            icon={Star}
          />
          <StatCard
            title="Conversion Rate"
            value={`${metrics.avgConversionRate}%`}
            subtitle="Needs improvement"
            icon={TrendingDown}
            trend="down"
          />
          <StatCard
            title="Competition Index"
            value={`${metrics.competitionIndex}/100`}
            subtitle="High competition"
            icon={Users}
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Visibility Trend</h3>
            <SimpleLineChart data={visibilityTrend} color="hsl(var(--accent))" />
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Revenue Trend</h3>
            <SimpleLineChart data={revenueTrend} color="hsl(var(--secondary))" />
          </Card>
        </div>

        {/* Insights Section */}
        <Card className="p-6 mb-8">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-accent" />
            Key Insights
          </h3>
          <div className="space-y-3">
            {insights.map((insight, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border ${
                  insight.type === "success"
                    ? "bg-success/5 border-success/20"
                    : "bg-warning/5 border-warning/20"
                }`}
              >
                <p
                  className={`text-sm ${
                    insight.type === "success" ? "text-success-foreground" : "text-warning-foreground"
                  }`}
                >
                  {insight.text}
                </p>
              </div>
            ))}
          </div>
        </Card>

        {/* CTA */}
        <div className="flex justify-center">
          <Button
            size="lg"
            onClick={() => navigate("/ecommerce/products")}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Compare your products
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EcommerceDashboard;
