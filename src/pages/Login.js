import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { useLogin } from '../hooks/useLogin';
import { useLogout } from '../hooks/useLogout';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { logout } = useLogout();
  const { login, error } = useLogin();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email, password);

    // Clear the email and password fields after successful login
    setEmail('');
    setPassword('');
  };

  return (
    <div className="container">
      {!user && (
        <div>
          <form className="login" onSubmit={handleSubmit}>
            <h2>Log In</h2>
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <button className="myButton">Log In</button>
            <button className="myButtonInverted">
              <Link to="/signup">Create Account</Link>
            </button>
            {error && <div className="error">{error}</div>}
          </form>
        </div>
      )}
      {user && (
        <div className="logout">
          <span className="mb-4">
            <h2 className="text-center">Logged in as</h2>
            {user.email}
          </span>
          <button onClick={handleClick} className="myButton">
            Log Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Login;
