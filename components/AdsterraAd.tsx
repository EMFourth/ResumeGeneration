import React, { useEffect, useRef, useState } from 'react';

interface AdsterraAdProps {
  className?: string;
}

// Main Adsterra Ad component - Active Banner
export const AdsterraAd: React.FC<AdsterraAdProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && containerRef.current) {
      // Create and inject the Adsterra script for active banner
      const script = document.createElement('script');
      script.async = true;
      script.setAttribute('data-cfasync', 'false');
      script.src = '//pl27750815.effectivegatecpm.com/799e2d21c1644b80ff46596550eb2189/invoke.js';
      script.onload = () => setIsLoaded(true);
      script.onerror = () => console.log('Adsterra script load error');
      
      // Set the proper container ID for Adsterra
      containerRef.current.id = 'container-799e2d21c1644b80ff46596550eb2189';
      
      // Append script to document head
      document.head.appendChild(script);
    }
  }, []);

  return (
    <div className={`adsterra-ad-container w-full max-w-sm mx-auto ${className}`}>
      <div 
        ref={containerRef}
        id="container-799e2d21c1644b80ff46596550eb2189"
        className="min-h-[250px] bg-slate-50 border border-slate-200 rounded-lg overflow-hidden flex items-center justify-center"
      >
        {!isLoaded && (
          <div className="text-slate-400 text-sm">Loading Ad...</div>
        )}
      </div>
    </div>
  );
};



// Convenient alias for your specific square ad
export const AdsterraSquare: React.FC<{ className?: string }> = ({ className }) => (
  <AdsterraAd className={className} />
);

export default AdsterraAd;