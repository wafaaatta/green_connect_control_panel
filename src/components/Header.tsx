"use client"

import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Bell, Settings, User, Menu, X, Search, Home, Users, Calendar, FileText, BarChart2, LogOut, LogOutIcon } from 'lucide-react'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Dashboard', icon: Home, path: '/admin' },
    { name: 'Users', icon: Users, path: '/admin/users' },
    { name: 'Events', icon: Calendar, path: '/admin/events' },
    { name: 'Articles', icon: FileText, path: '/admin/articles' },
    { name: 'Reports', icon: BarChart2, path: '/admin/reports' },
  ]

  return (
    <header className={`bg-white shadow-md transition-all duration-300 ${scrolled ? 'py-2' : 'py-4'}`}>
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/admin" className="flex-shrink-0">
              <img className="h-16 w-auto" src="/src/assets/green_connect.png" alt="GreenConnect" />
            </Link>
            
          </div>
          <div className="flex items-center">
          <nav className="hidden md:ml-8 md:flex md:space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium flex items-center transition duration-150 ease-in-out"
                >
                  <item.icon className="h-5 w-5 mr-2" />
                  {item.name}
                </Link>
              ))}
              <Link
                to="/admin/settings"
                className="text-gray-700 hover:text-red-600 text-red-500 px-3 py-2 rounded-md text-sm font-medium flex items-center transition duration-150 ease-in-out"
              >
                <LogOutIcon className="h-5 w-5 mr-2" />
                Sign out
              </Link>
            </nav>
            <div className="flex md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-green-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="text-gray-700 hover:text-green-600 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium flex items-center"
              >
                <item.icon className="h-5 w-5 mr-2" />
                {item.name}
              </Link>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-5">
              <div className="flex-shrink-0">
                <img
                  className="h-10 w-10 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="Admin"
                />
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-gray-800">Admin User</div>
                <div className="text-sm font-medium text-gray-500">admin@greenconnect.com</div>
              </div>
            </div>
            <div className="mt-3 px-2 space-y-1">
              <Link to="/admin/profile" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-gray-100">Your Profile</Link>
              <Link to="/admin/settings" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-gray-100">Settings</Link>
              <button className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-gray-100">Sign out</button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header