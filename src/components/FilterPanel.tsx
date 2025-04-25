
import { Doctor, SortOption } from '../types/doctor';
import { Checkbox } from './ui/checkbox';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Label } from './ui/label';

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
  // Helper function to safely generate data-testid
  const generateTestId = (specialty: string) => {
    if (!specialty) return 'filter-specialty-unknown';
    return `filter-specialty-${specialty.toLowerCase().replace(/ /g, '-')}`;
  };

  return (
    <div className="w-64 p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Filter By</h2>
      
      <div className="mb-6">
        <h3 className="font-medium mb-2">Consultation Type</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              data-testid="filter-consultation-video"
              id="video-consult"
              name="consultationType"
              value="Video Consult"
              checked={selectedConsultationType === "Video Consult"}
              onChange={(e) => onConsultationTypeChange(e.target.value)}
              className="mr-2"
            />
            <Label htmlFor="video-consult">Video Consult</Label>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              data-testid="filter-consultation-clinic"
              id="in-clinic"
              name="consultationType"
              value="In Clinic"
              checked={selectedConsultationType === "In Clinic"}
              onChange={(e) => onConsultationTypeChange(e.target.value)}
              className="mr-2"
            />
            <Label htmlFor="in-clinic">In Clinic</Label>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-medium mb-2">Specialties</h3>
        <div className="space-y-2">
          {specialties.map((specialty) => (
            <div key={specialty} className="flex items-center space-x-2">
              <input
                type="checkbox"
                data-testid={generateTestId(specialty)}
                id={`specialty-${specialty}`}
                checked={selectedSpecialties.includes(specialty)}
                onChange={() => onSpecialtyChange(specialty)}
                className="mr-2"
              />
              <Label htmlFor={`specialty-${specialty}`}>{specialty}</Label>
            </div>
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
