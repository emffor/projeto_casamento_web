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
}));

const AnimatedImage = styled(Box)(({ theme }) => ({
  maxWidth: 450,
  marginLeft: 'auto',
  marginRight: 'auto',
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
  position: 'relative',
  animation: `${fadeIn} 1s ease-in-out, ${scaleUp} 1s ease-in-out`,
  opacity: 0,
  animationFillMode: 'forwards',
  borderRadius: theme.shape.borderRadius * 2,
  overflow: 'hidden',
  boxShadow: theme.shadows[10],
  border: `3px solid ${theme.palette.common.white}`,
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: theme.shadows[16],
  },
  [theme.breakpoints.up('md')]: {
    marginTop: theme.spacing(8),
  },
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
            <Image
              src="/assets/casamento/Foto-72.jpg"
              alt="Bruna e Eloan"
              sx={{
                width: '100%',
                height: 'auto',
                display: 'block',
                borderRadius: 'inherit',
              }}
            />
          </AnimatedImage>

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

          <AnimatedTypography
            variant="subtitle1"
            color="text.secondary"
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
