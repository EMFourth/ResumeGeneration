# Production Deployment Checklist for www.resume-gen.app

## Pre-Deployment Setup
- [x] **Google AdSense Integration**: AdSense code with correct publisher ID (`ca-pub-7524647518323966`) is in `index.html`
- [x] **Build System**: Project builds successfully with `vite build` 
- [x] **Environment Variables**: `GEMINI_API_KEY` configured via Vercel environment variables
- [x] **SEO & Meta Tags**: Enhanced meta tags for better discoverability
- [x] **Error Handling**: Production-ready error messages and error boundary implemented
- [x] **Custom Favicon**: Replaced default Vite favicon with custom resume-themed icon

## Deployment Configuration
- [x] **Vercel Config**: `vercel.json` properly configured with security headers and caching
- [x] **Domain Setup**: Domain configured for `www.resume-gen.app` 
- [x] **HTTPS**: SSL/TLS certificate will be automatically handled by Vercel
- [x] **CDN Scripts**: All external scripts (TailwindCSS, Marked, Mammoth, etc.) properly loaded

## Post-Deployment Verification
- [ ] **Functionality Test**: Test all core features on live domain:
  - [ ] Resume file upload (PDF, DOCX, TXT)
  - [ ] AI resume generation with job posting
  - [ ] PDF export functionality
  - [ ] Word export functionality  
  - [ ] Cover letter generation
- [ ] **Google AdSense**: Verify ads are displaying correctly
- [ ] **Performance**: Check page load speeds and optimization
- [ ] **Error Monitoring**: Monitor for any production errors

## Environment Variables Required in Vercel
```
GEMINI_API_KEY=your_actual_gemini_api_key_here
```

## DNS Configuration
```
CNAME: www.resume-gen.app → cname.vercel-dns.com
```

## AdSense Configuration
- Publisher ID: `ca-pub-7524647518323966`
- Site URL: `https://www.resume-gen.app`
- Ad units configured in Google AdSense console

## Security Headers (via vercel.json)
- X-Content-Type-Options: nosniff
- X-Frame-Options: DENY  
- X-XSS-Protection: 1; mode=block
- Referrer-Policy: strict-origin-when-cross-origin

## Performance Optimizations
- Code splitting for vendor and AI libraries
- Asset caching with 1-year max-age
- Minification enabled for production builds
- Source maps disabled for production builds