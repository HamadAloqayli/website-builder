'use client';

import React from 'react';
import { Section } from '@/types/website-builder';
import { HeaderSection } from './sections/header-section';
import { HeroSection } from './sections/hero-section';
import { ContentSection } from './sections/content-section';
import { GallerySection } from './sections/gallery-section';
import { FooterSection } from './sections/footer-section';

interface SectionRendererProps {
  section: Section;
}

export const SectionRenderer = React.memo(({ section }: SectionRendererProps) => {
  switch (section.type) {
    case 'header':
      return <HeaderSection {...section.properties} />;
    case 'hero':
      return <HeroSection {...section.properties} />;
    case 'content':
      return <ContentSection {...section.properties} />;
    case 'gallery':
      return <GallerySection {...section.properties} />;
    case 'footer':
      return <FooterSection {...section.properties} />;
    default:
      return (
        <div className="p-8 bg-gray-100 text-center">
          <p className="text-gray-600">Unknown section type: {section.type}</p>
        </div>
      );
  }
});

SectionRenderer.displayName = 'SectionRenderer';