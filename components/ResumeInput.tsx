
import React, { useState, useCallback, useRef } from 'react';
import { parseResumeFile } from '../utils/fileUtils';
import { Spinner } from './Spinner';

interface ResumeInputProps {
  onParsed: (data: { text: string; pageCount: number | null }) => void;
  onFileChange: (fileName: string | null) => void;
}

export const ResumeInput: React.FC<ResumeInputProps> = ({ onParsed, onFileChange }) => {
  const [fileName, setFileName] = useState<string | null>(null);
  const [isParsing, setIsParsing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setError(null);
    setIsParsing(true);
    setFileName(file.name);
    onFileChange(file.name);
    onParsed({ text: '', pageCount: null }); // Clear previous data

    try {
      const result = await parseResumeFile(file);
      onParsed(result);
    } catch (e: any) {
      setError(e.message || 'Failed to parse file.');
      setFileName(null);
      onFileChange(null);
    } finally {
      setIsParsing(false);
      // Reset file input value to allow re-uploading the same file
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  }, [onParsed, onFileChange]);
  
  const handleClearFile = () => {
    setFileName(null);
    setError(null);
    onFileChange(null);
    onParsed({ text: '', pageCount: null });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  const triggerFileInput = () => {
      fileInputRef.current?.click();
  };

  return (
    <div>
      <label className="block text-sm font-medium text-slate-600 mb-1">
        Your Resume
      </label>
      <div className="mt-1">
        <input
          type="file"
          id="resume-file-input"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept=".pdf,.docx,.txt"
        />
        {!fileName && (
           <div 
             onClick={triggerFileInput}
             className="flex justify-center items-center w-full h-48 px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-lg cursor-pointer hover:border-indigo-500 bg-slate-50 hover:bg-slate-100 transition-colors"
            >
            <div className="space-y-1 text-center">
              <svg className="mx-auto h-12 w-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <div className="flex text-sm text-slate-600 justify-center">
                <p className="font-medium text-indigo-600 hover:text-indigo-500">Upload a file</p>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-slate-500">PDF, DOCX, TXT supported</p>
            </div>
          </div>
        )}
        
        {isParsing && (
          <div className="w-full h-48 flex flex-col justify-center items-center text-center p-4 border rounded-lg bg-slate-50">
             <Spinner className="w-8 h-8 text-indigo-600"/>
             <p className="mt-2 text-sm font-medium text-slate-600">Parsing {fileName}...</p>
          </div>
        )}

        {!isParsing && fileName && (
            <div className="w-full h-48 flex flex-col justify-center items-center text-center p-4 border rounded-lg bg-green-50 border-green-200">
                <p className="text-sm font-medium text-green-800">Successfully loaded:</p>
                <p className="font-semibold text-green-900 mt-2">{fileName}</p>
                <button 
                    onClick={handleClearFile} 
                    className="mt-4 bg-slate-200 text-slate-700 text-xs font-semibold py-1 px-3 rounded-full hover:bg-slate-300 transition-colors">
                    Remove file
                </button>
            </div>
        )}

        {error && (
            <div className="w-full mt-2 p-3 bg-red-100 text-red-700 text-sm rounded-lg">
                <strong>Error:</strong> {error}
            </div>
        )}
      </div>
    </div>
  );
};
