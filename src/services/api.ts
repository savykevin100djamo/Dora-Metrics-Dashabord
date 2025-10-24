// Types pour les données API - adaptés au backend réel
export interface Repository {
  id: string;
  externalId: string;
  repo: string;
  link: string;
  createdAtExternal: string;
  updatedAtExternal: string;
}

export interface DeploymentData {
  date: string;
  deployments: number;
  day: string;
}

export interface DeploymentFrequencyResponse {
  data: DeploymentData[];
  summary: {
    totalDeployments: number;
    averagePerPeriod: number;
    trend: number;
  };
}

export interface LeadTimeData {
  date: string;
  leadTime: number;
  average: number;
}

export interface LeadTimeResponse {
  data: LeadTimeData[];
  summary: {
    averageLeadTime: number;
    medianLeadTime: number;
    trend: number;
  };
  timeDistribution: {
    development: number;
    codeReview: number;
    testing: number;
    deployment: number;
    waiting: number;
  };
}

export interface HeatmapData {
  date: string;
  count: number;
  dayOfWeek: number;
  week: number;
}

export interface TimeDistributionData {
  name: string;
  value: number;
  color: string;
}

export interface MetricSummary {
  deploymentFrequency: {
    value: number;
    unit: string;
    status: 'elite' | 'high' | 'medium' | 'low';
    trend: number;
  };
  leadTime: {
    value: number;
    unit: string;
    status: 'elite' | 'high' | 'medium' | 'low';
    trend: number;
  };
}

// Données mockées statiques - adaptées pour correspondre aux types backend
const mockRepositories: Repository[] = [
  { 
    id: "1", 
    externalId: "github-1", 
    repo: "backend-api", 
    link: "https://github.com/djamo/backend-api", 
    createdAtExternal: "2024-01-01T00:00:00.000Z", 
    updatedAtExternal: "2024-01-01T00:00:00.000Z" 
  },
  { 
    id: "2", 
    externalId: "github-2", 
    repo: "frontend-web", 
    link: "https://github.com/djamo/frontend-web", 
    createdAtExternal: "2024-01-01T00:00:00.000Z", 
    updatedAtExternal: "2024-01-01T00:00:00.000Z" 
  },
  { 
    id: "3", 
    externalId: "github-3", 
    repo: "mobile-app", 
    link: "https://github.com/djamo/mobile-app", 
    createdAtExternal: "2024-01-01T00:00:00.000Z", 
    updatedAtExternal: "2024-01-01T00:00:00.000Z" 
  },
  { 
    id: "4", 
    externalId: "github-4", 
    repo: "payment-service", 
    link: "https://github.com/djamo/payment-service", 
    createdAtExternal: "2024-01-01T00:00:00.000Z", 
    updatedAtExternal: "2024-01-01T00:00:00.000Z" 
  },
  { 
    id: "5", 
    externalId: "github-5", 
    repo: "auth-service", 
    link: "https://github.com/djamo/auth-service", 
    createdAtExternal: "2024-01-01T00:00:00.000Z", 
    updatedAtExternal: "2024-01-01T00:00:00.000Z" 
  },
  { 
    id: "6", 
    externalId: "github-6", 
    repo: "notification-service", 
    link: "https://github.com/djamo/notification-service", 
    createdAtExternal: "2024-01-01T00:00:00.000Z", 
    updatedAtExternal: "2024-01-01T00:00:00.000Z" 
  },
  { 
    id: "7", 
    externalId: "github-7", 
    repo: "analytics-service", 
    link: "https://github.com/djamo/analytics-service", 
    createdAtExternal: "2024-01-01T00:00:00.000Z", 
    updatedAtExternal: "2024-01-01T00:00:00.000Z" 
  },
  { 
    id: "8", 
    externalId: "github-8", 
    repo: "admin-dashboard", 
    link: "https://github.com/djamo/admin-dashboard", 
    createdAtExternal: "2024-01-01T00:00:00.000Z", 
    updatedAtExternal: "2024-01-01T00:00:00.000Z" 
  },
];

