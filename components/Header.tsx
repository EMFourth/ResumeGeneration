
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm border-b border-slate-200">
      <div className="container mx-auto px-4 md:px-8 py-4 text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold text-indigo-600">
          Resume Gen
        </h1>
        <p className="mt-2 text-md text-slate-500">
          We rewrite your resume to make you the ideal candidate for any position.
        </p>
      </div>
    </header>
  );
};
