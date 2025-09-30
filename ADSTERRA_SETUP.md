# Adsterra Setup Guide for Resume Gen

## 🚀 Quick Setup Steps

### 1. **Sign Up for Adsterra**
- Go to [Adsterra.com](https://adsterra.com)
- Create a publisher account
- Submit your site `www.resume-gen.app` for approval

### 2. **Get Your Ad Keys**
Once approved, create ad zones in your Adsterra dashboard:
- **Banner 728x90** (Top banner)
- **Square 300x250** (Sidebar/content area)
- **Native ads** (Blends with content)
- **Pop-under** (Optional, higher revenue but intrusive)

### 3. **Update Configuration**
Edit `/config/adConfig.ts` and replace the placeholder keys:

```typescript
ADSTERRA: {
  KEYS: {
    BANNER_728x90: 'your_actual_banner_key',
    SQUARE_300x250: 'your_actual_square_key',
    NATIVE: 'your_actual_native_key',
    // ... etc
  },
  VERIFICATION_KEY: 'your_verification_key'
}
```

### 4. **Update HTML Head Section**
In `index.html`, replace:
```html
<!-- Replace YOUR_ADSTERRA_KEY_HERE with actual verification key -->
<script type="text/javascript">
    atOptions = {
        'key' : 'your_actual_verification_key',
        // ...
    };
</script>
```

### 5. **Ad Placement Strategy**
Current placements:
- ✅ **Google AdSense**: Primary ad network
- ✅ **Ezoic**: Automatic optimization  
- ✅ **Adsterra**: Additional revenue (Square 300x250 after Google Ad)

## 📊 **Revenue Optimization Tips**

### **Ad Network Priority:**
1. **Ezoic** - Primary (handles optimization automatically)
2. **Google AdSense** - Backup/additional inventory
3. **Adsterra** - Fill remaining inventory, different geographic focus

### **Best Performing Ad Types for Your Site:**
- **Native ads** - Blend well with content
- **Banner 300x250** - Good performance, not too intrusive
- **Pop-under** - High revenue but use sparingly

### **Placement Recommendations:**
- **Top banner** - After header, before main content
- **Sidebar** - In the form area where users spend time
- **Between sections** - After form, before results
- **Footer** - Less intrusive, good for mobile

## 🔧 **Technical Implementation**

### **Components Created:**
- `AdsterraAd.tsx` - Main ad component
- `AdsterraSquare.tsx` - 300x250 ad variant
- `AdsterraBanner.tsx` - 728x90 ad variant
- `config/adConfig.ts` - Centralized ad configuration

### **Integration Features:**
- ✅ **Lazy loading** - Ads load when needed
- ✅ **Error handling** - Graceful fallback if ads fail
- ✅ **Responsive design** - Adapts to mobile/desktop
- ✅ **Multiple networks** - Works alongside existing ads

## 📈 **Expected Revenue Impact**
- **Increased fill rate** - More ad inventory filled
- **Geographic diversity** - Adsterra strong in different regions than Google
- **Higher CPMs** - Competition between networks
- **Fallback revenue** - When other networks don't fill

## ⚠️ **Important Notes**
- **Don't overdo it** - Too many ads hurt user experience
- **Monitor performance** - Track revenue vs. user engagement
- **A/B test placements** - Find optimal positions
- **Comply with policies** - Follow all ad network guidelines

## 🔄 **Next Steps After Approval**
1. Replace all placeholder keys with real ones
2. Test ads on staging/Netlify URL first
3. Monitor revenue in all dashboards
4. Optimize based on performance data