import { useState, useEffect } from 'react';
import { Leaf, Menu, Library, PlusCircle, ShieldCheck, Lock, Info } from 'lucide-react';
import { SpeciesDatabase } from './components/views/SpeciesDatabase';
import { SuggestSpecies } from './components/views/SuggestSpecies';
import { ModerationQueue } from './components/views/ModerationQueue';
import { About } from './components/views/About';
import { TermsOfService } from './components/views/TermsOfService';
import { PrivacyPolicy } from './components/views/PrivacyPolicy';
import { Disclaimer } from './components/views/Disclaimer';
import { Species } from './types';

type ViewState = 'database' | 'suggest' | 'admin' | 'about' | 'terms' | 'privacy' | 'disclaimer';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewState>('database');
  const [species, setSpecies] = useState<Species[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Admin auth state
  const [adminSecret, setAdminSecret] = useState<string>('');
  const [isPromptingAdminSecret, setIsPromptingAdminSecret] = useState(false);
  const [pendingAdminAction, setPendingAdminAction] = useState<{type: 'approve'|'reject', id: string} | null>(null);

  // Load initial data
  useEffect(() => {
    fetch('/api/species')
      .then(res => res.json())
      .then(data => setSpecies(data))
      .catch(err => console.error('Failed to load species:', err));
  }, []);

  // Update document title based on view
  useEffect(() => {
    const baseTitle = 'Native Habitat | Rural Utility Cost';
    const titles: Record<ViewState, string> = {
      database: `Species Database - ${baseTitle}`,
      suggest: `Suggest a Species - ${baseTitle}`,
      admin: `Moderation - ${baseTitle}`,
      about: `About - ${baseTitle}`,
      terms: `Terms of Service - ${baseTitle}`,
      privacy: `Privacy Policy - ${baseTitle}`,
      disclaimer: `Disclaimer - ${baseTitle}`,
    };
    document.title = titles[currentView];
  }, [currentView]);

  const handleSuggest = async (newSpeciesData: Omit<Species, 'id' | 'status' | 'createdAt'>): Promise<boolean> => {
    try {
      const res = await fetch('/api/species', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSpeciesData)
      });
      if (res.ok) {
        const added = await res.json();
        setSpecies([...species, added]);
        return true;
      }
      return false;
    } catch (e) {
      console.error('Network error submitting species.', e);
      return false;
    }
  };

  const executeAdminAction = async (type: 'approve'|'reject', id: string, secret: string) => {
    try {
      const res = await fetch(`/api/species/${id}/${type}`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${secret}` }
      });
      
      if (res.ok) {
        const updated = await res.json();
        setSpecies(species.map(s => s.id === id ? updated : s));
        setIsPromptingAdminSecret(false);
        setPendingAdminAction(null);
      } else if (res.status === 403) {
        alert('Unauthorized. Invalid admin password.');
      } else {
        alert('Failed to perform moderation action.');
      }
    } catch (e) {
      alert('Network error during moderation.');
    }
  };

  const requireAdminAction = (type: 'approve'|'reject', id: string) => {
    if (adminSecret) {
      executeAdminAction(type, id, adminSecret);
    } else {
      setPendingAdminAction({ type, id });
      setIsPromptingAdminSecret(true);
    }
  };

  const handleApprove = (id: string) => requireAdminAction('approve', id);
  const handleReject = (id: string) => requireAdminAction('reject', id);

  const existingNames = species
    .filter(s => s.status !== 'rejected')
    .map(s => s.commonName);

  const pendingCount = species.filter(s => s.status === 'pending').length;

  const Navigation = () => (
    <>
      <button
        onClick={() => { setCurrentView('database'); setIsMobileMenuOpen(false); }}
        className={`flex items-center gap-2 px-4 py-2 rounded-none border-2 text-sm font-bold transition-all ${
          currentView === 'database' 
            ? 'bg-[#FBEB9F] border-stone-900 shadow-[2px_2px_0_0_rgba(28,25,23,1)] text-stone-900' 
            : 'border-transparent text-stone-700 hover:border-stone-900 hover:shadow-[2px_2px_0_0_rgba(28,25,23,1)] hover:text-stone-900'
        }`}
      >
        <Library className="h-4 w-4 stroke-[2.5]" />
        Field Guide
      </button>
      <button
        onClick={() => { setCurrentView('suggest'); setIsMobileMenuOpen(false); }}
        className={`flex items-center gap-2 px-4 py-2 rounded-none border-2 text-sm font-bold transition-all ${
          currentView === 'suggest' 
            ? 'bg-[#A7F3D0] border-stone-900 shadow-[2px_2px_0_0_rgba(28,25,23,1)] text-stone-900' 
            : 'border-transparent text-stone-700 hover:border-stone-900 hover:shadow-[2px_2px_0_0_rgba(28,25,23,1)] hover:text-stone-900'
        }`}
      >
        <PlusCircle className="h-4 w-4 stroke-[2.5]" />
        Contribute
      </button>
      <button
        onClick={() => { setCurrentView('about'); setIsMobileMenuOpen(false); }}
        className={`flex items-center gap-2 px-4 py-2 rounded-none border-2 text-sm font-bold transition-all ${
          currentView === 'about' 
            ? 'bg-[#BFDBFE] border-stone-900 shadow-[2px_2px_0_0_rgba(28,25,23,1)] text-stone-900' 
            : 'border-transparent text-stone-700 hover:border-stone-900 hover:shadow-[2px_2px_0_0_rgba(28,25,23,1)] hover:text-stone-900'
        }`}
      >
        <Info className="h-4 w-4 stroke-[2.5]" />
        About
      </button>
      <button
        onClick={() => { setCurrentView('admin'); setIsMobileMenuOpen(false); }}
        className={`flex items-center gap-2 px-4 py-2 rounded-none border-2 text-sm font-bold transition-all ${
          currentView === 'admin' 
            ? 'bg-stone-200 border-stone-900 shadow-[2px_2px_0_0_rgba(28,25,23,1)] text-stone-900' 
            : 'border-transparent text-stone-700 hover:border-stone-900 hover:shadow-[2px_2px_0_0_rgba(28,25,23,1)] hover:text-stone-900'
        }`}
      >
        <ShieldCheck className="h-4 w-4 stroke-[2.5]" />
        Admin
        {pendingCount > 0 && (
          <span className="ml-1 bg-stone-900 text-white text-[10px] px-1.5 py-0.5 rounded-none font-bold">
            {pendingCount}
          </span>
        )}
      </button>
    </>
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] text-stone-900 font-sans relative selection:bg-[#A7F3D0]">
      <div 
        className="fixed inset-0 pointer-events-none opacity-5 mix-blend-multiply" 
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23000000\' fill-opacity=\'1\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'3\' cy=\'3\' r=\'1\'/%3E%3Ccircle cx=\'13\' cy=\'13\' r=\'1\'/%3E%3C/g%3E%3C/svg%3E")', backgroundSize: '16px 16px' }}
      ></div>
      <header className="bg-white border-b-4 border-stone-900 sticky top-0 z-30 w-full">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            {/* Logo */}
            <div className="flex items-center gap-2 sm:gap-3 cursor-pointer group" onClick={() => setCurrentView('database')}>
              <div className="bg-[#A7F3D0] p-1.5 sm:p-2 border-2 border-stone-900 shadow-[2px_2px_0_0_rgba(28,25,23,1)] group-hover:shadow-[4px_4px_0_0_rgba(28,25,23,1)] group-hover:-translate-y-0.5 transition-all shrink-0">
                <Leaf className="h-5 w-5 sm:h-6 sm:w-6 text-stone-900 stroke-[2.5]" />
              </div>
              <span className="font-extrabold text-[1.1rem] sm:text-xl tracking-tight text-stone-900 uppercase leading-none mt-1 sm:mt-0">
                Native Habitat
              </span>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex space-x-3">
              <Navigation />
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center shrink-0">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-stone-900 border-2 border-transparent hover:border-stone-900 hover:shadow-[2px_2px_0_0_rgba(28,25,23,1)] p-2 transition-all rounded-none bg-white"
              >
                <Menu className="h-6 w-6 stroke-[2.5]" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t-4 border-stone-900 bg-white px-4 pt-4 pb-6 space-y-3 z-40 relative">
            <div className="flex flex-col space-y-3">
              <Navigation />
            </div>
          </div>
        )}
      </header>

      <main className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 md:py-12 relative z-10">
        {currentView === 'database' && <SpeciesDatabase speciesList={species} />}
        {currentView === 'suggest' && <SuggestSpecies onSubmit={handleSuggest} existingNames={existingNames} />}
        {currentView === 'admin' && <ModerationQueue speciesList={species} onApprove={handleApprove} onReject={handleReject} />}
        {currentView === 'about' && <About />}
        {currentView === 'terms' && <TermsOfService />}
        {currentView === 'privacy' && <PrivacyPolicy />}
        {currentView === 'disclaimer' && <Disclaimer />}
      </main>

      <footer className="bg-stone-900 border-t-4 border-stone-900 py-16 mt-auto relative z-10 text-stone-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="bg-[#A7F3D0] p-1.5 border-2 border-stone-900">
                <Leaf className="h-6 w-6 text-stone-900 stroke-[2.5]" />
              </div>
              <span className="font-extrabold text-xl tracking-tight uppercase">Native Habitat</span>
            </div>
            
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-8 text-sm font-bold tracking-wide uppercase mt-6 md:mt-0 items-center md:items-start text-center sm:text-left">
              <button onClick={() => setCurrentView('about')} className="hover:text-[#A7F3D0] hover:-translate-y-0.5 transition-all">About the Project</button>
              <button onClick={() => setCurrentView('terms')} className="hover:text-[#A7F3D0] hover:-translate-y-0.5 transition-all">Terms</button>
              <button onClick={() => setCurrentView('privacy')} className="hover:text-[#A7F3D0] hover:-translate-y-0.5 transition-all">Privacy</button>
              <button onClick={() => setCurrentView('disclaimer')} className="hover:text-[#A7F3D0] hover:-translate-y-0.5 transition-all">Disclaimer</button>
              <a href="https://github.com/dsgiri/rural-utilitycost-habitat" target="_blank" rel="noopener noreferrer" className="hover:text-[#A7F3D0] hover:-translate-y-0.5 transition-all flex items-center gap-1">Open Source Repo</a>
            </div>
          </div>
          
          <div className="mt-12 text-center md:text-left text-sm text-stone-400 font-medium">
            <p>&copy; {new Date().getFullYear()} Rural Utility Cost. A free, community-driven resource and open source habitat project. Built and cultivated locally.</p>
          </div>
        </div>
      </footer>

      {/* Admin Secret Prompt Modal */}
      {isPromptingAdminSecret && (
        <div className="fixed inset-0 bg-stone-900/80 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-white border-4 border-stone-900 shadow-[8px_8px_0_0_rgba(28,25,23,1)] p-8 max-w-sm w-full relative">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-stone-200 border-2 border-stone-900 p-2 shadow-[2px_2px_0_0_rgba(28,25,23,1)]">
                <Lock className="w-6 h-6 text-stone-900 stroke-[2.5]" />
              </div>
              <h3 className="font-extrabold flex-1 text-xl uppercase tracking-tighter">Admin Auth</h3>
            </div>
            <p className="text-sm font-medium text-stone-700 mb-6">
              Please enter the moderation password to perform this action.
            </p>
            <form onSubmit={e => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const secret = formData.get('secret') as string;
              if (secret) {
                setAdminSecret(secret);
                if (pendingAdminAction) {
                  executeAdminAction(pendingAdminAction.type, pendingAdminAction.id, secret);
                }
              }
            }}>
              <input
                type="password"
                name="secret"
                autoFocus
                placeholder="Admin password"
                className="w-full px-4 py-3 border-2 border-stone-900 rounded-none mb-6 focus:outline-none focus:shadow-[4px_4px_0_0_rgba(28,25,23,1)] transition-all font-bold"
              />
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsPromptingAdminSecret(false);
                    setPendingAdminAction(null);
                  }}
                  className="px-5 py-2 text-sm font-bold border-2 border-transparent text-stone-600 hover:border-stone-900 hover:shadow-[2px_2px_0_0_rgba(28,25,23,1)] hover:text-stone-900 transition-all rounded-none"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-sm font-bold bg-[#FBEB9F] border-2 border-stone-900 text-stone-900 shadow-[4px_4px_0_0_rgba(28,25,23,1)] hover:translate-y-1 hover:shadow-[0px_0px_0_0_rgba(28,25,23,1)] transition-all rounded-none"
                >
                  Confirm
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

