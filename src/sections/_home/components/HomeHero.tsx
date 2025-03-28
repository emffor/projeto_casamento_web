import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Stack, Container, Typography } from '@mui/material';
import Image from 'src/components/image';
import { keyframes } from '@emotion/react';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideUp = keyframes`
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const scaleUp = keyframes`
  from {
    transform: scale(0.8);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
`;

const StyledRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  background: `${theme.palette.grey[100]}`,
  padding: theme.spacing(5, 0),
}));

const ImageContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1),
  borderRadius: '50%',
  maxWidth: 300,
  margin: theme.spacing(3, 'auto'),
  position: 'relative',
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[2],
  animation: `${fadeIn} 1s ease-in-out, ${scaleUp} 1s ease-in-out`,
  opacity: 0,
  animationFillMode: 'forwards',
  transition: 'transform 0.3s ease-in-out',
  border: `4px solid ${theme.palette.primary.light}`, 
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

export default function HomeHero() {
  return (
    <StyledRoot>
      <Container maxWidth="md">
        <Stack spacing={2} alignItems="center" textAlign="center">
          {/* Imagem */}
          <ImageContainer>
            <Image
              alt="Eloan e Bruna"
              src="/assets/casamento/selfie-praia.jpeg"
              sx={{
                width: '100%',
                height: 'auto',
                borderRadius: '50%',
                display: 'block',
              }}
            />
          </ImageContainer>

          {/* Título */}
          <Typography
            sx={(theme) => ({
              color: theme.palette.grey[600], 
              animation: `${fadeIn} 1s ease-in-out 0.5s, ${slideUp} 1s ease-in-out 0.5s`,
              opacity: 0,
              animationFillMode: 'forwards', })}
              fontSize={64} 
              fontWeight={500}
              letterSpacing={1}
          >
            Eloan + Bruna
          </Typography>

          {/* Data */}
            <Typography
            sx={(theme) => ({
              color: theme.palette.grey[600],
              textTransform: 'uppercase',
              animation: `${fadeIn} 1s ease-in-out 1s, ${slideUp} 1s ease-in-out 1s`,
              opacity: 0,
              animationFillMode: 'forwards',
              fontSize: 24,
              fontWeight: 500,
              letterSpacing: 1,
            })}
            >
            18 DE JULHO DE 2025
            </Typography>
        </Stack>
      </Container>
    </StyledRoot>
  );
}