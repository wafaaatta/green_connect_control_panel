import React, { useState } from 'react'
import { Search, Filter, MoreVertical, Edit, Trash, UserPlus } from 'lucide-react'

const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'User', status: 'Active', joinDate: '2023-05-15' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Admin', status: 'Active', joinDate: '2023-04-20' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'Inactive', joinDate: '2023-05-10' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Moderator', status: 'Active', joinDate: '2023-05-01' },
  { id: 5, name: 'Charlie Davis', email: 'charlie@example.com', role: 'User', status: 'Active', joinDate: '2023-05-18' },
]

const UsersPage = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className=" mx-auto">
        
        <div className="bg-white rounded shadow p-4 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <div className="w-full md:w-1/3 mb-4 md:mb-0">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search users..."
                  className="w-full pl-10 pr-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0096c7]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md flex items-center hover:bg-gray-300 transition duration-300">
                <Filter size={20} className="mr-2" />
                Filter
              </button>
              <button className="bg-[#0096c7] text-white px-4 py-2 rounded-md flex items-center hover:bg-[#00b4d8] transition duration-300">
                <UserPlus size={20} className="mr-2" />
                Add User
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Join Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img className="h-10 w-10 rounded-full" src={`https://ui-avatars.com/api/?name=${user.name}&background=random`} alt="" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{user.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.joinDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-[#0096c7] hover:text-[#00b4d8] mr-3">
                        <Edit size={18} />
                      </button>
                      <button className="text-red-600 hover:text-red-800">
                        <Trash size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UsersPage