import React from 'react';

interface AdsterraAdProps {
  className?: string;
}

// Main Adsterra Ad component using your actual ad code (container-based)
export const AdsterraAd: React.FC<AdsterraAdProps> = ({ className = '' }) => {
  return (
    <div className={`adsterra-ad-container ${className}`}>
      {/* Your Adsterra ad container */}
      <div id="container-799e2d21c1644b80ff46596550eb2189"></div>
    </div>
  );
};

// Adsterra Skyscraper Ad (160x300 - script-based with atOptions)
export const AdsterraSkyscraper: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`adsterra-skyscraper-ad ${className}`} style={{ width: '160px', height: '300px' }}>
      {/* This ad is loaded via the atOptions script in index.html */}
      <div className="flex items-center justify-center h-full bg-slate-100 border border-slate-200 rounded text-xs text-slate-400">
        Skyscraper Ad
      </div>
    </div>
  );
};

// Convenient alias for your specific square ad
export const AdsterraSquare: React.FC<{ className?: string }> = ({ className }) => (
  <AdsterraAd className={className} />
);

export default AdsterraAd;