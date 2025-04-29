import { Icon } from '@iconify/react';
import {
  AppBar,
  Box,
  Button,
  Container,
  Drawer,
  Fab,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  useScrollTrigger,
  Zoom,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useCallback, useEffect, useMemo, useState } from 'react';
import Logo from 'src/components/logo';
import { HEADER } from 'src/config-global';
import useOffSetTop from 'src/hooks/useOffSetTop';
import useResponsive from 'src/hooks/useResponsive';
import { bgBlur } from 'src/utils/cssStyles';
import HeaderShadow from '../../components/HeaderShadow';

// Itens agrupados em categorias para melhor organização
const NAV_ITEMS = [
  { label: 'Início', id: 'hero', icon: 'mdi:home' },
  {
    label: 'Informações',
    icon: 'mdi:information-outline',
    children: [
      { label: 'Contagem', id: 'contagem', icon: 'mdi:clock-outline' },
      { label: 'O Casal', id: 'casal', icon: 'mdi:heart' },
      { label: 'Cerimônia', id: 'cerimonia', icon: 'mdi:church' },
      { label: 'Recepção', id: 'recepcao', icon: 'mdi:glass-cocktail' },
    ],
  },
  {
    label: 'Detalhes',
    icon: 'mdi:cards',
    children: [
      { label: 'Presentes', id: 'presentes', icon: 'mdi:gift-outline' },
      { label: 'Traje', id: 'traje', icon: 'mdi:tshirt-crew' },
    ],
  },
  { label: 'Confirmação', id: 'confirmacao', icon: 'mdi:check-circle-outline' },
  { label: 'Mensagens', id: 'mensagens', icon: 'mdi:message-text-outline' },
];

// Lista completa para menu mobile e scroll detection
const FLAT_NAV_ITEMS = NAV_ITEMS.reduce((acc, item) => {
  if (item.children) {
    return [...acc, ...item.children];
  }
  return [...acc, item];
}, [] as { label: string; id: string; icon: string }[]);

