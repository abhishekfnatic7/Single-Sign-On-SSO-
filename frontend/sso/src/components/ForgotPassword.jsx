// src/components/ForgotPassword.jsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, TextField, Container, Typography, Box, Link } from '@mui/material';

const ForgotPassword = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log('Email:', data.email);
    // Handle reset password logic here, such as sending a reset link to the user's email
  };

  return (
    <Container maxWidth="xs">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
      >
        <Typography variant="h4" gutterBottom>Forgot Password</Typography>
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
          <TextField
            fullWidth
            label="Email"
            margin="normal"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^\S+@\S+$/i,
                message: 'Invalid email address'
              }
            })}
            error={!!errors.email}
            helperText={errors.email ? errors.email.message : ''}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginTop: '16px' }}
          >
            Send Reset Link
          </Button>
        </form>
        <Link href="/login" variant="body2" style={{ marginTop: '16px' }}>
          Back to Login
        </Link>
      </Box>
    </Container>
  );
};

export default ForgotPassword;