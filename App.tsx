
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ResumeInput } from './components/ResumeInput';
import { JobDescriptionInput } from './components/JobDescriptionInput';
import { ResultPreview } from './components/ResultPreview';
import { CoverLetterModal } from './components/CoverLetterModal';
import { Spinner } from './components/Spinner';
import { SparklesIcon } from './components/icons/SparklesIcon';
import { generateTailoredResume, generateCoverLetter } from './services/geminiService';
import { InitialStatePlaceholder } from './components/InitialStatePlaceholder';
import { sampleResumeHtml } from './components/SampleResume';
import { AdsterraIframe, AdsterraLeaderboard } from './components/AdsterraAd';

const App: React.FC = () => {
  const [resumeText, setResumeText] = useState('');
  const [resumePageCount, setResumePageCount] = useState<number | null>(null);
  const [resumeFileName, setResumeFileName] = useState<string | null>(null);
  const [jobDescription, setJobDescription] = useState('');
  const [generatedResumeHtml, setGeneratedResumeHtml] = useState('');
  const [generationExplanation, setGenerationExplanation] = useState('');
  const [generatedCoverLetter, setGeneratedCoverLetter] = useState('');
  const [isLoadingResume, setIsLoadingResume] = useState(false);
  const [isLoadingCoverLetter, setIsLoadingCoverLetter] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generationFailed, setGenerationFailed] = useState(false);

  const handleResumeParsed = useCallback((data: { text: string; pageCount: number | null }) => {
    setResumeText(data.text);
    setResumePageCount(data.pageCount);
  }, []);

  const handleGenerateResume = useCallback(async () => {
    if (!resumeText.trim() || !jobDescription.trim()) {
      setError('Please upload your resume and provide the job posting.');
      return;
    }
    setError(null);
    setIsLoadingResume(true);
    setGeneratedResumeHtml('');
    setGenerationExplanation('');
    setGenerationFailed(false);

    try {
      const result = await generateTailoredResume(resumeText, jobDescription, resumePageCount);
      // A simple structural check to see if the AI returned something that looks like the resume template.
      if (!result || !result.resumeHtml || !result.resumeHtml.includes('<h1>') || !result.resumeHtml.includes('resume-layout')) {
        console.warn('AI returned an invalid or empty resume. Displaying a sample instead.');
        setGenerationFailed(true);
        setGeneratedResumeHtml(sampleResumeHtml);
        setGenerationExplanation('');
      } else {
        setGeneratedResumeHtml(result.resumeHtml);
        setGenerationExplanation(result.explanation);
      }
    } catch (e) {
      // If the API call itself fails, fall back to the sample.
      console.error("An error occurred during resume generation:", e);
      let errorMessage = 'An error occurred while generating the resume. Showing a sample instead.';
      
      // Provide more specific error messages
      if (e instanceof Error) {
        if (e.message.includes('API_KEY') || e.message.includes('GEMINI_API_KEY')) {
          errorMessage = 'API key not configured. Please set up your Gemini API key to generate personalized resumes. Showing a sample instead.';
        } else if (e.message.includes('quota') || e.message.includes('billing')) {
          errorMessage = 'API quota exceeded or billing issue. Please check your Google AI Studio account. Showing a sample instead.';
        } else if (e.message.includes('network') || e.message.includes('fetch')) {
          errorMessage = 'Network error. Please check your internet connection and try again. Showing a sample instead.';
        }
      }
      
      setError(errorMessage);
      setGenerationFailed(true);
      setGeneratedResumeHtml(sampleResumeHtml);
      setGenerationExplanation('');
    } finally {
      setIsLoadingResume(false);
    }
  }, [resumeText, jobDescription, resumePageCount]);

  const handleGenerateCoverLetter = useCallback(async () => {
    if (!generatedResumeHtml) {
      setError('Please generate a resume first.');
      return;
    }
    setError(null);
    setIsLoadingCoverLetter(true);
    setGeneratedCoverLetter('');
    try {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = generatedResumeHtml;
      const resumePlainText = tempDiv.textContent || '';
      
      const coverLetter = await generateCoverLetter(resumePlainText, jobDescription);
      setGeneratedCoverLetter(coverLetter);
      setIsModalOpen(true);
    } catch (e) {
      console.error(e);
      setError('An error occurred while generating the cover letter. Please try again.');
    } finally {
      setIsLoadingCoverLetter(false);
    }
  }, [generatedResumeHtml, jobDescription]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      <Header />
      
      {/* Top Banner Ad - After title, before content */}
      <div className="container mx-auto px-4 md:px-8 py-4">
        <div className="flex justify-center">
          <AdsterraIframe />
        </div>
      </div>
      
      <main className="container mx-auto p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-8">
            {/* Input Section */}
            <div className="flex flex-col gap-6 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <h2 className="text-2xl font-bold text-slate-700">Your Information</h2>
              <ResumeInput onParsed={handleResumeParsed} onFileChange={setResumeFileName} />
              <JobDescriptionInput value={jobDescription} onChange={setJobDescription} />
              {error && <p className="text-sm text-red-600 bg-red-100 p-3 rounded-md">{error}</p>}
              
              <button
                onClick={handleGenerateResume}
                disabled={isLoadingResume || !resumeText || !jobDescription}
                className="flex items-center justify-center gap-2 w-full bg-indigo-600 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:bg-indigo-700 disabled:bg-indigo-300 disabled:cursor-not-allowed transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {isLoadingResume ? (
                  <>
                    <Spinner />
                    <span>Tailoring Your Resume...</span>
                  </>
                ) : (
                  <>
                    <SparklesIcon className="w-5 h-5" />
                    <span>Create Perfect Resume</span>
                  </>
                )}
              </button>
            </div>

            {/* Output Section */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 min-h-[600px] flex flex-col">
              <h2 className="text-2xl font-bold text-slate-700 mb-4">AI-Powered Result</h2>
              {isLoadingResume ? (
                <div className="flex flex-col items-center justify-center flex-grow text-slate-500">
                  <Spinner />
                  <p className="mt-4 text-lg">Generating your tailored resume...</p>
                  <p className="text-sm">This may take a moment.</p>
                </div>
              ) : generatedResumeHtml ? (
                <ResultPreview
                  htmlContent={generatedResumeHtml}
                  explanation={generationExplanation}
                  onGenerateCoverLetter={handleGenerateCoverLetter}
                  isCoverLetterLoading={isLoadingCoverLetter}
                  generationFailed={generationFailed}
                />
              ) : (
                 <InitialStatePlaceholder />
              )}
            </div>
          </div>
          
          {/* Bottom Leaderboard Ad - Mobile responsive */}
          <div className="flex justify-center mb-8 px-4">
            <AdsterraLeaderboard />
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12">
        <div className="container mx-auto px-4 md:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-slate-600">
            <div className="mb-4 md:mb-0">
              <p>&copy; 2025 Resume Gen. All rights reserved.</p>
            </div>
            <div className="flex space-x-6">
              <a href="/privacy-policy.html" className="hover:text-indigo-600 transition-colors">
                Privacy Policy
              </a>
              <a href="mailto:contact@resume-gen.app" className="hover:text-indigo-600 transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
      
      <CoverLetterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        content={generatedCoverLetter}
      />
    </div>
  );
};

export default App;