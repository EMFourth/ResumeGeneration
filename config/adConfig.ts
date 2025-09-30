// Ad Network Configuration
// Replace these placeholder values with your actual ad network keys

export const AD_CONFIG = {
  // Google AdSense
  GOOGLE_ADSENSE: {
    PUBLISHER_ID: 'ca-pub-7524647518323966',
    // Add individual ad unit IDs here when you create them
    AD_UNITS: {
      BANNER_TOP: '1234567890', // Replace with actual ad unit ID
      SIDEBAR: '1234567891',     // Replace with actual ad unit ID
      CONTENT: '1234567892'      // Replace with actual ad unit ID
    }
  },

  // Ezoic Configuration
  EZOIC: {
    PUBLISHER_ID: '19390',
    DOMAIN: 'resume-gen.app',
    ADS_TXT_URL: 'https://srv.adstxtmanager.com/19390/resume-gen.app'
  },

  // Adsterra Configuration
  ADSTERRA: {
    // Replace these with your actual Adsterra keys when you get them
    KEYS: {
      BANNER_728x90: 'YOUR_ADSTERRA_BANNER_KEY_HERE',
      SQUARE_300x250: 'YOUR_ADSTERRA_SQUARE_KEY_HERE',
      SKYSCRAPER_160x600: 'YOUR_ADSTERRA_SKYSCRAPER_KEY_HERE',
      NATIVE: 'YOUR_ADSTERRA_NATIVE_KEY_HERE',
      POPUP: 'YOUR_ADSTERRA_POPUP_KEY_HERE'
    },
    
    // Verification key (you'll get this from Adsterra dashboard)
    VERIFICATION_KEY: 'YOUR_ADSTERRA_VERIFICATION_KEY_HERE'
  }
};

// Environment check - use different keys for development/production if needed
export const getAdConfig = () => {
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  if (isDevelopment) {
    // In development, you might want to use test keys or disable ads
    return {
      ...AD_CONFIG,
      ADSTERRA: {
        ...AD_CONFIG.ADSTERRA,
        KEYS: {
          ...AD_CONFIG.ADSTERRA.KEYS,
          // Could use test keys in development
        }
      }
    };
  }
  
  return AD_CONFIG;
};