export interface Section {
  id: string;
  type: 'header' | 'hero' | 'content' | 'gallery' | 'footer';
  properties: Record<string, any>;
}

export interface WebsiteConfig {
  sections: Section[];
  globalStyles?: {
    primaryColor?: string;
    secondaryColor?: string;
    fontFamily?: string;
  };
}

export interface SectionTemplate {
  type: Section['type'];
  name: string;
  description: string;
  defaultProperties: Record<string, any>;
  icon: React.ReactNode;
}

export interface DragItem {
  id: string;
  type: string;
  index: number;
}