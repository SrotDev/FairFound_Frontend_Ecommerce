import { useNavigate } from "react-router-dom";
import { useEcommerce } from "@/context/EcommerceContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SimpleBarChart } from "@/components/charts/SimpleBarChart";
import { SimpleLineChart } from "@/components/charts/SimpleLineChart";
import { ArrowRight, Smile, Meh, Frown, TrendingUp } from "lucide-react";

const SentimentAnalysis = () => {
  const navigate = useNavigate();
  const { sentimentSnapshot, sentimentTrend } = useEcommerce();

  const sentimentData = [
    { label: "Positive", value: sentimentSnapshot.positivePercentage, color: "hsl(var(--success))" },
    { label: "Neutral", value: sentimentSnapshot.neutralPercentage, color: "hsl(var(--muted-foreground))" },
    { label: "Negative", value: sentimentSnapshot.negativePercentage, color: "hsl(var(--destructive))" },
  ];

  const trendData = sentimentTrend.map((t) => ({
    label: t.periodLabel,
    value: t.positiveScore,
  }));

  const improvements = [
    {
      category: "Product Descriptions",
      suggestion: "Clarify material and sizing details for top selling products to reduce confusion.",
    },
    {
      category: "Pricing",
      suggestion: "Negative feedback mentions 'too expensive'—consider targeted discounts for high-competition items.",
    },
    {
      category: "Customer Service",
      suggestion: "Respond faster to negative reviews within 24 hours to show you care.",
    },
    {
      category: "Shipping",
      suggestion: "Late shipping is a common complaint. Consider faster shipping options or clearer delivery estimates.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Customer Sentiment Analysis</h1>
          <p className="text-lg text-muted-foreground">Understand how customers feel about your products.</p>
        </div>

        {/* Sentiment Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 col-span-1 lg:col-span-2">
            <h3 className="text-lg font-semibold text-foreground mb-6">Overall Sentiment Distribution</h3>
            <SimpleBarChart data={sentimentData} maxValue={100} />
          </Card>

          <div className="space-y-4">
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <Smile className="h-8 w-8 text-success" />
                <div>
                  <p className="text-sm text-muted-foreground">Positive</p>
                  <p className="text-3xl font-bold text-success">{sentimentSnapshot.positivePercentage}%</p>
                </div>
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <Meh className="h-8 w-8 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Neutral</p>
                  <p className="text-3xl font-bold text-muted-foreground">{sentimentSnapshot.neutralPercentage}%</p>
                </div>
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <Frown className="h-8 w-8 text-destructive" />
                <div>
                  <p className="text-sm text-muted-foreground">Negative</p>
                  <p className="text-3xl font-bold text-destructive">{sentimentSnapshot.negativePercentage}%</p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Keywords */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Top Positive Keywords</h3>
            <div className="flex flex-wrap gap-2">
              {sentimentSnapshot.topPositiveKeywords.map((keyword, index) => (
                <Badge key={index} className="bg-success/10 text-success border-success/20">
                  {keyword}
                </Badge>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Top Negative Keywords</h3>
            <div className="flex flex-wrap gap-2">
              {sentimentSnapshot.topNegativeKeywords.map((keyword, index) => (
                <Badge key={index} className="bg-destructive/10 text-destructive border-destructive/20">
                  {keyword}
                </Badge>
              ))}
            </div>
          </Card>
        </div>

        {/* Trend */}
        <Card className="p-6 mb-8">
          <h3 className="text-lg font-semibold text-foreground mb-4">Sentiment Trend Over Time</h3>
          <SimpleLineChart data={trendData} color="hsl(var(--success))" />
          <div className="mt-4 p-4 bg-success/5 border border-success/20 rounded-lg">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-success" />
              <p className="text-sm text-success-foreground">
                Overall sentiment has improved by 8% in the last 4 weeks. Keep up the good work!
              </p>
            </div>
          </div>
        </Card>

        {/* Improvement Suggestions */}
        <Card className="p-6 mb-8">
          <h3 className="text-lg font-semibold text-foreground mb-4">What to Improve</h3>
          <div className="space-y-4">
            {improvements.map((item, index) => (
              <div key={index} className="p-4 bg-muted rounded-lg">
                <h4 className="font-semibold text-foreground mb-1">{item.category}</h4>
                <p className="text-sm text-muted-foreground">{item.suggestion}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* CTA */}
        <div className="flex justify-center">
          <Button
            size="lg"
            onClick={() => navigate("/ecommerce/roadmap")}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Improve your product visibility
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SentimentAnalysis;
