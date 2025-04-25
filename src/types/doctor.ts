
export interface Doctor {
  id: string;
  name: string;
  specialty: string[];
  experience: number;
  fee: number;
  video_consult: boolean;
  in_clinic: boolean;
  city: string;
  clinic_name: string;
  photo: string | null;
  created_at: string;
}

export type SortOption = 'fees-asc' | 'experience-desc';
