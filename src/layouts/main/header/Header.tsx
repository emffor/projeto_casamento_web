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
  Toolbar,
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

const NAV_ITEMS = [
  { label: 'Início', id: 'hero', icon: 'mdi:home' },
  { label: 'Contagem', id: 'contagem', icon: 'mdi:clock-outline' },
  { label: 'Confirmação', id: 'confirmacao', icon: 'mdi:check-circle-outline' },
  { label: 'O Casal', id: 'casal', icon: 'mdi:heart' },
  { label: 'Cerimônia', id: 'cerimonia', icon: 'mdi:church' },
  { label: 'Recepção', id: 'recepcao', icon: 'mdi:glass-cocktail' },
  { label: 'Presentes', id: 'presentes', icon: 'mdi:gift-outline' },
  { label: 'Traje', id: 'traje', icon: 'mdi:tshirt-crew' },
  { label: 'Mensagens', id: 'mensagens', icon: 'mdi:message-text-outline' },
];

export default function Header({ headerOnDark }: { headerOnDark?: boolean }) {
  const theme = useTheme();
  const isSmUp = useResponsive('up', 'sm');
  const isMdUp = useResponsive('up', 'md');
  const isOffset = useOffSetTop();
  const [activeSection, setActiveSection] = useState('hero');
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      let closest = activeSection;
      let minDist = Infinity;
      NAV_ITEMS.forEach(({ id }) => {
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
    },
    [isMdUp]
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
                {NAV_ITEMS.map(({ label, id, icon }) => (
                  <Button
                    key={id}
                    onClick={() => scrollTo(id)}
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
                    className={activeSection === id ? 'active' : ''}
                    startIcon={<Icon icon={icon} width={16} />}
                  >
                    {label}
                  </Button>
                ))}
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
                {NAV_ITEMS.map(({ id, icon }) => (
                  <IconButton
                    key={id}
                    onClick={() => scrollTo(id)}
                    sx={{
                      position: 'relative',
                      padding: '6px',
                      color: activeSection === id ? 'primary.main' : 'inherit',
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
                    className={activeSection === id ? 'active' : ''}
                  >
                    <Icon icon={icon} width={20} />
                  </IconButton>
                ))}
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

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 240 }} role="presentation">
          <List>
            {NAV_ITEMS.map(({ label, id, icon }) => (
              <ListItem key={id} disablePadding>
                <ListItemButton onClick={() => scrollTo(id)} selected={activeSection === id}>
                  <Icon icon={icon} style={{ marginRight: 8 }} />
                  <ListItemText primary={label} />
                </ListItemButton>
              </ListItem>
            ))}
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
