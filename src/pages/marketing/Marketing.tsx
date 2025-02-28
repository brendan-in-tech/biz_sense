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
  PieChart,
  Pie,
  Cell,
} from 'recharts';

export function Marketing() {
  const { state } = useBusinessContext();

  const campaignData = [
    { month: 'Jan', spend: 4000, conversions: 80 },
    { month: 'Feb', spend: 4500, conversions: 90 },
    { month: 'Mar', spend: 5000, conversions: 100 },
    { month: 'Apr', spend: 4800, conversions: 95 },
    { month: 'May', spend: 5200, conversions: 105 },
    { month: 'Jun', spend: 5000, conversions: 100 },
  ];

  const channelPerformance = [
    { name: 'Social Media', value: 40 },
    { name: 'Search Ads', value: 30 },
    { name: 'Email', value: 20 },
    { name: 'Other', value: 10 },
  ];

  const COLORS = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444'];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Campaign Performance */}
        <DashboardWidget
          widget={{
            id: 'campaign-performance',
            type: 'chart',
            title: 'Campaign Performance',
            position: { x: 0, y: 0, width: 2, height: 1 },
            data: campaignData,
            settings: {},
          }}
        >
          <div>
            <EnhancedTooltip
              title="What is Campaign Performance?"
              description="This chart shows your marketing spend and resulting conversions over time."
              examples={[
                { label: 'Spend', value: 'Marketing Cost' },
                { label: 'Conversions', value: 'Sales Made' },
                { label: 'ROI', value: 'Return on Investment' },
              ]}
              visual={{
                type: 'calculation',
                data: [
                  { label: 'Avg Spend', value: '$4,750' },
                  { label: 'Avg Conversions', value: '95' },
                  { label: 'Cost per Conv.', value: '$50' },
                ],
              }}
            >
              <span className="text-sm text-gray-500">
                Understanding Campaign Results
              </span>
            </EnhancedTooltip>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={campaignData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="spend"
                  stroke="#4F46E5"
                  name="Spend"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="conversions"
                  stroke="#10B981"
                  name="Conversions"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </DashboardWidget>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Channel Distribution */}
          <DashboardWidget
            widget={{
              id: 'channel-distribution',
              type: 'chart',
              title: 'Marketing Channel Distribution',
              position: { x: 0, y: 1, width: 1, height: 1 },
              data: channelPerformance,
              settings: {},
            }}
          >
            <div>
              <EnhancedTooltip
                title="What is Channel Distribution?"
                description="This shows how your marketing budget is distributed across different channels."
                examples={[
                  { label: 'Social Media', value: '40%' },
                  { label: 'Search Ads', value: '30%' },
                  { label: 'Email', value: '20%' },
                ]}
                visual={{
                  type: 'bar',
                  data: [
                    { label: 'Social', value: '40%', color: '#4F46E5' },
                    { label: 'Search', value: '30%', color: '#10B981' },
                    { label: 'Email', value: '20%', color: '#F59E0B' },
                    { label: 'Other', value: '10%', color: '#EF4444' },
                  ],
                }}
              >
                <span className="text-sm text-gray-500">
                  Marketing Channel Mix
                </span>
              </EnhancedTooltip>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={channelPerformance}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {channelPerformance.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </DashboardWidget>

          {/* Marketing Metrics */}
          <DashboardWidget
            widget={{
              id: 'marketing-metrics',
              type: 'metric',
              title: 'Marketing Metrics',
              position: { x: 1, y: 1, width: 1, height: 1 },
              data: null,
              settings: {},
            }}
          >
            <div className="space-y-4">
              <div>
                <EnhancedTooltip
                  title="What is Marketing ROI?"
                  description="This shows how much money you make back for every dollar spent on marketing."
                  examples={[
                    { label: 'Spend', value: '$5,000' },
                    { label: 'Revenue', value: '$12,500' },
                    { label: 'ROI', value: '150%' },
                  ]}
                  visual={{
                    type: 'calculation',
                    data: [
                      { label: 'Marketing Cost', value: '$5,000' },
                      { label: 'Revenue', value: '$12,500' },
                      { label: 'Net Return', value: '$7,500' },
                      { label: 'ROI', value: '150%' },
                    ],
                  }}
                >
                  <h4 className="text-sm font-medium text-gray-500">
                    Marketing ROI
                  </h4>
                </EnhancedTooltip>
                <p className="mt-1 text-2xl font-semibold text-gray-900">
                  {state.marketing.campaignROI.toFixed(1)}%
                </p>
              </div>

              <div>
                <EnhancedTooltip
                  title="What is Monthly Ad Spend?"
                  description="This is your total marketing budget spent this month."
                  examples={[
                    { label: 'Social Ads', value: '$2,000' },
                    { label: 'Search Ads', value: '$1,500' },
                    { label: 'Email', value: '$1,000' },
                  ]}
                  visual={{
                    type: 'bar',
                    data: [
                      { label: 'Social', value: '40%', color: '#4F46E5' },
                      { label: 'Search', value: '30%', color: '#10B981' },
                      { label: 'Email', value: '20%', color: '#F59E0B' },
                    ],
                  }}
                >
                  <h4 className="text-sm font-medium text-gray-500">
                    Monthly Ad Spend
                  </h4>
                </EnhancedTooltip>
                <p className="mt-1 text-2xl font-semibold text-gray-900">
                  ${state.marketing.adSpend.toLocaleString()}
                </p>
              </div>

              <div>
                <EnhancedTooltip
                  title="What are Monthly Conversions?"
                  description="This is the number of sales made through your marketing campaigns."
                  examples={[
                    { label: 'Ad Views', value: '10,000' },
                    { label: 'Clicks', value: '500' },
                    { label: 'Sales', value: '100' },
                  ]}
                  visual={{
                    type: 'calculation',
                    data: [
                      { label: 'Click Rate', value: '5%' },
                      { label: 'Conv. Rate', value: '20%' },
                      { label: 'Total Conv.', value: '100' },
                    ],
                  }}
                >
                  <h4 className="text-sm font-medium text-gray-500">
                    Monthly Conversions
                  </h4>
                </EnhancedTooltip>
                <p className="mt-1 text-2xl font-semibold text-gray-900">
                  {state.marketing.conversions}
                </p>
              </div>
            </div>
          </DashboardWidget>
        </div>
      </div>
    </DashboardLayout>
  );
} 