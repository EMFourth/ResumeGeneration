import React, { useEffect, useState } from 'react';

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export const GoogleAd: React.FC = () => {
  const [adError, setAdError] = useState<string | null>(null);
  const [isValidConfig, setIsValidConfig] = useState(false);

  // Configuration validation
  const adClient = "ca-pub-7524647518323966";
  const adSlot = process.env.ADSENSE_SLOT_ID || "";

  useEffect(() => {
    // Validate AdSense configuration
    if (!adSlot || adSlot === "1234567890" || adSlot.length < 10) {
      setAdError("AdSense not properly configured");
      return;
    }

    setIsValidConfig(true);

    // Only load ad if configuration is valid
    const loadAd = () => {
      try {
        if (window.adsbygoogle && window.adsbygoogle.loaded) {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        } else {
          // Retry after a short delay if AdSense script isn't loaded yet
          setTimeout(loadAd, 1000);
        }
      } catch (e) {
        console.error('AdSense error:', e);
        setAdError("Failed to load advertisement");
      }
    };

    loadAd();
  }, [adSlot]);

  // Don't render anything if configuration is invalid
  if (!isValidConfig || adError) {
    return null;
  }

  return (
    <div className="advertisement-section my-6">
      {/* Required advertisement label */}
      <div className="text-xs text-slate-500 mb-1 text-center">
        Advertisement
      </div>
      
      {/* Ad container with proper spacing */}
      <div className="google-ad-container bg-slate-50 rounded-lg p-4 min-h-[120px] flex items-center justify-center border border-slate-200">
        <ins
          className="adsbygoogle"
          style={{ display: 'block', width: '100%', height: '100px' }}
          data-ad-client={adClient}
          data-ad-slot={adSlot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
      </div>
      
      {/* Footer notice for transparency */}
      <div className="text-xs text-slate-400 mt-1 text-center">
        Ads help support this free service
      </div>
    </div>
  );
};
