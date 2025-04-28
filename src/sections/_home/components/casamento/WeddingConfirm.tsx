import { keyframes } from '@emotion/react';
import {
  Box,
  Button,
  Checkbox,
  Container,
  Dialog,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useCallback, useState } from 'react';
import Iconify from 'src/components/iconify';
import { HEADER } from 'src/config-global';

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
  maxWidth: 800,
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

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: '30px',
  padding: theme.spacing(1, 4),
  transition: 'all 0.3s',
  fontWeight: 500,
  boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
  textTransform: 'none',
  fontSize: '1rem',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 15px rgba(0,0,0,0.15)',
  },
}));

const ModalContent = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  maxWidth: '95vw',
  maxHeight: '90vh',
  overflow: 'auto',
}));

const ModalTitle = styled(Typography)(({ theme }) => ({
  position: 'relative',
  paddingBottom: theme.spacing(2),
  marginBottom: theme.spacing(3),
  fontWeight: 500,
  textAlign: 'center',
}));

export default function WeddingConfirm() {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    guests: 1,
    willAttend: true,
  });
  const [submitted, setSubmitted] = useState(false);

  const scrollToSection = useCallback(
    (sectionId: string) => {
      const element = document.getElementById(sectionId);
      if (element) {
        const headerOffset = isMdUp ? HEADER.H_MAIN_DESKTOP : HEADER.H_MOBILE;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    },
    [isMdUp]
  );

  const handleCloseModal = () => {
    setOpenModal(false);
    if (submitted) setSubmitted(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const { checked } = e.target as HTMLInputElement;
    const { type } = e.target;

    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSubmitted(true);
  };

  return (
    <StyledRoot>
      <Container>
        <ContentWrapper>
          <Title variant="h3">Nosso Grande Dia</Title>

          <Typography
            variant="body1"
            sx={{
              mb: 3,
              lineHeight: 1.8,
              color: 'text.secondary',
              fontSize: '1.1rem',
            }}
          >
            Criamos esse site para compartilhar com vocês os detalhes da organização do nosso
            casamento. Estamos muito felizes e contamos com a presença de todos no nosso grande dia!
          </Typography>

          <Grid container spacing={4} justifyContent="center" sx={{ mb: 5 }}>
            <Grid item xs={12} sm={4} sx={{ textAlign: 'center' }}>
              <Iconify
                icon="eva:calendar-fill"
                color="primary"
                width={40}
                height={40}
                sx={{ mb: 1 }}
              />
              <Typography variant="h6" sx={{ mb: 1, fontWeight: 500 }}>
                31 de Maio de 2025
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Marque em sua agenda
              </Typography>
            </Grid>

            <Grid item xs={12} sm={4} sx={{ textAlign: 'center' }}>
              <Iconify
                icon="eva:heart-fill"
                color="primary"
                width={40}
                height={40}
                sx={{ mb: 1 }}
              />
              <Typography variant="h6" sx={{ mb: 1, fontWeight: 500 }}>
                Celebração de Amor
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Um momento especial
              </Typography>
            </Grid>

            <Grid item xs={12} sm={4} sx={{ textAlign: 'center' }}>
              <Iconify
                icon="eva:people-fill"
                color="primary"
                width={40}
                height={40}
                sx={{ mb: 1 }}
              />
              <Typography variant="h6" sx={{ mb: 1, fontWeight: 500 }}>
                Confirme sua Presença
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Sua presença é importante
              </Typography>
            </Grid>
          </Grid>

          <Typography
            variant="h5"
            sx={{
              my: 4,
              color: 'primary.dark',
              fontWeight: 400,
            }}
          >
            É importante confirmar sua presença!
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
            <StyledButton
              variant="contained"
              color="primary"
              onClick={() => scrollToSection('confirmar-presenca')}
              startIcon={<Iconify icon="eva:people-fill" />}
            >
              Confirmar Presença
            </StyledButton>

            <StyledButton
              variant="outlined"
              color="primary"
              startIcon={<Iconify icon="eva:gift-fill" />}
              onClick={() => scrollToSection('presentes')}
            >
              Lista de Presentes
            </StyledButton>
          </Box>
        </ContentWrapper>
      </Container>

      <Dialog open={openModal} onClose={handleCloseModal} maxWidth="sm" fullWidth>
        <ModalContent>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button onClick={handleCloseModal} color="inherit" sx={{ minWidth: 'auto' }}>
              <Iconify icon="eva:close-fill" width={24} />
            </Button>
          </Box>

          {!submitted ? (
            <>
              <ModalTitle variant="h5">
                Confirmação de Presença
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '50px',
                    height: '2px',
                    backgroundColor: 'primary.main',
                  }}
                />
              </ModalTitle>

              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Nome completo"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      variant="outlined"
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      variant="outlined"
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Telefone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      variant="outlined"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Número de convidados"
                      name="guests"
                      type="number"
                      InputProps={{ inputProps: { min: 1, max: 5 } }}
                      value={formData.guests}
                      onChange={handleChange}
                      required
                      variant="outlined"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formData.willAttend}
                          onChange={handleChange}
                          name="willAttend"
                          color="primary"
                        />
                      }
                      label="Confirmo minha presença no evento"
                    />
                  </Grid>

                  <Grid item xs={12} sx={{ mt: 2, textAlign: 'center' }}>
                    <StyledButton
                      type="submit"
                      variant="contained"
                      color="primary"
                      size="large"
                      fullWidth
                    >
                      Confirmar
                    </StyledButton>
                  </Grid>
                </Grid>
              </form>
            </>
          ) : (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Iconify
                icon="eva:checkmark-circle-2-fill"
                color="primary"
                width={60}
                height={60}
                sx={{ mb: 2 }}
              />
              <Typography variant="h5" sx={{ mb: 2, color: 'primary.main' }}>
                Obrigado pela confirmação!
              </Typography>
              <Typography variant="body1" sx={{ mb: 3 }}>
                Estamos ansiosos para celebrar esse momento especial com você.
              </Typography>
              <StyledButton variant="contained" color="primary" onClick={handleCloseModal}>
                Fechar
              </StyledButton>
            </Box>
          )}
        </ModalContent>
      </Dialog>
    </StyledRoot>
  );
}
