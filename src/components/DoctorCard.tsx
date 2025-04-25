
import { Doctor } from '../types/doctor';

interface DoctorCardProps {
  doctor: Doctor;
}

const DoctorCard = ({ doctor }: DoctorCardProps) => {
  // Safely handle potentially undefined specialties
  const specialtiesText = doctor?.specialties?.join(', ') || 'No specialties listed';

  return (
    <div
      data-testid={`doctor-card-${doctor.id}`}
      className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
    >
      <h3 className="text-lg font-semibold mb-2">{doctor.name}</h3>
      <div className="text-sm text-gray-600 mb-2">
        {specialtiesText}
      </div>
      <div className="flex justify-between items-center text-sm">
        <span className="text-blue-600">₹{doctor.fees}</span>
        <span className="text-gray-500">{doctor.experience}+ Years Experience</span>
      </div>
      <div className="mt-2 text-sm text-gray-500">{doctor.consultationType}</div>
    </div>
  );
};

export default DoctorCard;
