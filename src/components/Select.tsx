import React, { useState } from 'react';
import { IconType } from 'react-icons';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

interface CustomSelectProps {
  icon: IconType;
  label: string;
  options: { value: string; label: string }[];
  value: string | string[];
  onChange: (value: string | string[]) => void;
  multiple?: boolean;
  searchable?: boolean;
  placeholder?: string;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  icon: Icon,
  label,
  options,
  value,
  onChange,
  multiple = false,
  searchable = false,
  placeholder = 'Select...',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');

  const filteredOptions = searchable
    ? options.filter((option) =>
        option.label.toLowerCase().includes(search.toLowerCase())
      )
    : options;

  const handleSelect = (optionValue: string) => {
    if (multiple) {
      const newValue = Array.isArray(value) ? value : [];
      if (newValue.includes(optionValue)) {
        onChange(newValue.filter((v) => v !== optionValue));
      } else {
        onChange([...newValue, optionValue]);
      }
    } else {
      onChange(optionValue);
      setIsOpen(false);
    }
  };

  return (
    <div className="">
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="relative">
        <button
          type="button"
          className="relative w-full bg-white rounded border border-gray-400 pl-10 pr-10 py-1.5 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-[#0096c7] focus:border-[#0096c7] sm:text-sm"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="block truncate">
            {multiple
              ? (Array.isArray(value) ? value : [])
                  .map((v) => options.find((o) => o.value === v)?.label)
                  .map(e => {
                    return <span key={e} className='mr-1 bg-gray-200 px-2 rounded-md text-xs'>{e}</span>;
                  })
              : value ? options.find((o) => o.value === value)?.label : placeholder}
          </span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            {isOpen ? <FiChevronUp className="h-5 w-5 text-gray-400" /> : <FiChevronDown className="h-5 w-5 text-gray-400" />}
          </span>
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Icon className="h-5 w-5 mr-2 text-gray-400" />
            <span>{placeholder}</span>
          </span>
        </button>
        {isOpen && (
          <div className="absolute z-10 mt-1 w-full rounded shadow-lg border bg-white">
            {searchable && (
              <div className="p-2">
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-500 rounded text-sm outline-none focus:ring-1 focus:ring-[#0096c7] focus:border-[#0096c7]"
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            )}
            <ul className="max-h-60 rounded py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
            {filteredOptions.length === 0 && <div className="p-2">No results found</div>}
              
              {filteredOptions.map((option) => (
                <li
                  key={option.value}
                  className={`cursor-default select-none relative py-2 pl-4 pr-4 transition-all duration-200 ${
                    (multiple ? (Array.isArray(value) ? value : []) : [value]).includes(option.value)
                      ? 'bg-[#0096c7] text-white hover:bg-[#00b4d8]'
                      : 'text-gray-900 hover:bg-gray-200'
                  }`}
                  onClick={() => handleSelect(option.value)}
                >
                  {option.label}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

