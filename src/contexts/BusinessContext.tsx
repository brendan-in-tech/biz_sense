import { createContext, useContext, useReducer, ReactNode } from 'react';
import { BusinessMetrics, MarketingMetrics, CompetitorBenchmark, BusinessProfile } from '../types/business';

interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  status: 'completed' | 'pending' | 'failed';
  client?: string;
  service?: string;
  eventId?: string;
}

interface BusinessState {
  metrics: BusinessMetrics;
  marketing: MarketingMetrics;
  benchmarks: CompetitorBenchmark;
  profile: BusinessProfile;
  transactions: Transaction[];
  isLoading: boolean;
  error: string | null;
}

type BusinessAction =
  | { type: 'SET_METRICS'; payload: BusinessMetrics }
  | { type: 'SET_MARKETING'; payload: MarketingMetrics }
  | { type: 'SET_BENCHMARKS'; payload: CompetitorBenchmark }
  | { type: 'SET_PROFILE'; payload: BusinessProfile }
  | { type: 'SET_TRANSACTIONS'; payload: Transaction[] }
  | { type: 'ADD_TRANSACTION'; payload: Transaction }
  | { type: 'UPDATE_TRANSACTION'; payload: { id: string; transaction: Transaction } }
  | { type: 'DELETE_TRANSACTION'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null };

const initialState: BusinessState = {
  metrics: {
    revenue: 0,
    costs: { fixed: 0, variable: 0 },
    profit: 0,
    customerCount: 0,
    averageOrderValue: 0,
  },
  marketing: {
    campaignROI: 0,
    adSpend: 0,
    conversions: 0,
    customerAcquisitionCost: 0,
  },
  benchmarks: {
    averagePrice: 0,
    marketShare: 0,
    customerSatisfaction: 0,
    growthRate: 0,
  },
  profile: {
    id: '',
    name: '',
    industry: '',
    size: 'small',
    monthlyRevenue: 0,
    employeeCount: 0,
    foundedYear: new Date().getFullYear(),
    location: {
      city: '',
      state: '',
      country: '',
    },
  },
  transactions: [],
  isLoading: false,
  error: null,
};

function businessReducer(state: BusinessState, action: BusinessAction): BusinessState {
  switch (action.type) {
    case 'SET_METRICS':
      return { ...state, metrics: action.payload };
    case 'SET_MARKETING':
      return { ...state, marketing: action.payload };
    case 'SET_BENCHMARKS':
      return { ...state, benchmarks: action.payload };
    case 'SET_PROFILE':
      return { ...state, profile: action.payload };
    case 'SET_TRANSACTIONS':
      return { ...state, transactions: action.payload };
    case 'ADD_TRANSACTION':
      return {
        ...state,
        transactions: [...state.transactions, action.payload],
      };
    case 'UPDATE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.map((t) =>
          t.id === action.payload.id ? action.payload.transaction : t
        ),
      };
    case 'DELETE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.filter((t) => t.id !== action.payload),
      };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
}

const BusinessContext = createContext<{
  state: BusinessState;
  dispatch: React.Dispatch<BusinessAction>;
} | null>(null);

export function BusinessProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(businessReducer, initialState);

  return (
    <BusinessContext.Provider value={{ state, dispatch }}>
      {children}
    </BusinessContext.Provider>
  );
}

export function useBusinessContext() {
  const context = useContext(BusinessContext);
  if (!context) {
    throw new Error('useBusinessContext must be used within a BusinessProvider');
  }
  return context;
} 