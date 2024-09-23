"use client"

import { useEffect, useState, useRef } from 'react'
import { Card } from '../components/Card'
import { useAppDispatch, useAppSelector } from '../hooks/hooks'
import { getAllAnnounces } from '../redux/stores/announce_store'
import { DataTable } from '../components/DataTable'
import IconTextButton from '../components/IconTextButton'
import { Check, RefreshCcw, Trash2, ChevronDown } from 'lucide-react'
import { Breadcrumb } from '../components/Breadcrumb'
import Button from '../components/Button'

const AnnouncesPage = () => {
  const dispatch = useAppDispatch()
  const { announces, loading } = useAppSelector((state) => state.announce_store)
  const [filteredAnnounces, setFilteredAnnounces] = useState(announces)
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const filterRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    dispatch(getAllAnnounces())
  }, [dispatch])

  useEffect(() => {
    setFilteredAnnounces(
      statusFilter === 'all'
        ? announces
        : announces.filter(announce => announce.status === statusFilter)
    )
  }, [announces, statusFilter])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const mapStatusToTag = (status: string) => {
    switch (status) {
      case 'pending':
        return <span className="inline-block bg-yellow-100 rounded px-2 py-1 text-sm font-semibold text-yellow-700 mr-2">Pending</span>
      case 'accepted':
        return <span className="inline-block bg-green-100 rounded px-2 py-1 text-sm font-semibold text-green-700 mr-2">Accepted</span>
      case 'rejected':
        return <span className="inline-block bg-red-100 rounded px-2 py-1 text-sm font-semibold text-red-700 mr-2">Rejected</span>
      default:
        return <span className="inline-block bg-gray-100 rounded px-2 py-1 text-sm font-semibold text-gray-700 mr-2">Unknown</span>
    }
  }

  const handleStatusFilterChange = (status: string) => {
    setStatusFilter(status)
    setIsFilterOpen(false)
  }

  const breadcrumbItems = [
    { label: 'Dashboard', href: '/' },
    { label: 'Announces', href: '/announces' },
  ];

  const ActionBar: React.FC = () => (
    <div className="bg-white shadow rounded px-4 py-3 mb-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <Breadcrumb items={breadcrumbItems} />
        <div className="flex flex-wrap items-center gap-2">
          <div ref={filterRef} className="relative">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2 px-4 py-1.5 bg-white border border-gray-300 rounded shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
            >
              {statusFilter === 'all' ? 'All Statuses' : statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)}
              <ChevronDown className="h-4 w-4" />
            </button>
            {isFilterOpen && (
              <div className="absolute right-0 mt-2 w-56 rounded shadow bg-white ring-1 ring-black ring-opacity-5 z-10">
                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                  {['all', 'pending', 'accepted', 'rejected'].map((status) => (
                    <button
                      key={status}
                      onClick={() => handleStatusFilterChange(status)}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      role="menuitem"
                    >
                      {status === 'all' ? 'All Statuses' : status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          <Button color="blue" leftIcon={RefreshCcw} size="sm" onClick={() => dispatch(getAllAnnounces())}>
            Refresh Data
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-100 min-h-screen">
      <ActionBar />
      <Card title='Announcements'>
        <DataTable 
          striped
          hoverable
          loading={loading}
          emptyMessage='No data available'
          paginated
          data={filteredAnnounces}
          showColumnSelector
          columns={[
            { id: 'title', title: 'Title', key: 'title' },
            { id: 'description', title: 'Description' , key: 'description'},
            { id: 'location', title: 'Location', key: 'location' },
            { id: 'status', title: 'Status', key: 'status', render(value, row) {
              return mapStatusToTag(row.status)
            }, },
          ]}
          actions={(row) => (
            row.status === 'pending' && (
              <div className="flex flex-wrap items-center gap-2">
                <IconTextButton 
                  icon={Check}
                  text='Accept'
                  onClick={() => {}}
                />
                <IconTextButton 
                  icon={Trash2}
                  text='Reject'
                  color='red' 
                  onClick={() => {}}
                />
              </div>
            )
          )}
        />
      </Card>
    </div>
  )
}

export default AnnouncesPage