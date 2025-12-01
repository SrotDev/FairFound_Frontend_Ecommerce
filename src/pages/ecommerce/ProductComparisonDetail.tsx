import { useParams, useNavigate } from "react-router-dom";
import { useEcommerce } from "@/context/EcommerceContext";
import { Card } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const ProductComparisonDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { products } = useEcommerce();
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-8 text-center text-muted-foreground">Product not found.</Card>
      </div>
    );
  }

  // Chart data with more matrices
  const chartData = [
    {
      name: "Your Product",
      Price: product.price,
      Rating: product.avgRating,
      Visibility: product.visibilityScore,
      Reviews: product.reviewCount || 0,
      Conversion: product.conversionRate || 0,
      Returns: product.returnRate || 0,
      Stock: product.stock || 0,
    },
    {
      name: "Market Avg",
      Price: product.competitorAvgPrice,
      Rating: product.competitorAvgRating,
      Visibility: product.competitorAvgVisibility || 0,
      Reviews: product.competitorAvgReviews || 0,
      Conversion: product.competitorAvgConversion || 0,
      Returns: product.competitorAvgReturnRate || 0,
      Stock: product.competitorAvgStock || 0,
    },
  ];

  // Price suggestion logic
  const priceSuggestion = (() => {
    if (!product.competitorAvgPrice) return null;
    const marketAvg = product.competitorAvgPrice;
    const min = Math.max(marketAvg * 0.92, marketAvg - 5);
    const max = Math.min(marketAvg * 1.08, marketAvg + 10);
    let suggestion = marketAvg;
    if (product.avgRating > product.competitorAvgRating && product.visibilityScore > product.competitorAvgVisibility) {
      suggestion = Math.min(max, marketAvg + 3);
    } else if (product.avgRating < product.competitorAvgRating || product.visibilityScore < product.competitorAvgVisibility) {
      suggestion = Math.max(min, marketAvg - 3);
    }
    return {
      min: min.toFixed(2),
      max: max.toFixed(2),
      suggestion: suggestion.toFixed(2),
      marketAvg: marketAvg.toFixed(2)
    };
  })();

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-12">
        {/* ...existing code... */}

        {/* Hero Section */}
        <div className="flex flex-col md:flex-row items-center gap-8 mb-10">
          <div className="w-full md:w-1/3 h-56 rounded-xl overflow-hidden shadow-lg bg-gray-100 flex items-center justify-center">
            <img
              src={`https://source.unsplash.com/600x400/?${encodeURIComponent((product.name || '').replace(/[^a-zA-Z0-9 ]/g, '').replace(/ /g, '+'))},${encodeURIComponent((product.category || '').replace(/[^a-zA-Z0-9 ]/g, '').replace(/ /g, '+'))}`}
              alt={product.name}
              className="object-cover w-full h-full"
              onError={e => { e.currentTarget.onerror = null; e.currentTarget.src = 'https://via.placeholder.com/600x400?text=No+Image'; }}
            />
          </div>
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-2 text-primary">{product.name}</h1>
            <p className="text-lg text-muted-foreground mb-2">{product.category}</p>
            <div className="flex gap-4 mt-2">
              <span className="text-2xl font-bold text-success">${product.price}</span>
              <span className="text-base bg-primary/10 text-primary px-3 py-1 rounded-full">{product.avgRating} ★</span>
              <span className="text-base bg-muted px-3 py-1 rounded-full">Visibility: {product.visibilityScore}/100</span>
              {product.reviewCount && (
                <span className="text-base bg-muted px-3 py-1 rounded-full">Reviews: {product.reviewCount}</span>
              )}
            </div>
          </div>
        </div>

        {/* Enhanced Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Price & Rating Comparison</h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Price" fill="#8884d8" radius={[8,8,0,0]} />
                <Bar dataKey="Rating" fill="#82ca9d" radius={[8,8,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Visibility, Reviews & More</h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Visibility" fill="#fbbf24" radius={[8,8,0,0]} />
                <Bar dataKey="Reviews" fill="#60a5fa" radius={[8,8,0,0]} />
                <Bar dataKey="Conversion" fill="#34d399" radius={[8,8,0,0]} />
                <Bar dataKey="Returns" fill="#ef4444" radius={[8,8,0,0]} />
                <Bar dataKey="Stock" fill="#6366f1" radius={[8,8,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Insights Section & Price Suggestion */}
        <Card className="p-6 mb-8 bg-gradient-to-br from-white to-gray-50 border-0">
          <h2 className="text-lg font-semibold mb-2">Insights & Notes</h2>
          <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-2">
            <li>Your price is <span className="font-bold text-success">{product.price < product.competitorAvgPrice ? "competitive" : "above market"}</span> compared to the market average (${product.competitorAvgPrice}).</li>
            <li>Conversion rate: <span className="font-bold">{product.conversionRate || "N/A"}%</span> vs market <span className="font-bold">{product.competitorAvgConversion || "N/A"}%</span>.</li>
            <li>Return rate: <span className="font-bold">{product.returnRate || "N/A"}%</span> vs market <span className="font-bold">{product.competitorAvgReturnRate || "N/A"}%</span>.</li>
            <li>Stock: <span className="font-bold">{product.stock || "N/A"}</span> vs market <span className="font-bold">{product.competitorAvgStock || "N/A"}</span>.</li>
            <li>Customer ratings are {product.avgRating > product.competitorAvgRating ? "above" : "below"} market average. Highlight positive reviews in your marketing.</li>
            <li>Market trend: Products in this category are seeing {product.visibilityScore > product.competitorAvgVisibility ? "higher" : "lower"} demand this quarter.</li>
            <li>Action: Test a small price adjustment to maximize profit while maintaining competitiveness.</li>
          </ul>
          {priceSuggestion && (
            <div className="mt-6 p-4 rounded-lg bg-primary/10 border border-primary/20">
              <h3 className="text-base font-bold text-primary mb-2">Suggested Price Range</h3>
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <span className="text-lg font-semibold text-success">${priceSuggestion.suggestion}</span>
                <span className="text-sm text-muted-foreground">(Market Avg: ${priceSuggestion.marketAvg})</span>
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Min: ${priceSuggestion.min}</span>
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Max: ${priceSuggestion.max}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">This suggestion is based on market price, rating, and visibility analysis.</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default ProductComparisonDetail;
