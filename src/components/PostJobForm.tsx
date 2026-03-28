import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { BrainCircuit, ArrowLeft, Send, Building2, MapPin, Briefcase, Globe, Info, Loader2 } from 'lucide-react';
import { auth, db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

interface PostJobFormProps {
  onBack: () => void;
  onShowAuth: () => void;
}

const DISALLOWED_DOMAINS = [
  'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'icloud.com', 
  'aol.com', 'zoho.com', 'protonmail.com', 'mail.com', 'gmx.com', 'yandex.com'
];

const isGeneralEmail = (email: string) => {
  const domain = email.split('@')[1]?.toLowerCase();
  return DISALLOWED_DOMAINS.includes(domain);
};

export const PostJobForm: React.FC<PostJobFormProps> = ({ onBack, onShowAuth }) => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(auth.currentUser);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    type: 'Full-time',
    category: 'Engineering',
    description: '',
    url: '',
    email: ''
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser?.email && isGeneralEmail(currentUser.email)) {
        setError('Access Denied: Job posting is restricted to users with a custom company email domain.');
      } else {
        setError(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      onShowAuth();
      return;
    }

    if (user.email && isGeneralEmail(user.email)) {
      setError('Access Denied: Job posting is restricted to users with a custom company email domain.');
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, 'jobs'), {
        ...formData,
        employerId: user.uid,
        postedAt: new Date().toISOString(),
        source: 'aicruit',
        logo: `https://logo.clearbit.com/${formData.url.replace(/^https?:\/\//, '').split('/')[0]}`
      });
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error('Error posting job:', error);
      setError('Failed to post job. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="max-w-2xl mx-auto py-20 text-center">
        <div className="w-20 h-20 bg-zinc-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Briefcase className="w-10 h-10 text-zinc-400" />
        </div>
        <h2 className="text-3xl font-bold text-zinc-900 mb-4">Employer Login Required</h2>
        <p className="text-zinc-600 mb-8">
          Please sign in with your company email to post a job listing on aicruit.
        </p>
        <div className="flex items-center justify-center gap-4">
          <button onClick={onBack} className="px-8 py-3 text-zinc-600 font-bold hover:text-zinc-900 transition-colors">
            Cancel
          </button>
          <button onClick={onShowAuth} className="btn-primary px-8 py-3">
            Sign In / Sign Up
          </button>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto py-20 text-center">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Building2 className="w-10 h-10 text-red-600" />
        </div>
        <h2 className="text-3xl font-bold text-zinc-900 mb-4">Restricted Access</h2>
        <p className="text-zinc-600 mb-8">
          {error}
        </p>
        <button 
          onClick={onBack}
          className="btn-primary px-8 py-3"
        >
          Return to Job Board
        </button>
      </div>
    );
  }

  if (submitted) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto py-20 text-center"
      >
        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Send className="w-10 h-10 text-emerald-600" />
        </div>
        <h2 className="text-3xl font-bold text-zinc-900 mb-4">Job Posted Successfully!</h2>
        <p className="text-zinc-600 mb-8">
          Thank you for choosing aicruit. Your listing is being reviewed and will be live shortly.
        </p>
        <button 
          onClick={onBack}
          className="btn-primary px-8 py-3"
        >
          Return to Job Board
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto py-12 px-4"
    >
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-zinc-500 hover:text-zinc-900 transition-colors mb-8 group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to Job Board
      </button>

      <div className="mb-12">
        <h1 className="text-4xl font-bold text-zinc-900 mb-4">Post an AI Job</h1>
        <p className="text-zinc-600">
          Reach the world's best AI talent. Listings are active for 30 days.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 bg-white border border-zinc-200 p-8 rounded-3xl shadow-sm">
        {/* Company Information */}
        <section className="space-y-6">
          <h3 className="text-lg font-bold text-zinc-900 flex items-center gap-2 border-b border-zinc-100 pb-2">
            <Building2 className="w-5 h-5 text-zinc-400" />
            Company Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-700">Company Name</label>
              <input 
                required
                type="text"
                placeholder="e.g. OpenAI"
                className="w-full bg-zinc-50 border-zinc-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-zinc-900 transition-all"
                value={formData.company}
                onChange={e => setFormData({...formData, company: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-700">Company Website</label>
              <input 
                required
                type="url"
                placeholder="https://company.com"
                className="w-full bg-zinc-50 border-zinc-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-zinc-900 transition-all"
                value={formData.url}
                onChange={e => setFormData({...formData, url: e.target.value})}
              />
            </div>
          </div>
        </section>

        {/* Job Details */}
        <section className="space-y-6">
          <h3 className="text-lg font-bold text-zinc-900 flex items-center gap-2 border-b border-zinc-100 pb-2">
            <Briefcase className="w-5 h-5 text-zinc-400" />
            Job Information
          </h3>
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-700">Job Title</label>
              <input 
                required
                type="text"
                placeholder="e.g. Senior ML Engineer"
                className="w-full bg-zinc-50 border-zinc-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-zinc-900 transition-all"
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-700">Category</label>
                <select 
                  className="w-full bg-zinc-50 border-zinc-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-zinc-900 transition-all"
                  value={formData.category}
                  onChange={e => setFormData({...formData, category: e.target.value})}
                >
                  <option>Engineering</option>
                  <option>Research</option>
                  <option>Product</option>
                  <option>Data Science</option>
                  <option>Infrastructure</option>
                  <option>Safety & Ethics</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-700">Job Type</label>
                <select 
                  className="w-full bg-zinc-50 border-zinc-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-zinc-900 transition-all"
                  value={formData.type}
                  onChange={e => setFormData({...formData, type: e.target.value})}
                >
                  <option>Full-time</option>
                  <option>Contract</option>
                  <option>Part-time</option>
                  <option>Internship</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-700 flex items-center gap-2">
                Location (Country)
                <span className="text-xs font-normal text-zinc-400 italic">e.g. USA, UK, Remote</span>
              </label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                <input 
                  required
                  type="text"
                  placeholder="Enter country name"
                  className="w-full bg-zinc-50 border-zinc-200 rounded-xl pl-12 pr-4 py-3 focus:ring-2 focus:ring-zinc-900 transition-all"
                  value={formData.location}
                  onChange={e => setFormData({...formData, location: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-700">Job Description</label>
              <textarea 
                required
                rows={6}
                placeholder="Describe the role, requirements, and benefits..."
                className="w-full bg-zinc-50 border-zinc-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-zinc-900 transition-all resize-none"
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
              />
              <p className="text-xs text-zinc-400 flex items-center gap-1">
                <Info className="w-3 h-3" />
                Markdown is supported
              </p>
            </div>
          </div>
        </section>

        {/* Contact Info */}
        <section className="space-y-6">
          <h3 className="text-lg font-bold text-zinc-900 flex items-center gap-2 border-b border-zinc-100 pb-2">
            <Globe className="w-5 h-5 text-zinc-400" />
            Application Method
          </h3>
          <div className="space-y-2">
            <label className="text-sm font-bold text-zinc-700">Application URL or Email</label>
            <input 
              required
              type="text"
              placeholder="https://jobs.lever.co/... or careers@company.com"
              className="w-full bg-zinc-50 border-zinc-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-zinc-900 transition-all"
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
            />
          </div>
        </section>

        <div className="pt-6">
          <button 
            type="submit"
            disabled={loading}
            className="w-full btn-primary py-4 text-lg flex items-center justify-center gap-2 shadow-lg shadow-zinc-200 disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              <>
                Post Job Listing
                <ArrowLeft className="w-5 h-5 rotate-180" />
              </>
            )}
          </button>
          <p className="text-center text-xs text-zinc-400 mt-4">
            By posting, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </form>
    </motion.div>
  );
};
