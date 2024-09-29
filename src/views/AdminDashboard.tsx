"use client"

import React, { useEffect } from 'react'
import { Users, Calendar, Bell, FileText, Briefcase, TrendingUp, ArrowUp, ArrowDown, Leaf, MessageSquare, Mails } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from 'recharts'
import { useAppDispatch, useAppSelector } from '../hooks/hooks'
import { getStatistics } from '../redux/stores/statistics_store'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8']

const AdminDashboard = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getStatistics())
  }, [dispatch])

  const state = useAppSelector((state) => state.statistics_store)

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="space-y-4">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
          <StatCard icon={<Users className="h-6 w-6" />} title="Total Users" value={state.statistics.users} change="+12%" positive={true} />
          <StatCard icon={<Calendar className="h-6 w-6" />} title="Active Events" value={state.statistics.events} change="+2" positive={true} />
          <StatCard icon={<Bell className="h-6 w-6" />} title="New Announces" value={state.statistics.announces} change="+5" positive={true} />
          <StatCard icon={<FileText className="h-6 w-6" />} title="Total Articles" value={state.statistics.articles} change="+8%" positive={true} />
          <StatCard icon={<Briefcase className="h-6 w-6" />} title="Managers" value={state.statistics.managers} change="0" positive={true} />
          <StatCard icon={<Mails className="h-6 w-6" />} title="Contacts" value={state.statistics.contact_submissions} change="0" positive={true} />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <ChartCard title="User Growth">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={state.userGraph} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="underline" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#34C759" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8BC34A" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="month" stroke="#718096" />
                <YAxis stroke="#718096" />
                <Tooltip />
                <Area type="natural" dataKey="count" stroke="#3C6E71" fill="url(#underline)" fillOpacity={1} />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>
          <ChartCard title="Weekly Activity">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={state.groupedStatistics}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="month" stroke="#3C6E71" />
                <YAxis stroke="#3C6E71" />
                <Tooltip />
                <Legend />
                <Bar dataKey="events" fill="#70AE6E" />
                <Bar dataKey="announces" fill="#3C6E71" />
                <Bar dataKey="articles" fill="#FFBB28" />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* Article Categories */}
        <ChartCard title="Article Categories Distribution">
          <ResponsiveContainer width="100%" height={300} >
            <BarChart data={state.articlesByCategory}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="category" stroke="#718096" className='text-sm' textAnchor="end" />
              <YAxis stroke="#718096" />
              <Tooltip />
              <Bar dataKey="count" fill="#70AE6E" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
        
      </div>
    </div>
  )
}

const StatCard = ({ icon, title, value, change, positive }) => (
  <div className="bg-white overflow-hidden shadow rounded transition-all duration-300">
    <div className="p-4">
      <div className="flex items-center">
        <div className="flex-shrink-0 bg-green-100 rounded-full p-3">
          {React.cloneElement(icon, { className: "h-6 w-6 text-green-600" })}
        </div>
        <div className="ml-5 w-0 flex-1">
          <dl>
            <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
            <dd>
              <div className="text-lg font-medium text-gray-900">{value}</div>
            </dd>
          </dl>
        </div>
      </div>
    </div>

  </div>
)

const ChartCard = ({ title, children }) => (
  <div className="bg-white p-4 rounded shadow">
    <h2 className="text-xl font-semibold mb-4 text-gray-800">{title}</h2>
    {children}
  </div>
)


export default AdminDashboard