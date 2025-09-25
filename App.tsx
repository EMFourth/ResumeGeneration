
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
import { GoogleAd } from './components/GoogleAd';

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
      setError('An error occurred while generating the resume. Showing a sample instead.');
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
      <main className="container mx-auto p-4 md:p-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="flex flex-col gap-6 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-700">Your Information</h2>
            <ResumeInput onParsed={handleResumeParsed} onFileChange={setResumeFileName} />
            <JobDescriptionInput value={jobDescription} onChange={setJobDescription} />
            {error && <p className="text-sm text-red-600 bg-red-100 p-3 rounded-md">{error}</p>}
            <GoogleAd />
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
      </main>
      <CoverLetterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        content={generatedCoverLetter}
      />
    </div>
  );
};

export default App;