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
        // Save the user data and token to local storage
        localStorage.setItem('user', JSON.stringify(json));
        localStorage.setItem('token', json.token); // Assuming the token is present in the API response as 'token'

        // Update auth context with user data
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
