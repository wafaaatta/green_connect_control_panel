import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import announceReducer, { getAllAnnounces, acceptAnnounce, rejectAnnounce } from '../redux/stores/announce_store'
import notificationReducer from '../redux/stores/notification_store'
import { t } from 'i18next'
import { act } from 'react-dom/test-utils'
import AnnouncesPage from '../views/Announces'

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}))

jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve({ data: [] })),
  post: jest.fn(() => Promise.resolve()),
}))

const setupStore = () => {
  return configureStore({
    reducer: {
      announce_store: announceReducer,
      notification_store: notificationReducer,
    },
  })
}

describe('AnnouncesPage', () => {
  let store: ReturnType<typeof setupStore>

  beforeEach(() => {
    store = setupStore()
    store.dispatch = jest.fn(store.dispatch)
  })

  it('renders AnnouncesPage correctly', async () => {
    render(
      <Provider store={store}>
        <AnnouncesPage />
      </Provider>
    )

    expect(screen.getByText('announcesPage.dashboard')).toBeInTheDocument()
    expect(screen.getByText('announcesPage.announces')).toBeInTheDocument()
    expect(screen.getByText('announcesPage.refreshData')).toBeInTheDocument()
  })

  it('fetches announces on mount', async () => {
    render(
      <Provider store={store}>
        <AnnouncesPage />
      </Provider>
    )

    expect(store.dispatch).toHaveBeenCalledWith(getAllAnnounces())
  })

  it('filters announces based on status', async () => {
    const announces = [
      { id: 1, title: 'Announce 1', status: 'pending' },
      { id: 2, title: 'Announce 2', status: 'accepted' },
    ]

    await act(async () => {
      render(
        <Provider store={store}>
          <AnnouncesPage />
        </Provider>
      )

      store.dispatch({
        type: 'announce/getAllAnnounces/fulfilled',
        payload: announces,
      })
    })

    fireEvent.click(screen.getByText('announcesPage.allStatuses'))

    const statusOptions = screen.getAllByRole('menuitem')
    fireEvent.click(statusOptions[2]) // Select 'accepted' status

    await waitFor(() => {
      expect(screen.getByText('Announce 2')).toBeInTheDocument()
      expect(screen.queryByText('Announce 1')).not.toBeInTheDocument()
    })
  })

  it('handles accept action', async () => {
    const announce = { id: 1, title: 'Announce 1', status: 'pending' }
    render(
      <Provider store={store}>
        <AnnouncesPage />
      </Provider>
    )

    store.dispatch({
      type: 'announce/getAllAnnounces/fulfilled',
      payload: [announce],
    })

    fireEvent.click(screen.getByText('announcesPage.accept'))

    await waitFor(() => {
      expect(store.dispatch).toHaveBeenCalledWith(acceptAnnounce(announce.id))
    })
  })

  it('handles reject action', async () => {
    const announce = { id: 1, title: 'Announce 1', status: 'pending' }
    render(
      <Provider store={store}>
        <AnnouncesPage />
      </Provider>
    )

    store.dispatch({
      type: 'announce/getAllAnnounces/fulfilled',
      payload: [announce],
    })

    fireEvent.click(screen.getByText('announcesPage.reject'))

    await waitFor(() => {
      expect(store.dispatch).toHaveBeenCalledWith(rejectAnnounce(announce.id))
    })
  })

  it('closes modals when canceling actions', async () => {
    const announce = { id: 1, title: 'Announce 1', status: 'pending' }
    render(
      <Provider store={store}>
        <AnnouncesPage />
      </Provider>
    )

    store.dispatch({
      type: 'announce/getAllAnnounces/fulfilled',
      payload: [announce],
    })

    // Test for Accept Modal
    fireEvent.click(screen.getByText('announcesPage.accept'))
    fireEvent.click(screen.getByText('announcesPage.cancel'))

    await waitFor(() => {
      expect(screen.queryByText('announcesPage.acceptAnnouncement')).not.toBeInTheDocument()
    })

    // Test for Reject Modal
    fireEvent.click(screen.getByText('announcesPage.reject'))
    fireEvent.click(screen.getByText('announcesPage.cancel'))

    await waitFor(() => {
      expect(screen.queryByText('announcesPage.rejectAnnouncement')).not.toBeInTheDocument()
    })
  })
})
