# Ezoic Ads.txt Setup Guide

This guide explains how to set up ads.txt for Ezoic integration to maximize ad revenue.

## What is Ads.txt?

Ads.txt is a simple text file that tells advertisers which companies are authorized to sell ads on your website. It prevents unauthorized companies from selling fake ad space on your domain.

## Setup Methods

### Method 1: Automatic Updates (Recommended)

This method automatically fetches the latest ads.txt content from Ezoic during the build process.

1. Set your domain as an environment variable:
   ```bash
   export DOMAIN=yourdomain.com
   ```

2. Run the update script:
   ```bash
   npm run update-ads-txt
   ```

3. The script will fetch the latest ads.txt content from Ezoic and save it to `public/ads.txt`.

### Method 2: Server Redirects

For deployment platforms that support redirects, you can redirect `/ads.txt` to Ezoic's ads.txt manager.

#### Netlify
The `public/_redirects` file is already configured. Just replace `[YOUR_DOMAIN]` with your actual domain:

```
/ads.txt https://srv.adstxtmanager.com/19390/yourdomain.com 301!
```

#### Vercel
The `vercel.json` file is already configured. Just replace `[YOUR_DOMAIN]` with your actual domain:

```json
{
  "rewrites": [
    {
      "source": "/ads.txt",
      "destination": "https://srv.adstxtmanager.com/19390/yourdomain.com"
    }
  ]
}
```

#### Other Platforms

For other platforms, configure a 301 redirect from `/ads.txt` to `https://srv.adstxtmanager.com/19390/yourdomain.com`.

### Method 3: Manual Setup

If you prefer to manage the ads.txt content manually:

1. Visit `https://srv.adstxtmanager.com/19390/yourdomain.com` in your browser
2. Copy the content
3. Replace the content in `public/ads.txt` with the copied content
4. Rebuild and deploy your site

## Configuration Steps

1. **Replace Domain Placeholder**: In all configuration files, replace `[YOUR_DOMAIN]` with your actual domain name (without https:// or www).

2. **Choose Your Method**: Select the method that best fits your deployment platform:
   - **Static hosting with build process**: Use Method 1 (Automatic Updates)
   - **Netlify/Vercel**: Use Method 2 (Server Redirects)
   - **Other platforms**: Use Method 3 (Manual Setup)

3. **Test Your Setup**: After deployment, visit `yourdomain.com/ads.txt` to verify it works correctly.

## Environment Variables

For the automatic update method, you can set the domain in several ways:

- Command line: `npm run update-ads-txt yourdomain.com`
- Environment variable: `DOMAIN=yourdomain.com npm run update-ads-txt`
- In your CI/CD pipeline: Set `DOMAIN` as an environment variable

## Build Process Integration

The build process is configured to automatically update the ads.txt file:

```bash
npm run build  # Automatically runs update-ads-txt first
```

If the ads.txt update fails (e.g., no domain configured), the build will continue with a warning.

## Troubleshooting

- **404 Error**: Make sure your domain is correctly registered with Ezoic
- **Empty File**: Check that your domain is spelled correctly and includes the TLD (.com, .org, etc.)
- **Redirect Not Working**: Verify your platform supports the redirect configuration format used

## Testing

After setup, test your ads.txt file:

1. Visit `yourdomain.com/ads.txt` in your browser
2. You should see a list of authorized ad sellers
3. Clear your website cache if the file doesn't appear immediately

## Maintenance

- **Automatic Updates**: If using Method 1, ads.txt will be updated on every build
- **Redirects**: If using Method 2, Ezoic manages updates automatically
- **Manual**: If using Method 3, you'll need to update the file manually when needed