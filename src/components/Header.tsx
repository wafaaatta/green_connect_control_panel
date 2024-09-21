import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Bell, Settings, User, Menu, X, Search } from 'lucide-react'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-gradient-to-r from-[#0096c7] to-[#00b4d8] text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/admin" className="flex-shrink-0">
              <img className="h-8 w-auto" src="/src/assets/images/greenconnect-logo-white.png" alt="GreenConnect" />
            </Link>
            <nav className="hidden md:block ml-10">
              <div className="flex items-baseline space-x-4">
                <Link to="/admin" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-[#48cae4] transition duration-300">Dashboard</Link>
                <Link to="/admin/users" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-[#48cae4] transition duration-300">Users</Link>
                <Link to="/admin/plants" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-[#48cae4] transition duration-300">Plants</Link>
                <Link to="/admin/events" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-[#48cae4] transition duration-300">Events</Link>
                <Link to="/admin/reports" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-[#48cae4] transition duration-300">Reports</Link>
              </div>
            </nav>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <button className="p-1 rounded-full hover:bg-[#48cae4] transition duration-300">
                <Search className="h-6 w-6" />
              </button>
              <button className="ml-3 p-1 rounded-full hover:bg-[#48cae4] transition duration-300">
                <Bell className="h-6 w-6" />
              </button>
              <Link to="/admin/settings" className="ml-3 p-1 rounded-full hover:bg-[#48cae4] transition duration-300">
                <Settings className="h-6 w-6" />
              </Link>
              <Link to="/admin/profile" className="ml-3 p-1 rounded-full hover:bg-[#48cae4] transition duration-300">
                <User className="h-6 w-6" />
              </Link>
            </div>
          </div>
          <div className="flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-[#48cae4] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition duration-300"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/admin" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-[#48cae4] transition duration-300">Dashboard</Link>
            <Link to="/admin/users" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-[#48cae4] transition duration-300">Users</Link>
            <Link to="/admin/plants" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-[#48cae4] transition duration-300">Plants</Link>
            <Link to="/admin/events" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-[#48cae4] transition duration-300">Events</Link>
            <Link to="/admin/reports" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-[#48cae4] transition duration-300">Reports</Link>
          </div>
          <div className="pt-4 pb-3 border-t border-[#48cae4]">
            <div className="flex items-center px-5">
              <div className="flex-shrink-0">
                <User className="h-10 w-10 rounded-full bg-[#48cae4] p-2" />
              </div>
              <div className="ml-3">
                <div className="text-base font-medium">Admin User</div>
                <div className="text-sm font-medium text-[#caf0f8]">admin@greenconnect.com</div>
              </div>
            </div>
            <div className="mt-3 px-2 space-y-1">
              <Link to="/admin/profile" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-[#48cae4] transition duration-300">Your Profile</Link>
              <Link to="/admin/settings" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-[#48cae4] transition duration-300">Settings</Link>
              <button className="block w-full text-left px-3 py-2 rounded-md text-base font-medium hover:bg-[#48cae4] transition duration-300">Sign out</button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header