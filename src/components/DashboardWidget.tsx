import { ReactNode } from 'react';
import { DashboardWidget as DashboardWidgetType } from '../types/business';

export interface DashboardWidgetProps {
  widget: DashboardWidgetType;
  children: ReactNode;
}

export function DashboardWidget({
  widget,
  children,
}: DashboardWidgetProps) {
  return (
    <div
      className="bg-white rounded-lg shadow-sm p-3 sm:p-4 md:p-5 transition-shadow hover:shadow-md"
      style={{
        gridColumn: `span ${widget.position.width}`,
        gridRow: `span ${widget.position.height}`,
      }}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 sm:mb-4">
        <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2 sm:mb-0">
          {widget.title}
        </h3>
        <div className="flex items-center space-x-2">
          {widget.settings.refreshInterval && (
            <span className="text-xs sm:text-sm text-gray-500 hidden sm:inline">
              Updates every {widget.settings.refreshInterval}s
            </span>
          )}
          <div className="flex space-x-1">
            <button
              className="text-gray-400 hover:text-gray-500 p-1 rounded-full hover:bg-gray-100 transition-colors duration-150"
              onClick={() => {
                // Implement refresh logic
              }}
              aria-label="Refresh"
            >
              <svg
                className="h-4 w-4 sm:h-5 sm:w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </button>
            <button
              className="text-gray-400 hover:text-gray-500 p-1 rounded-full hover:bg-gray-100 transition-colors duration-150"
              onClick={() => {
                // Implement settings logic
              }}
              aria-label="Settings"
            >
              <svg
                className="h-4 w-4 sm:h-5 sm:w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="relative">
        {widget.type === 'metric' && (
          <div className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
            {children}
          </div>
        )}

        {widget.type === 'chart' && (
          <div className="h-48 sm:h-56 md:h-64">
            {children}
          </div>
        )}

        {widget.type === 'alert' && (
          <div className="bg-yellow-50 p-3 sm:p-4 rounded-md">
            {children}
          </div>
        )}

        {widget.type === 'comparison' && (
          <div className="space-y-3 sm:space-y-4">
            {children}
          </div>
        )}
      </div>

      {widget.settings.comparison && (
        <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500">
            <span>Compared to {widget.settings.comparison}</span>
            <span className="font-medium text-green-600">+12.5%</span>
          </div>
        </div>
      )}
    </div>
  );
} 