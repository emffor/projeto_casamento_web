/* eslint-disable react/no-unescaped-entities */
import { keyframes } from '@emotion/react';
import { Icon } from '@iconify/react';
import { Box, Container, Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useEffect, useRef } from 'react';
import Image from 'src/components/image';

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
  padding: theme.spacing(12, 2, 14, 2),
  background: `linear-gradient(to bottom, ${theme.palette.background.neutral}, ${theme.palette.background.paper})`,
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '3px',
    background: `linear-gradient(to right, transparent, ${theme.palette.primary.light}, transparent)`,
  },
}));

const StyledContent = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  maxWidth: 1200,
  margin: '0 auto',
}));

const Title = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(6),
  fontWeight: 600,
  position: 'relative',
  display: 'inline-block',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: -12,
    left: '50%',
    transform: 'translateX(-50%)',
    width: '60px',
    height: '3px',
    backgroundColor: theme.palette.primary.main,
    borderRadius: '3px',
  },
}));

const ImageBox = styled(Box)(({ theme }) => ({
  margin: theme.spacing(2, 0),
  borderRadius: '12px',
  overflow: 'hidden',
  boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
  transition: 'all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)',
  animation: `${fadeIn} 0.8s ease-out forwards`,
  position: 'relative',
  '&:hover': {
    transform: 'translateY(-12px) scale(1.02)',
    boxShadow: '0 20px 50px rgba(0,0,0,0.2)',
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(to top, rgba(0,0,0,0.2) 0%, transparent 40%)',
    zIndex: 1,
    opacity: 0.7,
    transition: 'opacity 0.3s ease',
  },
  '&:hover::before': {
    opacity: 0.4,
  },
}));

const TextContent = styled(Box)(({ theme }) => ({
  animation: `${fadeIn} 1s ease-out forwards`,
  textAlign: 'left',
  padding: theme.spacing(4, 4, 4, 5),
  backgroundColor: theme.palette.background.paper,
  borderRadius: '12px',
  boxShadow: '0 8px 25px rgba(0,0,0,0.06)',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 30,
    bottom: 30,
    left: 0,
    width: '4px',
    borderRadius: '4px',
    backgroundColor: theme.palette.primary.light,
  },
  '& p': {
    marginBottom: theme.spacing(2.5),
    lineHeight: 1.8,
    color: theme.palette.text.secondary,
    fontSize: '1.05rem',
  },
}));

const HeartIcon = styled(Box)(({ theme }) => ({
  color: theme.palette.error.main,
  position: 'absolute',
  animation: `${heartbeat} 2s infinite`,
  zIndex: 2,
  opacity: 0.9,
  filter: 'drop-shadow(0 2px 5px rgba(0,0,0,0.2))',
}));

const FloatingElement = styled(Box)(({ theme }) => ({
  position: 'absolute',
  animation: `${float} 6s ease-in-out infinite`,
  opacity: 0.08,
  zIndex: 0,
  color: theme.palette.primary.main,
  filter: 'blur(1px)',
}));

const ImageOverlay = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: theme.spacing(3),
  left: theme.spacing(3),
  right: theme.spacing(3),
  padding: theme.spacing(2),
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(5px)',
  borderRadius: '8px',
  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
  zIndex: 2,
  opacity: 0,
  transform: 'translateY(20px)',
  transition: 'all 0.4s ease',
  '.image-container:hover &': {
    opacity: 1,
    transform: 'translateY(0)',
  },
}));

export default function WeddingOurHistory() {
  const textContentRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
          }
        });
      },
      { threshold: 0.1 }
    );

    const currentRef = textContentRef.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <StyledRoot>
      {/* Elementos decorativos flutuantes */}
      <FloatingElement sx={{ top: '10%', left: '5%', fontSize: '4.5rem' }}>
        <Icon icon="mdi:heart" width={80} />
      </FloatingElement>
      <FloatingElement sx={{ top: '35%', right: '7%', fontSize: '3.5rem' }}>
        <Icon icon="mdi:flower-tulip" width={60} />
      </FloatingElement>
      <FloatingElement sx={{ bottom: '15%', left: '15%', fontSize: '4rem' }}>
        <Icon icon="mdi:ring" width={65} />
      </FloatingElement>
      <FloatingElement sx={{ bottom: '30%', right: '15%', fontSize: '3rem' }}>
        <Icon icon="mdi:flower-outline" width={50} />
      </FloatingElement>

      <Container>
        <StyledContent>
          <Title variant="h3" sx={{ fontFamily: 'Playfair Display, serif' }}>
            Nossa História
          </Title>

          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Box className="image-container" sx={{ position: 'relative', width: '100%' }}>
                <ImageBox sx={{ width: '100%' }}>
                  <HeartIcon sx={{ top: 20, right: 20 }}>
                    <Icon icon="mdi:cards-heart" width={36} />
                  </HeartIcon>
                  <Image
                    alt="Bruna e Eloan"
                    src="/assets/casamento/Foto-185.jpg"
                    sx={{
                      width: '100%',
                      height: { xs: 380, md: 480 },
                      objectFit: 'cover',
                      borderRadius: '12px',
                      transition: 'transform 0.7s ease',
                      '&:hover': {
                        transform: 'scale(1.08)',
                      },
                    }}
                  />
                </ImageBox>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextContent ref={textContentRef}>
                <Typography
                  variant="h4"
                  color="primary.main"
                  gutterBottom
                  sx={{
                    fontWeight: 600,
                    fontFamily: 'Playfair Display, serif',
                    mb: 3,
                    borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
                    pb: 2,
                  }}
                >
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
              </TextContent>
            </Grid>
          </Grid>
        </StyledContent>
      </Container>
    </StyledRoot>
  );
}
