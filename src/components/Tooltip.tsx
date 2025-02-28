import { ReactNode, useState } from 'react';
import { HiQuestionMarkCircle } from 'react-icons/hi';

interface TooltipProps {
  content: ReactNode;
  children?: ReactNode;
}

export function Tooltip({ content, children }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative inline-flex items-center group">
      {children}
      <button
        className="ml-1 text-gray-400 hover:text-gray-500 focus:outline-none"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onClick={() => setIsVisible(!isVisible)}
        aria-label="Show explanation"
      >
        <HiQuestionMarkCircle className="h-4 w-4" />
      </button>
      {isVisible && (
        <div className="absolute z-10 w-72 px-4 py-3 text-sm bg-gray-900 text-white rounded-lg shadow-lg -top-2 left-full ml-2">
          <div className="absolute w-2 h-2 bg-gray-900 transform rotate-45 -left-1 top-4" />
          {content}
        </div>
      )}
    </div>
  );
} 