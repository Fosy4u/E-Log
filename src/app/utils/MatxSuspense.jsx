
import { Suspense } from 'react';
import Loading from './Loading';

const MatxSuspense = ({ children }) => {
  return <Suspense fallback={<Loading/>}>{children}</Suspense>;
};

export default MatxSuspense;
