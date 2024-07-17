// src/components/GoogleLoginButton.jsx

import React from 'react';
import { GoogleLogin } from 'react-google-login';
import axios from './axiosConfig'; // use your configured axios

const GoogleLoginButton = () => {
  const handleGoogleSuccess = async (response) => {
    const token = response.tokenId;
    try {
      const res = await axios.post('/auth/google/', { token });
      localStorage.setItem('token', res.data.auth_token);
      axios.defaults.headers.common['Authorization'] = `Token ${res.data.auth_token}`;
      // Redirect to the desired page
    } catch (error) {
      console.error('Google login failed!', error.response?.data);
    }
  };

  const handleGoogleFailure = (response) => {
    console.error('Google login failed!', response);
  };

  return (
    <GoogleLogin
      clientId="your-google-oauth2-client-id"
      buttonText="Login with Google"
      onSuccess={handleGoogleSuccess}
      onFailure={handleGoogleFailure}
      cookiePolicy={'single_host_origin'}
    />
  );
};

export default GoogleLoginButton;