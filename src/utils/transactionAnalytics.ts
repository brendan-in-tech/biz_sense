import { format, subMonths, isWithinInterval, startOfMonth, endOfMonth } from 'date-fns';

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

export function calculateMetrics(transactions: Transaction[]) {
  const now = new Date();
  const currentMonth = {
    start: startOfMonth(now),
    end: endOfMonth(now),
  };
  const lastMonth = {
    start: startOfMonth(subMonths(now, 1)),
    end: endOfMonth(subMonths(now, 1)),
  };

  // Filter transactions by month
  const currentMonthTransactions = transactions.filter(t => 
    isWithinInterval(new Date(t.date), currentMonth)
  );
  const lastMonthTransactions = transactions.filter(t => 
    isWithinInterval(new Date(t.date), lastMonth)
  );

  // Calculate current month metrics
  const currentRevenue = currentMonthTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const currentExpenses = currentMonthTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const currentProfit = currentRevenue - currentExpenses;

  // Calculate last month metrics for comparison
  const lastRevenue = lastMonthTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const lastExpenses = lastMonthTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const lastProfit = lastRevenue - lastExpenses;

  // Calculate customer metrics
  const uniqueCurrentCustomers = new Set(
    currentMonthTransactions
      .filter(t => t.type === 'income' && t.client)
      .map(t => t.client)
  ).size;

  const uniqueLastCustomers = new Set(
    lastMonthTransactions
      .filter(t => t.type === 'income' && t.client)
      .map(t => t.client)
  ).size;

  // Calculate average order value
  const currentServiceTransactions = currentMonthTransactions.filter(
    t => t.type === 'income' && t.service && t.service !== 'Retail'
  );
  const averageOrderValue = currentServiceTransactions.length
    ? currentServiceTransactions.reduce((sum, t) => sum + t.amount, 0) / currentServiceTransactions.length
    : 0;

  // Calculate marketing metrics
  const marketingExpenses = currentMonthTransactions
    .filter(t => t.category === 'Marketing')
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const marketingROI = marketingExpenses
    ? ((currentRevenue - marketingExpenses) / marketingExpenses) * 100
    : 0;

  // Calculate growth rates
  const revenueGrowth = lastRevenue
    ? ((currentRevenue - lastRevenue) / lastRevenue) * 100
    : 0;

  const customerGrowth = uniqueLastCustomers
    ? ((uniqueCurrentCustomers - uniqueLastCustomers) / uniqueLastCustomers) * 100
    : 0;

  // Calculate revenue by category
  const revenueByCategory = currentMonthTransactions
    .filter(t => t.type === 'income')
    .reduce((acc, t) => {
      const category = t.service === 'Retail' ? 'Product Sales' : 'Services';
      acc[category] = (acc[category] || 0) + t.amount;
      return acc;
    }, {} as Record<string, number>);

  // Calculate expenses by category
  const expensesByCategory = currentMonthTransactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + Math.abs(t.amount);
      return acc;
    }, {} as Record<string, number>);

  return {
    currentMonth: {
      revenue: currentRevenue,
      expenses: currentExpenses,
      profit: currentProfit,
      customerCount: uniqueCurrentCustomers,
      averageOrderValue,
      marketingROI,
      marketingExpenses,
      revenueByCategory,
      expensesByCategory,
    },
    lastMonth: {
      revenue: lastRevenue,
      expenses: lastExpenses,
      profit: lastProfit,
      customerCount: uniqueLastCustomers,
    },
    growth: {
      revenue: revenueGrowth,
      customers: customerGrowth,
    },
  };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatPercentage(value: number): string {
  return `${value.toFixed(1)}%`;
} 