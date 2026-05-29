import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, LogIn, UserPlus } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

export default function Login() {
  const navigate = useNavigate();
  const { login, register } = useAuthStore();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isLogin) {
      const success = await login(formData.email, formData.password);
      if (success) {
        navigate('/account');
      } else {
        setError('Invalid email or password. Try admin@maisonaura.com / admin123');
      }
    } else {
      const success = await register(formData.name, formData.email, formData.password);
      if (success) {
        navigate('/account');
      } else {
        setError('Registration failed. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
      <div className="w-full max-w-md px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-2xl p-8"
        >
          <div className="text-center mb-8">
            <h1 className="font-serif text-3xl text-offwhite mb-2">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p className="text-offwhite/50 text-sm">
              {isLogin ? 'Sign in to access your account' : 'Join Maison Aura today'}
            </p>
          </div>

          {error && (
            <div className="mb-6 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-sm text-offwhite/60 mb-2">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-dark/50 border border-gold/20 rounded-lg px-4 py-3 text-offwhite focus:border-gold/50 focus:outline-none"
                  placeholder="John Doe"
                />
              </div>
            )}
            <div>
              <label className="block text-sm text-offwhite/60 mb-2">Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-dark/50 border border-gold/20 rounded-lg px-4 py-3 text-offwhite focus:border-gold/50 focus:outline-none"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm text-offwhite/60 mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={e => setFormData({ ...formData, password: e.target.value })}
                  className="w-full bg-dark/50 border border-gold/20 rounded-lg px-4 py-3 pr-12 text-offwhite focus:border-gold/50 focus:outline-none"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-offwhite/40 hover:text-offwhite"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              className="w-full py-3.5 bg-gold text-dark font-medium rounded-lg hover:bg-gold-light transition-colors flex items-center justify-center gap-2"
            >
              {isLogin ? <LogIn className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
              {isLogin ? 'Sign In' : 'Create Account'}
            </motion.button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => { setIsLogin(!isLogin); setError(''); }}
              className="text-gold hover:text-gold-light text-sm transition-colors"
            >
              {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
            </button>
          </div>

          {isLogin && (
            <div className="mt-6 p-4 rounded-lg bg-gold/5 border border-gold/10">
              <p className="text-xs text-offwhite/50 mb-2">Demo Credentials:</p>
              <p className="text-xs text-offwhite/40">Admin: admin@maisonaura.com / admin123</p>
              <p className="text-xs text-offwhite/40">User: user@example.com / user123</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
