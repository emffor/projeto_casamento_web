import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { HelmetProvider } from 'react-helmet-async';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { BrowserRouter } from 'react-router-dom';
import 'simplebar-react/dist/simplebar.min.css';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import MotionLazyContainer from 'src/components/animate/MotionLazyContainer';
import ScrollToTop from 'src/components/scroll-to-top';
import { SettingsProvider, ThemeSettings } from 'src/components/settings';
import Router from 'src/routes';
import ThemeProvider from 'src/theme';
import 'yet-another-react-lightbox/plugins/captions.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
import 'yet-another-react-lightbox/styles.css';

export default function App() {
  return (
    <HelmetProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <SettingsProvider>
          <BrowserRouter>
            <ScrollToTop />
            <ThemeProvider>
              <ThemeSettings>
                <MotionLazyContainer>
                  <Router />
                </MotionLazyContainer>
              </ThemeSettings>
            </ThemeProvider>
          </BrowserRouter>
        </SettingsProvider>
      </LocalizationProvider>
    </HelmetProvider>
  );
}
