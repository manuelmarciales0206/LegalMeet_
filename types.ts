
export enum ViewState {
  LOGIN = 'LOGIN',
  
  // Client Views
  DASHBOARD = 'DASHBOARD',
  MY_APPOINTMENTS = 'MY_APPOINTMENTS',
  PROFILE = 'PROFILE',
  SUPPORT = 'SUPPORT',

  // Lawyer Views
  LAWYER_DASHBOARD = 'LAWYER_DASHBOARD',
  LAWYER_AGENDA = 'LAWYER_AGENDA',
  LAWYER_CLIENTS = 'LAWYER_CLIENTS',
  LAWYER_PROFILE = 'LAWYER_PROFILE',
  LAWYER_EARNINGS = 'LAWYER_EARNINGS',
  LAWYER_REGISTRATION = 'LAWYER_REGISTRATION',
  LAWYER_CASES = 'LAWYER_CASES',
  LAWYER_JURISPRUDENCE = 'LAWYER_JURISPRUDENCE',
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

export interface LawyerProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatarUrl: string;
  specialty: string;
  secondarySpecialties: string[];
  yearsExperience: number;
  university: string;
  rating: number;
  reviewCount: number;
  priceInitialConsultation: number;
  pricePerHour: number;
  description: string;
  tags: string[];
  availability: {
    video: boolean;
    chat: boolean;
    inPerson?: boolean;
  };
  // Extended fields for mock data and professional profile
  postgraduate?: string;
  professionalCard?: string;
  schedule?: Record<string, { start: string; end: string }[]>;
  languages?: string[];
  city?: string;
  isOnline?: boolean;
  totalCases?: number;
  activeCases?: number;
}

export interface Case {
  id: string;
  title: string;
  description: string;
  category: CaseCategory;
  status: 'active' | 'draft' | 'closed';
  lawyerName?: string;
  lawyerId?: string;
  createdAt: string;
  // Progress tracking fields used in UI
  progress?: number;
  nextAction?: string;
}

export interface LawyerCase {
  id: string;
  clientId: string;
  clientName: string;
  clientAvatar: string;
  title: string;
  category: string;
  description: string;
  status: string;
  startDate: string;
  lastUpdate: string;
  nextHearing?: string;
  fee: number;
  feeStatus: 'paid' | 'partial' | 'unpaid';
  documents: { name: string; date: string; type: string }[];
  timeline: { date: string; action: string; description: string }[];
  notes: string;
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

export interface Transaction {
  id: string;
  clientId: string;
  clientName: string;
  caseId: string;
  caseTitle: string;
  amount: number;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  paymentMethod: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
