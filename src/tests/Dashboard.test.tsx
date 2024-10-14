/* class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

window.ResizeObserver = ResizeObserver

// test.tsx
import '@testing-library/jest-dom'

import { render, screen, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import AdminDashboard from '../views/AdminDashboard'
import '../i18n'
import { store } from '../redux/store'

// Mock Redux store for testing





describe('AdminDashboard', () => {

  it('renders the admin dashboard with correct statistics', async () => {
  
    // Assert that the StatCards are rendered with the correct data
    await waitFor(() => {
      expect(screen.getByText("Le nombre total d'utilisateurs")).toBeInTheDocument()
      expect(screen.getByText('100')).toBeInTheDocument()
    })

    await waitFor(() => {
      expect(screen.getByText("Événements Actifs")).toBeInTheDocument()
      expect(screen.getByText('5')).toBeInTheDocument()
    })

    await waitFor(() => {
      expect(screen.getByText('Nouvelles Annonces')).toBeInTheDocument()
      expect(screen.getByText('3')).toBeInTheDocument()
    })

    await waitFor(() => {
      expect(screen.getByText("Le nombre total d'articles")).toBeInTheDocument()
      expect(screen.getByText('10')).toBeInTheDocument()
    })

    await waitFor(() => {
      expect(screen.getByText('Gestionnaires')).toBeInTheDocument()
      expect(screen.getByText('2')).toBeInTheDocument()
    })

    await waitFor(() => {
      expect(screen.getByText('Contacts')).toBeInTheDocument()
      expect(screen.getByText('15')).toBeInTheDocument()
    })

  })

  it('renders user growth chart correctly', async () => {
    render(
      <Provider store={store}>
        <AdminDashboard />
      </Provider>
    )

    // Assert that the AreaChart for user growth is rendered
    const userGrowthChart = screen.getByText('Croissance des Utilisateurs')
    expect(userGrowthChart).toBeInTheDocument()
  })

  it('renders weekly activity chart correctly', async () => {
    render(
      <Provider store={store}>
        <AdminDashboard />
      </Provider>
    )

    // Assert that the BarChart for weekly activity is rendered
    const weeklyActivityChart = screen.getByText("Activités Hebdomadaires")
    expect(weeklyActivityChart).toBeInTheDocument()
  })

  it('renders article categories chart correctly', async () => {
    render(
      <Provider store={store}>
        <AdminDashboard />
      </Provider>
    )

    // Assert that the BarChart for articles by category is rendered
    const articlesByCategoryChart = screen.getByText("Distribution des Catégories d'Articles")
    expect(articlesByCategoryChart).toBeInTheDocument()
  })
})
 */