
export enum ViewState {
  LOGIN = 'LOGIN',
  DASHBOARD = 'DASHBOARD',
  FIND_LAWYER = 'FIND_LAWYER',
  MY_CASES = 'MY_CASES',
  MY_APPOINTMENTS = 'MY_APPOINTMENTS',
  PROFILE = 'PROFILE',
  DOCUMENTS = 'DOCUMENTS',
  SUPPORT = 'SUPPORT',
}

export type CaseCategory = 'Penal' | 'Procesal' | 'Familiar' | 'Laboral' | 'Civil' | 'Comercial' | 'Otro';

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  plan: 'Básico' | 'Premium';
}

export interface Lawyer {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  reviews: number;
  pricePerSession: number; // in COP
  available: boolean;
  imageUrl: string;
  badges: string[];
  categories: CaseCategory[];
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
  caseId?: string; // Linked to a specific case
  caseTitle?: string;
  date: string;
  time: string;
  type: 'video' | 'chat' | 'call';
  status: 'upcoming' | 'completed' | 'cancelled';
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
