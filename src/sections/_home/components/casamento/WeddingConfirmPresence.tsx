import React, { useState, ChangeEvent, FormEvent } from 'react';
import { styled } from '@mui/material/styles';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  Snackbar,
  Alert,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  SelectChangeEvent,
} from '@mui/material';
import { keyframes } from '@emotion/react';

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Styled components
const StyledRoot = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  position: 'relative',
}));

const StyledContent = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  maxWidth: 900,
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

const StyledForm = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
  animation: `${fadeIn} 0.8s ease-out forwards`,
  maxWidth: 600,
  margin: '0 auto',
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  padding: theme.spacing(1, 4),
}));

interface FormData {
  name: string;
  email: string;
  phone: string;
  guests: number;
  message: string;
}

interface AlertState {
  open: boolean;
  message: string;
  severity: 'success' | 'error' | 'info' | 'warning';
}

const WeddingConfirmPresence: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    guests: 1,
    message: '',
  });

  const [alert, setAlert] = useState<AlertState>({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSelectChange = (e: SelectChangeEvent<number>): void => {
    setFormData((prevState) => ({
      ...prevState,
      guests: e.target.value as number,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    try {
      // Aqui entraria a lógica de envio para API
      // const response = await fetch('/api/confirm-presence', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });

      // if (!response.ok) throw new Error('Falha ao confirmar presença');

      // Simular sucesso
      setAlert({
        open: true,
        message: 'Presença confirmada com sucesso!',
        severity: 'success',
      });

      setFormData({
        name: '',
        email: '',
        phone: '',
        guests: 1,
        message: '',
      });
    } catch (error) {
      setAlert({
        open: true,
        message: 'Erro ao confirmar presença. Tente novamente.',
        severity: 'error',
      });
    }
  };

  const handleCloseAlert = (): void => {
    setAlert((prev) => ({ ...prev, open: false }));
  };

  return (
    <StyledRoot>
      <Container>
        <StyledContent>
          <Title variant="h3">Confirme sua Presença</Title>

          {/* <Typography variant="body1" sx={{ mb: 4 }}>
            Confirme sua presença e compartilhe este momento especial conosco. Preencha o formulário
            abaixo para garantir seu lugar na nossa celebração.
          </Typography> */}

          <StyledForm elevation={3}>
            <form onSubmit={handleSubmit}>
              <StyledTextField
                fullWidth
                label="Nome completo"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                variant="outlined"
              />

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <StyledTextField
                    fullWidth
                    label="E-mail"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    variant="outlined"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <StyledTextField
                    fullWidth
                    label="Telefone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    variant="outlined"
                  />
                </Grid>
              </Grid>

              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel id="guests-label">Número de convidados</InputLabel>
                <Select
                  labelId="guests-label"
                  name="guests"
                  value={formData.guests}
                  onChange={handleSelectChange}
                  label="Número de convidados"
                  required
                >
                  {[1, 2, 3, 4, 5].map((num) => (
                    <MenuItem key={num} value={num}>
                      {num}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <StyledTextField
                fullWidth
                label="Mensagem aos noivos (opcional)"
                name="message"
                value={formData.message}
                onChange={handleChange}
                multiline
                rows={3}
                variant="outlined"
              />

              <StyledButton
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                size="large"
              >
                Confirmar Presença
              </StyledButton>
            </form>
          </StyledForm>

          <Snackbar
            open={alert.open}
            autoHideDuration={6000}
            onClose={handleCloseAlert}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          >
            <Alert onClose={handleCloseAlert} severity={alert.severity} variant="filled">
              {alert.message}
            </Alert>
          </Snackbar>
        </StyledContent>
      </Container>
    </StyledRoot>
  );
};

export default WeddingConfirmPresence;
