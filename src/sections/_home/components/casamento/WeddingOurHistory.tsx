import { keyframes } from '@emotion/react';
import { Box, Container, Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Image from 'src/components/image';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const StyledRoot = styled('div')(({ theme }) => ({
  padding: theme.spacing(10, 2),
  backgroundColor: theme.palette.background.paper,
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '5px',
  },
}));

const ContentWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  zIndex: 1,
  textAlign: 'center',
  maxWidth: 900,
  margin: '0 auto',
  animation: `${fadeIn} 1.2s ease-out`,
}));

const Title = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(4),
  fontWeight: 600,
  position: 'relative',
  display: 'inline-block',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: -10,
    left: '50%',
    transform: 'translateX(-50%)',
    width: '80px',
    height: '3px',
    backgroundColor: theme.palette.primary.light,
  },
}));

const ImageBox = styled(Box)(({ theme }) => ({
  borderRadius: '12px',
  overflow: 'hidden',
  boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
  transition: 'transform 0.4s ease, box-shadow 0.4s ease',
  position: 'relative',
  width: '100%',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 15px 40px rgba(0,0,0,0.15)',
  },
}));

const TextContent = styled(Box)(({ theme }) => ({
  textAlign: 'left',
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
}));

export default function WeddingOurHistory() {
  return (
    <StyledRoot>
      <Container>
        <ContentWrapper>
          <Title variant="h3">Nossa História</Title>

          <Grid container spacing={5} alignItems="center" sx={{ mt: 4 }}>
            <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
              <ImageBox>
                <Image
                  alt="Nossa História - Bruna e Eloan"
                  src="/assets/casamento/Foto-185.jpg"
                  sx={{
                    width: '100%',
                    height: { xs: 350, md: 450 },
                    objectFit: 'cover',
                    display: 'block',
                    borderRadius: '12px',
                  }}
                />
              </ImageBox>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextContent>
                <Typography
                  variant="h5"
                  color="primary.dark"
                  gutterBottom
                  sx={{ fontWeight: 500, mb: 2 }}
                >
                  Como Tudo Começou
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    mb: 2,
                    lineHeight: 1.7,
                    color: 'text.secondary',
                    fontSize: '1rem',
                  }}
                >
                  Histórias de amor existem e, às vezes, nem nós mesmos imaginamos o quão
                  entrelaçadas elas já estão. Desde o primeiro olhar, um brilho intenso e apaixonado
                  nos conectou, e é essa chama que nos lembra o porquê de chegarmos até aqui, com a
                  sensação de que o tempo voou...
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    lineHeight: 1.7,
                    color: 'text.secondary',
                    fontSize: '1rem',
                  }}
                >
                  Agora, vamos nos casar! Estamos preparando cada detalhe com imenso carinho para
                  celebrar e curtir cada momento precioso ao lado de nossos amigos e familiares
                  queridos!
                </Typography>
              </TextContent>
            </Grid>
          </Grid>
        </ContentWrapper>
      </Container>
    </StyledRoot>
  );
}
