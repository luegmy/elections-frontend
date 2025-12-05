export enum AchievementType {
  LAW_APPROVED = 'LAW_APPROVED',
  LAW_PROPOSED = 'LAW_PROPOSED',
  PUBLIC_PROJECT_COMPLETED = 'PUBLIC_PROJECT_COMPLETED',
  ACADEMIC_EXPERIENCE = 'ACADEMIC_EXPERIENCE',
  PUBLIC_SECTOR_EXPERIENCE = 'PUBLIC_SECTOR_EXPERIENCE',
  SOCIAL_PROJECT_LEADERSHIP = 'SOCIAL_PROJECT_LEADERSHIP'
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

export interface Achievement {
  description: string;
  type: AchievementType;
  relevance: number;
  quantity: number;
  tags: string[];
  feasibilityScore: number;
}

export interface Proposal {
  id: string;
  title: string;
  description: string;
  area: string;
}

export interface LegalHistoryEntry {
  id: string;
  date: string;
  title: string;
  description: string;
  source: string;
  verified: boolean;
  status: LegalStatus;
  severity: IncidentSeverity;
}

export interface Transparency {
  submittedDeclaration: boolean;
  declarationInconsistencies: number;
  partySwitches: number;
  wasPublicOfficer: boolean;
  attendancePercentage: number;
  publishedIncome: boolean;
  publishedExpenses: boolean;
  auditsAvailable: boolean;
}

export interface Trust {
  majorScandals: number;
  minorControversies: number;
  factCheckFailures: number;
  ethicsSanction: boolean;
  positiveEndorsements: number;
}

export interface CompositeScore {
  judicialScore: number;
  contributionScore: number;
  transparencyScore: number;
  trustScore: number;
  finalScore: number;
}

export interface Candidate {
  code: number;
  name: string;
  party: string;
  biography: string;
  proposals: Proposal[];
  history: LegalHistoryEntry[];
  achievements: Achievement[];
  transparency: Transparency;
  trust: Trust;
  scores: CompositeScore;
  rankingLevel: number;
  planKeywords: string[];
}

export interface MatchRequest {
  question: string;
}

export interface MatchResult {
  candidate: Candidate;
  score: number;
  matchingProposals: string[];
}