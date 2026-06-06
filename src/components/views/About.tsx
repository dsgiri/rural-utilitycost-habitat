import React from 'react';
import { Leaf, MapPin, HandHeart, ShieldCheck } from 'lucide-react';

export function About() {
  return (
    <div className="max-w-4xl mx-auto py-8 lg:py-16 animate-in fade-in duration-500 space-y-16">
      
      <div className="text-center relative">
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 -z-10 w-48 h-48 bg-[#FBEB9F] rounded-full opacity-50 blur-3xl"></div>
        <div className="inline-flex items-center gap-2 bg-[#A7F3D0] border-2 border-stone-900 px-4 py-1.5 font-bold text-sm tracking-widest uppercase mb-6 shadow-[2px_2px_0_0_rgba(28,25,23,1)]">
          The Project
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-stone-900 uppercase tracking-tight mb-6">About the Map</h1>
        <p className="text-xl md:text-2xl text-stone-700 font-medium max-w-2xl mx-auto px-4 leading-relaxed">
          A free and open source habitat project built to help us all discover and manage local ecosystems.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
        <div className="space-y-6">
          <h2 className="text-2xl font-extrabold text-stone-900 uppercase tracking-tight border-b-4 border-stone-900 pb-3 inline-block">Why we exist</h2>
          <p className="text-lg text-stone-800 font-medium leading-relaxed">
            The Native Habitat project is part of a broader suite of open source rural utility calculators and stewardship tools. It was created to give rural landowners, gardeners, and homesteaders a reliable tool to discover which plants, trees, and wildlife truly belong on their land.
          </p>
          <p className="text-lg text-stone-800 font-medium leading-relaxed">
            By keeping this resource free and open source, we encourage a community-driven habitat initiative where shared local knowledge powers better stewardship. Native species require less water, support vital local food webs, and are more resilient to regional climate events.
          </p>
        </div>
        
        <div className="bg-[#BFDBFE] border-4 border-stone-900 shadow-[6px_6px_0_0_rgba(28,25,23,1)] p-6 sm:p-8 md:p-10 relative">
          {/* Subtle line background */}
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 1px, transparent 1px, transparent 8px)' }}></div>
          <div className="relative z-10">
            <h3 className="text-2xl font-extrabold text-stone-900 uppercase tracking-tight mb-8">What it means</h3>
            <ul className="space-y-6 text-stone-800 font-medium">
              <li className="flex gap-4 items-start">
                <div class="bg-white p-2 border-2 border-stone-900 shadow-[2px_2px_0_0_rgba(28,25,23,1)] shrink-0">
                  <Leaf className="w-5 h-5 stroke-[2.5]" />
                </div>
                <div>
                  <strong className="block text-stone-900 text-lg mb-1">Ecosystem Support</strong>
                  <span className="text-stone-700">Native plants host local insects, which in turn feed local bird populations.</span>
                </div>
              </li>
              <li className="flex gap-4 items-start">
                <div class="bg-white p-2 border-2 border-stone-900 shadow-[2px_2px_0_0_rgba(28,25,23,1)] shrink-0">
                  <MapPin className="w-5 h-5 stroke-[2.5]" />
                </div>
                <div>
                  <strong className="block text-stone-900 text-lg mb-1">Drought Resilience</strong>
                  <span className="text-stone-700">Species adapted to your specific region typically survive harsh weather.</span>
                </div>
              </li>
              <li className="flex gap-4 items-start">
                <div class="bg-white p-2 border-2 border-stone-900 shadow-[2px_2px_0_0_rgba(28,25,23,1)] shrink-0">
                  <HandHeart className="w-5 h-5 stroke-[2.5]" />
                </div>
                <div>
                  <strong className="block text-stone-900 text-lg mb-1">Land Stewardship</strong>
                  <span className="text-stone-700">Keeping land healthy ensures it remains productive and beautiful.</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-white border-4 border-stone-900 p-6 sm:p-8 md:p-12 text-center shadow-[6px_6px_0_0_rgba(28,25,23,1)] relative overflow-hidden">
        <div className="mx-auto w-16 h-16 bg-[#FBEB9F] border-2 border-stone-900 flex items-center justify-center mb-6 shadow-[2px_2px_0_0_rgba(28,25,23,1)]">
          <ShieldCheck className="w-8 h-8 text-stone-900 stroke-[2.5]" />
        </div>
        <h3 className="text-2xl md:text-3xl font-extrabold text-stone-900 uppercase tracking-tight mb-4">A Curated Community Resource</h3>
        <p className="text-lg text-stone-700 font-medium max-w-2xl mx-auto leading-relaxed">
          While this tool relies on sightings and tips from locals like you, every submission is reviewed before becoming public. This helps us filter out invasive species posing as natives and keeps the database practical, factual, and trustworthy.
        </p>
      </div>

    </div>
  );
}
