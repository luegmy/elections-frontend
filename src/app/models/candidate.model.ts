export enum AchievementType {
  LAW_APPROVED = 'LEY APRBADO',
  LAW_PROPOSED = 'LEY PROPUESTA',
  PUBLIC_PROJECT_COMPLETED = 'PROYECTO PÚBLICO COMPLETADO',
  ACADEMIC_EXPERIENCE = 'EXPERIENCIA ACADÉMICA',
  PUBLIC_SECTOR_EXPERIENCE = 'EXPERIENCIA EN EL SECTOR PÚBLICO',
  SOCIAL_PROJECT_LEADERSHIP = 'LIDERAZGO EN PROYECTO SOCIAL'
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
  quantity: number;    // Años, proyectos, etc.
  tags: string[];
}

export interface GovernmentPlan {
  id: string;
  partyCode: string;
  proposals: Proposal[];
  documentUrl?: string; // Link al PDF del JNE
}

export interface Proposal {
  id: string;
  title: string;
  description: string;
  detailDescription: string;
  area: string;             // Salud, Educación, etc.
  sourcePlan: string;       // Sección del plan
  keywords: string[];

  feasibilityScore: number; // 0.0 - 1.0
  impactScore: number;      // 0.0 - 1.0
  costEstimate: string;
  requiresConstitutionalReform: boolean;
  violatesInternationalTreaties: boolean;
}


export interface LegalHistoryEntry {
  id: string;
  date: string;              // ISO date (yyyy-MM-dd)
  title: string;
  description: string;
  expedientNumber: string;
  source: string;            // URL o entidad
  verified: boolean;
  status: LegalStatus;
  severity: IncidentSeverity;
  category: LegalCategory;
}

export interface Transparency {
  // Contraloría
  submittedDeclaration: boolean;
  declarationInconsistencies: number;

  // Portal de Transparencia
  wasPublicOfficer: boolean;
  attendancePercentage?: number; // Solo si fue funcionario

  // ONPE – campañas
  publishedIncome: boolean;
  publishedExpenses: boolean;
  auditsAvailable: boolean;
}

export interface Trust {
  // Ministerio Público / Ética
  majorSanctions: number;
  minorSanctions: number;

  // ROP
  partySwitches: number;

  // Fact-checking
  factCheckFailures: number;

  // Registro de sanciones
  ethicsSanction: boolean;
}


export interface CompositeScore {
  judicialScore: number;
  contributionScore: number;
  transparencyScore: number;
  trustScore: number;
  finalScore: number;
}

export interface Candidate {
  code: string;
  name: string;
  position: string;        // Cargo al que postula
  party: string;
  partyAcronym: string;
  biography: string;

  history: LegalHistoryEntry[];
  achievements: Achievement[];

  transparency: Transparency;
  trust: Trust;

  scores: CompositeScore;
  rankingLevel: number;

  governmentPlan?: GovernmentPlan;

  lastAuditDate: string;    // ISO string (LocalDateTime)
  dataSourceVersion: string;
}
export interface MatchResponse {
  code: string;
  name: string;
  party: string;
  partyAcronym: string;
  position: string;
  matchType: string; 
  // Nuevos campos para el mapeo dinámico
  matchTitle: string;       // El título de la propuesta o nombre del caso
  matchDescription: string;
  matchDetailDescription: string; // La descripción del match
  sourcePlan?: string;      // Sección del plan o número de expediente
  finalScore: number;
  rankingLevel: number;
}
