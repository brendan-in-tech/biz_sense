export interface BusinessMetrics {
  revenue: number;
  costs: {
    fixed: number;
    variable: number;
  };
  profit: number;
  customerCount: number;
  averageOrderValue: number;
}

export interface MarketingMetrics {
  campaignROI: number;
  adSpend: number;
  conversions: number;
  customerAcquisitionCost: number;
}

export interface CompetitorBenchmark {
  averagePrice: number;
  marketShare: number;
  customerSatisfaction: number;
  growthRate: number;
}

export interface FinancialProjection {
  period: string;
  revenue: number;
  costs: number;
  profit: number;
  growthRate: number;
}

export interface BusinessProfile {
  id: string;
  name: string;
  industry: string;
  size: 'micro' | 'small' | 'medium';
  monthlyRevenue: number;
  employeeCount: number;
  foundedYear: number;
  location: {
    city: string;
    state: string;
    country: string;
  };
}

export interface Alert {
  id: string;
  type: 'warning' | 'success' | 'info' | 'error';
  message: string;
  metric: keyof BusinessMetrics | keyof MarketingMetrics;
  threshold: number;
  currentValue: number;
  timestamp: string;
}

export interface DashboardWidget {
  id: string;
  type: 'chart' | 'metric' | 'alert' | 'comparison';
  title: string;
  position: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  data: any;
  settings: {
    refreshInterval?: number;
    chartType?: 'line' | 'bar' | 'pie';
    comparison?: 'benchmark' | 'historical' | 'target';
  };
}

export interface UserPreferences {
  dashboardLayout: DashboardWidget[];
  alertThresholds: Record<string, number>;
  currency: string;
  dateFormat: string;
  theme: 'light' | 'dark' | 'system';
}

export interface BreakEvenAnalysis {
  breakEvenPoint: number;
  breakEvenUnits: number;
  marginOfSafety: number;
  contributionMargin: number;
  fixedCosts: number;
  variableCosts: number;
}

export interface PricingStrategy {
  recommendedPrice: number;
  minPrice: number;
  maxPrice: number;
  competitorPrices: number[];
  marginAtRecommendedPrice: number;
  projectedDemand: number;
  elasticity: number;
} 