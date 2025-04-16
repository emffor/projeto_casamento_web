import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { useTheme } from '@mui/material/styles';
import {
  AppBar,
  Toolbar,
  Container,
  Box,
  IconButton,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useScrollTrigger,
  Zoom,
  Fab,
} from '@mui/material';
import { Icon } from '@iconify/react';
import useOffSetTop from 'src/hooks/useOffSetTop';
import useResponsive from 'src/hooks/useResponsive';
import { bgBlur } from 'src/utils/cssStyles';
import { HEADER } from 'src/config-global';
import Logo from 'src/components/logo';
import HeaderShadow from '../../components/HeaderShadow';

const NAV_ITEMS = [
  { label: 'Início', id: 'hero', icon: 'mdi:home' },
  { label: 'Contagem', id: 'contagem', icon: 'mdi:clock-outline' },
  { label: 'Confirmação', id: 'confirmacao', icon: 'mdi:check-circle-outline' },
  { label: 'O Casal', id: 'casal', icon: 'mdi:heart' },
  { label: 'Cerimônia', id: 'cerimonia', icon: 'mdi:church' },
  { label: 'Recepção', id: 'recepcao', icon: 'mdi:glass-cocktail' },
  { label: 'Presentes', id: 'presentes', icon: 'mdi:gift-outline' },
  { label: 'Mensagens', id: 'mensagens', icon: 'mdi:message-text-outline' },
];

export default function Header({ headerOnDark }: { headerOnDark?: boolean }) {
  const theme = useTheme();
  const isMdUp = useResponsive('up', 'md');
  const isOffset = useOffSetTop();
  const [activeSection, setActiveSection] = useState('hero');
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Handle scroll for active link
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

  return (
    <>
      <AppBar position="fixed" color="transparent" sx={appBarSx}>
        <Toolbar
          disableGutters
          sx={{
            px: 2,
            height: { xs: HEADER.H_MOBILE, md: HEADER.H_MAIN_DESKTOP },
            ...(headerOnDark && { color: '#fff' }),
            ...(isOffset && { color: theme.palette.text.primary }),
          }}
        >
          <Container
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Logo />
            </Box>

            {isMdUp ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                {NAV_ITEMS.map(({ label, id, icon }) => (
                  <Button
                    key={id}
                    onClick={() => scrollTo(id)}
                    sx={{
                      position: 'relative',
                      textTransform: 'none',
                      '&.active::after': {
                        content: "''",
                        position: 'absolute',
                        bottom: -4,
                        left: 0,
                        width: '100%',
                        height: 2,
                        bgcolor: 'primary.main',
                        borderRadius: 1,
                        transition: 'width 0.3s ease',
                      },
                    }}
                    className={activeSection === id ? 'active' : ''}
                    startIcon={<Icon icon={icon} width={20} />}
                  >
                    {label}
                  </Button>
                ))}
              </Box>
            ) : (
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
        <Box sx={{ width: 240 }} role="presentation" onClick={() => setDrawerOpen(false)}>
          <List>
            {NAV_ITEMS.map(({ label, id }) => (
              <ListItem key={id} disablePadding>
                <ListItemButton onClick={() => scrollTo(id)} selected={activeSection === id}>
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
