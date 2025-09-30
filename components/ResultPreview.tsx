
import React, { useState } from 'react';
import { downloadAsDocx } from '../utils/fileUtils';
import { PdfIcon } from './icons/PdfIcon';
import { WordIcon } from './icons/WordIcon';
import { DocumentIcon } from './icons/DocumentIcon';
import { Spinner } from './Spinner';
import { SparklesIcon } from './icons/SparklesIcon';

declare var html2pdf: any;

interface ResultPreviewProps {
  htmlContent: string;
  explanation: string;
  onGenerateCoverLetter: () => void;
  isCoverLetterLoading: boolean;
  generationFailed: boolean;
}

const resumeStyles = `
  body { 
    background-color: #ffffff;
    margin: 0;
    padding: 0;
    font-family: 'Segoe UI', Candara, 'Helvetica Neue', Helvetica, Arial, sans-serif;
    line-height: 1.4; 
    color: #4a5568;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  .resume-container {
    background-color: white;
    width: 8.5in;
    min-height: 11in;
    margin: 0 auto;
    padding: 0;
    box-sizing: border-box;
    border: 3px solid #4a90e2; /* Blue border */
  }
  .resume-layout {
    width: 100%;
    height: 100%;
    border-collapse: collapse;
    table-layout: fixed;
  }
  
  /* Left Column: Blue Sidebar */
  .left-column {
    width: 33%;
    vertical-align: top;
    background-color: #4a90e2; /* Blue background */
    color: white;
    padding: 0.6in 0.5in;
  }
  .left-column h2 {
    font-family: 'Segoe UI', sans-serif;
    font-size: 1rem;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    border-bottom: 1px solid rgba(255, 255, 255, 0.7);
    padding-bottom: 0.3rem;
    margin-top: 1.2rem;
    margin-bottom: 1rem;
  }
  .left-column h2:first-of-type {
    margin-top: 0;
  }
  .left-column h3 {
    font-size: 0.95rem;
    font-weight: bold;
    margin-top: 1rem;
    margin-bottom: 0.1rem;
    color: white;
  }
  .left-column p {
    font-size: 0.9rem;
    line-height: 1.5;
    margin-bottom: 0.5rem;
    color: #f0f0f0;
  }
  .left-column p strong {
    color: white;
  }

  /* Right Column: Main Content */
  .right-column {
    width: 67%;
    vertical-align: top;
    padding: 0.6in 0.7in;
  }
  .right-column h1 { /* Candidate Name */
    font-family: 'Garamond', 'Times New Roman', Times, serif;
    font-size: 2.8rem;
    font-weight: 600;
    color: #2d3748;
    margin: 0;
    padding: 0;
  }
  .right-column h1 + p { /* Contact Info */
    font-size: 0.9rem;
    color: #4a5568;
    margin: 0.25rem 0 2rem 0;
  }
  .right-column h2 { /* Section Titles */
    font-family: 'Segoe UI', sans-serif;
    font-size: 1rem;
    font-weight: bold;
    color: #4a90e2;
    border-bottom: 2px solid #e2e8f0;
    padding-bottom: 0.3rem;
    margin-top: 1.5rem;
    margin-bottom: 1rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }
  .right-column h2:first-of-type {
    margin-top: 0;
  }
  .right-column h3 { /* Job Titles */
    font-size: 1.1rem;
    font-weight: bold;
    color: #1e293b;
    margin-top: 1.2rem;
    margin-bottom: 0.1rem;
  }
  .right-column h3:first-of-type {
    margin-top: 0;
  }
  .right-column h3 + p, .right-column h3 + strong + p { /* Company Name / Dates */
    font-style: italic;
    font-size: 0.95rem;
    color: #64748b;
    margin-top: 0;
    margin-bottom: 0.6rem;
  }
  .right-column ul { 
    list-style-position: outside;
    list-style-type: disc;
    padding-left: 1rem;
    margin: 0;
  }
  .right-column li {
    margin-bottom: 0.5rem;
    padding-left: 0.25rem;
    line-height: 1.5;
  }
  .right-column p { 
    margin-top: 0;
    margin-bottom: 0.75rem; 
    line-height: 1.6;
  }
  a { 
    color: #4a90e2;
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
  }
  strong { 
    font-weight: bold;
  }
`;

