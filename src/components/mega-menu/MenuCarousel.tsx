import { useRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Box, Link } from '@mui/material';
import { useTheme } from '@mui/material/styles';
// types
import { MenuCarouselProps } from './types';
//
import Carousel, { CarouselArrows, CarouselDots } from '../carousel';
import Image from '../image';
import TextMaxLine from '../text-max-line';

// ----------------------------------------------------------------------

export default function MenuCarousel({ products, numberShow, sx }: MenuCarouselProps) {
  const theme = useTheme();

  const carouselRef = useRef<any | null>(null);

  const carouselSettings = {
    dots: true,
    arrows: false,
    slidesToShow: numberShow,
    slidesToScroll: numberShow,
    rtl: Boolean(theme.direction === 'rtl'),
    ...CarouselDots({
      sx: { mt: 3 },
    }),
  };

  const handlePrev = () => {
    carouselRef.current?.slickPrev();
  };

  const handleNext = () => {
    carouselRef.current?.slickNext();
  };

  return (
    <Box sx={{ position: 'relative', pt: 2, ...sx }}>
      <CarouselArrows
        filled
        onNext={handleNext}
        onPrev={handlePrev}
        leftButtonProps={{
          size: 'small',
          sx: { top: 'calc(50% - 40px)', left: -8 },
        }}
        rightButtonProps={{
          size: 'small',
          sx: { top: 'calc(50% - 40px)', right: -8 },
        }}
      >
        <Carousel ref={carouselRef} {...carouselSettings}>
          {products.map((product) => (
            <Box key={product.name} sx={{ px: 1, textAlign: 'center' }}>
              <Link
                component={RouterLink}
                to={product.path}
                color="inherit"
                underline="none"
                sx={{
                  display: 'block',
                  transition: theme.transitions.create('all'),
                  '&:hover': { color: 'primary.main' },
                }}
              >
                <Image
                  alt={product.image}
                  src={product.image}
                  ratio="1/1"
                  disabledEffect
                  sx={{ borderRadius: 1, mb: 1 }}
                />

                <TextMaxLine variant="caption" sx={{ fontWeight: 'fontWeightSemiBold' }}>
                  {product.name}
                </TextMaxLine>
              </Link>
            </Box>
          ))}
        </Carousel>
      </CarouselArrows>
    </Box>
  );
}
