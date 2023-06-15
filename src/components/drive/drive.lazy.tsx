import React, { lazy, Suspense } from 'react';

const LazyDrive = lazy(() => import('./Drive'));

const Drive = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyDrive {...props} />
  </Suspense>
);

export default Drive;
