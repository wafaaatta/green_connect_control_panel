import React, { useState } from 'react'
import { Calendar, Search, Filter, MapPin, Clock, Users, Plus, Edit, Trash } from 'lucide-react'
import { Card } from '../components/Card'

const events = [
  { id: 1, title: "Urban Gardening Workshop", date: "2023-06-15", time: "10:00 AM - 12:00 PM", location: "Community Center", attendees: 25, status: "Upcoming" },
  { id: 2, title: "Plant Swap Meet", date: "2023-06-20", time: "2:00 PM - 4:00 PM", location: "City Park", attendees: 50, status: "Upcoming" },
  { id: 3, title: "Composting 101", date: "2023-06-25", time: "11:00 AM - 1:00 PM", location: "Botanical Gardens", attendees: 30, status: "Upcoming" },
  { id: 4, title: "Sustainable Landscaping Seminar", date: "2023-07-02", time: "3:00 PM - 5:00 PM", location: "Public Library", attendees: 40, status: "Upcoming" },
  { id: 5, title: "Indoor Plant Care Workshop", date: "2023-07-10", time: "1:00 PM - 3:00 PM", location: "Community Center", attendees: 35, status: "Upcoming" },
]

const EventsPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (statusFilter === 'All' || event.status === statusFilter)
  )

  return (
    <div className="bg-gray-100 min-h-screen">
      <Card
        title="Events Management"
        headerAction={
            <button className="bg-[#0096c7] text-white px-4 py-1.5 rounded hover:bg-[#00b4d8] transition duration-300 flex items-center">
            <Plus size={20} className="mr-2" />
            Create New Event
          </button>
        }
      >
        
        <div>
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <div className="w-full md:w-1/3 mb-4 md:mb-0">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search events..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0096c7]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
              </div>
            </div>
            <div className="flex space-x-4">
              <select
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All Status</option>
                <option value="Upcoming">Upcoming</option>
                <option value="Ongoing">Ongoing</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
              <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center hover:bg-gray-300 transition duration-300">
                <Filter size={20} className="mr-2" />
                More Filters
              </button>
              <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center hover:bg-gray-300 transition duration-300">
                <Calendar size={20} className="mr-2" />
                Calendar View
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attendees</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredEvents.map((event) => (
                  <tr key={event.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{event.title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar size={16} className="mr-2" />
                        {event.date}
                      </div>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <Clock size={16} className="mr-2" />
                        {event.time}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-500">
                        <MapPin size={16} className="mr-2" />
                        {event.location}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-500">
                        <Users size={16} className="mr-2" />
                        {event.attendees}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        event.status === 'Upcoming' ? 'bg-green-100 text-green-800' :
                        event.status === 'Ongoing' ? 'bg-blue-100 text-blue-800' :
                        event.status === 'Completed' ? 'bg-gray-100 text-gray-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {event.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-[#0096c7] hover:text-[#00b4d8] mr-3">
                        <Edit size={18} />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <Trash size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default EventsPage