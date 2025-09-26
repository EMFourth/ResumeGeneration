import React, { useEffect, useRef } from 'react';

interface EzoicAdProps {
  placeholder: string;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export const EzoicAd: React.FC<EzoicAdProps> = ({ 
  placeholder, 
  size = 'medium', 
  className = '' 
}) => {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Ezoic ad initialization
    // This would typically be replaced with actual Ezoic integration code
    try {
      // Check if Ezoic is available
      if (typeof window !== 'undefined' && (window as any).ezstandalone) {
        // Initialize Ezoic ad for this placeholder
        console.log(`Initializing Ezoic ad for placeholder: ${placeholder}`);
      }
    } catch (e) {
      console.error('Ezoic ad initialization error:', e);
    }
  }, [placeholder]);

  const sizeClasses = {
    small: 'min-h-[100px]',
    medium: 'min-h-[200px]',
    large: 'min-h-[300px]'
  };

  return (
    <div 
      ref={adRef}
      className={`ezoic-ad-container my-4 text-center bg-slate-100 rounded-lg p-2 ${sizeClasses[size]} flex items-center justify-center ${className}`}
      data-ezoic-ad-placeholder={placeholder}
    >
      <div className="ezoic-ad" data-ad-name={placeholder}>
        {/* Ezoic will replace this content with actual ads */}
        <div className="text-slate-400 text-sm">
          Advertisement Space
          <br />
          <span className="text-xs">({placeholder})</span>
        </div>
      </div>
    </div>
  );
};