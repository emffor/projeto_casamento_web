import React from 'react';
import { styled, keyframes } from '@mui/material/styles';
import { Box, Container, Typography, Stack } from '@mui/material';
import Image from 'src/components/image';

// Keyframes for animations
const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

const slideUp = keyframes`
  from { transform: translateY(20px); opacity: 0; }
  to   { transform: translateY(0);      opacity: 1; }
`;

const scaleUp = keyframes`
  from { transform: scale(0.8); opacity: 0; }
  to   { transform: scale(1);   opacity: 1; }
`;

// Root container
const StyledRoot = styled('section')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  backgroundColor: theme.palette.grey[100],
  padding: theme.spacing(5, 0),
}));

// Animated wrapper for the image
const AnimatedImage = styled(Box)(({ theme }) => ({
  maxWidth: 450,
  margin: theme.spacing(3, 'auto'),
  position: 'relative',
  animation: `${fadeIn} 1s ease-in-out, ${scaleUp} 1s ease-in-out`,
  opacity: 0,
  animationFillMode: 'forwards',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': { transform: 'scale(1.05)' },
}));

// A reusable animated typography component
interface AnimatedTypographyProps {
  delay?: number;
}
const AnimatedTypography = styled(
  ({ delay, ...other }: AnimatedTypographyProps & React.ComponentProps<typeof Typography>) => (
    <Typography {...other} />
  )
)(({ theme, delay = 0 }) => ({
  opacity: 0,
  animation: `${fadeIn} 1s ease-in-out ${delay}s, ${slideUp} 1s ease-in-out ${delay}s`,
  animationFillMode: 'forwards',
}));

export default function HomeHero() {
  return (
    <StyledRoot>
      <Container maxWidth="md">
        <Stack spacing={4} alignItems="center" textAlign="center">
          {/* Hero Image */}
          <AnimatedImage>
            <Image
              src="/assets/casamento/foto_capa5.png"
              alt="Bruna e Eloan"
              sx={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </AnimatedImage>

          {/* Names: Unified into a single row */}
          <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
            <AnimatedTypography
              variant="h2"
              color="primary.dark"
              fontWeight={500}
              letterSpacing={1}
              delay={0.5}
            >
              Bruna
            </AnimatedTypography>

            <AnimatedTypography
              variant="h2"
              color="primary.light"
              fontWeight={500}
              letterSpacing={1}
              delay={0.5}
            >
              +
            </AnimatedTypography>

            <AnimatedTypography
              variant="h2"
              color="primary.dark"
              fontWeight={500}
              letterSpacing={1}
              delay={0.5}
            >
              Eloan
            </AnimatedTypography>
          </Stack>

          {/* Date */}
          <AnimatedTypography
            variant="subtitle1"
            color="textSecondary"
            letterSpacing={2}
            fontWeight={500}
            textTransform="uppercase"
            delay={1}
          >
            31 de Maio de 2025
          </AnimatedTypography>
        </Stack>
      </Container>
    </StyledRoot>
  );
}
