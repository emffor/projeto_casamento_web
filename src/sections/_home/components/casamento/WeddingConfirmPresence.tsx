import React, { useState, useCallback } from 'react';
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
  CircularProgress,
} from '@mui/material';
import { keyframes } from '@emotion/react';
import { Icon } from '@iconify/react';
import { supabase } from 'src/utils/supabaseClient';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const StyledRoot = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  position: 'relative',
  padding: theme.spacing(10, 2),
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
  position: 'relative',
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

const validateEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

const validatePhone = (phone: string): boolean => {
  const re = /^\(?([0-9]{2})\)?[-. ]?([0-9]{5})[-. ]?([0-9]{4})$/;
  return re.test(phone);
};

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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Telefone é obrigatório';
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Formato: (11) 98765-4321';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
      const { name, value } = e.target;
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));

      if (errors[name]) {
        setErrors((prev) => {
          const updated = { ...prev };
          delete updated[name];
          return updated;
        });
      }
    },
    [errors]
  );

  const handleSelectChange = useCallback((e: SelectChangeEvent<number>): void => {
    setFormData((prevState) => ({
      ...prevState,
      guests: e.target.value as number,
    }));
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Envio dos dados para o Supabase
      const { data, error } = await supabase
        .from('confirmacao_convidado')
        .insert([
          {
            nome: formData.name,
            email: formData.email,
            telefone: formData.phone,
            quantidade_convidado: String(formData.guests), // Convertendo para string conforme esperado
            mensagem: formData.message,
            created_at: new Date().toISOString(),
          },
        ])
        .select();

      if (error) throw error;

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
      console.error('Erro ao salvar dados:', error);
      setAlert({
        open: true,
        message: 'Erro ao confirmar presença. Tente novamente.',
        severity: 'error',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseAlert = useCallback((): void => {
    setAlert((prev) => ({ ...prev, open: false }));
  }, []);

  return (
    <StyledRoot>
      <Container>
        <StyledContent>
          <Title variant="h3">Confirme sua Presença</Title>

          <StyledForm elevation={3}>
            <form onSubmit={handleSubmit} noValidate>
              <StyledTextField
                fullWidth
                label="Nome completo"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                variant="outlined"
                error={!!errors.name}
                helperText={errors.name}
                disabled={isSubmitting}
                InputProps={{
                  startAdornment: <Icon icon="mdi:account" style={{ marginRight: 8 }} />,
                }}
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
                    error={!!errors.email}
                    helperText={errors.email}
                    disabled={isSubmitting}
                    InputProps={{
                      startAdornment: <Icon icon="mdi:email" style={{ marginRight: 8 }} />,
                    }}
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
                    placeholder="(00) 00000-0000"
                    error={!!errors.phone}
                    helperText={errors.phone}
                    disabled={isSubmitting}
                    InputProps={{
                      startAdornment: <Icon icon="mdi:phone" style={{ marginRight: 8 }} />,
                    }}
                  />
                </Grid>
              </Grid>

              <FormControl fullWidth sx={{ mb: 3 }} disabled={isSubmitting}>
                <InputLabel id="guests-label">Número de convidados</InputLabel>
                <Select
                  labelId="guests-label"
                  name="guests"
                  value={formData.guests}
                  onChange={handleSelectChange}
                  label="Número de convidados"
                  required
                  startAdornment={<Icon icon="mdi:account-group" style={{ marginRight: 8 }} />}
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
                disabled={isSubmitting}
                InputProps={{
                  startAdornment: (
                    <Icon
                      icon="mdi:message"
                      style={{ marginRight: 8, alignSelf: 'flex-start', marginTop: 12 }}
                    />
                  ),
                }}
              />

              <StyledButton
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <CircularProgress size={24} color="inherit" sx={{ mr: 1 }} />
                    Enviando...
                  </>
                ) : (
                  'Confirmar Presença'
                )}
              </StyledButton>
            </form>
          </StyledForm>

          <Snackbar
            open={alert.open}
            autoHideDuration={6000}
            onClose={handleCloseAlert}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          >
            <Alert
              onClose={handleCloseAlert}
              severity={alert.severity}
              variant="filled"
              elevation={6}
            >
              {alert.message}
            </Alert>
          </Snackbar>
        </StyledContent>
      </Container>
    </StyledRoot>
  );
};

export default WeddingConfirmPresence;
