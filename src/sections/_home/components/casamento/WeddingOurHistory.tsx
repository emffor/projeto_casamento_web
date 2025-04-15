/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Container, Typography, Grid, Button, Divider } from '@mui/material';
import Image from 'src/components/image';
import { keyframes } from '@emotion/react';
import { Icon } from '@iconify/react';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const heartbeat = keyframes`
  0% { transform: scale(1); }
  25% { transform: scale(1.1); }
  40% { transform: scale(1); }
  60% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const StyledRoot = styled('div')(({ theme }) => ({
  padding: theme.spacing(10, 2),
  backgroundColor: theme.palette.background.neutral,
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    // height: '5px',
    // background: `linear-gradient(to right, ${theme.palette.primary.light}, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
  },
}));

const StyledContent = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  maxWidth: 1200,
  margin: '0 auto',
}));

const Title = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(4),
  fontWeight: 500,
  position: 'relative',
  display: 'inline-block',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: -10,
    left: '50%',
    transform: 'translateX(-50%)',
    width: '80px',
    height: '2px',
    backgroundColor: theme.palette.primary.light,
  },
}));

const ImageBox = styled(Box)(({ theme }) => ({
  margin: theme.spacing(2, 0),
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
  boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
  transition: 'all 0.3s ease',
  animation: `${fadeIn} 0.8s ease-out forwards`,
  position: 'relative',
  '&:hover': {
    transform: 'translateY(-10px)',
    boxShadow: '0 15px 35px rgba(0,0,0,0.15)',
  },
}));

const TextContent = styled(Box)(({ theme }) => ({
  animation: `${fadeIn} 1s ease-out forwards`,
  textAlign: 'justify',
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
  '& p': {
    marginBottom: theme.spacing(2),
    lineHeight: 1.8,
    color: theme.palette.text.secondary,
  },
}));

const HeartIcon = styled(Box)(({ theme }) => ({
  color: theme.palette.error.main,
  position: 'absolute',
  animation: `${heartbeat} 2s infinite`,
  zIndex: 2,
  opacity: 0.8,
}));

const FloatingElement = styled(Box)(({ theme }) => ({
  position: 'absolute',
  animation: `${float} 6s ease-in-out infinite`,
  opacity: 0.1,
  zIndex: 0,
  color: theme.palette.primary.main,
}));

export default function WeddingOurHistory() {
  return (
    <StyledRoot>
      {/* Elementos decorativos flutuantes */}
      <FloatingElement sx={{ top: '10%', left: '5%', fontSize: '4rem' }}>
        <Icon icon="mdi:heart" width={64} />
      </FloatingElement>
      <FloatingElement sx={{ top: '30%', right: '8%', fontSize: '3rem' }}>
        <Icon icon="mdi:flower" width={48} />
      </FloatingElement>
      <FloatingElement sx={{ bottom: '15%', left: '15%', fontSize: '3.5rem' }}>
        <Icon icon="mdi:ring" width={56} />
      </FloatingElement>

      <Container>
        <StyledContent>
          <Title variant="h3">Nossa História</Title>

          <Grid container spacing={5} alignItems="center">
            <Grid
              item
              container
              xs={12}
              md={6}
              spacing={3}
              sx={{ display: 'flex', justifyContent: 'center' }}
            >
              <Grid item xs={5.5}>
                <ImageBox>
                  <HeartIcon sx={{ top: 10, right: 10 }}>
                    <Icon icon="mdi:heart" width={32} />
                  </HeartIcon>
                  <Image
                    alt="Eloan e Bruna"
                    src="/assets/casamento/amor_left.jpeg"
                    sx={{
                      width: '100%',
                      height: 340,
                      objectFit: 'cover',
                      borderRadius: 1,
                      transition: 'transform 0.5s ease',
                      '&:hover': {
                        transform: 'scale(1.05)',
                      },
                    }}
                  />
                </ImageBox>
              </Grid>
              <Grid item xs={5.5}>
                <ImageBox>
                  <Image
                    alt="Eloan e Bruna"
                    src="/assets/casamento/amor_right.jpeg"
                    sx={{
                      width: '100%',
                      height: 340,
                      objectFit: 'cover',
                      borderRadius: 1,
                      transition: 'transform 0.5s ease',
                      '&:hover': {
                        transform: 'scale(1.05)',
                      },
                    }}
                  />
                </ImageBox>
              </Grid>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextContent>
                <Typography variant="h5" color="primary.main" gutterBottom sx={{ fontWeight: 500 }}>
                  O Nosso Amor
                </Typography>

                <Typography variant="body1">
                  Histórias de amor existem e, às vezes, nem nós mesmos imaginamos que já estamos
                  juntos. Desde o brilho intenso e apaixonado dos nossos olhares nos fazem lembrar o
                  porquê de chegarmos até aqui sem sentir tanto o tempo passar...
                </Typography>

                <Typography variant="body1">
                  Vamos nos casar! Estamos preparando tudo com muito carinho para curtirmos cada
                  momento com nossos amigos e familiares queridos!
                </Typography>

                {/* <Divider sx={{ my: 3 }} /> */}

                {/* <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                  <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<Icon icon="mdi:calendar-heart" />}
                    sx={{
                      borderRadius: 20,
                      px: 3,
                      '&:hover': {
                        transform: 'translateY(-3px)',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                      },
                    }}
                  >
                    Ver mais fotos
                  </Button>
                </Box> */}
              </TextContent>
            </Grid>
          </Grid>
        </StyledContent>
      </Container>
    </StyledRoot>
  );
}
