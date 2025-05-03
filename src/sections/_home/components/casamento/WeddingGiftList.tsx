/* eslint-disable react-hooks/exhaustive-deps */
import { keyframes } from '@emotion/react';
import {
  Box, Button, Card, CardActions, CardContent, CardMedia, CircularProgress,
  Container, Dialog, DialogActions, DialogContent, Grid, IconButton, Paper,
  styled,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField,
  Typography, useMediaQuery, useTheme,
} from '@mui/material';
import React, { ChangeEvent, useCallback, useMemo, useRef, useState } from 'react'; // Adicionado ChangeEvent para clareza
import Iconify from 'src/components/iconify';
import API_CONFIG from 'src/config/api';
import { weddingGifts as allWeddingGifts } from 'src/utils/weddingGiftData';

// --- Interfaces ---
interface CartItem {
  id: number; name: string; price: number; image: string; quantity: number;
}
interface Gift {
  id: number; name: string; price: number; image: string;
}
interface CustomerFormData {
  number: string; holder: string; expiration: string; cvv: string;
  email: string; cpf: string; phone: string; birthday: string;
}
type FormDataErrors = Partial<Record<keyof CustomerFormData | 'general', string>>;

// --- Styled Components --- (Definições completas assumidas aqui)
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const StyledRoot = styled('div')(({ theme }) => ({
  padding: theme.spacing(10, 2),
  backgroundColor: theme.palette.grey[100],
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""', position: 'absolute', top: 0, left: 0, right: 0,
  },
}));

const StyledContent = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  maxWidth: 1200,
  margin: '0 auto',
  animation: `${fadeIn} 1s ease-out`,
  position: 'relative',
  zIndex: 1,
}));

const Title = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(4),
  fontWeight: 500,
  position: 'relative',
  display: 'inline-block',
  '&::after': {
    content: '""', position: 'absolute', bottom: -10, left: '50%',
    transform: 'translateX(-50%)', width: '80px', height: '2px',
    backgroundColor: theme.palette.primary.light,
  },
}));

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%', display: 'flex', flexDirection: 'column',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': { transform: 'translateY(-5px)', boxShadow: theme.shadows[10] },
}));

const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  paddingTop: '100%', height: 0, backgroundSize: 'contain',
  backgroundPosition: 'center', backgroundRepeat: 'no-repeat',
  margin: theme.spacing(1), borderRadius: theme.shape.borderRadius / 2,
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: '30px', padding: theme.spacing(0.75, 3),
  transition: 'all 0.3s', fontWeight: 500, textTransform: 'none',
  fontSize: '0.9rem', boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
  whiteSpace: 'nowrap',
  '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 6px 15px rgba(0,0,0,0.15)' },
}));

const CartButton = styled(Button)(({ theme }) => ({
  borderRadius: '30px', padding: theme.spacing(0.75, 2),
  transition: 'all 0.3s', fontWeight: 500, textTransform: 'none',
  fontSize: '0.9rem', width: 'auto', whiteSpace: 'nowrap',
  [theme.breakpoints.down('sm')]: {
    width: '100%', marginBottom: theme.spacing(3), display: 'flex', justifyContent: 'center',
  },
}));

const CartButtonContainer = styled(Box)(({ theme }) => ({
  display: 'flex', justifyContent: 'flex-end', marginBottom: theme.spacing(3),
  [theme.breakpoints.down('sm')]: { justifyContent: 'center' },
}));

const LoadMoreButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(4, 0, 2), padding: theme.spacing(1, 4),
  borderRadius: '30px', fontWeight: 500, textTransform: 'none',
  transition: 'all 0.2s', whiteSpace: 'nowrap',
  '&:hover': { transform: 'translateY(-2px)' },
}));


