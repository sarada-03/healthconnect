import React, { useState } from 'react';
import { Box, Tabs, Tab, TextField, Button, Typography, MenuItem } from '@mui/material';
import api from '../api';

const genders = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
];

function Register() {
  const [tab, setTab] = useState(0);
  const [userForm, setUserForm] = useState({
    name: '', email: '', password: '', gender: '', dateOfBirth: '', phone: '',
  });
  const [clinicForm, setClinicForm] = useState({
    name: '', email: '', password: '', clinicName: '', address: '', phone: '',
  });
  const [message, setMessage] = useState('');

  const handleTabChange = (e, newValue) => {
    setTab(newValue);
    setMessage('');
  };

  const handleUserChange = e => {
    setUserForm({ ...userForm, [e.target.name]: e.target.value });
  };
  const handleClinicChange = e => {
    setClinicForm({ ...clinicForm, [e.target.name]: e.target.value });
  };

  const handleUserSubmit = async e => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/register', { ...userForm, gender: userForm.gender, dateOfBirth: userForm.dateOfBirth });
      setMessage('User registered! Please login.');
    } catch (err) {
      setMessage(
        err.response?.data?.message ||
        (err.response?.data?.errors ? err.response.data.errors.map(e => e.msg).join(', ') : '') ||
        'Registration failed'
      );
    }
  };

  const handleClinicSubmit = async e => {
    e.preventDefault();
    try {
      // For demo, use the same endpoint. In production, use /auth/register-clinic
      const res = await api.post('/auth/register', { ...clinicForm, isClinic: true });
      setMessage('Clinic registered! Please login.');
    } catch (err) {
      setMessage(
        err.response?.data?.message ||
        (err.response?.data?.errors ? err.response.data.errors.map(e => e.msg).join(', ') : '') ||
        'Registration failed'
      );
    }
  };

  return (
    <Box maxWidth={400} mx="auto" mt={4} p={2} boxShadow={2} borderRadius={2} bgcolor="#fff">
      <Tabs value={tab} onChange={handleTabChange} centered>
        <Tab label="User" />
        <Tab label="Hospital/Clinic" />
      </Tabs>
      {tab === 0 && (
        <form onSubmit={handleUserSubmit}>
          <TextField fullWidth margin="normal" label="Name" name="name" value={userForm.name} onChange={handleUserChange} required />
          <TextField fullWidth margin="normal" label="Email" name="email" type="email" value={userForm.email} onChange={handleUserChange} required />
          <TextField fullWidth margin="normal" label="Password" name="password" type="password" value={userForm.password} onChange={handleUserChange} required />
          <TextField select fullWidth margin="normal" label="Gender" name="gender" value={userForm.gender} onChange={handleUserChange} required>
            {genders.map(option => <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>)}
          </TextField>
          <TextField fullWidth margin="normal" label="Date of Birth" name="dateOfBirth" type="date" value={userForm.dateOfBirth} onChange={handleUserChange} InputLabelProps={{ shrink: true }} required />
          <TextField fullWidth margin="normal" label="Phone" name="phone" value={userForm.phone} onChange={handleUserChange} />
          <Button fullWidth variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>Register as User</Button>
        </form>
      )}
      {tab === 1 && (
        <form onSubmit={handleClinicSubmit}>
          <TextField fullWidth margin="normal" label="Name" name="name" value={clinicForm.name} onChange={handleClinicChange} required />
          <TextField fullWidth margin="normal" label="Email" name="email" type="email" value={clinicForm.email} onChange={handleClinicChange} required />
          <TextField fullWidth margin="normal" label="Password" name="password" type="password" value={clinicForm.password} onChange={handleClinicChange} required />
          <TextField fullWidth margin="normal" label="Clinic Name" name="clinicName" value={clinicForm.clinicName} onChange={handleClinicChange} required />
          <TextField fullWidth margin="normal" label="Address" name="address" value={clinicForm.address} onChange={handleClinicChange} required />
          <TextField fullWidth margin="normal" label="Phone" name="phone" value={clinicForm.phone} onChange={handleClinicChange} />
          <Button fullWidth variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>Register as Clinic</Button>
        </form>
      )}
      {message && <Typography color="primary" mt={2}>{message}</Typography>}
    </Box>
  );
}

export default Register; 