
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchDoctors } from '../services/api';
import { Doctor, SortOption } from '../types/doctor';
import SearchBar from '../components/SearchBar';
import FilterPanel from '../components/FilterPanel';
import DoctorCard from '../components/DoctorCard';

const Index = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const [specialties, setSpecialties] = useState<string[]>([]);
  
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [consultationType, setConsultationType] = useState(searchParams.get('consultationType') || '');
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>(
    searchParams.get('specialties')?.split(',').filter(Boolean) || []
  );
  const [sortOption, setSortOption] = useState<SortOption>(
    (searchParams.get('sort') as SortOption) || 'fees-asc'
  );

  useEffect(() => {
    const loadDoctors = async () => {
      const data = await fetchDoctors();
      setDoctors(data);
      
      // Extract unique specialties
      const allSpecialties = Array.from(
        new Set(data.flatMap(doctor => doctor.specialties))
      );
      setSpecialties(allSpecialties);
    };
    loadDoctors();
  }, []);

  useEffect(() => {
    let filtered = [...doctors];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(doctor =>
        doctor.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply consultation type filter
    if (consultationType) {
      filtered = filtered.filter(
        doctor => doctor.consultationType === consultationType
      );
    }

    // Apply specialties filter
    if (selectedSpecialties.length > 0) {
      filtered = filtered.filter(doctor =>
        doctor.specialties.some(specialty => selectedSpecialties.includes(specialty))
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      if (sortOption === 'fees-asc') {
        return a.fees - b.fees;
      }
      return b.experience - a.experience;
    });

    setFilteredDoctors(filtered);

    // Update URL params
    const params = new URLSearchParams();
    if (searchQuery) params.set('search', searchQuery);
    if (consultationType) params.set('consultationType', consultationType);
    if (selectedSpecialties.length > 0) params.set('specialties', selectedSpecialties.join(','));
    params.set('sort', sortOption);
    setSearchParams(params);
  }, [doctors, searchQuery, consultationType, selectedSpecialties, sortOption]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleConsultationTypeChange = (type: string) => {
    setConsultationType(type === consultationType ? '' : type);
  };

  const handleSpecialtyChange = (specialty: string) => {
    setSelectedSpecialties(prev =>
      prev.includes(specialty)
        ? prev.filter(s => s !== specialty)
        : [...prev, specialty]
    );
  };

  const handleSortChange = (sort: SortOption) => {
    setSortOption(sort);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-4">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-center mb-6">Find a Doctor</h1>
          <SearchBar doctors={doctors} onSearch={handleSearch} />
        </header>
        
        <div className="flex gap-6">
          <FilterPanel
            specialties={specialties}
            onConsultationTypeChange={handleConsultationTypeChange}
            onSpecialtyChange={handleSpecialtyChange}
            onSortChange={handleSortChange}
            selectedConsultationType={consultationType}
            selectedSpecialties={selectedSpecialties}
            selectedSort={sortOption}
          />
          
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredDoctors.length > 0 ? (
                filteredDoctors.map(doctor => (
                  <DoctorCard key={doctor.id} doctor={doctor} />
                ))
              ) : (
                <div className="col-span-full text-center py-8 text-gray-500">
                  No doctors found matching your criteria
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
