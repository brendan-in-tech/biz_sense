import { useState } from 'react';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import { DashboardWidget } from '../../components/DashboardWidget';
import { useBusinessContext } from '../../contexts/BusinessContext';
import { EnhancedTooltip } from '../../components/EnhancedTooltip';
import { format } from 'date-fns';

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

export function Transactions() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <EnhancedTooltip
                title="What is Transaction Type?"
                description="Filter transactions by income or expenses."
                examples={[
                  { label: 'Income', value: 'Services and product sales' },
                  { label: 'Expense', value: 'Supplies and equipment costs' },
                ]}
              >
                <label className="block text-sm font-medium text-gray-700">
                  Type
                </label>
              </EnhancedTooltip>
              <select
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              >
                <option value="all">All</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>

            <div>
              <EnhancedTooltip
                title="What is Category?"
                description="Filter transactions by business category."
                examples={[
                  { label: 'Services', value: 'Haircuts, coloring, styling' },
                  { label: 'Product Sales', value: 'Retail hair products' },
                  { label: 'Supplies', value: 'Hair color, treatment products' },
                ]}
              >
                <label className="block text-sm font-medium text-gray-700">
                  Category
                </label>
              </EnhancedTooltip>
              <select
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              >
                <option value="all">All</option>
                <option value="services">Services</option>
                <option value="product-sales">Product Sales</option>
                <option value="supplies">Supplies</option>
                <option value="equipment">Equipment</option>
                <option value="inventory">Inventory</option>
                <option value="marketing">Marketing</option>
                <option value="insurance">Insurance</option>
                <option value="training">Training</option>
                <option value="utilities">Utilities</option>
              </select>
            </div>

            <div>
              <EnhancedTooltip
                title="What is Status?"
                description="Filter transactions by their current status."
                examples={[
                  { label: 'Completed', value: 'Payment received/paid' },
                  { label: 'Pending', value: 'Upcoming appointment' },
                ]}
              >
                <label className="block text-sm font-medium text-gray-700">
                  Status
                </label>
              </EnhancedTooltip>
              <select
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              >
                <option value="all">All</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
              </select>
            </div>

            <div>
              <EnhancedTooltip
                title="What is Date Range?"
                description="Filter transactions by time period."
                examples={[
                  { label: 'Last 30 days', value: 'Recent transactions' },
                  { label: 'Last 90 days', value: 'Quarter view' },
                ]}
              >
                <label className="block text-sm font-medium text-gray-700">
                  Date Range
                </label>
              </EnhancedTooltip>
              <select
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              >
                <option value="7">Last 7 days</option>
                <option value="30">Last 30 days</option>
                <option value="90">Last 90 days</option>
                <option value="365">Last year</option>
              </select>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <DashboardWidget
            widget={{
              id: 'daily-revenue',
              type: 'metric',
              title: "Today's Revenue",
              position: { x: 0, y: 0, width: 1, height: 1 },
              data: [],
              settings: {},
            }}
          >
            <div className="text-2xl font-bold text-gray-900">
              ${0.toLocaleString()}
            </div>
          </DashboardWidget>

          <DashboardWidget
            widget={{
              id: 'appointments-today',
              type: 'metric',
              title: "Today's Appointments",
              position: { x: 1, y: 0, width: 1, height: 1 },
              data: [],
              settings: {},
            }}
          >
            <div className="text-2xl font-bold text-gray-900">
              0
            </div>
          </DashboardWidget>

          <DashboardWidget
            widget={{
              id: 'product-sales',
              type: 'metric',
              title: "Product Sales Today",
              position: { x: 2, y: 0, width: 1, height: 1 },
              data: [],
              settings: {},
            }}
          >
            <div className="text-2xl font-bold text-gray-900">
              ${0.toLocaleString()}
            </div>
          </DashboardWidget>
        </div>

        {/* Transactions Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Client
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {[]}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 