import React, { useState, useCallback, useMemo } from 'react';
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Stack,
  Button,
  AppBar,
  Toolbar,
  Container,
  IconButton,
  Tooltip,
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
import { NavMobile, NavDesktop } from '../nav';
import HeaderShadow from '../../components/HeaderShadow';

const WEDDING_NAV_CONFIG = [
  { title: 'Início', path: '#hero', icon: 'mdi:home' },
  { title: 'Contagem', path: '#contagem', icon: 'mdi:clock-outline' },
  { title: 'Confirmação', path: '#confirmacao', icon: 'mdi:check-circle-outline' },
  { title: 'O Casal', path: '#casal', icon: 'mdi:heart' },
  { title: 'Cerimônia', path: '#cerimonia', icon: 'mdi:church' },
  { title: 'Recepção', path: '#recepcao', icon: 'mdi:glass-cocktail' },
  { title: 'Presentes', path: '#presentes', icon: 'mdi:gift-outline' },
  { title: 'Mensagens', path: '#mensagens', icon: 'mdi:message-text-outline' },
];

function ScrollToTop() {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <Zoom in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          zIndex: 9,
        }}
      >
        <Fab color="primary" size="small" aria-label="scroll back to top">
          <Icon icon="mdi:arrow-up" width={24} />
        </Fab>
      </Box>
    </Zoom>
  );
}

interface HeaderProps {
  headerOnDark: boolean;
}

export default function Header({ headerOnDark }: HeaderProps) {
  const theme = useTheme();
  const isMdUp = useResponsive('up', 'md');
  const isOffset = useOffSetTop();
  const [activeSection, setActiveSection] = useState<string>('hero');

  React.useEffect(() => {
    const handleScroll = () => {
      const sections = WEDDING_NAV_CONFIG.map((item) => item.path.substring(1));

      let current = '';
      let minDistance = Number.MAX_VALUE;

      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          const distance = Math.abs(rect.top);

          if (distance < minDistance) {
            minDistance = distance;
            current = section;
          }
        }
      });

      if (current && current !== activeSection) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [activeSection]);

  const scrollToSection = useCallback(
    (sectionId: string) => {
      const element = document.getElementById(sectionId);
      if (element) {
        const headerOffset = isMdUp ? HEADER.H_MAIN_DESKTOP : HEADER.H_MOBILE;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    },
    [isMdUp]
  );

  const appBarStyle = useMemo(() => {
    return {
      boxShadow: 'none',
      ...(isOffset && {
        ...bgBlur({ color: theme.palette.background.default }),
        backdropFilter: 'blur(8px)',
      }),
    };
  }, [isOffset, theme]);

  return (
    <>
      <AppBar color="transparent" sx={appBarStyle}>
        <Toolbar
          disableGutters
          sx={{
            height: {
              xs: HEADER.H_MOBILE,
              md: HEADER.H_MAIN_DESKTOP,
            },
            transition: theme.transitions.create(['height', 'background-color'], {
              easing: theme.transitions.easing.easeInOut,
              duration: theme.transitions.duration.shorter,
            }),
            ...(headerOnDark && {
              color: 'common.white',
            }),
            ...(isOffset && {
              color: 'text.primary',
              height: {
                md: HEADER.H_MAIN_DESKTOP - 16,
              },
            }),
          }}
        >
          <Container sx={{ height: 1, display: 'flex', alignItems: 'center' }}>
            <Box sx={{ lineHeight: 0, position: 'relative' }}>
              <Logo />
            </Box>

            {isMdUp && (
              <NavDesktop
                data={WEDDING_NAV_CONFIG.map((item) => ({
                  ...item,
                  active: `#${activeSection}` === item.path,
                  icon: <Icon icon={item.icon} />,
                }))}
              />
            )}

            <Stack
              spacing={2}
              flexGrow={1}
              direction="row"
              alignItems="center"
              justifyContent="flex-end"
            >
              {isMdUp && (
                <>
                  <Tooltip title="Lista de Presentes">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => scrollToSection('presentes')}
                      startIcon={<Icon icon="mdi:gift" />}
                      sx={{
                        borderRadius: '20px',
                        transition: 'all 0.2s',
                        '&:hover': {
                          transform: 'translateY(-3px)',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                        },
                      }}
                    >
                      Lista de Presentes
                    </Button>
                  </Tooltip>

                  <Tooltip title="Confirmar Presença">
                    <IconButton
                      color="primary"
                      onClick={() => scrollToSection('confirmar-presenca')}
                      sx={{
                        backgroundColor: theme.palette.background.paper,
                        boxShadow: theme.shadows[1],
                        '&:hover': {
                          backgroundColor: theme.palette.primary.lighter,
                        },
                      }}
                    >
                      <Icon icon="mdi:calendar-check" width={24} />
                    </IconButton>
                  </Tooltip>
                </>
              )}
            </Stack>
            {!isMdUp && (
              <NavMobile
                data={WEDDING_NAV_CONFIG.map((item) => ({
                  ...item,
                  active: `#${activeSection}` === item.path,
                  icon: <Icon icon={item.icon} />,
                }))}
              />
            )}
          </Container>
        </Toolbar>

        {isOffset && <HeaderShadow />}
      </AppBar>

      <ScrollToTop />
    </>
  );
}
