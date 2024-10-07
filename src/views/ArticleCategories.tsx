import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppDispatch, useAppSelector } from '../hooks/hooks'
import { createCategory, deleteCategory, getAllCategories, updateCategory } from '../redux/stores/article_category_store'
import { Card } from '../components/Card'
import { DataTable } from '../components/DataTable'
import Button from '../components/Button'
import { Breadcrumb } from '../components/Breadcrumb'
import { Package, Plus, Trash, Edit, Save } from 'lucide-react'
import Modal from '../components/Modal'
import Input from '../components/Input'
import { IconType } from 'react-icons'
import { showNotification } from '../redux/stores/notification_store'
import ArticleCategory from '../interfaces/ArticleCategory'
import { DangerModal } from '../components/DangerModal'
import IconTextButton from '../components/IconTextButton'
import moment from 'moment'
import { useTranslation } from 'react-i18next'

const ArticleCategoriesPage: React.FC = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { categories } = useAppSelector(state => state.article_category_store)
  const [name, setName] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<ArticleCategory | null>(null)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [editName, setEditName] = useState('')

  useEffect(() => {
    dispatch(getAllCategories())
  }, [dispatch])

  const breadcrumbItems = [
    { label: t('articleCategories.dashboard'), href: '/' },
    { label: t('articleCategories.articleCategories'), href: '/article-categories' },
  ]

  const ActionBar: React.FC = () => (
    <motion.div
      className="bg-white shadow rounded px-4 py-2 mb-4"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <Breadcrumb items={breadcrumbItems} />
        <div className="flex flex-wrap items-center gap-2">
          <Button leftIcon={Plus as IconType} size="sm" onClick={() => setIsAddModalOpen(true)}>
            {t('articleCategories.newCategory')}
          </Button>
        </div>
      </div>
    </motion.div>
  )

  const handleAdd = async () => {
    try {
      await dispatch(createCategory(name))
      dispatch(showNotification({ type: 'info', message: t('articleCategories.categoryAddedSuccess') }))
      setIsAddModalOpen(false)
      setName('')
    } catch (error) {
      console.log(error)
      dispatch(showNotification({
        type: 'error',
        message: t('articleCategories.categoryAddedFail'),
        description: (error as Error).message,
      }))
    }
  }

  const handleEdit = async () => {
    if (!selectedCategory) return
    try {
      await dispatch(updateCategory({ id: selectedCategory.id, name: editName }))
      dispatch(showNotification({ type: 'info', message: t('articleCategories.categoryUpdatedSuccess') }))
      setIsEditModalOpen(false)
      setSelectedCategory(null)
      setEditName('') 
    } catch (error) {
      console.log(error)
      dispatch(showNotification({
        type: 'error',
        message: t('articleCategories.categoryUpdatedFail'),
        description: (error as Error).message,
      }))
    }
  }

  const openEditModal = (category: ArticleCategory) => {
    setSelectedCategory(category)
    setEditName(category.name)
    setIsEditModalOpen(true)
  }

  const openDeleteModal = (category: ArticleCategory) => {
    setSelectedCategory(category)
    setIsDeleteModalOpen(true)
  }

  const handleDelete = async () => {
    if (!selectedCategory) return
    try {
      await dispatch(deleteCategory(selectedCategory.id))
      dispatch(showNotification({ type: 'info', message: t('articleCategories.categoryDeletedSuccess') }))
      setIsDeleteModalOpen(false)
      setSelectedCategory(null)
    } catch (error) {
      console.log(error)
      dispatch(showNotification({
        type: 'error',
        message: t('articleCategories.categoryDeletedFail'),
        description: (error as Error).message,
      }))
    }
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="">
        <ActionBar />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <DataTable 
              hoverable
              striped
              showColumnSelector
              columns={[
                { id: 'id', title: t('articleCategories.id'), key: 'id', flex: 1, align: 'left' },
                { id: 'name', title: t('articleCategories.name'), key: 'name', flex: 1, align: 'left' },
                { id: 'created_at', title: t('articleCategories.createdAt'), key: 'created_at', flex: 1, align: 'left', render(_, row) {
                  return moment(row.created_at).format('YYYY-MM-DD HH:mm:ss')
                }, },
              ]}
              data={categories}
              actions={(row) => (
                <div className="flex space-x-2">
                  <IconTextButton 
                    icon={Edit as IconType}
                    onClick={() => openEditModal(row)}
                    text={t('articleCategories.edit')}
                  />
                  <IconTextButton
                    icon={Trash as IconType}
                    color='red'
                    onClick={() => openDeleteModal(row)}
                    text={t('articleCategories.delete')}
                  />
                </div>
              )}
            />
          </Card>
        </motion.div>
      </div>

      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title={t('articleCategories.addCategory')}>
        <Input 
          label={t('articleCategories.name')}
          placeholder={t('articleCategories.categoryNamePlaceholder')}
          icon={Package as IconType}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div className="flex justify-end space-x-2 mt-4">
          <Button variant='outline' color='gray' onClick={() => setIsAddModalOpen(false)}>
            {t('articleCategories.cancel')}
          </Button>
          <Button color="blue" onClick={handleAdd}>
            {t('articleCategories.create')}
          </Button>
        </div>
      </Modal>

      <AnimatePresence>
        {isEditModalOpen && (
          <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title={t('articleCategories.editCategory')}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Input 
                label={t('articleCategories.name')}
                placeholder={t('articleCategories.categoryNamePlaceholder')}
                icon={Package as IconType}
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
              />
              <div className="flex justify-end space-x-2 mt-4">
                <Button variant='outline' color='gray' onClick={() => setIsEditModalOpen(false)}>
                  {t('articleCategories.cancel')}
                </Button>
                <Button color="blue" onClick={handleEdit} leftIcon={Save as IconType}>
                  {t('articleCategories.saveChanges')}
                </Button>
              </div>
            </motion.div>
          </Modal>
        )}
      </AnimatePresence>

      <DangerModal 
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title={t('articleCategories.deleteCategory')}
        content={t('articleCategories.deleteCategoryConfirmation', { name: selectedCategory?.name })}
        onAccept={handleDelete}
        onCancel={() => setIsDeleteModalOpen(false)}
      />
    </div>
  )
}

export default ArticleCategoriesPage