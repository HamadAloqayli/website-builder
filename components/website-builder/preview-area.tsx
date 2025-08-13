'use client';

import { useWebsiteBuilder } from '@/contexts/website-builder-context';
import { SectionRenderer } from './section-renderer';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { cn } from '@/lib/utils';

export function PreviewArea() {
  const { state, reorderSections, selectSection } = useWebsiteBuilder();

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    
    const fromIndex = result.source.index;
    const toIndex = result.destination.index;
    
    if (fromIndex !== toIndex) {
      reorderSections(fromIndex, toIndex);
    }
  };

  if (state.sections.length === 0) {
    return (
      <div className="h-full flex items-center justify-center glass-effect m-2 md:m-4 rounded-2xl border-2 border-dashed border-slate-300/50 shadow-modern">
        <div className="text-center">
          <div className="text-slate-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h3 className="text-lg font-medium gradient-text mb-2">Start Building Your Website</h3>
          <p className="text-slate-600 px-4">Add sections from the library to begin creating your website</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto glass-effect m-2 md:m-4 rounded-2xl shadow-modern">
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="sections">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className={cn(
                "min-h-full transition-colors duration-200",
                snapshot.isDraggingOver && "bg-gradient-to-br from-orange-50 to-red-50"
              )}
            >
              {state.sections.map((section, index) => (
                <Draggable key={section.id} draggableId={section.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className={cn(
                        "relative group transition-all duration-300",
                        snapshot.isDragging && "shadow-modern-lg rotate-1 scale-105 z-50 rounded-xl overflow-hidden",
                        state.selectedSectionId === section.id && "ring-2 ring-orange-400 ring-inset"
                      )}
                      onClick={() => selectSection(section.id)}
                    >
                      {/* Drag handle */}
                      <div
                        {...provided.dragHandleProps}
                        className="absolute left-2 top-2 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-105"
                      >
                        <div className="gradient-primary text-white px-3 py-1 rounded-lg text-xs font-medium cursor-grab active:cursor-grabbing shadow-lg">
                          ⋮⋮ Drag to reorder
                        </div>
                      </div>
                      
                      {/* Selection indicator */}
                      {state.selectedSectionId === section.id && (
                        <div className="absolute right-2 top-2 z-10">
                          <div className="gradient-primary text-white px-3 py-1 rounded-lg text-xs font-medium shadow-lg animate-pulse">
                            Selected
                          </div>
                        </div>
                      )}
                      
                      <div className="hover:bg-gradient-to-r hover:from-orange-50/30 hover:to-red-50/30 transition-all duration-300">
                        <SectionRenderer section={section} />
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}