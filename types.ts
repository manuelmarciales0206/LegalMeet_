
export enum ViewState {
  LOGIN = 'LOGIN',
  
  // Client Views
  DASHBOARD = 'DASHBOARD',
  FIND_LAWYER = 'FIND_LAWYER',
  MY_CASES = 'MY_CASES',
  MY_APPOINTMENTS = 'MY_APPOINTMENTS',
  PROFILE = 'PROFILE',
  DOCUMENTS = 'DOCUMENTS',
  SUPPORT = 'SUPPORT',

  // Lawyer Views
  LAWYER_DASHBOARD = 'LAWYER_DASHBOARD',
  LAWYER_CASES = 'LAWYER_CASES',
  LAWYER_AGENDA = 'LAWYER_AGENDA',
  LAWYER_CLIENTS = 'LAWYER_CLIENTS',
  LAWYER_PROFILE = 'LAWYER_PROFILE',
  LAWYER_JURISPRUDENCE = 'LAWYER_JURISPRUDENCE',
  LAWYER_EARNINGS = 'LAWYER_EARNINGS',
  LAWYER_DOCUMENTS = 'LAWYER_DOCUMENTS',
  LAWYER_SETTINGS = 'LAWYER_SETTINGS',
}

export type CaseCategory = 'Penal' | 'Procesal' | 'Familiar' | 'Laboral' | 'Civil' | 'Comercial' | 'Otro';

export type UserRole = 'client' | 'lawyer';

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  plan: 'Básico' | 'Premium';
  role: UserRole;
}

// Deprecated simple lawyer interface, kept for compatibility if needed, 
// but preferred use is LawyerProfile
export interface Lawyer {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  reviews: number;
  pricePerSession: number; 
  available: boolean;
  imageUrl: string;
  badges: string[];
  categories: CaseCategory[];
}

export interface LawyerProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatarUrl: string;
  specialty: CaseCategory;
  secondarySpecialties: CaseCategory[];
  yearsExperience: number;
  university: string;
  postgraduate?: string;
  professionalCard: string;
  rating: number;
  reviewCount: number;
  priceInitialConsultation: number;
  pricePerHour: number;
  description: string;
  tags: string[];
  availability: {
    video: boolean;
    chat: boolean;
    inPerson: boolean;
  };
  schedule: {
    [key: string]: { start: string; end: string }[];
  };
  languages: string[];
  city: string;
  isOnline: boolean;
  totalCases: number;
  activeCases: number;
  cvUrl?: string;
}

export interface ClientRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatarUrl: string;
  totalCases: number;
  activeCases: number;
  firstContactDate: string;
  lastContactDate: string;
}

export interface LawyerCase {
  id: string;
  clientId: string;
  clientName: string;
  clientAvatar: string;
  title: string;
  category: CaseCategory;
  description: string;
  status: 'pending_acceptance' | 'active' | 'waiting_documents' | 'in_court' | 'resolved' | 'cancelled';
  startDate: string;
  lastUpdate: string;
  nextHearing?: string;
  fee: number;
  feeStatus: 'pending' | 'partial' | 'paid';
  documents: { name: string; date: string; type: string }[];
  timeline: { date: string; action: string; description: string }[];
  notes: string;
}

export interface Transaction {
  id: string;
  clientId: string;
  clientName: string;
  caseId: string;
  caseTitle: string;
  amount: number;
  date: string;
  status: 'completed' | 'pending' | 'processing';
  paymentMethod: string;
}

export interface JurisprudenceSearch {
  id: string;
  query: string;
  date: string;
  resultSummary: string;
}

export interface Case {
  id: string;
  title: string;
  description?: string;
  category?: CaseCategory;
  status: 'active' | 'pending' | 'closed' | 'draft';
  lawyerName?: string;
  lawyerId?: string;
  lastUpdate: string;
  progress: number; // 0 to 100
  nextAction: string;
}

export interface Appointment {
  id: string;
  lawyerName: string;
  lawyerId?: string;
  caseId?: string; 
  caseTitle?: string;
  date: string;
  time: string;
  type: 'video' | 'chat' | 'call';
  status: 'upcoming' | 'completed' | 'cancelled';
  price?: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
