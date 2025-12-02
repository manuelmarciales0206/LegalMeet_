import React from 'react';
import { 
  LayoutDashboard, 
  Search, 
  Calendar, 
  Briefcase, 
  User, 
  FileText, 
  CreditCard, 
  Heart, 
  HelpCircle, 
  Settings,
  ShieldCheck,
  LogOut
} from 'lucide-react';
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
      className={`w-full flex items-center space-x-3 px-4 py-3 text-sm font-medium transition-colors rounded-lg mb-1
        ${currentView === view 
          ? 'bg-brand-800 text-white shadow-md' 
          : 'text-slate-600 hover:bg-slate-100 hover:text-brand-900'
        }`}
    >
      <Icon size={18} className={currentView === view ? 'text-white' : 'text-slate-400'} />
      <span>{label}</span>
    </button>
  );

  const SectionTitle = ({ title }: { title: string }) => (
    <div className="px-4 mt-6 mb-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
      {title}
    </div>
  );

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={closeMobileMenu}
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed top-0 left-0 bottom-0 w-64 bg-white border-r border-slate-200 z-30 transition-transform duration-300 ease-in-out overflow-y-auto
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 md:static
      `}>
        {/* Logo Area */}
        <div className="h-16 flex items-center px-6 border-b border-slate-100">
          <div className="flex items-center space-x-2 text-brand-900">
            <ShieldCheck size={28} strokeWidth={2.5} />
            <span className="text-xl font-bold tracking-tight">LegalMeet</span>
          </div>
        </div>

        {/* Navigation Content */}
        <nav className="p-4">
          <SectionTitle title="Principal" />
          <NavItem view={ViewState.DASHBOARD} icon={LayoutDashboard} label="Inicio" />
          <NavItem view={ViewState.FIND_LAWYER} icon={Search} label="Buscar Abogado" />
          <NavItem view={ViewState.MY_APPOINTMENTS} icon={Calendar} label="Mis Citas" />
          <NavItem view={ViewState.MY_CASES} icon={Briefcase} label="Mis Casos" />

          <SectionTitle title="Mi Cuenta" />
          <NavItem view={ViewState.PROFILE} icon={User} label="Perfil" />
          <NavItem view={ViewState.DOCUMENTS} icon={FileText} label="Documentos" />
          {/* Mock items for visual completeness */}
          <button className="w-full flex items-center space-x-3 px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-brand-900 rounded-lg mb-1">
             <CreditCard size={18} className="text-slate-400" />
             <span>Pagos</span>
          </button>
          <button className="w-full flex items-center space-x-3 px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-brand-900 rounded-lg mb-1">
             <Heart size={18} className="text-slate-400" />
             <span>Favoritos</span>
          </button>

          <SectionTitle title="Soporte" />
          <NavItem view={ViewState.SUPPORT} icon={HelpCircle} label="Ayuda" />
          <button className="w-full flex items-center space-x-3 px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-brand-900 rounded-lg mb-1">
             <Settings size={18} className="text-slate-400" />
             <span>Configuración</span>
          </button>
        </nav>

        {/* User Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-100 bg-slate-50">
          <div className="flex items-center space-x-3">
            <img 
              src="https://picsum.photos/100/100" 
              alt="User" 
              className="w-10 h-10 rounded-full border border-slate-200"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-900 truncate">Carlos Pérez</p>
              <p className="text-xs text-slate-500 truncate">Plan Básico</p>
            </div>
            <button className="text-slate-400 hover:text-red-600">
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
