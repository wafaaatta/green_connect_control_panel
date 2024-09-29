import { useEffect, useState } from "react"
import { Breadcrumb } from "../components/Breadcrumb"
import { DataTable } from "../components/DataTable"
import AppRoutes from "../constants/app_routes"
import { useAppDispatch, useAppSelector } from "../hooks/hooks"
import { deleteContactSubmission, getAllContactSubmissions } from "../redux/stores/contact_submission_store"
import { Card } from "../components/Card"
import { Trash2 } from "lucide-react"
import IconTextButton from "../components/IconTextButton"
import ContactSubmission from "../interfaces/ContactSubmission"
import { showNotification } from "../redux/stores/notification_store"
import { unwrapResult } from "@reduxjs/toolkit"
import { DangerModal } from "../components/DangerModal"

const ContactSubmissions = () => {
    const breadcrumbItems = [
        { label: 'Dashboard', href: AppRoutes.HOME },
        { label: 'Contact Submissions', href: AppRoutes.CONTACT_SUBMISSIONS },
      ]
      
    const ActionBar: React.FC = () => (
        <div className="bg-white shadow rounded px-4 py-2 mb-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            <Breadcrumb items={breadcrumbItems} />
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-lg font-semibold text-gray-800">Total Submissions: </span>
              <span className="text-lg font-semibold text-[#0096c7]">{contact_submissions.length}</span>
            </div>
          </div>
        </div>
      )

      const dispatch = useAppDispatch()
      const {contact_submissions, loading} = useAppSelector((state) => state.contact_submission_store)

      useEffect(() => {
        dispatch(getAllContactSubmissions())
      }, [dispatch])

      const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
      const [selectedContactSubmission, setSelectedContactSubmission] = useState<ContactSubmission | null>(null)

      const openDeleteModal = (contact_submission: ContactSubmission) => {
        setSelectedContactSubmission(contact_submission)
        setIsDeleteModalOpen(true)
      }

      const handleDeleteAccept = async () => {
        if (selectedContactSubmission) {
          await dispatch(deleteContactSubmission(selectedContactSubmission.id))
            .then(unwrapResult)
            .then(() => {
              dispatch(showNotification({ type: 'info', message: 'Contact submission deleted successfully' }))
              setIsDeleteModalOpen(false)
              setSelectedContactSubmission(null)
            })
            .catch((err) => {
              dispatch(
                showNotification({
                  type: 'error',
                  message: 'Failed to delete contact submission',
                  description: (err as Error).message,
                })
              )
            })
        }
      }
  return (
    <>
      <ActionBar />

      <Card title="Contact Submissions">
      <DataTable 
        loading={loading}
        hoverable
        striped
        paginated
        data={contact_submissions}
        emptyMessage="No contact submissions found"
        itemsPerPage={6}
        bulkActions={[
            {
                label: 'Delete All',
                icon: Trash2,
                onClick: () => {},
            },
        ]}
        columns={[
            {
                title: 'Name',
                id: 'name',
                key: 'name',
                sortable: true,
            },
            {
                title: 'Email',
                id: 'email',
                key: 'email',
                sortable: true,
            },
            {
                title: 'Message',
                id: 'message',
                key: 'message',
                sortable: true,
            },
        ]}

        actions={(row: ContactSubmission) => (
            <div className="flex flex-wrap items-center gap-2">
                <IconTextButton 
                    icon={Trash2}
                    onClick={() => openDeleteModal(row)}
                    color="red"
                    text="Delete"
                />
            </div>
        )}
      />
      </Card>
      
      <DangerModal 
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Contact Submission"
        content="Are you sure you want to delete this contact submission?"
        onAccept={handleDeleteAccept}
        onCancel={() => setIsDeleteModalOpen(false)}
      />
    </>
  )
}

export default ContactSubmissions