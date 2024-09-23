"use client"

import React from 'react'
import { Users, Calendar, Bell, FileText, Briefcase, TrendingUp, ArrowUp, ArrowDown, Leaf, MessageSquare } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts'

const userGrowthData = [
  { name: 'Jan', users: 4000 },
  { name: 'Feb', users: 5000 },
  { name: 'Mar', users: 6000 },
  { name: 'Apr', users: 7000 },
  { name: 'May', users: 9000 },
  { name: 'Jun', users: 11000 },
]

const activityData = [
  { name: 'Mon', events: 5, announces: 3, articles: 8 },
  { name: 'Tue', events: 7, announces: 4, articles: 10 },
  { name: 'Wed', events: 6, announces: 5, articles: 12 },
  { name: 'Thu', events: 8, announces: 6, articles: 15 },
  { name: 'Fri', events: 10, announces: 7, articles: 18 },
  { name: 'Sat', events: 12, announces: 8, articles: 20 },
  { name: 'Sun', events: 9, announces: 6, articles: 16 },
]

const articleCategoriesData = [
  { name: 'Gardening Tips', value: 400 },
  { name: 'Sustainable Living', value: 300 },
  { name: 'Plant Care', value: 300 },
  { name: 'Urban Farming', value: 200 },
  { name: 'Eco-friendly Products', value: 100 },
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8']

const AdminDashboard = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="space-y-4">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          <StatCard icon={<Users className="h-6 w-6" />} title="Total Users" value="15,687" change="+12%" positive={true} />
          <StatCard icon={<Calendar className="h-6 w-6" />} title="Active Events" value="24" change="+2" positive={true} />
          <StatCard icon={<Bell className="h-6 w-6" />} title="New Announces" value="18" change="+5" positive={true} />
          <StatCard icon={<FileText className="h-6 w-6" />} title="Total Articles" value="1,893" change="+8%" positive={true} />
          <StatCard icon={<Briefcase className="h-6 w-6" />} title="Managers" value="12" change="0" positive={true} />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <ChartCard title="User Growth">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={userGrowthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="name" stroke="#718096" />
                <YAxis stroke="#718096" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="users" stroke="#3C6E71" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
          <ChartCard title="Weekly Activity">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="name" stroke="#3C6E71" />
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
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={articleCategoriesData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {articleCategoriesData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Recent Activity */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Recent Activity</h2>
          <div className="space-y-4">
            <ActivityItem
              icon={<Calendar className="h-5 w-5 text-green-500" />}
              title="New Event Created"
              description="'Urban Gardening Workshop' scheduled for next week"
              time="2 hours ago"
            />
            <ActivityItem
              icon={<Bell className="h-5 w-5 text-blue-500" />}
              title="New Announcement"
              description="'Green Initiative Launch' published"
              time="4 hours ago"
            />
            <ActivityItem
              icon={<FileText className="h-5 w-5 text-yellow-500" />}
              title="New Article Published"
              description="'10 Tips for Sustainable Living' added to the blog"
              time="1 day ago"
            />
            <ActivityItem
              icon={<Users className="h-5 w-5 text-purple-500" />}
              title="New Manager Added"
              description="John Doe joined as a content manager"
              time="2 days ago"
            />
          </div>
        </div>
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
    <div className="bg-gray-50 px-5 py-3">
      <div className="text-sm flex items-center">
        {positive ? (
          <ArrowUp className="text-green-500 mr-1" size={16} />
        ) : (
          <ArrowDown className="text-red-500 mr-1" size={16} />
        )}
        <span className={`font-medium ${positive ? 'text-green-500' : 'text-red-500'}`}>{change}</span>
        <span className="text-gray-500 ml-2">from last month</span>
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

const ActivityItem = ({ icon, title, description, time }) => (
  <div className="flex items-center">
    <div className="flex-shrink-0 mr-4">{icon}</div>
    <div className="flex-1 min-w-0">
      <p className="text-sm font-medium text-gray-900 truncate">{title}</p>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
    <div className="ml-4 flex-shrink-0">
      <p className="text-sm text-gray-500">{time}</p>
    </div>
  </div>
)

export default AdminDashboard