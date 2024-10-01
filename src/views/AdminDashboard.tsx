import React, { useEffect } from 'react'
import { Users, Calendar, Bell, FileText, Briefcase, Mails } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts'
import { useAppDispatch, useAppSelector } from '../hooks/hooks'
import { getStatistics } from '../redux/stores/statistics_store'
import { IconType } from 'react-icons'
import { useTranslation } from 'react-i18next'

const AdminDashboard = () => {
  const { t } = useTranslation()
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
          <StatCard icon={Users as IconType} title={t('dashboard.totalUsers')} value={state.statistics.users} />
          <StatCard icon={Calendar as IconType} title={t('dashboard.activeEvents')} value={state.statistics.events} />
          <StatCard icon={Bell as IconType} title={t('dashboard.newAnnounces')} value={state.statistics.announces} />
          <StatCard icon={FileText as IconType} title={t('dashboard.totalArticles')} value={state.statistics.articles} />
          <StatCard icon={Briefcase as IconType} title={t('dashboard.managers')} value={state.statistics.managers} />
          <StatCard icon={Mails as IconType} title={t('dashboard.contacts')} value={state.statistics.contact_submissions} />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <ChartCard title={t('dashboard.userGrowth')}>
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
          <ChartCard title={t('dashboard.weeklyActivity')}>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={state.groupedStatistics}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="month" stroke="#3C6E71" />
                <YAxis stroke="#3C6E71" />
                <Tooltip />
                <Legend />
                <Bar dataKey="events" fill="#70AE6E" name={t('dashboard.events')} />
                <Bar dataKey="announces" fill="#3C6E71" name={t('dashboard.announces')} />
                <Bar dataKey="articles" fill="#FFBB28" name={t('dashboard.articles')} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* Article Categories */}
        <ChartCard title={t('dashboard.articleCategoriesDistribution')}>
          <ResponsiveContainer width="100%" height={300} >
            <BarChart data={state.articlesByCategory}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="category" stroke="#718096" className='text-sm' textAnchor="end" />
              <YAxis stroke="#718096" />
              <Tooltip />
              <Bar dataKey="count" fill="#70AE6E" name={t('dashboard.count')} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
        
      </div>
    </div>
  )
}

const StatCard = (
  { icon: Icon, title, value }: {
    icon: IconType,
    title: string,
    value: number,
  }
) => (
  <div className="bg-white overflow-hidden shadow rounded transition-all duration-300">
    <div className="p-4">
      <div className="flex items-center">
        <div className="flex-shrink-0 bg-green-100 rounded-full p-3">
          <Icon size={18} />
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

const ChartCard = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <div className="bg-white p-4 rounded shadow">
    <h2 className="text-xl font-semibold mb-4 text-gray-800">{title}</h2>
    {children}
  </div>
)

export default AdminDashboard