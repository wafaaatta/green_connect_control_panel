"use client"

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {  Plus, Edit, Trash, Shield, Mail, Grid, List, Table as TableIcon, MailIcon, User, Lock } from 'lucide-react'
import { Card } from '../components/Card'
import Modal from '../components/Modal'
import { DangerModal } from '../components/DangerModal'
import Input from '../components/Input'
import Button from '../components/Button'
import { useAppDispatch, useAppSelector } from '../hooks/hooks'
import { createManager, deleteManager, getAllManagers, updateManager } from '../redux/stores/manager_store'
import Manager from './../interfaces/Manager';
import { unwrapResult } from '@reduxjs/toolkit'
import { showNotification } from '../redux/stores/notification_store'
import { IconType } from 'react-icons'

const ManagersPage: React.FC = () => {
  const [layout, setLayout] = useState<'grid' | 'list' | 'table'>('grid')
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedManager, setSelectedManager] = useState(null)
  const [newManager, setNewManager] = useState({ name: '', email: '',  password: '' })

  const ActionBar: React.FC = () => (
    <motion.div
      className="bg-white shadow border rounded py-2 px-4 mb-4 flex flex-wrap justify-between items-center gap-4"
    >
      <h1 className="text-2xl font-bold text-gray-800">Managers</h1>
      <div className="flex flex-wrap items-center gap-4">
        <LayoutToggle />
        <Button color="blue" leftIcon={Plus as IconType} onClick={() => setIsCreateModalOpen(true)}>
          Add New Manager
        </Button>
      </div>
    </motion.div>
  )

  const LayoutToggle: React.FC = () => (
    <div className="flex space-x-2 bg-gray-200 rounded p-1">
      <LayoutButton icon={<Grid size={18} />} name="grid" current={layout} onClick={() => setLayout('grid')} />
      <LayoutButton icon={<List size={18} />} name="list" current={layout} onClick={() => setLayout('list')} />
      <LayoutButton icon={<TableIcon size={18} />} name="table" current={layout} onClick={() => setLayout('table')} />
    </div>
  )

  const LayoutButton: React.FC<{ icon: React.ReactNode; name: string; current: string; onClick: () => void }> = ({ icon, name, current, onClick }) => (
    <button
      className={`flex items-center justify-center p-2 rounded transition-all duration-200 ${
        current === name ? 'bg-white text-[#0096c7] shadow-sm' : 'text-gray-600 hover:bg-gray-300'
      }`}
      onClick={onClick}
      aria-label={`Switch to ${name} view`}
    >
      {icon}
    </button>
  )

  const dispatch = useAppDispatch()
  const {managers} = useAppSelector(state => state.manager_store)

  const GridView: React.FC = () => (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
    >
      {managers.map((manager) => (
        <motion.div
          key={manager.id}
          className="bg-white rounded shadow overflow-hidden border"
        >
          <div className="p-5">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{manager.name}</h3>
              </div>
            </div>
          </div>
          <div className="flex justify-end p-2 bg-gray-100">
              <button className="text-[#0096c7] hover:text-[#00b4d8] mr-3 transition-colors duration-200" onClick={() => handleEdit(manager)}>
                <Edit size={18} />
              </button>
              <button className="text-red-600 hover:text-red-900 transition-colors duration-200" onClick={() => handleDelete(manager)}>
                <Trash size={18} />
              </button>
            </div>
        </motion.div>
      ))}
    </motion.div>
  )

  const ListView: React.FC = () => (
    <motion.div
      className="space-y-4"
    >
      {managers.map((manager) => (
        <motion.div
          key={manager.id}
          className="bg-white rounded shadow overflow-hidden border"
        >
          <div className="p-4 flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-[#0096c7] rounded-full flex items-center justify-center text-white font-semibold text-lg">
                  {manager.name.split(' ').map(n => n[0]).join('')}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{manager.name}</h3>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-[#0096c7] hover:text-[#00b4d8] transition-colors duration-200" onClick={() => handleEdit(manager)}>
                <Edit size={18} />
              </button>
              <button className="text-red-600 hover:text-red-900 transition-colors duration-200" onClick={() => handleDelete(manager)}>
                <Trash size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )

  const TableView: React.FC = () => (
    <motion.div
      className="overflow-x-auto"
    >
      <table className="min-w-full bg-white rounded overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {managers.map((manager) => (
            <motion.tr
              key={manager.id}
              className="hover:bg-gray-50 transition-colors duration-200"
            >
              <td className="px-6 py-4 whitespace-nowrap">{manager.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">{manager.email}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button className="text-[#0096c7] hover:text-[#00b4d8] mr-3 transition-colors duration-200" onClick={() => handleEdit(manager)}>
                  <Edit size={18} />
                </button>
                <button className="text-red-600 hover:text-red-900 transition-colors duration-200" onClick={() => handleDelete(manager)}>
                  <Trash size={18} />
                </button>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  )

  const handleCreate = async () => {
    await dispatch(createManager(newManager))
    .then(unwrapResult)
    .then(() => {
      dispatch(showNotification({ type: 'info', message: 'Manager created successfully' }))
      setIsCreateModalOpen(false)
      setNewManager({ name: '', email: '',  password: '' })
    }).catch(err => {
      dispatch(showNotification({ type: 'error', message: 'Failed to create manager', description: (err as Error).message }))
    })
  }

  const handleEdit = (manager: Manager) => {
    setSelectedManager(manager)
    setIsEditModalOpen(true)
  }

  const handleUpdate = async () => {
    if (selectedManager) {
      await dispatch(
        updateManager({ id: selectedManager.id, data: {
          name: '',
          email: '',
          password: ''
        } })
      ).then(unwrapResult)
      .then(() => {
        dispatch(showNotification({ type: 'info', message: 'Manager updated successfully' }))
        setIsEditModalOpen(false)
        setSelectedManager(null)
      }).catch(err => {
        dispatch(showNotification({ type: 'error', message: 'Failed to update manager', description: (err as Error).message }))
      })
    }
  }

  const handleDelete = (manager: Manager) => {
    setSelectedManager(manager)
    setIsDeleteModalOpen(true)
  }

  const confirmDelete = async () => {
    if (selectedManager) {
      await dispatch(
        deleteManager(selectedManager.id)
      ).then(unwrapResult)
      .then(() => {
        dispatch(showNotification({ type: 'info', message: 'Manager deleted successfully' }))
        setIsDeleteModalOpen(false)
        setSelectedManager(null)
      }).catch(err => {
        dispatch(showNotification({ type: 'error', message: 'Failed to delete manager', description: (err as Error).message }))
      })
    }
  }



  useEffect(() => {
    dispatch(getAllManagers())
  }, [dispatch])

  return (
    <div className="bg-gray-100 min-h-screen">
      <ActionBar />
      <Card>
        {layout === 'grid' && <GridView />}
        {layout === 'list' && <ListView />}
        {layout === 'table' && <TableView />}
      </Card>

      <Modal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} title="Add New Manager">
        <Input
          label="Name"
          icon={User as IconType}
          value={newManager.name}
          onChange={(e) => setNewManager({ ...newManager, name: e.target.value })}
          placeholder="Enter manager's name"
        />
        <Input
          label="Email"
          icon={Mail as IconType}
          value={newManager.email}
          onChange={(e) => setNewManager({ ...newManager, email: e.target.value })}
          placeholder="Enter manager's email"
        />

        <Input
          label="Password"
          placeholder='Enter password'
          icon={Lock as IconType}
          value={newManager.password}
          onChange={(value) => setNewManager({ ...newManager, password: value.target.value })}

        />
        <div className="mt-4 flex justify-end space-x-2">
          <Button variant='outline' color="gray" onClick={() => setIsCreateModalOpen(false)}>Cancel</Button>
          <Button color="blue" onClick={handleCreate}>Create Manager</Button>
        </div>
      </Modal>

      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Edit Manager">
        {selectedManager && (
          <>
            <Input
              label="Name"
              icon={User as IconType}
              value={selectedManager.name}
              placeholder='Enter name'
              onChange={(e) => setSelectedManager({ ...selectedManager, name: e.target.value })}
            />
            <Input
              label="Email"
              icon={MailIcon as IconType}
              value={selectedManager.email}
              placeholder='Enter email'
              onChange={(e) => setSelectedManager({ ...selectedManager, email: e.target.value })}
            />
            <Input
              label="Password"
              placeholder='Enter password'
              icon={Shield as IconType}
              onChange={(e) => setSelectedManager({ ...selectedManager, password: e.target.value.length > 0 ? e.target.value : undefined })}
            />

            <div className="mt-4 flex justify-end space-x-2">
              <Button variant='outline' color="gray" onClick={() => setIsEditModalOpen(false)}>Cancel</Button>
              <Button color="blue" onClick={handleUpdate}>Update Manager</Button>
            </div>
          </>
        )}
      </Modal>

      <DangerModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Manager"
        content={`Are you sure you want to delete ${selectedManager?.name}? This action cannot be undone.`}
        onAccept={confirmDelete}
        onCancel={() => setIsDeleteModalOpen(false)}
      />
    </div>
  )
}

export default ManagersPage