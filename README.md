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

**Prerequisites:** Node.js 16+ and npm

1. **Clone the repository:**
   ```bash
   git clone https://github.com/EMFourth/ResumeGeneration.git
   cd ResumeGeneration
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up your API key:**
   - Copy `.env.local.example` to `.env.local`
   - Get your Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey)
   - Add your API key to `.env.local`:
     ```
     GEMINI_API_KEY=your_gemini_api_key_here
     ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Navigate to `http://localhost:3000`

## Deployment

### Vercel Deployment (Recommended)

This project is optimized for Vercel deployment with the included `vercel.json` configuration.

1. **Connect your GitHub repository to Vercel**
2. **Set up environment variables in Vercel:**
   - Go to your Vercel project dashboard
   - Navigate to Settings → Environment Variables
   - Add `GEMINI_API_KEY` with your API key value
3. **Deploy automatically** - Vercel will build and deploy on every push to main

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

- **"An API Key must be set" error:** Make sure your `GEMINI_API_KEY` is properly set in `.env.local` for local development or in Vercel environment variables for production.
- **Resume not generating:** The app will gracefully fall back to showing a sample resume if the API call fails, allowing you to test the interface even without a valid API key.
