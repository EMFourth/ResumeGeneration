
import React, { useState } from 'react';

interface CoverLetterModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: string;
}

export const CoverLetterModal: React.FC<CoverLetterModalProps> = ({ isOpen, onClose, content }) => {
  const [copyButtonText, setCopyButtonText] = useState('Copy to Clipboard');

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(content).then(() => {
      setCopyButtonText('Copied!');
      setTimeout(() => setCopyButtonText('Copy to Clipboard'), 2000);
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold text-slate-700">Your Generated Cover Letter</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">&times;</button>
        </div>
        <div className="p-6 overflow-y-auto whitespace-pre-wrap text-slate-600 bg-slate-50">
          {content}
        </div>
        <div className="p-4 bg-slate-100 border-t flex justify-end gap-3">
          <button onClick={onClose} className="bg-slate-200 text-slate-700 font-semibold py-2 px-4 rounded-lg hover:bg-slate-300 transition-colors">
            Close
          </button>
          <button onClick={handleCopy} className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors">
            {copyButtonText}
          </button>
        </div>
      </div>
    </div>
  );
};
