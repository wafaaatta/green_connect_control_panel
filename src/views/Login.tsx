import React, { useState } from 'react'
import { Eye, EyeOff, Mail, Lock } from 'lucide-react'
import { useAppDispatch } from '../hooks/hooks'
import { loginManager } from '../redux/stores/auth_store'
import { showNotification } from '../redux/stores/notification_store'
import Notification from '../components/Notification'
import { unwrapResult } from '@reduxjs/toolkit'

export default function GreenConnectAdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const dispatch = useAppDispatch()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    await dispatch(loginManager({email, password}))
    .then(unwrapResult)
    .then(() => {
      setIsLoading(false)
      dispatch(
        showNotification({
          type: 'success',
          message: 'Login successful',
        })
      )
    }).catch((error) => {
      setIsLoading(false)
      dispatch(
        showNotification({
          type: 'error',
          message: 'Login failed',
          description: (error as Error).message,
        })
      )
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="flex w-full max-w-5xl bg-white rounded shadow border overflow-hidden">
        <div className="hidden lg:block lg:w-1/2 bg-cover bg-center" style={{backgroundImage: "url('https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80')"}}>
        </div>
        <div className="w-full lg:w-1/2 p-4">
          <div className="flex justify-center mb-6">
          <img src={'/src/assets/green_connect.png'} className="text-green-600 w-32" />

          </div>
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Green Connect Admin</h2>
          <p className="text-center text-gray-600 mb-6">Manage your plant giveaway community</p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300 pl-12"
                placeholder="Email"
                required
              />
              <Mail className="absolute left-4 top-3.5 text-gray-400" size={20} />
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300 pl-12 pr-12"
                placeholder="Password"
                required
              />
              <Lock className="absolute left-4 top-3.5 text-gray-400" size={20} />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600 focus:outline-none"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <button
              type="submit"
              className={`w-full py-3 px-4 bg-green-600 text-white rounded font-semibold shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-300 ${
                isLoading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
              disabled={isLoading}
            >
              {isLoading ? (
                <svg className="animate-spin h-5 w-5 mx-auto text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                'Sign In'
              )}
            </button>
          </form>
        </div>
      </div>

      <Notification />
    </div>
  )
}