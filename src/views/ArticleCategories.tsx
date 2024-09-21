import React, { useState } from 'react'
import { Plus, Edit, Trash, Save } from 'lucide-react'

const initialCategories = [
  { id: 1, name: 'Gardening Tips', articleCount: 15 },
  { id: 2, name: 'Plant Care', articleCount: 22 },
  { id: 3, name: 'Indoor Plants', articleCount: 18 },
  { id: 4, name: 'Outdoor Landscaping', articleCount: 10 },
  { id: 5, name: 'Sustainable Gardening', articleCount: 8 },
]

const ArticleCategoriesPage = () => {
  const [categories, setCategories] = useState(initialCategories)
  const [newCategory, setNewCategory] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editingName, setEditingName] = useState('')

  const addCategory = () => {
    if (newCategory.trim()) {
      const newId = Math.max(...categories.map(c => c.id)) + 1
      setCategories([...categories, { id: newId, name: newCategory, articleCount: 0 }])
      setNewCategory('')
    }
  }

  const startEditing = (category) => {
    setEditingId(category.id)
    setEditingName(category.name)
  }

  const saveEdit = () => {
    setCategories(categories.map(c => 
      c.id === editingId ? { ...c, name: editingName } : c
    ))
    setEditingId(null)
  }

  const deleteCategory = (id) => {
    setCategories(categories.filter(c => c.id !== id))
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className=" mx-auto">
        
        <div className="bg-white rounded shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Articles</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {categories.map((category) => (
                <tr key={category.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingId === category.id ? (
                      <input
                        type="text"
                        className="w-full px-2 py-1 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0096c7]"
                        value={editingName}
                        onChange={(e) => setEditingName(e.target.value)}
                      />
                    ) : (
                      <div className="text-sm font-medium text-gray-900">{category.name}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{category.articleCount}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {editingId === category.id ? (
                      <button onClick={saveEdit} className="text-green-600 hover:text-green-900 mr-3">
                        <Save size={18} />
                      </button>
                    ) : (
                      <button onClick={() => startEditing(category)} className="text-[#0096c7] hover:text-[#00b4d8] mr-3">
                        <Edit size={18} />
                      </button>
                    )}
                    <button onClick={() => deleteCategory(category.id)} className="text-red-600 hover:text-red-900">
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
  )
}

export default ArticleCategoriesPage