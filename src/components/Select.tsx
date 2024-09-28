import React, { useState, useRef, useEffect } from 'react'
import { IconType } from 'react-icons'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'

interface CustomSelectProps {
  icon: IconType
  label: string
  options: { value: string; label: string }[]
  value: string | string[]
  onChange: (value: string | string[]) => void
  multiple?: boolean
  searchable?: boolean
  placeholder?: string
}

const Select: React.FC<CustomSelectProps> = ({
  icon: Icon,
  label,
  options,
  value,
  onChange,
  multiple = false,
  searchable = false,
  placeholder = 'Select...',
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState('')

  const filteredOptions = searchable
    ? options.filter((option) =>
        option.label.toLowerCase().includes(search.toLowerCase())
      )
    : options

  const handleSelect = (optionValue: string) => {
    if (multiple) {
      const newValue = Array.isArray(value) ? value : []
      if (newValue.includes(optionValue)) {
        onChange(newValue.filter((v) => v !== optionValue))
      } else {
        onChange([...newValue, optionValue])
      }
    } else {
      onChange(optionValue)
      setIsOpen(false)
    }
  }

  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [ref])

  const hasValue = multiple ? (Array.isArray(value) && value.length > 0) : value !== ''

  return (
    <div ref={ref} className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="relative">
        <button
          type="button"
          className="relative w-full bg-white rounded border border-gray-400 pl-10 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-[#0096c7] focus:border-[#0096c7] sm:text-sm"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Icon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </span>
          {hasValue ? (
            <span className="block truncate pl-1">
              {multiple
                ? (Array.isArray(value) ? value : [])
                    .map((v) => options.find((o) => o.value === v)?.label)
                    .join(', ')
                : options.find((o) => o.value === value)?.label}
            </span>
          ) : (
            <span className="block truncate text-gray-500 pl-1">{placeholder}</span>
          )}
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            {isOpen ? (
              <FiChevronUp className="h-5 w-5 text-gray-400" aria-hidden="true" />
            ) : (
              <FiChevronDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
            )}
          </span>
        </button>
        {isOpen && (
          <div className="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg">
            {searchable && (
              <div className="px-3 py-2">
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#0096c7] focus:border-[#0096c7]"
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            )}
            <ul
              className="max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
              role="listbox"
            >
              {filteredOptions.length === 0 ? (
                <li className="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9">
                  No results found
                </li>
              ) : (
                filteredOptions.map((option) => {
                  const isSelected = multiple
                    ? (Array.isArray(value) ? value : []).includes(option.value)
                    : value === option.value
                  return (
                    <li
                      key={option.value}
                      className={`cursor-pointer select-none relative py-2 pl-3 pr-9 ${
                        isSelected
                          ? 'text-white bg-[#0096c7]'
                          : 'text-gray-900 hover:bg-gray-100'
                      }`}
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => handleSelect(option.value)}
                    >
                      <span className={`block truncate ${isSelected ? 'font-semibold' : 'font-normal'}`}>
                        {option.label}
                      </span>
                      {isSelected && multiple && (
                        <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-white">
                          <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                      )}
                    </li>
                  )
                })
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default Select