import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Stack, Container, Typography } from '@mui/material';
import Image from 'src/components/image';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  backgroundColor: theme.palette.background.default,
  padding: theme.spacing(5, 0),
}));

const ImageContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  border: '1px solid #e0e0e0',
  borderRadius: '50%',
  maxWidth: 300,
  margin: theme.spacing(3, 'auto'),
  position: 'relative',
}));

// ----------------------------------------------------------------------

export default function HomeHero() {
  return (
    <StyledRoot>
      <Container maxWidth="sm">
        <Stack
          spacing={2}
          alignItems="center"
          textAlign="center"
        >
          <Typography variant="h4" component="h1">
            Eloan + Bruna
          </Typography>

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

          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            18 DE JULHO DE 2025
          </Typography>

        </Stack>
      </Container>
    </StyledRoot>
  );
}