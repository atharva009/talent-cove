const API_BASE_URL = 'http://localhost:8080/api';

export interface JobDTO {
  id: number;
  jobTitle: string;
  company: string;
  location: string;
  experience: string;
  employmentType: string;
  salary: number;
  description: string;
  applicantsCount: number;
  postedDate: string;
  postedDaysAgo: number;
}

export interface TalentDTO {
  id: number;
  name: string;
  role: string;
  company: string;
  about: string;
  topSkills: string[];
  expectedSalaryMin?: number;
  expectedSalaryMax?: number;
  expectedSalary?: string;
  location: string;
  imageUrl?: string;
  email?: string;
}

export interface TalentProfileDTO {
  id: number;
  name: string;
  role: string;
  company: string;
  location: string;
  about: string;
  skills: string[];
  experience: ExperienceDTO[];
  certifications: CertificationDTO[];
}

export interface ExperienceDTO {
  id?: number;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface CertificationDTO {
  id?: number;
  title: string;
  issuer: string;
  issueDate: string;
  credentialID: string;
}

export interface JobSearchRequest {
  jobTitle?: string;
  location?: string;
  experience?: string;
  employmentType?: string;
  minSalary?: number;
  maxSalary?: number;
  sortBy?: string;
}

export interface TalentSearchRequest {
  name?: string;
  location?: string;
  skill?: string;
  minSalary?: number;
  maxSalary?: number;
  sortBy?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  role?: string;
}

export interface AuthResponse {
  token: string;
  type: string;
  id: number;
  email: string;
  name: string;
  role: string;
}

export interface ApplicationDTO {
  id: number;
  jobId: number;
  jobTitle: string;
  company: string;
  location: string;
  salary: number;
  applicationDate: string;
  status: 'PENDING' | 'REVIEWED' | 'ACCEPTED' | 'REJECTED';
}

// API Client
class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  setToken(token: string | null): void {
    if (token) {
      localStorage.setItem('authToken', token);
    } else {
      localStorage.removeItem('authToken');
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const token = this.getToken();
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const config: RequestInit = {
      ...options,
      headers,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Handle empty responses
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await response.json();
      }
      
      return {} as T;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Job APIs
  async getAllJobs(): Promise<JobDTO[]> {
    return this.request<JobDTO[]>('/jobs');
  }

  async getJobById(id: number): Promise<JobDTO> {
    return this.request<JobDTO>(`/jobs/${id}`);
  }

  async searchJobs(params: JobSearchRequest): Promise<JobDTO[]> {
    const queryParams = new URLSearchParams();
    
    if (params.jobTitle) queryParams.append('jobTitle', params.jobTitle);
    if (params.location) queryParams.append('location', params.location);
    if (params.experience) queryParams.append('experience', params.experience);
    if (params.employmentType) queryParams.append('employmentType', params.employmentType);
    if (params.minSalary) queryParams.append('minSalary', params.minSalary.toString());
    if (params.maxSalary) queryParams.append('maxSalary', params.maxSalary.toString());
    if (params.sortBy) queryParams.append('sortBy', params.sortBy);

    const queryString = queryParams.toString();
    return this.request<JobDTO[]>(`/jobs/search?${queryString}`);
  }

  // Talent APIs
  async getAllTalents(): Promise<TalentDTO[]> {
    return this.request<TalentDTO[]>('/talents');
  }

  async getTalentById(id: number): Promise<TalentDTO> {
    return this.request<TalentDTO>(`/talents/${id}`);
  }

  async getTalentProfile(id: number): Promise<TalentProfileDTO> {
    return this.request<TalentProfileDTO>(`/talents/${id}/profile`);
  }

  async searchTalents(params: TalentSearchRequest): Promise<TalentDTO[]> {
    const queryParams = new URLSearchParams();
    
    if (params.name) queryParams.append('name', params.name);
    if (params.location) queryParams.append('location', params.location);
    if (params.skill) queryParams.append('skill', params.skill);
    if (params.minSalary) queryParams.append('minSalary', params.minSalary.toString());
    if (params.maxSalary) queryParams.append('maxSalary', params.maxSalary.toString());
    if (params.sortBy) queryParams.append('sortBy', params.sortBy);

    const queryString = queryParams.toString();
    return this.request<TalentDTO[]>(`/talents/search?${queryString}`);
  }

  // Auth APIs
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    return this.request<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async register(userData: RegisterRequest): Promise<AuthResponse> {
    return this.request<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  logout(): void {
    this.setToken(null);
  }

  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  // Application APIs
  async applyForJob(jobId: number): Promise<ApplicationDTO> {
    return this.request<ApplicationDTO>('/applications', {
      method: 'POST',
      body: JSON.stringify({}),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }).catch(async () => {
      // Fallback to query param if form encoding doesn't work
      return this.request<ApplicationDTO>(`/applications?jobId=${jobId}`, {
        method: 'POST',
      });
    });
  }

  async applyForJobQuery(jobId: number): Promise<ApplicationDTO> {
    return this.request<ApplicationDTO>(`/applications?jobId=${jobId}`, {
      method: 'POST',
    });
  }

  async getMyApplications(): Promise<ApplicationDTO[]> {
    return this.request<ApplicationDTO[]>('/applications/my-applications');
  }

  async hasApplied(jobId: number): Promise<boolean> {
    return this.request<boolean>(`/applications/check/${jobId}`);
  }

  // Profile Management APIs
  async getMyProfile(): Promise<TalentProfileDTO> {
    return this.request<TalentProfileDTO>('/talents/my-profile');
  }

  async updateMyProfile(profile: Partial<TalentProfileDTO>): Promise<TalentProfileDTO> {
    return this.request<TalentProfileDTO>('/talents/my-profile', {
      method: 'PUT',
      body: JSON.stringify(profile),
    });
  }

  async addExperience(experience: {
    title: string;
    company: string;
    location: string;
    startDate: string;
    endDate?: string;
    description: string;
    isCurrent?: boolean;
  }): Promise<any> {
    return this.request<any>('/talents/my-profile/experiences', {
      method: 'POST',
      body: JSON.stringify(experience),
    });
  }

  async updateExperience(id: number, experience: any): Promise<any> {
    return this.request<any>(`/talents/my-profile/experiences/${id}`, {
      method: 'PUT',
      body: JSON.stringify(experience),
    });
  }

  async deleteExperience(id: number): Promise<void> {
    return this.request<void>(`/talents/my-profile/experiences/${id}`, {
      method: 'DELETE',
    });
  }

  async addCertification(certification: {
    title: string;
    issuer: string;
    issueDate: string;
    credentialId?: string;
  }): Promise<any> {
    return this.request<any>('/talents/my-profile/certifications', {
      method: 'POST',
      body: JSON.stringify(certification),
    });
  }

  async updateCertification(id: number, certification: any): Promise<any> {
    return this.request<any>(`/talents/my-profile/certifications/${id}`, {
      method: 'PUT',
      body: JSON.stringify(certification),
    });
  }

  async deleteCertification(id: number): Promise<void> {
    return this.request<void>(`/talents/my-profile/certifications/${id}`, {
      method: 'DELETE',
    });
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
