'use client';

import { useState } from 'react';
import { useWebsiteBuilder } from '@/contexts/website-builder-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Trash2, Settings } from 'lucide-react';
import { Card } from '@/components/ui/card';

export function PropertyEditor() {
  const { state, updateSection, deleteSection } = useWebsiteBuilder();
  const [localProperties, setLocalProperties] = useState<Record<string, any>>({});
  
  const selectedSection = state.sections.find(section => section.id === state.selectedSectionId);

  const handlePropertyChange = (key: string, value: any) => {
    const newProperties = { ...localProperties, [key]: value };
    setLocalProperties(newProperties);
    
    if (state.selectedSectionId) {
      updateSection(state.selectedSectionId, { [key]: value });
    }
  };

  const handleDelete = () => {
    if (state.selectedSectionId && confirm('Are you sure you want to delete this section?')) {
      deleteSection(state.selectedSectionId);
    }
  };

  if (!selectedSection) {
    return (
      <div className="p-4 md:p-6">
        <div className="text-center py-12">
          <div className="text-slate-400 mb-4">
            <Settings className="w-12 h-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium gradient-text mb-2">No Section Selected</h3>
          <p className="text-slate-600 px-4">Click on a section in the preview area to edit its properties</p>
        </div>
      </div>
    );
  }

  const renderPropertyEditor = () => {
    const { type, properties } = selectedSection;
    
    switch (type) {
      case 'header':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Website Title</Label>
              <Input
                id="title"
                value={properties.title || ''}
                onChange={(e) => handlePropertyChange('title', e.target.value)}
                placeholder="Enter website title"
              />
            </div>
            
            <div>
              <Label htmlFor="logo">Logo URL</Label>
              <Input
                id="logo"
                value={properties.logo || ''}
                onChange={(e) => handlePropertyChange('logo', e.target.value)}
                placeholder="https://example.com/logo.png"
              />
            </div>
            
            <div>
              <Label htmlFor="navigation">Navigation Items (comma-separated)</Label>
              <Input
                id="navigation"
                value={properties.navigation?.join(', ') || ''}
                onChange={(e) => handlePropertyChange('navigation', e.target.value.split(',').map(s => s.trim()))}
                placeholder="Home, About, Services, Contact"
              />
            </div>
            
            <div>
              <Label htmlFor="backgroundColor">Background Color</Label>
              <Input
                id="backgroundColor"
                type="color"
                value={properties.backgroundColor || '#ffffff'}
                onChange={(e) => handlePropertyChange('backgroundColor', e.target.value)}
              />
            </div>
          </div>
        );

      case 'hero':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Hero Title</Label>
              <Input
                id="title"
                value={properties.title || ''}
                onChange={(e) => handlePropertyChange('title', e.target.value)}
                placeholder="Enter hero title"
              />
            </div>
            
            <div>
              <Label htmlFor="subtitle">Subtitle</Label>
              <Textarea
                id="subtitle"
                value={properties.subtitle || ''}
                onChange={(e) => handlePropertyChange('subtitle', e.target.value)}
                placeholder="Enter subtitle"
                rows={3}
              />
            </div>
            
            <div>
              <Label htmlFor="buttonText">Button Text</Label>
              <Input
                id="buttonText"
                value={properties.buttonText || ''}
                onChange={(e) => handlePropertyChange('buttonText', e.target.value)}
                placeholder="Get Started"
              />
            </div>
            
            <div>
              <Label htmlFor="backgroundImage">Background Image URL</Label>
              <Input
                id="backgroundImage"
                value={properties.backgroundImage || ''}
                onChange={(e) => handlePropertyChange('backgroundImage', e.target.value)}
                placeholder="https://example.com/image.jpg"
              />
            </div>
            
            <div>
              <Label htmlFor="overlayOpacity">Overlay Opacity</Label>
              <div className="px-3 py-2">
                <Slider
                  value={[properties.overlayOpacity * 100 || 40]}
                  onValueChange={(value) => handlePropertyChange('overlayOpacity', value[0] / 100)}
                  max={100}
                  step={5}
                  className="w-full"
                />
                <div className="text-sm text-gray-500 mt-1">
                  {Math.round((properties.overlayOpacity || 0.4) * 100)}%
                </div>
              </div>
            </div>
            
            <div>
              <Label htmlFor="textAlign">Text Alignment</Label>
              <Select
                value={properties.textAlign || 'center'}
                onValueChange={(value) => handlePropertyChange('textAlign', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="left">Left</SelectItem>
                  <SelectItem value="center">Center</SelectItem>
                  <SelectItem value="right">Right</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 'content':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Section Title</Label>
              <Input
                id="title"
                value={properties.title || ''}
                onChange={(e) => handlePropertyChange('title', e.target.value)}
                placeholder="Enter section title"
              />
            </div>
            
            <div>
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                value={properties.content || ''}
                onChange={(e) => handlePropertyChange('content', e.target.value)}
                placeholder="Enter your content"
                rows={6}
              />
            </div>
            
            <div>
              <Label htmlFor="image">Image URL</Label>
              <Input
                id="image"
                value={properties.image || ''}
                onChange={(e) => handlePropertyChange('image', e.target.value)}
                placeholder="https://example.com/image.jpg"
              />
            </div>
            
            <div>
              <Label htmlFor="imagePosition">Image Position</Label>
              <Select
                value={properties.imagePosition || 'left'}
                onValueChange={(value) => handlePropertyChange('imagePosition', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="left">Left</SelectItem>
                  <SelectItem value="right">Right</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 'gallery':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Gallery Title</Label>
              <Input
                id="title"
                value={properties.title || ''}
                onChange={(e) => handlePropertyChange('title', e.target.value)}
                placeholder="Enter gallery title"
              />
            </div>
            
            <div>
              <Label htmlFor="images">Image URLs (one per line)</Label>
              <Textarea
                id="images"
                value={properties.images?.join('\n') || ''}
                onChange={(e) => handlePropertyChange('images', e.target.value.split('\n').filter(url => url.trim()))}
                placeholder="https://example.com/image1.jpg"
                rows={6}
              />
            </div>
            
            <div>
              <Label htmlFor="columns">Columns</Label>
              <Select
                value={properties.columns?.toString() || '4'}
                onValueChange={(value) => handlePropertyChange('columns', parseInt(value))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2">2 Columns</SelectItem>
                  <SelectItem value="3">3 Columns</SelectItem>
                  <SelectItem value="4">4 Columns</SelectItem>
                  <SelectItem value="5">5 Columns</SelectItem>
                  <SelectItem value="6">6 Columns</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 'footer':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                value={properties.companyName || ''}
                onChange={(e) => handlePropertyChange('companyName', e.target.value)}
                placeholder="Your Company"
              />
            </div>
            
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={properties.description || ''}
                onChange={(e) => handlePropertyChange('description', e.target.value)}
                placeholder="Company description"
                rows={3}
              />
            </div>
            
            <div>
              <Label htmlFor="backgroundColor">Background Color</Label>
              <Input
                id="backgroundColor"
                type="color"
                value={properties.backgroundColor || '#1f2937'}
                onChange={(e) => handlePropertyChange('backgroundColor', e.target.value)}
              />
            </div>
          </div>
        );

      default:
        return <p className="text-gray-500">No properties available for this section type.</p>;
    }
  };

  return (
    <div className="p-4 md:p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold gradient-text capitalize">{selectedSection.type} Section</h2>
          <p className="text-sm text-slate-600">Edit the properties of your section</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleDelete}
          className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200 transition-all duration-200"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      <Card className="p-4 md:p-6 glass-effect border-slate-200/50 shadow-modern">
        {renderPropertyEditor()}
      </Card>
    </div>
  );
}