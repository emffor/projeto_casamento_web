import React, { useState, useEffect, useMemo } from 'react';
import { styled } from '@mui/material/styles';
import { Stack, Container, Typography, Paper, Grid, Box } from '@mui/material';
import { keyframes } from '@emotion/react';

const WEDDING_DATE = process.env.REACT_APP_WEDDING_DATE;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const StyledRoot = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  padding: theme.spacing(6, 2),
  backgroundImage: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)',
  animation: `${fadeIn} 1s ease-out`,
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(8, 0),
  },
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(10, 0),
  },
}));

const TimeBox = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1.5),
  textAlign: 'center',
  backgroundColor: theme.palette.common.white,
  borderRadius: theme.shape.borderRadius,
  minWidth: 65,
  boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 15px 35px rgba(0,0,0,0.2)',
  },
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(2),
    minWidth: 80,
  },
}));

const TimeNumber = styled(Typography)(({ theme }) => ({
  fontSize: '2rem',
  fontWeight: theme.typography.fontWeightBold,
  lineHeight: 1.2,
  color: theme.palette.primary.main,
  [theme.breakpoints.up('sm')]: {
    fontSize: '2.5rem',
  },
}));

const TimeLabel = styled(Typography)(({ theme }) => ({
  fontSize: '0.7rem',
  fontWeight: theme.typography.fontWeightMedium,
  textTransform: 'uppercase',
  color: theme.palette.text.secondary,
  letterSpacing: 0.5,
  [theme.breakpoints.up('sm')]: {
    fontSize: '0.75rem',
    letterSpacing: 1,
  },
}));

const AnimatedTitle = styled(Typography)`
  color: ${({ theme }) => theme.palette.common.white};
  text-align: center;
  font-size: 1.8rem;
  margin-bottom: ${({ theme }) => theme.spacing(4)};
  font-weight: 600;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  position: relative;
  display: inline-block;
  ${({ theme }) => theme.breakpoints.up('sm')} {
    font-size: 2.5rem;
  }
  ${({ theme }) => theme.breakpoints.up('md')} {
    font-size: 3rem;
  }
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 2px;
    background-color: ${({ theme }) => theme.palette.common.white};
  }
`;

const HeartIcon = styled(Box)(({ theme }) => ({
  fontSize: '2rem',
  color: theme.palette.error.light,
  animation: `${pulse} 2s infinite ease-in-out`,
  marginBottom: theme.spacing(2),
  display: 'inline-block',
}));

// Tipos
interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface TimeUnitProps {
  value: number;
  label: string;
  format: boolean;
}

const TimeUnit: React.FC<TimeUnitProps> = ({ value, label, format }) => (
  <TimeBox elevation={3}>
    <TimeNumber>{format ? value.toString().padStart(2, '0') : value}</TimeNumber>
    <TimeLabel>{label}</TimeLabel>
  </TimeBox>
);

export default function WeddingCountDownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const calculateTimeLeft = (): TimeLeft => {
    if (!WEDDING_DATE) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
    const difference = +new Date(WEDDING_DATE as string) - +new Date();
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

  const timeUnits = useMemo(
    () => [
      { value: timeLeft.days, label: 'Dias', format: false },
      { value: timeLeft.hours, label: 'Horas', format: true },
      { value: timeLeft.minutes, label: 'Minutos', format: true },
      { value: timeLeft.seconds, label: 'Segundos', format: true },
    ],
    [timeLeft]
  );

  const weddingDateFormatted = useMemo(() => {
    const date = new Date(WEDDING_DATE ?? '');
    return new Intl.DateTimeFormat('pt-BR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  }, []);

  return (
    <StyledRoot>
      <Container maxWidth="sm">
        <Stack spacing={3} alignItems="center">
          <Box textAlign="center">
            <HeartIcon>❤️</HeartIcon>
            <AnimatedTitle variant="h3">Contagem Regressiva</AnimatedTitle>
            <Typography
              variant="subtitle1"
              sx={{
                color: 'common.white',
                mb: 3,
                opacity: 0.9,
                fontWeight: 500,
              }}
            >
              {weddingDateFormatted}
            </Typography>
          </Box>

          <Grid container spacing={{ xs: 1, sm: 2, md: 3 }} justifyContent="center">
            {timeUnits.map((unit) => (
              <Grid item key={unit.label} xs={3} sm="auto">
                <TimeUnit value={unit.value} label={unit.label} format={unit.format} />
              </Grid>
            ))}
          </Grid>

          <Typography
            variant="body2"
            sx={{
              color: 'common.white',
              mt: 2,
              opacity: 0.8,
              fontStyle: 'italic',
            }}
          >
            Estamos ansiosos para celebrar este momento com você!
          </Typography>
        </Stack>
      </Container>
    </StyledRoot>
  );
}
