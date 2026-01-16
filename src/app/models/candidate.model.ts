export enum AchievementType {
  LAW_APPROVED = 'LAW_APPROVED',
  LAW_PROPOSED = 'LAW_PROPOSED',
  PUBLIC_PROJECT_COMPLETED = 'PUBLIC_PROJECT_COMPLETED',
  ACADEMIC_EXPERIENCE = 'ACADEMIC_EXPERIENCE',
  PUBLIC_SECTOR_EXPERIENCE = 'PUBLIC_SECTOR_EXPERIENCE',
  SOCIAL_PROJECT_LEADERSHIP = 'SOCIAL_PROJECT_LEADERSHIP',
  PROMISE_BROKEN = 'PROMISE_BROKEN',          // AGREGADO
  FISCAL_DEBT_INCREASE = 'FISCAL_DEBT_INCREASE', // AGREGADO
  INFRASTRUCTURE_SUCCESS = 'INFRASTRUCTURE_SUCCESS' // AGREGADO
}

export enum IncidentSeverity {
  GRAVE = 'GRAVE',
  MODERADO = 'MODERADO',
  LEVE = 'LEVE',
  NEUTRO = 'NEUTRO'
}

export enum LegalStatus {
  SENTENCIA_FIRME_CONDENATORIA = 'SENTENCIA_FIRME_CONDENATORIA',
  SENTENCIA_PRIMERA_INSTANCIA = 'SENTENCIA_PRIMERA_INSTANCIA',
  PROCESO_JUDICIAL_ABIERTO = 'PROCESO_JUDICIAL_ABIERTO',
  INVESTIGACION_PRELIMINAR = 'INVESTIGACION_PRELIMINAR',
  PRESCRITO = 'PRESCRITO',
  SENTENCIA_ABSOLUTORIA = 'SENTENCIA_ABSOLUTORIA'
}

export enum LegalCategory {
  PENAL, FAMILIA, TRIBUTARY, CIVIL, LABORAL, ADMINISTRATIVE
}

export interface Achievement {
  description: string;
  type: AchievementType;
  relevance: number;   // 1=Bajo, 2=Medio, 3=Alto
  quantity: number;    
  impactScore: number; // NUEVO: -1.0 a 1.0 (Crucial para el cálculo)
  verified: boolean;   // NUEVO
  sourceUrl?: string;  // NUEVO: Para que el usuario vea la prueba
  tags: string[];
}

export interface GovernmentPlan {
  id: string;          // Formato: PLAN-PARTIDO-2026
  partyCode: string;
  proposals: Proposal[];
  documentUrl?: string; // Link al PDF oficial (JNE)
}

export interface Proposal {
  id?: string;
  title: string;
  description: string;
  detailDescription: string; // IMPORTANTE: El backend penaliza si < 100 caracteres
  area: string;              // SOCIAL, ECONOMIA, INSTITUCIONAL, AMBIENTAL
  sourcePlan: string;        // ACTUALIZADO: Ahora debe incluir Pág. y Sección
  keywords: string[];

  feasibilityScore: number;  // 0.0 - 1.0
  impactScore: number;       // 0.0 - 1.0
  costEstimate: string;      // ACTUALIZADO: Si es "No especifica", el backend penaliza
  
  requiresConstitutionalReform: boolean;
  violatesInternationalTreaties: boolean; // Si es true, reduce drásticamente la viabilidad
}

export interface LegalHistoryEntry {
  id: string;
  date: string;               // ISO date (yyyy-MM-dd)
  title: string;
  description: string;
  expedientNumber: string;
  source: string;             
  verified: boolean;
  status: LegalStatus;
  severity: IncidentSeverity;
  category: LegalCategory;
}

export interface Transparency {
  submittedDeclaration: boolean;
  declarationInconsistencies: number;
  inconsistencyDetails?: string[]; // NUEVO: Para listar qué encontró Contraloría
  economicAuditNotes?: string;     // NUEVO: Notas adicionales sobre su patrimonio

  wasPublicOfficer: boolean;
  attendancePercentage?: number; 

  publishedIncome: boolean;
  publishedExpenses: boolean;
  auditsAvailable: boolean;
}

export interface Trust {
  majorSanctions: number;
  minorSanctions: number;
  sanctionsDetail?: { [key: string]: string[] }; // NUEVO: Mapa de sanciones según Java

  partySwitches: number;      // Transfuguismo
  factCheckFailures: number;  // Mentiras detectadas en campaña
  factCheckSources?: string[]; // NUEVO: Links a las verificadoras (Ama Llulla, etc)
  
  ethicsSanction: boolean;    // Sanciones del Tribunal de Ética
}

export interface CompositeScore {
  judicialScore: number;
  contributionScore: number;
  transparencyScore: number;
  trustScore: number;
  planScore: number;          // NUEVO: El score específico del plan de gobierno
  finalScore: number;         // El promedio ponderado final
}

export interface Candidate {
  code: string;               // ID único del candidato
  name: string;
  position: string;           
  party: string;
  partyAcronym: string;
  biography: string;

  history: LegalHistoryEntry[];
  achievements: Achievement[];

  transparency: Transparency;
  trust: Trust;

  scores: CompositeScore;
  rankingLevel: number;       // 1 (VERDE), 2 (AMARILLO), 3 (PURPURA), 4 (ROJO)

  governmentPlan?: GovernmentPlan;

  lastAuditDate: string;      // ISO string
  dataSourceVersion: string;
}

/**
 * Interface para la búsqueda y comparativa
 */
export interface MatchResponse {
  code: string;
  name: string;
  party: string;
  partyAcronym: string;
  position: string;
  matchType: string; 
  matchTitle: string;        
  matchDescription: string;
  matchDetailDescription: string; 
  sourcePlan?: string;       
  finalScore: number;
  rankingLevel: number;
}