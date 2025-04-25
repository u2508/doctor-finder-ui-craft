
import { Doctor } from '../types/doctor';

interface DoctorCardProps {
  doctor: Doctor;
}

const DoctorCard = ({ doctor }: DoctorCardProps) => {
  const specialtiesText = doctor?.specialty?.join(', ') || 'No specialties listed';
  const consultationType = [];
  if (doctor.video_consult) consultationType.push('Video Consult');
  if (doctor.in_clinic) consultationType.push('In Clinic');

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
        <span className="text-blue-600">₹{doctor.fee}</span>
        <span className="text-gray-500">{doctor.experience}+ Years Experience</span>
      </div>
      <div className="mt-2 text-sm text-gray-500">{consultationType.join(' & ') || 'No consultation type specified'}</div>
      <div className="mt-2 text-sm text-gray-500">{doctor.city} - {doctor.clinic_name}</div>
    </div>
  );
};

export default DoctorCard;
