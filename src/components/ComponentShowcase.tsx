import { Activity, Clock, Rocket, TrendingUp, TrendingDown, AlertCircle } from "lucide-react";
import { MetricCard } from "./MetricCard";
import { DeploymentFrequencyChart } from "./DeploymentFrequencyChart";
import { LeadTimeChart } from "./LeadTimeChart";
import { DeploymentHeatmap } from "./DeploymentHeatmap";
import { TimeDistributionChart } from "./TimeDistributionChart";
import { Separator } from "./ui/separator";

export function ComponentShowcase() {
  // Generate data for all chart variations
  const generateDeploymentData = (pattern: 'high' | 'medium' | 'low' | 'mixed') => {
    const data = [];
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    
    for (let i = 29; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dayOfWeek = date.getDay();
      
      let deployments = 0;
      if (pattern === 'high') {
        deployments = dayOfWeek === 0 || dayOfWeek === 6 ? 0 : Math.floor(Math.random() * 3) + 5;
      } else if (pattern === 'medium') {
        deployments = dayOfWeek === 0 || dayOfWeek === 6 ? 0 : Math.floor(Math.random() * 2) + 2;
      } else if (pattern === 'low') {
        deployments = Math.random() > 0.7 ? 1 : 0;
      } else {
        deployments = Math.floor(Math.random() * 8);
      }
      
      data.push({
        date: date.toISOString().split('T')[0],
        day: `${days[dayOfWeek]} ${date.getDate()}`,
        deployments,
      });
    }
    
    return data;
  };

  const generateLeadTimeData = (performance: 'elite' | 'high' | 'medium' | 'low') => {
    const data = [];
    const baseValues = {
      elite: 15,
      high: 40,
      medium: 120,
      low: 300,
    };
    
    for (let i = 29; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const base = baseValues[performance];
      const leadTime = base + (Math.random() * base * 0.3 - base * 0.15);
      
      data.push({
        date: `${date.getMonth() + 1}/${date.getDate()}`,
        leadTime: Math.round(leadTime * 10) / 10,
        average: base,
      });
    }
    
    return data;
  };

  const generateHeatmapData = (activity: 'high' | 'low' | 'sporadic') => {
    const data = [];
    const totalDays = 84;
    
    for (let i = totalDays - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dayOfWeek = date.getDay();
      const week = Math.floor((totalDays - i - 1) / 7);
      
      let count = 0;
      if (activity === 'high') {
        count = dayOfWeek === 0 || dayOfWeek === 6 ? Math.floor(Math.random() * 2) : Math.floor(Math.random() * 4) + 4;
      } else if (activity === 'low') {
        count = Math.random() > 0.6 ? Math.floor(Math.random() * 2) : 0;
      } else {
        count = Math.floor(Math.random() * 8);
      }
      
      data.push({
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        count,
        dayOfWeek,
        week,
      });
    }
    
    return data;
  };

  // Time distribution variations
  const timeDistributions = {
    balanced: [
      { name: "Development", value: 35, color: "#3b82f6" },
      { name: "Code Review", value: 20, color: "#8b5cf6" },
      { name: "Testing", value: 25, color: "#10b981" },
      { name: "Deployment", value: 15, color: "#f59e0b" },
      { name: "Waiting", value: 5, color: "#ef4444" },
    ],
    developmentHeavy: [
      { name: "Development", value: 50, color: "#3b82f6" },
      { name: "Code Review", value: 15, color: "#8b5cf6" },
      { name: "Testing", value: 20, color: "#10b981" },
      { name: "Deployment", value: 10, color: "#f59e0b" },
      { name: "Waiting", value: 5, color: "#ef4444" },
    ],
    waitingHeavy: [
      { name: "Development", value: 25, color: "#3b82f6" },
      { name: "Code Review", value: 15, color: "#8b5cf6" },
      { name: "Testing", value: 20, color: "#10b981" },
      { name: "Deployment", value: 10, color: "#f59e0b" },
      { name: "Waiting", value: 30, color: "#ef4444" },
    ],
  };

  return (
    <div className="space-y-8">
      {/* Section: Metric Cards */}
      <section>
        <div className="mb-4">
          <h2 className="text-xl sm:text-2xl mb-2">Metric Cards</h2>
          <p className="text-sm text-muted-foreground">All status types with positive and negative trends</p>
        </div>
        
        <div className="space-y-6">
          {/* Elite Status */}
          <div>
            <h3 className="text-sm mb-3 text-muted-foreground">Elite Performance</h3>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <MetricCard
                title="Deployment Frequency"
                value="8.5/day"
                change={15.3}
                changeLabel="vs last month"
                status="elite"
                icon={<Rocket className="h-4 w-4" />}
              />
              <MetricCard
                title="Lead Time for Changes"
                value="12.3h"
                change={-22.5}
                changeLabel="vs last month"
                status="elite"
                icon={<Clock className="h-4 w-4" />}
                lowerIsBetter={true}
              />
              <MetricCard
                title="Success Rate"
                value="99.5%"
                change={3.2}
                changeLabel="vs last month"
                status="elite"
                icon={<TrendingUp className="h-4 w-4" />}
              />
            </div>
          </div>

          {/* High Status */}
          <div>
            <h3 className="text-sm mb-3 text-muted-foreground">High Performance</h3>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <MetricCard
                title="Deployment Frequency"
                value="2.5/day"
                change={8.7}
                changeLabel="vs last month"
                status="high"
                icon={<Rocket className="h-4 w-4" />}
              />
              <MetricCard
                title="Lead Time for Changes"
                value="48h"
                change={-12.3}
                changeLabel="vs last month"
                status="high"
                icon={<Clock className="h-4 w-4" />}
                lowerIsBetter={true}
              />
              <MetricCard
                title="Total Deployments"
                value="156"
                change={5.2}
                changeLabel="vs last month"
                status="high"
                icon={<Activity className="h-4 w-4" />}
              />
            </div>
          </div>

          {/* Medium Status */}
          <div>
            <h3 className="text-sm mb-3 text-muted-foreground">Medium Performance</h3>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <MetricCard
                title="Deployment Frequency"
                value="0.5/day"
                change={2.1}
                changeLabel="vs last month"
                status="medium"
                icon={<Rocket className="h-4 w-4" />}
              />
              <MetricCard
                title="Lead Time for Changes"
                value="5.2d"
                change={-3.5}
                changeLabel="vs last month"
                status="medium"
                icon={<Clock className="h-4 w-4" />}
                lowerIsBetter={true}
              />
              <MetricCard
                title="Success Rate"
                value="92.1%"
                change={-1.2}
                changeLabel="vs last month"
                status="medium"
                icon={<TrendingDown className="h-4 w-4" />}
              />
            </div>
          </div>

          {/* Low Status */}
          <div>
            <h3 className="text-sm mb-3 text-muted-foreground">Low Performance</h3>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <MetricCard
                title="Deployment Frequency"
                value="0.1/day"
                change={-5.3}
                changeLabel="vs last month"
                status="low"
                icon={<Rocket className="h-4 w-4" />}
              />
              <MetricCard
                title="Lead Time for Changes"
                value="18.5d"
                change={8.7}
                changeLabel="vs last month"
                status="low"
                icon={<Clock className="h-4 w-4" />}
                lowerIsBetter={true}
              />
              <MetricCard
                title="Success Rate"
                value="78.3%"
                change={-12.5}
                changeLabel="vs last month"
                status="low"
                icon={<AlertCircle className="h-4 w-4" />}
              />
            </div>
          </div>
        </div>
      </section>

      <Separator className="my-8" />

      {/* Section: Deployment Frequency Charts */}
      <section>
        <div className="mb-4">
          <h2 className="text-xl sm:text-2xl mb-2">Deployment Frequency Charts</h2>
          <p className="text-sm text-muted-foreground">Different deployment patterns and frequencies</p>
        </div>
        
        <div className="space-y-4">
          <div>
            <h3 className="text-sm mb-3 text-muted-foreground">High Frequency (Elite Performance)</h3>
            <DeploymentFrequencyChart data={generateDeploymentData('high')} />
          </div>
          
          <div>
            <h3 className="text-sm mb-3 text-muted-foreground">Medium Frequency</h3>
            <DeploymentFrequencyChart data={generateDeploymentData('medium')} />
          </div>
          
          <div>
            <h3 className="text-sm mb-3 text-muted-foreground">Low Frequency</h3>
            <DeploymentFrequencyChart data={generateDeploymentData('low')} />
          </div>
          
          <div>
            <h3 className="text-sm mb-3 text-muted-foreground">Mixed Pattern</h3>
            <DeploymentFrequencyChart data={generateDeploymentData('mixed')} />
          </div>
        </div>
      </section>

      <Separator className="my-8" />

      {/* Section: Lead Time Charts */}
      <section>
        <div className="mb-4">
          <h2 className="text-xl sm:text-2xl mb-2">Lead Time Charts</h2>
          <p className="text-sm text-muted-foreground">Different performance levels for lead time</p>
        </div>
        
        <div className="space-y-4">
          <div>
            <h3 className="text-sm mb-3 text-muted-foreground">Elite Performance {"(<24h)"}</h3>
            <LeadTimeChart data={generateLeadTimeData('elite')} />
          </div>
          
          <div>
            <h3 className="text-sm mb-3 text-muted-foreground">High Performance (24h-1wk)</h3>
            <LeadTimeChart data={generateLeadTimeData('high')} />
          </div>
          
          <div>
            <h3 className="text-sm mb-3 text-muted-foreground">Medium Performance (1wk-1mo)</h3>
            <LeadTimeChart data={generateLeadTimeData('medium')} />
          </div>
          
          <div>
            <h3 className="text-sm mb-3 text-muted-foreground">Low Performance {"(>1mo)"}</h3>
            <LeadTimeChart data={generateLeadTimeData('low')} />
          </div>
        </div>
      </section>

      <Separator className="my-8" />

      {/* Section: Deployment Heatmaps */}
      <section>
        <div className="mb-4">
          <h2 className="text-xl sm:text-2xl mb-2">Deployment Heatmaps</h2>
          <p className="text-sm text-muted-foreground">Different activity patterns over 12 weeks</p>
        </div>
        
        <div className="space-y-4">
          <div>
            <h3 className="text-sm mb-3 text-muted-foreground">High Activity</h3>
            <div className="lg:max-w-3xl">
              <DeploymentHeatmap data={generateHeatmapData('high')} />
            </div>
          </div>
          
          <div>
            <h3 className="text-sm mb-3 text-muted-foreground">Low Activity</h3>
            <div className="lg:max-w-3xl">
              <DeploymentHeatmap data={generateHeatmapData('low')} />
            </div>
          </div>
          
          <div>
            <h3 className="text-sm mb-3 text-muted-foreground">Sporadic Activity</h3>
            <div className="lg:max-w-3xl">
              <DeploymentHeatmap data={generateHeatmapData('sporadic')} />
            </div>
          </div>
        </div>
      </section>

      <Separator className="my-8" />

      {/* Section: Time Distribution Charts */}
      <section>
        <div className="mb-4">
          <h2 className="text-xl sm:text-2xl mb-2">Lead Time Distribution Charts</h2>
          <p className="text-sm text-muted-foreground">Different phase distribution patterns</p>
        </div>
        
        <div className="space-y-4">
          <div>
            <h3 className="text-sm mb-3 text-muted-foreground">Balanced Distribution</h3>
            <div className="lg:max-w-3xl">
              <TimeDistributionChart data={timeDistributions.balanced} />
            </div>
          </div>
          
          <div>
            <h3 className="text-sm mb-3 text-muted-foreground">Development Heavy</h3>
            <div className="lg:max-w-3xl">
              <TimeDistributionChart data={timeDistributions.developmentHeavy} />
            </div>
          </div>
          
          <div>
            <h3 className="text-sm mb-3 text-muted-foreground">High Waiting Time (Performance Issue)</h3>
            <div className="lg:max-w-3xl">
              <TimeDistributionChart data={timeDistributions.waitingHeavy} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
