import React from 'react';

interface AdsterraAdProps {
  className?: string;
}

// Main Adsterra Ad component using your actual ad code
export const AdsterraAd: React.FC<AdsterraAdProps> = ({ className = '' }) => {
  return (
    <div className={`adsterra-ad-container ${className}`}>
      {/* Your Adsterra ad container */}
      <div id="container-799e2d21c1644b80ff46596550eb2189"></div>
    </div>
  );
};

// Convenient alias for your specific ad
export const AdsterraSquare: React.FC<{ className?: string }> = ({ className }) => (
  <AdsterraAd className={className} />
);

export default AdsterraAd;