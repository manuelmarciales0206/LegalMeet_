
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import LawyerSidebar from './components/LawyerSidebar';
import Header from './components/Header';
import Login from './views/Login';
import Dashboard from './views/Dashboard';
import FindLawyer from './views/FindLawyer';
import MyCases from './views/MyCases';
import Support from './views/Support';
import { ViewState, Case, Appointment, CaseCategory, User, UserRole } from './types';
import EmptyState from './components/EmptyState';
import { WifiOff, FileText } from 'lucide-react';

// Lawyer Views
import LawyerDashboard from './views/lawyer/LawyerDashboard';
import LawyerCases from './views/lawyer/LawyerCases';
import LawyerAgenda from './views/lawyer/LawyerAgenda';
import LawyerClients from './views/lawyer/LawyerClients';
import LawyerProfile from './views/lawyer/LawyerProfile';
import Jurisprudence from './views/lawyer/Jurisprudence';
import LawyerEarnings from './views/lawyer/LawyerEarnings';
import LawyerDocuments from './views/lawyer/LawyerDocuments';

// DEMO USERS
const DEMO_USER: User = {
  id: 'u1',
  name: 'Giovanny Tocarruncho',
  email: 'giovanny.tocarruncho@gmail.com',
  avatarUrl: 'https://juanluisserranoespinosa.comercialdesevilla.es/wp-content/uploads/sites/39/2020/08/perfil-avatar-hombre-icono-redondo_24640-14044.jpg',
  plan: 'Básico',
  role: 'client'
};

const DEMO_LAWYER_USER: User = {
  id: 'l1',
  name: 'Dra. Ana María González',
  email: 'ana.gonzalez@legalmeet.co',
  avatarUrl: 'https://i.pravatar.cc/150?img=5',
  plan: 'Premium',
  role: 'lawyer'
};

const MOCK_UPCOMING_APPT: Appointment = {
  id: 'a1',
  lawyerName: 'Dr. Jorge Rodríguez',
  caseId: 'c1',
  caseTitle: 'Deuda Proveedor Local',
  date: new Date(Date.now() + 86400000).toISOString(),
  time: '10:00 AM',
  type: 'video',
  status: 'upcoming'
};

