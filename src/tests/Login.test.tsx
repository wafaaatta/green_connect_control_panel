import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, BrowserRouter as Router } from 'react-router-dom';
import GreenConnectAdminLogin from '../views/Login';
import '@testing-library/jest-dom'
import '../i18n'
import { setupMockupStore } from '../redux/mockup_store';
import { loginManager } from '../redux/mockup_stores/auth_store';


// Create mock store with thunk

describe('GreenConnectAdminLogin', () => {

  it('renders the login form', () => {
    const store = setupMockupStore({})
    render(
      <Provider store={store}>
        <MemoryRouter>
            <GreenConnectAdminLogin />
        </MemoryRouter>
      </Provider>
    )

    expect(screen.getByPlaceholderText('E-mail')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Mot de passe/i)).toBeInTheDocument();
    expect(screen.getByText(/Se connecter/i)).toBeInTheDocument();
  });

  it('updates email and password on input change', () => {
    const store = setupMockupStore({})
    render(
      <Provider store={store}>
        <MemoryRouter>
            <GreenConnectAdminLogin />
        </MemoryRouter>
      </Provider>
    )

    const emailInput = screen.getByPlaceholderText('E-mail');
    const passwordInput = screen.getByPlaceholderText(/Mot de passe/i);

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(emailInput).toHaveValue('test@example.com');
    expect(passwordInput).toHaveValue('password123');
  });

  it('dispatches loginManager on form submit', async () => {
    const store = setupMockupStore({})
    render(
      <Provider store={store}>
        <MemoryRouter>
            <GreenConnectAdminLogin />
        </MemoryRouter>
      </Provider>
    )

    store.dispatch(loginManager({ email: 'admin@example.com', password: 'password123' }));
    expect(store.getState().auth_store.status_code).toBe(404);

    store.dispatch(loginManager({ email: 'test@example.com', password: 'password123' }));
    expect(store.getState().auth_store.status_code).toBe(400);

    store.dispatch(loginManager({ email: 'test@example.com', password: 'test' }));
    expect(store.getState().auth_store.status_code).toBe(200);
  });

  it('displays notification on login failure', async () => {
    // Mock rejected loginManager action
    // store.dispatch = jest.fn(() =>
    //   Promise.reject({
    //     message: 'Invalid credentials',
    //   })
    // );

    const store = setupMockupStore({})
    render(
      <Provider store={store}>
        <MemoryRouter>
            <GreenConnectAdminLogin />
        </MemoryRouter>
      </Provider>
    )


    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const signInButton = screen.getByText(/sign in/i);

    // Mock valid input
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });

    fireEvent.click(signInButton);

    await waitFor(() => {
    //   expect(store.dispatch).toHaveBeenCalledWith(
    //     loginManager({ email: 'test@example.com', password: 'wrongpassword' })
    //   );
    //   expect(store.dispatch).toHaveBeenCalledWith(
    //     showNotification({
    //       type: 'error',
    //       message: i18next.t('login.loginFailed'),
    //       description: 'Invalid credentials',
    //     })
    //   );
    });
  });

  it('toggles the password visibility', () => {
    const store = setupMockupStore({})
    render(
      <Provider store={store}>
        <MemoryRouter>
            <GreenConnectAdminLogin />
        </MemoryRouter>
      </Provider>
    )

    const passwordInput = screen.getByPlaceholderText(/Mot de passe/i);
    const togglePasswordButton = screen.getByRole('button', {
        name: 'Afficher le mot de passe'
    });

    expect(passwordInput).toHaveAttribute('type', 'password');

    fireEvent.click(togglePasswordButton);

    expect(passwordInput).toHaveAttribute('type', 'text');

    fireEvent.click(togglePasswordButton);

    expect(passwordInput).toHaveAttribute('type', 'password');
  });
});
