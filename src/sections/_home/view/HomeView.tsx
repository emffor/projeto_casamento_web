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
import WeddingOurHistory from '../components/casamento/WeddingOurHistory';
import WeddingConfirm from '../components/casamento/WeddingConfirm';
import WeddingCeremony from '../components/casamento/WeddingCeremony';
import WeddingGiftList from '../components/casamento/WeddingGiftList';

// ----------------------------------------------------------------------

export default function HomeView() {
  return (
    <>
      <ScrollProgress />

      <HomeHero />

      <CountdownTimer />

      <WeddingConfirm />

      <WeddingOurHistory />

      <WeddingCeremony />

      <WeddingGiftList />

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
