import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/hooks'
import { getAllCategories } from '../redux/stores/article_category_store'
import { Card } from '../components/Card'
import { DataTable } from '../components/DataTable'
import Button from '../components/Button'
import { Breadcrumb } from '../components/Breadcrumb'
import { Plus } from 'lucide-react'
import Modal from '../components/Modal'


const ArticleCategoriesPage = () => {
  const dispatch = useAppDispatch()
  const { categories } = useAppSelector(state => state.article_category_store)

  useEffect(() => {
    dispatch(getAllCategories())
  }, [dispatch])

  const breadcrumbItems = [
    { label: 'Dashboard', href: '/' },
    { label: 'Article Categories', href: '/article-categories' },
  ];

  const ActionBar: React.FC = () => (
    <div className="bg-white shadow rounded px-4 py-2 mb-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <Breadcrumb items={breadcrumbItems} />
        <div className="flex flex-wrap items-center gap-2">
          <Button color="blue" leftIcon={Plus} size="sm">
            New Category
          </Button>
        </div>
      </div>
    </div>
  );

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className=" mx-auto">
        <ActionBar />
        
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

      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title='Add Category'>
            
      </Modal>
    </div>
  )
}

export default ArticleCategoriesPage