import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Dialog,
  DialogContent,
  DialogActions,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  useMediaQuery,
  useTheme,
  CircularProgress,
} from '@mui/material';
import { keyframes } from '@emotion/react';
import Iconify from 'src/components/iconify';
import { weddingGifts } from 'src/utils/weddingGiftData';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const StyledRoot = styled('div')(({ theme }) => ({
  padding: theme.spacing(10, 2),
  backgroundColor: theme.palette.background.default,
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
}));

const StyledContent = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  maxWidth: 1200,
  margin: '0 auto',
  animation: `${fadeIn} 1s ease-out`,
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

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[10],
  },
}));

const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  paddingTop: '100%',
  height: 0,
  backgroundSize: 'contain',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundColor: theme.palette.grey[200],
  margin: theme.spacing(1),
  borderRadius: theme.shape.borderRadius / 2,
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: '30px',
  padding: theme.spacing(0.75, 3),
  transition: 'all 0.3s',
  fontWeight: 500,
  textTransform: 'none',
  fontSize: '0.9rem',
  boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
  whiteSpace: 'nowrap',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 15px rgba(0,0,0,0.15)',
  },
}));

const CartButton = styled(Button)(({ theme }) => ({
  borderRadius: '30px',
  padding: theme.spacing(0.75, 2),
  transition: 'all 0.3s',
  fontWeight: 500,
  textTransform: 'none',
  fontSize: '0.9rem',
  width: 'auto',
  whiteSpace: 'nowrap',
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginBottom: theme.spacing(3),
    display: 'flex',
    justifyContent: 'center',
  },
}));

const CartButtonContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  marginBottom: theme.spacing(3),
  [theme.breakpoints.down('sm')]: {
    justifyContent: 'center',
  },
}));

const LoadMoreButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(4, 0, 2),
  padding: theme.spacing(1, 4),
  borderRadius: '30px',
  fontWeight: 500,
  textTransform: 'none',
  transition: 'all 0.2s',
  whiteSpace: 'nowrap',
  '&:hover': {
    transform: 'translateY(-2px)',
  },
}));

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface MercadoPagoItem {
  id: string;
  title: string;
  quantity: number;
  unit_price: number;
  currency_id?: string;
  picture_url?: string;
  description?: string;
}

interface PayerInfo {
  email: string;
}

interface MercadoPagoPreferenceResponse {
  id: string;
  init_point: string;
  sandbox_init_point: string;
  message?: string;
  error?: any;
  cause?: any;
}

