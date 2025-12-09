
import { LawyerProfile, LawyerCase, ClientRecord, Transaction, CaseCategory } from '../types';

// Helper to generate schedule
const standardSchedule = {
  'lunes': [{ start: '08:00', end: '12:00' }, { start: '14:00', end: '18:00' }],
  'martes': [{ start: '08:00', end: '12:00' }, { start: '14:00', end: '18:00' }],
  'miércoles': [{ start: '08:00', end: '12:00' }],
  'jueves': [{ start: '08:00', end: '12:00' }, { start: '14:00', end: '18:00' }],
  'viernes': [{ start: '08:00', end: '12:00' }],
};

const universities = [
  'Universidad Nacional de Colombia', 'Universidad de los Andes', 'Pontificia Universidad Javeriana',
  'Universidad del Rosario', 'Universidad Externado de Colombia', 'Universidad de Antioquia',
  'Universidad del Norte', 'Universidad EAFIT', 'Universidad de Medellín', 'Universidad Libre'
];

const cities = ['Bogotá', 'Medellín', 'Cali', 'Barranquilla', 'Bucaramanga', 'Cartagena'];

// Base generator function
const createLawyer = (i: number, specialty: CaseCategory): LawyerProfile => ({
  id: `law${i}`,
  name: [
    'Dr. Carlos Andrés Mendoza', 'Dra. Patricia Restrepo', 'Dr. Jorge Rodríguez', 'Dra. Ana María González', 
    'Dr. Felipe Martínez', 'Dra. Camila Torres', 'Dr. Juan Pablo Uribe', 'Dra. Sofia Vergara', 
    'Dr. Alejandro Gaviria', 'Dra. Valentina Castro', 'Dr. Santiago Botero', 'Dra. Lucía Méndez',
    'Dr. Gabriel García', 'Dra. Isabela Henao', 'Dr. Mateo Londoño', 'Dra. Valeria Duque',
    'Dr. Samuel Restrepo', 'Dra. Mariana Pajón', 'Dr. Nicolás Echeverry', 'Dra. Daniela Ospina',
    'Dr. David Vélez', 'Dra. Gabriela Tafur', 'Dr. Andrés Cepeda', 'Dra. Shakira Mebarak', 'Dr. Juanes Aristizábal'
  ][i-1] || `Abogado ${i}`,
  email: `abogado${i}@legalmeet.co`,
  phone: `+57 300 ${1000000 + i}`,
  avatarUrl: `https://i.pravatar.cc/150?img=${i + 10}`,
  specialty,
  secondarySpecialties: i % 2 === 0 ? ['Civil'] : ['Comercial'],
  yearsExperience: Math.floor(Math.random() * 20) + 3,
  university: universities[i % universities.length],
  postgraduate: i % 3 === 0 ? `Especialización en Derecho ${specialty}` : undefined,
  professionalCard: `TP-${200000 + i}`,
  rating: 3.8 + (Math.random() * 1.2), // 3.8 to 5.0
  reviewCount: Math.floor(Math.random() * 200) + 10,
  priceInitialConsultation: Math.floor(Math.random() * (20 - 6) + 6) * 10000, // 60k to 200k
  pricePerHour: Math.floor(Math.random() * (30 - 15) + 15) * 10000,
  description: `Abogado especialista en derecho ${specialty} con amplia experiencia y enfoque en resultados. Compromiso total con la defensa de sus intereses.`,
  tags: ['Respuesta rápida', 'Experiencia', 'Bilingüe'],
  availability: { video: true, chat: true, inPerson: i % 2 === 0 },
  schedule: standardSchedule,
  languages: i % 3 === 0 ? ['Español', 'Inglés'] : ['Español'],
  city: cities[i % cities.length],
  isOnline: Math.random() > 0.7,
  totalCases: Math.floor(Math.random() * 500) + 50,
  activeCases: Math.floor(Math.random() * 15) + 2
});

