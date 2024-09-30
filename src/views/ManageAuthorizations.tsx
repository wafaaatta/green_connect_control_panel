
import { useState } from 'react'
import { Check, X, Search, RefreshCw, Save,  } from 'lucide-react'

// Mock data for manager and authorizations
const managerData = {
  id: 1,
  name: "John Doe",
  email: "john.doe@greenconnect.com",
  role: "Content Manager",
  avatar: "https://i.pravatar.cc/150?img=68"
}

const allAuthorizations = [
  { id: 1, name: "Create Articles", description: "Ability to create new articles" },
  { id: 2, name: "Edit Articles", description: "Ability to edit existing articles" },
  { id: 3, name: "Delete Articles", description: "Ability to delete articles" },
  { id: 4, name: "Manage Users", description: "Ability to manage user accounts" },
  { id: 5, name: "Create Events", description: "Ability to create new events" },
  { id: 6, name: "Edit Events", description: "Ability to edit existing events" },
  { id: 7, name: "Delete Events", description: "Ability to delete events" },
  { id: 8, name: "Manage Comments", description: "Ability to moderate comments" },
  { id: 9, name: "Access Analytics", description: "Ability to view site analytics" },
  { id: 10, name: "Manage Categories", description: "Ability to manage article categories" },
]

const ManageAuthorizations = () => {
  const [grantedAuthorizations, setGrantedAuthorizations] = useState<number[]>([1, 2, 5, 8])
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const toggleAuthorization = (id: number) => {
    setGrantedAuthorizations(prev => 
      prev.includes(id) ? prev.filter(authId => authId !== id) : [...prev, id]
    )
  }

  const filteredAuthorizations = allAuthorizations.filter(auth => 
    auth.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    auth.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSave = () => {
    setIsLoading(true)
    // Simulating API call
    setTimeout(() => {
      setIsLoading(false)
      alert("Authorizations saved successfully!")
    }, 1500)
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto">        
        {/* Manager Info Card */}
        <div className="bg-white rounded shadow px-2 py-2 mb-4 flex items-center">
          <img src={managerData.avatar} alt={managerData.name} className="w-16 h-18 rounded mr-6" />
          <div>
            <h2 className="text-xl font-semibold text-gray-800">{managerData.name}</h2>
            <p className="text-gray-600">{managerData.email}</p>
            <p className="text-sm text-gray-500 mt-1">{managerData.role}</p>
          </div>
        </div>

        {/* Search and Actions */}
        <div className="flex justify-between items-center mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search authorizations..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          </div>
          <div className="space-x-4">
            <button
              onClick={() => setGrantedAuthorizations([])}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition duration-200"
            >
              <RefreshCw size={18} className="inline mr-2" />
              Reset
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition duration-200"
              disabled={isLoading}
            >
              {isLoading ? (
                <RefreshCw size={18} className="inline mr-2 animate-spin" />
              ) : (
                <Save size={18} className="inline mr-2" />
              )}
              Save Changes
            </button>
          </div>
        </div>

        {/* Authorizations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredAuthorizations.map(auth => (
            <div
              key={auth.id}
              className={`p-4 rounded shadow transition duration-200 ${
                grantedAuthorizations.includes(auth.id)
                  ? 'bg-green-100 border-2 border-green-500'
                  : 'bg-white hover:bg-gray-50'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">{auth.name}</h3>
                  <p className="text-sm text-gray-600">{auth.description}</p>
                </div>
                <button
                  onClick={() => toggleAuthorization(auth.id)}
                  className={`p-2 rounded-full ${
                    grantedAuthorizations.includes(auth.id)
                      ? 'bg-green-500 text-white hover:bg-green-600'
                      : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                  } transition duration-200`}
                  aria-label={grantedAuthorizations.includes(auth.id) ? "Revoke authorization" : "Grant authorization"}
                >
                  {grantedAuthorizations.includes(auth.id) ? (
                    <Check size={20} />
                  ) : (
                    <X size={20} />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredAuthorizations.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No authorizations found matching your search.
          </div>
        )}
      </div>
    </div>
  )
}

export default ManageAuthorizations