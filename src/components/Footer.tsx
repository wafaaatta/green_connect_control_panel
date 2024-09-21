import { Link } from 'react-router-dom'

const Footer = () => {
    return (
      <footer className="bg-white shadow-md mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4 text-center text-sm text-gray-500">
            <p>&copy; {new Date().getFullYear()} MegaShop. جميع الحقوق محفوظة.</p>
            <p className="mt-1">
              <Link to="#" className="text-[#0096c7] hover:text-[#00b4d8] transition-colors duration-200">سياسة الخصوصية</Link>
              {' | '}
              <Link to="#" className="text-[#0096c7] hover:text-[#00b4d8] transition-colors duration-200">شروط الاستخدام</Link>
            </p>
          </div>
        </div>
      </footer>
    );
  };

export default Footer