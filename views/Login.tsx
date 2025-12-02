
import React, { useState } from 'react';
import { ShieldCheck, Eye, EyeOff, ArrowRight } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate network delay
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden animate-fade-in">
        
        {/* Header */}
        <div className="bg-brand-800 p-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-white/10 p-3 rounded-xl backdrop-blur-sm">
              <ShieldCheck size={40} className="text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white mb-1">LegalMeet</h1>
          <p className="text-brand-100 text-sm font-medium">Tu abogado a un clic, sin complicaciones.</p>
        </div>

        {/* Form */}
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-bold text-slate-700 mb-1.5">
                Correo electrónico o celular
              </label>
              <input
                id="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ejemplo@correo.com"
                className="w-full px-4 py-3 rounded-lg border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                required
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="password" className="block text-sm font-bold text-slate-700">
                  Contraseña
                </label>
                <button type="button" className="text-xs font-medium text-action-600 hover:text-action-700">
                  ¿Olvidaste tu contraseña?
                </button>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`
                w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-white font-bold text-base transition-all
                ${isLoading ? 'bg-brand-900 opacity-70 cursor-wait' : 'bg-brand-800 hover:bg-brand-900 hover:shadow-lg hover:-translate-y-0.5'}
              `}
            >
              {isLoading ? (
                <span>Iniciando sesión...</span>
              ) : (
                <>
                  Ingresar <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-slate-500">
              ¿Aún no tienes cuenta?{' '}
              <button className="text-action-600 font-bold hover:underline">
                Registrarme gratis
              </button>
            </p>
          </div>
        </div>
      </div>
      
      <p className="mt-8 text-xs text-slate-400 text-center max-w-xs">
        Plataforma segura y encriptada. Tus datos legales están protegidos bajo estándares bancarios.
      </p>
    </div>
  );
};

export default Login;
