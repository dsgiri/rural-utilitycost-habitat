import React from 'react';

export function PrivacyPolicy() {
  return (
    <div className="max-w-3xl mx-auto py-8 animate-in fade-in duration-500 pb-12">
      <div className="bg-[#BFDBFE] border-4 border-stone-900 shadow-[8px_8px_0_0_rgba(28,25,23,1)] p-8 md:p-10 mb-10 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 1px, transparent 1px, transparent 8px)' }}></div>
        <h1 className="text-4xl font-black text-stone-900 uppercase tracking-tight relative z-10">Privacy Policy</h1>
      </div>
      
      <div className="bg-white border-4 border-stone-900 shadow-[8px_8px_0_0_rgba(28,25,23,1)] p-8 md:p-10 space-y-8 text-stone-800 font-medium">
        <p className="font-bold text-stone-500 uppercase tracking-widest text-sm">Last updated: June 2026</p>

        <section>
          <h2 className="text-2xl font-extrabold text-stone-900 uppercase tracking-tight mb-3">1. Information We Collect</h2>
          <p className="leading-relaxed">
            We collect the information you voluntarily provide when using the Native Habitat platform, specifically when you use the "Suggest a Species" feature. This may include:
          </p>
          <ul className="list-disc pl-5 mt-4 space-y-2 marker:text-stone-900">
            <li>Names, categories, and observation notes of species.</li>
            <li>General location data (such as state, county, or ecological region) related to the species habitat.</li>
            <li>Your name or alias (optional), if provided for crediting your contribution.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-extrabold text-stone-900 uppercase tracking-tight mb-3">2. How We Use Your Information</h2>
          <p className="leading-relaxed">
            The information collected is used exclusively to:
          </p>
          <ul className="list-disc pl-5 mt-4 space-y-2 marker:text-stone-900">
            <li>Curate, moderate, and maintain our public species database.</li>
            <li>Display the submitted species and your chosen name/alias (if provided) on the public directory upon approval.</li>
            <li>Improve the quality and accuracy of the native habitat platform for all users.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-extrabold text-stone-900 uppercase tracking-tight mb-3">3. Data Sharing and Disclosure</h2>
          <p className="leading-relaxed">
            Approved submissions, including the general location and optional credit name, become part of the public species library. 
            We do not sell, rent, or trade your personal information to third parties. We may disclose data if required by law or to protect the rights and safety of our platform and its users.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-extrabold text-stone-900 uppercase tracking-tight mb-3">4. Data Security</h2>
          <p className="leading-relaxed">
            We implement reasonable security measures to protect the integrity of our database and the information you submit. However, no data transmission over the Internet or electronic storage is entirely secure.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-extrabold text-stone-900 uppercase tracking-tight mb-3">5. Your Choices</h2>
          <p className="leading-relaxed">
            You are not obligated to provide your name when submitting a species. You may submit anonymously. If you wish to request the removal of a submission you made, please contact our administrative team.
          </p>
        </section>
      </div>
    </div>
  );
}
