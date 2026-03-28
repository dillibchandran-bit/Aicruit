import { X, ExternalLink, Building2, MapPin, Briefcase, Clock, Sparkles, BrainCircuit } from 'lucide-react';
import { motion } from 'motion/react';
import { Job } from '../types';
import Markdown from 'react-markdown';
import { formatDistanceToNow } from 'date-fns';

interface JobModalProps {
  job: Job;
  onClose: () => void;
}

export const JobModal: React.FC<JobModalProps> = ({ job, onClose }) => {
  const getCountry = (location: string) => {
    if (!location) return 'Global';
    const loc = location.toLowerCase();
    if (loc === 'remote' || loc.includes('anywhere') || loc.includes('remote')) return 'Remote';
    
    const parts = location.split(',').map(p => p.trim());
    if (parts.length > 1) {
      const lastPart = parts[parts.length - 1];
      if (lastPart.length === 2 && lastPart === lastPart.toUpperCase()) return 'USA';
      return lastPart;
    }
    
    const cityToCountry: Record<string, string> = {
      'berlin': 'Germany', 'london': 'UK', 'tokyo': 'Japan', 'singapore': 'Singapore',
      'paris': 'France', 'toronto': 'Canada', 'boston': 'USA', 'tel aviv': 'Israel',
      'san francisco': 'USA', 'mountain view': 'USA', 'dublin': 'Ireland',
      'chittoor': 'India', 'new york': 'USA', 'seattle': 'USA', 'austin': 'USA'
    };
    
    return cityToCountry[loc] || location;
  };

  const country = getCountry(job.location);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-zinc-900/60 backdrop-blur-sm"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-3xl max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col"
      >
        <div className="p-6 sm:p-8 border-b border-zinc-100 flex items-start justify-between bg-zinc-50/50">
          <div className="flex gap-6">
            <div className="relative w-20 h-20 rounded-2xl overflow-hidden flex items-center justify-center border border-zinc-200 shadow-sm flex-shrink-0">
              <div className="absolute inset-0 bg-white" />
              <div className="absolute inset-y-0 right-0 w-1/2 bg-zinc-900" />
              <BrainCircuit className="relative w-10 h-10 text-emerald-500" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 leading-tight">
                {job.title}
              </h2>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-3 text-zinc-600">
                <span className="flex items-center gap-2 font-semibold text-zinc-900">
                  <Building2 className="w-4 h-4" />
                  {job.company}
                </span>
                <span className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {country}
                </span>
                <span className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4" />
                  {job.type}
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-zinc-200 rounded-full transition-colors text-zinc-400 hover:text-zinc-900"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 sm:p-8">
          <div className="flex items-center gap-4 mb-8 p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
            <div className="flex-1 text-center">
              <div className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1">Posted</div>
              <div className="text-sm font-medium text-zinc-900">
                {formatDistanceToNow(new Date(job.postedAt))} ago
              </div>
            </div>
            <div className="w-px h-8 bg-zinc-200" />
            <div className="flex-1 text-center">
              <div className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1">Category</div>
              <div className="text-sm font-medium text-zinc-900">{job.category || 'Engineering'}</div>
            </div>
            <div className="w-px h-8 bg-zinc-200" />
            <div className="flex-1 text-center">
              <div className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1">Type</div>
              <div className="text-sm font-medium text-zinc-900">{job.type}</div>
            </div>
          </div>

          <div className="prose prose-zinc max-w-none">
            <h3 className="text-xl font-bold text-zinc-900 mb-4">Job Description</h3>
            <div className="text-zinc-600 leading-relaxed whitespace-pre-wrap">
              {job.description.includes('<') ? (
                <div dangerouslySetInnerHTML={{ __html: job.description }} />
              ) : (
                <Markdown>{job.description}</Markdown>
              )}
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8 bg-zinc-50 border-t border-zinc-100 flex items-center justify-between">
          <div className="flex items-center gap-2 text-zinc-500 text-sm">
            <Sparkles className="w-4 h-4 text-zinc-400" />
            Verified AI Opportunity
          </div>
          <a
            href={job.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary flex items-center gap-2 px-8 py-3"
          >
            Apply Now
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </motion.div>
    </div>
  );
};
