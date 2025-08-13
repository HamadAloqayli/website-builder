'use client';

import React, { useState } from 'react';
import { SectionLibrary } from './section-library';
import { PreviewArea } from './preview-area';
import { PropertyEditor } from './property-editor';
import { BuilderHeader } from './builder-header';
import { Button } from '@/components/ui/button';
import { PanelLeftOpen, PanelRightOpen, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export function BuilderLayout() {
  const [leftPanelOpen, setLeftPanelOpen] = useState(true);
  const [rightPanelOpen, setRightPanelOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setLeftPanelOpen(false);
        setRightPanelOpen(false);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <BuilderHeader />
      
      <div className="flex flex-1 overflow-hidden relative">
        {/* Left Panel - Section Library */}
        <div className={cn(
          "glass-effect border-r border-white/20 transition-all duration-300 ease-in-out z-20",
          leftPanelOpen ? (isMobile ? "absolute inset-y-0 left-0 w-80 shadow-modern-lg" : "w-80") : "w-0",
          isMobile && leftPanelOpen && "backdrop-blur-xl"
        )}>
          {leftPanelOpen && (
            <div className="h-full overflow-y-auto">
              <SectionLibrary />
            </div>
          )}
        </div>

        {/* Left Panel Toggle */}
        <div className="flex items-center z-10">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLeftPanelOpen(!leftPanelOpen)}
            className={cn(
              "h-12 w-10 rounded-none border-r border-white/20 glass-effect hover:bg-white/80 transition-all duration-200",
              isMobile && "fixed top-20 left-4 z-30 rounded-lg border shadow-modern"
            )}
          >
            <PanelLeftOpen className={cn(
              "h-4 w-4 transition-transform duration-200",
              leftPanelOpen && "rotate-180"
            )} />
          </Button>
        </div>

        {/* Center - Preview Area */}
        <div className="flex-1 bg-gradient-to-br from-slate-100/50 to-white/50 relative">
          <PreviewArea />
        </div>

        {/* Right Panel Toggle */}
        <div className="flex items-center z-10">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setRightPanelOpen(!rightPanelOpen)}
            className={cn(
              "h-12 w-10 rounded-none border-l border-white/20 glass-effect hover:bg-white/80 transition-all duration-200",
              isMobile && "fixed top-20 right-4 z-30 rounded-lg border shadow-modern"
            )}
          >
            <PanelRightOpen className={cn(
              "h-4 w-4 transition-transform duration-200",
              rightPanelOpen && "rotate-180"
            )} />
          </Button>
        </div>

        {/* Right Panel - Property Editor */}
        <div className={cn(
          "glass-effect border-l border-white/20 transition-all duration-300 ease-in-out z-20",
          rightPanelOpen ? (isMobile ? "absolute inset-y-0 right-0 w-80 shadow-modern-lg" : "w-80") : "w-0",
          isMobile && rightPanelOpen && "backdrop-blur-xl"
        )}>
          {rightPanelOpen && (
            <div className="h-full overflow-y-auto relative">
              {isMobile && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setRightPanelOpen(false)}
                  className="absolute top-4 right-4 z-10"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
              <PropertyEditor />
            </div>
          )}
        </div>
        
        {/* Mobile Overlay */}
        {isMobile && (leftPanelOpen || rightPanelOpen) && (
          <div 
            className="absolute inset-0 bg-black/20 backdrop-blur-sm z-10"
            onClick={() => {
              setLeftPanelOpen(false);
              setRightPanelOpen(false);
            }}
          />
        )}
      </div>
    </div>
  );
}