import React from 'react';

interface JobDescriptionInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const JobDescriptionInput: React.FC<JobDescriptionInputProps> = ({ value, onChange }) => {
  return (
    <div>
      <label htmlFor="job-description-input" className="block text-sm font-medium text-slate-600 mb-1">
        Job Posting
      </label>
      <textarea
        id="job-description-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Paste the entire job posting from the company's website here..."
        className="w-full h-48 p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow duration-200"
      />
    </div>
  );
};
