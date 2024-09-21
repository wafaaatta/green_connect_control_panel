import React, { useState } from 'react'
import { Search, Filter, Check, X, AlertCircle } from 'lucide-react'
import { Card } from '../components/Card'

const announcements = [
  { id: 1, title: 'Community Garden Event', author: 'John Doe', date: '2023-05-20', status: 'Approved', content: 'Join us for a community garden planting event this weekend!' },
  { id: 2, title: 'Plant Exchange Program', author: 'Jane Smith', date: '2023-05-18', status: 'Pending', content: 'Participate in our monthly plant exchange program. Bring a plant, take a plant!' },
  { id: 3, title: 'New Rare Plant Arrival', author: 'Bob Johnson', date: '2023-05-15', status: 'Rejected', content: 'Exciting news! We have a new shipment of rare plants arriving next week.' },
  { id: 4, title: 'Gardening Workshop', author: 'Alice Brown', date: '2023-05-22', status: 'Approved', content: 'Learn essential gardening techniques in our upcoming workshop.' },
  { id: 5, title: 'Plant Care Tips', author: 'Charlie Davis', date: '2023-05-19', status: 'Pending', content: 'Check out our latest blog post for expert plant care tips and tricks!' },
]

const AnnouncesPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')

  const filteredAnnouncements = announcements.filter(announcement =>
    (announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    announcement.author.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (statusFilter === 'All' || announcement.status === statusFilter)
  )

  return (
    <div className="bg-gray-100 min-h-screen">
        <Card title='Announcements Management'>
          <div className="flex flex-col md:flex-row justify-between items-center mb-4">
            <div className="w-full md:w-1/3 mb-4 md:mb-0">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search announcements..."
                  className="w-full pl-10 pr-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0096c7]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
              </div>
            </div>
            <div className="flex space-x-4">
              <select
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All Status</option>
                <option value="Approved">Approved</option>
                <option value="Pending">Pending</option>
                <option value="Rejected">Rejected</option>
              </select>
              <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded flex items-center hover:bg-gray-300 transition duration-300">
                <Filter size={20} className="mr-2" />
                More Filters
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredAnnouncements.map((announcement) => (
              <div key={announcement.id} className="bg-white border border-gray-200 rounded shadow-sm overflow-hidden">
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{announcement.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{announcement.content}</p>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>{announcement.author}</span>
                    <span>{announcement.date}</span>
                  </div>
                </div>
                <div className="bg-gray-50 px-5 py-3 flex justify-between items-center">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    announcement.status === 'Approved' ? 'bg-green-100 text-green-800' :
                    announcement.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {announcement.status}
                  </span>
                  <div className="flex space-x-2">
                    <button className="text-green-600 hover:text-green-800">
                      <Check size={20} />
                    </button>
                    <button className="text-red-600 hover:text-red-800">
                      <X size={20} />
                    </button>
                    <button className="text-blue-600 hover:text-blue-800">
                      <AlertCircle size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
    </div>
  )
}

export default AnnouncesPage