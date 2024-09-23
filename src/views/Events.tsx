import { Calendar, Search, Filter, MapPin, Clock, Users, Plus, Edit, Trash, Text } from 'lucide-react'
import { Card } from '../components/Card'
import { Breadcrumb } from '../components/Breadcrumb';
import Button from '../components/Button';
import { useEffect, useState } from 'react';
import Modal from '../components/Modal';
import Input from '../components/Input';
import TextArea from '../components/Textarea';
import FileUpload from '../components/FileUpload';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { DangerModal } from '../components/DangerModal';
import { DataTable } from '../components/DataTable';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { createEvent, deleteEvent, getAllEvents } from '../redux/stores/event_store';
import { title, image } from 'framer-motion/client';
import { showNotification } from '../redux/stores/notification_store';
import Event from '../interfaces/Event';
import IconTextButton from '../components/IconTextButton';
import moment from 'moment';

const EventsPage = () => {
  const breadcrumbItems = [
    { label: 'Dashboard', href: '/' },
    { label: 'Events', href: '/events' },
  ];

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const dispatch = useAppDispatch();

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
  );

  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
 
  const {events} = useAppSelector(state => state.event_store)
 
  
  useEffect(() => {
    dispatch(getAllEvents())
  }, [dispatch])


  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [organizer, setOrganizer] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState<File | null>(null);

  const handleAdd = async () => {
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('organized_by', organizer);
      formData.append('location', location);
      formData.append('event_date', moment(selectedDate).format('YYYY-MM-DD HH:mm:ss'));
      formData.append('image', image as File);
      formData.append('manager_id', '1');
      await dispatch(createEvent(formData));
      dispatch(
        showNotification({
          type: 'info',
          message: 'Event created successfully',
        })
      );
      setTitle('');
      setDescription('');
      setOrganizer('');
      setLocation('');
      setSelectedDate(null);
      setImage(null);
      setIsAddModalOpen(false);
    } catch (error) {
      console.log(error);
      dispatch(
        showNotification({
          type: 'error',
          message: 'Failed to create event',
          description: (error as Error).message,
        })
      );
    }
  };

  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const openDeleteModal = (event: Event) => {
    setSelectedEvent(event);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    try {
      await dispatch(deleteEvent(selectedEvent!.id));
      dispatch(
        showNotification({
          type: 'info',
          message: 'Event deleted successfully',
        })
      );
    } catch (error) {
      console.log(error);
      dispatch(
        showNotification({
          type: 'error',
          message: 'Failed to delete event',
          description: (error as Error).message,
        })
      );
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <ActionBar />
      <Card
        title="Events Management"
      >
        <DataTable 
          hoverable
          paginated
          striped
          showColumnSelector
          emptyMessage='No events found'
          itemsPerPage={8}
          data={events}
          columns={[
            { id: 'title', key: 'title', title: 'Title', sortable: true },
            { id: 'description', key: 'description', title: 'Description' },
            { id: 'organized_by', key: 'organized_by', title: 'Organizer' },
            { id: 'location', key: 'location', title: 'Location' },
            { id: 'event_date', key: 'event_date', title: 'Event Date' }
          ]}
          actions={(row) => (
            <>
              <IconTextButton
                icon={Trash}
                color="red"
                onClick={() => openDeleteModal(row)}
              />
            </>
          )}
        />
      </Card>

      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title='Add Event'>
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
              showTimeSelect dateFormat={"dd.MM.yyyy HH:mm"} 
              className='focus:outline-none cursor-pointer w-full border border-gray-300 p-2 rounded' 
              wrapperClassName='w-full mb-4 ' placeholderText='Start Date' selected={selectedDate} onChange={(date: Date | null) => setSelectedDate(date)} />

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

export default EventsPage