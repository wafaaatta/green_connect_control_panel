import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/hooks'
import { createCategory, deleteCategory, getAllCategories } from '../redux/stores/article_category_store'
import { Card } from '../components/Card'
import { DataTable } from '../components/DataTable'
import Button from '../components/Button'
import { Breadcrumb } from '../components/Breadcrumb'
import { Package, Plus, Trash } from 'lucide-react'
import Modal from '../components/Modal'
import Input from '../components/Input'
import { IconType } from 'react-icons'
import { showNotification } from '../redux/stores/notification_store'
import ArticleCategory from '../interfaces/ArticleCategory'
import { DangerModal } from '../components/DangerModal'
import IconTextButton from '../components/IconTextButton'


const ArticleCategoriesPage = () => {
  const dispatch = useAppDispatch()
  const { categories } = useAppSelector(state => state.article_category_store)
  const [name, setName] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<ArticleCategory | null>(null)

  useEffect(() => {
    dispatch(getAllCategories())
  }, [dispatch])

  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const breadcrumbItems = [
    { label: 'Dashboard', href: '/' },
    { label: 'Article Categories', href: '/article-categories' },
  ];
  const ActionBar: React.FC = () => (
    <div className="bg-white shadow rounded px-4 py-2 mb-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <Breadcrumb items={breadcrumbItems} />
        <div className="flex flex-wrap items-center gap-2">
          <Button color="blue" leftIcon={Plus} size="sm" onClick={() => setIsAddModalOpen(true)}>
            New Category
          </Button>
        </div>
      </div>
    </div>
  );


  const handleAdd = async () => {
    try{
      await dispatch(createCategory(name))
      dispatch(
        showNotification({
          type: 'info',
          message: 'Category added successfully',
        })
      )
    }catch(error){
      console.log(error)
      dispatch(
        showNotification({
          type: 'error',
          message: 'Failed to add category',
          description: (error as Error).message,
        })
      )
    }
  }

  const openDeleteModal = (category: ArticleCategory) => {
    setSelectedCategory(category)
    setIsDeleteModalOpen(true)
  }

  const handleDelete = async () => {
    try{
      await dispatch(deleteCategory(selectedCategory!.id))
      dispatch(
        showNotification({
          type: 'info',
          message: 'Category deleted successfully',
        })
      )
    }catch(error){
      console.log(error)
      dispatch(
        showNotification({
          type: 'error',
          message: 'Failed to delete category',
          description: (error as Error).message,
        })
      )
    }
  }


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
            actions={(row) => (
              <div className="flex space-x-2">
                <IconTextButton 
                  icon={Package as IconType}
                  onClick={() => setSelectedCategory(row)}
                  text='Edit'
                />

                <IconTextButton
                  icon={Trash as IconType}
                  color='red'
                  onClick={() => openDeleteModal(row)}
                  text='Delete'
                />
              </div>
            )}
          />
        </Card>
      </div>

      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title='Add Category'>
            <Input 
              label='Name'
              placeholder='Category Name'
              icon={Package as IconType}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <div className="flex justify-end space-x-2 mt-4">
              <Button variant='outline' color='gray' onClick={() => setIsAddModalOpen(false)}>
                Cancel
              </Button>
              <Button color="blue" onClick={handleAdd}>
                Create
              </Button>
            </div>
      </Modal>

      <DangerModal 
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title='Delete Category'
        content={`Are you sure you want to delete "${selectedCategory?.name}" category?`}
        onAccept={handleDelete}
        onCancel={() => setIsDeleteModalOpen(false)}
      />
    </div>
  )
}

export default ArticleCategoriesPage