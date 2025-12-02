
import React, { useState } from 'react';
import { Menu, Bell, MessageSquare, ChevronDown, LogOut, User as UserIcon, Settings } from 'lucide-react';
import { User } from '../types';

interface HeaderProps {
  toggleMobileMenu: () => void;
  title: string;
  user: User | null;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleMobileMenu, title, user, onLogout }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <header className="h-16 bg-white border-b border-slate-200 sticky top-0 z-10 px-4 md:px-8 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleMobileMenu}
          className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
          aria-label="Abrir menú"
        >
          <Menu size={24} />
        </button>
        <h1 className="text-xl font-bold text-slate-800">{title}</h1>
      </div>

      <div className="flex items-center space-x-3 md:space-x-5">
        <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors" aria-label="Mensajes">
          <MessageSquare size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </button>
        <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors" aria-label="Notificaciones">
          <Bell size={20} />
          <span className="absolute top-2 right-2.5 w-2 h-2 bg-brand-800 rounded-full"></span>
        </button>
        
        <div className="h-6 w-px bg-slate-200 mx-2 hidden md:block"></div>

        {/* User Dropdown */}
        <div className="relative">
          <button 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-3 hover:bg-slate-50 p-1.5 rounded-lg transition-colors border border-transparent hover:border-slate-100"
          >
            <img 
              src={user?.avatarUrl || "https://picsum.photos/100/100"} 
              alt={user?.name} 
              className="w-8 h-8 rounded-full border border-slate-200 object-cover"
            />
            <div className="hidden md:block text-left">
              <p className="text-sm font-bold text-slate-700 leading-none">{user?.name}</p>
              <p className="text-[10px] text-slate-500 font-medium">{user?.plan}</p>
            </div>
            <ChevronDown size={16} className="text-slate-400 hidden md:block" />
          </button>

          {isProfileOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setIsProfileOpen(false)}></div>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-100 py-1 z-20 animate-fade-in">
                <div className="px-4 py-3 border-b border-slate-50 md:hidden">
                  <p className="text-sm font-bold text-slate-900">{user?.name}</p>
                  <p className="text-xs text-slate-500">{user?.email}</p>
                </div>
                <button className="w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2">
                  <UserIcon size={16} /> Mi Perfil
                </button>
                <button className="w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2">
                  <Settings size={16} /> Configuración
                </button>
                <div className="border-t border-slate-50 my-1"></div>
                <button 
                  onClick={onLogout}
                  className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 font-medium"
                >
                  <LogOut size={16} /> Cerrar sesión
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
