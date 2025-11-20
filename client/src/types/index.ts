// User Types
export enum UserType {
  INDIVIDUAL = 'individual',
  PET_OWNER = 'pet_owner',
  VETERAN = 'veteran',
  PHYSICIAN = 'physician',
  INSURANCE = 'insurance',
  LEGAL = 'legal'
}

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended',
  PENDING_VERIFICATION = 'pending_verification'
}

export interface User {
  id: string;
  email: string;
  userType: UserType;
  status: UserStatus;
  emailVerified: boolean;
  phoneNumber?: string;
  phoneVerified: boolean;
  lastLoginAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Profile {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  dateOfBirth?: string;
  gender?: string;
  height?: number;
  weight?: number;
  bloodType?: string;
  allergies?: string[];
  chronicConditions?: string[];
  medications?: string[];
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  primaryCarePhysician?: string;
  insuranceProvider?: string;
  profilePicture?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
}

// Medical Record Types
export enum RecordType {
  VISIT = 'visit',
  LAB_RESULT = 'lab_result',
  IMAGING = 'imaging',
  PRESCRIPTION = 'prescription',
  PROCEDURE = 'procedure',
  HOSPITALIZATION = 'hospitalization',
  VACCINATION = 'vaccination',
  ALLERGY = 'allergy',
  DIAGNOSIS = 'diagnosis',
  DISCHARGE_SUMMARY = 'discharge_summary'
}

export interface MedicalRecord {
  id: string;
  userId: string;
  recordType: RecordType;
  title: string;
  description?: string;
  date: string;
  provider?: string;
  facility?: string;
  diagnosis?: string[];
  medications?: string[];
  notes?: string;
  attachments?: string[];
  isCritical: boolean;
  isShared: boolean;
  metadata?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

// Appointment Types
export enum AppointmentType {
  IN_PERSON = 'in_person',
  TELEMEDICINE = 'telemedicine',
  PHONE = 'phone',
  HOME_VISIT = 'home_visit'
}

export enum AppointmentStatus {
  SCHEDULED = 'scheduled',
  CONFIRMED = 'confirmed',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  NO_SHOW = 'no_show',
  RESCHEDULED = 'rescheduled'
}

export interface Appointment {
  id: string;
  userId: string;
  appointmentType: AppointmentType;
  status: AppointmentStatus;
  providerName: string;
  providerSpecialty?: string;
  facilityName?: string;
  facilityAddress?: string;
  appointmentDate: string;
  duration: number;
  reason?: string;
  notes?: string;
  telemedicineLink?: string;
  reminderSent: boolean;
  createdAt: string;
  updatedAt: string;
}

// Document Types
export enum DocumentType {
  MEDICAL_FORM = 'medical_form',
  LAB_REPORT = 'lab_report',
  IMAGING_REPORT = 'imaging_report',
  PRESCRIPTION = 'prescription',
  INSURANCE_CARD = 'insurance_card',
  ID_CARD = 'id_card',
  ADVANCE_DIRECTIVE = 'advance_directive',
  CONSENT_FORM = 'consent_form',
  DISCHARGE_SUMMARY = 'discharge_summary',
  BILLING_STATEMENT = 'billing_statement',
  OTHER = 'other'
}

export interface Document {
  id: string;
  userId: string;
  documentType: DocumentType;
  status: string;
  title: string;
  description?: string;
  fileName: string;
  fileSize: number;
  fileUrl: string;
  mimeType: string;
  uploadedAt: string;
  signedAt?: string;
  signatureData?: string;
  expiryDate?: string;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}

// Pet Types
export interface Pet {
  id: string;
  ownerId: string;
  name: string;
  petType: string;
  breed?: string;
  gender: string;
  dateOfBirth?: string;
  weight?: number;
  microchipId?: string;
  veterinarian?: string;
  vetClinicName?: string;
  allergies?: string[];
  medications?: string[];
  vaccinations?: Array<{
    name: string;
    date: string;
    nextDueDate?: string;
  }>;
  photos?: string[];
  isLost: boolean;
  createdAt: string;
  updatedAt: string;
}

// Body Scan Types
export interface BodyScan {
  id: string;
  userId: string;
  bodyPart: string;
  scanType: string;
  title: string;
  description?: string;
  date: string;
  position3D?: {
    x: number;
    y: number;
    z: number;
  };
  metadata?: Record<string, any>;
  images?: string[];
  notes?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Health Metrics Types
export interface HealthMetrics {
  id: string;
  userId: string;
  metricType: string;
  value: number;
  unit: string;
  timestamp: string;
  source?: string;
  additionalData?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

// Veteran Profile Types
export interface VeteranProfile {
  id: string;
  userId: string;
  militaryBranch: string;
  serviceStatus: string;
  serviceNumber?: string;
  rank?: string;
  yearsOfService?: number;
  disabilityRating?: string;
  vaFacility?: string;
  serviceConnectedConditions?: string[];
  benefits?: {
    healthcare: boolean;
    disability: boolean;
    education: boolean;
    housing: boolean;
    employment: boolean;
  };
  createdAt: string;
  updatedAt: string;
}

// Auth Types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  userType: UserType;
  firstName: string;
  lastName: string;
}

export interface AuthResponse {
  token: string;
  user: User & { profile?: Profile };
}