// --- Funções Utilitárias ---
const formatCardNumber = (value: string): string => value.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 ').slice(0, 19);
const formatExpirationDate = (value: string): string => value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2').slice(0, 5);
const formatCVV = (value: string): string => value.replace(/\D/g, '').slice(0, 3);
const formatCPF = (value: string): string => value.replace(/\D/g, '').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d{1,2})$/, '$1-$2').slice(0, 14);
const formatPhone = (value: string): string => {
  const digits = value.replace(/\D/g, '');
    if (digits.length <= 2) return `+${digits}`;
    if (digits.length <= 6) return `+${digits.slice(0,2)} (${digits.slice(2)}`;
    if (digits.length <= 10) return `+${digits.slice(0,2)} (${digits.slice(2,6)}) ${digits.slice(6)}`;
    if (digits.length === 13 && digits.startsWith('55')) return `+${digits.slice(0,2)} (${digits.slice(2,4)}) ${digits.slice(4,9)}-${digits.slice(9)}`;
    if (digits.length === 12 && digits.startsWith('55')) return `+${digits.slice(0,2)} (${digits.slice(2,4)}) ${digits.slice(4,8)}-${digits.slice(8)}`;
     let masked = digits.replace(/^(\d{2})(\d)/, '+$1 ($2');
     masked = masked.replace(/(\(\d{2})(\d)/, '$1) $2');
     if (digits.length > 10) {
         masked = masked.replace(/( \d{5})(\d{1,4})/, '$1-$2');
     } else {
         masked = masked.replace(/( \d{4})(\d{1,4})/, '$1-$2');
     }
     return masked.slice(0, 19);
};
const isValidCPF = (cpf: string): boolean => {
  cpf = cpf.replace(/[^\d]+/g, '');
  if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) return false;
  const digits = cpf.split('').map(Number);
  const calc = (x: number) => {
    const slice = digits.slice(0, x);
    let factor = x + 1;
    let sum = 0;
    for (let i = 0; i < x; i++) {
      sum += slice[i] * factor--;
    }
    const result = (sum * 10) % 11;
    return result === 10 ? 0 : result;
  };
  return calc(9) === digits[9] && calc(10) === digits[10];
};

const validateFormData = (data: CustomerFormData): FormDataErrors => {
  const errors: FormDataErrors = {};
  if (data.number.replace(/\D/g, '').length !== 16) errors.number = 'Número do cartão inválido';
  if (!data.holder.trim()) errors.holder = 'Nome do titular obrigatório';
  if (data.expiration.replace(/\D/g, '').length !== 4) {
      errors.expiration = 'Data de validade inválida';
  } else {
       const [month, yearSuffix] = data.expiration.split('/');
       const monthNum = parseInt(month, 10);
       const year = parseInt(`20${yearSuffix}`, 10);
       const now = new Date();
       const currentYear = now.getFullYear();
       const currentMonth = now.getMonth() + 1;
       if (monthNum < 1 || monthNum > 12) {
           errors.expiration = 'Mês inválido';
       } else if (year < currentYear || (year === currentYear && monthNum < currentMonth)) {
           errors.expiration = 'Cartão expirado';
       }
  }
  if (data.cvv.length !== 3) errors.cvv = 'CVV inválido';
  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = 'Email inválido';
  if (!data.cpf || !isValidCPF(data.cpf)) errors.cpf = 'CPF inválido';
  if (!data.phone || data.phone.replace(/\D/g, '').length < 12) errors.phone = 'Telefone inválido (inclua +55 e DDD)';
  if (!data.birthday || !/^\d{4}-\d{2}-\d{2}$/.test(data.birthday)) {
      errors.birthday = 'Data inválida (AAAA-MM-DD)';
  } else {
      const date = new Date(data.birthday + 'T00:00:00');
      const [year, month, day] = data.birthday.split('-').map(Number);
       if (isNaN(date.getTime()) || date.getFullYear() !== year || date.getMonth() + 1 !== month || date.getDate() !== day) {
           errors.birthday = 'Data inválida';
       } else if (date > new Date()) {
           errors.birthday = 'Data não pode ser no futuro';
       }
    }
  return errors;
};


