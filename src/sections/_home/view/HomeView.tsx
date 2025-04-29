import { useEffect } from 'react';
import ScrollProgress from 'src/components/scroll-progress';
import { HEADER } from 'src/config-global';
import useResponsive from 'src/hooks/useResponsive';
import { CountdownTimer, HomeHero } from '../components';
import WeddingCeremony from '../components/casamento/WeddingCeremony';
import WeddingConfirm from '../components/casamento/WeddingConfirm';
import WeddingConfirmPresence from '../components/casamento/WeddingConfirmPresence';
import WeddingDressCode from '../components/casamento/WeddingDressCode';
import WeddingGiftList from '../components/casamento/WeddingGiftList';
import WeddingMessages from '../components/casamento/WeddingMessages';
import WeddingOurHistory from '../components/casamento/WeddingOurHistory';
import WeddingReception from '../components/casamento/WeddingReception';

export default function HomeView() {
  const isMdUp = useResponsive('up', 'md');
  const headerOffset = isMdUp ? HEADER.H_MAIN_DESKTOP : HEADER.H_MOBILE;

  useEffect(() => {
    const { hash } = window.location;
    if (hash) {
      const id = hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        const top = el.getBoundingClientRect().top + window.pageYOffset - headerOffset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }
  }, [headerOffset]);

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
      <div id="recepcao">
        <WeddingReception />
      </div>
      <div id="presentes">
        <WeddingGiftList />
      </div>
      <div id="traje">
        <WeddingDressCode />
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
