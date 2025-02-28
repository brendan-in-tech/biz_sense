import { DashboardLayout } from '../../layouts/DashboardLayout';
import { DashboardWidget } from '../../components/DashboardWidget';
import { useBusinessContext } from '../../contexts/BusinessContext';
import { EnhancedTooltip } from '../../components/EnhancedTooltip';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts';

export function Competitors() {
  const { state } = useBusinessContext();

  const marketShareData = [
    { name: 'Your Business', share: state.benchmarks.marketShare },
    { name: 'Competitor A', share: 25 },
    { name: 'Competitor B', share: 20 },
    { name: 'Competitor C', share: 15 },
    { name: 'Others', share: 25 },
  ];

  const radarData = [
    { metric: 'Price', value: 80 },
    { metric: 'Quality', value: 90 },
    { metric: 'Service', value: 85 },
    { metric: 'Innovation', value: 75 },
    { metric: 'Brand', value: 70 },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Market Share Analysis */}
        <DashboardWidget
          widget={{
            id: 'market-share',
            type: 'chart',
            title: 'Market Share Analysis',
            position: { x: 0, y: 0, width: 2, height: 1 },
            data: marketShareData,
            settings: {},
          }}
        >
          <div>
            <EnhancedTooltip
              title="What is Market Share Analysis?"
              description="This shows how the market is divided between you and your competitors."
              examples={[
                { label: 'Your Share', value: '15%' },
                { label: 'Leader Share', value: '25%' },
                { label: 'Market Gap', value: '10%' },
              ]}
              visual={{
                type: 'bar',
                data: marketShareData.map(item => ({
                  label: item.name,
                  value: `${item.share}%`,
                  color: item.name === 'Your Business' ? '#4F46E5' : '#9CA3AF',
                })),
              }}
            >
              <span className="text-sm text-gray-500">
                Understanding Market Distribution
              </span>
            </EnhancedTooltip>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={marketShareData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="share"
                  fill="#4F46E5"
                  name="Market Share %"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </DashboardWidget>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Competitive Position */}
          <DashboardWidget
            widget={{
              id: 'competitive-position',
              type: 'chart',
              title: 'Competitive Position',
              position: { x: 0, y: 1, width: 1, height: 1 },
              data: radarData,
              settings: {},
            }}
          >
            <div>
              <EnhancedTooltip
                title="What is Competitive Position?"
                description="This shows how you compare to competitors across key metrics."
                examples={[
                  { label: 'Price', value: '80/100' },
                  { label: 'Quality', value: '90/100' },
                  { label: 'Service', value: '85/100' },
                ]}
                visual={{
                  type: 'calculation',
                  data: [
                    { label: 'Strongest', value: 'Quality (90)' },
                    { label: 'Weakest', value: 'Brand (70)' },
                    { label: 'Average', value: '80/100' },
                  ],
                }}
              >
                <span className="text-sm text-gray-500">
                  Your Competitive Strengths
                </span>
              </EnhancedTooltip>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="metric" />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} />
                  <Radar
                    name="Your Score"
                    dataKey="value"
                    stroke="#4F46E5"
                    fill="#4F46E5"
                    fillOpacity={0.6}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </DashboardWidget>

          {/* Competitive Metrics */}
          <DashboardWidget
            widget={{
              id: 'competitive-metrics',
              type: 'metric',
              title: 'Competitive Metrics',
              position: { x: 1, y: 1, width: 1, height: 1 },
              data: null,
              settings: {},
            }}
          >
            <div className="space-y-4">
              <div>
                <EnhancedTooltip
                  title="What is Price Position?"
                  description="This shows how your prices compare to market averages."
                  examples={[
                    { label: 'Your Price', value: '$95' },
                    { label: 'Market Avg', value: '$100' },
                    { label: 'Difference', value: '-5%' },
                  ]}
                  visual={{
                    type: 'comparison',
                    data: [
                      { label: 'Market Low', value: '$90' },
                      { label: 'Your Price', value: '$95' },
                      { label: 'Market Avg', value: '$100' },
                      { label: 'Market High', value: '$105' },
                    ],
                  }}
                >
                  <h4 className="text-sm font-medium text-gray-500">
                    Price Position
                  </h4>
                </EnhancedTooltip>
                <p className="mt-1 text-2xl font-semibold text-gray-900">
                  ${state.benchmarks.averagePrice}
                </p>
                <p className="text-sm text-gray-500">
                  vs. Market Avg $100
                </p>
              </div>

              <div>
                <EnhancedTooltip
                  title="What is Customer Satisfaction?"
                  description="This shows how satisfied your customers are compared to competitors."
                  examples={[
                    { label: 'Your Rating', value: '4.2/5' },
                    { label: 'Market Avg', value: '4.0/5' },
                    { label: 'Top Rating', value: '4.5/5' },
                  ]}
                  visual={{
                    type: 'bar',
                    data: [
                      { label: 'You', value: '84%', color: '#4F46E5' },
                      { label: 'Market Avg', value: '80%', color: '#9CA3AF' },
                      { label: 'Best', value: '90%', color: '#10B981' },
                    ],
                  }}
                >
                  <h4 className="text-sm font-medium text-gray-500">
                    Customer Satisfaction
                  </h4>
                </EnhancedTooltip>
                <p className="mt-1 text-2xl font-semibold text-gray-900">
                  {state.benchmarks.customerSatisfaction.toFixed(1)}/5
                </p>
                <p className="text-sm text-gray-500">
                  Industry Average: 4.0/5
                </p>
              </div>

              <div>
                <EnhancedTooltip
                  title="What is Growth Rate?"
                  description="This shows how fast you're growing compared to competitors."
                  examples={[
                    { label: 'Your Growth', value: '12%' },
                    { label: 'Market Avg', value: '8%' },
                    { label: 'Difference', value: '+4%' },
                  ]}
                  visual={{
                    type: 'calculation',
                    data: [
                      { label: 'Market Rate', value: '8%' },
                      { label: 'Your Rate', value: '12%' },
                      { label: 'Difference', value: '+4%' },
                      { label: 'Status', value: 'Above Avg' },
                    ],
                  }}
                >
                  <h4 className="text-sm font-medium text-gray-500">
                    Growth Rate
                  </h4>
                </EnhancedTooltip>
                <p className="mt-1 text-2xl font-semibold text-gray-900">
                  {state.benchmarks.growthRate}%
                </p>
                <p className="text-sm text-gray-500">
                  Industry Average: 8%
                </p>
              </div>
            </div>
          </DashboardWidget>
        </div>
      </div>
    </DashboardLayout>
  );
} 