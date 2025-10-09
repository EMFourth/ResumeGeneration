import React, { useEffect, useRef, useState } from 'react';

interface AdsterraAdProps {
  className?: string;
}

// Safe single banner ad implementation to prevent conflicts
export const AdsterraIframe: React.FC<AdsterraAdProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && containerRef.current && !hasError) {
      try {
        // Clear any existing atOptions to prevent conflicts
        delete (window as any).atOptions;
        
        // Set fresh atOptions for banner ad
        (window as any).atOptions = {
          'key': 'bdda2a7d1db45c04289992fa18b1d98f',
          'format': 'iframe',
          'height': 60,
          'width': 468,
          'params': {}
        };

        // Create and inject the Adsterra script
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.src = '//www.highperformanceformat.com/bdda2a7d1db45c04289992fa18b1d98f/invoke.js';
        
        script.onload = () => {
          console.log('Adsterra banner loaded successfully');
          setIsLoaded(true);
        };
        
        script.onerror = () => {
          console.warn('Adsterra banner failed to load');
          setHasError(true);
          setIsLoaded(false);
        };
        
        // Append to container
        containerRef.current.appendChild(script);
        
        // Cleanup function
        return () => {
          if (containerRef.current && script.parentNode) {
            containerRef.current.removeChild(script);
          }
        };
      } catch (error) {
        console.error('Error loading ad:', error);
        setHasError(true);
      }
    }
  }, [hasError]);

  if (hasError) {
    return (
      <div className={`w-full max-w-lg mx-auto ${className}`}>
        <div className="w-[468px] h-[60px] bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-center mx-auto">
          <div className="text-slate-400 text-sm">Ad Unavailable</div>
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full max-w-lg mx-auto ${className}`}>
      <div 
        ref={containerRef}
        className="w-[468px] h-[60px] bg-slate-50 border border-slate-200 rounded-lg overflow-hidden flex items-center justify-center mx-auto"
      >
        {!isLoaded && (
          <div className="text-slate-400 text-sm">Loading Ad...</div>
        )}
      </div>
    </div>
  );
};

// Placeholder for bottom ad - using same safe banner to avoid conflicts
export const AdsterraLeaderboard: React.FC<AdsterraAdProps> = ({ className = '' }) => {
  return (
    <div className={`w-full mx-auto ${className}`}>
      <div className="max-w-[728px] w-full h-[90px] bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-center mx-auto">
        <div className="text-slate-400 text-sm">Reserved Ad Space</div>
      </div>
    </div>
  );
};

// Export the safe iframe ad as default
export default AdsterraIframe;