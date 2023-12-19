import { useState } from 'react';
import { useAuthContext } from './useAuthContext';

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('https://casterscompanionserver.onrender.com/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const json = await res.json();

      if (!res.ok) {
        setIsLoading(false);
        setError(json.error);
      } else {
        console.log('Login successful. User data:', json);
        localStorage.setItem('user', JSON.stringify(json));
        localStorage.setItem('token', json.token);
        dispatch({ type: 'LOGIN', payload: json });
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('An error occurred during login.');
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};
