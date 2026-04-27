import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Lock, Mail, Eye, EyeOff, ShieldCheck, Sparkles, Cpu, Activity } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { motion } from "framer-motion";

const AdminLogin = () => {
  const { isAdmin, loading, signIn, signUp } = useAdminAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const allowedEmail = 'shishirmd681@gmail.com';

  const handleSignUp = async () => {
    setError('');
    if (email !== allowedEmail) {
      setError('Only the absolute owner can initiate the admin protocol.');
      return;
    }
    setIsLoading(true);
    const { error: signUpError } = await signUp(email, password, 'Admin');
    if (signUpError) {
      setError(signUpError.message || 'Operational initialization failed.');
      setIsLoading(false);
      return;
    }
    try {
      await supabase.rpc('grant_admin_to_self_if_allowed');
    } catch (_) {
      // no-op: role assignment handled securely on the backend
    }
    setIsLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center space-y-8">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
        <p className="text-2xl font-heading font-bold text-slate-900 tracking-tighter">Synchronizing Intelligence Gateway...</p>
      </div>
    );
  }

  if (isAdmin) {
    return <Navigate to="/admin-dashboard" replace />;
  }

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const { error: signInError } = await signIn(email, password);
    
    if (signInError) {
      setError(signInError.message || 'Invalid operational credentials. Verify intelligence uplink.');
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-8 relative overflow-hidden font-body text-slate-900">
      {/* Visual background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-primary/5 rounded-full blur-[140px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="w-full max-w-3xl relative z-10"
      >
        <Card className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[5rem] shadow-glass overflow-hidden">
          <CardHeader className="space-y-8 text-center p-16 pb-8">
            <div className="mx-auto w-24 h-24 bg-slate-900 text-white rounded-[2rem] flex items-center justify-center mb-6 shadow-2xl">
              <ShieldCheck className="w-12 h-12" />
            </div>
            <div className="space-y-4">
              <CardTitle className="text-5xl lg:text-7xl font-heading font-bold tracking-tighter">Absolute <span className="text-primary italic">Gateway.</span></CardTitle>
              <CardDescription className="text-2xl text-slate-500 font-medium max-w-xl mx-auto leading-relaxed">
                Enter your intelligence credentials to establish secure operational uplink.
              </CardDescription>
            </div>
          </CardHeader>
          
          <CardContent className="p-16 pt-8">
            <form onSubmit={handleSignIn} className="space-y-10">
              <div className="space-y-4">
                <Label htmlFor="email" className="text-sm font-black uppercase tracking-[0.4em] text-slate-400 ml-6">Intelligence Uplink</Label>
                <div className="relative group">
                  <Mail className="absolute left-10 top-1/2 -translate-y-1/2 h-6 w-6 text-slate-400 group-focus-within:text-primary transition-colors" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="shishir@absolute.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-20 pl-24 pr-10 bg-white/60 border border-white/80 rounded-full text-2xl font-bold focus:outline-none focus:ring-2 focus:ring-primary shadow-sm transition-all duration-500"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <Label htmlFor="password" className="text-sm font-black uppercase tracking-[0.4em] text-slate-400 ml-6">Security Protocol</Label>
                <div className="relative group">
                  <Lock className="absolute left-10 top-1/2 -translate-y-1/2 h-6 w-6 text-slate-400 group-focus-within:text-primary transition-colors" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-20 pl-24 pr-24 bg-white/60 border border-white/80 rounded-full text-2xl font-bold focus:outline-none focus:ring-2 focus:ring-primary shadow-sm transition-all duration-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-10 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-6 w-6" /> : <Eye className="h-6 w-6" />}
                  </button>
                </div>
              </div>

              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <Alert variant="destructive" className="bg-red-50/50 backdrop-blur-md border-red-200/50 rounded-[2rem] p-6">
                      <AlertDescription className="text-lg font-bold flex items-center gap-3">
                        <Activity className="w-6 h-6" />
                        {error}
                      </AlertDescription>
                    </Alert>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="space-y-6 pt-4">
                <Button 
                  type="submit" 
                  className="w-full h-24 bg-slate-900 text-white hover:bg-slate-800 rounded-full font-bold text-3xl shadow-2xl transition-all duration-500 hover:scale-105"
                  disabled={isLoading || !email || !password}
                >
                  {isLoading ? 'Synchronizing...' : 'Establish Uplink'}
                </Button>

                <div className="flex items-center justify-center gap-4 py-4">
                  <div className="h-[1px] flex-1 bg-white/60" />
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Administrative Initialization</span>
                  <div className="h-[1px] flex-1 bg-white/60" />
                </div>

                <Button
                  type="button"
                  variant="outline"
                  className="w-full h-20 bg-white/40 backdrop-blur-xl border border-white/60 text-slate-900 hover:bg-white/60 rounded-full font-bold text-xl transition-all duration-500"
                  onClick={handleSignUp}
                  disabled={isLoading || !email || !password || email !== allowedEmail}
                >
                  {isLoading ? 'Architecting...' : 'Initialize Admin Protocol'}
                </Button>
              </div>
            </form>
          </CardContent>
          
          <div className="bg-slate-900/5 p-12 text-center border-t border-white/60">
             <div className="mt-4 text-slate-400 text-[10px] font-black uppercase tracking-[0.4em] flex items-center justify-center gap-6">
              <Cpu className="w-5 h-5 text-primary" /> Absolute Operational Sovereignty Only.
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