// Fonction pour générer des données de déploiement mockées
const generateDeploymentData = (period: 'day' | 'week' | 'month', dateRange: { from: Date; to: Date }): DeploymentData[] => {
  const data: DeploymentData[] = [];
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
  const totalDays = Math.ceil((dateRange.to.getTime() - dateRange.from.getTime()) / (1000 * 60 * 60 * 24));
  
  if (period === 'day') {
    for (let i = totalDays; i >= 0; i--) {
      const date = new Date(dateRange.to);
      date.setDate(date.getDate() - i);
      
      if (date >= dateRange.from && date <= dateRange.to) {
        const dayOfWeek = date.getDay();
        const baseDeployments = dayOfWeek === 0 || dayOfWeek === 6 ? 0 : Math.floor(Math.random() * 5) + 1;
        const deployments = Math.max(0, baseDeployments + Math.floor(Math.random() * 3) - 1);
        
        data.push({
          date: date.toISOString().split('T')[0],
          day: `${days[dayOfWeek]} ${date.getDate()}`,
          deployments,
        });
      }
    }
  } else if (period === 'week') {
    const weeks = Math.ceil(totalDays / 7);
    for (let i = weeks; i >= 0; i--) {
      const date = new Date(dateRange.to);
      date.setDate(date.getDate() - (i * 7));
      
      if (date >= dateRange.from) {
        const deployments = Math.floor(Math.random() * 25) + 5;
        
        data.push({
          date: date.toISOString().split('T')[0],
          day: `W${Math.ceil((date.getDate()) / 7)} ${months[date.getMonth()]}`,
          deployments,
        });
      }
    }
  } else {
    const monthsDiff = (dateRange.to.getFullYear() - dateRange.from.getFullYear()) * 12 + 
                       (dateRange.to.getMonth() - dateRange.from.getMonth());
    
    for (let i = monthsDiff; i >= 0; i--) {
      const date = new Date(dateRange.to);
      date.setMonth(date.getMonth() - i);
      
      const deployments = Math.floor(Math.random() * 80) + 20;
      
      data.push({
        date: date.toISOString().split('T')[0],
        day: `${months[date.getMonth()]} ${date.getFullYear().toString().slice(2)}`,
        deployments,
      });
    }
  }
  
  return data;
};

// Fonction pour générer des données de lead time mockées
const generateLeadTimeData = (period: 'day' | 'week' | 'month', dateRange: { from: Date; to: Date }): LeadTimeData[] => {
  const data: LeadTimeData[] = [];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
  const totalDays = Math.ceil((dateRange.to.getTime() - dateRange.from.getTime()) / (1000 * 60 * 60 * 24));
  
  if (period === 'day') {
    for (let i = totalDays; i >= 0; i--) {
      const date = new Date(dateRange.to);
      date.setDate(date.getDate() - i);
      
      if (date >= dateRange.from && date <= dateRange.to) {
        const trend = 30 - (i * 0.5);
        const leadTime = Math.max(8, trend + (Math.random() * 10 - 5));
        const average = 18;
        
        data.push({
          date: `${date.getMonth() + 1}/${date.getDate()}`,
          leadTime: Math.round(leadTime * 10) / 10,
          average,
        });
      }
    }
  } else if (period === 'week') {
    const weeks = Math.ceil(totalDays / 7);
    for (let i = weeks; i >= 0; i--) {
      const date = new Date(dateRange.to);
      date.setDate(date.getDate() - (i * 7));
      
      if (date >= dateRange.from) {
        const trend = 25 - (i * 0.8);
        const leadTime = Math.max(10, trend + (Math.random() * 8 - 4));
        const average = 17;
        
        data.push({
          date: `W${Math.ceil((date.getDate()) / 7)} ${months[date.getMonth()]}`,
          leadTime: Math.round(leadTime * 10) / 10,
          average,
        });
      }
    }
  } else {
    const monthsDiff = (dateRange.to.getFullYear() - dateRange.from.getFullYear()) * 12 + 
                       (dateRange.to.getMonth() - dateRange.from.getMonth());
    
    for (let i = monthsDiff; i >= 0; i--) {
      const date = new Date(dateRange.to);
      date.setMonth(date.getMonth() - i);
      
      const trend = 22 - (i * 0.6);
      const leadTime = Math.max(12, trend + (Math.random() * 6 - 3));
      const average = 16;
      
      data.push({
        date: `${months[date.getMonth()]} ${date.getFullYear().toString().slice(2)}`,
        leadTime: Math.round(leadTime * 10) / 10,
        average,
      });
    }
  }
  
  return data;
};

// Fonction pour générer des données de heatmap mockées
const generateHeatmapData = (period: 'day' | 'week' | 'month', dateRange: { from: Date; to: Date }): HeatmapData[] => {
  const data: HeatmapData[] = [];
  
  const totalDays = Math.ceil((dateRange.to.getTime() - dateRange.from.getTime()) / (1000 * 60 * 60 * 24));
  
  for (let i = totalDays; i >= 0; i--) {
    const date = new Date(dateRange.to);
    date.setDate(date.getDate() - i);
    
    if (date >= dateRange.from && date <= dateRange.to) {
      const dayOfWeek = date.getDay();
      const week = Math.floor((totalDays - i) / 7);
      
      const count = dayOfWeek === 0 || dayOfWeek === 6 
        ? Math.floor(Math.random() * 2) 
        : Math.floor(Math.random() * 8);
      
      data.push({
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        count,
        dayOfWeek,
        week,
      });
    }
  }
  
  return data;
};

