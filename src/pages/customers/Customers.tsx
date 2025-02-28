import { useState, useMemo } from 'react';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import { useBusinessContext } from '../../contexts/BusinessContext';
import { EnhancedTooltip } from '../../components/EnhancedTooltip';
import { format } from 'date-fns';
import { formatCurrency } from '../../utils/transactionAnalytics';

interface Customer {
  id: string;
  name: string;
  totalSpent: number;
  visitCount: number;
  lastVisit: string;
  averageSpend: number;
  services: string[];
  status: 'active' | 'inactive';
}

export function Customers() {
  const { state } = useBusinessContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<keyof Customer>('totalSpent');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const customers = useMemo(() => {
    // Group transactions by client
    const customerMap = new Map<string, Customer>();

    state.transactions.forEach(transaction => {
      if (transaction.type === 'income' && transaction.client) {
        const existing = customerMap.get(transaction.client) || {
          id: transaction.client.toLowerCase().replace(/\s+/g, '-'),
          name: transaction.client,
          totalSpent: 0,
          visitCount: 0,
          lastVisit: '',
          averageSpend: 0,
          services: [],
          status: 'active',
        };

        existing.totalSpent += transaction.amount;
        existing.visitCount += 1;
        existing.lastVisit = transaction.date > (existing.lastVisit || '') ? transaction.date : existing.lastVisit;
        if (transaction.service && !existing.services.includes(transaction.service)) {
          existing.services.push(transaction.service);
        }
        existing.averageSpend = existing.totalSpent / existing.visitCount;
        
        // Set status based on last visit (inactive if no visits in last 3 months)
        const lastVisitDate = new Date(existing.lastVisit);
        const threeMonthsAgo = new Date();
        threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
        existing.status = lastVisitDate > threeMonthsAgo ? 'active' : 'inactive';

        customerMap.set(transaction.client, existing);
      }
    });

    return Array.from(customerMap.values());
  }, [state.transactions]);

  const filteredCustomers = useMemo(() => {
    return customers
      .filter(customer =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.services.some(service => 
          service.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
      .sort((a, b) => {
        const aValue = a[sortField];
        const bValue = b[sortField];
        
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return sortDirection === 'asc' 
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }
        
        return sortDirection === 'asc'
          ? (aValue as number) - (bValue as number)
          : (bValue as number) - (aValue as number);
      });
  }, [customers, searchTerm, sortField, sortDirection]);

  const handleSort = (field: keyof Customer) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="sm:flex sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Customers</h1>
            <p className="mt-2 text-sm text-gray-700">
              Manage and track your customer relationships
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <div className="relative">
              <input
                type="text"
                placeholder="Search customers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <EnhancedTooltip
                title="Total Customers"
                description="The total number of unique customers who have made purchases"
                examples={[
                  { label: 'Active', value: 'Visited in last 3 months' },
                  { label: 'Inactive', value: 'No recent visits' },
                ]}
                visual={{
                  type: 'calculation',
                  data: [
                    { label: 'Total', value: customers.length.toString() },
                    { label: 'Active', value: customers.filter(c => c.status === 'active').length.toString() },
                    { label: 'Inactive', value: customers.filter(c => c.status === 'inactive').length.toString() },
                  ],
                }}
              >
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Total Customers</dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">{customers.length}</div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </EnhancedTooltip>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <EnhancedTooltip
                title="Average Customer Value"
                description="The average amount spent per customer"
                examples={[
                  { label: 'Total Revenue', value: formatCurrency(customers.reduce((sum, c) => sum + c.totalSpent, 0)) },
                  { label: 'Customer Count', value: customers.length.toString() },
                ]}
                visual={{
                  type: 'calculation',
                  data: [
                    { label: 'Total Revenue', value: formatCurrency(customers.reduce((sum, c) => sum + c.totalSpent, 0)) },
                    { label: 'Customers', value: customers.length.toString() },
                    { label: 'Average', value: formatCurrency(customers.reduce((sum, c) => sum + c.totalSpent, 0) / customers.length) },
                  ],
                }}
              >
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Average Customer Value</dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">
                          {formatCurrency(customers.reduce((sum, c) => sum + c.totalSpent, 0) / customers.length)}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </EnhancedTooltip>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <EnhancedTooltip
                title="Active Customers"
                description="Customers who have visited in the last 3 months"
                examples={[
                  { label: 'Recent Visit', value: 'Within 3 months' },
                  { label: 'Status', value: 'Active' },
                ]}
                visual={{
                  type: 'bar',
                  data: [
                    { 
                      label: 'Active', 
                      value: `${(customers.filter(c => c.status === 'active').length / customers.length * 100).toFixed(0)}%`,
                      color: '#10B981'
                    },
                    { 
                      label: 'Inactive', 
                      value: `${(customers.filter(c => c.status === 'inactive').length / customers.length * 100).toFixed(0)}%`,
                      color: '#EF4444'
                    },
                  ],
                }}
              >
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Active Customers</dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">
                          {customers.filter(c => c.status === 'active').length}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </EnhancedTooltip>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <EnhancedTooltip
                title="Average Visits"
                description="The average number of visits per customer"
                examples={[
                  { label: 'Total Visits', value: customers.reduce((sum, c) => sum + c.visitCount, 0).toString() },
                  { label: 'Customer Count', value: customers.length.toString() },
                ]}
                visual={{
                  type: 'calculation',
                  data: [
                    { label: 'Total Visits', value: customers.reduce((sum, c) => sum + c.visitCount, 0).toString() },
                    { label: 'Customers', value: customers.length.toString() },
                    { label: 'Average', value: (customers.reduce((sum, c) => sum + c.visitCount, 0) / customers.length).toFixed(1) },
                  ],
                }}
              >
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Average Visits</dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">
                          {(customers.reduce((sum, c) => sum + c.visitCount, 0) / customers.length).toFixed(1)}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </EnhancedTooltip>
            </div>
          </div>
        </div>

        {/* Customer List */}
        <div className="bg-white shadow-sm rounded-lg">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('name')}
                  >
                    Customer
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('totalSpent')}
                  >
                    Total Spent
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('visitCount')}
                  >
                    Visits
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('lastVisit')}
                  >
                    Last Visit
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('averageSpend')}
                  >
                    Avg. Spend
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Services
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('status')}
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCustomers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{formatCurrency(customer.totalSpent)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{customer.visitCount}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {format(new Date(customer.lastVisit), 'MMM d, yyyy')}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{formatCurrency(customer.averageSpend)}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {customer.services.map((service) => (
                          <span
                            key={service}
                            className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800"
                          >
                            {service}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          customer.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {customer.status}
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