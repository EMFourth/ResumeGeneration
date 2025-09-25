import React, { useEffect } from 'react';

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export const GoogleAd: React.FC = () => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error('AdSense error:', e);
    }
  }, []);

  return (
    <div className="google-ad-container my-4 text-center bg-slate-100 rounded-lg p-2 min-h-[100px] flex items-center justify-center">
      <ins
        className="adsbygoogle"
        style={{ display: 'block', width: '100%', height: '100px' }}
        data-ad-client="pub-7524647518323966" // Replace with your own client ID
        data-ad-slot="1234567890" // Replace with your own slot ID
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
};
