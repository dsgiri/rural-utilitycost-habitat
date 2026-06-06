import React from 'react';

export function TermsOfService() {
  return (
    <div className="max-w-3xl mx-auto py-8 animate-in fade-in duration-500 pb-12">
      <div className="bg-[#FBEB9F] border-4 border-stone-900 shadow-[8px_8px_0_0_rgba(28,25,23,1)] p-8 md:p-10 mb-10 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 1px, transparent 1px, transparent 8px)' }}></div>
        <h1 className="text-4xl font-black text-stone-900 uppercase tracking-tight relative z-10">Terms of Service</h1>
      </div>
      
      <div className="bg-white border-4 border-stone-900 shadow-[8px_8px_0_0_rgba(28,25,23,1)] p-8 md:p-10 space-y-8 text-stone-800 font-medium">
        <p className="font-bold text-stone-500 uppercase tracking-widest text-sm">Last updated: June 2026</p>

        <section>
          <h2 className="text-2xl font-extrabold text-stone-900 uppercase tracking-tight mb-3">1. Acceptance of Terms</h2>
          <p className="leading-relaxed">
            By accessing and using the Native Habitat application (a service of Rural Utility Cost), you accept and agree to be bound by the terms and provisions of this agreement.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-extrabold text-stone-900 uppercase tracking-tight mb-3">2. User Contributions</h2>
          <p className="leading-relaxed">
            When you submit suggestions, locations, names, notes, or any other content to our platform ("Submissions"):
          </p>
          <ul className="list-disc pl-5 mt-4 space-y-2 marker:text-stone-900">
            <li>You grant us a non-exclusive, royalty-free, perpetual, and worldwide license to use, display, reproduce, and edit your Submissions.</li>
            <li>You acknowledge that all Submissions are subject to moderation. We reserve the right to approve, reject, edit, or remove any Submission at our sole discretion.</li>
            <li>You agree not to submit malicious, false, or purposefully misleading information.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-extrabold text-stone-900 uppercase tracking-tight mb-3">3. Not Professional Advice</h2>
          <p className="leading-relaxed">
            The information provided on this platform is for educational and informational purposes only. It is not intended to be a substitute for professional land management, ecological, or legal advice.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-extrabold text-stone-900 uppercase tracking-tight mb-3">4. Disclaimers and Limitations of Liability</h2>
          <p className="leading-relaxed">
            The platform is provided on an "as-is" and "as available" basis. We make no warranties regarding the accuracy, completeness, or reliability of the user-submitted data. We shall not be liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use our services.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-extrabold text-stone-900 uppercase tracking-tight mb-3">5. Changes to Terms</h2>
          <p className="leading-relaxed">
            We reserve the right to modify these terms at any time. Your continued use of the platform following the posting of changes will mean that you accept and agree to the changes.
          </p>
        </section>
      </div>
    </div>
  );
}
