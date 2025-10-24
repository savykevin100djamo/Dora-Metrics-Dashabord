import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, TooltipProps } from "recharts";
import { PeriodSelector } from "./PeriodSelector";

interface DeploymentData {
  date: string;
  deployments: number;
  day: string;
}

const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-900 text-white px-4 py-2.5 rounded-full shadow-lg border border-gray-700">
        <p className="text-xs font-medium">{payload[0].payload.day}</p>
        <p className="text-xs">Deployments: {payload[0].value}</p>
      </div>
    );
  }
  return null;
};

interface DeploymentFrequencyChartProps {
  data: DeploymentData[];
  period?: 'day' | 'week' | 'month';
  onPeriodChange?: (period: 'day' | 'week' | 'month') => void;
}

export function DeploymentFrequencyChart({ data, period = 'day', onPeriodChange }: DeploymentFrequencyChartProps) {
  const getColor = (value: number) => {
    // Adjust thresholds based on period
    const thresholds = period === 'day' 
      ? [5, 3, 1] 
      : period === 'week' 
      ? [25, 15, 5] 
      : [80, 50, 20];
    
    if (value >= thresholds[0]) return "#10b981"; // emerald-500
    if (value >= thresholds[1]) return "#3b82f6"; // blue-500
    if (value >= thresholds[2]) return "#f59e0b"; // amber-500
    return "#ef4444"; // red-500
  };

  const getDescription = () => {
    if (period === 'day') return 'Daily deployments in selected range';
    if (period === 'week') return 'Weekly deployments in selected range';
    return 'Monthly deployments in selected range';
  };

  return (
    <Card>
      <CardHeader className="pb-3 sm:pb-6">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1.5">
            <CardTitle className="text-base sm:text-lg">Deployment Frequency</CardTitle>
            <CardDescription className="text-xs sm:text-sm">{getDescription()}</CardDescription>
          </div>
          {onPeriodChange && (
            <PeriodSelector value={period} onValueChange={onPeriodChange} />
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="w-full overflow-x-auto -mx-2 px-2">
          <div className="min-w-[500px]">
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={data} margin={{ top: 5, right: 5, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis 
                  dataKey="day" 
                  className="text-xs"
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
                  interval="preserveStartEnd"
                />
                <YAxis 
                  className="text-xs"
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="deployments" radius={[4, 4, 0, 0]}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getColor(entry.deployments)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
