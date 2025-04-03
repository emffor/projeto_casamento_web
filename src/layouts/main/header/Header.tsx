// @mui
import { useTheme } from '@mui/material/styles';
import { Box, Stack, Button, AppBar, Toolbar, Container } from '@mui/material';
// hooks
import useOffSetTop from 'src/hooks/useOffSetTop';
import useResponsive from 'src/hooks/useResponsive';
// utils
import { bgBlur } from 'src/utils/cssStyles';
// config
import { HEADER } from 'src/config-global';
// components
import Logo from 'src/components/logo';
//
import { NavMobile, NavDesktop } from '../nav';
import HeaderShadow from '../../components/HeaderShadow';

const casamentoNavConfig = [
  {
    title: 'Início',
    path: '#hero',
  },
  {
    title: 'Contagem',
    path: '#contagem',
  },
  {
    title: 'Confirmação',
    path: '#confirmacao',
  },
  {
    title: 'O Casal',
    path: '#casal',
  },
  {
    title: 'Cerimônia',
    path: '#cerimonia',
  },
  {
    title: 'Presentes',
    path: '#presentes',
  },
  { title: 'Confirme sua Presença', path: '#confirmar-presenca' },
];

// ----------------------------------------------------------------------

type Props = {
  headerOnDark: boolean;
};

export default function Header({ headerOnDark }: Props) {
  const theme = useTheme();
  const isMdUp = useResponsive('up', 'md');
  const isOffset = useOffSetTop();

  const scrollToSection = (sectionId: string) => {
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
  };

  return (
    <AppBar color="transparent" sx={{ boxShadow: 'none' }}>
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
            ...bgBlur({ color: theme.palette.background.default }),
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

          {isMdUp && <NavDesktop data={casamentoNavConfig} />}

          <Stack
            spacing={2}
            flexGrow={1}
            direction="row"
            alignItems="center"
            justifyContent="flex-end"
          >
            {isMdUp && (
              <Button
                variant="contained"
                color="primary"
                onClick={() => scrollToSection('presentes')}
              >
                Lista de Presentes
              </Button>
            )}
          </Stack>

          {!isMdUp && <NavMobile data={casamentoNavConfig} />}
        </Container>
      </Toolbar>

      {isOffset && <HeaderShadow />}
    </AppBar>
  );
}
