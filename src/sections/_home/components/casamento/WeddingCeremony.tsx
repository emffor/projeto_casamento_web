import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Container, Typography } from '@mui/material';
import Image from 'src/components/image';
import { keyframes } from '@emotion/react';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const StyledRoot = styled('div')(({ theme }) => ({
  padding: theme.spacing(8, 2),
  backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled(Box)({
  textAlign: 'center',
  justifyItems: 'center',
  maxWidth: 1000,
  margin: '0 auto',
});

const LeafIcon = styled('img')({
  width: 100,
  marginBottom: 16,
});

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

const TextContent = styled(Box)(({ theme }) => ({
  animation: `${fadeIn} 1s ease-out forwards`,
  maxWidth: 800,
  margin: '0 auto',
  marginTop: theme.spacing(4),
  '& p': {
    color: theme.palette.text.secondary,
    lineHeight: 1.7,
  },
}));

export default function WeddingCeremony() {
  return (
    <StyledRoot>
      <Container>
        <StyledContent>
          <LeafIcon src="/assets/casamento/cerimonia2.png" alt="Decoração" />
          <Title variant="h3">Cerimônia</Title>

          <Image
            alt="Cerimônia de Casamento"
            src="/assets/casamento/igrejapiamarta.png"
            ratio="21/9"
            sx={{ borderRadius: 1 }}
          />

          <TextContent>
            <Typography variant="body1">
              Gostaríamos muito de contar com a presença de todos vocês no momento em que nossa
              união será abençoada diante de Deus. A cerimônia será realizada na Capela Nossa
              Senhora da Assunção do Piamarta. Seremos extremamente pontuais e contamos com sua
              participação neste momento especial. Dia 31 de maio de 2025, às 19h. Centro
              Educacional da Juventude Padre João Piamarta - Avenida Aguanambi, 2479, Bairro
              Aeroporto, Fortaleza - CE, 60415-390
            </Typography>
          </TextContent>
        </StyledContent>
      </Container>
    </StyledRoot>
  );
}