// Données de distribution du temps mockées
const mockTimeDistributionData: TimeDistributionData[] = [
  { name: "Development", value: 35, color: "#3b82f6" },
  { name: "Code Review", value: 20, color: "#8b5cf6" },
  { name: "Testing", value: 25, color: "#10b981" },
  { name: "Deployment", value: 15, color: "#f59e0b" },
  { name: "Waiting", value: 5, color: "#ef4444" },
];

// Configuration de l'API
const API_BASE_URL = 'http://localhost:3000';

// Services API - maintenant connectés au vrai backend
export const apiService = {
  // Récupérer la liste des repositories
  getRepositories: async (): Promise<Repository[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/repositories`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching repositories:', error);
      // Fallback vers les données mockées en cas d'erreur
      return mockRepositories;
    }
  },

  // Récupérer les données de fréquence de déploiement
  getDeploymentFrequency: async (
    repositoryIds: string[],
    startDate: Date,
    endDate: Date,
    period: 'day' | 'week' | 'month'
  ): Promise<DeploymentData[]> => {
    try {
      const params = new URLSearchParams({
        repositoryIds: repositoryIds.join(','),
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        period: period
      });
      
      const response = await fetch(`${API_BASE_URL}/metrics/deployment-frequency?${params}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: DeploymentFrequencyResponse = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error fetching deployment frequency:', error);
      // Fallback vers les données mockées en cas d'erreur
      return generateDeploymentData(period, { from: startDate, to: endDate });
    }
  },

  // Récupérer les données de lead time
  getLeadTime: async (
    repositoryIds: string[],
    startDate: Date,
    endDate: Date,
    period: 'day' | 'week' | 'month'
  ): Promise<LeadTimeData[]> => {
    try {
      const params = new URLSearchParams({
        repositoryIds: repositoryIds.join(','),
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        period: period
      });
      
      const response = await fetch(`${API_BASE_URL}/metrics/lead-time?${params}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: LeadTimeResponse = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error fetching lead time:', error);
      // Fallback vers les données mockées en cas d'erreur
      return generateLeadTimeData(period, { from: startDate, to: endDate });
    }
  },

  // Récupérer les données de heatmap
  getDeploymentHeatmap: async (
    repositoryIds: string[],
    startDate: Date,
    endDate: Date
  ): Promise<HeatmapData[]> => {
    try {
      const params = new URLSearchParams({
        repositoryIds: repositoryIds.join(','),
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString()
      });
      
      const response = await fetch(`${API_BASE_URL}/metrics/deployment-heatmap?${params}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Response is not JSON');
      }
      
      const data = await response.json();
      return data.data || [];
    } catch (error) {
      console.error('Error fetching deployment heatmap:', error);
      // Fallback vers les données mockées en cas d'erreur
      return generateHeatmapData('day', { from: startDate, to: endDate });
    }
  },

  // Récupérer la distribution du temps
  getTimeDistribution: async (): Promise<TimeDistributionData[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/metrics/time-distribution`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Response is not JSON');
      }
      
      const data = await response.json();
      return data.data || [];
    } catch (error) {
      console.error('Error fetching time distribution:', error);
      // Fallback vers les données mockées en cas d'erreur
      return mockTimeDistributionData;
    }
  },

  // Récupérer le résumé des métriques
  getMetricsSummary: async (
    repositoryIds: string[],
    startDate: Date,
    endDate: Date
  ): Promise<MetricSummary> => {
    try {
      const params = new URLSearchParams({
        repositoryIds: repositoryIds.join(','),
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString()
      });
      
      const response = await fetch(`${API_BASE_URL}/metrics/summary?${params}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Response is not JSON');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching metrics summary:', error);
      // Fallback vers les données mockées en cas d'erreur
      const deploymentData = generateDeploymentData('day', { from: startDate, to: endDate });
      const leadTimeData = generateLeadTimeData('day', { from: startDate, to: endDate });
      
      const totalDeployments = deploymentData.reduce((sum, day) => sum + day.deployments, 0);
      const avgDeploymentsPerDay = deploymentData.length > 0 ? totalDeployments / deploymentData.length : 0;
      const avgLeadTime = leadTimeData.length > 0 ? leadTimeData.reduce((sum, day) => sum + day.leadTime, 0) / leadTimeData.length : 0;

      return {
        deploymentFrequency: {
          value: Math.round(avgDeploymentsPerDay * 10) / 10,
          unit: 'per day',
          status: avgDeploymentsPerDay >= 1 ? 'elite' : avgDeploymentsPerDay >= 0.5 ? 'high' : 'medium',
          trend: 12.5
        },
        leadTime: {
          value: Math.round(avgLeadTime * 10) / 10,
          unit: 'hours',
          status: avgLeadTime <= 24 ? 'elite' : avgLeadTime <= 168 ? 'high' : 'medium',
          trend: -18.3
        }
      };
    }
  }
};
