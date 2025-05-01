import { Helmet } from 'react-helmet-async';
import FailureView from 'src/sections/failure/view';

export default function FailurePage() {
  return (
    <>
      <Helmet>
        <title>Pagamento Não Realizado | Bruna & Eloan</title>
      </Helmet>
      <FailureView />
    </>
  );
}
