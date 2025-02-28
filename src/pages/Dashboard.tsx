import { DashboardLayout } from '../layouts/DashboardLayout';
import { BreakEvenCalculator } from '../components/BreakEvenCalculator';
import { DashboardWidget } from '../components/DashboardWidget';
import { EnhancedTooltip } from '../components/EnhancedTooltip';
import { useBusinessContext } from '../contexts/BusinessContext';
import { useInitialData } from '../hooks/useInitialData';
import { calculateMetrics, formatCurrency, formatPercentage } from '../utils/transactionAnalytics';

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

export function Dashboard() {
  const { state } = useBusinessContext();
  useInitialData();

  const metrics = calculateMetrics(state.transactions);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Quick Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <DashboardWidget
            widget={{
              id: 'revenue',
              type: 'metric',
              title: 'Monthly Revenue',
              position: { x: 0, y: 0, width: 1, height: 1 },
              data: metrics.currentMonth.revenue,
              settings: {
                comparison: 'historical',
              },
            }}
          >
            <div>
              <EnhancedTooltip
                title="What is Monthly Revenue?"
                description="This is the total amount of money your business earned this month before subtracting any costs."
                examples={[
                  { label: 'Services', value: formatCurrency(metrics.currentMonth.revenueByCategory['Services'] || 0) },
                  { label: 'Product Sales', value: formatCurrency(metrics.currentMonth.revenueByCategory['Product Sales'] || 0) },
                ]}
                visual={{
                  type: 'bar',
                  data: [
                    { 
                      label: 'Services', 
                      value: `${((metrics.currentMonth.revenueByCategory['Services'] || 0) / metrics.currentMonth.revenue * 100).toFixed(0)}%`,
                      color: '#4F46E5'
                    },
                    { 
                      label: 'Products', 
                      value: `${((metrics.currentMonth.revenueByCategory['Product Sales'] || 0) / metrics.currentMonth.revenue * 100).toFixed(0)}%`,
                      color: '#7C3AED'
                    },
                  ],
                }}
              >
                <p className="text-3xl font-bold text-gray-900">
                  {formatCurrency(metrics.currentMonth.revenue)}
                </p>
              </EnhancedTooltip>
              <p className="text-sm text-gray-500 mt-1">
                vs. last month ({formatPercentage(metrics.growth.revenue)})
              </p>
            </div>
          </DashboardWidget>

          <DashboardWidget
            widget={{
              id: 'profit',
              type: 'metric',
              title: 'Monthly Profit',
              position: { x: 1, y: 0, width: 1, height: 1 },
              data: metrics.currentMonth.profit,
              settings: {
                comparison: 'target',
              },
            }}
          >
            <div>
              <EnhancedTooltip
                title="What is Monthly Profit?"
                description="This is how much money your business actually keeps after paying all expenses."
                examples={[
                  { label: 'Revenue', value: formatCurrency(metrics.currentMonth.revenue) },
                  { label: 'Expenses', value: formatCurrency(metrics.currentMonth.expenses) },
                  { label: 'Profit', value: formatCurrency(metrics.currentMonth.profit) },
                ]}
                visual={{
                  type: 'calculation',
                  data: [
                    { label: 'Total Revenue', value: formatCurrency(metrics.currentMonth.revenue) },
                    { label: 'Total Costs', value: `-${formatCurrency(metrics.currentMonth.expenses)}` },
                    { label: 'Net Profit', value: formatCurrency(metrics.currentMonth.profit) },
                    { label: 'Profit Margin', value: formatPercentage((metrics.currentMonth.profit / metrics.currentMonth.revenue) * 100) },
                  ],
                }}
              >
                <p className="text-3xl font-bold text-gray-900">
                  {formatCurrency(metrics.currentMonth.profit)}
                </p>
              </EnhancedTooltip>
              <p className="text-sm text-gray-500 mt-1">
                {formatPercentage((metrics.currentMonth.profit / metrics.currentMonth.revenue) * 100)} margin
              </p>
            </div>
          </DashboardWidget>

          <DashboardWidget
            widget={{
              id: 'customers',
              type: 'metric',
              title: 'Active Customers',
              position: { x: 2, y: 0, width: 1, height: 1 },
              data: metrics.currentMonth.customerCount,
              settings: {
                comparison: 'benchmark',
              },
            }}
          >
            <div>
              <EnhancedTooltip
                title="What are Active Customers?"
                description="This is the number of customers who have made a purchase in the last month."
                examples={[
                  { label: 'Current Month', value: metrics.currentMonth.customerCount.toString() },
                  { label: 'Last Month', value: metrics.lastMonth.customerCount.toString() },
                  { label: 'Growth', value: formatPercentage(metrics.growth.customers) },
                ]}
                visual={{
                  type: 'comparison',
                  data: [
                    { label: 'Last Month', value: metrics.lastMonth.customerCount.toString() },
                    { label: 'This Month', value: metrics.currentMonth.customerCount.toString() },
                    { label: 'Growth', value: formatPercentage(metrics.growth.customers) },
                  ],
                }}
              >
                <p className="text-3xl font-bold text-gray-900">
                  {metrics.currentMonth.customerCount}
                </p>
              </EnhancedTooltip>
              <p className="text-sm text-gray-500 mt-1">
                {formatPercentage(metrics.growth.customers)} vs. last month
              </p>
            </div>
          </DashboardWidget>
        </div>

        {/* Marketing Performance */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <DashboardWidget
            widget={{
              id: 'marketing-roi',
              type: 'metric',
              title: 'Marketing ROI',
              position: { x: 0, y: 1, width: 1, height: 1 },
              data: metrics.currentMonth.marketingROI,
              settings: {},
            }}
          >
            <div className="space-y-4">
              <div>
                <EnhancedTooltip
                  title="What is Marketing ROI?"
                  description="This shows how much money you make back for every dollar spent on marketing."
                  examples={[
                    { label: 'Marketing Cost', value: formatCurrency(metrics.currentMonth.marketingExpenses) },
                    { label: 'Revenue', value: formatCurrency(metrics.currentMonth.revenue) },
                    { label: 'ROI', value: formatPercentage(metrics.currentMonth.marketingROI) },
                  ]}
                  visual={{
                    type: 'calculation',
                    data: [
                      { label: 'Marketing Cost', value: formatCurrency(metrics.currentMonth.marketingExpenses) },
                      { label: 'Revenue', value: formatCurrency(metrics.currentMonth.revenue) },
                      { label: 'Net Return', value: formatCurrency(metrics.currentMonth.revenue - metrics.currentMonth.marketingExpenses) },
                      { label: 'ROI', value: formatPercentage(metrics.currentMonth.marketingROI) },
                    ],
                  }}
                >
                  <p className="text-3xl font-bold text-gray-900">
                    {formatPercentage(metrics.currentMonth.marketingROI)}
                  </p>
                </EnhancedTooltip>
                <p className="text-sm text-gray-500 mt-1">
                  Return on Marketing Investment
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <EnhancedTooltip
                    title="What is Marketing Spend?"
                    description="This is how much money you've spent on marketing this month."
                    examples={[
                      { label: 'Total Spend', value: formatCurrency(metrics.currentMonth.marketingExpenses) },
                      { label: 'Per Customer', value: formatCurrency(metrics.currentMonth.marketingExpenses / metrics.currentMonth.customerCount) },
                    ]}
                    visual={{
                      type: 'calculation',
                      data: [
                        { label: 'Total Spend', value: formatCurrency(metrics.currentMonth.marketingExpenses) },
                        { label: 'Customer Count', value: metrics.currentMonth.customerCount.toString() },
                        { label: 'Cost per Customer', value: formatCurrency(metrics.currentMonth.marketingExpenses / metrics.currentMonth.customerCount) },
                      ],
                    }}
                  >
                    <p className="text-sm font-medium text-gray-500">
                      Marketing Spend
                    </p>
                  </EnhancedTooltip>
                  <p className="text-lg font-semibold text-gray-900">
                    {formatCurrency(metrics.currentMonth.marketingExpenses)}
                  </p>
                </div>
                <div>
                  <EnhancedTooltip
                    title="What is Average Order Value?"
                    description="This is the average amount spent by customers per service."
                    examples={[
                      { label: 'Service Revenue', value: formatCurrency(metrics.currentMonth.revenueByCategory['Services'] || 0) },
                      { label: 'Service Count', value: metrics.currentMonth.customerCount.toString() },
                      { label: 'Average', value: formatCurrency(metrics.currentMonth.averageOrderValue) },
                    ]}
                    visual={{
                      type: 'calculation',
                      data: [
                        { label: 'Total Revenue', value: formatCurrency(metrics.currentMonth.revenueByCategory['Services'] || 0) },
                        { label: 'Service Count', value: metrics.currentMonth.customerCount.toString() },
                        { label: 'Average Order', value: formatCurrency(metrics.currentMonth.averageOrderValue) },
                      ],
                    }}
                  >
                    <p className="text-sm font-medium text-gray-500">
                      Avg. Order Value
                    </p>
                  </EnhancedTooltip>
                  <p className="text-lg font-semibold text-gray-900">
                    {formatCurrency(metrics.currentMonth.averageOrderValue)}
                  </p>
                </div>
              </div>
            </div>
          </DashboardWidget>

          <DashboardWidget
            widget={{
              id: 'expense-breakdown',
              type: 'comparison',
              title: 'Expense Breakdown',
              position: { x: 1, y: 1, width: 1, height: 1 },
              data: metrics.currentMonth.expensesByCategory,
              settings: {},
            }}
          >
            <div className="space-y-4">
              {Object.entries(metrics.currentMonth.expensesByCategory).map(([category, amount]) => (
                <div key={category} className="flex items-center justify-between">
                  <EnhancedTooltip
                    title={`What are ${category} Expenses?`}
                    description={`This shows your total spending on ${category.toLowerCase()}.`}
                    examples={[
                      { label: 'Total Spend', value: formatCurrency(amount) },
                      { label: '% of Expenses', value: formatPercentage((amount / metrics.currentMonth.expenses) * 100) },
                    ]}
                    visual={{
                      type: 'bar',
                      data: [
                        { 
                          label: category, 
                          value: `${((amount / metrics.currentMonth.expenses) * 100).toFixed(0)}%`,
                          color: '#4F46E5'
                        },
                      ],
                    }}
                  >
                    <span className="text-sm font-medium text-gray-500">
                      {category}
                    </span>
                  </EnhancedTooltip>
                  <span className="text-sm font-semibold text-gray-900">
                    {formatCurrency(amount)}
                  </span>
                </div>
              ))}
            </div>
          </DashboardWidget>
        </div>

        {/* Break-Even Analysis Section */}
        <div className="mt-8">
          <EnhancedTooltip
            title="What is Break-Even Analysis?"
            description="This tool helps you figure out how many services or products you need to sell to cover all your costs."
            examples={[
              { label: 'Fixed Costs', value: formatCurrency(metrics.currentMonth.expenses) },
              { label: 'Avg Price', value: formatCurrency(metrics.currentMonth.averageOrderValue) },
              { label: 'Break-Even', value: `${Math.ceil(metrics.currentMonth.expenses / metrics.currentMonth.averageOrderValue)} services` },
            ]}
            visual={{
              type: 'calculation',
              data: [
                { label: 'Monthly Costs', value: formatCurrency(metrics.currentMonth.expenses) },
                { label: 'Avg Service Price', value: formatCurrency(metrics.currentMonth.averageOrderValue) },
                { label: 'Services Needed', value: Math.ceil(metrics.currentMonth.expenses / metrics.currentMonth.averageOrderValue).toString() },
              ],
            }}
          >
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Break-Even Analysis
            </h2>
          </EnhancedTooltip>
          <BreakEvenCalculator />
        </div>
      </div>
    </DashboardLayout>
  );
} 