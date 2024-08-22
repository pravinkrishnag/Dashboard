import React, { useState, useEffect } from 'react';

function User() {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const id=localStorage.getItem("id")
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem('authToken');

        const response = await fetch(`http://localhost:7001/user/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        console.log(data)
        if (response.ok) {
          setUserInfo(data.res);
          setLoading(false);
        } else {
          setError(data.message || 'Failed to fetch user information');
          setLoading(false);
        }
      } catch (err) {
        setError('Something went wrong. Please try again.');
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>;
  }

  return (
    <div>
      <h1>User Information</h1>
      {userInfo && (
        <div>
          <p><strong>Name:</strong> {userInfo.name}</p>
          <p><strong>Email:</strong> {userInfo.email}</p>
          <p><strong>Gender:</strong> {userInfo.gender}</p>
        </div>
      )}
    </div>
  );
}

export default User;
