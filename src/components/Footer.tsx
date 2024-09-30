
const Footer = () => {
    return (
      <footer className="bg-white shadow-md mt-auto">
        <div className=" mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4 text-center text-md text-gray-500 flex items-center justify-between">
            <p>&copy; {new Date().getFullYear()} Green Connect. All rights reserved.</p>
            <p className="mt-1">
              Version <b>1.0.0</b>
            </p>
          </div>
        </div>
      </footer>
    );
  };

export default Footer
