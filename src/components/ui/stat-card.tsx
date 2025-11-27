import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: LucideIcon;
  trend?: "up" | "down" | "neutral";
  className?: string;
}

export const StatCard = ({ title, value, subtitle, icon: Icon, trend, className }: StatCardProps) => {
  return (
    <Card className={cn("p-6 hover:shadow-md transition-shadow", className)}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
          <p className="text-3xl font-bold text-foreground">{value}</p>
          {subtitle && (
            <p
              className={cn(
                "text-sm mt-1",
                trend === "up" && "text-success",
                trend === "down" && "text-destructive",
                !trend && "text-muted-foreground"
              )}
            >
              {subtitle}
            </p>
          )}
        </div>
        {Icon && (
          <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
            <Icon className="h-5 w-5 text-accent" />
          </div>
        )}
      </div>
    </Card>
  );
};
