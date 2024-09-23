"use client"

import React, { useState } from 'react'
import { Search, Plus, Edit, Trash, Shield, Mail, Phone, Calendar, Grid, List, Table as TableIcon } from 'lucide-react'
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
  const [layout, setLayout] = useState<'grid' | 'list' | 'table'>('grid')

  const filteredManagers = managers.filter(manager =>
    manager.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    manager.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    manager.role.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const LayoutToggle = () => (
    <div className="flex bg-gray-200 rounded-lg p-1">
      <LayoutButton icon={<Grid size={18} />} name="grid" current={layout} onClick={() => setLayout('grid')} />
      <LayoutButton icon={<List size={18} />} name="list" current={layout} onClick={() => setLayout('list')} />
      <LayoutButton icon={<TableIcon size={18} />} name="table" current={layout} onClick={() => setLayout('table')} />
    </div>
  )

  const LayoutButton = ({ icon, name, current, onClick }) => (
    <button
      className={`flex items-center justify-center p-2 rounded-md transition-all duration-200 ${
        current === name ? 'bg-white text-[#0096c7] shadow-sm' : 'text-gray-600 hover:bg-gray-300'
      }`}
      onClick={onClick}
      aria-label={`Switch to ${name} view`}
    >
      {icon}
    </button>
  )

  const GridView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {filteredManagers.map((manager) => (
        <div key={manager.id} className="bg-white rounded shadow overflow-hidden border">
          <div className="p-5">
            <div className="flex justify-between items-start">
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
          </div>
          <div className="bg-gray-50 px-5 py-3 flex justify-between items-center">
            <button className="text-[#0096c7] hover:text-[#00b4d8] flex items-center transition-colors duration-200">
              <Shield size={16} className="mr-1" />
              Permissions
            </button>
            <div>
              <button className="text-[#0096c7] hover:text-[#00b4d8] mr-3 transition-colors duration-200">
                <Edit size={18} />
              </button>
              <button className="text-red-600 hover:text-red-900 transition-colors duration-200">
                <Trash size={18} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )

  const ListView = () => (
    <div className="space-y-4">
      {filteredManagers.map((manager) => (
        <div key={manager.id} className="bg-white rounded shadow overflow-hidden border">
          <div className="p-5 flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-[#0096c7] rounded-full flex items-center justify-center text-white font-semibold text-lg">
                  {manager.name.split(' ').map(n => n[0]).join('')}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{manager.name}</h3>
                <p className="text-sm text-gray-600">{manager.role}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                manager.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {manager.status}
              </span>
              <button className="text-[#0096c7] hover:text-[#00b4d8] transition-colors duration-200">
                <Shield size={18} />
              </button>
              <button className="text-[#0096c7] hover:text-[#00b4d8] transition-colors duration-200">
                <Edit size={18} />
              </button>
              <button className="text-red-600 hover:text-red-900 transition-colors duration-200">
                <Trash size={18} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )

  const TableView = () => (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Join Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {filteredManagers.map((manager) => (
            <tr key={manager.id} className="hover:bg-gray-50 transition-colors duration-200">
              <td className="px-6 py-4 whitespace-nowrap">{manager.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{manager.role}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">{manager.email}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">{manager.phone}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">{manager.joinDate}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  manager.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {manager.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button className="text-[#0096c7] hover:text-[#00b4d8] mr-3 transition-colors duration-200">
                  <Shield size={18} />
                </button>
                <button className="text-[#0096c7] hover:text-[#00b4d8] mr-3 transition-colors duration-200">
                  <Edit size={18} />
                </button>
                <button className="text-red-600 hover:text-red-900 transition-colors duration-200">
                  <Trash size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <Card
        title='Managers'
        headerAction={
          <div className="flex space-x-4">
            <LayoutToggle />
            <button className="bg-[#0096c7] text-white px-4 py-2 rounded-lg hover:bg-[#00b4d8] transition duration-300 flex items-center">
              <Plus size={20} className="mr-2" />
              Add New Manager
            </button>
          </div>
        }
      >
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search managers..."
              className="w-full pl-10 pr-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#0096c7]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          </div>
        </div>
        
        {layout === 'grid' && <GridView />}
        {layout === 'list' && <ListView />}
        {layout === 'table' && <TableView />}
      </Card>
    </div>
  )
}

export default ManagersPage