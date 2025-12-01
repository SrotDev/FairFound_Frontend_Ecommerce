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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <Card
                key={product.id}
                className="group p-0 overflow-hidden shadow-sm hover:shadow-lg transition-shadow cursor-pointer border-0 bg-gradient-to-br from-white to-gray-50"
                onClick={() => navigate(`/ecommerce/comparison/${product.id}`)}
              >
                <div className="h-40 w-full bg-gray-100 flex items-center justify-center">
                  {/* Replace with actual product image if available */}
                  <img
                    src={`https://source.unsplash.com/400x300/?${encodeURIComponent((product.name || '').replace(/[^a-zA-Z0-9 ]/g, '').replace(/ /g, '+'))},${encodeURIComponent((product.category || '').replace(/[^a-zA-Z0-9 ]/g, '').replace(/ /g, '+'))}`}
                    alt={product.name}
                    className="object-cover h-full w-full group-hover:scale-105 transition-transform duration-300"
                    onError={e => { e.currentTarget.onerror = null; e.currentTarget.src = 'https://via.placeholder.com/400x300?text=No+Image'; }}
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-foreground mb-1 truncate">{product.name}</h3>
                  <p className="text-xs text-muted-foreground mb-2">{product.category}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-base font-bold text-primary">${product.price}</span>
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">View Details</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductComparison;
