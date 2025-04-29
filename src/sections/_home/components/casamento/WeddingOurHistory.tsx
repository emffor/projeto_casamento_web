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
                    // height: { xs: 350, md: 450 },
                    height: 'auto',
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
                    lineHeight: 1.5,
                    color: 'text.secondary',
                    fontSize: '1rem',
                  }}
                >
                  Histórias de amor realmente existem. Muitas vezes, estão mais próximas do que
                  imaginamos e mais entrelaçadas do que jamais poderíamos prever. A nossa história
                  não foi diferente. Desde o instante em que trocamos o primeiro olhar, sentimos uma
                  conexão inexplicável, profunda e intensa. Foi como se naquele breve segundo todo o
                  universo conspirasse para unir nossos caminhos, marcando o início de uma linda
                  jornada a dois. O brilho apaixonado daquele momento especial permanece vivo em nós
                  até hoje, iluminando nossos dias e reafirmando constantemente o motivo pelo qual
                  decidimos caminhar lado a lado. Cada sorriso trocado, cada desafio superado e cada
                  conquista celebrada juntos fortaleceu ainda mais esse amor que cresceu e
                  amadureceu com o passar do tempo.
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    lineHeight: 1.5,
                    color: 'text.secondary',
                    fontSize: '1rem',
                  }}
                >
                  E agora, com o coração cheio de alegria e ansiedade, finalmente vamos oficializar
                  essa união! O grande dia está chegando, e estamos preparando cada detalhe com um
                  carinho imenso, cuidado especial e muita dedicação. Queremos que essa celebração
                  seja inesquecível não apenas para nós, mas para todos aqueles que fazem parte da
                  nossa história. Mal podemos esperar para vivenciar e curtir intensamente cada
                  instante deste momento mágico ao lado das pessoas que amamos tanto. Amigos e
                  familiares queridos, vocês são parte essencial desta celebração, e é com enorme
                  felicidade que contamos os minutos para compartilhar toda essa emoção, amor e
                  gratidão ao lado de vocês!
                </Typography>
              </TextContent>
            </Grid>
          </Grid>
        </ContentWrapper>
      </Container>
    </StyledRoot>
  );
}