export default function Header({ headerOnDark }: { headerOnDark?: boolean }) {
  const theme = useTheme();
  const isSmUp = useResponsive('up', 'sm');
  const isMdUp = useResponsive('up', 'md');
  const isOffset = useOffSetTop();
  const [activeSection, setActiveSection] = useState('hero');
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Estado para menus dropdown
  const [anchorElMap, setAnchorElMap] = useState<{ [key: string]: HTMLElement | null }>({});

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>, label: string) => {
    setAnchorElMap({ ...anchorElMap, [label]: event.currentTarget });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleCloseMenu = (label: string) => {
    setAnchorElMap({ ...anchorElMap, [label]: null });
  };

  useEffect(() => {
    const onScroll = () => {
      let closest = activeSection;
      let minDist = Infinity;
      FLAT_NAV_ITEMS.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (el) {
          const dist = Math.abs(el.getBoundingClientRect().top);
          if (dist < minDist) {
            minDist = dist;
            closest = id;
          }
        }
      });
      if (closest !== activeSection) setActiveSection(closest);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [activeSection]);

  const scrollTo = useCallback(
    (id: string) => {
      const el = document.getElementById(id);
      if (!el) return;
      const offset = isMdUp ? HEADER.H_MAIN_DESKTOP : HEADER.H_MOBILE;
      const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
      setDrawerOpen(false);
      // Fechar todos os menus dropdown
      NAV_ITEMS.forEach((item) => {
        if (item.children) {
          handleCloseMenu(item.label);
        }
      });
    },
    [handleCloseMenu, isMdUp]
  );

  const appBarSx = useMemo(
    () => ({
      boxShadow: 'none',
      transition: theme.transitions.create(['background-color', 'height'], {
        duration: theme.transitions.duration.shortest,
      }),
      ...(isOffset && {
        ...bgBlur({ color: theme.palette.background.default }),
        backdropFilter: 'blur(6px)',
      }),
    }),
    [isOffset, theme]
  );

  const showFullNav = isMdUp;
  const showCompactNav = isSmUp && !isMdUp;

  return (
    <>
      <AppBar
        position="fixed"
        color="transparent"
        sx={{
          ...appBarSx,
          height: {
            xs: HEADER.H_MOBILE,
            sm: HEADER.H_MOBILE + 10,
            md: HEADER.H_MAIN_DESKTOP,
          },
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            px: { xs: 1, sm: 2 },
            height: {
              xs: HEADER.H_MOBILE,
              sm: HEADER.H_MOBILE + 10,
              md: HEADER.H_MAIN_DESKTOP,
            },
            ...(headerOnDark && { color: '#fff' }),
            ...(isOffset && { color: theme.palette.text.primary }),
          }}
        >
          <Container
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              maxWidth: { xs: '100%', sm: '100%', md: '1200px' },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                flexShrink: 0,
              }}
            >
              <Logo />
            </Box>

            {showFullNav && (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: { md: 1, lg: 2 },
                  flexWrap: 'nowrap',
                  ml: 2,
                }}
              >
                {NAV_ITEMS.map((item) =>
                  item.children ? (
                    <Box key={item.label}>
                      <Button
                        onClick={(e) => handleOpenMenu(e, item.label)}
                        sx={{
                          position: 'relative',
                          textTransform: 'none',
                          padding: { md: '4px 8px', lg: '6px 12px' },
                          minWidth: 'auto',
                          fontSize: { md: '0.75rem', lg: '0.875rem' },
                          whiteSpace: 'nowrap',
                        }}
                        startIcon={<Icon icon={item.icon} width={16} />}
                        endIcon={<Icon icon="mdi:chevron-down" width={16} />}
                      >
                        {item.label}
                      </Button>
                      <Menu
                        anchorEl={anchorElMap[item.label]}
                        open={Boolean(anchorElMap[item.label])}
                        onClose={() => handleCloseMenu(item.label)}
                        sx={{ mt: 1 }}
                        MenuListProps={{
                          sx: { py: 0.5 },
                        }}
                      >
                        {item.children.map((child) => (
                          <MenuItem
                            key={child.id}
                            onClick={() => {
                              scrollTo(child.id);
                              handleCloseMenu(item.label);
                            }}
                            sx={{
                              py: 1,
                              px: 2,
                              minWidth: 150,
                              fontWeight: activeSection === child.id ? 'bold' : 'normal',
                              color: activeSection === child.id ? 'primary.main' : 'inherit',
                            }}
                          >
                            <Icon icon={child.icon} style={{ marginRight: 8, fontSize: 18 }} />
                            {child.label}
                          </MenuItem>
                        ))}
                      </Menu>
                    </Box>
                  ) : (
                    <Button
                      key={item.id}
                      onClick={() => scrollTo(item.id)}
                      sx={{
                        position: 'relative',
                        textTransform: 'none',
                        padding: { md: '4px 8px', lg: '6px 12px' },
                        minWidth: 'auto',
                        fontSize: { md: '0.75rem', lg: '0.875rem' },
                        whiteSpace: 'nowrap',
                        '&.active::after': {
                          content: "''",
                          position: 'absolute',
                          bottom: -4,
                          left: 0,
                          width: '100%',
                          height: 2,
                          bgcolor: 'primary.main',
                          borderRadius: 1,
                        },
                      }}
                      className={activeSection === item.id ? 'active' : ''}
                      startIcon={<Icon icon={item.icon} width={16} />}
                    >
                      {item.label}
                    </Button>
                  )
                )}
              </Box>
            )}

            {showCompactNav && (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  flexWrap: 'wrap',
                  justifyContent: 'flex-end',
                  ml: 2,
                }}
              >
                {/* Versão compacta para tablet */}
                {NAV_ITEMS.map((item) => {
                  // Menu dropdown para itens com filhos
                  if (item.children) {
                    return (
                      <Box key={item.label}>
                        <Tooltip title={item.label}>
                          <IconButton
                            onClick={(e) => handleOpenMenu(e, item.label)}
                            sx={{
                              position: 'relative',
                              padding: '6px',
                              color: item.children.some((child) => activeSection === child.id)
                                ? 'primary.main'
                                : 'inherit',
                            }}
                          >
                            <Icon icon={item.icon} width={20} />
                          </IconButton>
                        </Tooltip>
                        <Menu
                          anchorEl={anchorElMap[item.label]}
                          open={Boolean(anchorElMap[item.label])}
                          onClose={() => handleCloseMenu(item.label)}
                          sx={{ mt: 1 }}
                        >
                          {item.children.map((child) => (
                            <MenuItem
                              key={child.id}
                              onClick={() => {
                                scrollTo(child.id);
                                handleCloseMenu(item.label);
                              }}
                              sx={{
                                py: 1,
                                minWidth: 130,
                                fontWeight: activeSection === child.id ? 'bold' : 'normal',
                                color: activeSection === child.id ? 'primary.main' : 'inherit',
                              }}
                            >
                              <Icon icon={child.icon} style={{ marginRight: 8, fontSize: 18 }} />
                              {child.label}
                            </MenuItem>
                          ))}
                        </Menu>
                      </Box>
                    );
                  }

                  // Item normal sem filhos
                  return (
                    <Tooltip key={item.id} title={item.label}>
                      <IconButton
                        onClick={() => scrollTo(item.id)}
                        sx={{
                          position: 'relative',
                          padding: '6px',
                          color: activeSection === item.id ? 'primary.main' : 'inherit',
                          '&.active::after': {
                            content: "''",
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            width: '100%',
                            height: 2,
                            bgcolor: 'primary.main',
                            borderRadius: 1,
                          },
                        }}
                        className={activeSection === item.id ? 'active' : ''}
                      >
                        <Icon icon={item.icon} width={20} />
                      </IconButton>
                    </Tooltip>
                  );
                })}
              </Box>
            )}

            {!isSmUp && (
              <IconButton onClick={() => setDrawerOpen(true)}>
                <Icon icon="mdi:menu" />
              </IconButton>
            )}
          </Container>
        </Toolbar>
        {isOffset && <HeaderShadow />}
      </AppBar>

      {/* Mobile Drawer - Versão plana com todos os itens */}
      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 240 }} role="presentation">
          <List>
            {NAV_ITEMS.map((item) =>
              item.children ? (
                <Box key={item.label}>
                  <ListItem
                    sx={{
                      pt: 1.5,
                      pb: 0.5,
                      color: 'text.secondary',
                      bgcolor: 'background.neutral',
                    }}
                  >
                    <Icon icon={item.icon} style={{ marginRight: 8 }} />
                    <ListItemText
                      primary={item.label}
                      primaryTypographyProps={{ fontWeight: 'medium', fontSize: '0.9rem' }}
                    />
                  </ListItem>
                  {item.children.map((child) => (
                    <ListItem key={child.id} disablePadding>
                      <ListItemButton
                        onClick={() => scrollTo(child.id)}
                        selected={activeSection === child.id}
                        sx={{ pl: 4 }}
                      >
                        <Icon icon={child.icon} style={{ marginRight: 8, fontSize: 18 }} />
                        <ListItemText primary={child.label} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </Box>
              ) : (
                <ListItem key={item.id} disablePadding>
                  <ListItemButton
                    onClick={() => scrollTo(item.id)}
                    selected={activeSection === item.id}
                  >
                    <Icon icon={item.icon} style={{ marginRight: 8 }} />
                    <ListItemText primary={item.label} />
                  </ListItemButton>
                </ListItem>
              )
            )}
          </List>
        </Box>
      </Drawer>

      {/* Scroll to Top */}
      <ScrollToTop />
    </>
  );
}

function ScrollToTop() {
  const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 200 });
  return (
    <Zoom in={trigger}>
      <Fab
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        size="small"
      >
        <Icon icon="mdi:arrow-up" />
      </Fab>
    </Zoom>
  );
}
