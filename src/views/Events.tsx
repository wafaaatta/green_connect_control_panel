import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Search, Filter, MapPin, Clock, Users, Plus, Edit, Trash, Text } from 'lucide-react'
import { Card } from '../components/Card'
import { Breadcrumb } from '../components/Breadcrumb'
import Button from '../components/Button'
import Modal from '../components/Modal'
import Input from '../components/Input'
import TextArea from '../components/Textarea'
import FileUpload from '../components/FileUpload'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import { DangerModal } from '../components/DangerModal'
import { DataTable } from '../components/DataTable'
import { useAppDispatch, useAppSelector } from '../hooks/hooks'
import { createEvent, deleteEvent, getAllEvents, updateEvent } from '../redux/stores/event_store'
import { showNotification } from '../redux/stores/notification_store'
import Event from '../interfaces/Event'
import IconTextButton from '../components/IconTextButton'
import moment from 'moment'
import { isEmptyArray } from '../utils/array_utils'
import { unwrapResult } from '@reduxjs/toolkit'
import { getFileUrl } from '../utils/laravel_storage'

const EventsPage: React.FC = () => {
  const breadcrumbItems = [
    { label: 'Dashboard', href: '/' },
    { label: 'Events', href: '/events' },
  ]

  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [organizer, setOrganizer] = useState('')
  const [location, setLocation] = useState('')
  const [image, setImage] = useState<File | null>(null)
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)

  const dispatch = useAppDispatch()
  const { events } = useAppSelector(state => state.event_store)

  useEffect(() => {
    dispatch(getAllEvents())
  }, [dispatch])

  const ActionBar: React.FC = () => (
    <div className="bg-white shadow rounded px-4 py-2 mb-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <Breadcrumb items={breadcrumbItems} />
        <div className="flex flex-wrap items-center gap-2">
          <Button color="blue" leftIcon={Plus} size="sm" onClick={() => setIsAddModalOpen(true)}>
            New Event
          </Button>
        </div>
      </div>
    </div>
  )

  const Statistics: React.FC = () => {
    const totalEvents = events.length
    const upcomingEvents = events.filter(event => moment(event.event_date, 'YYYY-MM-DD').isAfter(moment())).length
    const expiredEvents = events.filter(event => moment(event.event_date, 'YYYY-MM-DD').isSameOrBefore(moment())).length

    return (
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4"
      >
        <StatCard title="Total Events" value={totalEvents} icon={Calendar} />
        <StatCard title="Upcoming Events" value={upcomingEvents} icon={Clock} />
        <StatCard title="Expired Events" value={expiredEvents} icon={Users} />
      </motion.div>
    )
  }

  const StatCard: React.FC<{ title: string; value: number; icon: React.ElementType }> = ({ title, value, icon: Icon }) => (
    <div className="bg-white rounded shadow border p-4 flex items-center">
      <div className="bg-blue-100 p-3 rounded-full mr-4">
        <Icon className="w-6 h-6 text-blue-500" />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
        <p className="text-2xl font-bold text-blue-600">{value}</p>
      </div>
    </div>
  )

  const handleAdd = async () => {
    try {
      const formData = new FormData()
      formData.append('title', title)
      formData.append('description', description)
      formData.append('organized_by', organizer)
      formData.append('location', location)
      formData.append('event_date', moment(selectedDate).format('YYYY-MM-DD HH:mm:ss'))
      formData.append('image', image as File)
      formData.append('manager_id', '1')
      await dispatch(createEvent(formData))
      dispatch(
        showNotification({
          type: 'info',
          message: 'Event created successfully',
        })
      )
      resetForm()
      setIsAddModalOpen(false)
    } catch (error) {
      console.log(error)
      dispatch(
        showNotification({
          type: 'error',
          message: 'Failed to create event',
          description: (error as Error).message,
        })
      )
    }
  }

  const handleEdit = async () => {

    console.log({
      id: selectedEvent!.id,
      data: {
        title,
        description,
        organized_by: organizer,
        location,
        event_date: moment(selectedDate).format('YYYY-MM-DD HH:mm:ss'),
        image,
      }
    });
    

    const formData = new FormData()

    formData.append('title', title)
    formData.append('description', description)
    formData.append('organized_by', organizer)
    formData.append('location', location)
    formData.append('event_date', moment(selectedDate).format('YYYY-MM-DD HH:mm:ss'))
    if (image) {
      formData.append('image', image as File)
    }

    await dispatch(
      updateEvent({
        id: selectedEvent!.id,
        data: formData,
      })
    ).then(unwrapResult)
    .then(() => {
      dispatch(
        showNotification({
          type: 'info',
          message: 'Event updated successfully',
        })
      )
      resetForm()
      setIsEditModalOpen(false)
    }).catch((error) => {
      console.log(error)
      dispatch(
        showNotification({
          type: 'error',
          message: 'Failed to update event',
          description: (error as Error).message,
        })
      )
    })
  }

  const handleDelete = async () => {
    try {
      await dispatch(deleteEvent(selectedEvent!.id))
      dispatch(
        showNotification({
          type: 'info',
          message: 'Event deleted successfully',
        })
      )
      setIsDeleteModalOpen(false)
    } catch (error) {
      console.log(error)
      dispatch(
        showNotification({
          type: 'error',
          message: 'Failed to delete event',
          description: (error as Error).message,
        })
      )
    }
  }

  const openEditModal = (event: Event) => {
    setSelectedEvent(event)
    setTitle(event.title)
    setDescription(event.description)
    setOrganizer(event.organized_by)
    setLocation(event.location)
    setSelectedDate(new Date(event.event_date))
    setIsEditModalOpen(true)
  }

  const openDeleteModal = (event: Event) => {
    setSelectedEvent(event)
    setIsDeleteModalOpen(true)
  }

  const resetForm = () => {
    setTitle('')
    setDescription('')
    setOrganizer('')
    setLocation('')
    setSelectedDate(null)
    setImage(null)
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <ActionBar />
      <Statistics />
      <Card title="Events Management">
        <DataTable 
          hoverable
          paginated={!isEmptyArray(events)}
          striped
          showColumnSelector
          emptyMessage='No events found'
          itemsPerPage={6}
          data={events}
          columns={[
            {
              id: 'image',
              key: 'image',
              title: 'Image',
              sortable: false,
              render: (_, row) => (
                <img
                  src={getFileUrl(row.image)}
                  alt={row.title}
                  className="w-20 h-20 object-cover rounded"
                />
              ),
            },
            { id: 'title', key: 'title', title: 'Title', sortable: true },
            { id: 'description', key: 'description', title: 'Description' },
            { id: 'organized_by', key: 'organized_by', title: 'Organizer' },
            { id: 'location', key: 'location', title: 'Location' },
            { id: 'event_date', key: 'event_date', title: 'Event Date', sortable: true }
          ]}
          actions={(row) => (
            <div className="flex space-x-2">
              <IconTextButton
                icon={Edit}
                color="blue"
                onClick={() => openEditModal(row)}
              />
              <IconTextButton
                icon={Trash}
                color="red"
                onClick={() => openDeleteModal(row)}
              />
            </div>
          )}
        />
      </Card>

      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title='Add Event'>
        <EventForm 
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          organizer={organizer}
          setOrganizer={setOrganizer}
          location={location}
          setLocation={setLocation}
          setImage={setImage}
        />
        <div className="flex justify-end mt-4">
          <Button
            color="gray"
            variant="outline"
            onClick={() => setIsAddModalOpen(false)}
          >
            Cancel
          </Button>
          <Button
            color="blue"
            className="ml-2"
            onClick={handleAdd}
          >
            Create
          </Button>
        </div>
      </Modal>

      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title='Edit Event'>
        <EventForm 
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          organizer={organizer}
          setOrganizer={setOrganizer}
          location={location}
          setLocation={setLocation}
          setImage={setImage}
        />
        <div className="flex justify-end mt-4">
          <Button
            color="gray"
            variant="outline"
            onClick={() => setIsEditModalOpen(false)}
          >
            Cancel
          </Button>
          <Button
            color="blue"
            className="ml-2"
            onClick={handleEdit}
          >
            Save Changes
          </Button>
        </div>
      </Modal>

      <DangerModal 
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Event"
        content="Are you sure you want to delete this event?"
        onAccept={handleDelete}
        onCancel={() => setIsDeleteModalOpen(false)}
      />
    </div>
  )
}

