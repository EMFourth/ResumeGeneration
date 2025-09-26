# Testing Your Ads.txt Setup

This guide helps you test and verify that your ads.txt setup is working correctly.

## Quick Test Commands

### 1. Test Local Development
```bash
# Start the development server
npm run dev

# In another terminal, test the ads.txt file
curl http://localhost:3000/ads.txt
# or visit http://localhost:3000/ads.txt in your browser
```

### 2. Test Production Build
```bash
# Build the project
npm run build

# Preview the production build
npm run preview

# Test the ads.txt file
curl http://localhost:4173/ads.txt
# or visit http://localhost:4173/ads.txt in your browser
```

### 3. Test Ads.txt Update Script
```bash
# Test with your domain
npm run update-ads-txt yourdomain.com

# Or use environment variable
DOMAIN=yourdomain.com npm run update-ads-txt
```

## Expected Results

### Before Configuration
- The ads.txt file should contain placeholder content with instructions
- The file should be accessible at `/ads.txt` path
- Build process should show warning about domain not being configured

### After Domain Configuration
- The ads.txt file should contain actual Ezoic ads.txt content
- File should show your domain in the header comment
- Build process should succeed without warnings
- Content should match what's served from Ezoic's ads.txt manager

## Testing Different Deployment Scenarios

### Netlify
1. Deploy your site to Netlify
2. Visit `yourdomain.com/ads.txt`
3. Should redirect to Ezoic's ads.txt manager
4. Check browser network tab to verify 301 redirect

### Vercel
1. Deploy your site to Vercel
2. Visit `yourdomain.com/ads.txt`
3. Should show Ezoic ads.txt content (rewrite, not redirect)
4. Content should match Ezoic's ads.txt manager

### Static Hosting (GitHub Pages, etc.)
1. Deploy your site
2. Visit `yourdomain.com/ads.txt`
3. Should show the static ads.txt file content
4. Make sure to update the file using the update script before deployment

## Troubleshooting Common Issues

### Issue: 404 Not Found
**Possible Causes:**
- ads.txt file not in public directory
- Build not copying public files correctly
- Server not configured to serve static files

**Solutions:**
- Check that `public/ads.txt` exists
- Verify build output includes ads.txt in dist folder
- Check hosting platform's static file serving configuration

### Issue: Empty or Placeholder Content
**Possible Causes:**
- Domain not configured with Ezoic
- Network issues during build
- Script not running with correct domain

**Solutions:**
- Verify domain is registered with Ezoic
- Run update script manually with correct domain
- Check Ezoic dashboard for ads.txt status

### Issue: Redirect Not Working
**Possible Causes:**
- Incorrect redirect configuration
- Platform doesn't support redirect format
- Domain placeholder not replaced

**Solutions:**
- Check platform-specific redirect documentation
- Verify correct domain in redirect configuration
- Test redirect manually using curl or browser dev tools

## Validation Checklist

- [ ] ads.txt file is accessible at `/ads.txt` path
- [ ] File contains valid ads.txt format content
- [ ] Domain name is correctly configured (not placeholder)
- [ ] Build process runs without errors
- [ ] File is properly copied to dist folder during build
- [ ] Redirect configuration (if used) points to correct Ezoic URL
- [ ] Content matches what's expected from Ezoic ads.txt manager

## Manual Verification

1. **Access the file directly:**
   ```bash
   curl -I yourdomain.com/ads.txt
   ```
   Should return HTTP 200 OK or 301 Moved Permanently

2. **Check file content:**
   ```bash
   curl yourdomain.com/ads.txt
   ```
   Should show authorized ad sellers list

3. **Verify with Ezoic:**
   - Visit your Ezoic dashboard
   - Check ads.txt status under site settings
   - Verify your domain's ads.txt is recognized

4. **Test with ads.txt validators:**
   - Use online ads.txt validators
   - Check for any syntax errors or warnings
   - Verify all required entries are present

## Debugging Tips

1. **Check browser network tab:**
   - See actual HTTP response codes
   - Verify redirect behavior
   - Check response headers

2. **Compare with Ezoic source:**
   - Visit `https://srv.adstxtmanager.com/19390/yourdomain.com`
   - Compare content with your ads.txt
   - Ensure they match (if using static file approach)

3. **Test from different locations:**
   - CDN propagation may take time
   - Test from different geographic locations
   - Clear CDN cache if necessary