const processPayment = async (cartItems: CartItem[], formData: CustomerFormData, totalAmount: number) => {
   const customerPayload = {
       external_id: `${formData.holder.replace(/\s+/g, '_')}_${Date.now()}`,
       name: formData.holder.trim(),
       email: formData.email.trim(),
       type: "individual",
       country: "br",
       documents: [{
           type: "cpf",
           number: formData.cpf.replace(/\D/g, '')
       }],
       phone_numbers: [`+${formData.phone.replace(/\D/g, '')}`],
       birthday: formData.birthday
   };
   const billingData = {
     name: formData.holder.trim(),
     address: {
       street: "Rua Exemplo", street_number: "123", neighborhood: "Centro",
       city: "Fortaleza", state: "CE", zipcode: "60000000"
     }
   };

  try {
    console.log("Enviando dados do cliente:", JSON.stringify(customerPayload, null, 2));
    const customerResponse = await fetch(`${API_CONFIG.BASE_URL}/customers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(customerPayload),
    });
    const customerResult = await customerResponse.json();
    if (!customerResponse.ok) {
      console.error("Erro API Cliente:", customerResult);
      throw new Error(customerResult?.errors?.[0]?.message || customerResult.error || 'Erro ao criar cliente');
    }
    const customerId = customerResult.id;
    console.log("Cliente criado/obtido:", customerId);

    const items = cartItems.map(item => ({
      id: String(item.id), title: item.name, unit_price: item.price,
      quantity: item.quantity, tangible: false, picture_url: item.image
    }));

    const transactionData = {
      amount: totalAmount * 100,
      card_number: formData.number.replace(/\s/g, ''),
      card_holder_name: formData.holder,
      card_expiration_date: formData.expiration.replace(/\D/g, ''),
      card_cvv: formData.cvv,
      customer: { id: customerId },
      billing: billingData,
      items: items,
      metadata: { description: "Presentes de casamento" }
    };
    console.log("Enviando dados da transação:", JSON.stringify(transactionData, null, 2));

    const transactionResponse = await fetch(`${API_CONFIG.BASE_URL}/transactions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(transactionData),
    });
    const transactionResult = await transactionResponse.json();

    if (!transactionResponse.ok) {
       console.error("Erro API Transação:", transactionResult);
      throw new Error(transactionResult?.errors?.[0]?.message || transactionResult.error || 'Erro ao processar pagamento');
    }
    console.log("Transação OK:", transactionResult);

    return { success: true, data: transactionResult };

  } catch (err: any) {
    console.error('Erro no processamento do pagamento:', err);
    return { success: false, error: err.message || 'Ocorreu um erro desconhecido.' };
  }
};

// --- Subcomponentes ---
interface PaymentFormProps {
  formData: CustomerFormData;
  errors: FormDataErrors;
  onFormChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  inputRefs: {
    number: React.RefObject<HTMLInputElement>;
    holder: React.RefObject<HTMLInputElement>;
    expiration: React.RefObject<HTMLInputElement>;
    cvv: React.RefObject<HTMLInputElement>;
    email: React.RefObject<HTMLInputElement>;
    cpf: React.RefObject<HTMLInputElement>;
    phone: React.RefObject<HTMLInputElement>;
    birthday: React.RefObject<HTMLInputElement>;
  };
}

