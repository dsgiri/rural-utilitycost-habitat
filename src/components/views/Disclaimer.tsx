import React from 'react';
import { ShieldAlert } from 'lucide-react';

export function Disclaimer() {
  return (
    <div className="max-w-3xl mx-auto py-8 animate-in fade-in duration-500 pb-12">
      <div className="bg-[#FECACA] border-4 border-stone-900 shadow-[8px_8px_0_0_rgba(28,25,23,1)] p-8 md:p-10 mb-10 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(-45deg, #000 0, #000 1px, transparent 1px, transparent 8px)' }}></div>
        <h1 className="text-4xl font-black text-stone-900 uppercase tracking-tight relative z-10">Disclaimer</h1>
      </div>
      
      <div className="bg-white border-4 border-stone-900 p-6 mb-8 flex gap-4 text-stone-900 shadow-[6px_6px_0_0_rgba(28,25,23,1)]">
        <ShieldAlert className="h-8 w-8 stroke-[2.5] shrink-0 text-red-600" />
        <div>
          <p className="font-extrabold uppercase tracking-tight text-lg mb-1">Notice to all users</p>
          <p className="font-medium leading-relaxed">
            This site relies heavily on community-contributed information. While we have a moderation queue, we cannot guarantee the complete scientific accuracy of all entries.
          </p>
        </div>
      </div>

      <div className="bg-white border-4 border-stone-900 shadow-[8px_8px_0_0_rgba(28,25,23,1)] p-8 md:p-10 space-y-8 text-stone-800 font-medium">
        <section>
          <h2 className="text-2xl font-extrabold text-stone-900 uppercase tracking-tight mb-3">General Information</h2>
          <p className="leading-relaxed">
            The Native Habitat tool and database (habitat.ruralutilitycost.com) are provided for educational, informational, and general planning purposes only. This resource is designed to help landowners and homesteaders explore local ecosystems and community-reported native species.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-extrabold text-stone-900 uppercase tracking-tight mb-3">Not Professional Advice</h2>
          <p className="leading-relaxed">
            The information contained on this website is not a substitute for professional ecological assessment, land management consultation, or legal advice. Environmental regulations, endangered species protections, and agricultural laws vary significantly by jurisdiction. Do not rely solely on this database for making decisions that could have legal, financial, or ecological consequences.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-extrabold text-stone-900 uppercase tracking-tight mb-3">Data Accuracy and Native Status</h2>
          <p className="leading-relaxed">
            While submissions are moderated for spam and obvious inaccuracies, the determination of a plant or animal's "native" status can be scientifically complex and context-dependent. The database reflects the best-effort observations of the community and the moderation team. We make no representations or warranties of any kind as to the absolute accuracy, completeness, or reliability of species identifications.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-extrabold text-stone-900 uppercase tracking-tight mb-3">Invasive Species Warning</h2>
          <p className="leading-relaxed">
            Always verify a plant or animal's status with local agricultural extensions, native plant societies, or conservation departments before introducing a new species to your land. Erroneously introducing an invasive species can harm local ecosystems and may violate state or federal laws.
          </p>
        </section>
      </div>
    </div>
  );
}
