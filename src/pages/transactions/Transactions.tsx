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
  const { state } = useBusinessContext();
  const [filter, setFilter] = useState({
    type: 'all',
    category: 'all',
    status: 'all',
    dateRange: '30',
  });

  // Mock data for a hair stylist
  const transactions: Transaction[] = [
    {
      id: '1',
      date: '2024-03-15',
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
      date: '2024-03-15',
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
      date: '2024-03-14',
      description: 'Hair Color Supplies Restock',
      amount: -300,
      type: 'expense',
      category: 'Supplies',
      status: 'completed'
    },
    {
      id: '4',
      date: '2024-03-14',
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
      date: '2024-03-13',
      description: 'Salon Chair Maintenance',
      amount: -150,
      type: 'expense',
      category: 'Equipment',
      status: 'completed'
    },
    {
      id: '6',
      date: '2024-03-13',
      description: 'Styling Tools Purchase',
      amount: -250,
      type: 'expense',
      category: 'Equipment',
      status: 'completed'
    },
    {
      id: '7',
      date: '2024-03-12',
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
      date: '2024-03-12',
      description: 'Hair Products Inventory',
      amount: -500,
      type: 'expense',
      category: 'Inventory',
      status: 'completed'
    },
    {
      id: '9',
      date: '2024-03-16',
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
      date: '2024-03-11',
      description: 'Marketing - Social Media Ads',
      amount: -100,
      type: 'expense',
      category: 'Marketing',
      status: 'completed'
    },
    {
      id: '11',
      date: '2024-03-17',
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
      date: '2024-03-19',
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
      date: '2024-03-19',
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
      date: '2024-03-15',
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
      date: '2024-03-16',
      description: 'Salon Insurance Monthly Payment',
      amount: -200,
      type: 'expense',
      category: 'Insurance',
      status: 'completed'
    },
    {
      id: '16',
      date: '2024-03-17',
      description: 'Staff Training Materials',
      amount: -150,
      type: 'expense',
      category: 'Training',
      status: 'completed'
    },
    {
      id: '17',
      date: '2024-03-18',
      description: 'Utilities Payment',
      amount: -300,
      type: 'expense',
      category: 'Utilities',
      status: 'completed'
    },
    {
      id: '18',
      date: '2024-03-18',
      description: 'Hair Products Sale - Treatment Kit',
      amount: 120,
      type: 'income',
      category: 'Product Sales',
      status: 'completed',
      client: 'Lisa Wong',
      service: 'Retail'
    },
    {
      id: '19',
      date: '2024-03-25',
      description: 'Balayage and Style',
      amount: 220,
      type: 'income',
      category: 'Services',
      status: 'pending',
      client: 'Jennifer Lee',
      service: 'Balayage',
      eventId: '15'
    },
    {
      id: '20',
      date: '2024-03-26',
      description: 'Hair Extensions',
      amount: 400,
      type: 'income',
      category: 'Services',
      status: 'pending',
      client: 'Madison Taylor',
      service: 'Extensions',
      eventId: '16'
    },
    {
      id: '21',
      date: '2024-03-27',
      description: 'Root Touch-up',
      amount: 95,
      type: 'income',
      category: 'Services',
      status: 'pending',
      client: 'Olivia Wilson',
      service: 'Color',
      eventId: '17'
    },
    {
      id: '22',
      date: '2024-04-02',
      description: 'Full Highlights',
      amount: 250,
      type: 'income',
      category: 'Services',
      status: 'pending',
      client: 'Emma Thompson',
      service: 'Highlights',
      eventId: '18'
    },
    {
      id: '23',
      date: '2024-04-03',
      description: 'Wedding Hair and Trial',
      amount: 300,
      type: 'income',
      category: 'Services',
      status: 'pending',
      client: 'Sophie Martinez',
      service: 'Bridal',
      eventId: '19'
    },
    {
      id: '24',
      date: '2024-04-04',
      description: 'Color Correction',
      amount: 350,
      type: 'income',
      category: 'Services',
      status: 'pending',
      client: 'Isabella Kim',
      service: 'Color Correction',
      eventId: '20'
    },
    {
      id: '25',
      date: '2024-04-08',
      description: 'Monthly Rent',
      amount: -2000,
      type: 'expense',
      category: 'Rent',
      status: 'pending'
    },
    {
      id: '26',
      date: '2024-04-09',
      description: 'Keratin Treatment',
      amount: 280,
      type: 'income',
      category: 'Services',
      status: 'pending',
      client: 'Grace Liu',
      service: 'Treatment',
      eventId: '21'
    },
    {
      id: '27',
      date: '2024-04-10',
      description: 'Hair Product Restock',
      amount: -800,
      type: 'expense',
      category: 'Inventory',
      status: 'pending'
    }
  ];

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
                value={filter.type}
                onChange={(e) => setFilter({ ...filter, type: e.target.value })}
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
                value={filter.category}
                onChange={(e) => setFilter({ ...filter, category: e.target.value })}
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
                value={filter.status}
                onChange={(e) => setFilter({ ...filter, status: e.target.value })}
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
                value={filter.dateRange}
                onChange={(e) => setFilter({ ...filter, dateRange: e.target.value })}
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
              title: 'Today\'s Revenue',
              position: { x: 0, y: 0, width: 1, height: 1 },
              data: transactions
                .filter(t => t.date === format(new Date(), 'yyyy-MM-dd') && t.type === 'income')
                .reduce((sum, t) => sum + t.amount, 0),
              settings: {},
            }}
          >
            <div className="text-2xl font-bold text-gray-900">
              ${transactions
                .filter(t => t.date === format(new Date(), 'yyyy-MM-dd') && t.type === 'income')
                .reduce((sum, t) => sum + t.amount, 0)
                .toLocaleString()}
            </div>
          </DashboardWidget>

          <DashboardWidget
            widget={{
              id: 'appointments-today',
              type: 'metric',
              title: 'Today\'s Appointments',
              position: { x: 1, y: 0, width: 1, height: 1 },
              data: transactions
                .filter(t => t.date === format(new Date(), 'yyyy-MM-dd') && t.category === 'Services')
                .length,
              settings: {},
            }}
          >
            <div className="text-2xl font-bold text-gray-900">
              {transactions
                .filter(t => t.date === format(new Date(), 'yyyy-MM-dd') && t.category === 'Services')
                .length}
            </div>
          </DashboardWidget>

          <DashboardWidget
            widget={{
              id: 'product-sales',
              type: 'metric',
              title: 'Product Sales Today',
              position: { x: 2, y: 0, width: 1, height: 1 },
              data: transactions
                .filter(t => t.date === format(new Date(), 'yyyy-MM-dd') && t.category === 'Product Sales')
                .reduce((sum, t) => sum + t.amount, 0),
              settings: {},
            }}
          >
            <div className="text-2xl font-bold text-gray-900">
              ${transactions
                .filter(t => t.date === format(new Date(), 'yyyy-MM-dd') && t.category === 'Product Sales')
                .reduce((sum, t) => sum + t.amount, 0)
                .toLocaleString()}
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
                {transactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {transaction.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {transaction.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {transaction.client || '-'}
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                      transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.type === 'income' ? '+' : '-'}${Math.abs(transaction.amount).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {transaction.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        transaction.status === 'completed' ? 'bg-green-100 text-green-800' :
                        transaction.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {transaction.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 