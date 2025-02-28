import { useState } from 'react';
import { useBreakEvenAnalysis } from '../hooks/useBreakEvenAnalysis';
import { DashboardWidget } from './DashboardWidget';
import { Tooltip } from './Tooltip';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as ChartTooltip,
  ResponsiveContainer,
} from 'recharts';
import { EnhancedTooltip } from './EnhancedTooltip';

export function BreakEvenCalculator() {
  const [inputs, setInputs] = useState({
    fixedCosts: 0,
    variableCostPerUnit: 0,
    sellingPricePerUnit: 0,
    expectedUnits: 0,
  });

  const {
    analysis,
    calculateBreakEven,
    calculateProfitAtVolume,
    getSafetyMarginRecommendation,
    getContributionMarginRecommendation,
  } = useBreakEvenAnalysis();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof typeof inputs
  ) => {
    const value = parseFloat(e.target.value) || 0;
    setInputs((prev) => ({ ...prev, [field]: value }));
  };

  const handleCalculate = () => {
    calculateBreakEven(inputs);
  };

  // Generate data points for the break-even chart
  const chartData = Array.from({ length: 20 }, (_, i) => {
    const units = (analysis.breakEvenUnits * (i + 1)) / 10;
    return {
      units,
      revenue: units * inputs.sellingPricePerUnit,
      totalCost:
        inputs.fixedCosts + units * inputs.variableCostPerUnit,
    };
  });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input Section */}
        <DashboardWidget
          widget={{
            id: 'break-even-inputs',
            type: 'metric',
            title: 'Break-Even Analysis Inputs',
            position: { x: 0, y: 0, width: 1, height: 1 },
            data: null,
            settings: {},
          }}
        >
          <div className="space-y-4">
            <div>
              <EnhancedTooltip
                title="What are Fixed Costs?"
                description="These are costs that stay the same no matter how much you sell."
                examples={[
                  { label: 'Monthly Rent', value: '$2,000' },
                  { label: 'Employee Salaries', value: '$5,000' },
                  { label: 'Insurance', value: '$500' },
                ]}
                visual={{
                  type: 'bar',
                  data: [
                    { label: 'Rent', value: '25%', color: '#4F46E5' },
                    { label: 'Salaries', value: '60%', color: '#7C3AED' },
                    { label: 'Insurance', value: '15%', color: '#EC4899' },
                  ],
                }}
              >
                <label
                  htmlFor="fixedCosts"
                  className="block text-sm font-medium text-gray-700"
                >
                  Fixed Costs
                </label>
              </EnhancedTooltip>
              <input
                type="number"
                id="fixedCosts"
                value={inputs.fixedCosts}
                onChange={(e) => handleInputChange(e, 'fixedCosts')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="Enter your monthly fixed costs"
              />
            </div>

            <div>
              <EnhancedTooltip
                title="What is Variable Cost per Unit?"
                description="This is how much it costs you to produce or acquire one unit of your product."
                examples={[
                  { label: 'Raw Materials', value: '$5.00' },
                  { label: 'Labor per Unit', value: '$3.00' },
                  { label: 'Packaging', value: '$1.00' },
                ]}
                visual={{
                  type: 'calculation',
                  data: [
                    { label: 'Materials', value: '$5.00' },
                    { label: 'Labor', value: '$3.00' },
                    { label: 'Packaging', value: '$1.00' },
                    { label: 'Total per Unit', value: '$9.00' },
                  ],
                }}
              >
                <label
                  htmlFor="variableCostPerUnit"
                  className="block text-sm font-medium text-gray-700"
                >
                  Variable Cost per Unit
                </label>
              </EnhancedTooltip>
              <input
                type="number"
                id="variableCostPerUnit"
                value={inputs.variableCostPerUnit}
                onChange={(e) => handleInputChange(e, 'variableCostPerUnit')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="Enter cost per unit"
              />
            </div>

            <div>
              <EnhancedTooltip
                title="What is Selling Price per Unit?"
                description="This is how much you charge customers for one unit of your product or service."
                examples={[
                  { label: 'Cost per Unit', value: '$9.00' },
                  { label: 'Markup (40%)', value: '$3.60' },
                  { label: 'Final Price', value: '$12.60' },
                ]}
                visual={{
                  type: 'comparison',
                  data: [
                    { label: 'Your Cost', value: '$9.00' },
                    { label: 'Your Price', value: '$12.60' },
                    { label: 'Competitor Low', value: '$11.99' },
                    { label: 'Competitor High', value: '$14.99' },
                  ],
                }}
              >
                <label
                  htmlFor="sellingPricePerUnit"
                  className="block text-sm font-medium text-gray-700"
                >
                  Selling Price per Unit
                </label>
              </EnhancedTooltip>
              <input
                type="number"
                id="sellingPricePerUnit"
                value={inputs.sellingPricePerUnit}
                onChange={(e) => handleInputChange(e, 'sellingPricePerUnit')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="Enter your selling price"
              />
            </div>

            <div>
              <EnhancedTooltip
                title="What are Expected Units?"
                description="This is how many units you expect to sell in a month. This helps calculate your safety margin."
                examples={[
                  { label: 'Last Month', value: '450 units' },
                  { label: 'Current Goal', value: '500 units' },
                  { label: 'Growth Target', value: '+11%' },
                ]}
                visual={{
                  type: 'bar',
                  data: [
                    { label: 'Last Month', value: '90%', color: '#4F46E5' },
                    { label: 'Current Goal', value: '100%', color: '#10B981' },
                  ],
                }}
              >
                <label
                  htmlFor="expectedUnits"
                  className="block text-sm font-medium text-gray-700"
                >
                  Expected Units (Optional)
                </label>
              </EnhancedTooltip>
              <input
                type="number"
                id="expectedUnits"
                value={inputs.expectedUnits}
                onChange={(e) => handleInputChange(e, 'expectedUnits')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="Enter expected monthly units"
              />
            </div>

            <button
              onClick={handleCalculate}
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Calculate Break-Even Point
            </button>
          </div>
        </DashboardWidget>

        {/* Results Section */}
        <DashboardWidget
          widget={{
            id: 'break-even-results',
            type: 'metric',
            title: 'Break-Even Analysis Results',
            position: { x: 1, y: 0, width: 1, height: 1 },
            data: null,
            settings: {},
          }}
        >
          <div className="space-y-4">
            <div>
              <EnhancedTooltip
                title="What is Break-Even Point?"
                description="This is the total amount of money you need to make to cover all your costs."
                examples={[
                  { label: 'Fixed Costs', value: '$7,500' },
                  { label: 'Variable Costs', value: '$4,500' },
                  { label: 'Break-Even', value: '$12,000' },
                ]}
                visual={{
                  type: 'calculation',
                  data: [
                    { label: 'Total Costs', value: '$12,000' },
                    { label: 'Revenue Needed', value: '$12,000' },
                    { label: 'Profit at Break-Even', value: '$0' },
                  ],
                }}
              >
                <h4 className="text-sm font-medium text-gray-500">
                  Break-Even Point
                </h4>
              </EnhancedTooltip>
              <p className="mt-1 text-2xl font-semibold text-gray-900">
                ${analysis.breakEvenPoint.toFixed(2)}
              </p>
            </div>

            <div>
              <EnhancedTooltip
                title="What are Break-Even Units?"
                description="This is how many units you need to sell to break even."
                examples={[
                  { label: 'Price per Unit', value: '$12.60' },
                  { label: 'Cost per Unit', value: '$9.00' },
                  { label: 'Profit per Unit', value: '$3.60' },
                ]}
                visual={{
                  type: 'bar',
                  data: [
                    { label: 'Current Sales', value: '80%', color: '#EF4444' },
                    { label: 'Break-Even', value: '100%', color: '#10B981' },
                  ],
                }}
              >
                <h4 className="text-sm font-medium text-gray-500">
                  Break-Even Units
                </h4>
              </EnhancedTooltip>
              <p className="mt-1 text-2xl font-semibold text-gray-900">
                {analysis.breakEvenUnits.toFixed(0)} units
              </p>
            </div>

            <div>
              <EnhancedTooltip
                title="What is Contribution Margin?"
                description="This shows how much of each sale goes towards covering your fixed costs and generating profit."
                examples={[
                  { label: 'Selling Price', value: '$12.60' },
                  { label: 'Variable Cost', value: '$9.00' },
                  { label: 'Contribution', value: '$3.60' },
                ]}
                visual={{
                  type: 'bar',
                  data: [
                    { label: 'Variable Cost', value: '71%', color: '#EF4444' },
                    { label: 'Contribution', value: '29%', color: '#10B981' },
                  ],
                }}
              >
                <h4 className="text-sm font-medium text-gray-500">
                  Contribution Margin
                </h4>
              </EnhancedTooltip>
              <p className="mt-1 text-2xl font-semibold text-gray-900">
                {analysis.contributionMargin.toFixed(1)}%
              </p>
              <p className="mt-1 text-sm text-gray-500">
                {getContributionMarginRecommendation(analysis.contributionMargin)}
              </p>
            </div>

            {analysis.marginOfSafety > 0 && (
              <div>
                <EnhancedTooltip
                  title="What is Margin of Safety?"
                  description="This shows how much your sales can drop before you start losing money."
                  examples={[
                    { label: 'Break-Even', value: '1,000 units' },
                    { label: 'Expected', value: '1,200 units' },
                    { label: 'Safety Margin', value: '200 units' },
                  ]}
                  visual={{
                    type: 'comparison',
                    data: [
                      { label: 'Break-Even Point', value: '1,000 units' },
                      { label: 'Current Sales', value: '1,200 units' },
                      { label: 'Safety Buffer', value: '200 units' },
                      { label: 'Safety %', value: '16.7%' },
                    ],
                  }}
                >
                  <h4 className="text-sm font-medium text-gray-500">
                    Margin of Safety
                  </h4>
                </EnhancedTooltip>
                <p className="mt-1 text-2xl font-semibold text-gray-900">
                  {analysis.marginOfSafety.toFixed(1)}%
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  {getSafetyMarginRecommendation(analysis.marginOfSafety)}
                </p>
              </div>
            )}
          </div>
        </DashboardWidget>
      </div>

      {/* Chart Section */}
      {analysis.breakEvenPoint > 0 && (
        <DashboardWidget
          widget={{
            id: 'break-even-chart',
            type: 'chart',
            title: 'Break-Even Chart',
            position: { x: 0, y: 1, width: 2, height: 1 },
            data: null,
            settings: {},
          }}
        >
          <div>
            <EnhancedTooltip
              title="How to Read This Chart?"
              description="This chart shows your revenue and costs at different sales volumes."
              examples={[
                { label: 'Break-Even Point', value: 'Lines Cross' },
                { label: 'Above Break-Even', value: 'Profit' },
                { label: 'Below Break-Even', value: 'Loss' },
              ]}
              visual={{
                type: 'calculation',
                data: [
                  { label: 'Fixed Costs', value: 'Horizontal Line' },
                  { label: 'Variable Costs', value: 'Sloped Line' },
                  { label: 'Total Revenue', value: 'Blue Line' },
                  { label: 'Total Costs', value: 'Red Line' },
                ],
              }}
            >
              <span className="text-sm text-gray-500">
                Understanding the Break-Even Chart
              </span>
            </EnhancedTooltip>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="units"
                label={{
                  value: 'Units Sold',
                  position: 'insideBottom',
                  offset: -5,
                }}
              />
              <YAxis
                label={{
                  value: 'Amount ($)',
                  angle: -90,
                  position: 'insideLeft',
                }}
              />
              <ChartTooltip />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#4F46E5"
                name="Revenue"
              />
              <Line
                type="monotone"
                dataKey="totalCost"
                stroke="#EF4444"
                name="Total Cost"
              />
            </LineChart>
          </ResponsiveContainer>
        </DashboardWidget>
      )}
    </div>
  );
} 