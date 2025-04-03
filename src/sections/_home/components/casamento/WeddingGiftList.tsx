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
    background: `linear-gradient(to right, ${theme.palette.primary.light}, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
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
  backgroundColor: theme.palette.background.paper,
  margin: theme.spacing(2, 2, 0, 2),
  borderRadius: theme.shape.borderRadius,
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
  transition: 'all 0.3s',
  fontWeight: 500,
  textTransform: 'none',
  fontSize: '0.9rem',
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
  transition: 'all 0.2s',
  '&:hover': {
    transform: 'translateY(-2px)',
  },
}));

export default function WeddingGiftList() {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [openCartModal, setOpenCartModal] = useState(false);
  const [currentPage, setCurrentPage] = useState('list');
  const [visibleItems, setVisibleItems] = useState(12);
  const [selectedGift, setSelectedGift] = useState<any>(null);
  const [openGiftModal, setOpenGiftModal] = useState(false);
  const itemsPerLoad = 12;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleAddToCart = (gift: any) => {
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

  const handleViewCart = () => {
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

  const handleAddToCartAndFinalize = () => {
    if (selectedGift) {
      handleAddToCart(selectedGift);
      setOpenGiftModal(false);
      setCurrentPage('cart');
    }
  };

  // Exibe apenas os itens visíveis
  const displayedGifts = weddingGifts.slice(0, visibleItems);
  const hasMoreItems = visibleItems < weddingGifts.length;

  return (
    <StyledRoot>
      <Container>
        <StyledContent>
          <Title variant="h3">Lista de Presentes</Title>

          <CartButtonContainer>
            <CartButton
              variant="outlined"
              startIcon={<Iconify icon="eva:shopping-cart-fill" />}
              onClick={handleOpenCart}
              fullWidth={isMobile}
            >
              Ver carrinho ({cartItems.length})
            </CartButton>
          </CartButtonContainer>

          {currentPage === 'list' && (
            <>
              <Grid container spacing={3}>
                {displayedGifts.map((gift) => (
                  <Grid item key={gift.id} xs={12} sm={6} md={4} lg={3}>
                    <StyledCard>
                      <StyledCardMedia image={gift.image} title={gift.name} />
                      <CardContent sx={{ flexGrow: 1, py: 1.5 }}>
                        <Typography
                          gutterBottom
                          variant="subtitle2"
                          component="div"
                          sx={{ height: 40, fontSize: '0.85rem' }}
                        >
                          {gift.name}
                        </Typography>
                        <Typography variant="body1" color="primary" sx={{ fontWeight: 600 }}>
                          R$ {gift.price.toFixed(2)}
                        </Typography>
                      </CardContent>
                      <CardActions sx={{ justifyContent: 'center', pb: 1.5, pt: 0 }}>
                        <StyledButton
                          variant="contained"
                          color="primary"
                          onClick={() => handleOpenGiftModal(gift)}
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
                  >
                    Carregar mais presentes
                  </LoadMoreButton>
                </Box>
              )}
            </>
          )}

          {currentPage === 'cart' && (
            <Paper sx={{ p: 3, mb: 3, maxWidth: 900, mx: 'auto' }}>
              <Typography variant="h5" sx={{ mb: 3 }}>
                Meu carrinho
              </Typography>

              {cartItems.length > 0 ? (
                <>
                  <TableContainer component={Paper} variant="outlined">
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Descrição do presente</TableCell>
                          <TableCell align="right">Valor</TableCell>
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
                                  sx={{ width: 60, height: 60, mr: 2, objectFit: 'contain' }}
                                />
                                <Typography variant="body1">{item.name}</Typography>
                              </Box>
                            </TableCell>
                            <TableCell align="right">
                              <Typography variant="body1">R$ {item.price.toFixed(2)}</Typography>
                            </TableCell>
                            <TableCell align="center">
                              <Button
                                color="error"
                                onClick={() => handleRemoveFromCart(item.id)}
                                sx={{ textTransform: 'none' }}
                              >
                                Remover
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>

                  <Box sx={{ textAlign: 'right', mt: 3, mb: 3 }}>
                    <Typography variant="h6">Total: R$ {getTotalPrice().toFixed(2)}</Typography>
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                    <StyledButton
                      variant="outlined"
                      color="primary"
                      onClick={handleContinueShopping}
                    >
                      Adicionar mais itens
                    </StyledButton>
                    <StyledButton variant="contained" color="primary">
                      Continuar compra
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
                  >
                    Ver lista de presentes
                  </StyledButton>
                </Box>
              )}
            </Paper>
          )}
        </StyledContent>
      </Container>

      <Dialog open={openGiftModal} onClose={handleCloseGiftModal} maxWidth="sm" fullWidth>
        <DialogContent>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <IconButton onClick={handleCloseGiftModal} edge="end">
              <Iconify icon="eva:close-fill" />
            </IconButton>
          </Box>

          {selectedGift && (
            <Box sx={{ textAlign: 'center', py: 2 }}>
              <Box
                component="img"
                src={selectedGift.image}
                alt={selectedGift.name}
                sx={{ maxWidth: '200px', maxHeight: '200px', objectFit: 'contain', mb: 3 }}
              />
              <Typography variant="h5" sx={{ mb: 2 }}>
                {selectedGift.name}
              </Typography>
              <Typography variant="h6" color="primary" sx={{ mb: 3 }}>
                R$ {selectedGift.price.toFixed(2)}
              </Typography>

              <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                Você deseja adicionar este presente ao seu carrinho?
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', px: 3, pb: 3 }}>
          <StyledButton
            variant="outlined"
            color="primary"
            onClick={handleAddToCartAndClose}
            sx={{ mr: 2 }}
          >
            Continuar comprando
          </StyledButton>
          <StyledButton variant="contained" color="primary" onClick={handleAddToCartAndFinalize}>
            Finalizar compra
          </StyledButton>
        </DialogActions>
      </Dialog>

      <Dialog open={openCartModal} onClose={handleCloseCart} maxWidth="md" fullWidth>
        <DialogContent>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <IconButton onClick={handleCloseCart} edge="end">
              <Iconify icon="eva:close-fill" />
            </IconButton>
          </Box>

          <Typography variant="h5" sx={{ mb: 3 }}>
            Meu carrinho
          </Typography>

          {cartItems.length > 0 ? (
            <>
              <TableContainer component={Paper} variant="outlined">
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Descrição do presente</TableCell>
                      <TableCell align="right">Valor</TableCell>
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
                              sx={{ width: 60, height: 60, mr: 2, objectFit: 'contain' }}
                            />
                            <Typography variant="body1">{item.name}</Typography>
                          </Box>
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="body1">R$ {item.price.toFixed(2)}</Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Button
                            color="error"
                            onClick={() => handleRemoveFromCart(item.id)}
                            sx={{ textTransform: 'none' }}
                          >
                            Remover
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              <Box sx={{ textAlign: 'right', mt: 3 }}>
                <Typography variant="h6">Total: R$ {getTotalPrice().toFixed(2)}</Typography>
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
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button variant="outlined" onClick={handleCloseCart} sx={{ mr: 1 }}>
            Continuar comprando
          </Button>
          {cartItems.length > 0 && (
            <StyledButton variant="contained" color="primary" onClick={handleViewCart}>
              Finalizar compra
            </StyledButton>
          )}
        </DialogActions>
      </Dialog>
    </StyledRoot>
  );
}
