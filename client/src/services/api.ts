import axios, { AxiosInstance, AxiosError } from 'axios';
import type { 
  LoginCredentials, 
  RegisterData, 
  AuthResponse,
  User,
  Profile,
  MedicalRecord,
  Appointment,
  Document,
  Pet,
  BodyScan,
  HealthMetrics
} from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api/v1';

class ApiService {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor to add auth token
    this.axiosInstance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor for error handling
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          // Unauthorized - clear token and redirect to login
          localStorage.removeItem('token');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  // Auth API
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const { data } = await this.axiosInstance.post<AuthResponse>('/auth/login', credentials);
    if (data.token) {
      localStorage.setItem('token', data.token);
    }
    return data;
  }

  async register(userData: RegisterData): Promise<AuthResponse> {
    const { data } = await this.axiosInstance.post<AuthResponse>('/auth/register', userData);
    if (data.token) {
      localStorage.setItem('token', data.token);
    }
    return data;
  }

  async getCurrentUser(): Promise<{ user: User & { profile?: Profile } }> {
    const { data } = await this.axiosInstance.get('/auth/me');
    return data;
  }

  async logout(): Promise<void> {
    await this.axiosInstance.post('/auth/logout');
    localStorage.removeItem('token');
  }

  // Profile API
  async updateProfile(profileData: Partial<Profile>): Promise<Profile> {
    const { data } = await this.axiosInstance.put('/profile', profileData);
    return data;
  }

  async getProfile(): Promise<Profile> {
    const { data } = await this.axiosInstance.get('/profile');
    return data;
  }

  // Medical Records API
  async getMedicalRecords(): Promise<MedicalRecord[]> {
    const { data } = await this.axiosInstance.get('/medical-records');
    return data;
  }

  async createMedicalRecord(record: Partial<MedicalRecord>): Promise<MedicalRecord> {
    const { data } = await this.axiosInstance.post('/medical-records', record);
    return data;
  }

  async updateMedicalRecord(id: string, record: Partial<MedicalRecord>): Promise<MedicalRecord> {
    const { data } = await this.axiosInstance.put(`/medical-records/${id}`, record);
    return data;
  }

  async deleteMedicalRecord(id: string): Promise<void> {
    await this.axiosInstance.delete(`/medical-records/${id}`);
  }

  // Appointments API
  async getAppointments(): Promise<Appointment[]> {
    const { data } = await this.axiosInstance.get('/appointments');
    return data;
  }

  async createAppointment(appointment: Partial<Appointment>): Promise<Appointment> {
    const { data } = await this.axiosInstance.post('/appointments', appointment);
    return data;
  }

  async updateAppointment(id: string, appointment: Partial<Appointment>): Promise<Appointment> {
    const { data } = await this.axiosInstance.put(`/appointments/${id}`, appointment);
    return data;
  }

  async cancelAppointment(id: string): Promise<void> {
    await this.axiosInstance.patch(`/appointments/${id}/cancel`);
  }

  // Documents API
  async getDocuments(): Promise<Document[]> {
    const { data } = await this.axiosInstance.get('/documents');
    return data;
  }

  async uploadDocument(formData: FormData): Promise<Document> {
    const { data } = await this.axiosInstance.post('/documents/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  }

  async signDocument(id: string, signatureData: string): Promise<Document> {
    const { data } = await this.axiosInstance.post(`/documents/${id}/sign`, { signatureData });
    return data;
  }

  async deleteDocument(id: string): Promise<void> {
    await this.axiosInstance.delete(`/documents/${id}`);
  }

  // Pets API (for Pet Owners)
  async getPets(): Promise<Pet[]> {
    const { data } = await this.axiosInstance.get('/pets');
    return data;
  }

  async createPet(pet: Partial<Pet>): Promise<Pet> {
    const { data } = await this.axiosInstance.post('/pets', pet);
    return data;
  }

  async updatePet(id: string, pet: Partial<Pet>): Promise<Pet> {
    const { data } = await this.axiosInstance.put(`/pets/${id}`, pet);
    return data;
  }

  async deletePet(id: string): Promise<void> {
    await this.axiosInstance.delete(`/pets/${id}`);
  }

  async reportLostPet(id: string, lostDetails: any): Promise<Pet> {
    const { data } = await this.axiosInstance.post(`/pets/${id}/lost`, lostDetails);
    return data;
  }

  // Body Scan API
  async getBodyScans(): Promise<BodyScan[]> {
    const { data } = await this.axiosInstance.get('/body-scans');
    return data;
  }

  async createBodyScan(scan: Partial<BodyScan>): Promise<BodyScan> {
    const { data } = await this.axiosInstance.post('/body-scans', scan);
    return data;
  }

  async updateBodyScan(id: string, scan: Partial<BodyScan>): Promise<BodyScan> {
    const { data } = await this.axiosInstance.put(`/body-scans/${id}`, scan);
    return data;
  }

  async deleteBodyScan(id: string): Promise<void> {
    await this.axiosInstance.delete(`/body-scans/${id}`);
  }

  // Health Metrics API
  async getHealthMetrics(metricType?: string, startDate?: string, endDate?: string): Promise<HealthMetrics[]> {
    const params = new URLSearchParams();
    if (metricType) params.append('metricType', metricType);
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);
    
    const { data } = await this.axiosInstance.get(`/health-metrics?${params.toString()}`);
    return data;
  }

  async recordHealthMetric(metric: Partial<HealthMetrics>): Promise<HealthMetrics> {
    const { data } = await this.axiosInstance.post('/health-metrics', metric);
    return data;
  }
}

export const api = new ApiService();
export default api;