const PaymentForm: React.FC<PaymentFormProps> = ({ formData, errors, onFormChange, inputRefs }) => (
  <Box sx={{ mt: 3 }}>
    <Typography variant="h6" sx={{ mb: 2 }}>Dados Pessoais e Cartão</Typography>
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
          <TextField fullWidth label="Nome Completo (como no cartão)" name="holder" value={formData.holder}
                     onChange={onFormChange} placeholder="NOME COMPLETO"
                     inputProps={{ style: { textTransform: 'uppercase' } }}
                     inputRef={inputRefs.holder} required error={!!errors.holder} helperText={errors.holder || "Nome completo"} />
        </Grid>
      <Grid item xs={12} sm={6}>
          <TextField fullWidth type="email" label="Email" name="email" value={formData.email}
                     onChange={onFormChange} placeholder="seu@email.com"
                     inputRef={inputRefs.email} required error={!!errors.email} helperText={errors.email || "Seu melhor email"} />
        </Grid>
       <Grid item xs={12} sm={4}>
            <TextField fullWidth label="CPF" name="cpf" value={formData.cpf}
                       onChange={onFormChange} placeholder="000.000.000-00"
                       inputProps={{ maxLength: 14 }}
                       inputRef={inputRefs.cpf} required error={!!errors.cpf} helperText={errors.cpf || "Seu CPF"} />
       </Grid>
       <Grid item xs={12} sm={4}>
           <TextField fullWidth label="Telefone" name="phone" value={formData.phone}
                      onChange={onFormChange} placeholder="+55 (XX) XXXXX-XXXX"
                      inputProps={{ maxLength: 19 }}
                      inputRef={inputRefs.phone} required error={!!errors.phone} helperText={errors.phone || "Inclua +55 e DDD"} />
       </Grid>
       <Grid item xs={12} sm={4}>
           <TextField fullWidth label="Data de Nascimento" name="birthday" type="date" value={formData.birthday}
                      onChange={onFormChange} InputLabelProps={{ shrink: true }}
                      inputRef={inputRefs.birthday} required error={!!errors.birthday} helperText={errors.birthday || "AAAA-MM-DD"} />
       </Grid>

      <Grid item xs={12}> <Typography variant="subtitle1" sx={{mt: 2, mb: -1}}>Dados do Cartão</Typography> </Grid>
      <Grid item xs={12}>
        <TextField fullWidth label="Número do Cartão" name="number" value={formData.number}
                   onChange={onFormChange} placeholder="1234 5678 9012 3456"
                   inputProps={{ maxLength: 19, inputMode: 'numeric' }}
                   inputRef={inputRefs.number} required error={!!errors.number} helperText={errors.number || "16 números do cartão"} />
      </Grid>
      <Grid item xs={6} sm={8}>
        <TextField fullWidth label="Validade" name="expiration" value={formData.expiration}
                   onChange={onFormChange} placeholder="MM/AA"
                   inputProps={{ maxLength: 5, inputMode: 'numeric' }}
                   inputRef={inputRefs.expiration} required error={!!errors.expiration} helperText={errors.expiration || "MM/AA"} />
      </Grid>
      <Grid item xs={6} sm={4}>
        <TextField fullWidth label="CVV" name="cvv" value={formData.cvv}
                   onChange={onFormChange} placeholder="123"
                   inputProps={{ maxLength: 3, inputMode: 'numeric', type: 'password' }}
                   inputRef={inputRefs.cvv} required error={!!errors.cvv} helperText={errors.cvv || "3 dígitos"} />
      </Grid>
    </Grid>
  </Box>
);

interface CartViewProps {
  cartItems: CartItem[];
  formData: CustomerFormData;
  paymentState: { loading: boolean; error: string | null; errors: FormDataErrors };
  onRemoveItem: (id: number) => void;
  onFormChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onProceedToPayment: () => Promise<void>;
  onContinueShopping: () => void;
  inputRefs: PaymentFormProps['inputRefs'];
  isMobile: boolean;
}

