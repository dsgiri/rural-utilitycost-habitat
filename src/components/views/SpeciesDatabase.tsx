import React, { useState } from 'react';
import { Search, MapPin, Leaf, Users, ChevronRight, CheckCircle2, TreePine, Flower2, Sprout, Bird, PawPrint, HelpCircle, Layers, Download } from 'lucide-react';
import { Species, Category } from '../../types';

const CategoryIcon = ({ type, className = "w-4 h-4" }: { type: string, className?: string }) => {
  switch (type) {
    case 'tree': return <TreePine className={className} />;
    case 'flower': return <Flower2 className={className} />;
    case 'shrub': return <Leaf className={className} />;
    case 'grass': return <Sprout className={className} />;
    case 'bird': return <Bird className={className} />;
    case 'animal': return <PawPrint className={className} />;
    case 'other': return <HelpCircle className={className} />;
    case 'all': return <Layers className={className} />;
    default: return <HelpCircle className={className} />;
  }
};

interface SpeciesDatabaseProps {
  speciesList: Species[];
}

export function SpeciesDatabase({ speciesList }: SpeciesDatabaseProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');

  const approvedSpecies = speciesList.filter(s => s.status === 'approved');

  const filteredSpecies = approvedSpecies.filter(s => {
    const searchLower = searchTerm.trim().toLowerCase();
    const commonNameLower = s.commonName.toLowerCase();
    const scientificNameLower = s.scientificName ? s.scientificName.toLowerCase() : '';
    
    const matchesSearch = searchLower === '' || 
                          commonNameLower.includes(searchLower) || 
                          scientificNameLower.includes(searchLower);
                          
    const matchesCategory = selectedCategory === 'all' || s.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories: { value: Category | 'all', label: string }[] = [
    { value: 'all', label: 'Everything' },
    { value: 'tree', label: 'Trees' },
    { value: 'flower', label: 'Flowers' },
    { value: 'shrub', label: 'Shrubs' },
    { value: 'grass', label: 'Grasses' },
    { value: 'bird', label: 'Birds' },
    { value: 'animal', label: 'Animals' },
    { value: 'other', label: 'Other' }
  ];

  const handleExportCSV = () => {
    if (filteredSpecies.length === 0) return;

    const headers = ['Common Name', 'Scientific Name', 'Category', 'Location', 'Location Precision', 'Latitude', 'Longitude', 'Native Status', 'Note', 'Submitter Name', 'Status'];
    
    const csvContent = [
      headers.join(','),
      ...filteredSpecies.map(s => {
        return [
          `"${s.commonName.replace(/"/g, '""')}"`,
          `"${s.scientificName?.replace(/"/g, '""') || ''}"`,
          `"${s.category}"`,
          `"${s.location.replace(/"/g, '""')}"`,
          `"${s.locationPrecision || ''}"`,
          s.latitude ?? '',
          s.longitude ?? '',
          `"${s.nativeStatus}"`,
          `"${s.note.replace(/"/g, '""')}"`,
          `"${s.submitterName?.replace(/"/g, '""') || ''}"`,
          `"${s.status}"`
        ].join(',');
      })
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'native-habitat-species.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-500 pb-12">
      
      {/* Hero Section */}
      <div className="bg-[#A7F3D0] border-4 border-stone-900 shadow-[8px_8px_0_0_rgba(28,25,23,1)] p-8 md:p-14 relative overflow-hidden">
        {/* Simple comic-style dots overlay */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)', backgroundSize: '16px 16px' }}></div>
        
        <div className="relative z-10 max-w-3xl flex flex-col md:flex-row gap-6 md:gap-8 items-start md:items-center">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 bg-white border-2 border-stone-900 px-3 py-1 font-bold text-sm tracking-widest uppercase mb-5 md:mb-6 shadow-[2px_2px_0_0_rgba(28,25,23,1)]">
              <Users className="w-4 h-4 stroke-[2.5]" /> COMMUNITY-LED
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-stone-900 uppercase tracking-tighter leading-[1.1] mb-5 md:mb-6">
              Explore a free native habitat guide.
            </h1>
            <p className="text-base sm:text-lg md:text-xl font-medium text-stone-800 mb-6 md:mb-8 border-l-4 border-stone-900 pl-4">
              Our community-built species database helps you discover verified native plants and wildlife. Help grow this free and open source habitat project by adding what you see nearby.
            </p>
            <button 
              onClick={() => {
                const searchInput = document.getElementById('species-search');
                if (searchInput) {
                  searchInput.focus();
                  searchInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
              }}
              className="bg-stone-900 hover:bg-stone-800 text-white px-6 sm:px-8 py-3 sm:py-3.5 text-base sm:text-lg font-bold transition-all shadow-[4px_4px_0_0_rgba(255,255,255,1)] sm:shadow-[6px_6px_0_0_rgba(255,255,255,1)] border-2 border-stone-900 group w-full sm:w-auto"
            >
              <span className="flex items-center gap-2">
                Browse the Guide <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </div>
          <div className="hidden lg:flex w-48 h-48 bg-[#FBEB9F] border-4 border-stone-900 rounded-full items-center justify-center shadow-[4px_4px_0_0_rgba(28,25,23,1)] flex-shrink-0 relative overflow-hidden">
             <Leaf className="w-24 h-24 text-stone-900 stroke-[2]" />
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
          <div>
            <h2 className="text-3xl font-extrabold text-stone-900 tracking-tight uppercase">Community Field Guide</h2>
            <p className="text-stone-600 mt-2 font-medium">Curated list of community-contributed species data.</p>
          </div>
          
          <div className="relative w-full md:w-80">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-stone-900 stroke-[2.5]" />
            </div>
            <input
              id="species-search"
              aria-label="Search species by name"
              type="text"
              placeholder="Search by name..."
              className="w-full pl-12 pr-4 py-3 bg-white border-2 border-stone-900 shadow-[4px_4px_0_0_rgba(28,25,23,1)] focus:outline-none focus:translate-y-1 focus:shadow-[0px_0px_0_0_rgba(28,25,23,1)] transition-all font-medium placeholder:text-stone-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Filters and Actions */}
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 sm:gap-4 mb-8">
          <div className="flex flex-wrap gap-2 md:gap-3">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2.5 sm:py-2 font-bold uppercase tracking-wider text-[11px] sm:text-sm transition-all border-2 rounded-none grow sm:grow-0 ${
                  selectedCategory === cat.value
                    ? 'bg-[#FBEB9F] border-stone-900 text-stone-900 shadow-[3px_3px_0_0_rgba(28,25,23,1)]'
                    : 'bg-white border-stone-300 text-stone-600 hover:border-stone-900 hover:text-stone-900 hover:shadow-[3px_3px_0_0_rgba(28,25,23,1)]'
                }`}
              >
                <CategoryIcon type={cat.value} />
                {cat.label}
              </button>
            ))}
          </div>
          
          <button
            onClick={handleExportCSV}
            disabled={filteredSpecies.length === 0}
            className="flex items-center justify-center gap-2 px-5 py-3 sm:py-3 font-bold uppercase tracking-wider text-sm bg-stone-100 border-2 border-stone-900 text-stone-900 transition-all hover:bg-stone-200 hover:shadow-[3px_3px_0_0_rgba(28,25,23,1)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none w-full xl:w-auto xl:self-auto shrink-0 mt-2 xl:mt-0"
            title="Download CSV"
          >
            <Download className="w-4 h-4 stroke-[2.5]" />
            Export CSV
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredSpecies.length > 0 ? (
            filteredSpecies.map((species) => (
              <div key={species.id} className="bg-white border-4 border-stone-900 flex flex-col hover:-translate-y-1 transition-transform group relative">
                {/* Offset shadow container behind the card to avoid clipping on overflow */}
                <div className="absolute inset-0 bg-stone-900 -z-10 translate-x-2 translate-y-2"></div>
                
                <div className="p-5 sm:p-6 md:p-8 flex-1 bg-white relative z-10 border-b-4 border-stone-900">
                  <div className="flex flex-col sm:flex-row justify-between items-start mb-4 gap-3 sm:gap-4">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-extrabold text-stone-900 uppercase tracking-tight group-hover:text-amber-600 transition-colors leading-tight">{species.commonName}</h3>
                      {species.scientificName && (
                        <p className="text-xs sm:text-sm font-medium italic text-stone-600 mt-1">{species.scientificName}</p>
                      )}
                    </div>
                    <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 text-[11px] sm:text-xs font-bold uppercase tracking-widest bg-[#BFDBFE] border-2 border-stone-900 text-stone-900 shrink-0 mt-1 sm:mt-0">
                      <CategoryIcon type={species.category} className="w-3.5 h-3.5" />
                      {species.category}
                    </span>
                  </div>
                  
                  <div className="space-y-4 mt-6">
                    <div className="flex items-start gap-3 text-stone-800 font-medium">
                      <div className="bg-stone-100 p-1.5 border-2 border-stone-900 shrink-0">
                        <MapPin className="h-4 w-4 stroke-[2.5]" />
                      </div>
                      <div className="flex flex-col pt-0.5">
                        <span className="leading-snug">{species.location}</span>
                        {(species.locationPrecision || species.latitude) && (
                          <span className="text-xs text-stone-500 font-bold uppercase tracking-wider mt-1">
                            {[
                              species.locationPrecision && `Precision: ${species.locationPrecision}`,
                              species.latitude && species.longitude && `Coords: ${species.latitude.toFixed(3)}, ${species.longitude.toFixed(3)}`
                            ].filter(Boolean).join(' • ')}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 text-stone-800 font-medium">
                      <div className="bg-[#A7F3D0] p-1.5 border-2 border-stone-900 shrink-0">
                        <Leaf className="h-4 w-4 stroke-[2.5]" />
                      </div>
                      <span className="capitalize pt-0.5 leading-snug">{species.nativeStatus.replace('-', ' ')}</span>
                    </div>
                    
                    <div className="mt-6">
                      <span className="block text-xs font-extrabold uppercase tracking-widest text-stone-400 mb-2">Observation Notes</span>
                      <p className="text-base text-stone-800 leading-relaxed font-medium relative italic border-l-4 border-amber-200 pl-4 py-1">
                        "{species.note}"
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="px-6 py-4 bg-stone-100 text-sm font-bold text-stone-600 flex justify-between items-center relative z-10 flex-wrap gap-2">
                  <span className="flex items-center gap-2 text-stone-800 uppercase tracking-wider text-xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 stroke-[2.5]" />
                    Verified
                  </span>
                  <span className="text-xs">
                    {species.submitterName ? `By ${species.submitterName}` : 'By Community'}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center bg-white border-4 border-dashed border-stone-300 flex flex-col items-center justify-center">
              <div className="bg-stone-100 p-4 border-2 border-stone-300 rounded-full mb-4">
                <Search className="h-8 w-8 text-stone-400" />
              </div>
              <h3 className="text-2xl font-extrabold text-stone-900 uppercase tracking-tight">No species found</h3>
              <p className="text-stone-600 font-medium mt-2 max-w-md">Try adjusting your search or category filters to see more community verified entries.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
