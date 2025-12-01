import { Card } from "@/components/ui/card";
import { useEcommerce } from "@/context/EcommerceContext";

const ComparisonHistory = () => {
  const { comparisonHistory } = useEcommerce();

  // Dummy comparison data (similar to ProductComparison/ProductComparisonDetail)
  const dummyComparison = [
    {
      productName: "UltraSoft Hoodie",
      date: "2025-11-28",
      price: 49.99,
      competitorAvgPrice: 54.99,
      avgRating: 4.7,
      competitorAvgRating: 4.3,
      visibilityScore: 88,
      competitorAvgVisibility: 75,
      reviewCount: 120,
      competitorAvgReviews: 95,
      notes: "Your product is priced competitively and has a higher rating and visibility than the market average. Consider promoting more reviews for even better results."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-12">
        <h1 className="mb-8 text-3xl font-bold">Comparison History</h1>
        <div className="space-y-6">
          {/* Dummy comparison card */}
          {dummyComparison.map((entry, idx) => (
            <Card key={idx} className="p-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold">{entry.productName}</h3>
                <span className="text-muted-foreground text-sm">{entry.date}</span>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-xs text-muted-foreground">Your Price</p>
                  <p className="text-lg font-bold">${entry.price}</p>
                  <p className="text-xs text-muted-foreground mt-2">Rating: <span className="font-bold text-success">{entry.avgRating} ★</span></p>
                  <p className="text-xs text-muted-foreground">Visibility: <span className="font-bold">{entry.visibilityScore}/100</span></p>
                  <p className="text-xs text-muted-foreground">Reviews: <span className="font-bold">{entry.reviewCount}</span></p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Market Avg</p>
                  <p className="text-lg font-bold text-muted-foreground">${entry.competitorAvgPrice}</p>
                  <p className="text-xs text-muted-foreground mt-2">Rating: <span className="font-bold">{entry.competitorAvgRating} ★</span></p>
                  <p className="text-xs text-muted-foreground">Visibility: <span className="font-bold">{entry.competitorAvgVisibility}/100</span></p>
                  <p className="text-xs text-muted-foreground">Reviews: <span className="font-bold">{entry.competitorAvgReviews}</span></p>
                </div>
              </div>
              <div className="mt-2 text-sm text-muted-foreground">{entry.notes}</div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ComparisonHistory;
