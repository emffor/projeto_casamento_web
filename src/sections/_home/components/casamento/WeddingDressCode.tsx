import { keyframes } from '@emotion/react';
import { Icon } from '@iconify/react';
import {
  Box,
  Container,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const StyledRoot = styled('div')(({ theme }) => ({
  padding: theme.spacing(12, 2),
  backgroundColor: theme.palette.background.default,
  position: 'relative',
}));

const StyledContent = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  maxWidth: 1100,
  margin: '0 auto',
  animation: `${fadeIn} 1s ease-out`,
  paddingBottom: theme.spacing(6),
}));

const Title = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(4),
  fontWeight: 600,
  position: 'relative',
  width: '100%',
  textAlign: 'center',
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

const DicasContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3, 0),
  textAlign: 'left',
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(2),
  color: theme.palette.primary.dark,
  fontSize: '1.3rem',
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

const Note = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(6),
  color: theme.palette.text.secondary,
  fontStyle: 'italic',
  maxWidth: 650,
  margin: `${theme.spacing(6)} auto 0`,
  lineHeight: 1.7,
  textAlign: 'center',
}));

const BulletIcon = () => (
  <ListItemIcon sx={{ minWidth: 'auto', marginRight: 1.5, color: 'primary.main' }}>
    <Icon icon="mdi:check-circle-outline" fontSize="1.2rem" />
  </ListItemIcon>
);

const StyledDressCodeImage = styled('img')(({ theme }) => ({
  display: 'block',
  width: '100%',
  maxWidth: '380px',
  height: 'auto',
  borderRadius: theme.shape.borderRadius,
}));

export default function WeddingDressCode() {
  const imagePath = '/assets/casamento/foto_trajes.png';

  return (
    <StyledRoot>
      <Container>
        <StyledContent>
          <Title variant="h3">Trajes</Title>

          <Typography
            variant="body1"
            sx={{
              mt: 2,
              mb: 5,
              color: 'text.secondary',
              lineHeight: 1.7,
              maxWidth: 800,
              mx: 'auto',
            }}
          >
            O dress code é <strong>esporte fino</strong>, que combina elegância e conforto, sem
            formalidades exageradas. Esperamos vê-los prontos para celebrar este dia único com
            estilo e alegria!
          </Typography>

          <Box sx={{ maxWidth: '950px', mx: 'auto' }}>
            <Grid
              container
              spacing={1}
              sx={{ mt: 4, alignItems: 'flex-start', justifyContent: 'center' }}
            >
              <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Box sx={{ width: '100%', maxWidth: '420px' }}>
                  <DicasContainer>
                    <Typography
                      variant="h5"
                      sx={{ fontWeight: 'bold', mb: 3, color: 'text.primary' }}
                    >
                      Dicas:
                    </Typography>

                    <SectionTitle variant="h6">
                      <Icon icon="mdi:face-man" />
                      Homens:
                    </SectionTitle>
                    <List dense disablePadding>
                      <ListItem disableGutters>
                        <BulletIcon />
                        <ListItemText
                          primary={
                            <>
                              <strong>Camisa:</strong> social
                            </>
                          }
                        />
                      </ListItem>
                      <ListItem disableGutters>
                        <BulletIcon />
                        <ListItemText
                          primary={
                            <>
                              <strong>Calça:</strong> alfaiataria ou chino
                            </>
                          }
                        />
                      </ListItem>
                      <ListItem disableGutters>
                        <BulletIcon />
                        <ListItemText
                          primary={
                            <>
                              <strong>Sapato:</strong> social ou mocassin
                            </>
                          }
                        />
                      </ListItem>
                      <ListItem disableGutters>
                        <BulletIcon />
                        <ListItemText
                          primary={
                            <>
                              <strong>Blazer:</strong> opcional
                            </>
                          }
                        />
                      </ListItem>
                      <ListItem disableGutters>
                        <BulletIcon />
                        <ListItemText
                          primary={
                            <>
                              <strong>Gravata:</strong> opcional
                            </>
                          }
                        />
                      </ListItem>
                    </List>

                    <SectionTitle variant="h6">
                      <Icon icon="mdi:face-woman" />
                      Mulheres:
                    </SectionTitle>
                    <List dense disablePadding>
                      <ListItem disableGutters>
                        <BulletIcon />
                        <ListItemText
                          primary={
                            <>
                              <strong>Vestido:</strong> leve e fluido, como modelos midi ou longos
                            </>
                          }
                          secondary="Tecidos sugeridos: chiffon, seda, algodão."
                        />
                      </ListItem>
                      <ListItem disableGutters>
                        <BulletIcon />
                        <ListItemText
                          primary={
                            <>
                              <strong>Cor:</strong> lisa ou estampas discretas
                            </>
                          }
                          secondary="Importante: O branco é exclusivo da noiva :)"
                        />
                      </ListItem>
                    </List>
                  </DicasContainer>
                </Box>
              </Grid>

              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                    height: '100%',
                    mt: 4, // <<< Reduzido o marginTop para subir a imagem
                  }}
                >
                  <StyledDressCodeImage
                    src={imagePath}
                    alt="Exemplo de trajes esporte fino para casamento"
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>

          <Note>
            Nosso maior desejo é que você se sinta confortável para celebrar conosco esse momento
            especial. Caso tenha dúvidas sobre o traje, não hesite em nos contatar.
          </Note>
        </StyledContent>
      </Container>
    </StyledRoot>
  );
}
