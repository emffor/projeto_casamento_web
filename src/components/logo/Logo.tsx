import { memo } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Box, BoxProps, Link } from '@mui/material';

// ----------------------------------------------------------------------
interface LogoProps extends BoxProps {
  single?: boolean;
}

function Logo({ single = false, sx }: LogoProps) {
  return (
    <Link
      component={RouterLink}
      to="/"
      color="inherit"
      aria-label="go to homepage"
      sx={{ lineHeight: 0 }}
    >
      <Box
        sx={{
          width: single ? 64 : 75,
          lineHeight: 0,
          cursor: 'pointer',
          display: 'inline-flex',
          ...sx,
        }}
      >
        <img src="/assets/casamento/E&b.svg" alt="E&B Logo" width="100%" height="100%" />
      </Box>
    </Link>
  );
}

export default memo(Logo);
