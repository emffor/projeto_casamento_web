// @mui
import { Box, Stack, Drawer, Divider, Typography, IconButton, Tooltip } from '@mui/material';
// config
import { NAV } from 'src/config-global';
//
import Iconify from '../../iconify';
import Scrollbar from '../../scrollbar';
//
import { useSettingsContext } from '../SettingsContext';
import BadgeDot from './components/BadgeDot';
import ToggleButton from './components/ToggleButton';

// ----------------------------------------------------------------------

export default function SettingsDrawer() {
  const { open, onToggle, onClose, onResetSetting, notDefault } = useSettingsContext();

  return (
    <>
      <ToggleButton open={open} notDefault={notDefault} onToggle={onToggle} />

      <Drawer
        open={open}
        anchor="right"
        PaperProps={{
          sx: {
            width: NAV.W_DRAWER,
            bgcolor: 'background.default',
          },
        }}
        onClose={onClose}
      >
        <Stack direction="row" alignItems="center" sx={{ py: 2, px: 3 }}>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Settings
          </Typography>

          <Tooltip title="Reset">
            <Box sx={{ position: 'relative' }}>
              {notDefault && <BadgeDot />}
              <IconButton onClick={onResetSetting}>
                <Iconify icon="carbon:reset" />
              </IconButton>
            </Box>
          </Tooltip>

          <IconButton onClick={onClose}>
            <Iconify icon="carbon:close" />
          </IconButton>
        </Stack>

        <Divider />

        <Scrollbar>
          <Box sx={{ pb: 10 }}>
            {/* Escolher dark mode */}
            {/* <ModeOptions /> */}

            {/* Escolher direção */}
            {/* <DirectionOptions /> */}

            {/* Escolher cores */}
            {/* <ColorPresetsOptions /> */}
          </Box>
        </Scrollbar>
      </Drawer>
    </>
  );
}
