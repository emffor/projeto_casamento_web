// src/components/WeddingGiftList.tsx

import { keyframes } from '@emotion/react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import Iconify from 'src/components/iconify';
import stripeService from 'src/service/stripeService';
import { weddingGifts } from 'src/utils/weddingGiftData';
import CheckoutButton from './components/CheckoutButton';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const StyledRoot = styled('div')(({ theme }) => ({
  padding: theme.spacing(10, 2),
  backgroundColor: theme.palette.grey[100],
  position: 'relative',
  overflow: 'hidden',
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
  fontWeight: 600,
  position: 'relative',
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
  backgroundSize: 'contain',
  backgroundPosition: 'center',
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
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 15px rgba(0,0,0,0.15)',
  },
}));

const CartButton = styled(Button)(({ theme }) => ({
  borderRadius: '30px',
  padding: theme.spacing(0.75, 2),
  fontWeight: 500,
  textTransform: 'none',
  width: 'auto',
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

export default function WeddingGiftList() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [openCartModal, setOpenCartModal] = useState(false);
  const [openGiftModal, setOpenGiftModal] = useState(false);
  const [selectedGift, setSelectedGift] = useState<any>(null);
  const [visibleItems, setVisibleItems] = useState(12);
  const [currentPage, setCurrentPage] = useState<'list' | 'cart'>('list');
  const [isLoadingPayment, setIsLoadingPayment] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  const itemsPerLoad = 12;

  const handleAddToCart = (gift: CartItem) => {
    setPaymentError(null);
    const exists = cartItems.find((item) => item.id === gift.id);
    if (exists) {
      setCartItems(
        cartItems.map((item) =>
          item.id === gift.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...gift, quantity: 1 }]);
    }
  };

  const handleRemoveFromCart = (id: number) => {
    setPaymentError(null);
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const handleProceedToPayment = async () => {
    if (cartItems.length === 0) {
      setPaymentError('Seu carrinho está vazio.');
      return;
    }

    setIsLoadingPayment(true);
    setPaymentError(null);

    try {
      const items = cartItems.map((item) => ({
        id: String(item.id),
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
      }));

      const { url } = await stripeService.createCheckoutSession(items);
      window.location.href = url;
    } catch (err: any) {
      console.error(err);
      setPaymentError(err.message || 'Erro ao iniciar pagamento');
      setIsLoadingPayment(false);
    }
  };

  const displayedGifts = weddingGifts.slice(0, visibleItems);
  const hasMore = visibleItems < weddingGifts.length;

  return (
    <StyledRoot>
      <Container>
        <StyledContent>
          <Title variant={isMobile ? 'h4' : 'h3'}>Nossa Lista de Presentes</Title>

          <CartButtonContainer>
            <CartButton
              variant="outlined"
              startIcon={<Iconify icon="eva:shopping-cart-fill" />}
              onClick={() => setOpenCartModal(true)}
              fullWidth={isMobile}
            >
              Ver carrinho ({cartItems.reduce((sum, i) => sum + i.quantity, 0)})
            </CartButton>
          </CartButtonContainer>

          {currentPage === 'list' && (
            <>
              <Grid container spacing={isMobile ? 2 : 3}>
                {displayedGifts.map((gift) => (
                  <Grid item key={gift.id} xs={12} sm={6} md={4} lg={3}>
                    <StyledCard>
                      <StyledCardMedia image={gift.image} title={gift.name} />
                      <CardContent>
                        <Typography
                          variant="body1"
                          sx={{
                            height: '3.2em',
                            overflow: 'hidden',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            display: '-webkit-box',
                          }}
                        >
                          {gift.name}
                        </Typography>
                        <Typography variant="h6" color="primary">
                          R$ {gift.price.toFixed(2)}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <StyledButton
                          variant="contained"
                          onClick={() => {
                            setSelectedGift(gift);
                            setOpenGiftModal(true);
                          }}
                        >
                          Presentear
                        </StyledButton>
                      </CardActions>
                    </StyledCard>
                  </Grid>
                ))}
              </Grid>

              {hasMore && (
                <Box sx={{ textAlign: 'center', mt: 4 }}>
                  <LoadMoreButton onClick={() => setVisibleItems((v) => v + itemsPerLoad)}>
                    Carregar mais presentes
                  </LoadMoreButton>
                </Box>
              )}
            </>
          )}

          {currentPage === 'cart' && (
            <Paper sx={{ p: isMobile ? 2 : 3, mb: 3 }}>
              <Typography variant="h5" sx={{ mb: 2 }}>
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
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Presente</TableCell>
                          <TableCell align="right">Valor</TableCell>
                          <TableCell align="center">Qtd.</TableCell>
                          <TableCell align="right">Subtotal</TableCell>
                          <TableCell align="center">Ações</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {cartItems.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Box
                                  component="img"
                                  src={item.image}
                                  alt={item.name}
                                  sx={{ width: 50, height: 50, mr: 1, objectFit: 'contain' }}
                                />
                                <Typography>{item.name}</Typography>
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
                              >
                                <Iconify icon="eva:trash-2-outline" />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>

                  <Box sx={{ textAlign: 'right', mt: 3 }}>
                    <Typography variant="h6">
                      Total: R${' '}
                      {cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0).toFixed(2)}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: isMobile ? 'center' : 'space-between',
                      gap: 2,
                      mt: 3,
                      flexDirection: isMobile ? 'column' : 'row',
                    }}
                  >
                    <StyledButton variant="outlined" onClick={() => setCurrentPage('list')}>
                      Continuar comprando
                    </StyledButton>

                    <CheckoutButton cartItems={cartItems} />
                  </Box>
                </>
              ) : (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <Iconify icon="eva:shopping-cart-outline" width={60} height={60} sx={{ mb: 2 }} />
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    Seu carrinho está vazio
                  </Typography>
                  <StyledButton variant="contained" onClick={() => setCurrentPage('list')}>
                    Ver lista de presentes
                  </StyledButton>
                </Box>
              )}
            </Paper>
          )}
        </StyledContent>
      </Container>

      {/* Modal de confirmação de presente */}
      <Dialog open={openGiftModal} onClose={() => setOpenGiftModal(false)} maxWidth="xs" fullWidth>
        <DialogContent sx={{ textAlign: 'center' }}>
          {selectedGift && (
            <>
              <IconButton
                onClick={() => setOpenGiftModal(false)}
                sx={{ position: 'absolute', right: 8, top: 8 }}
              >
                <Iconify icon="eva:close-fill" />
              </IconButton>

              <Box
                component="img"
                src={selectedGift.image}
                alt={selectedGift.name}
                sx={{ width: 150, height: 150, objectFit: 'contain', mb: 2 }}
              />
              <Typography variant="h6">{selectedGift.name}</Typography>
              <Typography variant="h6" color="primary" sx={{ mb: 2 }}>
                R$ {selectedGift.price.toFixed(2)}
              </Typography>
              <Typography>Deseja adicionar este presente ao carrinho?</Typography>
            </>
          )}
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', p: 2 }}>
          <StyledButton variant="outlined" onClick={() => setOpenGiftModal(false)}>
            Cancelar
          </StyledButton>
          <StyledButton
            variant="contained"
            onClick={() => {
              handleAddToCart(selectedGift);
              setOpenGiftModal(false);
              setCurrentPage('cart');
            }}
          >
            Adicionar e finalizar
          </StyledButton>
        </DialogActions>
      </Dialog>

      {/* Modal rápido de carrinho */}
      <Dialog open={openCartModal} onClose={() => setOpenCartModal(false)} maxWidth="md" fullWidth>
        <DialogContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h5">Meu carrinho</Typography>
            <IconButton onClick={() => setOpenCartModal(false)}>
              <Iconify icon="eva:close-fill" />
            </IconButton>
          </Box>

          {cartItems.length > 0 ? (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Presente</TableCell>
                    <TableCell align="right">Valor</TableCell>
                    <TableCell align="center">Qtd.</TableCell>
                    <TableCell align="center">Ações</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cartItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Box
                            component="img"
                            src={item.image}
                            alt={item.name}
                            sx={{ width: 45, height: 45, objectFit: 'contain' }}
                          />
                          <Typography>
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
          ) : (
            <Typography sx={{ textAlign: 'center', py: 4 }}>Carrinho vazio</Typography>
          )}
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3, justifyContent: 'space-between' }}>
          <Button variant="outlined" onClick={() => setOpenCartModal(false)}>
            Continuar
          </Button>
          {cartItems.length > 0 && (
            <StyledButton
              variant="contained"
              onClick={() => {
                setCurrentPage('cart');
                setOpenCartModal(false);
              }}
            >
              Finalizar compra
            </StyledButton>
          )}
        </DialogActions>
      </Dialog>
    </StyledRoot>
  );
}
