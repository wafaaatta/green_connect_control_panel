import React, { useEffect, useState } from 'react'
import { Search, Filter, Edit, Trash, Eye, Plus, Text } from 'lucide-react'
import { Card } from '../components/Card'
import { DataTable } from '../components/DataTable'
import { Breadcrumb } from '../components/Breadcrumb'
import Button from '../components/Button'
import { useAppDispatch, useAppSelector } from '../hooks/hooks'
import { getAllArticles } from '../redux/stores/article_store'
import IconTextButton from '../components/IconTextButton'
import Modal from '../components/Modal'
import { DangerModal } from '../components/DangerModal'
import Input from '../components/Input'
import TextArea from '../components/Textarea'

const initialArticles = [
  { id: 1, title: '10 Easy-to-Grow Houseplants for Beginners', author: 'John Doe', category: 'Indoor Plants', status: 'Published', date: '2023-05-15' },
  { id: 2, title: 'The Ultimate Guide to Composting', author: 'Jane Smith', category: 'Sustainable Gardening', status: 'Draft', date: '2023-05-18' },
  { id: 3, title: 'How to Design a Beautiful Flower Garden', author: 'Alice Brown', category: 'Outdoor Landscaping', status: 'Published', date: '2023-05-10' },
  { id: 4, title: 'Understanding Plant Nutrition', author: 'Bob Johnson', category: 'Plant Care', status: 'Under Review', date: '2023-05-20' },
  { id: 5, title: 'Seasonal Gardening: What to Plant in Spring', author: 'Charlie Davis', category: 'Gardening Tips', status: 'Published', date: '2023-05-12' },
]
const breadcrumbItems = [
  { label: 'Dashboard', href: '/' },
  { label: 'Article Categories', href: '/article-categories' },
];
const ArticlesPage = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { articles, loading } = useAppSelector(state => state.article_store);

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
  }, [dispatch]);

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
            { title: 'Category', key: ['category', 'name'], id: 'category' },
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
        />

        <TextArea 
          label='Content'
          placeholder='Content'
          rows={5}
          required
          icon={Text}
        />

        
      </Modal>

      <DangerModal 
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title='Delete Article'
        content='Are you sure you want to delete this article?'
        onAccept={() => setIsDeleteModalOpen(false)}
        onCancel={() => setIsDeleteModalOpen(false)}
      />
    </div>
  )
}

export default ArticlesPage