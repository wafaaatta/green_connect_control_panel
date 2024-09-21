import { Link } from 'react-router-dom'

const Footer = () => {
    return (
      <footer className="bg-white shadow-md mt-auto">
        <div className=" mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4 text-center text-sm text-gray-500 flex items-center justify-between">
            <p>&copy; {new Date().getFullYear()} MegaShop. All rights reserved.</p>
            <p className="mt-1">
              <Link to="#" className="text-[#0096c7] hover:text-[#00b4d8] transition-colors duration-200">Privacy Policy</Link>
              {' | '}
              <Link to="#" className="text-[#0096c7] hover:text-[#00b4d8] transition-colors duration-200">Terms of Use</Link>
            </p>
          </div>
        </div>
      </footer>
    );
  };

export default Footer
