"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import { 
  Loader2, 
  Mail, 
  Phone, 
  Lock, 
  User as UserIcon, 
  ShieldCheck, 
  ArrowRight,
  Fingerprint,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { getURL } from "@/lib/utils";

export function CheckoutAuthIntegration({
  onAuthSuccess
}: {
  onAuthSuccess: (user: User) => void
}) {
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);
  const [mode, setMode] = useState<"login" | "register" | "otp">("register");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [fullName, setFullName] = useState("");
  const [otp, setOtp] = useState("");

  // Check initial session
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
        onAuthSuccess(session.user);
      }
    };
    
    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event: any, session: any) => {
      if (session?.user) {
        setUser(session.user);
        onAuthSuccess(session.user);
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, [supabase.auth, onAuthSuccess]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    // Use getURL helper to resolve local, preview, and production URLs correctly
    const redirectTo = `${getURL()}auth/callback`;
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectTo,
        data: {
          app_role: 'PARENT',
          full_name: fullName,
          phone
        }
      }
    });

    setIsLoading(false);
    if (error) {
      setError(error.message);
    } else {
      if (data.user && data.user.identities && data.user.identities.length === 0) {
        setError("This email is already registered. Try logging in instead.");
        setMode("login");
      } else {
        setMode("otp");
      }
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    setIsLoading(false);
    if (error) {
      setError(error.message);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    const { error } = await supabase.auth.verifyOtp({
      email,
      token: otp,
      type: 'email'
    });
    
    setIsLoading(false);
    if (error) {
      setError(error.message);
    }
  };

  if (user) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden p-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 backdrop-blur-sm"
      >
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <ShieldCheck className="w-20 h-20 text-emerald-500" />
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-6 relative z-10">
          <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Fingerprint className="w-7 h-7" />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h4 className="text-xl font-semibold text-emerald-50 mb-1">Identity Verified</h4>
            <p className="text-emerald-400/80 text-sm font-medium">Continuing as <span className="text-emerald-300 underline decoration-emerald-500/30 underline-offset-4">{user.email}</span></p>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => supabase.auth.signOut()} 
            className="text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10 border border-emerald-500/20"
          >
            Switch Account
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="relative group/auth">
      {/* Decorative Glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-2xl blur opacity-25 group-hover/auth:opacity-40 transition duration-1000" />
      
      <div className="relative space-y-6 p-6 sm:p-8 bg-[#0d0f1a] border border-white/10 rounded-2xl backdrop-blur-md shadow-2xl">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-purple-400 font-bold text-[10px] uppercase tracking-widest mb-1">
              <Sparkles className="w-3 h-3" />
              {mode === 'otp' ? 'Verification' : 'Security Protocol'}
            </div>
            <h4 className="text-2xl font-bold text-neutral-50 font-serif lowercase">
              {mode === 'otp' ? 'confirm email' : mode === 'register' ? 'create account' : 'welcome back'}
            </h4>
            <p className="text-neutral-400 text-sm max-w-xs leading-relaxed">
              {mode === 'otp' 
                ? `Enter the secure code sent to ${email}` 
                : mode === 'register' 
                  ? 'Join our community of 500+ families for neuro-affirmative support.' 
                  : 'Access your secure booking dashboard.'}
            </p>
          </div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => {
                setMode(mode === 'login' ? 'register' : 'login');
                setError(null);
              }} 
              className="text-purple-400 hover:text-purple-300 hover:bg-purple-500/10 rounded-full border border-purple-500/20 px-4"
            >
              {mode === 'login' ? 'Register' : 'Log In'}
            </Button>
          </motion.div>
        </div>

        <AnimatePresence mode="wait">
          {error && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm font-medium flex items-center gap-3"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={mode === 'otp' ? handleVerifyOtp : mode === 'login' ? handleLogin : handleRegister} className="space-y-4">
          <AnimatePresence mode="wait">
            {mode !== 'otp' ? (
              <motion.div 
                key="auth-fields"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                <div className="space-y-6">
                  {mode === 'register' && (
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-indigo-400/50 uppercase tracking-[0.2em] pl-1">Primary Contact</label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="relative group/input">
                          <div className="absolute inset-0 bg-indigo-500/5 rounded-2xl blur-lg opacity-0 group-focus-within/input:opacity-100 transition-opacity" />
                          <div className="absolute left-5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center group-focus-within/input:border-indigo-500/30 group-focus-within/input:bg-indigo-500/10 transition-all z-10">
                            <UserIcon className="w-4 h-4 text-zinc-500 group-focus-within/input:text-indigo-400 transition-colors" />
                          </div>
                          <input 
                            required 
                            type="text" 
                            value={fullName} 
                            onChange={e => setFullName(e.target.value)} 
                            className="relative w-full bg-white/[0.02] border border-white/10 rounded-2xl pl-16 pr-5 py-5 text-white placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500/40 focus:bg-white/[0.05] transition-all text-sm font-medium z-10 shadow-inner" 
                            placeholder="Full Name" 
                          />
                        </div>
                        
                        <div className="relative group/input">
                          <div className="absolute inset-0 bg-indigo-500/5 rounded-2xl blur-lg opacity-0 group-focus-within/input:opacity-100 transition-opacity" />
                          <div className="absolute left-5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center group-focus-within/input:border-indigo-500/30 group-focus-within/input:bg-indigo-500/10 transition-all z-10">
                            <Phone className="w-4 h-4 text-zinc-500 group-focus-within/input:text-indigo-400 transition-colors" />
                          </div>
                          <input 
                            required 
                            type="tel" 
                            value={phone} 
                            onChange={e => setPhone(e.target.value)} 
                            className="relative w-full bg-white/[0.02] border border-white/10 rounded-2xl pl-16 pr-5 py-5 text-white placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500/40 focus:bg-white/[0.05] transition-all text-sm font-medium z-10 shadow-inner" 
                            placeholder="Phone Number" 
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Common Fields: Email and Password */}
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-indigo-400/50 uppercase tracking-[0.2em] pl-1">Sign-in Credentials</label>
                    <div className="relative group/input">
                      <div className="absolute inset-0 bg-indigo-500/5 rounded-2xl blur-lg opacity-0 group-focus-within/input:opacity-100 transition-opacity" />
                      <div className="absolute left-5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center group-focus-within/input:border-indigo-500/30 group-focus-within/input:bg-indigo-500/10 transition-all z-10">
                        <Mail className="w-4 h-4 text-zinc-500 group-focus-within/input:text-indigo-400 transition-colors" />
                      </div>
                      <input 
                        required 
                        type="email" 
                        value={email} 
                        onChange={e => setEmail(e.target.value)} 
                        className="relative w-full bg-white/[0.02] border border-white/10 rounded-2xl pl-16 pr-5 py-5 text-white placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500/40 focus:bg-white/[0.05] transition-all text-sm font-medium z-10 shadow-inner" 
                        placeholder="Email Address" 
                      />
                    </div>

                    <div className="relative group/input">
                      <div className="absolute inset-0 bg-indigo-500/5 rounded-2xl blur-lg opacity-0 group-focus-within/input:opacity-100 transition-opacity" />
                      <div className="absolute left-5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center group-focus-within/input:border-indigo-500/30 group-focus-within/input:bg-indigo-500/10 transition-all z-10">
                        <Lock className="w-4 h-4 text-zinc-500 group-focus-within/input:text-indigo-400 transition-colors" />
                      </div>
                      <input 
                        required 
                        type="password" 
                        value={password} 
                        onChange={e => setPassword(e.target.value)} 
                        className="relative w-full bg-white/[0.02] border border-white/10 rounded-2xl pl-16 pr-5 py-5 text-white placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500/40 focus:bg-white/[0.05] transition-all text-sm font-medium z-10 shadow-inner" 
                        placeholder={mode === 'register' ? "Set Password" : "Enter Password"} 
                      />
                    </div>
                  </div>
                </div>
              </motion.div>

            ) : (
              <motion.div 
                key="otp-fields"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="space-y-6 text-center"
              >
                <div className="flex flex-col items-center gap-2">
                  <div className="w-16 h-16 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-400 mb-2 border border-purple-500/20">
                     <Mail className="w-8 h-8" />
                  </div>
                  <p className="text-xs text-neutral-500 font-medium">Verify your email to continue</p>
                </div>
                
                <input 
                  required 
                  type="text" 
                  autoFocus
                  value={otp} 
                  onChange={e => setOtp(e.target.value)} 
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-4 py-6 text-center tracking-[0.75em] text-3xl font-mono text-purple-400 placeholder:text-neutral-800 focus:outline-none focus:border-purple-500/50 focus:ring-12 focus:ring-purple-500/5 transition-all shadow-inner" 
                  placeholder="000000" 
                  maxLength={6} 
                />
                
                <Button 
                  type="button" 
                  variant="link" 
                  size="sm" 
                  onClick={() => {
                    setMode('register');
                    setError(null);
                  }} 
                  className="text-neutral-500 hover:text-neutral-300 transition-colors"
                >
                  Entered wrong email? Change it
                </Button>
              </motion.div>
            )}
          </AnimatePresence>

          <Button 
            type="submit" 
            disabled={isLoading} 
            className="w-full h-14 bg-white text-[#0d0f1a] hover:bg-neutral-200 font-bold rounded-xl text-base group transition-all"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <div className="flex items-center justify-center gap-2">
                {mode === 'otp' ? 'Confirm Identity' : (mode === 'login' ? 'Secure Login' : 'Continue to Payment')}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            )}
          </Button>

          <div className="flex items-center justify-center gap-2 text-[10px] text-neutral-500 font-bold uppercase tracking-widest mt-4">
             <ShieldCheck className="w-3 h-3 text-emerald-500" />
             End-to-End Encrypted Secure Checkout
          </div>
        </form>
      </div>
    </div>
  );
}
