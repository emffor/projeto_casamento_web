import React, { useState, useMemo, useCallback } from 'react';
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
  Menu,
  MenuItem,
} from '@mui/material';
import Image from 'src/components/image';
import { keyframes } from '@emotion/react';
import GoogleMapReact from 'google-map-react';
import { Icon } from '@iconify/react';

const MAP_CONFIG = {
  INITIAL_ZOOM: 15,
  MAX_ZOOM: 20,
  MIN_ZOOM: 10,
  LOCATION: {
    lat: -3.733829,
    lng: -38.508755,
    name: 'Igreja das Irmãs Missionárias',
    address: 'Av. Rui Barbosa, 1246A - Aldeota, Fortaleza - CE, 60150-140',
  },
  API_KEY: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || '',
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

const LayersButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: 10,
  right: 100,
  zIndex: 10,
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  boxShadow: theme.shadows[2],
  '&:hover': {
    backgroundColor: theme.palette.background.default,
  },
}));

interface LocationMarkerProps {
  lat: number;
  lng: number;
}

type MapTypeId = 'roadmap' | 'satellite' | 'hybrid' | 'terrain';

interface MapTypeOption {
  id: MapTypeId;
  label: string;
  icon: string;
}

const MAP_TYPE_OPTIONS: MapTypeOption[] = [
  { id: 'roadmap', label: 'Mapa', icon: 'mdi:map' },
  { id: 'satellite', label: 'Satélite', icon: 'mdi:satellite' },
  { id: 'hybrid', label: 'Híbrido', icon: 'mdi:layers' },
  { id: 'terrain', label: 'Terreno', icon: 'mdi:terrain' },
];

