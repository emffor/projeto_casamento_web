import { Button, Container, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { m } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';

import { MotionContainer, varFade } from 'src/components/animate';
import Iconify from 'src/components/iconify';

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  textAlign: 'center',
  padding: theme.spacing(3, 0),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: '30px',
  padding: theme.spacing(1, 4),
  transition: 'all 0.3s',
  fontWeight: 500,
  textTransform: 'none',
  fontSize: '1rem',
  boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 15px rgba(0,0,0,0.15)',
  },
  marginTop: theme.spacing(5),
}));

export default function FailureView() {
  return (
    <Container component={MotionContainer}>
      <StyledContent>
        <m.div variants={varFade().inUp}>
          <Iconify
            icon="eva:close-circle-outline"
            width={120}
            height={120}
            sx={{ color: 'error.main', mb: 3 }}
          />
        </m.div>

        <m.div variants={varFade().inUp}>
          <Typography
            variant="h3"
            paragraph
            sx={{ fontFamily: 'Barlow, sans-serif', color: 'text.primary' }}
          >
            Pagamento não realizado
          </Typography>
        </m.div>

        <m.div variants={varFade().inUp}>
          <Typography sx={{ color: 'text.secondary' }}>
            O pagamento foi cancelado ou ocorreu um erro durante o processo.
          </Typography>
        </m.div>

        <m.div variants={varFade().inUp}>
          <RouterLink to="/" style={{ textDecoration: 'none' }}>
            <StyledButton size="large" variant="contained" color="primary">
              Voltar ao Início
            </StyledButton>
          </RouterLink>
        </m.div>
      </StyledContent>
    </Container>
  );
}
