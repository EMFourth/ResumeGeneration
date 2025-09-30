<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Resume Gen - AI-Powered Resume Builder

An intelligent resume tailoring application that uses Google's Gemini AI to rewrite your resume to perfectly match any job posting.

View your app in AI Studio: https://ai.studio/apps/drive/1Qof2Iul3CK3UQFsc-cpVpl1ftYb0zVDF

## Features

- 📄 Upload resumes in PDF, DOCX, or TXT format
- 🤖 AI-powered resume tailoring using Google Gemini
- 📝 Automatic job posting analysis and keyword matching
- 📋 Professional two-column resume template
- 📄 Export as PDF or Word document
- ✉️ Generate matching cover letters

## Run Locally

Prerequisites: Node.js 18+ and npm

1) Clone and install

```bash
git clone https://github.com/EMFourth/ResumeGeneration.git
cd ResumeGeneration
npm install
```

2) Configure environment

```bash
cp .env.local.example .env.local
# Edit .env.local and set your API key
GEMINI_API_KEY=your_gemini_api_key_here
```

3) Start the dev server

```bash
npm run dev
```

Open http://localhost:3000

4) Optional: Test production build locally

```bash
npm run build
npm run preview
```

Open http://localhost:4173

5) VS Code one-click run (optional)

- Press F5 and choose “Launch Dev (Vite)” to auto-start the dev server and open a browser
- Or use Run and Debug → “Launch Preview (build)” after a build
- You can also run Tasks → “npm: dev”, “npm: build”, or “npm: preview”

## Deployment

### Netlify / Vercel

- Netlify: SPA redirects are configured via `netlify.toml`. Set environment variable `GEMINI_API_KEY` in your site settings. Push to deploy.
- Vercel: `vercel.json` is provided. Set `GEMINI_API_KEY` in Project → Settings → Environment Variables. Push to deploy.

### Environment Variables

- `GEMINI_API_KEY`: Your Google Gemini API key (required)
- The application also supports `API_KEY` for backward compatibility

### Build Optimization

The project includes several optimizations:
- **Code splitting**: Vendor and AI libraries are bundled separately
- **Environment variable handling**: Proper handling for production builds
- **Security headers**: Added via `vercel.json` for enhanced security
- **Asset caching**: Optimized caching for static assets

## Build for Production

```bash
npm run build
npm run preview
```

## Troubleshooting

- **"An API Key must be set" error:** Make sure your `GEMINI_API_KEY` is properly set in `.env.local` for local development or in your hosting provider’s environment variables for production.
- **Resume not generating:** The app will gracefully fall back to showing a sample resume if the API call fails, allowing you to test the interface even without a valid API key.
# Force deployment for ads.txt redirect
