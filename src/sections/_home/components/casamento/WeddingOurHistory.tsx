import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Container, Typography, Grid, Divider } from '@mui/material';
import Image from 'src/components/image';
import { keyframes } from '@emotion/react';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const StyledRoot = styled('div')(({ theme }) => ({
  padding: theme.spacing(10, 2),
  backgroundColor: theme.palette.background.neutral,
  position: 'relative',
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
  transition: 'transform 0.3s ease',
  animation: `${fadeIn} 0.8s ease-out forwards`,
  '&:hover': {
    transform: 'translateY(-10px)',
  },
}));

const TextContent = styled(Box)(({ theme }) => ({
  animation: `${fadeIn} 1s ease-out forwards`,
  textAlign: 'justify',
  '& p': {
    marginBottom: theme.spacing(2),
    lineHeight: 1.8,
    color: theme.palette.text.secondary,
  },
}));

export default function WeddingOurHistory() {
  return (
    <StyledRoot>
      <Container>
        <StyledContent>
          <Title variant="h3">O Casal</Title>

          <Grid container spacing={4} alignItems="center">
            <Grid
              item
              container
              xs={12}
              md={6}
              spacing={2}
              sx={{ display: 'flex', justifyContent: 'center' }}
            >
              <Grid item xs={5.5}>
                <ImageBox>
                  <Image
                    alt="Eloan e Bruna"
                    src="/assets/casamento/amor_left.jpeg"
                    sx={{
                      width: '100%',
                      height: 300,
                      objectFit: 'cover',
                      borderRadius: 1,
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
                      height: 300,
                      objectFit: 'cover',
                      borderRadius: 1,
                    }}
                  />
                </ImageBox>
              </Grid>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextContent>
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
