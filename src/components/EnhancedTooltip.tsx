import { ReactNode, useState, useEffect, useRef } from 'react';
import { HiQuestionMarkCircle } from 'react-icons/hi';

interface Example {
  label: string;
  value: string;
  color?: string;
}

interface VisualExample {
  type: 'bar' | 'comparison' | 'calculation';
  data: Example[];
}

interface EnhancedTooltipProps {
  title: string;
  description: string;
  examples?: Example[];
  visual?: VisualExample;
  children?: ReactNode;
}

export function EnhancedTooltip({
  title,
  description,
  examples,
  visual,
  children,
}: EnhancedTooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState<'right' | 'left' | 'top' | 'bottom'>('right');
  const tooltipRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function updatePosition() {
      if (!tooltipRef.current || !containerRef.current) return;

      const container = containerRef.current.getBoundingClientRect();
      const viewport = {
        width: window.innerWidth,
        height: window.innerHeight,
      };

      // Default to right
      let newPosition: 'right' | 'left' | 'top' | 'bottom' = 'right';

      // Check if tooltip would overflow right edge
      if (container.right + 320 > viewport.width) {
        // If it would overflow right, try left
        if (container.left - 320 > 0) {
          newPosition = 'left';
        } else {
          // If it can't go left either, place it below
          newPosition = 'bottom';
        }
      }

      setPosition(newPosition);
    }

    if (isVisible) {
      updatePosition();
      window.addEventListener('resize', updatePosition);
      window.addEventListener('scroll', updatePosition);
    }

    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition);
    };
  }, [isVisible]);

  const renderVisual = () => {
    if (!visual) return null;

    switch (visual.type) {
      case 'bar':
        return (
          <div className="mt-2 space-y-1">
            {visual.data.map((item, index) => (
              <div key={index} className="relative pt-1">
                <div className="flex mb-1 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block text-white">
                      {item.label}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold inline-block text-white">
                      {item.value}
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-1.5 text-xs flex rounded bg-gray-700">
                  <div
                    style={{
                      width: item.value,
                      backgroundColor: item.color || '#4F46E5',
                    }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center transition-all duration-300"
                  />
                </div>
              </div>
            ))}
          </div>
        );

      case 'comparison':
        return (
          <div className="mt-2 grid grid-cols-2 gap-1.5">
            {visual.data.map((item, index) => (
              <div
                key={index}
                className="p-1.5 rounded bg-gray-800 text-center"
              >
                <div className="text-xs text-gray-400">{item.label}</div>
                <div className="text-xs font-semibold">{item.value}</div>
              </div>
            ))}
          </div>
        );

      case 'calculation':
        return (
          <div className="mt-2 space-y-0.5 bg-gray-800 p-2 rounded">
            {visual.data.map((item, index) => (
              <div key={index} className="flex justify-between text-xs">
                <span>{item.label}</span>
                <span className="font-mono">{item.value}</span>
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  const getTooltipClasses = () => {
    const baseClasses = "absolute z-50 w-64 sm:w-80 p-3 text-xs sm:text-sm bg-gray-900 text-white rounded-lg shadow-lg";
    
    switch (position) {
      case 'left':
        return `${baseClasses} -top-2 right-full mr-2`;
      case 'bottom':
        return `${baseClasses} top-full left-1/2 transform -translate-x-1/2 mt-2`;
      case 'top':
        return `${baseClasses} bottom-full left-1/2 transform -translate-x-1/2 mb-2`;
      default: // right
        return `${baseClasses} -top-2 left-full ml-2`;
    }
  };

  const getArrowClasses = () => {
    const baseClasses = "absolute w-2 h-2 bg-gray-900 transform rotate-45";
    
    switch (position) {
      case 'left':
        return `${baseClasses} -right-1 top-4`;
      case 'bottom':
        return `${baseClasses} -top-1 left-1/2 -translate-x-1/2`;
      case 'top':
        return `${baseClasses} -bottom-1 left-1/2 -translate-x-1/2`;
      default: // right
        return `${baseClasses} -left-1 top-4`;
    }
  };

  return (
    <div className="relative inline-flex items-center group" ref={containerRef}>
      {children}
      <button
        className="ml-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-full p-0.5"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onClick={() => setIsVisible(!isVisible)}
        aria-label="Show explanation"
      >
        <HiQuestionMarkCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
      </button>
      {isVisible && (
        <div className={getTooltipClasses()} ref={tooltipRef}>
          <div className={getArrowClasses()} />
          <div>
            <p className="font-medium mb-1">{title}</p>
            <p className="text-gray-300">{description}</p>
            {examples && (
              <div className="mt-2 space-y-1">
                <p className="font-medium text-gray-400">Examples:</p>
                {examples.map((example, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center bg-gray-800 px-2 py-1 rounded"
                  >
                    <span className="text-gray-300">{example.label}</span>
                    <span className="font-mono text-xs">{example.value}</span>
                  </div>
                ))}
              </div>
            )}
            {renderVisual()}
          </div>
        </div>
      )}
    </div>
  );
} 