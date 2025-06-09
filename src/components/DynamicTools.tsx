'use client';

import dynamic from 'next/dynamic';

const ResponsiveTester = dynamic(() => import("@/components/ResponsiveTester"), {
  ssr: false,
});

const DevTools = dynamic(() => import("@/components/DevTools"), {
  ssr: false,
});

export default function DynamicTools() {
  return (
    <>
      <ResponsiveTester />
      <DevTools />
    </>
  );
}
