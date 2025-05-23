import { useLocation } from 'react-router-dom';
// @mui
import { Container, Divider, Grid, IconButton, Stack, Typography } from '@mui/material';
// hooks
import { _socials } from 'src/_mock';
// components
import Iconify from 'src/components/iconify';
import Logo from 'src/components/logo';

export default function Footer() {
  const { pathname } = useLocation();
  const isHome = pathname === '/';
  const currentYear = new Date().getFullYear();

  const simpleFooter = (
    <Container sx={{ py: 8, textAlign: 'center' }}>
      <Logo single />
      <Typography variant="caption" component="div" sx={{ color: 'text.secondary' }}>
        © {currentYear} | Bruna & Eloan | Todos os direitos reservados
      </Typography>
      <Typography variant="caption" component="div" sx={{ color: 'text.disabled', mt: 1 }}>
        Desenvolvido por Eloan Ferreira
      </Typography>
    </Container>
  );

  const mainFooter = (
    <>
      <Divider />
      <Container
        sx={{
          overflow: 'hidden',
          py: { xs: 8, md: 10 },
        }}
      >
        <Grid container spacing={3} justifyContent={{ md: 'space-between' }}>
          <Grid item xs={12} md={4}>
            <Stack spacing={{ xs: 3, md: 5 }}>
              <Stack alignItems="flex-start" spacing={3}>
                <Logo />
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Casamento de Bruna & Eloan
                </Typography>
              </Stack>
              <Stack spacing={2}>
                <Typography variant="h6">Redes Sociais</Typography>
                <Stack direction="row" alignItems="center">
                  {_socials.map((social) => (
                    <IconButton key={social.value} color="primary">
                      <Iconify icon={social.icon} />
                    </IconButton>
                  ))}
                </Stack>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Container>
      <Divider />
      <Container>
        <Stack
          spacing={2.5}
          direction={{ xs: 'column', md: 'row' }}
          justifyContent="space-between"
          sx={{ py: 3, textAlign: 'center' }}
        >
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            © {currentYear} | Bruna & Eloan | Todos os direitos reservados
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.disabled' }}>
            Desenvolvido por Eloan Ferreira
          </Typography>
        </Stack>
      </Container>
    </>
  );

  return <footer>{isHome ? simpleFooter : mainFooter}</footer>;
}
