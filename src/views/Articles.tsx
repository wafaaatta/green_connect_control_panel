import React, { useEffect, useState } from 'react'
import { Search, Filter, Edit, Trash, Eye, Plus, Text, FolderTree } from 'lucide-react'
import { Card } from '../components/Card'
import { DataTable } from '../components/DataTable'
import { Breadcrumb } from '../components/Breadcrumb'
import Button from '../components/Button'
import { useAppDispatch, useAppSelector } from '../hooks/hooks'
import { createArticle, deleteArticle, getAllArticles } from '../redux/stores/article_store'
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

const initialArticles = [
  { id: 1, title: '10 Easy-to-Grow Houseplants for Beginners', author: 'John Doe', category: 'Indoor Plants', status: 'Published', date: '2023-05-15' },
  { id: 2, title: 'The Ultimate Guide to Composting', author: 'Jane Smith', category: 'Sustainable Gardening', status: 'Draft', date: '2023-05-18' },
  { id: 3, title: 'How to Design a Beautiful Flower Garden', author: 'Alice Brown', category: 'Outdoor Landscaping', status: 'Published', date: '2023-05-10' },
  { id: 4, title: 'Understanding Plant Nutrition', author: 'Bob Johnson', category: 'Plant Care', status: 'Under Review', date: '2023-05-20' },
  { id: 5, title: 'Seasonal Gardening: What to Plant in Spring', author: 'Charlie Davis', category: 'Gardening Tips', status: 'Published', date: '2023-05-12' },
]
const breadcrumbItems = [
  { label: 'Dashboard', href: '/' },
  { label: 'Article', href: '/articles' },
];
const ArticlesPage = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { articles, loading } = useAppSelector(state => state.article_store);
  const { categories } = useAppSelector(state => state.article_category_store)

  console.log(articles);
  

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
  );

  useEffect(() => {
    dispatch(getAllArticles());
    dispatch(getAllCategories());
  }, [dispatch]);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('')
  const [category, setCategory] = useState('');
  const [image, setImage] = useState<File | null>(null);

  const handleAdd = async () => {
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      formData.append('article_category_id', category);
      formData.append('image', image as File);
      formData.append('manager_id', '1');
      await dispatch(createArticle(formData));
      dispatch(
        showNotification({
          type: 'info',
          message: 'Article created successfully',
        })
      );

      setTitle('');
      setContent('');
      setCategory('');
      setImage(null);
      setIsAddModalOpen(false);
    } catch (error) {
      console.log(error);
      dispatch(
        showNotification({
          type: 'error',
          message: 'Failed to create article',
          description: (error as Error).message,
        })
      );
    }
  };

  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const openDeleteModal = (article: Article) => {
    setSelectedArticle(article);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    try {
      await dispatch(deleteArticle(selectedArticle!.id));
      dispatch(
        showNotification({
          type: 'info',
          message: 'Article deleted successfully',
        })
      );
    } catch (error) {
      console.log(error);
      dispatch(
        showNotification({
          type: 'error',
          message: 'Failed to delete article',
          description: (error as Error).message,
        })
      );
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <ActionBar />
      <Card 
        title='Articles'
      >
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
                onClick={() => setIsAddModalOpen(true)}
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

      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title='Add Article'>
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
          options={categories.map(cat => {
            return {
              label: cat.name,
              value: cat.id
            }
          })}
          value={category}
          onChange={(value) => {
            setCategory(value as string)
          }}
        />

        <div className='mt-4'>
          <FileUpload 
            onFileSelect={(file) => {
              setImage(file[0]); 
            }}
          />
        </div>

        <div className="flex justify-end gap-2 mt-4">

          <Button variant='outline' color="gray" onClick={() => setIsAddModalOpen(false)}>
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
        title='Delete Article'
        content='Are you sure you want to delete this article?'
        onAccept={handleDelete}
        onCancel={() => setIsDeleteModalOpen(false)}
      />
    </div>
  )
}

export default ArticlesPage