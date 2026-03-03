import { FiChevronDown } from 'react-icons/fi';
import { useFilterStore } from '@/store/useFilterStore';
import { SortOption } from '@/types';

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'relevance', label: 'Relevance' },
  { value: '-rating', label: 'Rating (High to Low)' },
  { value: 'rating', label: 'Rating (Low to High)' },
  { value: 'name', label: 'Name (A-Z)' },
  { value: '-name', label: 'Name (Z-A)' },
  { value: '-released', label: 'Release Date (Newest)' },
  { value: 'released', label: 'Release Date (Oldest)' },
  { value: '-metacritic', label: 'Metacritic (High to Low)' },
];

export const SortDropdown = () => {
  const { sortBy, setSortBy } = useFilterStore();

  return (
    <div className="group relative">
      <FiChevronDown className="top-1/2 right-3 absolute text-gray-400 group-focus-within:text-primary group-focus-within:rotate-180 transition-all -translate-y-1/2 duration-200 pointer-events-none" />
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value as SortOption)}
        className="bg-background hover:bg-gray-800 py-2 pr-10 pl-4 rounded-lg outline-none focus:ring-2 focus:ring-primary text-white transition-all duration-200 appearance-none cursor-pointer"
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
