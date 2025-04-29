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

const ImageContainer = styled(Box)(({ theme }) => ({
  borderRadius: '12px',
  overflow: 'hidden',
  boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
  transition: 'transform 0.4s ease, box-shadow 0.4s ease',
  width: '100%',
  aspectRatio: '3 / 4',
  backgroundColor: theme.palette.grey[200],
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 15px 40px rgba(0,0,0,0.15)',
  },
}));

const TextContent = styled(Box)(({ theme }) => ({
  textAlign: 'left',
  padding: theme.spacing(3),
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
              <ImageContainer>
                <Image
                  alt="Nossa História - Bruna e Eloan"
                  src="/assets/casamento/Foto-185.jpg"
                  sx={{
                    display: 'block',
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </ImageContainer>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextContent>
                <Typography
                  variant="body1"
                  sx={{ mb: 2, lineHeight: 1.7, color: 'text.secondary', fontSize: '1rem' }}
                >
                  Nos conhecemos em 2008 e, desde o início, construímos uma amizade especial. A vida
                  acabou nos afastando por alguns anos, mas no fim de 2020, uma simples mensagem
                  pelas redes sociais reacendeu o contato — e parecia que o tempo nunca tivesse
                  passado.
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ mb: 2, lineHeight: 1.7, color: 'text.secondary', fontSize: '1rem' }}
                >
                  No dia 24 de fevereiro de 2021, marcamos um café. Desde então, não nos separamos
                  mais.
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ mb: 2, lineHeight: 1.7, color: 'text.secondary', fontSize: '1rem' }}
                >
                  Jamais imaginamos que aquela amizade se transformaria em amor e nos traria até
                  aqui, prestes a formar uma família. Mas hoje sabemos: Deus já havia preparado tudo
                  com carinho.
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ lineHeight: 1.7, color: 'text.secondary', fontSize: '1rem' }}
                >
                  Estamos felizes, gratos e prontos para nos escolhermos todos os dias.
                </Typography>
              </TextContent>
            </Grid>
          </Grid>
        </ContentWrapper>
      </Container>
    </StyledRoot>
  );
}
