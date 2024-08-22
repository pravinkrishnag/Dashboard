import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import the hook
import '../components/SignIn.css';
import Logo from '../components/Logo.png';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize the hook

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:7001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('SignIn successful:', data);
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('id', data.user._id);

        if (data.user.usertype === 'user') {
          navigate('/user'); // Navigate to the user page
        } else if (data.user.usertype === 'admin') {
          navigate('/admindashboard'); // Navigate to the admin page
        }
      } else {
        setError(data.message || 'Authentication failed. Please try again.');
      }
    } catch (error) {
      console.error('SignIn error:', error);
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <>
      <div id="main">
        <div id="logo">
          <img src={Logo} alt="Logo.png" />
        </div>
        <div id="forms">
          <h4>Sign In</h4>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <form onSubmit={handleSignIn}>
            <div>
              <label>Email: </label>
              <input
                type="email"
                id="email"
                required
                value={email}
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label>Password: </label>
              <input
                type="password"
                id="password"
                required
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div id="buttons">
              <button id="submit" type="submit">
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignIn;
