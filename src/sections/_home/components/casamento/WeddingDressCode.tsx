import { keyframes } from '@emotion/react';
import { Icon } from '@iconify/react';
import { Box, Container, Grid, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const StyledRoot = styled('div')(({ theme }) => ({
  padding: theme.spacing(10, 2),
  backgroundColor: theme.palette.background.default,
  position: 'relative',
}));

const StyledContent = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  maxWidth: 900,
  margin: '0 auto',
  animation: `${fadeIn} 1s ease-out`,
}));

const Title = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(4),
  fontWeight: 600,
  position: 'relative',
  display: 'inline-block',
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

const DressCodeCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  height: '100%',
  borderRadius: theme.shape.borderRadius,
  boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 12px 28px rgba(0,0,0,0.12)',
  },
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  fontSize: '3rem',
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(2),
}));

const DressCodeTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  marginBottom: theme.spacing(1),
  color: theme.palette.primary.dark,
}));

const DressCodeDescription = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: '0.95rem',
  lineHeight: 1.6,
}));

const ExampleText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: '0.9rem',
  marginTop: theme.spacing(1),
  fontStyle: 'italic',
}));

const Note = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(4),
  color: theme.palette.text.secondary,
  fontStyle: 'italic',
  maxWidth: 650,
  margin: '0 auto',
}));

export default function WeddingDressCode() {
  const dressCodeInfo = [
    {
      title: 'Traje Esporte Fino',
      description:
        'Pedimos que os convidados venham com traje esporte fino, apropriado para uma cerimônia diurna.',
      examples:
        'Homens: Camisa social, calça, sapato social. Mulheres: Vestido midi, conjunto ou macacão elegante.',
      icon: 'mdi:tshirt-crew',
    },
    {
      title: 'Cores Sugeridas',
      description:
        'Sugerimos tons pastéis, neutros ou claros que combinam com a paleta de cores da cerimônia.',
      examples: 'Bege, azul claro, verde menta, rosa antigo, cinza claro.',
      icon: 'mdi:palette-outline',
    },
  ];

  return (
    <StyledRoot>
      <Container>
        <StyledContent>
          <Title variant="h3">Traje</Title>

          <Grid container spacing={3} sx={{ mt: 1 }}>
            {dressCodeInfo.map((item, index) => (
              <Grid item xs={12} md={6} key={index}>
                <DressCodeCard elevation={2}>
                  <IconWrapper>
                    <Icon icon={item.icon} />
                  </IconWrapper>
                  <DressCodeTitle variant="h5">{item.title}</DressCodeTitle>
                  <DressCodeDescription>{item.description}</DressCodeDescription>
                  <ExampleText>Exemplo: {item.examples}</ExampleText>
                </DressCodeCard>
              </Grid>
            ))}
          </Grid>

          <Note sx={{ mt: 4 }}>
            Nosso maior desejo é que você se sinta confortável para celebrar conosco esse momento
            especial. Caso tenha dúvidas sobre o traje, não hesite em nos contatar.
          </Note>
        </StyledContent>
      </Container>
    </StyledRoot>
  );
}
