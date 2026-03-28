import React from 'react';
import { Search, MapPin, Briefcase, Sparkles, Filter, ExternalLink, Building2, Clock, ChevronRight, BrainCircuit } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Job } from '../types';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '../lib/utils';

interface JobCardProps {
  job: Job;
  onClick: (job: Job) => void;
}

export const JobCard: React.FC<JobCardProps> = ({ job, onClick }) => {
  const getCountry = (location: string) => {
    if (!location) return 'Global';
    const loc = location.toLowerCase();
    if (loc === 'remote' || loc.includes('anywhere') || loc.includes('remote')) return 'Remote';
    
    const parts = location.split(',').map(p => p.trim());
    if (parts.length > 1) {
      const lastPart = parts[parts.length - 1];
      // US State check (e.g., "CA", "NY")
      if (lastPart.length === 2 && lastPart === lastPart.toUpperCase()) return 'USA';
      return lastPart;
    }
    
    // Mapping for common cities in our data that might not have a comma
    const cityToCountry: Record<string, string> = {
      'berlin': 'Germany',
      'london': 'UK',
      'tokyo': 'Japan',
      'singapore': 'Singapore',
      'paris': 'France',
      'toronto': 'Canada',
      'boston': 'USA',
      'tel aviv': 'Israel',
      'san francisco': 'USA',
      'mountain view': 'USA',
      'dublin': 'Ireland',
      'chittoor': 'India',
      'new york': 'USA',
      'seattle': 'USA',
      'austin': 'USA'
    };
    
    return cityToCountry[loc] || location;
  };

  const country = getCountry(job.location);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -4 }}
      onClick={() => onClick(job)}
      className="group relative bg-white border border-zinc-200 p-6 rounded-2xl cursor-pointer hover:border-zinc-900 transition-all duration-300 shadow-sm hover:shadow-xl"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex gap-4">
          <div className="relative w-14 h-14 rounded-xl overflow-hidden flex items-center justify-center border border-zinc-100 flex-shrink-0">
            <div className="absolute inset-0 bg-white" />
            <div className="absolute inset-y-0 right-0 w-1/2 bg-zinc-900" />
            <BrainCircuit className="relative w-7 h-7 text-emerald-500" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-zinc-900 group-hover:text-zinc-900 transition-colors line-clamp-1">
              {job.title}
            </h3>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-sm text-zinc-500">
              <span className="flex items-center gap-1 font-medium text-zinc-700">
                <Building2 className="w-3.5 h-3.5" />
                {job.company}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                {country}
              </span>
              <span className="flex items-center gap-1">
                <Briefcase className="w-3.5 h-3.5" />
                {job.type}
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-600 border border-emerald-100">
            {country}
          </span>
          <span className="text-xs text-zinc-400 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {formatDistanceToNow(new Date(job.postedAt))} ago
          </span>
        </div>
      </div>
      
      <div className="mt-4 flex items-center justify-between">
        <div className="flex gap-2">
          <span className="px-3 py-1 bg-zinc-100 text-zinc-600 rounded-lg text-xs font-medium">
            AI
          </span>
          {job.category && (
            <span className="px-3 py-1 bg-zinc-100 text-zinc-600 rounded-lg text-xs font-medium">
              {job.category}
            </span>
          )}
        </div>
        <div className="text-zinc-400 group-hover:text-zinc-900 transition-colors">
          <ChevronRight className="w-5 h-5" />
        </div>
      </div>
    </motion.div>
  );
};