// Generate 25 lawyers
export const MOCK_LAWYERS: LawyerProfile[] = [
  ...Array.from({ length: 5 }, (_, i) => createLawyer(i + 1, 'Laboral')),
  ...Array.from({ length: 5 }, (_, i) => createLawyer(i + 6, 'Penal')),
  ...Array.from({ length: 5 }, (_, i) => createLawyer(i + 11, 'Familiar')),
  ...Array.from({ length: 5 }, (_, i) => createLawyer(i + 16, 'Civil')),
  ...Array.from({ length: 5 }, (_, i) => createLawyer(i + 21, 'Comercial')),
];

export const MOCK_CLIENTS: ClientRecord[] = [
  {
    id: 'cl1',
    name: 'Juan Carlos Pérez',
    email: 'juan.perez@email.com',
    phone: '+57 300 123 4567',
    avatarUrl: 'https://i.pravatar.cc/150?img=33',
    totalCases: 2,
    activeCases: 1,
    firstContactDate: '2024-06-15',
    lastContactDate: '2024-12-01'
  },
  {
    id: 'cl2',
    name: 'María Fernanda López',
    email: 'maria.lopez@email.com',
    phone: '+57 310 987 6543',
    avatarUrl: 'https://i.pravatar.cc/150?img=44',
    totalCases: 1,
    activeCases: 1,
    firstContactDate: '2024-10-10',
    lastContactDate: '2024-11-28'
  }
];

export const MOCK_LAWYER_CASES: LawyerCase[] = [
  {
    id: 'lc1',
    clientId: 'cl1',
    clientName: 'Juan Carlos Pérez',
    clientAvatar: 'https://i.pravatar.cc/150?img=33',
    title: 'Despido sin justa causa',
    category: 'Laboral',
    description: 'El cliente fue despedido después de 5 años sin liquidación correcta.',
    status: 'active',
    startDate: '2024-10-15',
    lastUpdate: 'Hace 2 horas',
    nextHearing: '2024-12-20',
    fee: 1500000,
    feeStatus: 'partial',
    documents: [
      { name: 'Contrato laboral.pdf', date: '2024-10-16', type: 'pdf' },
      { name: 'Carta de despido.pdf', date: '2024-10-16', type: 'pdf' },
    ],
    timeline: [
      { date: '2024-10-15', action: 'Caso iniciado', description: 'Cliente contactó por primera vez' },
      { date: '2024-10-18', action: 'Documentos recibidos', description: 'Se recibió contrato y carta de despido' },
      { date: '2024-11-01', action: 'Demanda radicada', description: 'Radicación ante juzgado laboral' },
    ],
    notes: 'Cliente muy colaborador. Tiene todos los documentos en orden.'
  },
  {
    id: 'lc2',
    clientId: 'cl2',
    clientName: 'María Fernanda López',
    clientAvatar: 'https://i.pravatar.cc/150?img=44',
    title: 'Divorcio Mutuo Acuerdo',
    category: 'Familiar',
    description: 'Divorcio express con liquidación de sociedad conyugal.',
    status: 'waiting_documents',
    startDate: '2024-11-05',
    lastUpdate: 'Ayer',
    fee: 800000,
    feeStatus: 'paid',
    documents: [
      { name: 'Registro Civil Matrimonio.pdf', date: '2024-11-06', type: 'pdf' }
    ],
    timeline: [
      { date: '2024-11-05', action: 'Consulta inicial', description: 'Reunión por video' }
    ],
    notes: 'Esperando registros civiles de nacimiento de los hijos.'
  }
];

export const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: 't1',
    clientId: 'cl1',
    clientName: 'Juan Carlos Pérez',
    caseId: 'lc1',
    caseTitle: 'Despido sin justa causa',
    amount: 500000,
    date: '2024-11-28',
    status: 'completed',
    paymentMethod: 'PSE'
  },
  {
    id: 't2',
    clientId: 'cl2',
    clientName: 'María Fernanda López',
    caseId: 'lc2',
    caseTitle: 'Divorcio Mutuo Acuerdo',
    amount: 800000,
    date: '2024-11-05',
    status: 'completed',
    paymentMethod: 'Tarjeta de Crédito'
  }
];
