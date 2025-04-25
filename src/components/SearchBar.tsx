
import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { Doctor } from '../types/doctor';

interface SearchBarProps {
  doctors: Doctor[];
  onSearch: (query: string) => void;
}

const SearchBar = ({ doctors, onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Doctor[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (query.length > 0) {
      const filtered = doctors
        .filter(doctor =>
          doctor.name.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, 3);
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [query, doctors]);

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    onSearch(searchQuery);
    setShowSuggestions(false);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          data-testid="search-doctor-input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search Doctor Name"
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg">
          {suggestions.map((doctor, index) => (
            <div
              key={doctor.id}
              data-testid={`search-suggestion-item-${index + 1}`}
              onClick={() => handleSearch(doctor.name)}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {doctor.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
