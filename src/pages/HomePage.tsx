import { Helmet } from 'react-helmet-async';
// sections
import HomeView from 'src/sections/_home/view';

// ----------------------------------------------------------------------

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>Bruna & Eloan</title>
      </Helmet>

      <HomeView />
    </>
  );
}
