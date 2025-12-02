
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Login from './views/Login';
import Dashboard from './views/Dashboard';
import FindLawyer from './views/FindLawyer';
import MyCases from './views/MyCases';
import Support from './views/Support';
import { ViewState, Case, Appointment, CaseCategory, User } from './types';
import EmptyState from './components/EmptyState';
import { WifiOff, CreditCard, Heart, FileText } from 'lucide-react';

// DEMO USER DATA
const DEMO_USER: User = {
  id: 'u1',
  name: 'Giovanny Tocarruncho',
  email: 'giovanny.tocarruncho@gmail.com.com',
  avatarUrl: 'https://juanluisserranoespinosa.comercialdesevilla.es/wp-content/uploads/sites/39/2020/08/perfil-avatar-hombre-icono-redondo_24640-14044.jpg', // Using generic women image id
  plan: 'Básico'
};

// DEMO DATA - Consistency: Camila has a commercial case with Dr. Jorge.
const MOCK_UPCOMING_APPT: Appointment = {
  id: 'a1',
  lawyerName: 'Dr. Jorge Rodríguez',
  caseId: 'c1',
  caseTitle: 'Deuda Proveedor Local',
  date: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
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
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.DASHBOARD);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cases, setCases] = useState<Case[]>(INITIAL_CASES);
  
  // State to track the "Draft" case coming from Dashboard
  const [currentDraftCaseId, setCurrentDraftCaseId] = useState<string | null>(null);

  // AUTH HANDLERS
  const handleLogin = () => {
    setUser(DEMO_USER);
    setIsAuthenticated(true);
    setCurrentView(ViewState.DASHBOARD);
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setCases(INITIAL_CASES); // Reset demo state
  };

  const getPageTitle = (view: ViewState) => {
    switch(view) {
      case ViewState.DASHBOARD: return 'Inicio';
      case ViewState.FIND_LAWYER: return 'Buscar Abogado';
      case ViewState.MY_CASES: return 'Mis Casos';
      case ViewState.MY_APPOINTMENTS: return 'Mis Citas';
      case ViewState.SUPPORT: return 'Ayuda y Soporte';
      case ViewState.PROFILE: return 'Mi Perfil';
      case ViewState.DOCUMENTS: return 'Mis Documentos';
      default: return 'LegalMeet';
    }
  };

  const handleCreateDraftCase = (description: string, category: CaseCategory) => {
    const newCase: Case = {
      id: `c${Date.now()}`,
      title: `${category}: ${description.substring(0, 25)}...`, // Suggested title
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
            alert(`Flujo de Agendamiento Demo:\n\nCita creada con ${lawyerName}\nVinculada al caso: ${draftCase?.title || 'Nuevo Asunto'}\n\nEn la app real, esto abriría el selector de hora.`);
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
          onNewCase={() => setCurrentView(ViewState.DASHBOARD)} // Sends back to intake
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
         // Reusing Dashboard appointment for demo list or showing empty
         return (
           <div className="max-w-4xl mx-auto space-y-4">
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
      default:
        // Generic "Under Construction" / Error State for other views
        return (
           <EmptyState 
             icon={WifiOff}
             title="Sección en construcción"
             description="Esta funcionalidad estará disponible pronto en la versión completa de LegalMeet."
             variant="error"
             actionLabel="Volver al Inicio"
             onAction={() => setCurrentView(ViewState.DASHBOARD)}
           />
        );
    }
  };

  // MAIN RENDER
  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900 font-sans">
      <Sidebar 
        currentView={currentView} 
        setView={setCurrentView} 
        isMobileOpen={isMobileMenuOpen}
        closeMobileMenu={() => setIsMobileMenuOpen(false)}
      />
      
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
