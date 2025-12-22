import React from 'react';
import { 
  LayoutDashboard, 
  Briefcase, 
  Calendar, 
  Users, 
  User as UserIcon, 
  BookOpen, 
  DollarSign, 
  FileText, 
  HelpCircle, 
  Settings,
  LogOut
} from 'lucide-react';
import { ViewState, User } from '../types';

interface LawyerSidebarProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
  isMobileOpen: boolean;
  closeMobileMenu: () => void;
  user: User | null;
}

const LawyerSidebar: React.FC<LawyerSidebarProps> = ({ currentView, setView, isMobileOpen, closeMobileMenu, user }) => {
  
  const NavItem = ({ view, icon: Icon, label }: { view: ViewState; icon: React.ElementType; label: string }) => (
    <button
      onClick={() => {
        setView(view);
        closeMobileMenu();
      }}
      className={`w-full flex items-center space-x-3 px-4 py-3 text-sm font-medium transition-colors rounded-lg mb-1
        ${currentView === view 
          ? 'bg-action-600 text-white shadow-md' 
          : 'text-slate-400 hover:bg-white/10 hover:text-white'
        }`}
    >
      <Icon size={18} className={currentView === view ? 'text-white' : 'text-slate-400'} />
      <span>{label}</span>
    </button>
  );

  const SectionTitle = ({ title }: { title: string }) => (
    <div className="px-4 mt-6 mb-2 text-xs font-bold text-slate-500 uppercase tracking-wider opacity-70">
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

      {/* Sidebar Container - Dark Theme for Lawyers too */}
      <aside className={`
        fixed top-0 left-0 bottom-0 w-64 bg-brand-800 border-r border-brand-900 z-30 transition-transform duration-300 ease-in-out overflow-y-auto
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 md:static
      `}>
        {/* Logo Area */}
        <div className="h-20 flex items-center px-6 border-b border-brand-900/50">
          <div className="flex items-center space-x-3">
             <img 
               src="https://raw.githubusercontent.com/manuelmarciales0206/LegalMeet_/main/public/logo.jpg" 
               alt="LegalMeet" 
               className="w-10 h-10 object-contain drop-shadow" 
               onError={(e) => e.currentTarget.src = "https://via.placeholder.com/40?text=LM"} 
             />
             <span className="text-xl font-bold tracking-tight text-white">LegalMeet</span>
          </div>
        </div>

        {/* Navigation Content */}
        <nav className="p-4">
          <SectionTitle title="Principal" />
          <NavItem view={ViewState.LAWYER_DASHBOARD} icon={LayoutDashboard} label="Dashboard" />
          <NavItem view={ViewState.LAWYER_CASES} icon={Briefcase} label="Mis Casos" />
          <NavItem view={ViewState.LAWYER_AGENDA} icon={Calendar} label="Mi Agenda" />
          <NavItem view={ViewState.LAWYER_CLIENTS} icon={Users} label="Mis Clientes" />

          <SectionTitle title="Mi Práctica" />
          <NavItem view={ViewState.LAWYER_PROFILE} icon={UserIcon} label="Perfil Profesional" />
          <NavItem view={ViewState.LAWYER_JURISPRUDENCE} icon={BookOpen} label="Jurisprudencia" />
          <NavItem view={ViewState.LAWYER_EARNINGS} icon={DollarSign} label="Mis Ingresos" />
          <NavItem view={ViewState.LAWYER_DOCUMENTS} icon={FileText} label="Documentos" />

          <SectionTitle title="Soporte" />
          <NavItem view={ViewState.SUPPORT} icon={HelpCircle} label="Ayuda" />
          <button 
             onClick={() => setView(ViewState.LAWYER_SETTINGS)}
             className={`w-full flex items-center space-x-3 px-4 py-3 text-sm font-medium transition-colors rounded-lg mb-1 text-slate-400 hover:bg-white/10 hover:text-white`}
          >
             <Settings size={18} className="text-slate-400" />
             <span>Configuración</span>
          </button>
        </nav>

        {/* User Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-brand-900 bg-brand-900/50">
          <div className="flex items-center space-x-3">
            <img 
              src={user?.avatarUrl || "https://picsum.photos/100/100"} 
              alt="User" 
              className="w-10 h-10 rounded-full border border-slate-600"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{user?.name}</p>
              <p className="text-xs text-action-600 font-bold truncate">Abogado</p>
            </div>
            <button className="text-slate-400 hover:text-red-400">
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default LawyerSidebar;