const INITIAL_CASES: Case[] = [
  {
    id: 'c1',
    title: 'Deuda Proveedor Local',
    category: 'Comercial',
    description: 'Incumplimiento de contrato de suministro para mi local comercial. El proveedor no entrega la mercancía hace 2 meses.',
    status: 'active',
    lawyerName: 'Dr. Jorge Rodríguez',
    lawyerId: '2',
    lastUpdate: 'Hace 2 horas',
    progress: 45,
    nextAction: 'Revisión de facturas'
  },
  {
    id: 'c2',
    title: 'Consulta Divorcio',
    category: 'Familiar',
    description: 'Borrador inicial para consulta sobre custodia.',
    status: 'draft',
    lastUpdate: 'Ayer',
    progress: 0,
    nextAction: 'Buscar abogado'
  }
];

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.LOGIN);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Client specific state
  const [cases, setCases] = useState<Case[]>(INITIAL_CASES);
  const [currentDraftCaseId, setCurrentDraftCaseId] = useState<string | null>(null);

  useEffect(() => {
    // Check local storage
    const storedAuth = localStorage.getItem('legalmeet_auth');
    if (storedAuth) {
      const { user: storedUser } = JSON.parse(storedAuth);
      setUser(storedUser);
      setIsAuthenticated(true);
      setCurrentView(storedUser.role === 'lawyer' ? ViewState.LAWYER_DASHBOARD : ViewState.DASHBOARD);
    }

    // Check URL Params for pre-filling/auto-login logic (WhatsApp integration)
    const params = new URLSearchParams(window.location.search);
    if (params.get('tipo')) {
      if (!storedAuth) {
         // Auto login as demo client for smooth flow
         handleLogin('client');
      }
    }
  }, []);

  const handleLogin = (role: UserRole) => {
    const userToSet = role === 'lawyer' ? DEMO_LAWYER_USER : DEMO_USER;
    setUser(userToSet);
    setIsAuthenticated(true);
    setCurrentView(role === 'lawyer' ? ViewState.LAWYER_DASHBOARD : ViewState.DASHBOARD);
    localStorage.setItem('legalmeet_auth', JSON.stringify({ user: userToSet }));
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setCases(INITIAL_CASES);
    localStorage.removeItem('legalmeet_auth');
    setCurrentView(ViewState.LOGIN);
  };

  const getPageTitle = (view: ViewState) => {
    // Client Titles
    if (view === ViewState.DASHBOARD) return 'Inicio';
    if (view === ViewState.FIND_LAWYER) return 'Buscar Abogado';
    if (view === ViewState.MY_CASES) return 'Mis Casos';
    if (view === ViewState.MY_APPOINTMENTS) return 'Mis Citas';
    if (view === ViewState.SUPPORT) return 'Ayuda y Soporte';
    
    // Lawyer Titles
    if (view === ViewState.LAWYER_DASHBOARD) return 'Dashboard';
    if (view === ViewState.LAWYER_CASES) return 'Gestión de Casos';
    if (view === ViewState.LAWYER_AGENDA) return 'Agenda Semanal';
    if (view === ViewState.LAWYER_CLIENTS) return 'Clientes';
    if (view === ViewState.LAWYER_PROFILE) return 'Perfil Profesional';
    if (view === ViewState.LAWYER_JURISPRUDENCE) return 'Jurisprudencia IA';
    if (view === ViewState.LAWYER_EARNINGS) return 'Finanzas';
    if (view === ViewState.LAWYER_DOCUMENTS) return 'Documentos';

    return 'LegalMeet';
  };

  const handleCreateDraftCase = (description: string, category: CaseCategory) => {
    const newCase: Case = {
      id: `c${Date.now()}`,
      title: `${category}: ${description.substring(0, 25)}...`,
      description: description,
      category: category,
      status: 'draft',
      lastUpdate: 'Recién creado',
      progress: 0,
      nextAction: 'Seleccionar abogado'
    };
    
    setCases([newCase, ...cases]);
    setCurrentDraftCaseId(newCase.id);
    setCurrentView(ViewState.FIND_LAWYER);
  };

  const renderView = () => {
    switch(currentView) {
      // --- CLIENT VIEWS ---
      case ViewState.DASHBOARD:
        return <Dashboard 
          setView={setCurrentView} 
          upcomingAppointment={MOCK_UPCOMING_APPT}
          activeCases={cases}
          onCreateCase={handleCreateDraftCase}
        />;
      case ViewState.FIND_LAWYER:
        const draftCase = cases.find(c => c.id === currentDraftCaseId);
        return <FindLawyer 
          relatedCase={draftCase} 
          onSchedule={(lawyerId, lawyerName) => {
            // Mock scheduling success
            setCurrentView(ViewState.MY_APPOINTMENTS);
          }}
        />;
      case ViewState.MY_CASES:
        return <MyCases 
          cases={cases} 
          onScheduleForCase={(caseId) => {
             setCurrentDraftCaseId(caseId);
             setCurrentView(ViewState.FIND_LAWYER); 
          }}
          onNewCase={() => setCurrentView(ViewState.DASHBOARD)} 
        />;
      case ViewState.SUPPORT:
        return <Support />;
      case ViewState.DOCUMENTS:
        return (
          <EmptyState 
            icon={FileText}
            title="Aún no tienes documentos"
            description="Aquí podrás almacenar contratos, facturas y pruebas para tus casos de forma segura."
            actionLabel="Subir primer documento"
            onAction={() => alert('Demo: Abriría selector de archivos')}
          />
        );
      case ViewState.MY_APPOINTMENTS:
         return (
           <div className="max-w-4xl mx-auto space-y-4 animate-fade-in">
             <h2 className="text-2xl font-bold text-slate-800 mb-6">Mis Citas</h2>
             <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-900">{MOCK_UPCOMING_APPT.lawyerName}</h3>
                  <p className="text-sm text-slate-500">{MOCK_UPCOMING_APPT.caseTitle}</p>
                  <p className="text-xs font-bold text-brand-800 mt-1">Mañana, {MOCK_UPCOMING_APPT.time}</p>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full uppercase">Confirmada</span>
             </div>
           </div>
         );

      // --- LAWYER VIEWS ---
      case ViewState.LAWYER_DASHBOARD:
        return <LawyerDashboard setView={setCurrentView} />;
      case ViewState.LAWYER_CASES:
        return <LawyerCases setView={setCurrentView} />;
      case ViewState.LAWYER_AGENDA:
        return <LawyerAgenda />;
      case ViewState.LAWYER_CLIENTS:
        return <LawyerClients />;
      case ViewState.LAWYER_PROFILE:
        return <LawyerProfile />;
      case ViewState.LAWYER_JURISPRUDENCE:
        return <Jurisprudence />;
      case ViewState.LAWYER_EARNINGS:
        return <LawyerEarnings />;
      case ViewState.LAWYER_DOCUMENTS:
        return <LawyerDocuments />;
        
      default:
        return (
           <EmptyState 
             icon={WifiOff}
             title="Sección en construcción"
             description="Esta funcionalidad estará disponible pronto."
             variant="error"
             actionLabel="Volver al Inicio"
             onAction={() => setCurrentView(user?.role === 'lawyer' ? ViewState.LAWYER_DASHBOARD : ViewState.DASHBOARD)}
           />
        );
    }
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900 font-sans">
      {user?.role === 'lawyer' ? (
        <LawyerSidebar 
          currentView={currentView} 
          setView={setCurrentView} 
          isMobileOpen={isMobileMenuOpen}
          closeMobileMenu={() => setIsMobileMenuOpen(false)}
          user={user}
        />
      ) : (
        <Sidebar 
          currentView={currentView} 
          setView={setCurrentView} 
          isMobileOpen={isMobileMenuOpen}
          closeMobileMenu={() => setIsMobileMenuOpen(false)}
        />
      )}
      
      <div className="flex-1 flex flex-col min-w-0">
        <Header 
          title={getPageTitle(currentView)} 
          toggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          user={user}
          onLogout={handleLogout}
        />
        
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          {renderView()}
        </main>
      </div>
    </div>
  );
};

export default App;
