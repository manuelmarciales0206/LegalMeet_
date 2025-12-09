import React, { useState } from 'react';
import { Eye, EyeOff, ArrowRight, User as UserIcon, Scale } from 'lucide-react';
import { UserRole } from '../types';

interface LoginProps {
  onLogin: (role: UserRole) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>('client');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate network delay
    setTimeout(() => {
      setIsLoading(false);
      onLogin(selectedRole);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden animate-fade-in">
        
        {/* Header con el nuevo Logo */}
        <div className="bg-brand-800 p-8 text-center relative overflow-hidden">
          {/* Efecto de fondo sutil para dar tecnología */}
          <div className="absolute inset-0 bg-gradient-to-br from-brand-900 to-brand-800 opacity-100"></div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/circuit-board.png')] opacity-10"></div>
          
          <div className="relative z-10 flex flex-col items-center">
            <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-sm shadow-2xl border border-white/10 mb-4">
              <img 
                src="/logo.jpg" 
                alt="LegalMeet Logo" 
                className="w-24 h-24 object-contain drop-shadow-md" 
                onError={(e) => e.currentTarget.src = "https://via.placeholder.com/96?text=LM"} 
              />
            </div>
            {/* El logo ya trae el nombre, pero mantenemos el texto para accesibilidad si el logo no carga texto claro */}
            <h1 className="text-2xl font-bold text-white mb-1 tracking-tight">LegalMeet</h1>
            <p className="text-brand-100 text-sm font-medium opacity-90">Tu abogado a un clic, sin complicaciones.</p>
          </div>
        </div>

        {/* Form */}
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Role Selection */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-3 text-center">
                ¿Cómo deseas ingresar?
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setSelectedRole('client')}
                  className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${
                    selectedRole === 'client' 
                      ? 'border-action-600 bg-brand-50 text-brand-900 shadow-md' 
                      : 'border-slate-200 hover:border-action-200 text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  <UserIcon size={24} className={`mb-2 ${selectedRole === 'client' ? 'text-action-600' : 'text-slate-400'}`} />
                  <span className="text-xs font-bold">Soy Cliente</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedRole('lawyer')}
                  className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${
                    selectedRole === 'lawyer' 
                      ? 'border-action-600 bg-brand-50 text-brand-900 shadow-md' 
                      : 'border-slate-200 hover:border-action-200 text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  <Scale size={24} className={`mb-2 ${selectedRole === 'lawyer' ? 'text-action-600' : 'text-slate-400'}`} />
                  <span className="text-xs font-bold">Soy Abogado</span>
                </button>
              </div>
            </div>

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
                className="w-full px-4 py-3 rounded-lg border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-action-600 focus:border-transparent transition-all"
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
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-action-600 focus:border-transparent transition-all pr-12"
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
                ${isLoading ? 'bg-brand-900 opacity-70 cursor-wait' : 'bg-action-600 hover:bg-action-700 hover:shadow-lg hover:-translate-y-0.5'}
              `}
            >
              {isLoading ? (
                <span>Iniciando sesión...</span>
              ) : (
                <>
                  Ingresar como {selectedRole === 'client' ? 'Cliente' : 'Abogado'} <ArrowRight size={18} />
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
      
      <div className="mt-8 text-center max-w-xs">
         <p className="text-xs text-slate-400 mb-2">Conectamos personas con abogados certificados. Asesoría legal accesible y confiable en Colombia.</p>
         <p className="text-xs text-slate-300">Plataforma segura y encriptada.</p>
      </div>
    </div>
  );
};

export default Login;