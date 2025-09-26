// Ezoic Ad Configuration
export interface EzoicAdConfig {
  placeholder: string;
  size: 'small' | 'medium' | 'large';
  position: string;
  description: string;
}

export const ezoicAdPlacements: EzoicAdConfig[] = [
  {
    placeholder: 'resume-builder-sidebar',
    size: 'medium',
    position: 'sidebar',
    description: 'Ad placement in the input section sidebar'
  },
  {
    placeholder: 'resume-result-top',
    size: 'small',
    position: 'result-top',
    description: 'Ad placement above the generated resume'
  },
  {
    placeholder: 'resume-result-bottom',
    size: 'medium',
    position: 'result-bottom',
    description: 'Ad placement below the generated resume'
  },
  {
    placeholder: 'header-banner',
    size: 'small',
    position: 'header',
    description: 'Header banner ad placement'
  }
];

export const getAdPlacement = (position: string): EzoicAdConfig | undefined => {
  return ezoicAdPlacements.find(ad => ad.position === position);
};

// Ezoic initialization helper
export const initializeEzoicAds = (): void => {
  if (typeof window !== 'undefined') {
    // This function would contain actual Ezoic initialization code
    // provided by Ezoic when setting up the site
    console.log('Initializing Ezoic ads...');
    
    // Example: Load Ezoic scripts dynamically if needed
    // The actual implementation would depend on Ezoic's integration requirements
  }
};