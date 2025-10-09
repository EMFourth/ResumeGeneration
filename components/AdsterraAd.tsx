import React, { useEffect, useRef, useState } from 'react';

interface AdsterraAdProps {
  className?: string;
}

// Clean Adsterra Banner Ad component - 468x60 format (top ad)
export const AdsterraIframe: React.FC<AdsterraAdProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && containerRef.current) {
      // Set atOptions for the banner ad
      (window as any).atOptions = {
        'key': 'bdda2a7d1db45c04289992fa18b1d98f',
        'format': 'iframe',
        'height': 60,
        'width': 468,
        'params': {}
      };

      // Create and inject the Adsterra iframe script
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = '//www.highperformanceformat.com/bdda2a7d1db45c04289992fa18b1d98f/invoke.js';
      script.onload = () => setIsLoaded(true);
      script.onerror = () => console.log('Adsterra banner script load error');
      
      // Append script to the container
      containerRef.current.appendChild(script);
    }
  }, []);

  return (
    <div className={`adsterra-banner-container w-full max-w-lg mx-auto ${className}`}>
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

// Adsterra Leaderboard Ad component - 728x90 format (bottom ad) with mobile responsiveness
export const AdsterraLeaderboard: React.FC<AdsterraAdProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && containerRef.current) {
      // Set atOptions for the leaderboard ad
      (window as any).atOptions = {
        'key': 'c0b5d27ce6ac42e469cf58ae3a7d97f3',
        'format': 'iframe',
        'height': 90,
        'width': 728,
        'params': {}
      };

      // Create and inject the Adsterra iframe script
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = '//www.highperformanceformat.com/c0b5d27ce6ac42e469cf58ae3a7d97f3/invoke.js';
      script.onload = () => setIsLoaded(true);
      script.onerror = () => console.log('Adsterra leaderboard script load error');
      
      // Append script to the container
      containerRef.current.appendChild(script);
    }
  }, []);

  return (
    <div className={`adsterra-leaderboard-container w-full mx-auto ${className}`}>
      <div 
        ref={containerRef}
        className="max-w-[728px] w-full h-[90px] bg-slate-50 border border-slate-200 rounded-lg overflow-hidden flex items-center justify-center mx-auto
                   md:w-[728px] sm:max-w-full sm:w-auto"
        style={{ 
          width: 'min(728px, 100vw - 2rem)',
          minHeight: '90px'
        }}
      >
        {!isLoaded && (
          <div className="text-slate-400 text-sm">Loading Ad...</div>
        )}
      </div>
    </div>
  );
};

// Export the safe iframe ad as default
export default AdsterraIframe;