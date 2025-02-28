import { ReactNode, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useBusinessContext } from '../contexts/BusinessContext';
import { HiMenu, HiX, HiHome, HiChartBar, HiTrendingUp, HiUsers, HiCog, HiCash, HiCalendar, HiUserGroup, HiInbox, HiDocumentReport, HiCollection, HiSupport } from 'react-icons/hi';

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const { state } = useBusinessContext();
  const location = useLocation();

  // Handle responsive sidebar
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsSidebarOpen(window.innerWidth >= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navigationItems = [
    { name: 'Overview', href: '/', icon: HiHome },
    { name: 'Financial Metrics', href: '/metrics', icon: HiChartBar },
    { name: 'Marketing', href: '/marketing', icon: HiTrendingUp },
    { name: 'Customers', href: '/customers', icon: HiUserGroup },
    { name: 'Competitors', href: '/competitors', icon: HiUsers },
    { name: 'Transactions', href: '/transactions', icon: HiCash },
    { name: 'Calendar', href: '/calendar', icon: HiCalendar },
    { name: 'Settings', href: '/settings', icon: HiCog },
  ];

  return (
    <div className="min-h-screen flex overflow-hidden bg-gray-50">
      {/* Overlay for mobile */}
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-75 z-20"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed inset-y-0 left-0 w-64 transition-transform duration-300 ease-in-out transform bg-white border-r border-gray-200 z-30 md:relative md:translate-x-0`}
      >
        {/* Logo */}
        <div className="flex items-center h-16 px-4 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-lg font-bold text-white">B</span>
            </div>
            <span className="text-lg font-semibold text-gray-800">BizSense</span>
          </div>
          {isMobile && (
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="ml-auto text-gray-500 hover:text-gray-700"
            >
              <HiX className="h-6 w-6" />
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => isMobile && setIsSidebarOpen(false)}
                className={`group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors duration-150 ${
                  isActive
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon className={`mr-3 h-5 w-5 flex-shrink-0 ${isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-500'}`} />
                <span className="flex-1">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Profile */}
        <div className="flex items-center px-4 py-3 border-t border-gray-200">
          <div className="flex-shrink-0">
            <img
              className="h-8 w-8 rounded-full"
              src="https://ui-avatars.com/api/?name=User&background=0D8ABC&color=fff"
              alt="User"
            />
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-700">{state.profile.name || 'User'}</p>
            <p className="text-xs text-gray-500">View Profile</p>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200">
          <div className="h-16 flex items-center justify-between px-4">
            <div className="flex items-center">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className={`${
                  isMobile ? 'block' : 'hidden'
                } text-gray-500 hover:text-gray-700 focus:outline-none`}
              >
                <HiMenu className="h-6 w-6" />
              </button>
              <h1 className="ml-4 text-lg font-medium text-gray-800">
                {navigationItems.find(item => item.href === location.pathname)?.name || 'Dashboard'}
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-500 focus:outline-none">
                <HiSupport className="h-5 w-5" />
              </button>
              <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Create task
              </button>
            </div>
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4">
          <div className="max-w-7xl mx-auto">
            {/* Loading indicator */}
            {state.isLoading && (
              <div className="flex justify-center items-center h-full">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            )}

            {/* Error message */}
            {state.error && (
              <div className="mb-4 bg-red-50 border-l-4 border-red-400 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <HiX className="h-5 w-5 text-red-400" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{state.error}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Main content */}
            {!state.isLoading && children}
          </div>
        </main>
      </div>
    </div>
  );
}