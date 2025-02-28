import {
  BusinessMetrics,
  MarketingMetrics,
  CompetitorBenchmark,
  BusinessProfile,
} from '../types/business';

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

// Mock data for development
const mockTransactions: Transaction[] = [
  {
    id: '1',
    date: '2025-03-15',
    description: 'Haircut and Color Service',
    amount: 150,
    type: 'income',
    category: 'Services',
    status: 'completed',
    client: 'Sarah Johnson',
    service: 'Cut & Color',
    eventId: '1'
  },
  {
    id: '2',
    date: '2025-03-15',
    description: 'Hair Product Sale - Shampoo',
    amount: 45,
    type: 'income',
    category: 'Product Sales',
    status: 'completed',
    client: 'Sarah Johnson',
    service: 'Retail'
  },
  {
    id: '3',
    date: '2025-03-14',
    description: 'Hair Color Supplies Restock',
    amount: -300,
    type: 'expense',
    category: 'Supplies',
    status: 'completed'
  },
  {
    id: '4',
    date: '2025-03-14',
    description: 'Balayage Service',
    amount: 200,
    type: 'income',
    category: 'Services',
    status: 'completed',
    client: 'Emily Davis',
    service: 'Balayage',
    eventId: '3'
  },
  {
    id: '5',
    date: '2025-03-13',
    description: 'Salon Chair Maintenance',
    amount: -150,
    type: 'expense',
    category: 'Equipment',
    status: 'completed'
  },
  {
    id: '6',
    date: '2025-03-13',
    description: 'Styling Tools Purchase',
    amount: -250,
    type: 'expense',
    category: 'Equipment',
    status: 'completed'
  },
  {
    id: '7',
    date: '2025-03-12',
    description: 'Men\'s Haircut',
    amount: 45,
    type: 'income',
    category: 'Services',
    status: 'completed',
    client: 'Michael Brown',
    service: 'Men\'s Cut',
    eventId: '5'
  },
  {
    id: '8',
    date: '2025-03-12',
    description: 'Hair Products Inventory',
    amount: -500,
    type: 'expense',
    category: 'Inventory',
    status: 'completed'
  },
  {
    id: '9',
    date: '2025-03-16',
    description: 'Upcoming Full Service Appointment',
    amount: 180,
    type: 'income',
    category: 'Services',
    status: 'pending',
    client: 'Rachel Green',
    service: 'Cut, Color & Style',
    eventId: '7'
  },
  {
    id: '10',
    date: '2025-03-11',
    description: 'Marketing - Social Media Ads',
    amount: -100,
    type: 'expense',
    category: 'Marketing',
    status: 'completed'
  },
  {
    id: '11',
    date: '2025-03-17',
    description: 'Deep Conditioning Treatment',
    amount: 120,
    type: 'income',
    category: 'Services',
    status: 'pending',
    client: 'Lisa Wong',
    service: 'Treatment',
    eventId: '8'
  },
  {
    id: '12',
    date: '2025-03-19',
    description: 'Bridal Trial Appointment',
    amount: 150,
    type: 'income',
    category: 'Services',
    status: 'pending',
    client: 'Jessica Smith',
    service: 'Bridal',
    eventId: '10'
  },
  {
    id: '13',
    date: '2025-03-19',
    description: 'Color Correction Service',
    amount: 300,
    type: 'income',
    category: 'Services',
    status: 'pending',
    client: 'Amy Chen',
    service: 'Color Correction',
    eventId: '11'
  },
  {
    id: '14',
    date: '2025-03-15',
    description: 'Hair Products Sale - Styling Products',
    amount: 85,
    type: 'income',
    category: 'Product Sales',
    status: 'completed',
    client: 'Emily Davis',
    service: 'Retail'
  },
  {
    id: '15',
    date: '2025-03-16',
    description: 'Salon Insurance Monthly Payment',
    amount: -200,
    type: 'expense',
    category: 'Insurance',
    status: 'completed'
  },
  {
    id: '16',
    date: '2025-03-17',
    description: 'Staff Training Materials',
    amount: -150,
    type: 'expense',
    category: 'Training',
    status: 'completed'
  },
  {
    id: '17',
    date: '2025-03-18',
    description: 'Utilities Payment',
    amount: -300,
    type: 'expense',
    category: 'Utilities',
    status: 'completed'
  },
  {
    id: '18',
    date: '2025-03-18',
    description: 'Hair Products Sale - Treatment Kit',
    amount: 120,
    type: 'income',
    category: 'Product Sales',
    status: 'completed',
    client: 'Lisa Wong',
    service: 'Retail'
  }
];

const mockBusinessProfile: BusinessProfile = {
  id: '1',
  name: 'Sample Business',
  industry: 'Retail',
  size: 'small',
  monthlyRevenue: 50000,
  employeeCount: 10,
  foundedYear: 2020,
  location: {
    city: 'San Francisco',
    state: 'CA',
    country: 'USA',
  },
};

const mockMetrics: BusinessMetrics = {
  revenue: 50000,
  costs: {
    fixed: 20000,
    variable: 15000,
  },
  profit: 15000,
  customerCount: 500,
  averageOrderValue: 100,
};

const mockMarketingMetrics: MarketingMetrics = {
  campaignROI: 150,
  adSpend: 5000,
  conversions: 100,
  customerAcquisitionCost: 50,
};

const mockBenchmarks: CompetitorBenchmark = {
  averagePrice: 95,
  marketShare: 15,
  customerSatisfaction: 4.2,
  growthRate: 12,
};

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const businessService = {
  async getProfile(): Promise<BusinessProfile> {
    await delay(500);
    return mockBusinessProfile;
  },

  async getMetrics(): Promise<BusinessMetrics> {
    await delay(500);
    return mockMetrics;
  },

  async getMarketingMetrics(): Promise<MarketingMetrics> {
    await delay(500);
    return mockMarketingMetrics;
  },

  async getBenchmarks(): Promise<CompetitorBenchmark> {
    await delay(500);
    return mockBenchmarks;
  },

  async getTransactions(): Promise<Transaction[]> {
    await delay(500);
    return mockTransactions;
  },

  async addTransaction(transaction: Omit<Transaction, 'id'>): Promise<Transaction> {
    await delay(500);
    const newTransaction = {
      ...transaction,
      id: Math.random().toString(36).substr(2, 9),
    };
    mockTransactions.push(newTransaction);
    return newTransaction;
  },

  async updateTransaction(id: string, transaction: Transaction): Promise<Transaction> {
    await delay(500);
    const index = mockTransactions.findIndex(t => t.id === id);
    if (index === -1) {
      throw new Error('Transaction not found');
    }
    mockTransactions[index] = transaction;
    return transaction;
  },

  async deleteTransaction(id: string): Promise<void> {
    await delay(500);
    const index = mockTransactions.findIndex(t => t.id === id);
    if (index === -1) {
      throw new Error('Transaction not found');
    }
    mockTransactions.splice(index, 1);
  },

  async updateProfile(profile: Partial<BusinessProfile>): Promise<BusinessProfile> {
    await delay(500);
    return {
      ...mockBusinessProfile,
      ...profile,
    };
  },

  async updateMetrics(metrics: Partial<BusinessMetrics>): Promise<BusinessMetrics> {
    await delay(500);
    return {
      ...mockMetrics,
      ...metrics,
    };
  },
}; 