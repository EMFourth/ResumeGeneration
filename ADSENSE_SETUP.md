# Google AdSense Setup Guide

This document explains how to properly configure Google AdSense to avoid policy violations.

## Current Issues Fixed

The following AdSense policy violations have been addressed:

### ✅ Issues Resolved
1. **Invalid Ad Slot ID**: Removed hardcoded placeholder `1234567890`
2. **Missing Ad Labels**: Added proper "Advertisement" label above ads
3. **Missing Privacy Policy**: Added privacy notice with opt-out link
4. **Poor Error Handling**: Added validation and error handling
5. **Improper Ad Spacing**: Improved spacing around ad containers

## Setup Instructions

### 1. Get Your AdSense Account Ready
- Apply for Google AdSense at https://www.google.com/adsense/
- Get your application approved
- Create ad units in your AdSense dashboard

### 2. Configure Environment Variables
1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Update the `.env` file with your actual AdSense slot ID:
   ```env
   ADSENSE_SLOT_ID=1234567890  # Replace with your real slot ID
   ```

### 3. Publisher ID
The publisher ID `ca-pub-7524647518323966` is already configured. Replace this with your actual publisher ID in:
- `components/GoogleAd.tsx`
- `index.html` (meta tag and script src)

## AdSense Policy Compliance

### Required Elements (✅ Implemented)
- **Ad Labeling**: Each ad is labeled with "Advertisement"
- **Privacy Notice**: Footer includes privacy policy information
- **Opt-out Link**: Users can access Google Ad Settings
- **Error Handling**: Ads fail gracefully if not configured
- **Proper Spacing**: Ads have adequate margins from clickable elements

### Content Policy Compliance
- Ensure your content complies with AdSense content policies
- Avoid placing ads near interactive elements
- Don't encourage clicks on ads
- Maintain good user experience

## Testing
1. The ad component will not display if `ADSENSE_SLOT_ID` is not properly configured
2. This prevents showing invalid ads that could cause policy violations
3. Once configured with a real slot ID, ads will display properly

## Troubleshooting
- If ads don't show: Check browser console for errors
- If policy violations persist: Review Google AdSense policy documentation
- For approval issues: Ensure sufficient content and traffic before applying