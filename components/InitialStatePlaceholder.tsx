import React from 'react';
import { SparklesIcon } from './icons/SparklesIcon';

export const InitialStatePlaceholder: React.FC = () => (
  <div className="flex flex-col items-center justify-center h-full text-center text-slate-400 border-2 border-dashed border-slate-300 rounded-lg p-8 bg-slate-50">
      <SparklesIcon className="w-16 h-16 mb-4 text-slate-300" />
      <h3 className="text-xl font-semibold text-slate-500">Your new resume will appear here</h3>
      <p className="max-w-sm mt-2">Upload your resume and provide a job posting, then click "Create Perfect Resume" to see the magic happen.</p>
  </div>
);
