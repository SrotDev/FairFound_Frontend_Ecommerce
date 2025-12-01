import { useNavigate } from "react-router-dom";
import { useEcommerce } from "@/context/EcommerceContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Package, Eye, DollarSign, Star } from "lucide-react";
import { SimpleBarChart } from "@/components/charts/SimpleBarChart";

const EcommerceReEvaluation = () => {
  const navigate = useNavigate();
  const { reEvaluation } = useEcommerce();

  if (!reEvaluation) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-8 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">No Re-evaluation Data</h2>
          <p className="text-muted-foreground mb-6">
            Complete milestones in your roadmap first to see the impact.
          </p>
          <Button onClick={() => navigate("/ecommerce/roadmap")}>Go to Roadmap</Button>
        </Card>
      </div>
    );
  }

  const { before, after } = reEvaluation;

  const calculateDelta = (beforeVal: number, afterVal: number) => {
    const delta = afterVal - beforeVal;
    const percentage = ((delta / beforeVal) * 100).toFixed(1);
    return { delta, percentage };
  };

  const visibilityDelta = calculateDelta(before.avgVisibilityScore, after.avgVisibilityScore);
  const conversionDelta = calculateDelta(before.avgConversionRate, after.avgConversionRate);
  const revenueDelta = calculateDelta(before.monthlyRevenue, after.monthlyRevenue);

  const comparisonData = [
    {
      label: "Visibility Score",
      value: after.avgVisibilityScore,
      color: "hsl(var(--accent))",
    },
    {
      label: "Conversion Rate",
      value: after.avgConversionRate * 10, // Scale for visualization
      color: "hsl(var(--secondary))",
    },
    {
      label: "Avg Rating",
      value: after.avgRating * 20, // Scale for visualization
      color: "hsl(var(--success))",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">E-commerce Re-evaluation</h1>
          <p className="text-lg text-muted-foreground">
            See how your improvements changed your store's performance.
          </p>
        </div>

        {/* Before vs After Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <Eye className="h-5 w-5 text-accent" />
              </div>
              <div className={`flex items-center gap-1 text-sm font-semibold ${
                visibilityDelta.delta > 0 ? "text-success" : "text-muted-foreground"
              }`}>
                <TrendingUp className="h-4 w-4" />
                +{visibilityDelta.percentage}%
              </div>
            </div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Visibility Score</h3>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-3xl font-bold text-foreground">{after.avgVisibilityScore}</span>
              <span className="text-sm text-muted-foreground line-through">{before.avgVisibilityScore}</span>
            </div>
            <p className="text-xs text-muted-foreground">Out of 100</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="h-10 w-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-secondary" />
              </div>
              <div className={`flex items-center gap-1 text-sm font-semibold ${
                conversionDelta.delta > 0 ? "text-success" : "text-muted-foreground"
              }`}>
                <TrendingUp className="h-4 w-4" />
                +{conversionDelta.percentage}%
              </div>
            </div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Conversion Rate</h3>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-3xl font-bold text-foreground">{after.avgConversionRate}%</span>
              <span className="text-sm text-muted-foreground line-through">{before.avgConversionRate}%</span>
            </div>
            <p className="text-xs text-muted-foreground">Average across products</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="h-10 w-10 rounded-lg bg-success/10 flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-success" />
              </div>
              <div className={`flex items-center gap-1 text-sm font-semibold ${
                revenueDelta.delta > 0 ? "text-success" : "text-muted-foreground"
              }`}>
                <TrendingUp className="h-4 w-4" />
                +{revenueDelta.percentage}%
              </div>
            </div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Monthly Revenue</h3>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-3xl font-bold text-foreground">${after.monthlyRevenue.toLocaleString()}</span>
              <span className="text-sm text-muted-foreground line-through">${before.monthlyRevenue.toLocaleString()}</span>
            </div>
            <p className="text-xs text-muted-foreground">Projected monthly</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="h-10 w-10 rounded-lg bg-warning/10 flex items-center justify-center">
                <Star className="h-5 w-5 text-warning" />
              </div>
            </div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Average Rating</h3>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-3xl font-bold text-foreground">{after.avgRating.toFixed(1)}</span>
              <span className="text-sm text-muted-foreground line-through">{before.avgRating.toFixed(1)}</span>
            </div>
            <p className="text-xs text-muted-foreground">Out of 5.0</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Package className="h-5 w-5 text-primary" />
              </div>
            </div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Total Products</h3>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-3xl font-bold text-foreground">{after.productCount}</span>
            </div>
            <p className="text-xs text-muted-foreground">Active listings</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-muted-foreground" />
              </div>
            </div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Competition Index</h3>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-3xl font-bold text-foreground">{after.competitionIndex}</span>
            </div>
            <p className="text-xs text-muted-foreground">Market competition level</p>
          </Card>
        </div>

        {/* Visual Comparison */}
        <Card className="p-6 mb-8">
          <h3 className="text-lg font-semibold text-foreground mb-6">Key Metrics Comparison</h3>
          <SimpleBarChart data={comparisonData} maxValue={100} />
        </Card>

        {/* Summary Insight */}
        <Card className="p-6 mb-8 bg-gradient-to-br from-accent/10 to-success/10 border-accent/20">
          <div className="flex items-start gap-3">
            <div className="h-10 w-10 rounded-full bg-success flex items-center justify-center flex-shrink-0">
              <TrendingUp className="h-6 w-6 text-success-foreground" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Great Progress! 🎉</h3>
              <p className="text-muted-foreground">
                After applying your roadmap improvements, your visibility score increased from {before.avgVisibilityScore} to{" "}
                {after.avgVisibilityScore}, and your conversion rate improved by approximately {conversionDelta.percentage}%. 
                Your monthly revenue is projected to increase by {revenueDelta.percentage}%. Keep iterating to stay ahead of the competition!
              </p>
            </div>
          </div>
        </Card>

        {/* Next Steps */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            variant="outline"
            onClick={() => navigate("/ecommerce/comparison")}
          >
            Compare your products again
          </Button>
          <Button
            size="lg"
            onClick={() => navigate("/ecommerce/roadmap")}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Refine your roadmap
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EcommerceReEvaluation;
