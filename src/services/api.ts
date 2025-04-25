
import { supabase } from '@/integrations/supabase/client';
import { Doctor } from '../types/doctor';

export const fetchDoctors = async (): Promise<Doctor[]> => {
  try {
    const { data, error } = await supabase
      .from('doctors')
      .select('*');

    if (error) throw error;

    return data || [];
  } catch (error) {
    console.error('Error fetching doctors:', error);
    return [];
  }
};
