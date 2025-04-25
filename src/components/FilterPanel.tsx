
import { Doctor, SortOption } from '../types/doctor';

interface FilterPanelProps {
  specialties: string[];
  onConsultationTypeChange: (type: string) => void;
  onSpecialtyChange: (specialty: string) => void;
  onSortChange: (sort: SortOption) => void;
  selectedConsultationType: string;
  selectedSpecialties: string[];
  selectedSort: SortOption;
}

const FilterPanel = ({
  specialties,
  onConsultationTypeChange,
  onSpecialtyChange,
  onSortChange,
  selectedConsultationType,
  selectedSpecialties,
  selectedSort,
}: FilterPanelProps) => {
  return (
    <div className="w-64 p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Filter By</h2>
      
      <div className="mb-6">
        <h3 className="font-medium mb-2">Consultation Type</h3>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="radio"
              data-testid="filter-consultation-video"
              name="consultationType"
              value="Video Consult"
              checked={selectedConsultationType === "Video Consult"}
              onChange={(e) => onConsultationTypeChange(e.target.value)}
              className="mr-2"
            />
            Video Consult
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              data-testid="filter-consultation-clinic"
              name="consultationType"
              value="In Clinic"
              checked={selectedConsultationType === "In Clinic"}
              onChange={(e) => onConsultationTypeChange(e.target.value)}
              className="mr-2"
            />
            In Clinic
          </label>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-medium mb-2">Specialties</h3>
        <div className="space-y-2">
          {specialties.map((specialty) => (
            <label key={specialty} className="flex items-center">
              <input
                type="checkbox"
                data-testid={`filter-specialty-${specialty.toLowerCase().replace(/ /g, '-')}`}
                checked={selectedSpecialties.includes(specialty)}
                onChange={() => onSpecialtyChange(specialty)}
                className="mr-2"
              />
              {specialty}
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-2">Sort By</h3>
        <select
          className="w-full p-2 border rounded"
          value={selectedSort}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
        >
          <option data-testid="sort-fees-asc" value="fees-asc">
            Fees: Low to High
          </option>
          <option data-testid="sort-experience-desc" value="experience-desc">
            Experience: High to Low
          </option>
        </select>
      </div>
    </div>
  );
};

export default FilterPanel;
