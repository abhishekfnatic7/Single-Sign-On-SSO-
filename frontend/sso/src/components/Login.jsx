// src/App.js
import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { Navigate, useNavigate } from 'react-router-dom';

function parseJwt(token) {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    console.error('Invalid JWT token:', e);
    return null;
  }
}

function App() {
  const navigate=useNavigate();
  const clientId = 'your-client-key'; // Replace with your actual Client ID

  const handleLoginSuccess = async (response) => {
    const token = response.credential;
    const decoded = parseJwt(token);
    console.log('Decoded JWT token:', decoded);

    try {
      const res = await fetch('http://localhost:8000/sso/api/authentication/google/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token })
      });

      if (res.ok) {
        const data = await res.json();
        console.log('Login success:', data);
        // Save the tokens as needed
        localStorage.setItem('access_token', data.access);
        localStorage.setItem('refresh_token', data.refresh);
        navigate('/')
        
      } else {
        const errorData = await res.json();
        console.error('Login failed:', errorData);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const handleLoginFailure = (response) => {
    console.error('Login failed:', response);
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="App">
        <h1>Google OAuth Login</h1>
        <GoogleLogin
          onSuccess={handleLoginSuccess}
          onError={handleLoginFailure}
        />
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;