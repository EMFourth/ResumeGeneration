import React from 'react';

interface AdsterraAdProps {
  className?: string;
}

// Main Adsterra Ad component using your actual ad code (container-based)
export const AdsterraAd: React.FC<AdsterraAdProps> = ({ className = '' }) => {
  return (
    <div className={`adsterra-ad-container w-full max-w-sm mx-auto ${className}`}>
      {/* Your Adsterra ad container */}
      <div id="container-799e2d21c1644b80ff46596550eb2189" className="min-h-[250px] flex items-center justify-center"></div>
    </div>
  );
};

// Adsterra Skyscraper Ad (160x300 - script-based with atOptions)
export const AdsterraSkyscraper: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`adsterra-skyscraper-ad ${className}`}>
      {/* Mobile: Show as banner (responsive), Desktop: Show as skyscraper (160x300) */}
      <div className="block lg:hidden w-full max-w-sm mx-auto">
        {/* Mobile banner format */}
        <div className="h-24 bg-slate-100 border border-slate-200 rounded flex items-center justify-center text-xs text-slate-400">
          Mobile Ad Banner
        </div>
      </div>
      <div className="hidden lg:block" style={{ width: '160px', height: '300px' }}>
        {/* Desktop skyscraper format */}
        <div className="flex items-center justify-center h-full bg-slate-100 border border-slate-200 rounded text-xs text-slate-400">
          Skyscraper Ad
        </div>
      </div>
    </div>
  );
};

// Convenient alias for your specific square ad
export const AdsterraSquare: React.FC<{ className?: string }> = ({ className }) => (
  <AdsterraAd className={className} />
);

export default AdsterraAd;