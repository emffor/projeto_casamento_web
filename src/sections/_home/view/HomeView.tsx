// components
import ScrollProgress from 'src/components/scroll-progress';
//
import { HomeHero, CountdownTimer } from '../components';
import WeddingOurHistory from '../components/casamento/WeddingOurHistory';
import WeddingConfirm from '../components/casamento/WeddingConfirm';
import WeddingCeremony from '../components/casamento/WeddingCeremony';
import WeddingGiftList from '../components/casamento/WeddingGiftList';
import WeddingConfirmPresence from '../components/casamento/WeddingConfirmPresence';
import WeddingMessages from '../components/casamento/WeddingMessages';

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
      <div id="mensagens">
        <WeddingMessages />
      </div>
    </>
  );
}