const CartView: React.FC<CartViewProps> = ({
  cartItems, formData, paymentState, onRemoveItem, onFormChange,
  onProceedToPayment, onContinueShopping, inputRefs, isMobile
}) => {
  const totalPrice = useMemo(() => cartItems.reduce((total, item) => total + item.price * item.quantity, 0), [cartItems]);

  return (
    <Paper sx={{ p: isMobile ? 2 : 3, mb: 3, maxWidth: 900, mx: 'auto' }}>
       <Typography variant="h5" sx={{ mb: 3 }}>Meu carrinho</Typography>
         {paymentState.error && !Object.keys(paymentState.errors).length && (
            <Typography color="error" sx={{ mb: 2, textAlign: 'center' }}>{paymentState.error}</Typography>
         )}

       {cartItems.length > 0 ? (
        <>
            <TableContainer component={Paper} variant="outlined" sx={{mb: 2}}>
                <Table sx={{ minWidth: isMobile ? 300 : 650 }}>
                  <TableHead>
                    <TableRow>
                      <TableCell>Presente</TableCell>
                      <TableCell align="right">Valor Unit.</TableCell>
                      <TableCell align="center">Qtd.</TableCell>
                      <TableCell align="right">Subtotal</TableCell>
                      <TableCell align="center">Ações</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {cartItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell component="th" scope="row">
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Box component="img" src={item.image} alt={item.name} sx={{ width: 50, height: 50, mr: 2, objectFit: 'contain', borderRadius: 1 }} />
                            <Typography variant="body2" sx={{ fontSize: '0.9rem' }}>{item.name}</Typography>
                          </Box>
                        </TableCell>
                        <TableCell align="right">R$ {item.price.toFixed(2)}</TableCell>
                        <TableCell align="center">{item.quantity}</TableCell>
                        <TableCell align="right">R$ {(item.price * item.quantity).toFixed(2)}</TableCell>
                        <TableCell align="center">
                          <IconButton color="error" size="small" onClick={() => onRemoveItem(item.id)} title="Remover item">
                            <Iconify icon="eva:trash-2-outline" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
            </TableContainer>
            <Box sx={{ textAlign: 'right', mb: 3 }}>
                <Typography variant="h6">Total: R$ {totalPrice.toFixed(2)}</Typography>
            </Box>

            <PaymentForm formData={formData} errors={paymentState.errors} onFormChange={onFormChange} inputRefs={inputRefs} />

            <Box sx={{ display: 'flex', justifyContent: isMobile ? 'center' : 'space-between', flexDirection: isMobile ? 'column' : 'row', gap: 2, mt: 3 }}>
                 <StyledButton variant="outlined" color="primary" onClick={onContinueShopping} startIcon={<Iconify icon="eva:arrow-back-outline" />} sx={{ width: isMobile ? '100%' : 'auto' }}>
                     Adicionar mais itens
                 </StyledButton>
                 <StyledButton variant="contained" color="primary" onClick={onProceedToPayment} disabled={paymentState.loading} startIcon={paymentState.loading ? <CircularProgress size={20} color="inherit" /> : <Iconify icon="mdi:credit-card-check-outline" />} sx={{ width: isMobile ? '100%' : 'auto' }}>
                     {paymentState.loading ? 'Processando...' : 'Finalizar Pagamento'}
                 </StyledButton>
            </Box>
        </>
       ) : (
        <Box sx={{ textAlign: 'center', py: 4 }}>
            <Iconify icon="eva:shopping-cart-outline" width={60} height={60} sx={{ mb: 2, color: 'text.secondary' }} />
            <Typography variant="h6" sx={{ mb: 2 }}>Seu carrinho está vazio</Typography>
            <Typography variant="body2" sx={{ mb: 3, color: 'text.secondary' }}>Adicione presentes à sua lista para presentear os noivos</Typography>
            <StyledButton variant="contained" color="primary" onClick={onContinueShopping} startIcon={<Iconify icon="eva:gift-outline" />}>
               Ver lista de presentes
             </StyledButton>
        </Box>
       )}
    </Paper>
  );
};


interface GiftGridProps {
  gifts: Gift[];
  onOpenGiftModal: (gift: Gift) => void;
  onLoadMore: () => void;
  hasMoreItems: boolean;
  isMobile: boolean;
}

const GiftGrid: React.FC<GiftGridProps> = ({ gifts, onOpenGiftModal, onLoadMore, hasMoreItems, isMobile }) => (
  <>
    <Grid container spacing={isMobile ? 2 : 3}>
      {gifts.map((gift) => (
        <Grid item key={gift.id} xs={12} sm={6} md={4} lg={3}>
          <StyledCard>
            <StyledCardMedia image={gift.image} title={gift.name} />
            <CardContent sx={{ flexGrow: 1, p: 1.5 }}>
              <Typography gutterBottom variant="body1" component="div" sx={{ height: '3.2em', lineHeight: '1.6em', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', fontWeight: 500, mb: 0.5 }}>
                {gift.name}
              </Typography>
              <Typography variant="h6" color="primary" sx={{ fontWeight: 600, fontSize: '1.1rem' }}>
                R$ {gift.price.toFixed(2)}
              </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: 'center', pb: 1.5, pt: 0 }}>
              <StyledButton variant="contained" color="primary" onClick={() => onOpenGiftModal(gift)} size="small">
                Presentear
              </StyledButton>
            </CardActions>
          </StyledCard>
        </Grid>
      ))}
    </Grid>

    {hasMoreItems && (
      <Box sx={{ textAlign: 'center' }}>
        <LoadMoreButton variant="outlined" color="primary" onClick={onLoadMore} startIcon={<Iconify icon="eva:refresh-outline" />} size="large">
          Carregar mais presentes
        </LoadMoreButton>
      </Box>
    )}
  </>
);

interface GiftDetailsModalProps {
  open: boolean;
  onClose: () => void;
  gift: Gift | null;
  onAddToCartAndClose: () => void;
  onAddToCartAndGoToCartView: () => void;
  isMobile: boolean;
}

const GiftDetailsModal: React.FC<GiftDetailsModalProps> = ({ open, onClose, gift, onAddToCartAndClose, onAddToCartAndGoToCartView, isMobile }) => {
  if (!gift) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogContent sx={{ textAlign: 'center', p: isMobile ? 2 : 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: -1, mt: -1, mr: -1 }}>
          <IconButton onClick={onClose} edge="end"><Iconify icon="eva:close-fill" /></IconButton>
        </Box>
        <Box component="img" src={gift.image} alt={gift.name} sx={{ maxWidth: '150px', maxHeight: '150px', objectFit: 'contain', mb: 2 }} />
        <Typography variant="h6" sx={{ mb: 1 }}>{gift.name}</Typography>
        <Typography variant="h6" color="primary" sx={{ mb: 2 }}>R$ {gift.price.toFixed(2)}</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>Adicionar este presente ao carrinho?</Typography>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center', p: 2, flexDirection: isMobile ? 'column' : 'row', gap: 1 }}>
        <StyledButton variant="outlined" color="primary" onClick={onAddToCartAndClose} fullWidth={isMobile} size="medium">
          Continuar vendo a lista
        </StyledButton>
        <StyledButton variant="contained" color="primary" onClick={onAddToCartAndGoToCartView} fullWidth={isMobile} size="medium">
          Adicionar e ver carrinho
        </StyledButton>
      </DialogActions>
    </Dialog>
  );
};

