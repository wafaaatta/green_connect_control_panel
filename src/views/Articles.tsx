import React, { useEffect, useState } from 'react'
import { Edit, Trash, Plus, Text, FolderTree } from 'lucide-react'
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
import { IconType } from 'react-icons'
import { useTranslation } from 'react-i18next'

const ArticlesPage: React.FC = () => {
  const { t } = useTranslation()

  const breadcrumbItems = [
    { label: t('articlesPage.dashboard'), href: '/' },
    { label: t('articlesPage.article'), href: '/articles' },
  ]

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
          <Button color="blue" leftIcon={Plus as IconType} size="sm" onClick={() => setIsAddModalOpen(true)}>
            {t('articlesPage.newArticle')}
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
          message: t('articlesPage.articleCreatedSuccess'),
        })
      )
      resetForm()
      setIsAddModalOpen(false)
    } catch (error) {
      console.log(error)
      dispatch(
        showNotification({
          type: 'error',
          message: t('articlesPage.articleCreatedFail'),
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
          message: t('articlesPage.articleUpdatedSuccess'),
        })
      )
      resetForm()
      setIsEditModalOpen(false)
    } catch (error) {
      console.log(error)
      dispatch(
        showNotification({
          type: 'error',
          message: t('articlesPage.articleUpdatedFail'),
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
          message: t('articlesPage.articleDeletedSuccess'),
        })
      )
      setIsDeleteModalOpen(false)
    } catch (error) {
      console.log(error)
      dispatch(
        showNotification({
          type: 'error',
          message: t('articlesPage.articleDeletedFail'),
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
      <Card title={t('articlesPage.articles')}>
        <DataTable 
          hoverable
          striped
          showColumnSelector
          paginated
          emptyMessage={t('articlesPage.noArticlesFound')}
          loading={loading}
          columns={[
            { title: t('articlesPage.id'), key: 'id', id: 'id' },
            { title: t('articlesPage.title'), key: 'title', id: 'title' },
            { title: t('articlesPage.content'), key: 'content', id: 'content', align: 'left', render(_, row) {
              return (
                <div className="max-w-sm break-words leading-relaxed text-wrap">
                  {row.content}
                </div>
              )
            }, },
            { title: t('articlesPage.category'), key: ['article_category', 'name'], id: 'category' },
            { title: t('articlesPage.image'), key: 'image', id: 'image' , render(_, row) {
              return (
                <div className="w-20 h-20">
                  <ImageControl src={getFileUrl(row.image)} alt={t('articlesPage.imageAlt')} />
                </div>
              )
            },},
          ]}
          data={articles}
          actions={(row) => (
            <div className="flex gap-2">
              <IconTextButton 
                icon={Edit as IconType}
                text={t('articlesPage.edit')}
                onClick={() => openEditModal(row)}
              />
              <IconTextButton 
                icon={Trash as IconType}
                text={t('articlesPage.delete')}
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
      }} title={isEditModalOpen ? t('articlesPage.editArticle') : t('articlesPage.addArticle')}>
        <Input 
          label={t('articlesPage.title')}
          placeholder={t('articlesPage.titlePlaceholder')}
          required
          icon={Text as IconType}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <TextArea 
          label={t('articlesPage.content')}
          placeholder={t('articlesPage.contentPlaceholder')}
          rows={5}
          required
          icon={Text as IconType}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <Select 
          label={t('articlesPage.category')}
          placeholder={t('articlesPage.categoryPlaceholder')}
          icon={FolderTree as IconType}
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
            {t('articlesPage.cancel')}
          </Button>
          <Button color="blue" onClick={isEditModalOpen ? handleEdit : handleAdd}>
            {isEditModalOpen ? t('articlesPage.update') : t('articlesPage.create')}
          </Button>
        </div>
      </Modal>

      <DangerModal 
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title={t('articlesPage.deleteArticle')}
        content={t('articlesPage.deleteConfirmation')}
        onAccept={handleDelete}
        onCancel={() => setIsDeleteModalOpen(false)}
      />
    </div>
  )
}

export default ArticlesPage