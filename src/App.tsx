import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { BusinessProvider } from './contexts/BusinessContext';
import { Dashboard } from './pages/Dashboard';
import { FinancialMetrics } from './pages/metrics/FinancialMetrics';
import { Marketing } from './pages/marketing/Marketing';
import { Competitors } from './pages/competitors/Competitors';
import { Settings } from './pages/settings/Settings';
import { Transactions } from './pages/transactions/Transactions';
import { Calendar } from './pages/calendar/Calendar';
import { Customers } from './pages/customers/Customers';

function App() {
  return (
    <BusinessProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/metrics" element={<FinancialMetrics />} />
          <Route path="/marketing" element={<Marketing />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/competitors" element={<Competitors />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </BusinessProvider>
  );
}

export default App; 