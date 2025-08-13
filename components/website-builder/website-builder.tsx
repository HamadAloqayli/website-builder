'use client';

import { WebsiteBuilderProvider } from '@/contexts/website-builder-context';
import { BuilderLayout } from './builder-layout';

export function WebsiteBuilder() {
  return (
    <WebsiteBuilderProvider>
      <BuilderLayout />
    </WebsiteBuilderProvider>
  );
}