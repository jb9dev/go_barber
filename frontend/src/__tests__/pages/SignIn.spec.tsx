import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react'

import SignIn from '../../pages/SignIn';

const mockedHistoryPush = jest.fn();
const mockedSignIn = jest.fn();
const mockedAddToast = jest.fn();

jest.mock('react-router-dom', () => {
  return {
    useHistory: () => ({
      push: mockedHistoryPush,
    }),
    Link: ({ children }: { children: React.ReactNode }) => children,
  }
});

jest.mock('../../hooks/auth', () => {
  return {
    useAuth: () => ({
      signIn: mockedSignIn,
    }),
  }
});

jest.mock('../../hooks/toast', () => {
  return {
    useToast: () => ({
      addToast: mockedAddToast,
    }),
  }
});

describe('SignIn page', () => {
  beforeEach(() => {
    mockedHistoryPush.mockClear();
  });

  it('should be able to sign in', async () => {
    const { getByPlaceholderText, getByText } = render(<SignIn />);
    const emailInput = getByPlaceholderText('E-mail');
    const passwordInput = getByPlaceholderText('Senha');
    const submitButton = getByText('Entrar');

    fireEvent.change(emailInput, { target: { value: 'johndoe@example.com' }});
    fireEvent.change(passwordInput, { target: { value: '123456' }});
    fireEvent.click(submitButton);

    await wait(() => {
      expect(mockedHistoryPush).toHaveBeenCalledWith('/dashboard');
    });
  });

  it('should not be able to sign in with invalid e-mail', async () => {
    const { getByPlaceholderText, getByText } = render(<SignIn />);
    const emailInput = getByPlaceholderText('E-mail');
    const passwordInput = getByPlaceholderText('Senha');
    const submitButton = getByText('Entrar');

    fireEvent.change(emailInput, { target: { value: 'non-valid-email' }});
    fireEvent.change(passwordInput, { target: { value: '123456' }});
    fireEvent.click(submitButton);

    await wait(() => {
      expect(mockedHistoryPush).not.toHaveBeenCalled();
    });
  });

  it('should not be able to sign in when it fails', async () => {
    mockedSignIn.mockImplementation(() => {
      throw new Error();
    })

    const { getByPlaceholderText, getByText } = render(<SignIn />);
    const emailInput = getByPlaceholderText('E-mail');
    const passwordInput = getByPlaceholderText('Senha');
    const submitButton = getByText('Entrar');

    fireEvent.change(emailInput, { target: { value: 'johndoe@example.com' }});
    fireEvent.change(passwordInput, { target: { value: '123456' }});
    fireEvent.click(submitButton);

    await wait(() => {
      expect(mockedAddToast).toHaveBeenCalledWith(expect.objectContaining({
        type: 'error',
      }));
    });
  });
});
