import React, { useState } from 'react';
import '../components/SignUp.css';
import Logo from '../components/Logo.png';

function SignUp() {
  // States for form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('male'); // default value is male
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state
  const [success, setSuccess] = useState(false); // Success state

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    const signupData = { name, email, password, gender };
    try {
      const response = await fetch('http://localhost:7001/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupData),
      });

      // Check if the signup was successful
      if (response.ok) {
        setSuccess(true);
        console.log('Signup successful!');
        // Clear form data (optional)
        setName('');
        setEmail('');
        setPassword('');
        setGender('male');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Signup failed');
      }
    } catch (error) {
      setError('An error occurred during signup. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  const handleSignin = (e) => {
    e.preventDefault();
    console.log('Redirecting to SignIn Page');
    // Here you can redirect to the SignIn page using React Router or other logic
  };
  return (
    <>
      <div id="main">
        <div id="logo">
          <img src={Logo} alt="Logo.png" />
        </div>
        <div id="forms">
          <h4>Sign Up</h4>
          <form onSubmit={handleSignup}>
            <div>
              <label>Name: </label>
              <input
                id="name"
                required
                type="text"
                value={name}
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
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
            <div id="gender">
              <label>
                Gender
                <input
                  type="radio"
                  value="male"
                  checked={gender === 'male'}
                  onChange={(e) => setGender(e.target.value)}
                />
                Male
              </label>
              <label>
                <input
                  type="radio"
                  value="female"
                  checked={gender === 'female'}
                  onChange={(e) => setGender(e.target.value)}
                />
                Female
              </label>
            </div>
            <div id="buttons">
              <button id="submit" type="submit" disabled={loading}>
                {loading ? 'Signing Up...' : 'Sign Up'}
              </button>
              <button id="signUp" type="button" onClick={handleSignin}>
                Sign In
              </button>
            </div>
          </form>
          {/* Show success or error messages */}
          {error && <p className="error">{error}</p>}
          {success && <p className="success">Signup successful!</p>}
        </div>
      </div>
    </>
  );
}

export default SignUp;
