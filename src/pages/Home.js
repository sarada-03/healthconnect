import React from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Box,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const features = [
  {
    title: 'Daily Health Tips',
    description: 'Get health tips in both Telugu and English languages',
    image: '/images/health-tips.png',
    path: '/health-tips',
  },
  {
    title: 'Nearby Clinics',
    description: 'Find clinics and emergency contact numbers in your area',
    image: '/images/clinics.png',
    path: '/clinics',
  },
  {
    title: 'Health Records',
    description: 'Store and track your BP, sugar, and weight records digitally',
    image: '/images/health-records.png',
    path: '/health-records',
  },
  {
    title: 'Menstrual Tracker',
    description: 'Track your menstrual health and get personalized insights',
    image: '/images/menstrual-tracker.png',
    path: '/menstrual-tracker',
  },
];

const Home = () => {
  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: 8,
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h2" component="h1" gutterBottom>
            Health Connect
          </Typography>
          <Typography variant="h5" paragraph>
            Access health information, track your records, and stay connected with healthcare services
            all in one place.
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            component={RouterLink}
            to="/register"
            sx={{ mt: 2 }}
          >
            Get Started
          </Button>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h3" component="h2" textAlign="center" gutterBottom>
          Features
        </Typography>
        <Grid container spacing={4} sx={{ mt: 2 }}>
          {features.map((feature) => (
            <Grid item key={feature.title} xs={12} sm={6} md={3}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  '&:hover': {
                    transform: 'scale(1.02)',
                    transition: 'transform 0.2s ease-in-out',
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={feature.image}
                  alt={feature.title}
                  sx={{
                    objectFit: 'contain',
                    display: 'block',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    maxHeight: 140,
                    maxWidth: 120,
                  }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h3">
                    {feature.title}
                  </Typography>
                  <Typography>{feature.description}</Typography>
                </CardContent>
                <Box sx={{ p: 2 }}>
                  <Button
                    component={RouterLink}
                    to={feature.path}
                    variant="outlined"
                    fullWidth
                  >
                    Learn More
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Home; 