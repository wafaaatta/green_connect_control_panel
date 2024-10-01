import React from 'react'
import { useTranslation } from 'react-i18next'

const Footer: React.FC = () => {
  const { t } = useTranslation()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-white shadow-md mt-auto">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-4 text-center text-md text-gray-500 flex items-center justify-between">
          <p>{t('footer.copyright', { year: currentYear })}</p>
          <p className="mt-1">
            {t('footer.version')} <b>1.0.0</b>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer