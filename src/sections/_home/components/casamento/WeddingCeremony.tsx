import React, { useState, useMemo } from 'react';
import { styled } from '@mui/material/styles';
import {
  Box,
  Container,
  Typography,
  Button,
  IconButton,
  Paper,
  Tooltip,
  Fade,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import Image from 'src/components/image';
import { keyframes } from '@emotion/react';
import GoogleMapReact from 'google-map-react';
import { Icon } from '@iconify/react';

const INITIAL_ZOOM = 15;
const MAX_ZOOM = 20;
const MIN_ZOOM = 10;
const MAP_LOCATION = {
  lat: -3.759428819872061,
  lng: -38.52312468872212,
  name: 'Centro Educacional Padre João Piamarta',
  address: 'Av. Aguanambi, 2479, Aeroporto, Fortaleza - CE, 60415-390',
};

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulseAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

const StyledRoot = styled('div')(({ theme }) => ({
  padding: theme.spacing(10, 2),
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
  animation: `${pulseAnimation} 5s infinite ease-in-out`,
});

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

const TextContent = styled(Paper)(({ theme }) => ({
  animation: `${fadeIn} 1s ease-out forwards`,
  maxWidth: 1000,
  margin: '0 auto',
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
  padding: theme.spacing(3),
  '& p': {
    color: theme.palette.text.secondary,
    lineHeight: 1.8,
  },
}));

const MapContainer = styled(Box)(({ theme }) => ({
  height: 400,
  width: '100%',
  maxWidth: 1000,
  margin: '0 auto',
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
  boxShadow: theme.shadows[4],
  animation: `${fadeIn} 1.2s ease-out forwards`,
  position: 'relative',
  [theme.breakpoints.down('sm')]: {
    height: 280,
  },
}));

const MapInfoCard = styled(Paper)(({ theme }) => ({
  position: 'absolute',
  top: 10,
  left: 10,
  zIndex: 10,
  padding: theme.spacing(1.5, 2),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
  maxWidth: 300,
  transition: 'all 0.3s ease',
  '&:hover': {
    boxShadow: theme.shadows[6],
    transform: 'translateY(-3px)',
  },
  '& p': {
    margin: 0,
    fontSize: '0.875rem',
  },
}));

const MapControls = styled(Paper)(({ theme }) => ({
  position: 'absolute',
  bottom: 10,
  right: 10,
  zIndex: 10,
  display: 'flex',
  flexDirection: 'column',
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
  boxShadow: theme.shadows[3],
}));

const ActionButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  fontWeight: 600,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(0.75, 2),
  transition: 'all 0.2s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: theme.shadows[2],
  },
  '& .MuiButton-startIcon': {
    marginRight: theme.spacing(0.5),
  },
}));

