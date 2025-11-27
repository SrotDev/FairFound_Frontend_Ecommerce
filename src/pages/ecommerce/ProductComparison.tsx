import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEcommerce } from "@/context/EcommerceContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, TrendingUp, TrendingDown, AlertCircle } from "lucide-react";

const ProductComparison = () => {
  const navigate = useNavigate();
  const { products } = useEcommerce();
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("visibility");

  const categories = ["All", ...Array.from(new Set(products.map((p) => p.category)))];

  const filteredProducts = products
    .filter((p) => category === "All" || p.category === category)
    .sort((a, b) => {
      if (sortBy === "visibility") return b.visibilityScore - a.visibilityScore;
      if (sortBy === "price") return a.price - b.price;
      if (sortBy === "rating") return b.avgRating - a.avgRating;
      return 0;
    });

  const getComparisonStatus = (product: typeof products[0]) => {
    const priceDiff = ((product.price - product.competitorAvgPrice) / product.competitorAvgPrice) * 100;
    const ratingDiff = product.avgRating - product.competitorAvgRating;

    if (priceDiff > 15) return { type: "warning", text: "Price too high" };
    if (ratingDiff < -0.3) return { type: "danger", text: "Rating below market" };
    if (product.visibilityScore < 60) return { type: "warning", text: "Low visibility" };
    return { type: "success", text: "Competitive" };
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Product Comparison</h1>
          <p className="text-lg text-muted-foreground">See how your products stack up against the competition.</p>
        </div>

        {/* Filters */}
        <Card className="p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="text-sm font-medium text-foreground mb-2 block">Category</label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <label className="text-sm font-medium text-foreground mb-2 block">Sort by</label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="visibility">Best visibility</SelectItem>
                  <SelectItem value="price">Lowest price</SelectItem>
                  <SelectItem value="rating">Highest rating</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* Products Grid */}
        <div className="grid gap-4 mb-6">
          {filteredProducts.map((product) => {
            const status = getComparisonStatus(product);
            const priceDiff = product.price - product.competitorAvgPrice;

            return (
              <Card key={product.id} className="p-6 hover:shadow-md transition-shadow">
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">{product.name}</h3>
                        <p className="text-sm text-muted-foreground">{product.category}</p>
                      </div>
                      <Badge
                        variant={status.type === "success" ? "default" : "destructive"}
                        className={
                          status.type === "success"
                            ? "bg-success text-success-foreground"
                            : status.type === "warning"
                            ? "bg-warning text-warning-foreground"
                            : ""
                        }
                      >
                        {status.text}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                      <div>
                        <p className="text-xs text-muted-foreground">Your Price</p>
                        <p className="text-lg font-bold text-foreground">${product.price}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Market Avg</p>
                        <p className="text-lg font-bold text-muted-foreground">${product.competitorAvgPrice}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Your Rating</p>
                        <div className="flex items-center gap-1">
                          <p className="text-lg font-bold text-foreground">{product.avgRating}</p>
                          {product.avgRating > product.competitorAvgRating ? (
                            <TrendingUp className="h-4 w-4 text-success" />
                          ) : (
                            <TrendingDown className="h-4 w-4 text-destructive" />
                          )}
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Visibility</p>
                        <p className="text-lg font-bold text-foreground">{product.visibilityScore}/100</p>
                      </div>
                    </div>
                  </div>
                </div>

                {Math.abs(priceDiff) > 5 && (
                  <div className="mt-4 p-3 bg-muted rounded-lg flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <p className="text-sm text-muted-foreground">
                      {priceDiff > 0
                        ? `Consider lowering price by $${Math.abs(priceDiff).toFixed(2)} to match market average.`
                        : `Your price is competitive. Consider testing a ${Math.abs(priceDiff).toFixed(2)} increase.`}
                    </p>
                  </div>
                )}
              </Card>
            );
          })}
        </div>

        {/* Competitor Summary */}
        <Card className="p-6 mb-8">
          <h3 className="text-lg font-semibold text-foreground mb-4">Market Benchmarks</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Avg Market Price</p>
              <p className="text-2xl font-bold text-foreground">
                ${(products.reduce((sum, p) => sum + p.competitorAvgPrice, 0) / products.length).toFixed(2)}
              </p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Avg Market Rating</p>
              <p className="text-2xl font-bold text-foreground">
                {(products.reduce((sum, p) => sum + p.competitorAvgRating, 0) / products.length).toFixed(1)}
              </p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Your Avg Price</p>
              <p className="text-2xl font-bold text-foreground">
                ${(products.reduce((sum, p) => sum + p.price, 0) / products.length).toFixed(2)}
              </p>
            </div>
          </div>
        </Card>

        {/* CTA */}
        <div className="flex justify-center">
          <Button
            size="lg"
            onClick={() => navigate("/ecommerce/sentiment")}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Get sentiment analysis
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductComparison;
