import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from './useAuthContext';

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

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
        localStorage.setItem('user', JSON.stringify(json));
        localStorage.setItem('token', json.token);
        dispatch({ type: 'LOGIN', payload: json });
        setIsLoading(false);

        navigate('/');
        window.location.reload();
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('An error occurred during login.');
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};