const RotasButton = styled(ActionButton)(({ theme }) => ({
  position: 'absolute',
  top: 10,
  right: 10,
  zIndex: 10,
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  boxShadow: theme.shadows[2],
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

interface LocationMarkerProps {
  lat: number;
  lng: number;
}

const LocationMarker: React.FC<LocationMarkerProps> = ({ lat, lng }) => {
  return (
    <div
      style={{
        position: 'absolute',
        transform: 'translate(-50%, -100%)',
        animation: `${pulseAnimation} 2s infinite ease-in-out`,
      }}
    >
      <Icon
        icon="mdi:map-marker"
        style={{
          fontSize: 40,
          color: 'red',
        }}
      />
    </div>
  );
};

export default function WeddingCeremony() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [zoom, setZoom] = useState(INITIAL_ZOOM);

  const mapCenter = useMemo(
    () => ({
      lat: MAP_LOCATION.lat,
      lng: MAP_LOCATION.lng,
    }),
    []
  );

  // Handlers
  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 1, MAX_ZOOM));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 1, MIN_ZOOM));
  };

  const handleExpandMap = () => {
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${mapCenter.lat},${mapCenter.lng}`,
      '_blank'
    );
  };

  const handleOpenRoutes = () => {
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${mapCenter.lat},${mapCenter.lng}`,
      '_blank'
    );
  };

  return (
    <StyledRoot>
      <Container maxWidth="md">
        <Fade in timeout={800}>
          <StyledContent>
            <LeafIcon src="/assets/casamento/cerimonia2.png" alt="Decoração" />
            <Title variant="h3">Cerimônia & Recepção</Title>

            <Image
              alt="Cerimônia de Casamento"
              src="/assets/casamento/igrejapiamarta.png"
              ratio="21/9"
              sx={{
                borderRadius: 2,
                boxShadow: theme.shadows[3],
                mb: 4,
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.01)',
                },
              }}
            />

            <TextContent>
              <Typography variant="body1" paragraph>
                Gostaríamos muito de contar com a presença de todos vocês no momento em que nossa
                união será abençoada diante de Deus. A cerimônia será realizada na Capela Nossa
                Senhora da Assunção do Piamarta.
              </Typography>
              <Typography
                variant="body1"
                sx={{ fontWeight: 500, color: theme.palette.primary.main }}
              >
                Seremos extremamente pontuais e contamos com sua participação neste momento
                especial.
              </Typography>
              <Typography variant="h6" sx={{ mt: 2, fontWeight: 600 }}>
                31 de maio de 2025, às 19h
              </Typography>
              <Typography variant="body2" sx={{ mt: 1, color: theme.palette.text.secondary }}>
                Centro Educacional da Juventude Padre João Piamarta
                <br />
                Avenida Aguanambi, 2479, Bairro Aeroporto
                <br />
                Fortaleza - CE, 60415-390
              </Typography>
            </TextContent>

            {/* <Box sx={{ mt: 4, mb: 2, display: 'flex', justifyContent: 'center', gap: 2 }}>
              <ActionButton
                variant="outlined"
                color="primary"
                startIcon={<Icon icon="mdi:map-marker" />}
                onClick={handleExpandMap}
              >
                Ver no Google Maps
              </ActionButton>
              <ActionButton
                variant="contained"
                color="primary"
                startIcon={<Icon icon="mdi:directions" />}
                onClick={handleOpenRoutes}
              >
                Como Chegar
              </ActionButton>
            </Box> */}

            <MapContainer>
              <MapInfoCard elevation={3}>
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: 600, color: theme.palette.primary.main }}
                >
                  {MAP_LOCATION.name}
                </Typography>
                <Typography variant="body2" sx={{ mt: 0.5 }}>
                  {MAP_LOCATION.address}
                </Typography>
                <Button
                  size="small"
                  sx={{ mt: 1 }}
                  startIcon={<Icon icon="mdi:open-in-new" fontSize="small" />}
                  onClick={handleExpandMap}
                >
                  Mapa ampliado
                </Button>
              </MapInfoCard>

              {!isMobile && (
                <RotasButton
                  size="small"
                  startIcon={<Icon icon="mdi:directions" />}
                  onClick={handleOpenRoutes}
                >
                  Rotas
                </RotasButton>
              )}

              <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyDG7uE34LGLsRXS8cQkGILBbumF5sbhSsQ' }}
                center={mapCenter}
                zoom={zoom}
                options={{
                  fullscreenControl: false,
                  zoomControl: false,
                  mapTypeControl: false,
                  streetViewControl: false,
                  panControl: false,
                  rotateControl: false,
                  scaleControl: false,
                  scrollwheel: false,
                  draggable: false,
                  disableDoubleClickZoom: true,
                  keyboardShortcuts: false,
                  clickableIcons: false,
                  gestureHandling: 'none',
                  disableDefaultUI: true,
                  styles: [
                    {
                      featureType: 'poi',
                      elementType: 'labels',
                      stylers: [{ visibility: 'on' }],
                    },
                  ],
                  mapTypeControlOptions: {
                    position: 0,
                  },
                }}
              >
                <LocationMarker lat={mapCenter.lat} lng={mapCenter.lng} />
              </GoogleMapReact>

              <MapControls>
                <Tooltip title="Aproximar" placement="left">
                  <IconButton size="small" onClick={handleZoomIn} sx={{ borderRadius: 0 }}>
                    <Icon icon="mdi:plus" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Afastar" placement="left">
                  <IconButton size="small" onClick={handleZoomOut} sx={{ borderRadius: 0 }}>
                    <Icon icon="mdi:minus" />
                  </IconButton>
                </Tooltip>
              </MapControls>
            </MapContainer>
          </StyledContent>
        </Fade>
      </Container>
    </StyledRoot>
  );
}