export default function WeddingGiftList() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [openCartModal, setOpenCartModal] = useState(false);
  const [currentPage, setCurrentPage] = useState('list');
  const [visibleItems, setVisibleItems] = useState(12);
  const [selectedGift, setSelectedGift] = useState<any>(null);
  const [openGiftModal, setOpenGiftModal] = useState(false);
  const itemsPerLoad = 12;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [isLoadingPayment, setIsLoadingPayment] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  const MERCADO_PAGO_ACCESS_TOKEN = process.env.REACT_APP_MERCADO_PAGO_ACCESS_TOKEN;

  const handleAddToCart = (gift: any) => {
    setPaymentError(null);
    const existingItem = cartItems.find((item) => item.id === gift.id);
    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.id === gift.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...gift, quantity: 1 }]);
    }
  };

  const handleRemoveFromCart = (giftId: number) => {
    setPaymentError(null);
    setCartItems(cartItems.filter((item) => item.id !== giftId));
  };

  const handleOpenCart = () => {
    setOpenCartModal(true);
  };

  const handleCloseCart = () => {
    setOpenCartModal(false);
  };

  const handleContinueShopping = () => {
    setCurrentPage('list');
    setOpenCartModal(false);
    setOpenGiftModal(false);
  };

  const handleGoToCartView = () => {
    setCurrentPage('cart');
    setOpenCartModal(false);
    setOpenGiftModal(false);
  };

  const handleLoadMore = () => {
    setVisibleItems((prev) => prev + itemsPerLoad);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleOpenGiftModal = (gift: any) => {
    setSelectedGift(gift);
    setOpenGiftModal(true);
  };

  const handleCloseGiftModal = () => {
    setOpenGiftModal(false);
  };

  const handleAddToCartAndClose = () => {
    if (selectedGift) {
      handleAddToCart(selectedGift);
      setOpenGiftModal(false);
    }
  };

  const handleAddToCartAndGoToCartView = () => {
    if (selectedGift) {
      handleAddToCart(selectedGift);
      setOpenGiftModal(false);
      setCurrentPage('cart');
    }
  };

  const handleProceedToPayment = async () => {
    if (cartItems.length === 0) {
      setPaymentError('Seu carrinho está vazio.');
      return;
    }
    if (!MERCADO_PAGO_ACCESS_TOKEN) {
      setPaymentError('ERRO DE CONFIGURAÇÃO: Access Token de Produção não definido.');
      setIsLoadingPayment(false);
      return;
    }

    setIsLoadingPayment(true);
    setPaymentError(null);

    const itemsToPay: MercadoPagoItem[] = cartItems.map((item) => ({
      id: String(item.id),
      title: item.name,
      quantity: item.quantity,
      unit_price: item.price,
      currency_id: 'BRL',
      picture_url: item.image,
      description: item.name,
    }));

    const buyerEmail = 'email_real_do_comprador@exemplo.com';

    if (buyerEmail === 'email_real_do_comprador@exemplo.com') {
      console.warn(
        'ALERTA: Usando email placeholder para o pagador. Substitua por email real em produção!'
      );
    }

    const payerInfo: PayerInfo = {
      email: buyerEmail,
    };

    try {
      const response = await fetch('https://api.mercadopago.com/checkout/preferences', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${MERCADO_PAGO_ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: itemsToPay,
          payer: payerInfo,
          back_urls: {
            success: `${window.location.origin}/success`,
            failure: `${window.location.origin}/failure`,
            pending: `${window.location.origin}/pending`,
          },
          auto_return: 'approved',
        }),
      });

      const data: MercadoPagoPreferenceResponse = await response.json();

      if (!response.ok || data.error) {
        let errorMessage = `Erro ${response.status}: `;
        if (data.message) errorMessage += data.message;
        if (data.error) errorMessage += ` (${JSON.stringify(data.error)})`;
        if (data.cause) errorMessage += ` Causa: ${JSON.stringify(data.cause)}`;
        if (response.status === 400 && JSON.stringify(data).includes('collector is a test user')) {
          errorMessage =
            'Erro: Você está usando credenciais de Produção com um usuário pagador de Teste. Use credenciais de Teste OU um email de pagador real.';
        } else if (
          response.status === 400 &&
          JSON.stringify(data).includes('payer.email must be a real email')
        ) {
          errorMessage =
            'Erro: Você está usando credenciais de Teste com um email de pagador inválido ou de produção. Use um email de pagador de Teste (ex: test_user_...@testuser.com).';
        } else if (response.status === 400 && JSON.stringify(data).includes('payer.email')) {
          errorMessage += ' Verifique se o email do comprador é válido.';
        }
        throw new Error(errorMessage || 'Não foi possível criar a preferência.');
      }

      if (data.init_point) {
        window.location.href = data.init_point;
      } else {
        console.error('Erro: init_point não encontrado na resposta da API de produção.', data);
        throw new Error('Resposta da API de produção não contém init_point.');
      }
    } catch (err: any) {
      console.error('Erro ao criar preferência (Produção - Frontend):', err);
      setPaymentError(`Erro ao iniciar pagamento: ${err.message || 'Tente novamente.'}`);
      setIsLoadingPayment(false);
    }
  };

  const displayedGifts = weddingGifts.slice(0, visibleItems);
  const hasMoreItems = visibleItems < weddingGifts.length;

  return (
    <StyledRoot>
      <Container>
        <StyledContent>
          <Title variant={isMobile ? 'h4' : 'h3'}>Nossa Lista de Presentes</Title>

          <CartButtonContainer>
            <CartButton
              variant="outlined"
              startIcon={<Iconify icon="eva:shopping-cart-fill" />}
              onClick={handleOpenCart}
              fullWidth={isMobile}
              size={isMobile ? 'medium' : 'large'}
            >
              Ver carrinho ({cartItems.reduce((acc, item) => acc + item.quantity, 0)})
            </CartButton>
          </CartButtonContainer>

          {currentPage === 'list' && (
            <>
              <Grid container spacing={isMobile ? 2 : 3}>
                {displayedGifts.map((gift) => (
                  <Grid item key={gift.id} xs={12} sm={6} md={4} lg={3}>
                    <StyledCard>
                      <StyledCardMedia image={gift.image} title={gift.name} />
                      <CardContent sx={{ flexGrow: 1, p: 1.5 }}>
                        <Typography
                          gutterBottom
                          variant="body1"
                          component="div"
                          sx={{
                            height: '3.2em',
                            lineHeight: '1.6em',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            fontWeight: 500,
                            mb: 0.5,
                          }}
                        >
                          {gift.name}
                        </Typography>
                        <Typography
                          variant="h6"
                          color="primary"
                          sx={{ fontWeight: 600, fontSize: '1.1rem' }}
                        >
                          R$ {gift.price.toFixed(2)}
                        </Typography>
                      </CardContent>
                      <CardActions sx={{ justifyContent: 'center', pb: 1.5, pt: 0 }}>
                        <StyledButton
                          variant="contained"
                          color="primary"
                          onClick={() => handleOpenGiftModal(gift)}
                          size="small"
                        >
                          Presentear
                        </StyledButton>
                      </CardActions>
                    </StyledCard>
                  </Grid>
                ))}
              </Grid>

              {hasMoreItems && (
                <Box sx={{ textAlign: 'center' }}>
                  <LoadMoreButton
                    variant="outlined"
                    color="primary"
                    onClick={handleLoadMore}
                    startIcon={<Iconify icon="eva:refresh-outline" />}
                    size="large"
                  >
                    Carregar mais presentes
                  </LoadMoreButton>
                </Box>
              )}
            </>
          )}

          {currentPage === 'cart' && (
            <Paper sx={{ p: isMobile ? 2 : 3, mb: 3, maxWidth: 900, mx: 'auto' }}>
              <Typography variant="h5" sx={{ mb: 3 }}>
                Meu carrinho
              </Typography>

              {paymentError && (
                <Typography color="error" sx={{ mb: 2, textAlign: 'center' }}>
                  {paymentError}
                </Typography>
              )}

              {cartItems.length > 0 ? (
                <>
                  <TableContainer component={Paper} variant="outlined">
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
                                <Box
                                  component="img"
                                  src={item.image}
                                  alt={item.name}
                                  sx={{
                                    width: 50,
                                    height: 50,
                                    mr: 2,
                                    objectFit: 'contain',
                                    borderRadius: 1,
                                  }}
                                />
                                <Typography variant="body2" sx={{ fontSize: '0.9rem' }}>
                                  {item.name}
                                </Typography>
                              </Box>
                            </TableCell>
                            <TableCell align="right">R$ {item.price.toFixed(2)}</TableCell>
                            <TableCell align="center">{item.quantity}</TableCell>
                            <TableCell align="right">
                              R$ {(item.price * item.quantity).toFixed(2)}
                            </TableCell>
                            <TableCell align="center">
                              <IconButton
                                color="error"
                                size="small"
                                onClick={() => handleRemoveFromCart(item.id)}
                                title="Remover item"
                              >
                                <Iconify icon="eva:trash-2-outline" />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>

                  <Box sx={{ textAlign: 'right', mt: 3, mb: 3 }}>
                    <Typography variant="h6">Total: R$ {getTotalPrice().toFixed(2)}</Typography>
                  </Box>

                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: isMobile ? 'center' : 'space-between',
                      flexDirection: isMobile ? 'column' : 'row',
                      gap: 2,
                      mt: 3,
                    }}
                  >
                    <StyledButton
                      variant="outlined"
                      color="primary"
                      onClick={handleContinueShopping}
                      startIcon={<Iconify icon="eva:arrow-back-outline" />}
                    >
                      Adicionar mais itens
                    </StyledButton>
                    <StyledButton
                      variant="contained"
                      color="primary"
                      onClick={handleProceedToPayment}
                      disabled={isLoadingPayment}
                      startIcon={
                        isLoadingPayment ? (
                          <CircularProgress size={20} color="inherit" />
                        ) : (
                          <Iconify icon="mdi:credit-card-check-outline" />
                        )
                      }
                    >
                      {isLoadingPayment ? 'Processando...' : 'Ir para Pagamento'}
                    </StyledButton>
                  </Box>
                </>
              ) : (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <Iconify
                    icon="eva:shopping-cart-outline"
                    width={60}
                    height={60}
                    sx={{ mb: 2, color: 'text.secondary' }}
                  />
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    Seu carrinho está vazio
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 3, color: 'text.secondary' }}>
                    Adicione presentes à sua lista para presentear os noivos
                  </Typography>
                  <StyledButton
                    variant="contained"
                    color="primary"
                    onClick={handleContinueShopping}
                    startIcon={<Iconify icon="eva:gift-outline" />}
                  >
                    Ver lista de presentes
                  </StyledButton>
                </Box>
              )}
            </Paper>
          )}
        </StyledContent>
      </Container>

      <Dialog open={openGiftModal} onClose={handleCloseGiftModal} maxWidth="xs" fullWidth>
        <DialogContent sx={{ textAlign: 'center', p: isMobile ? 2 : 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: -1, mt: -1, mr: -1 }}>
            <IconButton onClick={handleCloseGiftModal} edge="end">
              <Iconify icon="eva:close-fill" />
            </IconButton>
          </Box>

          {selectedGift && (
            <>
              <Box
                component="img"
                src={selectedGift.image}
                alt={selectedGift.name}
                sx={{ maxWidth: '150px', maxHeight: '150px', objectFit: 'contain', mb: 2 }}
              />
              <Typography variant="h6" sx={{ mb: 1 }}>
                {selectedGift.name}
              </Typography>
              <Typography variant="h6" color="primary" sx={{ mb: 2 }}>
                R$ {selectedGift.price.toFixed(2)}
              </Typography>

              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Adicionar este presente ao carrinho?
              </Typography>
            </>
          )}
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: 'center',
            p: 2,
            flexDirection: isMobile ? 'column' : 'row',
            gap: 1,
          }}
        >
          <StyledButton
            variant="outlined"
            color="primary"
            onClick={handleAddToCartAndClose}
            fullWidth={isMobile}
            size="medium"
          >
            Continuar vendo a lista
          </StyledButton>
          <StyledButton
            variant="contained"
            color="primary"
            onClick={handleAddToCartAndGoToCartView}
            fullWidth={isMobile}
            size="medium"
          >
            Adicionar e ver carrinho
          </StyledButton>
        </DialogActions>
      </Dialog>

      <Dialog open={openCartModal} onClose={handleCloseCart} maxWidth="md" fullWidth>
        <DialogContent sx={{ p: isMobile ? 2 : 3 }}>
          <Box
            sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}
          >
            <Typography variant="h5">Meu carrinho</Typography>
            <IconButton onClick={handleCloseCart} edge="end">
              <Iconify icon="eva:close-fill" />
            </IconButton>
          </Box>

          {cartItems.length > 0 ? (
            <>
              <TableContainer component={Paper} variant="outlined" sx={{ mb: 3 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Presente</TableCell>
                      <TableCell align="right">Valor</TableCell>
                      <TableCell align="center">Ações</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {cartItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                            <Box
                              component="img"
                              src={item.image}
                              alt={item.name}
                              sx={{ width: 45, height: 45, objectFit: 'contain', borderRadius: 1 }}
                            />
                            <Typography variant="body2">
                              {item.name} (x{item.quantity})
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell align="right">
                          R$ {(item.price * item.quantity).toFixed(2)}
                        </TableCell>
                        <TableCell align="center">
                          <IconButton
                            color="error"
                            size="small"
                            onClick={() => handleRemoveFromCart(item.id)}
                          >
                            <Iconify icon="eva:trash-2-outline" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              <Box sx={{ textAlign: 'right', mb: 3 }}>
                <Typography variant="h6">Total: R$ {getTotalPrice().toFixed(2)}</Typography>
              </Box>
            </>
          ) : (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Iconify
                icon="eva:shopping-cart-outline"
                width={50}
                height={50}
                sx={{ mb: 1.5, color: 'text.secondary' }}
              />
              <Typography variant="h6" sx={{ mb: 1.5 }}>
                Seu carrinho está vazio
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Continue navegando pela lista!
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions
          sx={{ px: isMobile ? 2 : 3, pb: isMobile ? 2 : 3, justifyContent: 'space-between' }}
        >
          <Button variant="outlined" onClick={handleCloseCart}>
            Continuar comprando
          </Button>
          {cartItems.length > 0 && (
            <StyledButton variant="contained" color="primary" onClick={handleGoToCartView}>
              Finalizar compra
            </StyledButton>
          )}
        </DialogActions>
      </Dialog>
    </StyledRoot>
  );
}
