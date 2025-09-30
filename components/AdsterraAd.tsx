import React, { useEffect } from 'react';

interface AdsterraAdProps {
  adKey: string; // Your Adsterra ad key
  format?: 'banner' | 'native' | 'popup' | 'push';
  width?: number;
  height?: number;
  className?: string;
}

export const AdsterraAd: React.FC<AdsterraAdProps> = ({
  adKey,
  format = 'banner',
  width = 300,
  height = 250,
  className = ''
}) => {
  useEffect(() => {
    // Load Adsterra script dynamically
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = `//www.topcreativeformat.com/${adKey}/invoke.js`;
    script.async = true;
    
    // Configure ad options
    (window as any).atOptions = {
      'key': adKey,
      'format': format === 'banner' ? 'iframe' : format,
      'height': height,
      'width': width,
      'params': {}
    };
    
    document.head.appendChild(script);
    
    return () => {
      // Cleanup script on unmount
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [adKey, format, width, height]);

  return (
    <div className={`adsterra-ad-container ${className}`}>
      {/* Adsterra ads will be injected here */}
      <div 
        className="flex items-center justify-center bg-slate-100 rounded-lg p-4 min-h-[250px]"
        style={{ width: `${width}px`, height: `${height}px` }}
      >
        {/* Placeholder while ad loads */}
        <div className="text-slate-400 text-sm">Advertisement</div>
      </div>
    </div>
  );
};

// Specific Adsterra ad types
export const AdsterraBanner: React.FC<{ adKey: string; className?: string }> = ({ adKey, className }) => (
  <AdsterraAd adKey={adKey} format="banner" width={728} height={90} className={className} />
);

export const AdsterraSquare: React.FC<{ adKey: string; className?: string }> = ({ adKey, className }) => (
  <AdsterraAd adKey={adKey} format="banner" width={300} height={250} className={className} />
);

export const AdsterraSkyscraper: React.FC<{ adKey: string; className?: string }> = ({ adKey, className }) => (
  <AdsterraAd adKey={adKey} format="banner" width={160} height={600} className={className} />
);

export default AdsterraAd;