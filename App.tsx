
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import LawyerSidebar from './components/LawyerSidebar';
import Header from './components/Header';
import Login from './views/Login';
import Dashboard from './views/Dashboard';
import MyAppointments from './views/MyAppointments';
import Support from './views/Support';
import Profile from './views/Profile';
import LawyerDashboard from './views/lawyer/LawyerDashboard';
import LawyerAgenda from './views/lawyer/LawyerAgenda';
import LawyerClients from './views/lawyer/LawyerClients';
import LawyerProfileView from './views/lawyer/LawyerProfile';
import LawyerEarnings from './views/lawyer/LawyerEarnings';
import LawyerRegistration from './views/lawyer/LawyerRegistration';
import { ViewState, User, UserRole, Appointment } from './types';
import EmptyState from './components/EmptyState';
import { WifiOff } from 'lucide-react';

const LOGO_URL = "https://raw.githubusercontent.com/manuelmarciales0206/LegalMeet_/main/public/logo.jpg";

const DEMO_USER: User = {
  id: 'u1',
  name: 'Giovanny Tocarruncho',
  email: 'giovanny.tocarruncho@gmail.com',
  avatarUrl: 'https://i.pravatar.cc/150?img=12',
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

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.LOGIN);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    // 1. Cargar Auth
    const storedAuth = localStorage.getItem('legalmeet_auth');
    if (storedAuth) {
      const { user: storedUser } = JSON.parse(storedAuth);
      setUser(storedUser);
      setIsAuthenticated(true);
      setCurrentView(storedUser.role === 'lawyer' ? ViewState.LAWYER_DASHBOARD : ViewState.DASHBOARD);
    }

    // 2. Cargar Citas
    const storedAppointments = localStorage.getItem('legalmeet_appointments');
    if (storedAppointments) {
      setAppointments(JSON.parse(storedAppointments));
    }

    // 3. Integración WhatsApp
    const params = new URLSearchParams(window.location.search);
    if (params.get('from_whatsapp') === 'true') {
      localStorage.setItem('legalmeet_whatsapp_data', JSON.stringify({
        tipo: params.get('tipo') || '',
        descripcion: decodeURIComponent(params.get('descripcion') || ''),
        telefono: params.get('telefono') || '',
        nombre: params.get('nombre') || '',
      }));
      // Si no está logueado, podríamos forzar login demo para la prueba
      if (!storedAuth) handleLogin('client');
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
    localStorage.removeItem('legalmeet_auth');
    setCurrentView(ViewState.LOGIN);
  };

  const getPageTitle = (view: ViewState) => {
    switch(view) {
      case ViewState.DASHBOARD: return 'Nueva Consulta';
      case ViewState.MY_APPOINTMENTS: return 'Mis Citas';
      case ViewState.SUPPORT: return 'Ayuda';
      case ViewState.PROFILE: return 'Mi Perfil';
      case ViewState.LAWYER_DASHBOARD: return 'Panel Abogado';
      case ViewState.LAWYER_AGENDA: return 'Mi Agenda';
      case ViewState.LAWYER_CLIENTS: return 'Clientes';
      case ViewState.LAWYER_PROFILE: return 'Perfil';
      case ViewState.LAWYER_EARNINGS: return 'Ingresos';
      case ViewState.LAWYER_REGISTRATION: return 'Registro Profesional';
      default: return 'LegalMeet';
    }
  };

  const renderView = () => {
    if (!user) return null;

    switch(currentView) {
      case ViewState.DASHBOARD:
        return <Dashboard 
          onAppointmentCreated={(newApt) => {
            const updated = [newApt, ...appointments];
            setAppointments(updated);
            localStorage.setItem('legalmeet_appointments', JSON.stringify(updated));
            setCurrentView(ViewState.MY_APPOINTMENTS);
          }} 
        />;
      case ViewState.MY_APPOINTMENTS:
        return <MyAppointments appointments={appointments} />;
      case ViewState.SUPPORT:
        return <Support />;
      case ViewState.PROFILE:
        return <Profile />;
      case ViewState.LAWYER_DASHBOARD:
        return <LawyerDashboard setView={setCurrentView} />;
      case ViewState.LAWYER_AGENDA:
        return <LawyerAgenda />;
      case ViewState.LAWYER_CLIENTS:
        return <LawyerClients />;
      case ViewState.LAWYER_PROFILE:
        return <LawyerProfileView />;
      case ViewState.LAWYER_EARNINGS:
        return <LawyerEarnings />;
      case ViewState.LAWYER_REGISTRATION:
        return <LawyerRegistration />;
      default:
        return <EmptyState icon={WifiOff} title="En construcción" description="Próximamente..." variant="error" onAction={() => setCurrentView(ViewState.DASHBOARD)} actionLabel="Volver al inicio" />;
    }
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900 font-sans">
      {user?.role === 'lawyer' ? (
        <LawyerSidebar currentView={currentView} setView={setCurrentView} isMobileOpen={isMobileMenuOpen} closeMobileMenu={() => setIsMobileMenuOpen(false)} user={user} />
      ) : (
        <Sidebar currentView={currentView} setView={setCurrentView} isMobileOpen={isMobileMenuOpen} closeMobileMenu={() => setIsMobileMenuOpen(false)} />
      )}
      
      <div className="flex-1 flex flex-col min-w-0">
        <Header 
          title={getPageTitle(currentView)} 
          toggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          user={user}
          onLogout={handleLogout}
        />
        <main className="flex-1 overflow-y-auto">
          {renderView()}
        </main>
      </div>
    </div>
  );
};

export default App;