interface EventFormProps {
  title: string
  setTitle: (value: string) => void
  description: string
  setDescription: (value: string) => void
  selectedDate: Date | null
  setSelectedDate: (date: Date | null) => void
  organizer: string
  setOrganizer: (value: string) => void
  location: string
  setLocation: (value: string) => void
  setImage: (file: File | null) => void
}

const EventForm: React.FC<EventFormProps> = ({
  title,
  setTitle,
  description,
  setDescription,
  selectedDate,
  setSelectedDate,
  organizer,
  setOrganizer,
  location,
  setLocation,
  setImage
}) => (
  <>
    <Input
      label="Title"
      placeholder='Enter Title'
      icon={Text}
      value={title}
      onChange={(e) => setTitle(e.target.value)}
    />
    <TextArea
      label="Description"
      placeholder='Enter Description'
      icon={Text}
      rows={4}
      value={description}
      onChange={(e) => setDescription(e.target.value)}
    />
    <div className="flex flex-col">
      <p className='text-gray-500 text-sm'>Start Date</p>
      <DatePicker 
        showTimeSelect 
        dateFormat={"dd.MM.yyyy HH:mm"} 
        className='focus:outline-none cursor-pointer w-full border border-gray-300 p-2 rounded' 
        wrapperClassName='w-full mb-4' 
        placeholderText='Start Date' 
        selected={selectedDate} 
        onChange={(date: Date | null) => setSelectedDate(date)} 
      />
    </div>
    <Input
      label="Organizer"
      placeholder='Enter Organizer'
      icon={Text}
      value={organizer}
      onChange={(e) => setOrganizer(e.target.value)}
    />
    <Input
      label="Location"
      placeholder='Enter Location'
      icon={Text}
      value={location}
      onChange={(e) => setLocation(e.target.value)}
    />
    <FileUpload
      onFileSelect={(files) => setImage(files[0])}
      maxFiles={1}
      mode='single'
    />
  </>
)

export default EventsPage