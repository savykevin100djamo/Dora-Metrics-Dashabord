import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { PeriodSelector } from "./PeriodSelector";

interface HeatmapDay {
  date: string;
  count: number;
  dayOfWeek: number;
  week: number;
}

interface DeploymentHeatmapProps {
  data: HeatmapDay[];
  period?: 'day' | 'week' | 'month';
  onPeriodChange?: (period: 'day' | 'week' | 'month') => void;
}

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function DeploymentHeatmap({ data, period = 'day', onPeriodChange }: DeploymentHeatmapProps) {
  const getIntensity = (count: number) => {
    if (count === 0) return "bg-muted";
    if (count <= 2) return "bg-emerald-200 dark:bg-emerald-900/30";
    if (count <= 4) return "bg-emerald-400 dark:bg-emerald-700/50";
    if (count <= 6) return "bg-emerald-500 dark:bg-emerald-600/70";
    return "bg-emerald-600 dark:bg-emerald-500";
  };

  const weeks = Math.ceil(data.length / 7);
  const grid: (HeatmapDay | null)[][] = Array(7).fill(null).map(() => Array(weeks).fill(null));

  data.forEach(day => {
    grid[day.dayOfWeek][day.week] = day;
  });

  const getDescription = () => {
    return 'Deployment patterns in selected date range';
  };

  return (
    <Card>
      <CardHeader className="pb-3 sm:pb-6">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1.5">
            <CardTitle className="text-base sm:text-lg">Deployment Activity Heatmap</CardTitle>
            <CardDescription className="text-xs sm:text-sm">{getDescription()}</CardDescription>
          </div>
          {onPeriodChange && (
            <PeriodSelector value={period} onValueChange={onPeriodChange} />
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="w-full overflow-x-auto -mx-2 px-2">
          <div className="inline-block min-w-full">
            <div className="space-y-1">
              {grid.map((week, dayIndex) => (
                <div key={dayIndex} className="flex items-center gap-1">
                  <div className="text-xs w-7 sm:w-8 text-muted-foreground flex-shrink-0">
                    {daysOfWeek[dayIndex]}
                  </div>
                  <div className="flex gap-1">
                    {week.map((day, weekIndex) => (
                      <Tooltip key={weekIndex}>
                        <TooltipTrigger asChild>
                          <div
                            className={`w-3 h-3 sm:w-4 sm:h-4 rounded-sm flex-shrink-0 ${
                              day ? getIntensity(day.count) : "bg-muted/50"
                            } transition-colors hover:ring-2 hover:ring-primary/50 cursor-pointer`}
                          />
                        </TooltipTrigger>
                        <TooltipContent className="bg-gray-900 text-white border-gray-700 rounded-full px-4 py-2.5">
                          {day ? (
                            <div className="text-xs">
                              <div className="font-medium">{day.date}</div>
                              <div>Deployments: {day.count}</div>
                            </div>
                          ) : (
                            <div className="text-xs">No data</div>
                          )}
                        </TooltipContent>
                      </Tooltip>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-4">
          <span className="text-xs text-muted-foreground">Less</span>
          <div className="flex gap-1">
            <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-sm bg-muted flex-shrink-0" />
            <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-sm bg-emerald-200 dark:bg-emerald-900/30 flex-shrink-0" />
            <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-sm bg-emerald-400 dark:bg-emerald-700/50 flex-shrink-0" />
            <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-sm bg-emerald-500 dark:bg-emerald-600/70 flex-shrink-0" />
            <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-sm bg-emerald-600 dark:bg-emerald-500 flex-shrink-0" />
          </div>
          <span className="text-xs text-muted-foreground">More</span>
        </div>
      </CardContent>
    </Card>
  );
}
