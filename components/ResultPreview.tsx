
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

  // Build a filename like JohnDoeResumeYYYYMMDD based on the H1 name in the resume
  const getDynamicFilenameBase = (html: string) => {
    const date = new Date();
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const yyyymmdd = `${yyyy}${mm}${dd}`;

    const tmp = document.createElement('div');
    tmp.innerHTML = html || '';
    let nameText = '';
    const h1 = tmp.querySelector('.right-column h1') || tmp.querySelector('h1');
    if (h1 && h1.textContent) {
      nameText = h1.textContent.trim();
    } else {
      const match = (html || '').match(/<h1[^>]*>(.*?)<\/h1>/i);
      if (match && match[1]) {
        const tempStrip = document.createElement('div');
        tempStrip.innerHTML = match[1];
        nameText = (tempStrip.textContent || '').trim();
      }
    }

    const sanitize = (s: string) => s.replace(/[^A-Za-z]/g, '');
    const titleCase = (s: string) => (s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : '');

    let first = '';
    let last = '';
    if (nameText) {
      const parts = nameText
        .split(/\s+/)
        .filter(Boolean)
        .map(p => sanitize(p))
        .filter(Boolean);
      if (parts.length >= 1) first = titleCase(parts[0]);
      if (parts.length >= 2) last = titleCase(parts[parts.length - 1]);
    }

    const namePart = `${first}${last}` || 'Resume';
    return `${namePart}Resume${yyyymmdd}`;
  };

  const handleDownloadPdf = async () => {
    setIsDownloadingPdf(true);
    try {
      if (!htmlContent || htmlContent.trim() === "") {
        alert("No resume content to export. Please generate your resume first.");
        return;
      }

      const filenameBase = getDynamicFilenameBase(htmlContent);

      // Create a temporary element for rendering
      const tempDiv = document.createElement('div');
      tempDiv.style.position = 'fixed';
      tempDiv.style.left = '-10000px';
      tempDiv.style.top = '0';
      tempDiv.style.width = '8.5in';
      tempDiv.style.height = 'auto';
      tempDiv.style.backgroundColor = 'white';
      tempDiv.style.fontFamily = "'Segoe UI', sans-serif";
      tempDiv.style.zIndex = '-1';

      // Create a style element with our CSS
      const styleElement = document.createElement('style');
      styleElement.textContent = resumeStyles;
      tempDiv.appendChild(styleElement);

      // Create the resume container
      const resumeDiv = document.createElement('div');
      resumeDiv.className = 'resume-container';
      resumeDiv.innerHTML = htmlContent;
      tempDiv.appendChild(resumeDiv);

      // Add to document for rendering
      document.body.appendChild(tempDiv);

      // Wait for fonts and styles to load
      await new Promise(resolve => setTimeout(resolve, 200));

      try {
        // Method 1: Try html2pdf with better settings
        if (typeof (window as any).html2pdf !== 'undefined') {
          const opt = {
            margin: [10, 10, 10, 10], // Small margins in pt
            filename: `${filenameBase}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: {
              scale: 2,
              useCORS: true,
              allowTaint: true,
              backgroundColor: '#ffffff',
              logging: false,
              letterRendering: true
            },
            jsPDF: { 
              unit: 'pt', 
              format: 'letter', 
              orientation: 'portrait',
              compress: false
            }
          };

          await (window as any).html2pdf().set(opt).from(resumeDiv).save();
        } else {
          throw new Error('html2pdf not available');
        }
      } catch (pdfError) {
        console.warn('html2pdf failed, trying HTML download:', pdfError);
        
        // Fallback: Create a standalone HTML file
        const htmlDownload = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Resume - ${filenameBase}</title>
  <style>
    ${resumeStyles}
    @page { 
      size: letter; 
      margin: 0.5in; 
    }
    @media print {
      body { margin: 0; }
      .resume-container { box-shadow: none; }
    }
  </style>
</head>
<body>
  <div class="resume-container">
    ${htmlContent}
  </div>
  <script>
    // Auto-print on load (user can cancel)
    window.onload = function() {
      setTimeout(function() {
        if (confirm('Would you like to print this resume to PDF now?')) {
          window.print();
        }
      }, 500);
    };
  </script>
</body>
</html>`;

        const blob = new Blob([htmlDownload], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${filenameBase}.html`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        alert('PDF generation failed. Downloaded HTML file - open it and use "Print > Save as PDF" in your browser.');
      }

      // Clean up
      document.body.removeChild(tempDiv);

    } catch (error: any) {
      console.error('PDF export failed:', error);
      alert('PDF download failed. Please try again.');
    } finally {
      setIsDownloadingPdf(false);
    }
  };

  const handleDownloadDocx = async () => {
    setIsDownloadingDocx(true);
    try {
      if (!htmlContent || htmlContent.trim() === "") {
        alert("No resume content to export. Please generate your resume first.");
        return;
      }

      const filenameBase = getDynamicFilenameBase(htmlContent);

      // Try html-to-docx library first
      if ((window as any).htmlToDocx && typeof (window as any).htmlToDocx.asBlob === 'function') {
        // Create clean HTML for docx conversion
        const cleanHtml = `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="UTF-8">
              <style>
                body { font-family: Calibri, Arial, sans-serif; margin: 1in; }
                h1 { font-size: 24pt; color: #2d3748; margin-bottom: 0.2in; }
                h2 { font-size: 14pt; color: #4a90e2; border-bottom: 2px solid #e2e8f0; padding-bottom: 0.1in; margin-top: 0.3in; margin-bottom: 0.2in; text-transform: uppercase; }
                h3 { font-size: 12pt; font-weight: bold; margin-top: 0.2in; margin-bottom: 0.05in; }
                p { font-size: 11pt; margin-bottom: 0.1in; line-height: 1.2; }
                ul { margin: 0; padding-left: 0.3in; }
                li { margin-bottom: 0.05in; font-size: 11pt; line-height: 1.2; }
                .contact-info { font-size: 10pt; margin-bottom: 0.3in; }
                .skills-section { font-size: 10pt; }
                .education-section { font-size: 10pt; }
              </style>
            </head>
            <body>
              ${htmlContent.replace(/<table[^>]*>.*?<\/table>/gs, (match) => {
                // Convert the complex table layout to a simpler structure for Word
                return match
                  .replace(/<table[^>]*>/g, '<div>')
                  .replace(/<\/table>/g, '</div>')
                  .replace(/<tbody[^>]*>/g, '')
                  .replace(/<\/tbody>/g, '')
                  .replace(/<tr[^>]*>/g, '')
                  .replace(/<\/tr>/g, '')
                  .replace(/<td class="left-column"[^>]*>/g, '<div class="skills-section">')
                  .replace(/<td class="right-column"[^>]*>/g, '<div class="main-content">')
                  .replace(/<\/td>/g, '</div>');
              })}
            </body>
          </html>
        `;
        
        await downloadAsDocx(cleanHtml, `${filenameBase}.docx`);
        return;
      }

      // Fallback: Create a simplified RTF document (Rich Text Format)
      // RTF is better supported by Word than raw HTML
      const rtfContent = convertHtmlToRtf(htmlContent);
      const rtfBlob = new Blob([rtfContent], { type: 'application/rtf' });
      const rtfUrl = URL.createObjectURL(rtfBlob);
      const a = document.createElement('a');
      a.href = rtfUrl;
      a.download = `${filenameBase}.rtf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(rtfUrl);
      alert('Downloaded as RTF format. You can open in Word and save as DOCX.');
    } catch (error: any) {
      console.error('DOCX export failed:', error);
      alert('Document download failed. Please try again.');
    } finally {
      setIsDownloadingDocx(false);
    }
  };

  // Helper function to convert HTML to RTF
  const convertHtmlToRtf = (html: string): string => {
    // Create a temporary element to parse the HTML
    const temp = document.createElement('div');
    temp.innerHTML = html;
    
    // Start RTF document
    let rtfContent = '{\\rtf1\\ansi\\deff0 {\\fonttbl {\\f0 Times New Roman;}{\\f1 Arial;}}\\f0\\fs24 ';
    
    // Recursive function to process all elements
    const processElement = (element: Element): void => {
      const tagName = element.tagName?.toLowerCase();
      const text = element.textContent?.trim() || '';
      
      if (!text && !['table', 'tbody', 'tr', 'td'].includes(tagName)) {
        return; // Skip empty elements except table elements
      }
      
      switch (tagName) {
        case 'h1':
          rtfContent += `\\b\\fs36 ${text}\\b0\\fs24\\par\\par `;
          break;
          
        case 'h2':
          rtfContent += `\\b\\fs28 ${text}\\b0\\fs24\\par `;
          break;
          
        case 'h3':
          rtfContent += `\\b\\fs24 ${text}\\b0\\fs24\\par `;
          break;
          
        case 'p':
          if (text) {
            rtfContent += `${text}\\par `;
          }
          break;
          
        case 'ul':
        case 'ol':
          // Process list items
          const items = element.querySelectorAll('li');
          items.forEach(item => {
            const itemText = item.textContent?.trim() || '';
            if (itemText) {
              rtfContent += `\\bullet ${itemText}\\par `;
            }
          });
          break;
          
        case 'li':
          // Handled by ul/ol case above
          break;
          
        case 'strong':
        case 'b':
          rtfContent += `\\b${text}\\b0 `;
          break;
          
        case 'em':
        case 'i':
          rtfContent += `\\i${text}\\i0 `;
          break;
          
        case 'table':
        case 'tbody':
          // Process table contents recursively
          Array.from(element.children).forEach(child => processElement(child));
          break;
          
        case 'tr':
          // Process table row
          Array.from(element.children).forEach(child => processElement(child));
          rtfContent += '\\par ';
          break;
          
        case 'td':
          // Process table cell contents
          if (element.children.length > 0) {
            Array.from(element.children).forEach(child => processElement(child));
          } else if (text) {
            rtfContent += `${text} `;
          }
          break;
          
        default:
          // For other elements, process children recursively
          if (element.children.length > 0) {
            Array.from(element.children).forEach(child => processElement(child));
          } else if (text && !['script', 'style'].includes(tagName)) {
            rtfContent += `${text} `;
          }
          break;
      }
    };
    
    // Process all elements in the HTML
    Array.from(temp.children).forEach(child => processElement(child));
    
    // Close RTF document
    rtfContent += '}';
    return rtfContent;
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
