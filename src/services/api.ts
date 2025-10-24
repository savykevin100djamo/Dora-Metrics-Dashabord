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
    id: "d891cda4-bad1-41e2-9dbb-6b1ab305f917", 
    externalId: "test-github-123", 
    repo: "test-edp-team1-backend", 
    link: "https://github.com/djamoapp/edp-team1-backend", 
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

// Fonction pour générer des données de déploiement mockées - basée sur les données réelles
const generateDeploymentData = (period: 'day' | 'week' | 'month', dateRange: { from: Date; to: Date }): DeploymentData[] => {
  // Données basées sur la structure fournie
  return [
    {
      date: "2025-10-01T00:00:00Z",
      deployments: 16,
      day: "Wed"
    }
  ];
};

// Fonction pour générer des données de lead time mockées - basée sur les données réelles
const generateLeadTimeData = (period: 'day' | 'week' | 'month', dateRange: { from: Date; to: Date }): LeadTimeData[] => {
  // Données basées sur la structure fournie
  return [
    {
      date: "2025-10-01T00:00:00Z",
      leadTime: 53.91,
      average: 53.91
    }
  ];
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

// Données de distribution du temps mockées - basées sur les données réelles
const mockTimeDistributionData: TimeDistributionData[] = [
  { name: "Development", value: 40, color: "#3b82f6" },
  { name: "Code Review", value: 30, color: "#8b5cf6" },
  { name: "Testing", value: 15, color: "#10b981" },
  { name: "Deployment", value: 10, color: "#f59e0b" },
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
      
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Response is not JSON');
      }
      
      const data: LeadTimeResponse = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error fetching lead time:', error);
      // Fallback vers les données mockées en cas d'erreur
      return generateLeadTimeData(period, { from: startDate, to: endDate });
    }
  },

  // Récupérer les données de lead time avec distribution du temps
  getLeadTimeWithDistribution: async (
    repositoryIds: string[],
    startDate: Date,
    endDate: Date,
    period: 'day' | 'week' | 'month'
  ): Promise<LeadTimeResponse> => {
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
      
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Response is not JSON');
      }
      
      const data: LeadTimeResponse = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching lead time with distribution:', error);
      // Fallback vers les données mockées en cas d'erreur
      return {
        data: generateLeadTimeData(period, { from: startDate, to: endDate }),
        summary: {
          averageLeadTime: 53.91,
          medianLeadTime: 53.91,
          trend: 38
        },
        timeDistribution: {
          development: 40,
          codeReview: 30,
          testing: 15,
          deployment: 10,
          waiting: 5
        }
      };
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
      // Fallback vers les données mockées en cas d'erreur - basées sur les données réelles
      return [
        { name: "Development", value: 40, color: "#3b82f6" },
        { name: "Code Review", value: 30, color: "#8b5cf6" },
        { name: "Testing", value: 15, color: "#10b981" },
        { name: "Deployment", value: 10, color: "#f59e0b" },
        { name: "Waiting", value: 5, color: "#ef4444" },
      ];
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
          value: 0.52,
          unit: 'per day',
          status: 'high',
          trend: 300
        },
        leadTime: {
          value: 53.91,
          unit: 'hours',
          status: 'high',
          trend: 38
        }
      };
    }
  }
};
