import React, { useState } from 'react'
import { Search, Filter, Edit, Trash, Eye, Plus } from 'lucide-react'
import { Card } from '../components/Card'

const initialArticles = [
  { id: 1, title: '10 Easy-to-Grow Houseplants for Beginners', author: 'John Doe', category: 'Indoor Plants', status: 'Published', date: '2023-05-15' },
  { id: 2, title: 'The Ultimate Guide to Composting', author: 'Jane Smith', category: 'Sustainable Gardening', status: 'Draft', date: '2023-05-18' },
  { id: 3, title: 'How to Design a Beautiful Flower Garden', author: 'Alice Brown', category: 'Outdoor Landscaping', status: 'Published', date: '2023-05-10' },
  { id: 4, title: 'Understanding Plant Nutrition', author: 'Bob Johnson', category: 'Plant Care', status: 'Under Review', date: '2023-05-20' },
  { id: 5, title: 'Seasonal Gardening: What to Plant in Spring', author: 'Charlie Davis', category: 'Gardening Tips', status: 'Published', date: '2023-05-12' },
]

const ArticlesPage = () => {
  const [articles, setArticles] = useState(initialArticles)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')

  const filteredArticles = articles.filter(article =>
    (article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.author.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (categoryFilter === 'All' || article.category === categoryFilter) &&
    (statusFilter === 'All' || article.status === statusFilter)
  )

  const categories = [...new Set(articles.map(article => article.category))]
  const statuses = [...new Set(articles.map(article => article.status))]

  return (
    <div className="bg-gray-100 min-h-screen">
      <Card 
        title='Articles Management'
        headerAction={
            <button className="bg-[#0096c7] text-white px-4 py-1.5 rounded hover:bg-[#00b4d8] transition duration-300 flex items-center">
            <Plus size={20} className="mr-2" />
            Create New Article
          </button>
        }
      >
        
        <div className=" ">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <div className="w-full md:w-1/3 mb-4 md:mb-0">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search articles..."
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
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="All">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <select
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All Statuses</option>
                {statuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
              <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded flex items-center hover:bg-gray-300 transition duration-300">
                <Filter size={20} className="mr-2" />
                More Filters
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredArticles.map((article) => (
                  <tr key={article.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{article.title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{article.author}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        {article.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        article.status === 'Published' ? 'bg-green-100 text-green-800' :
                        article.status === 'Draft' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {article.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {article.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-indigo-600 hover:text-indigo-900 mr-3">
                        <Eye size={18} />
                      </button>
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

export default ArticlesPage