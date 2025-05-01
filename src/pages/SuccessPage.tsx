import { Helmet } from 'react-helmet-async';
import SuccessView from 'src/sections/success/view';

export default function SuccessPage() {
  return (
    <>
      <Helmet>
        <title>Pagamento Bem-Sucedido | Bruna & Eloan</title>
      </Helmet>
      <SuccessView />
    </>
  );
}
