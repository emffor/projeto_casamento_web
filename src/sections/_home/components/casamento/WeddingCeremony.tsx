import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Container, Typography, Button, IconButton } from '@mui/material';
import Image from 'src/components/image';
import { keyframes } from '@emotion/react';
import GoogleMapReact from 'google-map-react';
import { Icon } from '@iconify/react';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const StyledRoot = styled('div')(({ theme }) => ({
  padding: theme.spacing(8, 2),
  backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled(Box)({
  textAlign: 'center',
  justifyItems: 'center',
  maxWidth: 1000,
  margin: '0 auto',
});

const LeafIcon = styled('img')({
  width: 100,
  marginBottom: 16,
});

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

const TextContent = styled(Box)(({ theme }) => ({
  animation: `${fadeIn} 1s ease-out forwards`,
  maxWidth: 800,
  margin: '0 auto',
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
  '& p': {
    color: theme.palette.text.secondary,
    lineHeight: 1.7,
  },
}));

const MapContainer = styled(Box)(({ theme }) => ({
  height: 340,
  width: '100%',
  maxWidth: 1000,
  margin: '0 auto',
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
  boxShadow: theme.shadows[3],
  animation: `${fadeIn} 1.2s ease-out forwards`,
  position: 'relative',
  [theme.breakpoints.down('sm')]: {
    height: 250,
  },
}));

const MapInfoCard = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 10,
  left: 10,
  zIndex: 10,
  backgroundColor: 'white',
  padding: theme.spacing(1, 2),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[2],
  maxWidth: 250,
  '& p': {
    margin: 0,
    fontSize: '0.875rem',
  },
}));

const MapControls = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: 10,
  right: 10,
  zIndex: 10,
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: 'white',
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[2],
}));

const ExpandButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  color: theme.palette.primary.main,
  fontSize: '0.75rem',
  padding: theme.spacing(0.5, 1),
}));

const RotasButton = styled(Button)(({ theme }) => ({
  position: 'absolute',
  top: 10,
  right: 10,
  zIndex: 10,
  textTransform: 'none',
  color: theme.palette.primary.main,
  backgroundColor: 'white',
  fontSize: '0.75rem',
  padding: theme.spacing(0.5, 1),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[2],
}));

interface LocationMarkerProps {
  lat: number;
  lng: number;
}

const LocationMarker: React.FC<LocationMarkerProps> = () => (
  <div style={{ color: 'red', fontSize: 32 }}>
    <span role="img" aria-label="pin">
      📍
    </span>
  </div>
);

export default function WeddingCeremony() {
  const [zoom, setZoom] = useState(15);

  const defaultProps = {
    center: {
      lat: -3.7598224163722693,
      lng: -38.5225721445037,
    },
    zoom,
  };

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 1, 20));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 1, 10));
  };

  const handleExpandMap = () => {
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${defaultProps.center.lat},${defaultProps.center.lng}`,
      '_blank'
    );
  };

  const handleOpenRoutes = () => {
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${defaultProps.center.lat},${defaultProps.center.lng}`,
      '_blank'
    );
  };

  return (
    <StyledRoot>
      <Container maxWidth="md">
        <StyledContent>
          <LeafIcon src="/assets/casamento/cerimonia2.png" alt="Decoração" />
          <Title variant="h3">Cerimônia</Title>
          <Image
            alt="Cerimônia de Casamento"
            src="/assets/casamento/igrejapiamarta.png"
            ratio="21/9"
            sx={{ borderRadius: 1 }}
          />
          <TextContent>
            <Typography variant="body1">
              Gostaríamos muito de contar com a presença de todos vocês no momento em que nossa
              união será abençoada diante de Deus. A cerimônia será realizada na Capela Nossa
              Senhora da Assunção do Piamarta. Seremos extremamente pontuais e contamos com sua
              participação neste momento especial. Dia 31 de maio de 2025, às 19h. Centro
              Educacional da Juventude Padre João Piamarta - Avenida Aguanambi, 2479, Bairro
              Aeroporto, Fortaleza - CE, 60415-390
            </Typography>
          </TextContent>
          <MapContainer>
            <MapInfoCard>
              <Typography variant="subtitle2">Centro Educacional Padre João Piamarta</Typography>
              <Typography variant="body2">
                Av. Aguanambi, 2479, Aeroporto, Fortaleza - CE, 60415-390
              </Typography>
              <ExpandButton onClick={handleExpandMap}>Ver mapa ampliado</ExpandButton>
            </MapInfoCard>

            <RotasButton onClick={handleOpenRoutes}>Rotas</RotasButton>

            <GoogleMapReact
              bootstrapURLKeys={{ key: 'AIzaSyDG7uE34LGLsRXS8cQkGILBbumF5sbhSsQ' }}
              center={defaultProps.center}
              zoom={zoom}
              options={{
                fullscreenControl: false,
                zoomControl: false,
                mapTypeControl: true,
                streetViewControl: false,
                panControl: false,
                rotateControl: false,
                scaleControl: false,
                scrollwheel: true,
                mapTypeControlOptions: {
                  position: 0,
                },
              }}
            >
              <LocationMarker lat={defaultProps.center.lat} lng={defaultProps.center.lng} />
            </GoogleMapReact>

            <MapControls>
              <IconButton size="small" onClick={handleZoomIn}>
                <Icon icon="mdi:magnify-plus" fontSize="small" />
              </IconButton>
              <IconButton size="small" onClick={handleZoomOut}>
                <Icon icon="mdi:magnify-minus" fontSize="small" />
              </IconButton>
            </MapControls>
          </MapContainer>
        </StyledContent>
      </Container>
    </StyledRoot>
  );
}
