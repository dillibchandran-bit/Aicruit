import { useState, useEffect, useMemo } from 'react';
import { Search, MapPin, Briefcase, Sparkles, Filter, BrainCircuit, Globe, ArrowRight, Github, Twitter, Linkedin, ChevronLeft, ChevronRight, LogOut, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Job, JobFilter } from './types';
import { fetchExternalJobs } from './services/jobService';
import { JobCard } from './components/JobCard';
import { JobModal } from './components/JobModal';
import { PostJobForm } from './components/PostJobForm';
import { AuthModal } from './components/AuthModal';
import { AboutUs, ContactUs, PrivacyPolicy, TermsConditions } from './components/StaticPages';
import { Blog } from './components/Blog';
import { cn } from './lib/utils';
import { auth, db, handleFirestoreError, OperationType } from './firebase';
import { signOut } from 'firebase/auth';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { FirebaseProvider, ErrorBoundary, useAuth } from './components/FirebaseProvider';

type View = 'home' | 'post-job' | 'about' | 'contact' | 'privacy' | 'terms' | 'blog';

function AppContent() {
  const [view, setView] = useState<View>('home');
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const JOBS_PER_PAGE = 10;
  const [filters, setFilters] = useState<JobFilter>({
    search: '',
    location: '',
    type: ''
  });

  const { user, isAuthReady } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    if (!isAuthReady) return;

    setLoading(true);
    
    // Real-time listener for Firestore jobs
    const path = 'jobs';
    const q = query(collection(db, path), orderBy('postedAt', 'desc'));
    const unsubscribeFirestore = onSnapshot(q, async (snapshot) => {
      const firestoreJobs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Job));

      // Also fetch external jobs
      const externalJobs = await fetchExternalJobs();
      
      const allJobs = [...firestoreJobs, ...externalJobs];
      
      // Remove duplicates by ID
      const uniqueJobs = Array.from(new Map(allJobs.map(job => [job.id, job])).values());
      
      setJobs(uniqueJobs.sort((a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime()));
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, path);
    });

    return () => unsubscribeFirestore();
  }, [isAuthReady]);

  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const matchesSearch = 
        job.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        job.company.toLowerCase().includes(filters.search.toLowerCase()) ||
        job.description.toLowerCase().includes(filters.search.toLowerCase());
      
      const matchesLocation = 
        filters.location === '' || 
        job.location.toLowerCase().includes(filters.location.toLowerCase());
      
      const matchesType = 
        filters.type === '' || 
        job.type.toLowerCase() === filters.type.toLowerCase();

      return matchesSearch && matchesLocation && matchesType;
    });
  }, [jobs, filters]);

  // Pagination logic
  const totalPages = Math.ceil(filteredJobs.length / JOBS_PER_PAGE);
  const paginatedJobs = useMemo(() => {
    const startIndex = (currentPage - 1) * JOBS_PER_PAGE;
    return filteredJobs.slice(startIndex, startIndex + JOBS_PER_PAGE);
  }, [filteredJobs, currentPage]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  const renderView = () => {
    switch (view) {
      case 'home':
        return (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Hero Section */}
            <header className="relative pt-20 pb-16 overflow-hidden bg-zinc-900 text-white">
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#3f3f46_0%,transparent_50%)]" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-zinc-800 rounded-full blur-3xl -mr-48 -mb-48" />
              </div>
              
              <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-400 text-xs font-bold uppercase tracking-widest mb-6">
                    <Sparkles className="w-3 h-3 text-emerald-400" />
                    The #1 Global AI Job Board
                  </div>
                  <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
                    Build the future of <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 to-zinc-500">
                      Artificial Intelligence.
                    </span>
                  </h1>
                  <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-10">
                    Aggregating the best AI opportunities worldwide. 
                    Find your next role in LLMs, Computer Vision, and Robotics.
                  </p>
                </motion.div>

                {/* Search Bar */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="max-w-4xl mx-auto"
                >
                  <div className="bg-white p-2 rounded-2xl shadow-2xl flex flex-col md:flex-row gap-2">
                    <div className="flex-1 flex items-center px-4 gap-3 border-b md:border-b-0 md:border-r border-zinc-100 py-2 md:py-0">
                      <Search className="w-5 h-5 text-zinc-400" />
                      <input
                        type="text"
                        placeholder="Job title, keywords, or company"
                        className="w-full bg-transparent border-none focus:ring-0 text-zinc-900 placeholder:text-zinc-400 font-medium"
                        value={filters.search}
                        onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                      />
                    </div>
                    <div className="flex-1 flex items-center px-4 gap-3 py-2 md:py-0">
                      <MapPin className="w-5 h-5 text-zinc-400" />
                      <input
                        type="text"
                        placeholder="City, state, or remote"
                        className="w-full bg-transparent border-none focus:ring-0 text-zinc-900 placeholder:text-zinc-400 font-medium"
                        value={filters.location}
                        onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
                      />
                    </div>
                    <button className="btn-primary px-8 py-4 text-lg flex items-center justify-center gap-2">
                      Search Jobs
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="flex flex-wrap justify-center gap-4 mt-6 text-sm text-zinc-500">
                    <span>Popular:</span>
                    {['ML Engineer', 'AI Engineer', 'Data Scientist', 'NLP', 'MLOps', 'Prompt Engineer', 'AI Ethics'].map(tag => (
                      <button
                        key={tag}
                        onClick={() => setFilters(prev => ({ ...prev, search: tag }))}
                        className="hover:text-white transition-colors"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </motion.div>
              </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Filters Sidebar */}
                <aside className="w-full lg:w-64 space-y-8">
                  <div>
                    <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-widest mb-4 flex items-center gap-2">
                      <Filter className="w-4 h-4" />
                      Filters
                    </h3>
                    
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-zinc-700 mb-2">Core Roles</label>
                        <div className="space-y-2">
                          {['ML Engineer', 'AI Engineer', 'Data Scientist', 'Research Scientist', 'Deep Learning'].map(role => (
                            <label key={role} className="flex items-center gap-2 cursor-pointer group">
                              <input
                                type="checkbox"
                                className="w-4 h-4 rounded text-zinc-900 border-zinc-300 focus:ring-zinc-900"
                                checked={filters.search.includes(role)}
                                onChange={() => setFilters(prev => ({ ...prev, search: role }))}
                              />
                              <span className="text-sm text-zinc-600 group-hover:text-zinc-900 transition-colors">{role}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-zinc-700 mb-2">Specialized</label>
                        <div className="space-y-2">
                          {['NLP', 'Computer Vision', 'Robotics', 'MLOps', 'Prompt Engineer', 'AI Ethics'].map(role => (
                            <label key={role} className="flex items-center gap-2 cursor-pointer group">
                              <input
                                type="checkbox"
                                className="w-4 h-4 rounded text-zinc-900 border-zinc-300 focus:ring-zinc-900"
                                checked={filters.search.includes(role)}
                                onChange={() => setFilters(prev => ({ ...prev, search: role }))}
                              />
                              <span className="text-sm text-zinc-600 group-hover:text-zinc-900 transition-colors">{role}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-zinc-700 mb-2">Job Type</label>
                        <div className="space-y-2">
                          {['Full-time', 'Contract', 'Part-time', 'Internship'].map(type => (
                            <label key={type} className="flex items-center gap-2 cursor-pointer group">
                              <input
                                type="radio"
                                name="jobType"
                                className="w-4 h-4 text-zinc-900 border-zinc-300 focus:ring-zinc-900"
                                checked={filters.type === type}
                                onChange={() => setFilters(prev => ({ ...prev, type: filters.type === type ? '' : type }))}
                              />
                              <span className="text-sm text-zinc-600 group-hover:text-zinc-900 transition-colors">{type}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-zinc-700 mb-2">Location</label>
                        <div className="space-y-2">
                          {['Remote', 'San Francisco', 'London', 'Berlin', 'Tokyo', 'Singapore', 'Toronto'].map(loc => (
                            <label key={loc} className="flex items-center gap-2 cursor-pointer group">
                              <input
                                type="checkbox"
                                className="w-4 h-4 rounded text-zinc-900 border-zinc-300 focus:ring-zinc-900"
                                checked={filters.location.includes(loc)}
                                onChange={() => setFilters(prev => ({ ...prev, location: loc }))}
                              />
                              <span className="text-sm text-zinc-600 group-hover:text-zinc-900 transition-colors">{loc}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 bg-zinc-900 rounded-2xl text-white">
                    <h4 className="font-bold mb-2">Get AI Job Alerts</h4>
                    <p className="text-sm text-zinc-400 mb-4">The latest AI roles delivered to your inbox weekly.</p>
                    <input
                      type="email"
                      placeholder="email@example.com"
                      className="w-full bg-zinc-800 border-zinc-700 rounded-lg px-4 py-2 text-sm mb-3 focus:ring-1 focus:ring-zinc-500 border"
                    />
                    <button className="w-full btn-primary bg-white text-zinc-900 hover:bg-zinc-100">Subscribe</button>
                  </div>
                </aside>

                {/* Job List */}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-xl font-bold text-zinc-900">
                      {loading ? 'Fetching jobs...' : `${filteredJobs.length} AI Jobs Found`}
                    </h2>
                    <div className="flex items-center gap-2 text-sm text-zinc-500">
                      <span>Sort by:</span>
                      <select className="bg-transparent border-none focus:ring-0 font-medium text-zinc-900 cursor-pointer">
                        <option>Newest First</option>
                        <option>Salary (High to Low)</option>
                        <option>Relevance</option>
                      </select>
                    </div>
                  </div>

                  {loading ? (
                    <div className="grid gap-4">
                      {[1, 2, 3, 4, 5].map(i => (
                        <div key={i} className="h-32 bg-zinc-100 rounded-2xl animate-pulse" />
                      ))}
                    </div>
                  ) : (
                    <div className="grid gap-4">
                      <AnimatePresence mode="popLayout">
                        {paginatedJobs.length > 0 ? (
                          <>
                            {paginatedJobs.map(job => (
                              <JobCard key={job.id} job={job} onClick={setSelectedJob} />
                            ))}
                            
                            {/* Pagination UI */}
                            {totalPages > 1 && (
                              <div className="flex items-center justify-center gap-2 mt-12">
                                <button
                                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                  disabled={currentPage === 1}
                                  className="p-2 rounded-lg border border-zinc-200 hover:bg-zinc-50 disabled:opacity-30 transition-colors"
                                >
                                  <ChevronLeft className="w-5 h-5" />
                                </button>
                                
                                <div className="flex items-center gap-1">
                                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                    <button
                                      key={page}
                                      onClick={() => setCurrentPage(page)}
                                      className={cn(
                                        "w-10 h-10 rounded-lg text-sm font-bold transition-all",
                                        currentPage === page 
                                          ? "bg-zinc-900 text-white shadow-lg" 
                                          : "text-zinc-500 hover:bg-zinc-100"
                                      )}
                                    >
                                      {page}
                                    </button>
                                  ))}
                                </div>

                                <button
                                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                  disabled={currentPage === totalPages}
                                  className="p-2 rounded-lg border border-zinc-200 hover:bg-zinc-50 disabled:opacity-30 transition-colors"
                                >
                                  <ChevronRight className="w-5 h-5" />
                                </button>
                              </div>
                            )}
                          </>
                        ) : (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-20 bg-zinc-50 rounded-3xl border-2 border-dashed border-zinc-200"
                          >
                            <div className="w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center mx-auto mb-4">
                              <Search className="w-8 h-8 text-zinc-400" />
                            </div>
                            <h3 className="text-lg font-bold text-zinc-900">No jobs found</h3>
                            <p className="text-zinc-500">Try adjusting your search filters or keywords.</p>
                            <button
                              onClick={() => setFilters({ search: '', location: '', type: '' })}
                              className="mt-4 text-zinc-900 font-bold hover:underline"
                            >
                              Clear all filters
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}
                </div>
              </div>
            </main>
          </motion.div>
        );
      case 'post-job':
        return <PostJobForm key="post-job" onBack={() => setView('home')} onShowAuth={() => setIsAuthModalOpen(true)} />;
      case 'about':
        return <AboutUs key="about" onBack={() => setView('home')} />;
      case 'contact':
        return <ContactUs key="contact" onBack={() => setView('home')} />;
      case 'privacy':
        return <PrivacyPolicy key="privacy" onBack={() => setView('home')} />;
      case 'terms':
        return <TermsConditions key="terms" onBack={() => setView('home')} />;
      case 'blog':
        return <Blog key="blog" onNavigate={(v) => setView(v)} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button 
              onClick={() => setView('home')}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <div className="w-10 h-10 bg-zinc-900 rounded-xl flex items-center justify-center">
                <BrainCircuit className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold tracking-tighter text-zinc-900">aicruit</span>
            </button>
            
            <div className="hidden md:flex items-center gap-8">
              <button 
                onClick={() => setView('home')}
                className={cn(
                  "text-sm font-medium transition-colors",
                  view === 'home' ? "text-zinc-900" : "text-zinc-600 hover:text-zinc-900"
                )}
              >
                Find Jobs
              </button>
              <button 
                onClick={() => setView('about')}
                className={cn(
                  "text-sm font-medium transition-colors",
                  view === 'about' ? "text-zinc-900" : "text-zinc-600 hover:text-zinc-900"
                )}
              >
                About
              </button>
              <button 
                onClick={() => setView('contact')}
                className={cn(
                  "text-sm font-medium transition-colors",
                  view === 'contact' ? "text-zinc-900" : "text-zinc-600 hover:text-zinc-900"
                )}
              >
                Contact
              </button>
              <button 
                onClick={() => setView('blog')}
                className={cn(
                  "text-sm font-medium transition-colors",
                  view === 'blog' ? "text-zinc-900" : "text-zinc-600 hover:text-zinc-900"
                )}
              >
                Blog
              </button>
            </div>

            <div className="flex items-center gap-4">
              {user ? (
                <div className="flex items-center gap-4">
                  <div className="hidden md:flex flex-col items-end">
                    <span className="text-xs font-bold text-zinc-900">{user.displayName || 'Employer'}</span>
                    <span className="text-[10px] text-zinc-500">{user.email}</span>
                  </div>
                  <button 
                    onClick={() => signOut(auth)}
                    className="p-2 text-zinc-500 hover:text-red-600 transition-colors"
                    title="Sign Out"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => setView('post-job')}
                    className="px-5 py-2.5 bg-zinc-900 text-white text-sm font-bold rounded-xl hover:bg-zinc-800 transition-all shadow-lg shadow-zinc-200"
                  >
                    Post a Job
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setIsAuthModalOpen(true)}
                    className="text-sm font-bold text-zinc-600 hover:text-zinc-900 transition-colors px-4 py-2"
                  >
                    Sign In
                  </button>
                  <button 
                    onClick={() => {
                      setIsAuthModalOpen(true);
                    }}
                    className="px-5 py-2.5 bg-zinc-900 text-white text-sm font-bold rounded-xl hover:bg-zinc-800 transition-all shadow-lg shadow-zinc-200"
                  >
                    Post a Job
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {renderView()}
        </AnimatePresence>
      </main>

      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={() => {
          // Stay on current view
        }}
      />

      {/* Footer */}
      <footer className="bg-white border-t border-zinc-200 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-zinc-900 rounded-lg flex items-center justify-center">
                  <BrainCircuit className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold tracking-tighter text-zinc-900">aicruit</span>
              </div>
              <p className="text-zinc-500 max-w-sm mb-6">
                The world's premier job board dedicated to Artificial Intelligence. 
                Connecting the best talent with the most innovative companies.
              </p>
              <div className="flex gap-4">
                <Twitter className="w-5 h-5 text-zinc-400 hover:text-zinc-900 cursor-pointer transition-colors" />
                <Github className="w-5 h-5 text-zinc-400 hover:text-zinc-900 cursor-pointer transition-colors" />
                <Linkedin className="w-5 h-5 text-zinc-400 hover:text-zinc-900 cursor-pointer transition-colors" />
              </div>
            </div>
            <div>
              <h4 className="font-bold text-zinc-900 mb-6">For Candidates</h4>
              <ul className="space-y-4 text-sm text-zinc-500">
                <li><button onClick={() => setView('home')} className="hover:text-zinc-900">Browse Jobs</button></li>
                <li><button onClick={() => setView('blog')} className="hover:text-zinc-900">Blog</button></li>
                <li><button onClick={() => setView('about')} className="hover:text-zinc-900">About Us</button></li>
                <li><button onClick={() => setView('contact')} className="hover:text-zinc-900">Contact Us</button></li>
                <li><button onClick={() => setView('privacy')} className="hover:text-zinc-900">Privacy Policy</button></li>
                <li><button onClick={() => setView('terms')} className="hover:text-zinc-900">Terms & Conditions</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-zinc-900 mb-6">For Employers</h4>
              <ul className="space-y-4 text-sm text-zinc-500">
                <li><button onClick={() => setView('post-job')} className="hover:text-zinc-900">Post a Job</button></li>
                <li><a href="#" className="hover:text-zinc-900">Pricing</a></li>
                <li><a href="#" className="hover:text-zinc-900">Hiring Solutions</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-zinc-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-zinc-400">© 2026 aicruit. All rights reserved.</p>
            <div className="flex gap-8 text-xs text-zinc-400">
              <button onClick={() => setView('privacy')} className="hover:text-zinc-900">Privacy Policy</button>
              <button onClick={() => setView('terms')} className="hover:text-zinc-900">Terms & Conditions</button>
              <a href="#" className="hover:text-zinc-900">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {selectedJob && (
          <JobModal job={selectedJob} onClose={() => setSelectedJob(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <FirebaseProvider>
        <AppContent />
      </FirebaseProvider>
    </ErrorBoundary>
  );
}
