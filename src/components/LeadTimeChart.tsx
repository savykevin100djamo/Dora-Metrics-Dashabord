import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ReferenceLine,
  TooltipProps 
} from "recharts";
import { PeriodSelector } from "./PeriodSelector";

interface LeadTimeData {
  date: string;
  leadTime: number;
  average: number;
}

const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-900 text-white px-4 py-2.5 rounded-full shadow-lg border border-gray-700">
        <p className="text-xs font-medium">{payload[0].payload.date}</p>
        <p className="text-xs">Lead Time: {payload[0].value}h</p>
      </div>
    );
  }
  return null;
};

interface LeadTimeChartProps {
  data: LeadTimeData[];
  period?: 'day' | 'week' | 'month';
  onPeriodChange?: (period: 'day' | 'week' | 'month') => void;
}

export function LeadTimeChart({ data, period = 'day', onPeriodChange }: LeadTimeChartProps) {
  const getDescription = () => {
    if (period === 'day') return 'Daily average lead time in selected range (hours)';
    if (period === 'week') return 'Weekly average lead time in selected range (hours)';
    return 'Monthly average lead time in selected range (hours)';
  };

  return (
    <Card>
      <CardHeader className="pb-3 sm:pb-6">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1.5">
            <CardTitle className="text-base sm:text-lg">Lead Time for Changes</CardTitle>
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
              <AreaChart data={data} margin={{ top: 5, right: 5, left: -10, bottom: 5 }}>
                <defs>
                  <linearGradient id="colorLeadTime" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis 
                  dataKey="date" 
                  className="text-xs"
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
                  interval="preserveStartEnd"
                />
                <YAxis 
                  className="text-xs"
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
                  label={{ value: 'Hours', angle: -90, position: 'insideLeft', style: { fontSize: 11 } }}
                />
                <Tooltip content={<CustomTooltip />} />
                <ReferenceLine 
                  y={24} 
                  stroke="#10b981" 
                  strokeDasharray="3 3" 
                  label={{ value: "Elite (<24h)", style: { fontSize: 11 } }}
                />
                <Area 
                  type="monotone" 
                  dataKey="leadTime" 
                  stroke="#8b5cf6" 
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorLeadTime)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
