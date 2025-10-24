import { Activity, CalendarIcon, Clock, Palette, Rocket } from "lucide-react";
import { useEffect, useState } from "react";
import { ComponentShowcase } from "./components/ComponentShowcase";
import { DeploymentFrequencyChart } from "./components/DeploymentFrequencyChart";
import { DeploymentHeatmap } from "./components/DeploymentHeatmap";
import { LeadTimeChart } from "./components/LeadTimeChart";
import { MetricCard } from "./components/MetricCard";
import { Repository, RepositorySelector } from "./components/RepositorySelector";
import { TimeDistributionChart } from "./components/TimeDistributionChart";
import { Button } from "./components/ui/button";
import { Calendar } from "./components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { cn } from "./components/ui/utils";
import Progress from "./imports/Progress";
import { apiService, DeploymentData, HeatmapData, LeadTimeData, MetricSummary, TimeDistributionData } from "./services/api";

// Les fonctions de génération de données sont maintenant dans apiService



export default function App() {
  // Date range state
  const today = new Date();
  const thirtyDaysAgo = new Date(today);
  thirtyDaysAgo.setDate(today.getDate() - 30);
  
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: thirtyDaysAgo,
    to: today,
  });
  
  // Repository selection state - start with all selected
  const [selectedRepositories, setSelectedRepositories] = useState<string[]>([]);
  const [repositories, setRepositories] = useState<Repository[]>([]);
  
  // Individual period states for each chart
  const [deploymentPeriod, setDeploymentPeriod] = useState<'day' | 'week' | 'month'>('day');
  const [leadTimePeriod, setLeadTimePeriod] = useState<'day' | 'week' | 'month'>('day');
  const [heatmapPeriod, setHeatmapPeriod] = useState<'day' | 'week' | 'month'>('day');
  
  // Data states
  const [deploymentData, setDeploymentData] = useState<DeploymentData[]>([]);
  const [leadTimeData, setLeadTimeData] = useState<LeadTimeData[]>([]);
  const [heatmapData, setHeatmapData] = useState<HeatmapData[]>([]);
  const [timeDistributionData, setTimeDistributionData] = useState<TimeDistributionData[]>([]);
  const [metricsSummary, setMetricsSummary] = useState<MetricSummary | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Load repositories on component mount
  useEffect(() => {
    const loadRepositories = async () => {
      try {
        const repos = await apiService.getRepositories();
        setRepositories(repos);
        setSelectedRepositories(repos.map(r => r.id));
      } catch (error) {
        console.error('Error loading repositories:', error);
      }
    };
    loadRepositories();
  }, []);

  // Load data when repositories, date range, or periods change
  useEffect(() => {
    const loadData = async () => {
      if (selectedRepositories.length === 0) return;
      
      setLoading(true);
      try {
        const [
          deploymentFreqData,
          leadTimeDataResult,
          heatmapDataResult,
          timeDistData,
          summaryData
        ] = await Promise.all([
          apiService.getDeploymentFrequency(selectedRepositories, dateRange.from, dateRange.to, deploymentPeriod),
          apiService.getLeadTime(selectedRepositories, dateRange.from, dateRange.to, leadTimePeriod),
          apiService.getDeploymentHeatmap(selectedRepositories, dateRange.from, dateRange.to),
          apiService.getTimeDistribution(),
          apiService.getMetricsSummary(selectedRepositories, dateRange.from, dateRange.to)
        ]);

        // S'assurer que les données existent avant de les définir
        setDeploymentData(deploymentFreqData || []);
        setLeadTimeData(leadTimeDataResult || []);
        setHeatmapData(heatmapDataResult || []);
        setTimeDistributionData(timeDistData || []);
        setMetricsSummary(summaryData || null);
      } catch (error) {
        console.error('Error loading data:', error);
        // En cas d'erreur, utiliser les données de fallback
        setDeploymentData([]);
        setLeadTimeData([]);
        setHeatmapData([]);
        setTimeDistributionData([]);
        setMetricsSummary(null);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [selectedRepositories, dateRange, deploymentPeriod, leadTimePeriod]);
  
  // Format date range for display
  const formatDateRange = () => {
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
    const fromStr = dateRange.from.toLocaleDateString('en-US', options);
    const toStr = dateRange.to.toLocaleDateString('en-US', options);
    const yearStr = dateRange.to.getFullYear() !== new Date().getFullYear() 
      ? `, ${dateRange.to.getFullYear()}` 
      : '';
    return `${fromStr} - ${toStr}${yearStr}`;
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto p-4 sm:p-6 space-y-4 sm:space-y-6 max-w-7xl">
        {/* Header */}
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-lg bg-[#DFE0FF] flex items-center justify-center flex-shrink-0">
                  <div className="h-4 w-4 sm:h-5 sm:w-5">
                    <Progress />
                  </div>
                </div>
                <h1 className="text-xl sm:text-2xl md:text-3xl">Djamo Dora</h1>
              </div>
              <p className="text-sm sm:text-base text-muted-foreground">
                Track your team's DevOps performance with key DORA metrics
              </p>
            </div>
            
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-2">
              <RepositorySelector
                repositories={repositories}
                selectedRepositories={selectedRepositories}
                onSelectionChange={setSelectedRepositories}
              />
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "justify-start text-left text-xs sm:text-sm w-full sm:w-auto",
                      !dateRange && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4 flex-shrink-0" />
                    <span className="truncate">
                      {dateRange ? formatDateRange() : "Pick a date range"}
                    </span>
                  </Button>
                </PopoverTrigger>
              <PopoverContent className="w-auto p-0 max-w-[95vw]" align="end">
                <div className="flex flex-col">
                  <div className="border-b p-3 space-y-2">
                    <p className="text-sm font-medium">Quick Select</p>
                    <div className="grid grid-cols-2 gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="justify-start text-xs h-8"
                        onClick={() => {
                          const to = new Date();
                          const from = new Date();
                          from.setDate(to.getDate() - 7);
                          setDateRange({ from, to });
                        }}
                      >
                        Last 7 days
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="justify-start text-xs h-8"
                        onClick={() => {
                          const to = new Date();
                          const from = new Date();
                          from.setDate(to.getDate() - 30);
                          setDateRange({ from, to });
                        }}
                      >
                        Last 30 days
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="justify-start text-xs h-8"
                        onClick={() => {
                          const to = new Date();
                          const from = new Date();
                          from.setDate(to.getDate() - 90);
                          setDateRange({ from, to });
                        }}
                      >
                        Last 90 days
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="justify-start text-xs h-8"
                        onClick={() => {
                          const to = new Date();
                          const from = new Date();
                          from.setMonth(to.getMonth() - 6);
                          setDateRange({ from, to });
                        }}
                      >
                        Last 6 months
                      </Button>
                    </div>
                  </div>
                  <div className="p-3">
                    <Calendar
                      mode="range"
                      selected={{ from: dateRange.from, to: dateRange.to }}
                      onSelect={(range) => {
                        if (range?.from && range?.to) {
                          setDateRange({ from: range.from, to: range.to });
                        }
                      }}
                      numberOfMonths={1}
                      initialFocus
                    />
                  </div>
                </div>
              </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-4 md:grid-cols-3">
          {loading ? (
            // Loading skeleton
            <>
              <div className="h-24 bg-muted animate-pulse rounded-lg"></div>
              <div className="h-24 bg-muted animate-pulse rounded-lg"></div>
              <div className="h-24 bg-muted animate-pulse rounded-lg"></div>
            </>
          ) : metricsSummary ? (
            <>
              <MetricCard
                title="Deployment Frequency"
                value={`${metricsSummary.deploymentFrequency?.value || 0}/${metricsSummary.deploymentFrequency?.unit || 'per day'}`}
                change={metricsSummary.deploymentFrequency?.trend || 0}
                changeLabel="vs previous period"
                status={metricsSummary.deploymentFrequency?.status || 'medium'}
                icon={<Rocket className="h-4 w-4" />}
              />
              <MetricCard
                title="Lead Time for Changes"
                value={`${metricsSummary.leadTime?.value || 0}${metricsSummary.leadTime?.unit || 'hours'}`}
                change={metricsSummary.leadTime?.trend || 0}
                changeLabel="vs previous period"
                status={metricsSummary.leadTime?.status || 'medium'}
                icon={<Clock className="h-4 w-4" />}
                lowerIsBetter={true}
              />
              <MetricCard
                title="Total Deployments"
                value={(metricsSummary.totalDeployments?.value || 0).toString()}
                change={metricsSummary.totalDeployments?.trend || 0}
                changeLabel="vs previous period"
                status={metricsSummary.totalDeployments?.status || 'medium'}
                icon={<Activity className="h-4 w-4" />}
              />
            </>
          ) : null}
        </div>

        {/* Charts */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="w-full sm:w-auto grid grid-cols-2 sm:grid-cols-4">
            <TabsTrigger value="overview" className="text-xs sm:text-sm">Overview</TabsTrigger>
            <TabsTrigger value="frequency" className="text-xs sm:text-sm">Frequency</TabsTrigger>
            <TabsTrigger value="leadtime" className="text-xs sm:text-sm">Lead Time</TabsTrigger>
            <TabsTrigger value="showcase" className="text-xs sm:text-sm flex items-center gap-1">
              <Palette className="h-3 w-3" />
              <span className="hidden sm:inline">Showcase</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 lg:grid-cols-2">
              <DeploymentFrequencyChart 
                data={deploymentData} 
                period={deploymentPeriod}
                onPeriodChange={setDeploymentPeriod}
              />
              <LeadTimeChart 
                data={leadTimeData} 
                period={leadTimePeriod}
                onPeriodChange={setLeadTimePeriod}
              />
            </div>
            <div className="grid gap-4 lg:grid-cols-2">
              <DeploymentHeatmap 
                data={heatmapData} 
                period={heatmapPeriod}
                onPeriodChange={setHeatmapPeriod}
              />
              <TimeDistributionChart 
                data={timeDistributionData}
              />
            </div>
          </TabsContent>

          <TabsContent value="frequency" className="space-y-4">
            <DeploymentFrequencyChart 
              data={deploymentData} 
              period={deploymentPeriod}
              onPeriodChange={setDeploymentPeriod}
            />
            <div className="lg:max-w-3xl">
              <DeploymentHeatmap 
                data={heatmapData} 
                period={heatmapPeriod}
                onPeriodChange={setHeatmapPeriod}
              />
            </div>
          </TabsContent>

          <TabsContent value="leadtime" className="space-y-4">
            <LeadTimeChart 
              data={leadTimeData} 
              period={leadTimePeriod}
              onPeriodChange={setLeadTimePeriod}
            />
            <div className="lg:max-w-3xl">
              <TimeDistributionChart 
                data={timeDistributionData}
              />
            </div>
          </TabsContent>

          <TabsContent value="showcase" className="space-y-4">
            <div className="rounded-lg border bg-card p-4 mb-6">
              <h3 className="text-sm mb-1">Component Showcase</h3>
              <p className="text-xs text-muted-foreground">
                This page displays all dashboard components in their various states and configurations.
                Use this as a reference for understanding different performance levels and visual indicators.
              </p>
            </div>
            <ComponentShowcase />
          </TabsContent>
        </Tabs>

        {/* Footer Info */}
        <div className="rounded-lg border bg-card p-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="text-xs text-muted-foreground">Elite Performance</div>
              <div className="text-sm">Multiple deploys per day, {"<"}24h lead time</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">High Performance</div>
              <div className="text-sm">Weekly deploys, {"<"}1 week lead time</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Medium Performance</div>
              <div className="text-sm">Monthly deploys, {"<"}1 month lead time</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Low Performance</div>
              <div className="text-sm">Fewer than monthly deploys</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
