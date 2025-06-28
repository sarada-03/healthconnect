import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Tabs, Tab } from '@mui/material';
import api from '../api';

function Login() {
  const [tab, setTab] = useState(0);
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleTabChange = (e, newValue) => {
    setTab(newValue);
    setMessage('');
  };

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', form);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      setMessage('Login successful!');
      // Optionally redirect to dashboard or home
    } catch (err) {
      setMessage(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <Box maxWidth={400} mx="auto" mt={4} p={2} boxShadow={2} borderRadius={2} bgcolor="#fff">
      <Tabs value={tab} onChange={handleTabChange} centered>
        <Tab label="User" />
        <Tab label="Hospital/Clinic" />
      </Tabs>
      <form onSubmit={handleSubmit}>
        <TextField fullWidth margin="normal" label="Email" name="email" type="email" value={form.email} onChange={handleChange} required />
        <TextField fullWidth margin="normal" label="Password" name="password" type="password" value={form.password} onChange={handleChange} required />
        <Button fullWidth variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>Login</Button>
      </form>
      {message && <Typography color="primary" mt={2}>{message}</Typography>}
    </Box>
  );
}

export default Login; 