const LocationMarker: React.FC<LocationMarkerProps> = () => (
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

export default function WeddingCeremony() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [zoom, setZoom] = useState(MAP_CONFIG.INITIAL_ZOOM);
  const [mapType, setMapType] = useState<MapTypeId>('roadmap');
  const [layersAnchorEl, setLayersAnchorEl] = useState<null | HTMLElement>(null);
  const layersMenuOpen = Boolean(layersAnchorEl);

  const mapCenter = useMemo(
    () => ({
      lat: MAP_CONFIG.LOCATION.lat,
      lng: MAP_CONFIG.LOCATION.lng,
    }),
    []
  );

  const handleZoomIn = useCallback(() => {
    setZoom((prev) => Math.min(prev + 1, MAP_CONFIG.MAX_ZOOM));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoom((prev) => Math.max(prev - 1, MAP_CONFIG.MIN_ZOOM));
  }, []);

  const handleExpandMap = useCallback(() => {
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${mapCenter.lat},${mapCenter.lng}`,
      '_blank'
    );
  }, [mapCenter]);

  const handleOpenRoutes = useCallback(() => {
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${mapCenter.lat},${mapCenter.lng}`,
      '_blank'
    );
  }, [mapCenter]);

  const handleLayersClick = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setLayersAnchorEl(event.currentTarget);
  }, []);

  const handleLayersClose = useCallback(() => {
    setLayersAnchorEl(null);
  }, []);

  const handleMapTypeChange = useCallback(
    (type: MapTypeId) => {
      setMapType(type);
      handleLayersClose();
    },
    [handleLayersClose]
  );

  const mapOptions = useMemo(
    () => ({
      fullscreenControl: false,
      zoomControl: false,
      mapTypeControl: false,
      streetViewControl: false,
      panControl: false,
      rotateControl: false,
      scaleControl: false,
      scrollwheel: false,
      draggable: true,
      disableDoubleClickZoom: true,
      keyboardShortcuts: false,
      clickableIcons: false,
      gestureHandling: 'cooperative',
      disableDefaultUI: true,
      mapTypeId: mapType,
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
    }),
    [mapType]
  );

  // Verifica se a API KEY está disponível
  const isGoogleMapsEnabled = Boolean(MAP_CONFIG.API_KEY);

  return (
    <StyledRoot>
      <Container maxWidth="md">
        <Fade in timeout={800}>
          <StyledContent>
            <LeafIcon src="/assets/casamento/cerimonia2.png" alt="Decoração" />
            <Title variant="h3">Cerimônia & Recepção</Title>
            <Image
              alt="Cerimônia de Casamento"
              src="/assets/casamento/igrejinha01.jpeg"
              ratio="21/9"
              sx={{
                borderRadius: 2,
                boxShadow: theme.shadows[3],
                mb: 4,
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.02)',
                },
                [theme.breakpoints.down('sm')]: {
                  height: '200px',
                  '& img': {
                    height: '100%',
                    objectFit: 'cover',
                  },
                },
              }}
            />
            <TextContent>
              <Typography variant="body1" paragraph>
                Gostaríamos muito de contar com a presença de todos vocês no momento em que nossa
                união será abençoada diante de Deus. A cerimônia será realizada na Igreja das Irmãs
                Missionárias.
              </Typography>
              <Typography
                variant="body1"
                sx={{ fontWeight: 500, color: theme.palette.primary.main }}
              >
                Seremos extremamente pontuais e contamos com sua participação neste momento
                especial.
              </Typography>
              <Typography variant="h6" sx={{ mt: 2, fontWeight: 600 }}>
                {process.env.REACT_APP_WEDDING_DATE
                  ? (() => {
                      const date = new Date(process.env.REACT_APP_WEDDING_DATE as string);
                      const day = date.toLocaleDateString('pt-BR', { day: '2-digit' });
                      const month = date.toLocaleDateString('pt-BR', { month: 'long' });
                      const year = date.toLocaleDateString('pt-BR', { year: 'numeric' });
                      const hour = date.toLocaleTimeString('pt-BR', {
                        hour: '2-digit',
                        minute: '2-digit',
                      });
                      return `${day} de ${month} de ${year} às ${hour}`;
                    })()
                  : ''}
              </Typography>
              <Typography variant="body2" sx={{ mt: 1, color: theme.palette.text.secondary }}>
                Igreja das Irmãs Missionárias
                <br />
                Av. Rui Barbosa, 1246A - Aldeota, Fortaleza - CE
                <br />
              </Typography>
            </TextContent>

            {isGoogleMapsEnabled ? (
              <MapContainer>
                <MapInfoCard elevation={3}>
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 600, color: theme.palette.primary.main }}
                  >
                    {MAP_CONFIG.LOCATION.name}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 0.5 }}>
                    {MAP_CONFIG.LOCATION.address}
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
                <Tooltip title="Camadas" placement="left">
                  <LayersButton
                    size="small"
                    onClick={handleLayersClick}
                    aria-label="Camadas do mapa"
                    sx={{
                      [theme.breakpoints.down('sm')]: {
                        right: 60,
                      },
                    }}
                  >
                    <Icon icon="mdi:layers" />
                  </LayersButton>
                </Tooltip>
                <Menu
                  anchorEl={layersAnchorEl}
                  open={layersMenuOpen}
                  onClose={handleLayersClose}
                  PaperProps={{
                    elevation: 3,
                    sx: { minWidth: 180 },
                  }}
                >
                  {MAP_TYPE_OPTIONS.map((option) => (
                    <MenuItem
                      key={option.id}
                      selected={mapType === option.id}
                      onClick={() => handleMapTypeChange(option.id)}
                      sx={{
                        gap: 1.5,
                        py: 1,
                      }}
                    >
                      <Icon icon={option.icon} style={{ fontSize: 20 }} />
                      <Typography variant="body2">{option.label}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
                {!isMobile && (
                  <RotasButton
                    size="small"
                    startIcon={<Icon icon="mdi:directions" />}
                    onClick={handleOpenRoutes}
                  >
                    Rotas
                  </RotasButton>
                )}
                {isMobile && (
                  <IconButton
                    size="small"
                    onClick={handleOpenRoutes}
                    aria-label="Obter rotas"
                    sx={{
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
                    }}
                  >
                    <Icon icon="mdi:directions" />
                  </IconButton>
                )}
                <GoogleMapReact
                  bootstrapURLKeys={{ key: MAP_CONFIG.API_KEY }}
                  center={mapCenter}
                  zoom={zoom}
                  options={mapOptions}
                >
                  <LocationMarker lat={mapCenter.lat} lng={mapCenter.lng} />
                </GoogleMapReact>
                <MapControls>
                  <Tooltip title="Aproximar" placement="left">
                    <IconButton
                      size="small"
                      onClick={handleZoomIn}
                      sx={{ borderRadius: 0 }}
                      aria-label="Aproximar mapa"
                    >
                      <Icon icon="mdi:plus" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Afastar" placement="left">
                    <IconButton
                      size="small"
                      onClick={handleZoomOut}
                      sx={{ borderRadius: 0 }}
                      aria-label="Afastar mapa"
                    >
                      <Icon icon="mdi:minus" />
                    </IconButton>
                  </Tooltip>
                </MapControls>
              </MapContainer>
            ) : (
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  mt: 4,
                  maxWidth: 1000,
                  margin: '0 auto',
                  textAlign: 'center',
                }}
              >
                <Typography variant="subtitle1" color="error">
                  Configuração do Google Maps não encontrada.
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Por favor, verifique a variável REACT_APP_GOOGLE_MAPS_API_KEY no arquivo .env
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  sx={{ mt: 2 }}
                  startIcon={<Icon icon="mdi:map-marker" />}
                  onClick={handleExpandMap}
                >
                  Ver localização no Google Maps
                </Button>
              </Paper>
            )}
          </StyledContent>
        </Fade>
      </Container>
    </StyledRoot>
  );
}
