import React, { useEffect, useState } from 'react'
import { Plus, Edit, Trash, Save } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '../hooks/hooks'
import { getAllCategories } from '../redux/stores/article_category_store'
import { Card } from '../components/Card'
import { DataTable } from '../components/DataTable'

const initialCategories = [
  { id: 1, name: 'Gardening Tips', articleCount: 15 },
  { id: 2, name: 'Plant Care', articleCount: 22 },
  { id: 3, name: 'Indoor Plants', articleCount: 18 },
  { id: 4, name: 'Outdoor Landscaping', articleCount: 10 },
  { id: 5, name: 'Sustainable Gardening', articleCount: 8 },
]

const ArticleCategoriesPage = () => {
  const dispatch = useAppDispatch()
  const { categories } = useAppSelector(state => state.article_category_store)

  useEffect(() => {
    dispatch(getAllCategories())
  }, [dispatch])


  return (
    <div className="bg-gray-100 min-h-screen">
      <div className=" mx-auto">
        
        <Card>
          <DataTable 
            hoverable
            striped
            showColumnSelector
            columns={[
              { id: 'id', title: 'ID',key: 'id', flex: 1, align: 'left' },
              { id: 'name', title: 'Name',key: 'name', flex: 1, align: 'left' },
            ]}
            data={categories}
          />
        </Card>
      </div>
    </div>
  )
}

export default ArticleCategoriesPage