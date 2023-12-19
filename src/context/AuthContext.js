import React, { createContext, useEffect, useReducer } from 'react';

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      };
    case 'LOGOUT':
      return { ...state, user: null, token: null };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    token: null, // Add the token field to the initial state
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user ? localStorage.getItem('token') : null;
    if (user) {
      dispatch({ type: 'LOGIN', payload: { user, token } }); // Include the token in the LOGIN action payload
    }
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
