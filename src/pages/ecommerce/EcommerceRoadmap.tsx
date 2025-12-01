import { useNavigate } from "react-router-dom";
import { useEcommerce } from "@/context/EcommerceContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, FileText, Headphones, Megaphone, DollarSign } from "lucide-react";
import { SimpleBarChart } from "@/components/charts/SimpleBarChart";

const categoryIcons = {
  Listings: FileText,
  CustomerService: Headphones,
  Marketing: Megaphone,
  Pricing: DollarSign,
};

const categoryColors = {
  Listings: "hsl(var(--accent))",
  CustomerService: "hsl(var(--secondary))",
  Marketing: "hsl(var(--success))",
  Pricing: "hsl(var(--warning))",
};

const EcommerceRoadmap = () => {
      // Example before/after metrics for visual matrix
      const improvementMatrix = [
        { label: "Visibility", value: 60, color: "hsl(var(--accent))" },
        { label: "Conversion Rate", value: 2.1, color: "hsl(var(--success))" },
        { label: "Engagement", value: 45, color: "hsl(var(--secondary))" },
        { label: "Revenue", value: 5000, color: "hsl(var(--warning))" },
      ];
      const projectedMatrix = [
        { label: "Visibility", value: 85, color: "hsl(var(--accent))" },
        { label: "Conversion Rate", value: 3.8, color: "hsl(var(--success))" },
        { label: "Engagement", value: 80, color: "hsl(var(--secondary))" },
        { label: "Revenue", value: 12000, color: "hsl(var(--warning))" },
      ];
    // Dummy store profile for sidebar cards (replace with real context if available)
  const navigate = useNavigate();
  const { roadmap, toggleMilestone, applyImprovements } = useEcommerce();

  const completedCount = roadmap.filter((m) => m.completed).length;
  const progressPercentage = (completedCount / roadmap.length) * 100;

  const handleComplete = () => {
    applyImprovements();
    navigate("/ecommerce/re-evaluation");
  };

  const groupedMilestones = roadmap.reduce((acc, milestone) => {
    if (!acc[milestone.category]) {
      acc[milestone.category] = [];
    }
    acc[milestone.category].push(milestone);
    return acc;
  }, {} as Record<string, typeof roadmap>);

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-12 max-w-5xl">
        <div className="mb-8">
          <h1 className="mb-2 text-4xl font-bold text-primary">E-commerce Roadmap</h1>
          <p className="text-lg text-muted-foreground">
            Follow these step-by-step guidelines to improve your store's visibility, conversions, and customer satisfaction.
          </p>
        </div>

        

        {/* Step-by-step Roadmap Guidelines */}
        <div className="space-y-8 mb-8">
          {Object.entries(groupedMilestones).map(([category, milestones]) => {
            const Icon = categoryIcons[category as keyof typeof categoryIcons];
            const color = categoryColors[category as keyof typeof categoryColors];
            return (
              <Card key={category} className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${color}20` }}>
                    <Icon className="h-5 w-5" style={{ color }} />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">{category}</h3>
                </div>
                <div className="space-y-4">
                  {milestones.map((milestone) => (
                    <div key={milestone.id} className="p-4 border rounded-lg bg-card">
                      <h4 className="font-semibold text-lg mb-2 text-primary">{milestone.title}</h4>
                      <p className="text-sm text-muted-foreground mb-2">{milestone.description}</p>
                      {/* More detailed step-by-step guidelines (static, until backend provides per-milestone steps) */}
                      <ul className="list-disc ml-6 text-sm text-muted-foreground mb-2 space-y-1">
                        <li>Audit current state and define the desired outcome.</li>
                        <li>Apply recommended changes following the milestone description.</li>
                        <li>Validate with metrics (visibility, conversion, engagement where relevant).</li>
                        <li>Document changes and plan the next iteration.</li>
                      </ul>
                      <div className="flex gap-2 mt-2">
                        <Badge
                          variant="outline"
                          className={
                            milestone.difficulty === "Easy"
                              ? "bg-success/10 text-success border-success/20"
                              : milestone.difficulty === "Medium"
                              ? "bg-warning/10 text-warning border-warning/20"
                              : "bg-destructive/10 text-destructive border-destructive/20"
                          }
                        >
                          {milestone.difficulty}
                        </Badge>
                        <Badge
                          variant="outline"
                          className={
                            milestone.estimatedImpact === "High"
                              ? "bg-accent/10 text-accent border-accent/20"
                              : milestone.estimatedImpact === "Medium"
                              ? "bg-secondary/10 text-secondary border-secondary/20"
                              : "bg-muted text-muted-foreground"
                          }
                        >
                          {milestone.estimatedImpact} Impact
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>

        {/* If you complete this roadmap Section with Improvement Matrix */}
        <Card className="p-8 mt-10 shadow-lg border-accent/30 bg-gradient-to-br from-accent/5 to-secondary/5">
          <h3 className="text-2xl font-bold text-accent mb-4">If you complete this roadmap</h3>
          <ul className="list-disc ml-6 text-muted-foreground text-base space-y-2 mb-6">
            <li>Your store will be optimized for higher visibility and conversions.</li>
            <li>You will have implemented best practices for product listings, pricing, marketing, and customer service.</li>
            <li>Expect improved search ranking, more customer engagement, and increased sales.</li>
            <li>You'll be ready for advanced growth strategies and future scaling.</li>
          </ul>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-2 text-muted-foreground">Current Metrics</h3>
              <SimpleBarChart data={improvementMatrix.map(m => ({ ...m, value: Math.round(m.value) }))} maxValue={120} />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-muted-foreground">After Completing Roadmap</h3>
              <SimpleBarChart data={projectedMatrix.map(m => ({ ...m, value: Math.round(m.value) }))} maxValue={120} />
            </div>
          </div>
          <div className="mt-6 text-sm text-muted-foreground">
            <span className="font-semibold text-success">Noticeable improvement</span> in all key areas after following this roadmap.
          </div>
        </Card>

      </div>
    </div>
  );
};
export default EcommerceRoadmap;
