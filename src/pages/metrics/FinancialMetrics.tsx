import { DashboardLayout } from '../../layouts/DashboardLayout';
import { DashboardWidget } from '../../components/DashboardWidget';
import { useBusinessContext } from '../../contexts/BusinessContext';
import { EnhancedTooltip } from '../../components/EnhancedTooltip';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';

export function FinancialMetrics() {
  const { state } = useBusinessContext();

  const revenueData = [
    { month: 'Jan', revenue: 45000, profit: 15000 },
    { month: 'Feb', revenue: 48000, profit: 16500 },
    { month: 'Mar', revenue: 52000, profit: 18000 },
    { month: 'Apr', revenue: 51000, profit: 17500 },
    { month: 'May', revenue: 54000, profit: 19000 },
    { month: 'Jun', revenue: 58000, profit: 20500 },
  ];

  const costBreakdown = [
    { category: 'Fixed Costs', value: state.metrics.costs.fixed },
    { category: 'Variable Costs', value: state.metrics.costs.variable },
    { category: 'Marketing', value: state.marketing.adSpend },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Revenue and Profit Trends */}
        <DashboardWidget
          widget={{
            id: 'revenue-trends',
            type: 'chart',
            title: 'Revenue and Profit Trends',
            position: { x: 0, y: 0, width: 2, height: 1 },
            data: revenueData,
            settings: {},
          }}
        >
          <div>
            <EnhancedTooltip
              title="What are Revenue and Profit Trends?"
              description="This chart shows how your revenue and profit have changed over time."
              examples={[
                { label: 'Revenue', value: 'Top Line' },
                { label: 'Profit', value: 'Bottom Line' },
                { label: 'Trend', value: 'Direction' },
              ]}
              visual={{
                type: 'calculation',
                data: [
                  { label: 'Avg Revenue', value: '$51,333' },
                  { label: 'Avg Profit', value: '$17,750' },
                  { label: 'Profit Margin', value: '34.6%' },
                ],
              }}
            >
              <span className="text-sm text-gray-500">
                Understanding Your Financial Trends
              </span>
            </EnhancedTooltip>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#4F46E5"
                  name="Revenue"
                />
                <Line
                  type="monotone"
                  dataKey="profit"
                  stroke="#10B981"
                  name="Profit"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </DashboardWidget>

        {/* Cost Structure */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <DashboardWidget
            widget={{
              id: 'cost-breakdown',
              type: 'chart',
              title: 'Cost Structure',
              position: { x: 0, y: 1, width: 1, height: 1 },
              data: costBreakdown,
              settings: {},
            }}
          >
            <div>
              <EnhancedTooltip
                title="What is Cost Structure?"
                description="This shows how your total costs are distributed across different categories."
                examples={[
                  { label: 'Fixed Costs', value: 'Rent, Salaries' },
                  { label: 'Variable Costs', value: 'Materials, Labor' },
                  { label: 'Marketing', value: 'Advertising' },
                ]}
                visual={{
                  type: 'bar',
                  data: [
                    { label: 'Fixed', value: '45%', color: '#4F46E5' },
                    { label: 'Variable', value: '35%', color: '#10B981' },
                    { label: 'Marketing', value: '20%', color: '#F59E0B' },
                  ],
                }}
              >
                <span className="text-sm text-gray-500">
                  Understanding Your Costs
                </span>
              </EnhancedTooltip>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={costBreakdown}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#4F46E5" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </DashboardWidget>

          {/* Key Metrics */}
          <DashboardWidget
            widget={{
              id: 'key-metrics',
              type: 'metric',
              title: 'Key Financial Metrics',
              position: { x: 1, y: 1, width: 1, height: 1 },
              data: null,
              settings: {},
            }}
          >
            <div className="space-y-4">
              <div>
                <EnhancedTooltip
                  title="What is Average Order Value?"
                  description="This is the average amount spent by customers per order."
                  examples={[
                    { label: 'Total Revenue', value: '$50,000' },
                    { label: 'Orders', value: '500' },
                    { label: 'Avg Value', value: '$100' },
                  ]}
                  visual={{
                    type: 'calculation',
                    data: [
                      { label: 'Monthly Revenue', value: '$50,000' },
                      { label: 'Total Orders', value: '500' },
                      { label: 'Average Order', value: '$100' },
                    ],
                  }}
                >
                  <h4 className="text-sm font-medium text-gray-500">
                    Average Order Value
                  </h4>
                </EnhancedTooltip>
                <p className="mt-1 text-2xl font-semibold text-gray-900">
                  ${state.metrics.averageOrderValue.toFixed(2)}
                </p>
              </div>

              <div>
                <EnhancedTooltip
                  title="What is Profit Margin?"
                  description="This shows what percentage of your revenue becomes profit."
                  examples={[
                    { label: 'Revenue', value: '$50,000' },
                    { label: 'Profit', value: '$15,000' },
                    { label: 'Margin', value: '30%' },
                  ]}
                  visual={{
                    type: 'calculation',
                    data: [
                      { label: 'Revenue', value: '$50,000' },
                      { label: 'Costs', value: '-$35,000' },
                      { label: 'Profit', value: '$15,000' },
                      { label: 'Margin', value: '30%' },
                    ],
                  }}
                >
                  <h4 className="text-sm font-medium text-gray-500">
                    Profit Margin
                  </h4>
                </EnhancedTooltip>
                <p className="mt-1 text-2xl font-semibold text-gray-900">
                  {((state.metrics.profit / state.metrics.revenue) * 100).toFixed(1)}%
                </p>
              </div>

              <div>
                <EnhancedTooltip
                  title="What is Customer Acquisition Cost?"
                  description="This is how much you spend on average to acquire a new customer."
                  examples={[
                    { label: 'Marketing Spend', value: '$5,000' },
                    { label: 'New Customers', value: '100' },
                    { label: 'Cost per Customer', value: '$50' },
                  ]}
                  visual={{
                    type: 'calculation',
                    data: [
                      { label: 'Ad Spend', value: '$5,000' },
                      { label: 'New Customers', value: '100' },
                      { label: 'Cost/Customer', value: '$50' },
                    ],
                  }}
                >
                  <h4 className="text-sm font-medium text-gray-500">
                    Customer Acquisition Cost
                  </h4>
                </EnhancedTooltip>
                <p className="mt-1 text-2xl font-semibold text-gray-900">
                  ${state.marketing.customerAcquisitionCost.toFixed(2)}
                </p>
              </div>
            </div>
          </DashboardWidget>
        </div>
      </div>
    </DashboardLayout>
  );
} 