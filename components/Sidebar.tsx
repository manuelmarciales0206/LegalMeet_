
import React from 'react';
import { LayoutDashboard, Calendar, HelpCircle, User, LogOut } from 'lucide-react';
import { ViewState } from '../types';

interface SidebarProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
  isMobileOpen: boolean;
  closeMobileMenu: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView, isMobileOpen, closeMobileMenu }) => {
  const NavItem = ({ view, icon: Icon, label }: { view: ViewState; icon: React.ElementType; label: string }) => (
    <button
      onClick={() => {
        setView(view);
        closeMobileMenu();
      }}
      className={`w-full flex items-center space-x-3 px-4 py-3.5 text-sm font-bold transition-all rounded-xl mb-2
        ${currentView === view 
          ? 'bg-action-600 text-white shadow-lg translate-x-1' 
          : 'text-slate-400 hover:bg-white/5 hover:text-white'
        }`}
    >
      <Icon size={20} />
      <span>{label}</span>
    </button>
  );

  return (
    <>
      {isMobileOpen && <div className="fixed inset-0 bg-black/50 z-20 md:hidden" onClick={closeMobileMenu} />}
      <aside className={`fixed top-0 left-0 bottom-0 w-64 bg-brand-800 z-30 transition-transform duration-300 md:translate-x-0 md:static ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-24 flex items-center px-8">
          <div className="flex items-center space-x-3">
            <img src="https://raw.githubusercontent.com/manuelmarciales0206/LegalMeet_/main/public/logo.jpg" alt="Logo" className="w-12 h-12 rounded-xl" />
            <span className="text-xl font-black text-white tracking-tight">LegalMeet</span>
          </div>
        </div>
        <nav className="p-4 mt-4">
          <NavItem view={ViewState.DASHBOARD} icon={LayoutDashboard} label="Nueva Consulta" />
          <NavItem view={ViewState.MY_APPOINTMENTS} icon={Calendar} label="Mis Citas" />
          <NavItem view={ViewState.SUPPORT} icon={HelpCircle} label="Ayuda" />
          <NavItem view={ViewState.PROFILE} icon={User} label="Mi Perfil" />
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-6">
           <button className="w-full flex items-center space-x-3 px-4 py-3 text-sm font-bold text-red-400 hover:bg-red-500/10 rounded-xl transition-all">
             <LogOut size={20} />
             <span>Cerrar Sesión</span>
           </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
