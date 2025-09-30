import React, { useEffect, useRef } from 'react';

interface AdsterraAdProps {
  className?: string;
}

// Main Adsterra Ad component - Container Ad (300x250)
export const AdsterraAd: React.FC<AdsterraAdProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load the container-based ad script dynamically
    const loadScript = () => {
      const script = document.createElement('script');
      script.async = true;
      script.setAttribute('data-cfasync', 'false');
      script.src = '//pl27750815.revenuecpmgate.com/799e2d21c1644b80ff46596550eb2189/invoke.js';
      
      if (containerRef.current) {
        containerRef.current.appendChild(script);
      }
    };

    // Load script after component mounts
    setTimeout(loadScript, 1000);
  }, []);

  return (
    <div className={`adsterra-ad-container w-full max-w-sm mx-auto ${className}`}>
      <div 
        ref={containerRef}
        id="container-799e2d21c1644b80ff46596550eb2189"
        className="min-h-[250px] bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-center"
      >
        <div className="text-slate-400 text-sm">Ad Loading...</div>
      </div>
    </div>
  );
};

// Adsterra Skyscraper Ad (160x300 for desktop, 320x100 for mobile)
export const AdsterraSkyscraper: React.FC<{ className?: string }> = ({ className = '' }) => {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isMobile = window.innerWidth <= 768;
      
      // Set up atOptions
      (window as any).atOptions = {
        'key': '44502fa832b6f20211380f7a4b7c3fb8',
        'format': 'iframe',
        'height': isMobile ? 100 : 300,
        'width': isMobile ? 320 : 160,
        'params': {}
      };

      // Load the skyscraper ad script
      const loadScript = () => {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = '//www.highperformanceformat.com/44502fa832b6f20211380f7a4b7c3fb8/invoke.js';
        
        if (adRef.current) {
          adRef.current.appendChild(script);
        }
      };

      // Load script after component mounts
      setTimeout(loadScript, 1500);
    }
  }, []);

  return (
    <div className={`adsterra-skyscraper-ad ${className}`}>
      <div 
        ref={adRef}
        className="bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-center"
        style={{
          width: typeof window !== 'undefined' && window.innerWidth <= 768 ? '320px' : '160px',
          height: typeof window !== 'undefined' && window.innerWidth <= 768 ? '100px' : '300px',
          maxWidth: '100%'
        }}
      >
        <div className="text-slate-400 text-xs">Skyscraper Ad Loading...</div>
      </div>
    </div>
  );
};

// Convenient alias for your specific square ad
export const AdsterraSquare: React.FC<{ className?: string }> = ({ className }) => (
  <AdsterraAd className={className} />
);

export default AdsterraAd;