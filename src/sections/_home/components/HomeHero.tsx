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
  background: theme.palette.grey[100],
  padding: theme.spacing(5, 0),
}));

const ImageContainer = styled(Box)(({ theme }) => ({
  maxWidth: 450,
  margin: theme.spacing(3, 'auto'),
  position: 'relative',
  animation: `${fadeIn} 1s ease-in-out, ${scaleUp} 1s ease-in-out`,
  opacity: 0,
  animationFillMode: 'forwards',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

export default function HomeHero() {
  return (
    <StyledRoot>
      <Container maxWidth="md">
        <Stack spacing={2} alignItems="center" textAlign="center">
          <ImageContainer>
            <Image
              alt="Eloan e Bruna"
              src="/assets/casamento/foto_capa5.png"
              sx={{
                width: '100%',
                height: 'auto',
                display: 'block',
              }}
            />
          </ImageContainer>
          <Stack
            spacing={0}
            alignItems="center"
            sx={(theme) => ({
              animation: `${fadeIn} 1s ease-in-out 0.5s, ${slideUp} 1s ease-in-out 0.5s`,
              opacity: 0,
              animationFillMode: 'forwards',
              [theme.breakpoints.up('sm')]: {
                display: 'none',
              },
            })}
          >
            <Typography
              sx={(theme) => ({
                fontSize: 50,
                fontWeight: 400,
                color: theme.palette.primary.dark,
                lineHeight: 1.1,
              })}
              fontWeight={500}
              letterSpacing={1}
            >
              Eloan
            </Typography>
            <Typography
              sx={(theme) => ({
                fontSize: 50,
                fontWeight: 400,
                color: theme.palette.primary.light,
                lineHeight: 1.1,
              })}
              fontWeight={500}
              letterSpacing={1}
            >
              +
            </Typography>
            <Typography
              sx={(theme) => ({
                fontSize: 50,
                fontWeight: 400,
                color: theme.palette.primary.dark,
                lineHeight: 1.1,
              })}
              fontWeight={400}
              letterSpacing={1}
            >
              Bruna
            </Typography>
          </Stack>
          <Typography
            sx={(theme) => ({
              fontSize: { xs: 0, sm: 48, md: 64 },
              color: theme.palette.primary.dark,
              animation: `${fadeIn} 1s ease-in-out 0.5s, ${slideUp} 1s ease-in-out 0.5s`,
              opacity: 0,
              animationFillMode: 'forwards',
              display: 'none',
              [theme.breakpoints.up('sm')]: {
                display: 'block',
              },
            })}
            fontWeight={400}
            letterSpacing={1}
          >
            Eloan
            <Box
              component="span"
              sx={(theme) => ({
                color: theme.palette.primary.light,
                marginX: theme.spacing(2),
                fontWeight: 400,
              })}
            >
              +
            </Box>
            Bruna
          </Typography>

          <Typography
            sx={(theme) => ({
              fontSize: { xs: 20, sm: 20, md: 24 },
              color: theme.palette.grey[600],
              textTransform: 'uppercase',
              animation: `${fadeIn} 1s ease-in-out 1s, ${slideUp} 1s ease-in-out 1s`,
              opacity: 0,
              animationFillMode: 'forwards',
              fontWeight: 500,
              letterSpacing: 1,
            })}
          >
            31 DE MAIO DE 2025
          </Typography>
        </Stack>
      </Container>
    </StyledRoot>
  );
}
