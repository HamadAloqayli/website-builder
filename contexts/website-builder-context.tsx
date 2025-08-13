'use client';

import React, { createContext, useContext, useReducer, useCallback } from 'react';
import { Section, WebsiteConfig } from '@/types/website-builder';

interface WebsiteBuilderState {
  sections: Section[];
  selectedSectionId: string | null;
  isDragging: boolean;
}

interface WebsiteBuilderContextType {
  state: WebsiteBuilderState;
  addSection: (type: Section['type']) => void;
  updateSection: (id: string, properties: Record<string, any>) => void;
  deleteSection: (id: string) => void;
  reorderSections: (fromIndex: number, toIndex: number) => void;
  selectSection: (id: string | null) => void;
  setDragging: (isDragging: boolean) => void;
  exportConfig: () => WebsiteConfig;
  importConfig: (config: WebsiteConfig) => void;
  clearAll: () => void;
}

const WebsiteBuilderContext = createContext<WebsiteBuilderContextType | null>(null);

type Action =
  | { type: 'ADD_SECTION'; payload: { sectionType: Section['type'] } }
  | { type: 'UPDATE_SECTION'; payload: { id: string; properties: Record<string, any> } }
  | { type: 'DELETE_SECTION'; payload: { id: string } }
  | { type: 'REORDER_SECTIONS'; payload: { fromIndex: number; toIndex: number } }
  | { type: 'SELECT_SECTION'; payload: { id: string | null } }
  | { type: 'SET_DRAGGING'; payload: { isDragging: boolean } }
  | { type: 'IMPORT_CONFIG'; payload: { config: WebsiteConfig } }
  | { type: 'CLEAR_ALL' };

const generateId = () => `section_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

const getDefaultProperties = (type: Section['type']): Record<string, any> => {
  switch (type) {
    case 'header':
      return {
        title: 'Your Website',
        navigation: ['Home', 'About', 'Services', 'Contact'],
        logo: 'https://via.placeholder.com/120x40/3B82F6/FFFFFF?text=LOGO',
        backgroundColor: '#ffffff',
        textColor: '#1f2937'
      };
    case 'hero':
      return {
        title: 'Welcome to Our Amazing Website',
        subtitle: 'Discover incredible features and services that will transform your experience',
        buttonText: 'Get Started',
        buttonUrl: '#',
        backgroundImage: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1200',
        overlayOpacity: 0.4,
        textAlign: 'center'
      };
    case 'content':
      return {
        title: 'About Our Services',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
        image: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=600',
        imagePosition: 'left',
        backgroundColor: '#ffffff'
      };
    case 'gallery':
      return {
        title: 'Our Gallery',
        images: [
          'https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg?auto=compress&cs=tinysrgb&w=400',
          'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=400',
          'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400',
          'https://images.pexels.com/photos/3184632/pexels-photo-3184632.jpeg?auto=compress&cs=tinysrgb&w=400'
        ],
        columns: 4,
        spacing: 16
      };
    case 'footer':
      return {
        companyName: 'Your Company',
        description: 'Building amazing experiences since 2024',
        links: [
          { label: 'Privacy Policy', url: '#' },
          { label: 'Terms of Service', url: '#' },
          { label: 'Contact', url: '#' }
        ],
        socialLinks: [
          { platform: 'Facebook', url: '#' },
          { platform: 'Twitter', url: '#' },
          { platform: 'LinkedIn', url: '#' }
        ],
        backgroundColor: '#1f2937',
        textColor: '#ffffff'
      };
    default:
      return {};
  }
};

function websiteBuilderReducer(state: WebsiteBuilderState, action: Action): WebsiteBuilderState {
  switch (action.type) {
    case 'ADD_SECTION':
      const newSection: Section = {
        id: generateId(),
        type: action.payload.sectionType,
        properties: getDefaultProperties(action.payload.sectionType)
      };
      return {
        ...state,
        sections: [...state.sections, newSection],
        selectedSectionId: newSection.id
      };

    case 'UPDATE_SECTION':
      return {
        ...state,
        sections: state.sections.map(section =>
          section.id === action.payload.id
            ? { ...section, properties: { ...section.properties, ...action.payload.properties } }
            : section
        )
      };

    case 'DELETE_SECTION':
      const newSections = state.sections.filter(section => section.id !== action.payload.id);
      return {
        ...state,
        sections: newSections,
        selectedSectionId: state.selectedSectionId === action.payload.id 
          ? (newSections.length > 0 ? newSections[0].id : null)
          : state.selectedSectionId
      };

    case 'REORDER_SECTIONS':
      const { fromIndex, toIndex } = action.payload;
      const newOrderSections = [...state.sections];
      const [movedSection] = newOrderSections.splice(fromIndex, 1);
      newOrderSections.splice(toIndex, 0, movedSection);
      return {
        ...state,
        sections: newOrderSections
      };

    case 'SELECT_SECTION':
      return {
        ...state,
        selectedSectionId: action.payload.id
      };

    case 'SET_DRAGGING':
      return {
        ...state,
        isDragging: action.payload.isDragging
      };

    case 'IMPORT_CONFIG':
      return {
        ...state,
        sections: action.payload.config.sections || [],
        selectedSectionId: action.payload.config.sections?.[0]?.id || null
      };

    case 'CLEAR_ALL':
      return {
        sections: [],
        selectedSectionId: null,
        isDragging: false
      };

    default:
      return state;
  }
}

const initialState: WebsiteBuilderState = {
  sections: [],
  selectedSectionId: null,
  isDragging: false
};

export function WebsiteBuilderProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(websiteBuilderReducer, initialState);

  const addSection = useCallback((type: Section['type']) => {
    dispatch({ type: 'ADD_SECTION', payload: { sectionType: type } });
  }, []);

  const updateSection = useCallback((id: string, properties: Record<string, any>) => {
    dispatch({ type: 'UPDATE_SECTION', payload: { id, properties } });
  }, []);

  const deleteSection = useCallback((id: string) => {
    dispatch({ type: 'DELETE_SECTION', payload: { id } });
  }, []);

  const reorderSections = useCallback((fromIndex: number, toIndex: number) => {
    dispatch({ type: 'REORDER_SECTIONS', payload: { fromIndex, toIndex } });
  }, []);

  const selectSection = useCallback((id: string | null) => {
    dispatch({ type: 'SELECT_SECTION', payload: { id } });
  }, []);

  const setDragging = useCallback((isDragging: boolean) => {
    dispatch({ type: 'SET_DRAGGING', payload: { isDragging } });
  }, []);

  const exportConfig = useCallback((): WebsiteConfig => {
    return {
      sections: state.sections
    };
  }, [state.sections]);

  const importConfig = useCallback((config: WebsiteConfig) => {
    dispatch({ type: 'IMPORT_CONFIG', payload: { config } });
  }, []);

  const clearAll = useCallback(() => {
    dispatch({ type: 'CLEAR_ALL' });
  }, []);

  const contextValue: WebsiteBuilderContextType = {
    state,
    addSection,
    updateSection,
    deleteSection,
    reorderSections,
    selectSection,
    setDragging,
    exportConfig,
    importConfig,
    clearAll
  };

  return (
    <WebsiteBuilderContext.Provider value={contextValue}>
      {children}
    </WebsiteBuilderContext.Provider>
  );
}

export function useWebsiteBuilder() {
  const context = useContext(WebsiteBuilderContext);
  if (!context) {
    throw new Error('useWebsiteBuilder must be used within a WebsiteBuilderProvider');
  }
  return context;
}