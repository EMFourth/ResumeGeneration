import React, { useEffect, useRef, useState } from 'react';

interface AdsterraAdProps {
  className?: string;
}

// Main Adsterra Ad component - Container Ad (300x250)
export const AdsterraAd: React.FC<AdsterraAdProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [adFailed, setAdFailed] = useState(false);
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    // Try to load the Adsterra ad
    const loadScript = () => {
      try {
        const script = document.createElement('script');
        script.async = true;
        script.setAttribute('data-cfasync', 'false');
        script.src = '//pl27750815.revenuecpmgate.com/799e2d21c1644b80ff46596550eb2189/invoke.js';
        
        script.onerror = () => {
          console.log('Adsterra container script failed to load');
          setAdFailed(true);
          setShowFallback(true);
        };
        
        if (containerRef.current) {
          containerRef.current.appendChild(script);
        }
      } catch (error) {
        console.log('Error loading Adsterra script:', error);
        setAdFailed(true);
        setShowFallback(true);
      }
    };

    // Load script after component mounts
    const timer = setTimeout(loadScript, 1000);
    
    // Show fallback after 10 seconds if ad doesn't load
    const fallbackTimer = setTimeout(() => {
      if (!adFailed) {
        setShowFallback(true);
      }
    }, 10000);

    return () => {
      clearTimeout(timer);
      clearTimeout(fallbackTimer);
    };
  }, [adFailed]);

  if (showFallback) {
    return (
      <div className={`w-full max-w-sm mx-auto ${className}`}>
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6 text-center">
          <div className="text-blue-600 font-semibold text-sm mb-2">💡 Pro Tip</div>
          <div className="text-slate-700 text-sm">
            Customize your resume for each job application to increase your chances by up to 40%!
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`adsterra-ad-container w-full max-w-sm mx-auto ${className}`}>
      <div 
        ref={containerRef}
        id="container-799e2d21c1644b80ff46596550eb2189"
        className="min-h-[250px] bg-white border border-slate-200 rounded-lg overflow-hidden"
      >
        {/* This will be populated by the Adsterra script */}
      </div>
    </div>
  );
};

// Adsterra Skyscraper Ad with fallback content
export const AdsterraSkyscraper: React.FC<{ className?: string }> = ({ className = '' }) => {
  const adRef = useRef<HTMLDivElement>(null);
  const [adFailed, setAdFailed] = useState(false);
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isMobile = window.innerWidth <= 768;
      
      try {
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
          
          script.onerror = () => {
            console.log('Adsterra skyscraper script failed to load');
            setAdFailed(true);
            setShowFallback(true);
          };
          
          if (adRef.current) {
            adRef.current.appendChild(script);
          }
        };

        // Load script after component mounts
        const timer = setTimeout(loadScript, 1500);
        
        // Show fallback after 8 seconds if ad doesn't load
        const fallbackTimer = setTimeout(() => {
          if (!adFailed) {
            setShowFallback(true);
          }
        }, 8000);

        return () => {
          clearTimeout(timer);
          clearTimeout(fallbackTimer);
        };
      } catch (error) {
        console.log('Error setting up Adsterra skyscraper:', error);
        setAdFailed(true);
        setShowFallback(true);
      }
    }
  }, [adFailed]);

  if (showFallback) {
    return (
      <div className={`${className} w-40 hidden lg:block`}>
        <div className="bg-gradient-to-b from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4 h-[300px] flex flex-col justify-center text-center">
          <div className="text-green-600 font-semibold text-xs mb-3">📊 Quick Stats</div>
          <div className="space-y-2 text-xs text-slate-700">
            <div className="bg-white/50 rounded p-2">
              <div className="font-medium">75%</div>
              <div>of employers use ATS systems</div>
            </div>
            <div className="bg-white/50 rounded p-2">
              <div className="font-medium">6 sec</div>
              <div>average resume scan time</div>
            </div>
            <div className="bg-white/50 rounded p-2">
              <div className="font-medium">40%</div>
              <div>higher success with tailored resumes</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`adsterra-skyscraper-ad ${className} w-40 hidden lg:block`}>
      <div 
        ref={adRef}
        className="bg-white border border-slate-200 rounded-lg overflow-hidden"
        style={{ width: '160px', height: '300px' }}
      >
        {/* This will be populated by the Adsterra script */}
      </div>
    </div>
  );
};

// Convenient alias for your specific square ad
export const AdsterraSquare: React.FC<{ className?: string }> = ({ className }) => (
  <AdsterraAd className={className} />
);

export default AdsterraAd;