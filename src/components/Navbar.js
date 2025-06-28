import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  useMediaQuery,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Divider,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [user, setUser] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const menuItems = [
    { text: 'Home', path: '/', icon: <HomeIcon /> },
    { text: 'Health Tips', path: '/health-tips', icon: <LocalHospitalIcon /> },
    { text: 'Clinics', path: '/clinics', icon: <HealthAndSafetyIcon /> },
    { text: 'Health Records', path: '/health-records', icon: <HealthAndSafetyIcon /> },
    { text: 'Menstrual Tracker', path: '/menstrual-tracker', icon: <CalendarMonthIcon /> },
    { text: 'Notifications', path: '/notifications', icon: <NotificationsIcon /> },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleAuthDialogOpen = () => {
    setAuthDialogOpen(true);
  };

  const handleAuthDialogClose = () => {
    setAuthDialogOpen(false);
  };

  const handleLogin = () => {
    navigate('/login');
    handleAuthDialogClose();
  };

  const handleRegister = () => {
    navigate('/register');
    handleAuthDialogClose();
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  const drawer = (
    <List>
      {menuItems.map((item) => (
        <ListItem
          button
          component={RouterLink}
          to={item.path}
          key={item.text}
          onClick={handleDrawerToggle}
        >
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.text} />
        </ListItem>
      ))}
      <Divider />
      {user ? (
        <ListItem button onClick={handleLogout}>
          <ListItemIcon><LogoutIcon /></ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      ) : (
        <ListItem button onClick={handleAuthDialogOpen}>
          <ListItemIcon><LoginIcon /></ListItemIcon>
          <ListItemText primary="Sign In" />
        </ListItem>
      )}
    </List>
  );

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Health Connect
          </Typography>
          {!isMobile && (
            <>
              {menuItems.map((item) => (
                <Button
                  color="inherit"
                  component={RouterLink}
                  to={item.path}
                  key={item.text}
                  startIcon={item.icon}
                >
                  {item.text}
                </Button>
              ))}
              {user ? (
                <Button
                  color="inherit"
                  onClick={handleLogout}
                  startIcon={<LogoutIcon />}
                >
                  Logout
                </Button>
              ) : (
                <Button
                  color="inherit"
                  onClick={handleAuthDialogOpen}
                  startIcon={<LoginIcon />}
                >
                  Sign In
                </Button>
              )}
            </>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
      >
        {drawer}
      </Drawer>

      <Dialog open={authDialogOpen} onClose={handleAuthDialogClose}>
        <DialogTitle>Welcome to Health Info Access</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 2, minWidth: 300 }}>
            <Typography>
              Please sign in or create an account to access all features.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleLogin}
              startIcon={<LoginIcon />}
            >
              Sign In
            </Button>
            <Button
              variant="outlined"
              color="primary"
              fullWidth
              onClick={handleRegister}
              startIcon={<LoginIcon />}
            >
              Create Account
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Navbar; 