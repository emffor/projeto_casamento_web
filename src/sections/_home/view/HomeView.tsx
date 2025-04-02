// _mock
import { _pricingHome } from 'src/_mock';
// components
import ScrollProgress from 'src/components/scroll-progress';
//
import PricingHome from '../../pricing/home';
import {
  HomeHero,
  HomeFAQs,
  HomeNewStart,
  HomeForDesigner,
  HomeCombination,
  HomeAdvertisement,
  HomeFeatureHighlights,
  HomeFlexibleComponents,
  CountdownTimer,
} from '../components';
import WeddingDescription from '../components/casamento/WeddingDescription';
import WeddingOurHistory from '../components/casamento/WeddingOurHistory';

// ----------------------------------------------------------------------

export default function HomeView() {
  return (
    <>
      <ScrollProgress />

      <HomeHero />

      <CountdownTimer />

      <WeddingDescription />

      <WeddingOurHistory />

      {/* <HomeNewStart /> */}

      {/* <HomeFlexibleComponents /> */}

      {/* <HomeFeatureHighlights /> */}

      {/* <HomeForDesigner /> */}

      {/* <PricingHome plans={_pricingHome} /> */}

      {/* <HomeFAQs /> */}

      {/* <HomeCombination /> */}

      {/* <HomeAdvertisement /> */}
    </>
  );
}
