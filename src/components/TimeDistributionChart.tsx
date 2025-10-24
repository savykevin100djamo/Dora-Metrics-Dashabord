import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, TooltipProps } from "recharts";

interface TimeDistribution {
  name: string;
  value: number;
  color: string;
}

const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-900 text-white px-4 py-2.5 rounded-full shadow-lg border border-gray-700">
        <p className="text-xs font-medium">{payload[0].name}</p>
        <p className="text-xs">{payload[0].value}h</p>
      </div>
    );
  }
  return null;
};

interface TimeDistributionChartProps {
  data: TimeDistribution[];
}

export function TimeDistributionChart({ data }: TimeDistributionChartProps) {
  const CustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    // Only show label if percentage is significant enough
    if (percent < 0.05) return null;

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        className="text-xs sm:text-sm"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <Card>
      <CardHeader className="pb-3 sm:pb-6">
        <div className="space-y-1.5">
          <CardTitle className="text-base sm:text-lg">Lead Time Distribution</CardTitle>
          <CardDescription className="text-xs sm:text-sm">Breakdown of time spent in each phase for selected date range</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={CustomLabel}
              outerRadius={window.innerWidth < 640 ? 60 : 80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ fontSize: '11px' }}
              iconSize={10}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
