import React, { useState } from 'react';
import { CheckCircle2, ShieldAlert, Leaf, MapPin, Users, AlertOctagon } from 'lucide-react';
import { Species, Category, NativeStatus, LocationPrecision } from '../../types';

interface SuggestSpeciesProps {
  onSubmit: (species: Omit<Species, 'id' | 'status' | 'createdAt'>) => Promise<boolean>;
  existingNames: string[];
}

export function SuggestSpecies({ onSubmit, existingNames }: SuggestSpeciesProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    commonName: '',
    scientificName: '',
    category: 'flower' as Category,
    location: '',
    locationPrecision: 'county' as LocationPrecision,
    latitude: '' as number | '',
    longitude: '' as number | '',
    nativeStatus: 'native' as NativeStatus,
    note: '',
    submitterName: ''
  });

  const categories: { value: Category, label: string }[] = [
    { value: 'flower', label: 'Flower / Flowering Plant' },
    { value: 'tree', label: 'Tree' },
    { value: 'shrub', label: 'Shrub' },
    { value: 'grass', label: 'Grass' },
    { value: 'bird', label: 'Bird' },
    { value: 'animal', label: 'Animal (Mammal, Reptile, Amphibian)' },
    { value: 'other', label: 'Other / Unsure' }
  ];

  const precisionOptions: { value: LocationPrecision, label: string }[] = [
    { value: 'exact', label: 'Exact Coordinates' },
    { value: 'city', label: 'City / Town' },
    { value: 'county', label: 'County' },
    { value: 'region', label: 'Ecoregion / Region' },
    { value: 'state', label: 'State' },
    { value: 'approximate', label: 'Approximate Area' }
  ];

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData(prev => ({
            ...prev,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            locationPrecision: 'exact'
          }));
        },
        (error) => {
          console.error("Error getting location: ", error);
          alert("Could not get your location. Please ensure location services are enabled or enter manually.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Basic Validation (Browser usually catches this due to `required`, but just in case)
    if (!formData.commonName.trim() || !formData.location.trim() || !formData.note.trim()) {
      setError('Hey! Please fill out all required fields before submitting.');
      return;
    }

    // Duplicate check
    const isDuplicate = existingNames.some(
      name => name.toLowerCase() === formData.commonName.trim().toLowerCase()
    );

    if (isDuplicate) {
      setError('Looks like someone already added this species or it is pending review! Thanks for checking though.');
      return;
    }

    setIsSubmitting(true);
    try {
      const submissionData = { ...formData };
      if (submissionData.latitude === '') delete submissionData.latitude;
      if (submissionData.longitude === '') delete submissionData.longitude;

      const success = await onSubmit(submissionData as any);
      if (success) {
        setIsSubmitted(true);
      } else {
        setError('Network error: Unable to communicate with the server.');
      }
    } catch {
      setError('An unexpected error occurred while submitting.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto mt-12 animate-in fade-in zoom-in-[0.98] duration-300">
        <div className="bg-white border-4 border-stone-900 p-10 text-center shadow-[8px_8px_0_0_rgba(28,25,23,1)] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-4 bg-[#A7F3D0] border-b-4 border-stone-900"></div>
          <div className="mx-auto flex items-center justify-center h-20 w-20 bg-[#A7F3D0] border-4 border-stone-900 mb-6 shadow-[6px_6px_0_0_rgba(28,25,23,1)] mt-4">
            <CheckCircle2 className="h-10 w-10 text-stone-900 stroke-[3]" />
          </div>
          <h2 className="text-4xl font-extrabold text-stone-900 uppercase tracking-tight mb-4">Thanks for building the map!</h2>
          <p className="text-lg text-stone-700 font-medium mb-10 leading-relaxed max-w-lg mx-auto">
            Your sighting has been submitted. Our volunteer team will review the details to ensure accuracy before it appears in the public guide. Your contribution helps us all!
          </p>
          <button
            onClick={() => {
              setIsSubmitted(false);
              setFormData({ ...formData, commonName: '', scientificName: '', note: '' });
            }}
            className="px-10 py-4 bg-[#FBEB9F] text-stone-900 border-4 border-stone-900 font-black uppercase tracking-wider text-base transition-all shadow-[6px_6px_0_0_rgba(28,25,23,1)] hover:translate-y-1 hover:shadow-none"
          >
            Add Another Sighting
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto animate-in fade-in duration-500 pb-12">
      <div className="mb-10 text-center md:text-left">
        <div className="inline-flex items-center gap-2 bg-[#FBEB9F] border-2 border-stone-900 px-3 py-1 font-bold text-sm tracking-widest uppercase mb-4 shadow-[2px_2px_0_0_rgba(28,25,23,1)]">
          <Users className="w-5 h-5 stroke-[2.5]" /> COMMUNITY MAP
        </div>
        <h2 className="text-4xl md:text-5xl font-black text-stone-900 tracking-tight uppercase mb-4">Add a Local Sighting</h2>
        <p className="text-xl text-stone-700 font-medium">
          Have you spotted a native species? Help the community build a richer map of what belongs in our ecosystem.
        </p>
      </div>

      <div className="bg-[#BFDBFE] border-4 border-stone-900 p-6 mb-10 flex gap-4 text-stone-900 shadow-[6px_6px_0_0_rgba(28,25,23,1)] relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
          <Leaf className="w-32 h-32 stroke-[1.5]" />
        </div>
        <ShieldAlert className="h-8 w-8 stroke-[2.5] shrink-0 relative z-10" />
        <div className="relative z-10">
          <h3 className="font-extrabold uppercase tracking-tight text-lg mb-1">Curated with care</h3>
          <p className="font-medium text-base leading-relaxed max-w-prose">
            This list is curated to ensure high-quality information. Please provide accurate observations and specific locations. Your entry will be reviewed before appearing on the public library.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white border-4 border-stone-900 shadow-[8px_8px_0_0_rgba(28,25,23,1)] overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-3 bg-[#A7F3D0] border-b-4 border-stone-900"></div>
        <div className="p-8 md:p-10 space-y-8 mt-4">
          
          {error && (
            <div className="p-4 bg-[#FECACA] border-4 border-stone-900 font-bold text-stone-900 flex items-start gap-3 shadow-[4px_4px_0_0_rgba(28,25,23,1)] animate-in shake">
              <AlertOctagon className="w-6 h-6 stroke-[2.5] text-red-600 shrink-0 mt-0.5" />
              <div>
                <p className="uppercase tracking-tight font-black text-red-900">Update Failed</p>
                <p>{error}</p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label htmlFor="commonName" className="block text-sm font-extrabold uppercase tracking-wider text-stone-900">
                Common Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="commonName"
                name="commonName"
                value={formData.commonName}
                onChange={handleChange}
                required
                placeholder="e.g. Eastern Bluebird"
                className="w-full px-4 py-3 border-2 border-stone-900 bg-white focus:outline-none focus:shadow-[4px_4px_0_0_rgba(28,25,23,1)] transition-shadow font-medium"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="scientificName" className="block text-sm font-extrabold uppercase tracking-wider text-stone-900">
                Scientific Name <span className="text-stone-400 font-semibold normal-case tracking-normal"> (optional)</span>
              </label>
              <input
                type="text"
                id="scientificName"
                name="scientificName"
                value={formData.scientificName}
                onChange={handleChange}
                placeholder="e.g. Sialia sialis"
                className="w-full px-4 py-3 border-2 border-stone-900 bg-white focus:outline-none focus:shadow-[4px_4px_0_0_rgba(28,25,23,1)] transition-shadow font-medium italic placeholder:not-italic"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label htmlFor="category" className="block text-sm font-extrabold uppercase tracking-wider text-stone-900">
                Category <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-stone-900 bg-white focus:outline-none focus:shadow-[4px_4px_0_0_rgba(28,25,23,1)] transition-shadow font-bold appearance-none cursor-pointer"
                >
                  {categories.map(c => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-stone-900">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="nativeStatus" className="block text-sm font-extrabold uppercase tracking-wider text-stone-900">
                Native Confidence <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  id="nativeStatus"
                  name="nativeStatus"
                  value={formData.nativeStatus}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-stone-900 bg-[#FBEB9F] focus:outline-none focus:shadow-[4px_4px_0_0_rgba(28,25,23,1)] transition-shadow font-bold appearance-none cursor-pointer"
                >
                  <option value="native">Confirmed Native</option>
                  <option value="likely-native">Likely Native (Need verification)</option>
                  <option value="unsure">Unsure (Please help verify)</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-stone-900">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6 border-4 border-stone-900 p-6 bg-[#FDFBF7] relative mt-2 mb-2">
            <div className="absolute -top-3.5 left-4 bg-stone-900 text-white px-3 py-1 text-xs font-black uppercase tracking-widest border-2 border-stone-900 shadow-[2px_2px_0_0_rgba(167,243,208,1)]">
              Where did you see it?
            </div>
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-4">
               <p className="text-[14px] font-bold text-stone-700 uppercase tracking-wide max-w-[280px] leading-snug">
                 Drop a pin or enter coordinates manually to help enrich the map.
               </p>
              <button 
                type="button" 
                onClick={handleGetLocation}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#A7F3D0] border-2 border-stone-900 font-black uppercase tracking-wider text-sm transition-all shadow-[4px_4px_0_0_rgba(28,25,23,1)] hover:translate-y-1 hover:shadow-[0_0_0_0_rgba(28,25,23,1)]"
              >
                <MapPin className="w-5 h-5 stroke-[2.5]" />
                Grab Current Location
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-2 pt-2 border-t-4 border-stone-900 mt-6 pt-6">
              <div className="space-y-2">
                <label htmlFor="location" className="block text-sm font-extrabold uppercase tracking-wider text-stone-900">
                  Location Area / Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Travis County, TX"
                  className="w-full px-4 py-3 border-2 border-stone-900 bg-white focus:outline-none focus:shadow-[4px_4px_0_0_rgba(28,25,23,1)] transition-shadow font-medium"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="locationPrecision" className="block text-sm font-extrabold uppercase tracking-wider text-stone-900">
                  Precision Level
                </label>
                <div className="relative">
                  <select
                    id="locationPrecision"
                    name="locationPrecision"
                    value={formData.locationPrecision}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-stone-900 bg-white focus:outline-none focus:shadow-[4px_4px_0_0_rgba(28,25,23,1)] transition-shadow font-bold appearance-none cursor-pointer"
                  >
                    {precisionOptions.map(o => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-stone-900">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="latitude" className="block text-xs font-extrabold uppercase tracking-wider text-stone-500">
                  Latitude <span className="text-stone-400 font-semibold normal-case tracking-normal"> (optional)</span>
                </label>
                <input
                  type="number"
                  step="any"
                  id="latitude"
                  name="latitude"
                  value={formData.latitude}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border-2 border-stone-400 bg-white focus:outline-none focus:border-stone-900 focus:shadow-[2px_2px_0_0_rgba(28,25,23,1)] transition-all font-mono text-sm"
                  placeholder="e.g. 30.2672"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="longitude" className="block text-xs font-extrabold uppercase tracking-wider text-stone-500">
                  Longitude <span className="text-stone-400 font-semibold normal-case tracking-normal"> (optional)</span>
                </label>
                <input
                  type="number"
                  step="any"
                  id="longitude"
                  name="longitude"
                  value={formData.longitude}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border-2 border-stone-400 bg-white focus:outline-none focus:border-stone-900 focus:shadow-[2px_2px_0_0_rgba(28,25,23,1)] transition-all font-mono text-sm"
                  placeholder="e.g. -97.7431"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="note" className="block text-sm font-extrabold uppercase tracking-wider text-stone-900">
              Observation Details <span className="text-red-500">*</span>
            </label>
            <textarea
              id="note"
              name="note"
              rows={4}
              value={formData.note}
              onChange={handleChange}
              required
              placeholder="Why is this important? What does it feed? How does it look during this season?"
              className="w-full px-4 py-3 border-2 border-stone-900 bg-white focus:outline-none focus:shadow-[4px_4px_0_0_rgba(28,25,23,1)] transition-shadow font-medium resize-y min-h-[120px]"
            ></textarea>
            <p className="text-sm font-bold text-stone-500 mt-2">Help others learn by providing context about this sighting.</p>
          </div>

          <div className="space-y-3 pt-6">
            <label htmlFor="submitterName" className="block text-sm font-extrabold uppercase tracking-wider text-stone-900">
              Your Name / Handle <span className="text-stone-400 font-semibold normal-case tracking-normal"> (optional)</span>
            </label>
            <input
              type="text"
              id="submitterName"
              name="submitterName"
              value={formData.submitterName}
              onChange={handleChange}
              placeholder="How would you like to be credited?"
              className="w-full px-4 py-3 border-2 border-stone-900 bg-stone-100 focus:bg-white focus:outline-none focus:shadow-[4px_4px_0_0_rgba(28,25,23,1)] transition-shadow font-medium max-w-md"
            />
          </div>

        </div>
        
        <div className="p-8 bg-[#A7F3D0] border-t-4 border-stone-900 flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-10 py-4 font-black uppercase tracking-wider border-4 border-stone-900 text-lg transition-all focus:outline-none ${isSubmitting ? 'bg-stone-300 text-stone-500 cursor-not-allowed shadow-[6px_6px_0_0_rgba(28,25,23,0.5)]' : 'bg-white text-stone-900 shadow-[6px_6px_0_0_rgba(28,25,23,1)] hover:translate-y-1 hover:shadow-[0px_0px_0_0_rgba(28,25,23,1)]'}`}
          >
            {isSubmitting ? 'Sending Sighting...' : 'Submit to the Map'}
          </button>
        </div>
      </form>
    </div>
  );
}
