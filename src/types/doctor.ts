
export interface Doctor {
  id: string;
  name: string;
  specialties: string[];
  consultationType: 'Video Consult' | 'In Clinic';
  experience: number;
  fees: number;
}

export type SortOption = 'fees-asc' | 'experience-desc';
