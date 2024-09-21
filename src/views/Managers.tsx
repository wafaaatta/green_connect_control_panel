import React, { useState } from 'react'
import { Search, Plus, Edit, Trash, Shield, Mail, Phone, Calendar } from 'lucide-react'
import { Card } from '../components/Card'

const initialManagers = [
  { id: 1, name: "Alice Johnson", email: "alice@greenconnect.com", phone: "+1 (555) 123-4567", role: "Super Admin",  joinDate: "2022-01-15", status: "Active" },
  { id: 2, name: "Bob Smith", email: "bob@greenconnect.com", phone: "+1 (555) 234-5678", role: "Content Manager", joinDate: "2022-03-20", status: "Active" },
  { id: 3, name: "Carol Williams", email: "carol@greenconnect.com", phone: "+1 (555) 345-6789", role: "Event Coordinator", joinDate: "2022-05-10", status: "Active" },
  { id: 4, name: "David Brown", email: "david@greenconnect.com", phone: "+1 (555) 456-7890", role: "User Support", joinDate: "2022-07-05", status: "Inactive" },
  { id: 5, name: "Eva Martinez", email: "eva@greenconnect.com", phone: "+1 (555) 567-8901", role: "Marketing Manager", joinDate: "2022-09-15", status: "Active" },
]

const ManagersPage = () => {
  const [managers, setManagers] = useState(initialManagers)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredManagers = managers.filter(manager =>
    manager.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    manager.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    manager.role.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="bg-gray-100 min-h-screen">
      <Card
        title='Managers'
        headerAction={
          <button className="bg-[#0096c7] text-white px-4 py-1.5 rounded hover:bg-[#00b4d8] transition duration-300 flex items-center">
            <Plus size={20} className="mr-2" />
            Add New Manager
          </button>
        }
      >
        
        <div>
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <div className="w-full md:w-1/3 mb-4 md:mb-0">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search managers..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0096c7]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredManagers.map((manager) => (
              <div key={manager.id} className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                <div className="p-5">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{manager.name}</h3>
                      <p className="text-sm text-gray-600">{manager.role}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      manager.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {manager.status}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <Mail size={16} className="mr-2" />
                      {manager.email}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Phone size={16} className="mr-2" />
                      {manager.phone}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar size={16} className="mr-2" />
                      Joined: {manager.joinDate}
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-5 py-3 flex justify-between items-center">
                  <button className="text-[#0096c7] hover:text-[#00b4d8] flex items-center">
                    <Shield size={16} className="mr-1" />
                    Permissions
                  </button>
                  <div>
                    <button className="text-[#0096c7] hover:text-[#00b4d8] mr-3">
                      <Edit size={18} />
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      <Trash size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  )
}

export default ManagersPage