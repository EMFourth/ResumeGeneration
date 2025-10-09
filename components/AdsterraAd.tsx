import React from 'react';

interface AdsterraAdProps {
  className?: string;
}

// TEMPORARILY DISABLED - Security placeholder to prevent malvertising
export const AdsterraIframe: React.FC<AdsterraAdProps> = ({ className = '' }) => {
  return (
    <div className={`w-full max-w-lg mx-auto ${className}`}>
      <div className="w-[468px] h-[60px] bg-slate-100 border border-slate-300 rounded-lg flex items-center justify-center mx-auto">
        <div className="text-slate-500 text-sm font-medium">Ad Space - Security Review</div>
      </div>
    </div>
  );
};

// TEMPORARILY DISABLED - Security placeholder to prevent malvertising  
export const AdsterraLeaderboard: React.FC<AdsterraAdProps> = ({ className = '' }) => {
  return (
    <div className={`w-full mx-auto ${className}`}>
      <div className="max-w-[728px] w-full h-[90px] bg-slate-100 border border-slate-300 rounded-lg flex items-center justify-center mx-auto">
        <div className="text-slate-500 text-sm font-medium">Ad Space - Security Review</div>
      </div>
    </div>
  );
};

// Export the safe iframe ad as default
export default AdsterraIframe;