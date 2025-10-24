import { ArrowDown, ArrowUp, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";

interface MetricCardProps {
  title: string;
  value: string;
  change: number;
  changeLabel: string;
  status: "elite" | "high" | "medium" | "low";
  icon: React.ReactNode;
  /** For metrics where lower is better (e.g., lead time), set this to true */
  lowerIsBetter?: boolean;
}

const statusColors = {
  elite: "bg-emerald-500/10 text-emerald-700 border-emerald-500/20",
  high: "bg-blue-500/10 text-blue-700 border-blue-500/20",
  medium: "bg-amber-500/10 text-amber-700 border-amber-500/20",
  low: "bg-red-500/10 text-red-700 border-red-500/20",
};

const statusLabels = {
  elite: "Elite",
  high: "High",
  medium: "Medium",
  low: "Low",
};

export function MetricCard({ title, value, change, changeLabel, status, icon, lowerIsBetter = false }: MetricCardProps) {
  // Arrow direction always follows the actual change direction
  const isIncreasing = change > 0;
  
  // Color depends on whether the change is good or bad
  // For metrics where lower is better (like lead time), a decrease is good
  const isGoodChange = lowerIsBetter ? change < 0 : change > 0;
  
  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm">{title}</CardTitle>
        <div className="h-4 w-4 text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl">{value}</div>
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center text-xs text-muted-foreground">
            {isIncreasing ? (
              <ArrowUp className={`mr-1 h-3 w-3 ${isGoodChange ? "text-emerald-600" : "text-red-600"}`} />
            ) : (
              <ArrowDown className={`mr-1 h-3 w-3 ${isGoodChange ? "text-emerald-600" : "text-red-600"}`} />
            )}
            <span className={isGoodChange ? "text-emerald-600" : "text-red-600"}>
              {Math.abs(change)}%
            </span>
            <span className="ml-1">{changeLabel}</span>
          </div>
          <Badge variant="outline" className={statusColors[status]}>
            {statusLabels[status]}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
