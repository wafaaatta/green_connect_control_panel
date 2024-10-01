import React from 'react'
import { Globe } from 'lucide-react'

interface LanguageToggleProps {
  currentLanguage: string
  onToggle: () => void
}

const LanguageToggle: React.FC<LanguageToggleProps> = ({ currentLanguage, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-green-600 hover:bg-gray-100 transition duration-150 ease-in-out"
      aria-label={`Change language to ${currentLanguage === 'en' ? 'French' : 'English'}`}
    >
      <Globe className="h-5 w-5" />
      <span>{currentLanguage === 'en' ? 'FR' : 'EN'}</span>
    </button>
  )
}

export default LanguageToggle