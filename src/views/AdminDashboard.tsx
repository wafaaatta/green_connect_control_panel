import React from 'react'
import { Users, Calendar, MessageSquare, TrendingUp, Award, AlertTriangle, ArrowUp, ArrowDown, Leaf } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts'

const userGrowthData = [
  { name: 'Jan', users: 4000 },
  { name: 'Feb', users: 5000 },
  { name: 'Mar', users: 6000 },
  { name: 'Apr', users: 7000 },
  { name: 'May', users: 9000 },
  { name: 'Jun', users: 11000 },
]

const plantActivityData = [
  { name: 'Mon', posts: 120, trades: 80 },
  { name: 'Tue', posts: 150, trades: 100 },
  { name: 'Wed', posts: 180, trades: 120 },
  { name: 'Thu', posts: 190, trades: 130 },
  { name: 'Fri', posts: 220, trades: 150 },
  { name: 'Sat', posts: 250, trades: 170 },
  { name: 'Sun', posts: 280, trades: 200 },
]

const AdminDashboard = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <StatCard icon={<Users className="h-6 w-6" />} title="Total Users" value="15,687" change="+12%" positive={true} />
          <StatCard icon={<Leaf className="h-6 w-6" />} title="Plant Posts" value="32,456" change="+8%" positive={true} />
          <StatCard icon={<Calendar className="h-6 w-6" />} title="Events This Month" value="24" change="+2" positive={true} />
          <StatCard icon={<MessageSquare className="h-6 w-6" />} title="Active Discussions" value="1,893" change="-5%" positive={false} />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          <div className="bg-white p-4 rounded shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">User Growth</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={userGrowthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="name" stroke="#718096" />
                <YAxis stroke="#718096" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="users" stroke="#0096c7" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white p-4 rounded shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Plant Activity</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={plantActivityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="name" stroke="#718096" />
                <YAxis stroke="#718096" />
                <Tooltip />
                <Legend />
                <Bar dataKey="posts" fill="#0096c7" />
                <Bar dataKey="trades" fill="#48cae4" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity and Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Recent Activity</h2>
            <ul className="space-y-4">
              <ActivityItem
                icon={<Award className="h-5 w-5 text-yellow-500" />}
                title="New Top Contributor"
                description="User 'GreenThumb23' has become a top contributor"
                time="2 hours ago"
              />
              <ActivityItem
                icon={<TrendingUp className="h-5 w-5 text-green-500" />}
                title="Trending Plant"
                description="Monstera Deliciosa is trending in plant posts"
                time="4 hours ago"
              />
              <ActivityItem
                icon={<Calendar className="h-5 w-5 text-blue-500" />}
                title="Upcoming Event"
                description="'Urban Gardening Workshop' scheduled for next week"
                time="1 day ago"
              />
            </ul>
          </div>
          <div className="bg-white p-4 rounded shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">System Alerts</h2>
            <ul className="space-y-4">
              <AlertItem
                icon={<AlertTriangle className="h-5 w-5 text-yellow-500" />}
                title="High Server Load"
                description="Server load has been high for the past hour"
                severity="Warning"
              />
              <AlertItem
                icon={<AlertTriangle className="h-5 w-5 text-red-500" />}
                title="Failed Login Attempts"
                description="Multiple failed login attempts detected"
                severity="Critical"
              />
              <AlertItem
                icon={<AlertTriangle className="h-5 w-5 text-green-500" />}
                title="Database Backup"
                description="Daily database backup completed successfully"
                severity="Info"
              />
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

const StatCard = ({ icon, title, value, change, positive }) => (
  <div className="bg-white overflow-hidden shadow-md rounded">
    <div className="p-5">
      <div className="flex items-center">
        <div className="flex-shrink-0 bg-[#e0f7fa] rounded-md p-3">
          {icon}
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

const ActivityItem = ({ icon, title, description, time }) => (
  <li className="flex space-x-3">
    <div className="flex-shrink-0">{icon}</div>
    <div className="flex-1 min-w-0">
      <p className="text-sm font-medium text-gray-900 truncate">{title}</p>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
    <div className="flex-shrink-0 whitespace-nowrap text-sm text-gray-500">{time}</div>
  </li>
)

const AlertItem = ({ icon, title, description, severity }) => (
  <li className="flex space-x-3">
    <div className="flex-shrink-0">{icon}</div>
    <div className="flex-1 min-w-0">
      <p className="text-sm font-medium text-gray-900 truncate">{title}</p>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
    <div className="flex-shrink-0">
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        severity === 'Critical' ? 'bg-red-100 text-red-800' :
        severity === 'Warning' ? 'bg-yellow-100 text-yellow-800' :
        'bg-green-100 text-green-800'
      }`}>
        {severity}
      </span>
    </div>
  </li>
)

export default AdminDashboard