interface CartModalProps {
  open: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onRemoveItem: (id: number) => void;
  onGoToCartView: () => void;
  isMobile: boolean;
}

const CartModal: React.FC<CartModalProps> = ({ open, onClose, cartItems, onRemoveItem, onGoToCartView, isMobile }) => {
  const totalPrice = useMemo(() => cartItems.reduce((total, item) => total + item.price * item.quantity, 0), [cartItems]);
  const totalItems = useMemo(() => cartItems.reduce((acc, item) => acc + item.quantity, 0), [cartItems]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogContent sx={{ p: isMobile ? 2 : 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h5">Meu carrinho ({totalItems})</Typography>
          <IconButton onClick={onClose} edge="end"><Iconify icon="eva:close-fill" /></IconButton>
        </Box>

        {cartItems.length > 0 ? (
          <>
            <TableContainer component={Paper} variant="outlined" sx={{ mb: 3 }}>
              <Table>
                <TableHead>
                  <TableRow><TableCell>Presente</TableCell><TableCell align="right">Valor</TableCell><TableCell align="center">Ações</TableCell></TableRow>
                </TableHead>
                <TableBody>
                  {cartItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                          <Box component="img" src={item.image} alt={item.name} sx={{ width: 45, height: 45, objectFit: 'contain', borderRadius: 1 }} />
                          <Typography variant="body2">{item.name} (x{item.quantity})</Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="right">R$ {(item.price * item.quantity).toFixed(2)}</TableCell>
                      <TableCell align="center">
                        <IconButton color="error" size="small" onClick={() => onRemoveItem(item.id)}>
                          <Iconify icon="eva:trash-2-outline" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Box sx={{ textAlign: 'right', mb: 3 }}>
              <Typography variant="h6">Total: R$ {totalPrice.toFixed(2)}</Typography>
            </Box>
          </>
        ) : (
           <Box sx={{ textAlign: 'center', py: 4 }}>
             <Iconify icon="eva:shopping-cart-outline" width={50} height={50} sx={{ mb: 1.5, color: 'text.secondary' }} />
             <Typography variant="h6" sx={{ mb: 1.5 }}>Seu carrinho está vazio</Typography>
             <Typography variant="body2" color="text.secondary">Continue navegando pela lista!</Typography>
           </Box>
        )}
      </DialogContent>
      <DialogActions sx={{ px: isMobile ? 2 : 3, pb: isMobile ? 2 : 3, justifyContent: 'space-between' }}>
        <Button variant="outlined" onClick={onClose}>Continuar comprando</Button>
        {cartItems.length > 0 && (
          <StyledButton variant="contained" color="primary" onClick={onGoToCartView}>Finalizar compra</StyledButton>
        )}
      </DialogActions>
    </Dialog>
  );
};

// --- Componente Principal ---
export default function WeddingGiftList() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [openCartModal, setOpenCartModal] = useState(false);
  const [openGiftModal, setOpenGiftModal] = useState(false);
  const [selectedGift, setSelectedGift] = useState<Gift | null>(null);
  const [currentPage, setCurrentPage] = useState<'list' | 'cart'>('list');
  const [visibleItemsCount, setVisibleItemsCount] = useState(12);
  const [paymentState, setPaymentState] = useState<{ loading: boolean; error: string | null; errors: FormDataErrors }>({ loading: false, error: null, errors: {} });
  const [formData, setFormData] = useState<CustomerFormData>({
      number: '', holder: '', expiration: '', cvv: '',
      email: '', cpf: '', phone: '', birthday: ''
  });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const itemsPerLoad = 12;

  const inputRefs = {
    number: useRef<HTMLInputElement>(null),
    holder: useRef<HTMLInputElement>(null),
    expiration: useRef<HTMLInputElement>(null),
    cvv: useRef<HTMLInputElement>(null),
    email: useRef<HTMLInputElement>(null),
    cpf: useRef<HTMLInputElement>(null),
    phone: useRef<HTMLInputElement>(null),
    birthday: useRef<HTMLInputElement>(null),
  };

  const displayedGifts = useMemo(() => allWeddingGifts.slice(0, visibleItemsCount), [visibleItemsCount]);
  const hasMoreItems = useMemo(() => visibleItemsCount < allWeddingGifts.length, [visibleItemsCount]);
  const totalCartItems = useMemo(() => cartItems.reduce((acc, item) => acc + item.quantity, 0), [cartItems]);
  const totalCartPrice = useMemo(() => cartItems.reduce((total, item) => total + item.price * item.quantity, 0), [cartItems]);

   const handleAddToCart = useCallback((gift: Gift) => {
     setPaymentState({ loading: false, error: null, errors: {} });
     setCartItems((prevItems) => {
       const existingItem = prevItems.find((item) => item.id === gift.id);
       if (existingItem) {
         return prevItems.map((item) =>
           item.id === gift.id ? { ...item, quantity: item.quantity + 1 } : item
         );
       }
       return [...prevItems, { ...gift, quantity: 1 }];
     });
   }, []);

   const handleRemoveFromCart = useCallback((giftId: number) => {
     setPaymentState({ loading: false, error: null, errors: {} });
     setCartItems((prevItems) => prevItems.filter((item) => item.id !== giftId));
   }, []);

   const handleLoadMore = useCallback(() => {
     setVisibleItemsCount((prev) => prev + itemsPerLoad);
   }, [itemsPerLoad]);

   const handleOpenGiftModal = useCallback((gift: Gift) => {
     setSelectedGift(gift);
     setOpenGiftModal(true);
   }, []);

   const handleCloseGiftModal = useCallback(() => setOpenGiftModal(false), []);
   const handleOpenCartModal = useCallback(() => setOpenCartModal(true), []);
   const handleCloseCartModal = useCallback(() => setOpenCartModal(false), []);

   const handleContinueShopping = useCallback(() => {
     setCurrentPage('list');
     setOpenCartModal(false);
     setOpenGiftModal(false);
   }, []);

   const handleGoToCartView = useCallback(() => {
     setCurrentPage('cart');
     setOpenCartModal(false);
     setOpenGiftModal(false);
   }, []);

   const handleAddToCartAndClose = useCallback(() => {
     if (selectedGift) handleAddToCart(selectedGift);
     handleCloseGiftModal();
   }, [selectedGift, handleAddToCart, handleCloseGiftModal]);

   const handleAddToCartAndGoToCartView = useCallback(() => {
     if (selectedGift) handleAddToCart(selectedGift);
     handleGoToCartView();
   }, [selectedGift, handleAddToCart, handleGoToCartView]);


    const handleFormChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        let formattedValue = value;
        const fieldName = name as keyof CustomerFormData;

        switch (fieldName) {
            case 'number': formattedValue = formatCardNumber(value); break;
            case 'expiration': formattedValue = formatExpirationDate(value); break;
            case 'cvv': formattedValue = formatCVV(value); break;
            case 'cpf': formattedValue = formatCPF(value); break;
            case 'phone': formattedValue = formatPhone(value); break;
            case 'holder': formattedValue = value.toUpperCase(); break;
            case 'birthday':
            case 'email':
            default: formattedValue = value;
        }

        setFormData(prev => ({ ...prev, [fieldName]: formattedValue }));
        setPaymentState(prev => ({
            ...prev,
            error: null,
            errors: { ...prev.errors, [fieldName]: undefined }
        }));
    }, []);


  const handleProceedToPayment = useCallback(async () => {
    if (cartItems.length === 0) {
      setPaymentState({ loading: false, error: 'Seu carrinho está vazio.', errors: {} });
      return;
    }

    const validationErrors = validateFormData(formData);
    if (Object.keys(validationErrors).length > 0) {
      setPaymentState({ loading: false, error: 'Verifique os erros no formulário.', errors: validationErrors });
      const firstErrorField = Object.keys(validationErrors)[0] as keyof CustomerFormData;
        if(inputRefs[firstErrorField]?.current) {
            inputRefs[firstErrorField]?.current?.focus();
            inputRefs[firstErrorField]?.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      return;
    }

    setPaymentState({ loading: true, error: null, errors: {} });

    const result = await processPayment(cartItems, formData, totalCartPrice);

    if (result.success) {
      alert('Pagamento realizado com sucesso!');
      setCartItems([]);
      setFormData({
          number: '', holder: '', expiration: '', cvv: '',
          email: '', cpf: '', phone: '', birthday: ''
      });
      setCurrentPage('list');
      setPaymentState({ loading: false, error: null, errors: {} });
    } else {
      setPaymentState({ loading: false, error: `Erro: ${result.error}`, errors: {} });
    }
  }, [cartItems, formData, totalCartPrice, inputRefs]);


  return (
    <StyledRoot>
      <Container>
        <StyledContent>
          <Title variant={isMobile ? 'h4' : 'h3'}>Nossa Lista de Presentes</Title>
             <CartButtonContainer>
                 <CartButton variant="outlined" startIcon={<Iconify icon="eva:shopping-cart-fill" />}
                             onClick={handleOpenCartModal} fullWidth={isMobile} size={isMobile ? 'medium' : 'large'}>
                    Ver carrinho ({totalCartItems})
                 </CartButton>
             </CartButtonContainer>


          {currentPage === 'list' && (
             <GiftGrid
                 gifts={displayedGifts}
                 onOpenGiftModal={handleOpenGiftModal}
                 onLoadMore={handleLoadMore}
                 hasMoreItems={hasMoreItems}
                 isMobile={isMobile}
                />
          )}

          {currentPage === 'cart' && (
            <CartView
              cartItems={cartItems}
              formData={formData}
              paymentState={paymentState}
              onRemoveItem={handleRemoveFromCart}
              onFormChange={handleFormChange}
              onProceedToPayment={handleProceedToPayment}
              onContinueShopping={handleContinueShopping}
              inputRefs={inputRefs}
              isMobile={isMobile}
            />
          )}
        </StyledContent>
      </Container>

        <GiftDetailsModal
            open={openGiftModal}
            onClose={handleCloseGiftModal}
            gift={selectedGift}
            onAddToCartAndClose={handleAddToCartAndClose}
            onAddToCartAndGoToCartView={handleAddToCartAndGoToCartView}
            isMobile={isMobile}
        />

        <CartModal
            open={openCartModal}
            onClose={handleCloseCartModal}
            cartItems={cartItems}
            onRemoveItem={handleRemoveFromCart}
            onGoToCartView={handleGoToCartView}
            isMobile={isMobile}
        />

    </StyledRoot>
  );
}