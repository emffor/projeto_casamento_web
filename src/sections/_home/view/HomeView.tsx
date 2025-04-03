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
import WeddingConfirmPresence from '../components/casamento/WeddingConfirmPresence';

// ----------------------------------------------------------------------

export default function HomeView() {
  return (
    <>
      <ScrollProgress />
      <div id="hero">
        <HomeHero />
      </div>
      <div id="contagem">
        <CountdownTimer />
      </div>
      <div id="confirmacao">
        <WeddingConfirm />
      </div>
      <div id="casal">
        <WeddingOurHistory />
      </div>
      <div id="cerimonia">
        <WeddingCeremony />
      </div>
      <div id="presentes">
        <WeddingGiftList />
      </div>
      <div id="confirmar-presenca">
        <WeddingConfirmPresence />
      </div>
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
