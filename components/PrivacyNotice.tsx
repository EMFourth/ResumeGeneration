import React from 'react';

export const PrivacyNotice: React.FC = () => {
  return (
    <div className="text-xs text-slate-500 mt-4 p-3 bg-slate-50 rounded-md">
      <p className="mb-2">
        <strong>Privacy Notice:</strong> This site uses cookies and may collect personal information to personalize content and ads, provide social media features, and analyze traffic.
      </p>
      <p>
        We use Google AdSense which may use cookies to serve ads based on your prior visits to this website or other websites. You can opt out of personalized advertising by visiting{' '}
        <a 
          href="https://www.google.com/settings/ads" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          Google Ad Settings
        </a>.
      </p>
    </div>
  );
};