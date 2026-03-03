import { useState, useEffect } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';
import { useFilterStore } from '@/store/useFilterStore';

export const SearchBar = () => {
  const { searchQuery, setSearchQuery } = useFilterStore();
  const [localQuery, setLocalQuery] = useState(searchQuery);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(localQuery);
    }, 500);

    return () => clearTimeout(timer);
  }, [localQuery, setSearchQuery]);

  const handleClear = () => {
    setLocalQuery('');
    setSearchQuery('');
  };

  return (
    <div className="group relative w-full max-w-md">
      <FiSearch
        className="top-1/2 left-4 absolute text-gray-400 group-focus-within:text-primary transition-colors -translate-y-1/2 duration-200"
        size={20}
      />
      <input
        type="text"
        value={localQuery}
        onChange={(e) => setLocalQuery(e.target.value)}
        placeholder="Search games..."
        className="bg-background hover:bg-gray-800 py-2 pr-12 pl-12 rounded-lg outline-none focus:ring-2 focus:ring-primary w-full text-white transition-all duration-200"
      />
      {localQuery && (
        <button
          onClick={handleClear}
          className="top-1/2 right-4 absolute text-gray-400 hover:text-white hover:rotate-90 transition-all -translate-y-1/2 duration-200"
          aria-label="Clear search"
        >
          <FiX size={20} />
        </button>
      )}
    </div>
  );
};
