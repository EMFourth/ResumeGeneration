import React, { useEffect, useRef, useState } from 'react';

interface AdsterraAdProps {
  className?: string;
}

declare global {
  interface Window {
    atOptions?: any;
  }
}

// Main Adsterra Ad component using your actual ad code (container-based)
export const AdsterraAd: React.FC<AdsterraAdProps> = ({ className = '' }) => {
  const adRef = useRef<HTMLDivElement>(null);
  const [adLoaded, setAdLoaded] = useState(false);

  useEffect(() => {
    // The Adsterra container ad should auto-populate via script
    // Script: //pl27750815.revenuecpmgate.com/799e2d21c1644b80ff46596550eb2189/invoke.js
    
    // Wait for script to load and populate the container
    const checkForAd = () => {
      if (adRef.current) {
        // Check if the ad has been populated by looking for iframe or other ad content
        const hasAdContent = adRef.current.querySelector('iframe') || 
                           adRef.current.querySelector('script') || 
                           adRef.current.querySelector('div[style*="position"]') ||
                           adRef.current.children.length > 1;
        
        if (hasAdContent) {
          setAdLoaded(true);
        }
      }
    };

    // Check immediately and then periodically
    checkForAd();
    const interval = setInterval(checkForAd, 1000);
    
    // Stop checking after 10 seconds
    const timeout = setTimeout(() => {
      clearInterval(interval);
      if (!adLoaded) {
        console.log('Adsterra container ad did not load within 10 seconds');
      }
    }, 10000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [adLoaded]);

  return (
    <div className={`adsterra-ad-container w-full max-w-sm mx-auto ${className}`}>
      {/* Your Adsterra ad container - this ID matches the script in index.html */}
      <div 
        ref={adRef}
        id="container-799e2d21c1644b80ff46596550eb2189" 
        className="min-h-[250px] w-full relative bg-slate-50 border border-slate-200 rounded-lg overflow-hidden"
      >
        {/* Show loading state until ad loads */}
        {!adLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-slate-400 text-sm">Loading Ad...</div>
          </div>
        )}
      </div>
    </div>
  );
};

// Adsterra Skyscraper Ad (160x300 - script-based with atOptions)
export const AdsterraSkyscraper: React.FC<{ className?: string }> = ({ className = '' }) => {
  const skyscraperRef = useRef<HTMLDivElement>(null);
  const [adLoaded, setAdLoaded] = useState(false);
  const adIdRef = useRef(`adsterra-skyscraper-${Math.random().toString(36).substr(2, 9)}`);
  
  useEffect(() => {
    // Create and insert the script to load the ad
    const loadSkyscraperAd = () => {
      if (skyscraperRef.current && typeof window !== 'undefined') {
        try {
          // Create script element for this specific ad
          const script = document.createElement('script');
          script.type = 'text/javascript';
          script.innerHTML = `
            (function() {
              const isMobile = window.innerWidth <= 768;
              const adContainer = document.getElementById('${adIdRef.current}');
              if (adContainer) {
                // Create ad script element
                const adScript = document.createElement('script');
                adScript.type = 'text/javascript';
                adScript.src = '//www.highperformanceformat.com/44502fa832b6f20211380f7a4b7c3fb8/invoke.js';
                adScript.async = true;
                
                // Set up atOptions before loading script
                window.atOptions = {
                  'key' : '44502fa832b6f20211380f7a4b7c3fb8',
                  'format' : 'iframe',
                  'height' : isMobile ? 100 : 300,
                  'width' : isMobile ? 320 : 160,
                  'params' : {}
                };
                
                adContainer.appendChild(adScript);
                
                // Check if ad loaded after a delay
                setTimeout(() => {
                  const hasAdContent = adContainer.querySelector('iframe') || 
                                     adContainer.querySelector('div[style]') ||
                                     adContainer.children.length > 1;
                  if (hasAdContent) {
                    window.adsterra_skyscraper_loaded = true;
                  }
                }, 2000);
              }
            })();
          `;
          
          // Append and execute the script
          document.head.appendChild(script);
          
          // Clean up script after execution
          setTimeout(() => {
            if (script.parentNode) {
              script.parentNode.removeChild(script);
            }
          }, 1000);
          
        } catch (error) {
          console.log('Error loading Adsterra skyscraper:', error);
        }
      }
    };

    // Load the ad after component mounts
    const timer = setTimeout(loadSkyscraperAd, 500);
    
    // Check for loaded ad
    const checkInterval = setInterval(() => {
      if ((window as any).adsterra_skyscraper_loaded || 
          (skyscraperRef.current && (
            skyscraperRef.current.querySelector('iframe') ||
            skyscraperRef.current.querySelector('div[style]')
          ))) {
        setAdLoaded(true);
        clearInterval(checkInterval);
      }
    }, 1000);

    // Stop checking after 15 seconds
    const stopTimer = setTimeout(() => {
      clearInterval(checkInterval);
    }, 15000);

    return () => {
      clearTimeout(timer);
      clearTimeout(stopTimer);
      clearInterval(checkInterval);
    };
  }, []);

  return (
    <div className={`adsterra-skyscraper-ad ${className}`}>
      <div 
        ref={skyscraperRef}
        id={adIdRef.current}
        className="w-full max-w-sm mx-auto lg:max-w-none lg:w-40 relative"
        style={{ minHeight: '100px' }}
      >
        {/* Show loading state until ad loads */}
        {!adLoaded && (
          <div className="h-24 lg:h-[300px] lg:w-40 bg-slate-50 border border-slate-200 rounded flex items-center justify-center text-xs text-slate-400">
            Loading Skyscraper Ad...
          </div>
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