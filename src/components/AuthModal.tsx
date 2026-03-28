import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, Lock, Building2, ArrowRight, Loader2, User, Chrome } from 'lucide-react';
import { auth, db, googleProvider } from '../firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  updateProfile,
  signInWithPopup
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

type UserRole = 'employer' | 'employee';

const DISALLOWED_DOMAINS = [
  'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'icloud.com', 
  'aol.com', 'zoho.com', 'protonmail.com', 'mail.com', 'gmx.com', 'yandex.com'
];

const isGeneralEmail = (email: string) => {
  const domain = email.split('@')[1]?.toLowerCase();
  return DISALLOWED_DOMAINS.includes(domain);
};

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState<UserRole>('employee');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleSignIn = async () => {
    if (role === 'employer') {
      setError('Employers must use a custom company email domain. Google Sign-in is restricted to Candidates.');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Check if profile exists
      const employerRef = doc(db, 'employers', user.uid);
      const employeeRef = doc(db, 'employees', user.uid);
      
      const [employerSnap, employeeSnap] = await Promise.all([
        getDoc(employerRef),
        getDoc(employeeRef)
      ]);

      if (!employerSnap.exists() && !employeeSnap.exists()) {
        // Create new profile as Candidate (since Google is only for candidates)
        await setDoc(employeeRef, {
          uid: user.uid,
          email: user.email,
          fullName: user.displayName || 'Anonymous',
          avatar: user.photoURL,
          createdAt: new Date().toISOString()
        });
      }
      onSuccess();
      onClose();
    } catch (err: any) {
      console.error('Google Auth error:', err);
      setError(err.message || 'An error occurred during Google authentication');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!isLogin && role === 'employer' && isGeneralEmail(email)) {
      setError('Employers must use a custom company email domain. General email providers (Gmail, Yahoo, etc.) are not allowed.');
      setLoading(false);
      return;
    }

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        if (role === 'employer') {
          await setDoc(doc(db, 'employers', user.uid), {
            uid: user.uid,
            email: user.email,
            companyName: companyName,
            createdAt: new Date().toISOString()
          });
          await updateProfile(user, { displayName: companyName });
        } else {
          await setDoc(doc(db, 'employees', user.uid), {
            uid: user.uid,
            email: user.email,
            fullName: fullName,
            createdAt: new Date().toISOString()
          });
          await updateProfile(user, { displayName: fullName });
        }
      }
      onSuccess();
      onClose();
    } catch (err: any) {
      console.error('Auth error:', err);
      setError(err.message || 'An error occurred during authentication');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden relative"
        >
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-zinc-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="p-8">
            <div className="w-12 h-12 bg-zinc-900 rounded-xl flex items-center justify-center mb-6">
              {role === 'employer' ? <Building2 className="w-6 h-6 text-white" /> : <User className="w-6 h-6 text-white" />}
            </div>

            <h2 className="text-2xl font-bold text-zinc-900 mb-2">
              {isLogin ? 'Welcome Back' : 'Join aicruit'}
            </h2>
            <p className="text-zinc-500 mb-6">
              {isLogin 
                ? 'Sign in to access your account.' 
                : 'Create an account to get started.'}
            </p>

            {/* Role Selector */}
            {!isLogin && (
              <div className="flex p-1 bg-zinc-100 rounded-xl mb-6">
                <button
                  onClick={() => setRole('employee')}
                  className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${role === 'employee' ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-500 hover:text-zinc-700'}`}
                >
                  Candidate
                </button>
                <button
                  onClick={() => setRole('employer')}
                  className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${role === 'employer' ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-500 hover:text-zinc-700'}`}
                >
                  Employer
                </button>
              </div>
            )}

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl">
                {error}
              </div>
            )}

            {/* Google Sign-in - Only for Candidates */}
            {role === 'employee' && (
              <>
                <button
                  onClick={handleGoogleSignIn}
                  disabled={loading}
                  className="w-full py-2.5 border border-zinc-200 rounded-xl font-bold hover:bg-zinc-50 transition-all flex items-center justify-center gap-2 mb-6 disabled:opacity-50"
                >
                  <Chrome className="w-5 h-5" />
                  Continue with Google
                </button>

                <div className="relative mb-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-zinc-100"></div>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-zinc-400">Or continue with email</span>
                  </div>
                </div>
              </>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && role === 'employer' && (
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1.5">
                    Company Name
                  </label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                    <input
                      type="text"
                      required
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-zinc-900 focus:border-transparent outline-none transition-all"
                      placeholder="Acme AI Corp"
                    />
                  </div>
                </div>
              )}

              {!isLogin && role === 'employee' && (
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1.5">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-zinc-900 focus:border-transparent outline-none transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1.5">
                  {role === 'employer' && !isLogin ? 'Work Email' : 'Email Address'}
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-zinc-900 focus:border-transparent outline-none transition-all"
                    placeholder={role === 'employer' && !isLogin ? 'hiring@company.com' : 'you@example.com'}
                  />
                </div>
                {role === 'employer' && !isLogin && (
                  <p className="mt-1.5 text-[10px] text-zinc-500 flex items-center gap-1">
                    <Building2 className="w-3 h-3" />
                    Must be a custom company domain
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-zinc-900 focus:border-transparent outline-none transition-all"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-zinc-900 text-white rounded-xl font-bold hover:bg-zinc-800 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    {isLogin ? 'Sign In' : 'Create Account'}
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-zinc-100 text-center">
              <p className="text-sm text-zinc-500">
                {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-zinc-900 font-bold hover:underline"
                >
                  {isLogin ? 'Sign Up' : 'Sign In'}
                </button>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
