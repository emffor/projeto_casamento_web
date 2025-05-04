/* eslint-disable react-hooks/exhaustive-deps */
import { keyframes } from '@emotion/react';
import {
  Box, Button, Card, CardActions, CardContent, CardMedia, CircularProgress,
  Container, Dialog, DialogActions, DialogContent, Grid, IconButton, Paper,
  styled, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Typography, useMediaQuery, useTheme,
} from '@mui/material';
import React, { useCallback, useMemo, useState } from 'react';
import Iconify from 'src/components/iconify';
import API_CONFIG from 'src/config/api';
import { weddingGifts as allWeddingGifts } from 'src/utils/weddingGiftData';

interface CartItem {
  id: number; name: string; price: number; image: string; quantity: number;
}
interface Gift {
  id: number; name: string; price: number; image: string;
}

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

const initiateCheckout = async (cartItems: CartItem[], totalAmount: number) => {
  try {
    const items = cartItems.map(item => ({
      title: item.name,
      description: item.name,
      quantity: item.quantity,
      unit_price: Math.round(item.price * 100), 
      picture_url: item.image.startsWith('http') ? item.image : `${window.location.origin}${item.image}`
    }));

    const checkoutData = {
      items: items,
      success_url: `${window.location.origin}/success`,
      cancel_url: `${window.location.origin}/canceled`,
      metadata: {
        reference_id: `CASAMENTO-${Date.now()}`,
        notification_url: `${API_CONFIG.BASE_URL}/webhooks`
      }
    };

    console.log("Enviando dados para criar checkout:", JSON.stringify(checkoutData, null, 2));
    
    // URL correta usando API_CONFIG
    const response = await fetch(`${API_CONFIG.BASE_URL}/create-checkout`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(checkoutData),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error("Erro ao criar checkout:", result);
      throw new Error(result?.error || 'Erro ao criar checkout');
    }

    console.log("Checkout criado com sucesso:", result);
    window.location.href = result.checkout_url;
    return { success: true, data: result };
  } catch (err: any) {
    console.error('Erro ao iniciar checkout:', err);
    return { success: false, error: err.message || 'Ocorreu um erro inesperado.' };
  }
};

// --- Subcomponentes ---
interface CartViewProps {
  cartItems: CartItem[];
  onRemoveItem: (id: number) => void;
  onContinueShopping: () => void;
  onCheckout: () => void;
  isProcessing: boolean;
  error: string | null;
  isMobile: boolean;
}

const CartView: React.FC<CartViewProps> = ({
  cartItems, onRemoveItem, onContinueShopping, onCheckout, 
  isProcessing, error, isMobile
}) => {
  const totalPrice = useMemo(() => cartItems.reduce((total, item) => total + item.price * item.quantity, 0), [cartItems]);

  return (
    <Paper sx={{ p: isMobile ? 2 : 3, mb: 3, maxWidth: 900, mx: 'auto' }}>
      <Typography variant="h5" sx={{ mb: 3 }}>Meu carrinho</Typography>
      
      {error && (
        <Typography color="error" sx={{ mb: 2, textAlign: 'center' }}>{error}</Typography>
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

          <Box sx={{ display: 'flex', justifyContent: isMobile ? 'center' : 'space-between', 
                     flexDirection: isMobile ? 'column' : 'row', gap: 2, mt: 3 }}>
            <StyledButton variant="outlined" color="primary" onClick={onContinueShopping} 
                         startIcon={<Iconify icon="eva:arrow-back-outline" />} 
                         sx={{ width: isMobile ? '100%' : 'auto' }}>
              Adicionar mais itens
            </StyledButton>
            <StyledButton variant="contained" color="primary" onClick={onCheckout}
                         disabled={isProcessing} 
                         startIcon={isProcessing ? 
                           <CircularProgress size={20} color="inherit" /> : 
                           <Iconify icon="mdi:credit-card-check-outline" />}
                         sx={{ width: isMobile ? '100%' : 'auto' }}>
              {isProcessing ? 'Processando...' : 'Ir para Pagamento'}
            </StyledButton>
          </Box>
        </>
      ) : (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Iconify icon="eva:shopping-cart-outline" width={60} height={60} sx={{ mb: 2, color: 'text.secondary' }} />
          <Typography variant="h6" sx={{ mb: 2 }}>Seu carrinho está vazio</Typography>
          <Typography variant="body2" sx={{ mb: 3, color: 'text.secondary' }}>
            Adicione presentes à sua lista para presentear os noivos
          </Typography>
          <StyledButton variant="contained" color="primary" onClick={onContinueShopping} 
                       startIcon={<Iconify icon="eva:gift-outline" />}>
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
  const [checkoutState, setCheckoutState] = useState<{ 
    loading: boolean; 
    error: string | null; 
  }>({ loading: false, error: null });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const itemsPerLoad = 12;

  const displayedGifts = useMemo(() => allWeddingGifts.slice(0, visibleItemsCount), [visibleItemsCount]);
  const hasMoreItems = useMemo(() => visibleItemsCount < allWeddingGifts.length, [visibleItemsCount]);
  const totalCartItems = useMemo(() => cartItems.reduce((acc, item) => acc + item.quantity, 0), [cartItems]);
  const totalCartPrice = useMemo(() => cartItems.reduce((total, item) => total + item.price * item.quantity, 0), [cartItems]);

  const handleAddToCart = useCallback((gift: Gift) => {
    setCheckoutState({ loading: false, error: null });
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
    setCheckoutState({ loading: false, error: null });
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

  // Nova função para iniciar o checkout
  const handleProceedToCheckout = useCallback(async () => {
    if (cartItems.length === 0) {
      setCheckoutState({ loading: false, error: 'Seu carrinho está vazio.' });
      return;
    }

    setCheckoutState({ loading: true, error: null });

    const result = await initiateCheckout(cartItems, totalCartPrice);

    if (!result.success) {
      setCheckoutState({ loading: false, error: `Erro: ${result.error}` });
    }
    // Se bem-sucedido, o redirecionamento é feito dentro da função initiateCheckout
  }, [cartItems, totalCartPrice]);

  return (
    <StyledRoot>
      <Container>
        <StyledContent>
          <Title variant={isMobile ? 'h4' : 'h3'}>Nossa Lista de Presentes</Title>
          <CartButtonContainer>
            <CartButton 
              variant="outlined" 
              startIcon={<Iconify icon="eva:shopping-cart-fill" />}
              onClick={handleOpenCartModal} 
              fullWidth={isMobile} 
              size={isMobile ? 'medium' : 'large'}
            >
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
              onRemoveItem={handleRemoveFromCart}
              onContinueShopping={handleContinueShopping}
              onCheckout={handleProceedToCheckout}
              isProcessing={checkoutState.loading}
              error={checkoutState.error}
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