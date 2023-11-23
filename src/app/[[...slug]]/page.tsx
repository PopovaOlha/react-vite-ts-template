'use client';

import dynamic from 'next/dynamic';
import '../../index.css';

const DynamicApp = dynamic(() => import('../../App'), { ssr: false });

export default function Page() {
  return <DynamicApp />;
}
