'use client';

import { SectionTemplate } from '@/types/website-builder';
import { useWebsiteBuilder } from '@/contexts/website-builder-context';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Layout as Header, Image, Type, Grid, Zap } from 'lucide-react';

const sectionTemplates: SectionTemplate[] = [
  {
    type: 'header',
    name: 'Header',
    description: 'Navigation header with logo and menu items',
    defaultProperties: {},
    icon: <Header className="h-5 w-5" />
  },
  {
    type: 'hero',
    name: 'Hero Section',
    description: 'Eye-catching hero section with background image',
    defaultProperties: {},
    icon: <Zap className="h-5 w-5" />
  },
  {
    type: 'content',
    name: 'Content Section',
    description: 'Text content with optional image',
    defaultProperties: {},
    icon: <Type className="h-5 w-5" />
  },
  {
    type: 'gallery',
    name: 'Image Gallery',
    description: 'Responsive image gallery grid',
    defaultProperties: {},
    icon: <Grid className="h-5 w-5" />
  },
  {
    type: 'footer',
    name: 'Footer',
    description: 'Website footer with links and social media',
    defaultProperties: {},
    icon: <Image className="h-5 w-5" />
  }
];

export function SectionLibrary() {
  const { addSection } = useWebsiteBuilder();

  return (
    <div className="p-4 md:p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold gradient-text mb-2">Section Library</h2>
        <p className="text-sm text-slate-600">Click on any section to add it to your website</p>
      </div>

      <div className="space-y-3">
        {sectionTemplates.map((template) => (
          <Card 
            key={template.type}
            className="p-4 hover:shadow-modern transition-all duration-300 cursor-pointer border border-slate-200/50 hover:border-orange-200 bg-white/80 backdrop-blur-sm hover:bg-white group"
            onClick={() => addSection(template.type)}
          >
            <div className="flex items-start space-x-3">
              <div className="gradient-primary-light p-2 rounded-xl flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
                {template.icon}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-slate-900 mb-1">{template.name}</h3>
                <p className="text-sm text-slate-600 line-clamp-2">{template.description}</p>
              </div>
            </div>
            
            <Button 
              className="w-full mt-3 gradient-primary text-white border-0 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105" 
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                addSection(template.type);
              }}
            >
              Add Section
            </Button>
          </Card>
        ))}
      </div>

      <div className="mt-8 p-4 gradient-primary-light rounded-xl border border-orange-200/50">
        <h3 className="font-medium gradient-text mb-2">💡 Pro Tips</h3>
        <ul className="text-sm text-slate-700 space-y-1">
          <li>• Drag sections to reorder them</li>
          <li>• Click on any section to edit its properties</li>
          <li>• Use the preview area to see changes in real-time</li>
          <li>• Export your design to save it for later</li>
        </ul>
      </div>
    </div>
  );
}