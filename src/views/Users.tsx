import { Trash, RefreshCcw } from 'lucide-react'
import { Card } from '../components/Card'
import IconTextButton from '../components/IconTextButton'
import { DataTable } from '../components/DataTable'
import { Breadcrumb } from '../components/Breadcrumb'
import Button from '../components/Button'
import { useAppDispatch, useAppSelector } from '../hooks/hooks'
import { useEffect } from 'react'
import { getAllUsers } from '../redux/stores/user_store'
import { IconType } from 'react-icons'


const UsersPage = () => {
  const breadcrumbItems = [
    { label: 'Dashboard', href: '/' },
    { label: 'Users', href: '/users' },
  ];

  const dispatch = useAppDispatch();

  const {users, loading} = useAppSelector((state) => state.user_store);

  useEffect(() => {
    dispatch(getAllUsers())
  }, [dispatch])

  const ActionBar: React.FC = () => (
    <div className="bg-white shadow rounded px-4 py-2 mb-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <Breadcrumb items={breadcrumbItems} />
        <div className="flex flex-wrap items-center gap-2">
          <Button color="blue" leftIcon={RefreshCcw as IconType} size="sm" onClick={() => {}}>
            Refresh Data
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-100 min-h-screen">
      <ActionBar />
      <Card
        title="Users"
      >
        <DataTable 
          hoverable
          paginated
          striped
          showColumnSelector
          emptyMessage='No events found'
          itemsPerPage={8}
          data={users}
          loading={loading}
          columns={[
            { id: 'id', key: 'id', title: 'ID' },
            { id: 'name', key: 'name', title: 'Name' },
            { id: 'email', key: 'email', title: 'Email' },
          ]}
          actions={() => (
            <>
              <IconTextButton
                icon={Trash as IconType}
                color="red"
              />
            </>
          )}
        />
      </Card>
    </div>
  )
}

export default UsersPage