export const ResultPreview: React.FC<ResultPreviewProps> = ({ htmlContent, explanation, onGenerateCoverLetter, isCoverLetterLoading, generationFailed }) => {
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);
  const [isDownloadingDocx, setIsDownloadingDocx] = useState(false);

  const fullHtmlForPreview = `<style>${resumeStyles}</style><div class="resume-container">${htmlContent}</div>`;

  const handleDownloadPdf = async () => {
    setIsDownloadingPdf(true);
    try {
      if (!htmlContent || htmlContent.trim() === "") {
        alert("No resume content to export. Please generate your resume first.");
        return;
      }
      
      console.log("Starting PDF generation...");
      console.log("HTML content length:", htmlContent.length);
      console.log("First 100 chars:", htmlContent.substring(0, 100));
      
      // Create a temporary container that matches the preview exactly
      const tempContainer = document.createElement('div');
      tempContainer.style.position = 'fixed';
      tempContainer.style.left = '-9999px';
      tempContainer.style.top = '0';
      tempContainer.style.width = '8.5in';
      tempContainer.style.height = 'auto';
      tempContainer.style.backgroundColor = 'white';
      tempContainer.style.fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      tempContainer.style.zIndex = '-1000';
      
      // Create style element for the temp container
      const styleElement = document.createElement('style');
      styleElement.textContent = resumeStyles;
      
      // Create the resume container
      const resumeContainer = document.createElement('div');
      resumeContainer.className = 'resume-container';
      resumeContainer.innerHTML = htmlContent;
      
      // Assemble the structure
      tempContainer.appendChild(styleElement);
      tempContainer.appendChild(resumeContainer);
      document.body.appendChild(tempContainer);
      
      // Force a reflow to ensure all styles are applied
      tempContainer.offsetHeight;
      
      // Wait for rendering
      await new Promise(resolve => setTimeout(resolve, 300));
      
      console.log("Container prepared, generating PDF...");
      console.log("Container HTML length:", tempContainer.innerHTML.length);
      
      const opt = {
        margin: [0.3, 0.3, 0.3, 0.3],
        filename: 'resume.pdf',
        image: { 
          type: 'jpeg', 
          quality: 0.95 
        },
        html2canvas: { 
          scale: 1.5,
          useCORS: true,
          allowTaint: true,
          backgroundColor: '#ffffff',
          logging: true,
          letterRendering: true
        },
        jsPDF: { 
          unit: 'in', 
          format: 'letter', 
          orientation: 'portrait'
        }
      };
      
      // Generate PDF
      await html2pdf().set(opt).from(resumeContainer).save();
      
      // Cleanup
      document.body.removeChild(tempContainer);
      
      console.log("PDF generated successfully!");
      
    } catch (error) {
      console.error("PDF generation failed:", error);
      console.error("Error details:", error.stack);
      alert(`PDF generation failed: ${error.message || 'Unknown error'}. Check console for details.`);
    } finally {
      setIsDownloadingPdf(false);
    }
  };

  const handleDownloadDocx = async () => {
    setIsDownloadingDocx(true);
    try {
      const fullHtml = `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>${resumeStyles}</style></head><body><div class="resume-container">${htmlContent}</div></body></html>`;
      await downloadAsDocx(fullHtml, 'resume.docx');
    } catch (error) {
        console.error("Failed to download DOCX:", error);
        alert("There was an error generating the Word document. Please try again.");
    } finally {
        setIsDownloadingDocx(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
       {explanation && !generationFailed && (
        <div className="mb-4 bg-indigo-50 border border-indigo-200 text-indigo-900 p-4 rounded-lg shadow-sm">
            <h3 className="font-bold text-md mb-2 flex items-center gap-2 text-indigo-700">
                <SparklesIcon className="w-5 h-5" />
                AI's Rationale for Changes
            </h3>
            <p className="text-sm leading-relaxed">{explanation}</p>
        </div>
      )}
      {generationFailed && (
        <div className="bg-amber-100 border-l-4 border-amber-500 text-amber-800 p-3 mb-4 rounded-md text-sm" role="alert">
          <p className="font-bold">Generation Unsuccessful</p>
          <p>We couldn't tailor your resume this time. Please try again. In the meantime, here is a sample of a successful result.</p>
        </div>
      )}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div className="flex gap-2">
          <button onClick={handleDownloadPdf} disabled={isDownloadingPdf} className="flex items-center gap-2 text-sm bg-slate-100 text-slate-700 font-semibold py-2 px-3 rounded-md hover:bg-slate-200 transition-colors disabled:bg-slate-50 disabled:text-slate-400 disabled:cursor-wait">
            {isDownloadingPdf ? <Spinner className="w-4 h-4 text-slate-500"/> : <PdfIcon className="w-4 h-4" />}
            PDF
          </button>
          <button onClick={handleDownloadDocx} disabled={isDownloadingDocx} className="flex items-center gap-2 text-sm bg-slate-100 text-slate-700 font-semibold py-2 px-3 rounded-md hover:bg-slate-200 transition-colors disabled:bg-slate-50 disabled:text-slate-400 disabled:cursor-wait">
            {isDownloadingDocx ? <Spinner className="w-4 h-4 text-slate-500"/> : <WordIcon className="w-4 h-4" />}
            Word
          </button>
        </div>
        <button
          onClick={onGenerateCoverLetter}
          disabled={isCoverLetterLoading || generationFailed}
          className="flex items-center gap-2 text-sm bg-indigo-100 text-indigo-700 font-semibold py-2 px-3 rounded-md hover:bg-indigo-200 transition-colors disabled:bg-indigo-50 disabled:text-indigo-300"
        >
          {isCoverLetterLoading ? (
            <Spinner className="w-4 h-4" />
          ) : (
            <DocumentIcon className="w-4 h-4" />
          )}
          <span>Generate Cover Letter</span>
        </button>
      </div>

      <div className="flex-grow bg-slate-100 rounded-lg p-2 border border-slate-200 overflow-auto">
        <iframe
          srcDoc={fullHtmlForPreview}
          title="Resume Preview"
          className="w-full h-full bg-white rounded-md shadow-inner border-none"
        />
      </div>
    </div>
  );
};
