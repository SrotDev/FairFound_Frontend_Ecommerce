import { useNavigate } from "react-router-dom";
import { useEcommerce } from "@/context/EcommerceContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, FileText, Headphones, Megaphone, DollarSign } from "lucide-react";

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
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">E-commerce Roadmap</h1>
          <p className="text-lg text-muted-foreground">
            Step-by-step actions to improve visibility, conversions, and customer satisfaction.
          </p>
        </div>

        {/* Progress Overview */}
        <Card className="p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Overall Progress</h3>
              <p className="text-sm text-muted-foreground">
                {completedCount} of {roadmap.length} milestones completed
              </p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-accent">{Math.round(progressPercentage)}%</p>
            </div>
          </div>
          <Progress value={progressPercentage} className="h-3" />

          <div className="mt-6 p-4 bg-accent/5 border border-accent/20 rounded-lg">
            <h4 className="font-semibold text-foreground mb-2">Projected Impact</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-muted-foreground">Visibility improvement:</p>
                <p className="font-semibold text-accent">+{Math.round(completedCount * 1.5)}-{Math.round(completedCount * 2)} points</p>
              </div>
              <div>
                <p className="text-muted-foreground">Conversion rate improvement:</p>
                <p className="font-semibold text-accent">+{(completedCount * 0.3).toFixed(1)}-{(completedCount * 0.5).toFixed(1)}%</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Milestones by Category */}
        <div className="space-y-6 mb-8">
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

                <div className="space-y-3">
                  {milestones.map((milestone) => (
                    <div
                      key={milestone.id}
                      className={`p-4 rounded-lg border transition-all ${
                        milestone.completed ? "bg-muted/50 border-muted" : "bg-card border-border hover:border-accent"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <Checkbox
                          checked={milestone.completed}
                          onCheckedChange={() => toggleMilestone(milestone.id)}
                          className="mt-1"
                        />
                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <h4 className={`font-semibold ${milestone.completed ? "text-muted-foreground line-through" : "text-foreground"}`}>
                              {milestone.title}
                            </h4>
                            <div className="flex gap-2">
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
                          <p className={`text-sm ${milestone.completed ? "text-muted-foreground" : "text-muted-foreground"}`}>
                            {milestone.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>

        {/* Info Card */}
        <Card className="p-6 mb-8 bg-gradient-to-br from-accent/5 to-secondary/5 border-accent/20">
          <h3 className="text-lg font-semibold text-foreground mb-2">💡 About Visibility Boosts</h3>
          <p className="text-sm text-muted-foreground">
            Completing milestones can lead to visibility boosts: better ranking in search results, more clicks, and increased reviews. 
            Each improvement compounds over time, creating a flywheel effect for your store's growth.
          </p>
        </Card>

        {/* CTA */}
        <div className="flex justify-center">
          <Button
            size="lg"
            onClick={handleComplete}
            disabled={completedCount === 0}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Complete your improvements
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EcommerceRoadmap;
