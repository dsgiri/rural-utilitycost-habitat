import React from 'react';
import { Check, X, Clock, HelpCircle, AlertTriangle } from 'lucide-react';
import { Species } from '../../types';

interface ModerationQueueProps {
  speciesList: Species[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

export function ModerationQueue({ speciesList, onApprove, onReject }: ModerationQueueProps) {
  const pendingSpecies = speciesList.filter(s => s.status === 'pending');
  
  // Sort oldest first for queue
  pendingSpecies.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

  if (pendingSpecies.length === 0) {
    return (
      <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500 pb-12">
        <h2 className="text-4xl font-black text-stone-900 uppercase tracking-tight">Queue</h2>
        <div className="bg-white border-4 border-stone-900 p-16 shadow-[8px_8px_0_0_rgba(28,25,23,1)] flex flex-col items-center">
          <div className="h-16 w-16 bg-[#A7F3D0] border-4 border-stone-900 flex items-center justify-center mb-6 shadow-[2px_2px_0_0_rgba(28,25,23,1)]">
            <Check className="h-8 w-8 text-stone-900 stroke-[2.5]" />
          </div>
          <h3 className="text-2xl font-extrabold text-stone-900 uppercase tracking-tight mb-2">All Caught Up!</h3>
          <p className="text-stone-600 font-medium">There are no pending submissions awaiting review right now.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b-4 border-stone-900 pb-4">
        <div>
          <h2 className="text-4xl font-black text-stone-900 uppercase tracking-tight">Admin Queue</h2>
          <p className="text-stone-600 mt-2 font-medium">Review community submissions before they go live.</p>
        </div>
        <div className="text-sm font-extrabold uppercase tracking-widest text-stone-900 bg-[#FBEB9F] border-2 border-stone-900 px-4 py-2 shadow-[2px_2px_0_0_rgba(28,25,23,1)] mt-4 md:mt-0">
          {pendingSpecies.length} Pending
        </div>
      </div>

      <div className="space-y-8 mt-8">
        {pendingSpecies.map(species => (
          <div key={species.id} className="bg-white border-4 border-stone-900 shadow-[8px_8px_0_0_rgba(28,25,23,1)] overflow-hidden flex flex-col md:flex-row relative">
            <div className="p-6 md:p-8 flex-1">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-2xl font-extrabold text-stone-900 uppercase tracking-tight">{species.commonName}</h3>
                    {species.nativeStatus !== 'native' && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 border-2 border-stone-900 text-[10px] font-extrabold uppercase tracking-widest bg-[#FECACA] text-stone-900 shadow-[2px_2px_0_0_rgba(28,25,23,1)]">
                        {species.nativeStatus === 'unsure' ? <HelpCircle className="w-3.5 h-3.5 stroke-[2.5]" /> : <AlertTriangle className="w-3.5 h-3.5 stroke-[2.5]" />}
                        {species.nativeStatus.replace('-', ' ')}
                      </span>
                    )}
                  </div>
                  {species.scientificName && (
                    <p className="text-sm font-medium italic text-stone-600">{species.scientificName}</p>
                  )}
                </div>
                
                <span className="inline-flex items-center px-3 py-1 border-2 border-stone-900 bg-[#BFDBFE] text-xs font-bold uppercase tracking-widest text-stone-900 shrink-0">
                  {species.category}
                </span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <span className="block text-stone-500 text-xs uppercase tracking-widest font-extrabold mb-1.5">Where</span>
                  <div className="flex flex-col font-medium text-stone-800">
                    <span>{species.location}</span>
                    {(species.locationPrecision || species.latitude) && (
                      <span className="text-stone-500 text-[11px] uppercase tracking-wider mt-1">
                        {[
                          species.locationPrecision && `Prec: ${species.locationPrecision}`,
                          species.latitude && species.longitude && `${species.latitude.toFixed(3)}, ${species.longitude.toFixed(3)}`
                        ].filter(Boolean).join(' | ')}
                      </span>
                    )}
                  </div>
                </div>
                <div>
                  <span className="block text-stone-500 text-xs uppercase tracking-widest font-extrabold mb-1.5">Who</span>
                  <span className="text-stone-800 font-medium">{species.submitterName || 'Community Member'}</span>
                </div>
              </div>

              <div>
                <span className="block text-stone-500 text-xs uppercase tracking-widest font-extrabold mb-2">Their Note</span>
                <p className="text-stone-800 text-base font-medium bg-[#FDFBF7] p-4 border-l-4 border-amber-200">
                  "{species.note}"
                </p>
              </div>
            </div>

            <div className="bg-stone-100 border-t-4 md:border-t-0 md:border-l-4 border-stone-900 p-5 sm:p-6 flex flex-col sm:flex-row md:flex-col justify-center gap-4 w-full md:w-56 shrink-0 relative">
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 1px, transparent 1px, transparent 8px)' }}></div>
              <button 
                onClick={() => onApprove(species.id)}
                className="w-full sm:w-1/2 md:w-full flex items-center justify-center gap-2 bg-[#A7F3D0] border-2 border-stone-900 text-stone-900 px-4 py-3 sm:py-3.5 md:py-3 font-extrabold uppercase tracking-wider text-sm shadow-[4px_4px_0_0_rgba(28,25,23,1)] hover:translate-y-1 hover:shadow-none transition-all relative z-10 group"
                title="Approve and publish to public library"
              >
                <Check className="h-5 w-5 stroke-[2.5]" />
                Approve
              </button>
              
              <button 
                onClick={() => onReject(species.id)}
                className="w-full sm:w-1/2 md:w-full flex items-center justify-center gap-2 bg-white border-2 border-stone-900 text-stone-900 px-4 py-3 sm:py-3.5 md:py-3 font-extrabold uppercase tracking-wider text-sm shadow-[4px_4px_0_0_rgba(28,25,23,1)] hover:bg-[#FECACA] hover:translate-y-1 hover:shadow-none transition-all relative z-10 group"
                title="Reject submission and archive"
              >
                <X className="h-5 w-5 stroke-[2.5] group-hover:text-red-900" />
                Reject
              </button>
              
              <div className="flex items-center justify-center gap-1.5 text-[11px] font-bold text-stone-500 uppercase tracking-widest mt-2 sm:mt-4 relative z-10 md:border-t-2 border-stone-300 md:pt-4">
                <Clock className="w-4 h-4 stroke-[2.5]" />
                <span>{new Date(species.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
}
