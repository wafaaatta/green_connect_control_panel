import { Trash, RefreshCcw } from 'lucide-react'
import { Card } from '../components/Card'
import IconTextButton from '../components/IconTextButton'
import { DataTable } from '../components/DataTable'
import { Breadcrumb } from '../components/Breadcrumb'
import Button from '../components/Button'
import { useAppDispatch, useAppSelector } from '../hooks/hooks'
import { useEffect, useState } from 'react'
import { getAllUsers } from '../redux/stores/user_store'
import { IconType } from 'react-icons'
import { useTranslation } from 'react-i18next'
import Badge from '../components/Badge'
import { DangerModal } from '../components/DangerModal'
import User from '../interfaces/User'

const UsersPage = () => {
  const { t } = useTranslation()
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [userToDelete, setUserToDelete] = useState<User | null>(null)

  const breadcrumbItems = [
    { label: t('usersPage.dashboard'), href: '/' },
    { label: t('usersPage.users'), href: '/users' },
  ];

  const dispatch = useAppDispatch();

  const {users, loading} = useAppSelector((state) => state.user_store);

  useEffect(() => {
    dispatch(getAllUsers())
  }, [dispatch])

  const openDeleteModal = (user: User) => {
    setUserToDelete(user)
    setIsDeleteModalOpen(true)
  }

  const handleDelete = () => {
    if (userToDelete) {
      console.log(userToDelete)
    }
  }

  const ActionBar: React.FC = () => (
    <div className="bg-white shadow rounded px-4 py-2 mb-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <Breadcrumb items={breadcrumbItems} />
        <div className="flex flex-wrap items-center gap-2">
          <Button leftIcon={RefreshCcw as IconType} size="sm" onClick={() => {}}>
            {t('usersPage.refreshData')}
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-100 min-h-screen">
      <ActionBar />
      <Card
        title={t('usersPage.users')}
      >
        <DataTable 
          hoverable
          paginated
          striped
          showColumnSelector
          emptyMessage={t('usersPage.noUsersFound')}
          itemsPerPage={8}
          data={users}
          loading={loading}
          columns={[
            { id: 'id', key: 'id', title: t('usersPage.id') },
            { id: 'name', key: 'name', title: t('usersPage.name') },
            { id: 'email', key: 'email', title: t('usersPage.email') },
            { id: 'email_verified_at', key: 'email_verified_at', title: t('usersPage.email_verified_at'), render(value, row) {
              return row.email_verified_at ?? <Badge color="danger">{t('usersPage.not_verified')}</Badge>;
            }, },
          ]}
          actions={(user: User) => (
            <>
              <IconTextButton
                icon={Trash as IconType}
                color="red"
                text={t('usersPage.delete')}
                onClick={() => openDeleteModal(user)}
              />
            </>
          )}
        />
      </Card>

      <DangerModal 
        isOpen={isDeleteModalOpen}
        title={t('usersPage.deleteUser')}
        content={t('usersPage.deleteUserDescription')}
        onAccept={handleDelete}
        onClose={() => setIsDeleteModalOpen(false)}
        onCancel={() => setIsDeleteModalOpen(false)}
      />
    </div>
  )
}

export default UsersPage