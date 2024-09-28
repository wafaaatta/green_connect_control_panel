import React, { useEffect, useState } from 'react'
import { Search, Filter, Edit, Trash, Eye, Plus, Text, FolderTree } from 'lucide-react'
import { Card } from '../components/Card'
import { DataTable } from '../components/DataTable'
import { Breadcrumb } from '../components/Breadcrumb'
import Button from '../components/Button'
import { useAppDispatch, useAppSelector } from '../hooks/hooks'
import { createArticle, deleteArticle, getAllArticles, updateArticle } from '../redux/stores/article_store'
import IconTextButton from '../components/IconTextButton'
import Modal from '../components/Modal'
import { DangerModal } from '../components/DangerModal'
import Input from '../components/Input'
import TextArea from '../components/Textarea'
import Select from '../components/Select'
import FileUpload from '../components/FileUpload'
import { getAllCategories } from '../redux/stores/article_category_store'
import { showNotification } from '../redux/stores/notification_store'
import { getFileUrl } from '../utils/laravel_storage'
import ImageControl from '../components/ImageControl'
import Article from '../interfaces/Article'

const breadcrumbItems = [
  { label: 'Dashboard', href: '/' },
  { label: 'Article', href: '/articles' },
]

const ArticlesPage: React.FC = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const dispatch = useAppDispatch()
  const { articles, loading } = useAppSelector(state => state.article_store)
  const { categories } = useAppSelector(state => state.article_category_store)

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [category, setCategory] = useState('')
  const [image, setImage] = useState<File | null>(null)
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null)

  useEffect(() => {
    dispatch(getAllArticles())
    dispatch(getAllCategories())
  }, [dispatch])

  const ActionBar: React.FC = () => (
    <div className="bg-white shadow rounded px-4 py-2 mb-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <Breadcrumb items={breadcrumbItems} />
        <div className="flex flex-wrap items-center gap-2">
          <Button color="blue" leftIcon={Plus} size="sm" onClick={() => setIsAddModalOpen(true)}>
            New Article
          </Button>
        </div>
      </div>
    </div>
  )

  const handleAdd = async () => {
    try {
      const formData = new FormData()
      formData.append('title', title)
      formData.append('content', content)
      formData.append('article_category_id', category)
      formData.append('image', image as File)
      formData.append('manager_id', '1')
      await dispatch(createArticle(formData))
      dispatch(
        showNotification({
          type: 'info',
          message: 'Article created successfully',
        })
      )
      resetForm()
      setIsAddModalOpen(false)
    } catch (error) {
      console.log(error)
      dispatch(
        showNotification({
          type: 'error',
          message: 'Failed to create article',
          description: (error as Error).message,
        })
      )
    }
  }

  const handleEdit = async () => {
    if (!selectedArticle) return

    try {
      const formData = new FormData()
      formData.append('title', title)
      formData.append('content', content)
      formData.append('article_category_id', category)
      if (image) {
        formData.append('image', image)
      }

      await dispatch(updateArticle({ id: selectedArticle.id, data: formData }))
      dispatch(
        showNotification({
          type: 'info',
          message: 'Article updated successfully',
        })
      )
      resetForm()
      setIsEditModalOpen(false)
    } catch (error) {
      console.log(error)
      dispatch(
        showNotification({
          type: 'error',
          message: 'Failed to update article',
          description: (error as Error).message,
        })
      )
    }
  }

  const openEditModal = (article: Article) => {
    setSelectedArticle(article)
    setTitle(article.title)
    setContent(article.content)
    setCategory(article.article_category.id.toString())
    setIsEditModalOpen(true)
  }

  const openDeleteModal = (article: Article) => {
    setSelectedArticle(article)
    setIsDeleteModalOpen(true)
  }

  const handleDelete = async () => {
    if (!selectedArticle) return

    try {
      await dispatch(deleteArticle(selectedArticle.id))
      dispatch(
        showNotification({
          type: 'info',
          message: 'Article deleted successfully',
        })
      )
      setIsDeleteModalOpen(false)
    } catch (error) {
      console.log(error)
      dispatch(
        showNotification({
          type: 'error',
          message: 'Failed to delete article',
          description: (error as Error).message,
        })
      )
    }
  }

  const resetForm = () => {
    setTitle('')
    setContent('')
    setCategory('')
    setImage(null)
    setSelectedArticle(null)
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <ActionBar />
      <Card title='Articles'>
        <DataTable 
          hoverable
          striped
          showColumnSelector
          paginated
          emptyMessage='No articles found'
          loading={loading}
          columns={[
            { title: 'ID', key: 'id', id: 'id' },
            { title: 'Title', key: 'title', id: 'title' },
            { title: 'Content', key: 'content', id: 'content' },
            { title: 'Category', key: ['article_category', 'name'], id: 'category' },
            { title: 'Image', key: 'image', id: 'image' , render(value, row) {
              return (
                <div className="w-20 h-20">
                  <ImageControl src={getFileUrl(row.image)} alt="image" />
                </div>
              )
            },},
          ]}
          data={articles}
          actions={(row) => (
            <div className="flex gap-2">
              <IconTextButton 
                icon={Edit}
                text='Edit'
                onClick={() => openEditModal(row)}
              />
              <IconTextButton 
                icon={Trash}
                text='Delete'
                color='red'
                onClick={() => openDeleteModal(row)}
              />
            </div>
          )}
        />
      </Card>

      <Modal isOpen={isAddModalOpen || isEditModalOpen} onClose={() => {
        setIsAddModalOpen(false)
        setIsEditModalOpen(false)
        resetForm()
      }} title={isEditModalOpen ? 'Edit Article' : 'Add Article'}>
        <Input 
          label='Title'
          placeholder='Title'
          required
          icon={Text}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <TextArea 
          label='Content'
          placeholder='Content'
          rows={5}
          required
          icon={Text}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <Select 
          placeholder='Category'
          icon={FolderTree}
          options={categories.map(cat => ({
            label: cat.name,
            value: cat.id.toString()
          }))}
          value={category}
          onChange={(value) => setCategory(value as string)}
        />

        <div className='mt-4'>
          <FileUpload 
            onFileSelect={(file) => setImage(file[0])}
            mode="single"
          />
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <Button variant='outline' color="gray" onClick={() => {
            setIsAddModalOpen(false)
            setIsEditModalOpen(false)
            resetForm()
          }}>
            Cancel
          </Button>
          <Button color="blue" onClick={isEditModalOpen ? handleEdit : handleAdd}>
            {isEditModalOpen ? 'Update' : 'Create'}
          </Button>
        </div>
      </Modal>

      <DangerModal 
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title='Delete Article'
        content='Are you sure you want to delete this article?'
        onAccept={handleDelete}
        onCancel={() => setIsDeleteModalOpen(false)}
      />
    </div>
  )
}

export default ArticlesPage