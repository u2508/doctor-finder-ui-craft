
import { Doctor } from '../types/doctor';

export const fetchDoctors = async (): Promise<Doctor[]> => {
  try {
    const response = await fetch('https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json');
    if (!response.ok) {
      throw new Error('Failed to fetch doctors');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching doctors:', error);
    return [];
  }
};
