import { Box, Container, Stack, Typography } from '@mui/material';
import { keyframes, styled } from '@mui/material/styles';
import React from 'react';
import Image from 'src/components/image';

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

const StyledRoot = styled('section')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  backgroundColor: theme.palette.grey[100],
  padding: theme.spacing(5, 0),
  marginTop: theme.spacing(2), //
  [theme.breakpoints.up('md')]: {
    marginTop: theme.spacing(10),
  },
}));

const AnimatedImage = styled(Box)(({ theme }) => ({
  maxWidth: 450,
  margin: theme.spacing(3, 'auto'),
  position: 'relative',
  animation: `${fadeIn} 1s ease-in-out, ${scaleUp} 1s ease-in-out`,
  opacity: 0,
  animationFillMode: 'forwards',
  transition: 'transform 0.3s, box-shadow 0.3s, border-color 0.3s',
  borderRadius: theme.spacing(3),
  overflow: 'hidden',
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
  border: `4px solid ${theme.palette.primary.contrastText}`,
}));

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
          <AnimatedImage>
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(135deg, rgba(255,255,255,0.10) 0%, rgba(255,192,203,0.15) 100%)',
                zIndex: 1,
                pointerEvents: 'none',
              }}
            />
            <Image
              src="/assets/casamento/Foto-72.jpg"
              alt="Bruna e Eloan"
              sx={{
                width: '100%',
                height: 'auto',
                display: 'block',
                position: 'relative',
                zIndex: 2,
              }}
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
