import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, Users, Plus, Edit, Trash, Text } from 'lucide-react'
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
import { IconType } from 'react-icons'
import { useTranslation } from 'react-i18next'

const EventsPage: React.FC = () => {
  const { t } = useTranslation()

  const breadcrumbItems = [
    { label: t('eventsPage.dashboard'), href: '/' },
    { label: t('eventsPage.events'), href: '/events' },
  ]

  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [organizer, setOrganizer] = useState('')
  const [organizerEmail, setOrganizerEmail] = useState('')
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
          <Button leftIcon={Plus as IconType} size="sm" onClick={() => setIsAddModalOpen(true)}>
            {t('eventsPage.newEvent')}
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
        className="grid max-sm:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4"
      >
        <StatCard title={t('eventsPage.totalEvents')} value={totalEvents} icon={Calendar} />
        <StatCard title={t('eventsPage.upcomingEvents')} value={upcomingEvents} icon={Clock} />
        <StatCard title={t('eventsPage.expiredEvents')} value={expiredEvents} icon={Users} />
      </motion.div>
    )
  }

  const StatCard: React.FC<{ title: string; value: number; icon: React.ElementType }> = ({ title, value, icon: Icon }) => (
    <div className="bg-green-100 rounded shadow border p-4 flex items-center">
      <div className="bg-green-200 p-3 rounded-full mr-4">
        <Icon className="w-6 h-6 text-green-800" />
      </div>
      <div>
        <h3 className="text-xl font-semibold text-gray-700">{title}</h3>
        <p className="text-lg">{value}</p>
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
      formData.append('organizer_email', organizerEmail)
      await dispatch(createEvent(formData))
      dispatch(
        showNotification({
          type: 'info',
          message: t('eventsPage.eventCreatedSuccess'),
        })
      )
      resetForm()
      setIsAddModalOpen(false)
    } catch (error) {
      console.log(error)
      dispatch(
        showNotification({
          type: 'error',
          message: t('eventsPage.eventCreatedFail'),
          description: (error as Error).message,
        })
      )
    }
  }

  const handleEdit = async () => {
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
          message: t('eventsPage.eventUpdatedSuccess'),
        })
      )
      resetForm()
      setIsEditModalOpen(false)
    }).catch((error) => {
      console.log(error)
      dispatch(
        showNotification({
          type: 'error',
          message: t('eventsPage.eventUpdatedFail'),
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
          message: t('eventsPage.eventDeletedSuccess'),
        })
      )
      setIsDeleteModalOpen(false)
    } catch (error) {
      console.log(error)
      dispatch(
        showNotification({
          type: 'error',
          message: t('eventsPage.eventDeletedFail'),
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
      <Card title={t('eventsPage.eventsManagement')}>
        <DataTable 
          hoverable
          paginated={!isEmptyArray(events)}
          striped
          showColumnSelector
          emptyMessage={t('eventsPage.noEventsFound')}
          itemsPerPage={6}
          data={events}
          columns={[
            {
              id: 'image',
              key: 'image',
              title: t('eventsPage.image'),
              sortable: false,
              render: (_, row) => (
                <img
                  src={getFileUrl(row.image)}
                  alt={row.title}
                  className="w-20 h-20 object-cover rounded"
                />
              ),
            },
            { id: 'title', key: 'title', title: t('eventsPage.title'), sortable: true },
            { id: 'description', key: 'description', title: t('eventsPage.description'), sortable: true, render(_, row) {
              return <div className="text-wrap max-w-md">
                {row.description}
              </div>
            }, },
            { id: 'organized_by', key: 'organized_by', title: t('eventsPage.organizer'), sortable: true },
            { id: 'organizer_email', key: 'organizer_email', title: t('eventsPage.organizerEmail'), sortable: true },
            { id: 'location', key: 'location', title: t('eventsPage.location') },
            { id: 'event_date', key: 'event_date', title: t('eventsPage.eventDate'), sortable: true, render(_, row) {
              return moment(row.event_date).format('YYYY-MM-DD HH:mm')
            }, }
          ]}
          actions={(row) => (
            <div className="flex space-x-2">
              <IconTextButton
                icon={Edit as IconType}
                color="blue"
                onClick={() => openEditModal(row)}
              />
              <IconTextButton
                icon={Trash as IconType}
                color="red"
                onClick={() => openDeleteModal(row)}
              />
            </div>
          )}
        />
      </Card>

      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title={t('eventsPage.addEvent')}>
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
          organizerEmail={organizerEmail}
          setOrganizerEmail={setOrganizerEmail}
        />
        <div className="flex justify-end mt-4">
          <Button
            color="gray"
            variant="outline"
            onClick={() => setIsAddModalOpen(false)}
          >
            {t('eventsPage.cancel')}
          </Button>
          <Button
            color="blue"
            className="ml-2"
            onClick={handleAdd}
          >
            {t('eventsPage.create')}
          </Button>
        </div>
      </Modal>

      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title={t('eventsPage.editEvent')}>
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
          organizerEmail={organizerEmail}
          setOrganizerEmail={setOrganizerEmail}
        />
        <div className="flex justify-end mt-4">
          <Button
            color="gray"
            variant="outline"
            onClick={() => setIsEditModalOpen(false)}
          >
            {t('eventsPage.cancel')}
          </Button>
          <Button
            color="blue"
            className="ml-2"
            onClick={handleEdit}
          >
            {t('eventsPage.saveChanges')}
          </Button>
        </div>
      </Modal>

      <DangerModal 
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title={t('eventsPage.deleteEvent')}
        content={t('eventsPage.deleteEventConfirmation')}
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
  organizerEmail: string
  setOrganizerEmail: (value: string) => void
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
  organizerEmail,
  setOrganizerEmail,
  setImage
}) => {
  const { t } = useTranslation()

  return (
    <>
      <Input
        label={t('eventsPage.title')}
        placeholder={t('eventsPage.enterTitle')}
        icon={Text as IconType}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextArea
        label={t('eventsPage.description')}
        placeholder={t('eventsPage.enterDescription')}
        icon={Text as IconType}
        rows={4}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <div className="flex flex-col">
        <p className='text-gray-500 text-sm'>{t('eventsPage.startDate')}</p>
        <DatePicker 
          showTimeSelect 
          dateFormat={"dd.MM.yyyy HH:mm"} 
          className='focus:outline-none cursor-pointer w-full border border-gray-300 p-2 rounded' 
          wrapperClassName='w-full mb-4' 
          placeholderText={t('eventsPage.startDate')} 
          selected={selectedDate} 
          onChange={(date: Date | null) => setSelectedDate(date)} 
        />
      </div>
      <Input
        label={t('eventsPage.organizer')}
        placeholder={t('eventsPage.enterOrganizer')}
        icon={Text as IconType}
        value={organizer}
        onChange={(e) => setOrganizer(e.target.value)}
      />
      <Input
        label={t('eventsPage.organizerEmail')}
        placeholder={t('eventsPage.enterOrganizerEmail')}
        icon={Text as IconType}
        value={organizerEmail}
        onChange={(e) => setOrganizerEmail(e.target.value)}
      />
      <Input
        label={t('eventsPage.location')}
        placeholder={t('eventsPage.enterLocation')}
        icon={Text as IconType}
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
}

export default EventsPage