import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Stack, Container, Typography, Paper, Grid } from '@mui/material';

const WEDDING_DATE = '2025-05-15T00:00:00';

const StyledRoot = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  padding: theme.spacing(10, 0),
}));

const TimeBox = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  backgroundColor: theme.palette.common.white,
  borderRadius: theme.shape.borderRadius,
  minWidth: 80,
}));

const TimeNumber = styled(Typography)(({ theme }) => ({
  fontSize: '2.5rem',
  fontWeight: theme.typography.fontWeightBold,
  lineHeight: 1.2,
  color: theme.palette.text.primary,
}));

const TimeLabel = styled(Typography)(({ theme }) => ({
  fontSize: '0.75rem',
  fontWeight: theme.typography.fontWeightMedium,
  textTransform: 'uppercase',
  color: theme.palette.text.secondary,
  letterSpacing: 1,
}));

export default function HomeCountdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const calculateTimeLeft = () => {
    const difference = +new Date(WEDDING_DATE) - +new Date();
    let timeLeftData = { days: 0, hours: 0, minutes: 0, seconds: 0 };

    if (difference > 0) {
      timeLeftData = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeftData;
  };

  useEffect(() => {
    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  const timeUnits = [
    { value: timeLeft.days, label: 'Dias' },
    { value: timeLeft.hours, label: 'Horas' },
    { value: timeLeft.minutes, label: 'Minutos' },
    { value: timeLeft.seconds, label: 'Segundos' },
  ];

  return (
    <StyledRoot>
      <Container maxWidth="sm">
        <Stack spacing={4} alignItems="center">
          <Typography variant="h3" sx={{ color: 'common.white' }}>
            Contagem Regressiva
          </Typography>
          <Grid container spacing={{ xs: 2, md: 3 }} justifyContent="center">
            {timeUnits.map((unit) => (
              <Grid item key={unit.label}>
                <TimeBox elevation={3}>
                  <TimeNumber>
                    {unit.label === 'Dias' ? unit.value : formatNumber(unit.value)}
                  </TimeNumber>
                  <TimeLabel>{unit.label}</TimeLabel>
                </TimeBox>
              </Grid>
            ))}
          </Grid>
        </Stack>
      </Container>
    </StyledRoot>
  );
}