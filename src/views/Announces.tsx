"use client"

import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card } from '../components/Card'
import { useAppDispatch, useAppSelector } from '../hooks/hooks'
import { acceptAnnounce, getAllAnnounces, rejectAnnounce } from '../redux/stores/announce_store'
import { DataTable } from '../components/DataTable'
import IconTextButton from '../components/IconTextButton'
import { Check, RefreshCcw, Trash2, ChevronDown } from 'lucide-react'
import { Breadcrumb } from '../components/Breadcrumb'
import Button from '../components/Button'
import Modal from '../components/Modal'
import { DangerModal } from '../components/DangerModal'
import { showNotification } from '../redux/stores/notification_store'
import { unwrapResult } from '@reduxjs/toolkit'
import Announce from '../interfaces/Announce'
import { IconType } from 'react-icons'
import { useTranslation } from 'react-i18next'

const AnnouncesPage = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { announces, loading } = useAppSelector((state) => state.announce_store)
  const [filteredAnnounces, setFilteredAnnounces] = useState<Announce[]>(announces)
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const filterRef = useRef<HTMLDivElement>(null)
  const [selectedAnnounce, setSelectedAnnounce] = useState<Announce | null>(null)
  const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false)
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false)

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
        return <span className="inline-block bg-yellow-100 rounded px-2 py-1 text-sm font-semibold text-yellow-700 mr-2">{t('announcesPage.statusPending')}</span>
      case 'accepted':
        return <span className="inline-block bg-green-100 rounded px-2 py-1 text-sm font-semibold text-green-700 mr-2">{t('announcesPage.statusAccepted')}</span>
      case 'rejected':
        return <span className="inline-block bg-red-100 rounded px-2 py-1 text-sm font-semibold text-red-700 mr-2">{t('announcesPage.statusRejected')}</span>
      default:
        return <span className="inline-block bg-gray-100 rounded px-2 py-1 text-sm font-semibold text-gray-700 mr-2">{t('announcesPage.statusUnknown')}</span>
    }
  }

  const handleStatusFilterChange = (status: string) => {
    setStatusFilter(status)
    setIsFilterOpen(false)
  }

  const handleAccept = (announce: Announce) => {
    setSelectedAnnounce(announce)
    setIsAcceptModalOpen(true)
  }

  const handleReject = (announce: Announce) => {
    setSelectedAnnounce(announce)
    setIsRejectModalOpen(true)
  }

  const confirmAccept = async () => {
    if (selectedAnnounce) {
      await dispatch(
        acceptAnnounce(selectedAnnounce.id)
      ).then(unwrapResult)
      .then(() => {
        dispatch(showNotification({ type: 'info', message: t('announcesPage.announceAcceptedSuccess') }))
        setIsAcceptModalOpen(false)
        setSelectedAnnounce(null)
      }).catch(err => {
        dispatch(showNotification({ type: 'error', message: t('announcesPage.announceAcceptedFail'), description: (err as Error).message }))
      })
    }
  }

  const confirmReject = async () => {
    if (selectedAnnounce) {
      await dispatch(
        rejectAnnounce(selectedAnnounce.id)
      ).then(unwrapResult)
      .then(() => {
        dispatch(showNotification({ type: 'info', message: t('announcesPage.announceRejectedSuccess') }))
        setIsRejectModalOpen(false)
        setSelectedAnnounce(null)
      }).catch(err => {
        dispatch(showNotification({ type: 'error', message: t('announcesPage.announceRejectedFail'), description: (err as Error).message }))
      })
    }
  }

  const breadcrumbItems = [
    { label: t('announcesPage.dashboard'), href: '/' },
    { label: t('announcesPage.announces'), href: '/announces' },
  ]

  const ActionBar: React.FC = () => (
    <motion.div
      className="bg-white shadow rounded px-4 py-3 mb-4"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <Breadcrumb items={breadcrumbItems} />
        <div className="flex flex-wrap items-center gap-2">
          <div ref={filterRef} className="relative">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2 px-4 py-1.5 bg-white border border-gray-300 rounded shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {statusFilter === 'all' ? t('announcesPage.allStatuses') : t(`announcesPage.status${statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)}`)}
              <ChevronDown className="h-4 w-4" />
            </button>
            <AnimatePresence>
              {isFilterOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-0 mt-2 w-56 rounded-md border shadow-lg bg-green-100 ring-1 ring-black ring-opacity-5 z-10"
                >
                  <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                    {['all', 'pending', 'accepted', 'rejected'].map((status) => (
                      <button
                        key={status}
                        onClick={() => handleStatusFilterChange(status)}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        role="menuitem"
                      >
                        {status === 'all' ? t('announcesPage.allStatuses') : t(`announcesPage.status${status.charAt(0).toUpperCase() + status.slice(1)}`)}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <Button  leftIcon={RefreshCcw as IconType} size="sm" onClick={() => dispatch(getAllAnnounces())}>
            {t('announcesPage.refreshData')}
          </Button>
        </div>
      </div>
    </motion.div>
  )

  return (
    <div className="bg-gray-100 min-h-screen">
      <ActionBar />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card title={t('announcesPage.announcements')}>
          <DataTable 
            striped
            hoverable
            loading={loading}
            emptyMessage={t('announcesPage.noDataAvailable')}
            paginated
            data={filteredAnnounces}
            showColumnSelector
            columns={[
              { id: 'ID', title: t('announcesPage.id'), key: 'id', sortable: true },
              { id: 'title', title: t('announcesPage.title'), key: 'title' },
              { id: 'description', title: t('announcesPage.description'), key: 'description', render(_, row) {
                return (
                  <div className="max-w-sm text-wrap">{row.description}</div>
                )
              },},
              { id: 'country', title: t('announcesPage.country'), key: 'country' },
              { id: 'city', title: t('announcesPage.city'), key: 'city' },
              { id: 'postal_code', title: t('announcesPage.postalCode'), key: 'postal_code' },
              { id: 'request_type', title: t('announcesPage.requestType'), key: 'request_type', render(_, row) {
                return (
                  <div
                    className="flex items-center justify-center bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm font-semibold"
                  >
                    {row.request_type === null ? t('announcesPage.nothing') : row.request_type === 'creation' ? t('announcesPage.creation') : t('announcesPage.modification')}
                  </div>
                )
              }, },
              { id: 'status', title: t('announcesPage.status'), key: 'status', render(_, row) {
                return mapStatusToTag(row.status)
              }, },
            ]}
            actions={(row) => (
              row.status === 'pending' && (
                <div className="flex flex-wrap items-center gap-2">
                  <IconTextButton 
                    icon={Check as IconType}
                    text={t('announcesPage.accept')}
                    onClick={() => handleAccept(row)}
                  />
                  <IconTextButton 
                    icon={Trash2 as IconType}
                    text={t('announcesPage.reject')}
                    color='red' 
                    onClick={() => handleReject(row)}
                  />
                </div>
              )
            )}
          />
        </Card>
      </motion.div>

      <Modal
        isOpen={isAcceptModalOpen}
        onClose={() => setIsAcceptModalOpen(false)}
        title={t('announcesPage.acceptAnnouncement')}
      >
        <p className="mb-4">{t('announcesPage.acceptConfirmation')}</p>
        <div className="flex justify-end space-x-2">
          <Button color="gray" onClick={() => setIsAcceptModalOpen(false)}>{t('announcesPage.cancel')}</Button>
          <Button color="green" onClick={confirmAccept}>{t('announcesPage.accept')}</Button>
        </div>
      </Modal>

      <DangerModal
        isOpen={isRejectModalOpen}
        onClose={() => setIsRejectModalOpen(false)}
        title={t('announcesPage.rejectAnnouncement')}
        content={t('announcesPage.rejectConfirmation')}
        onAccept={confirmReject}
        onCancel={() => setIsRejectModalOpen(false)}
      />
    </div>
  )
}

export default AnnouncesPage