import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Components
import Navbar from './components/Navbar';
import Home from './pages/Home';
import HealthTips from './pages/HealthTips';
import Clinics from './pages/Clinics';
import HealthRecords from './pages/HealthRecords';
import MenstrualTracker from './pages/MenstrualTracker';
import Notifications from './pages/Notifications';
import Login from './pages/Login';
import Register from './pages/Register';

// Create theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3',
    },
    secondary: {
      main: '#f50057',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/health-tips" element={<HealthTips />} />
          <Route path="/clinics" element={<Clinics />} />
          <Route path="/health-records" element={<HealthRecords />} />
          <Route path="/menstrual-tracker" element={<MenstrualTracker />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App; 