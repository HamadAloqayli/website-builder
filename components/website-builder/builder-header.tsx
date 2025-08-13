'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useWebsiteBuilder } from '@/contexts/website-builder-context';
import { Download, Upload, Trash2, Globe } from 'lucide-react';
import { toast } from 'sonner';

export function BuilderHeader() {
  const { exportConfig, importConfig, clearAll } = useWebsiteBuilder();
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = () => {
    try {
      setIsExporting(true);
      const config = exportConfig();
      const dataStr = JSON.stringify(config, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
      
      const exportFileDefaultName = `website-config-${Date.now()}.json`;
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
      
      toast.success('Website configuration exported successfully!');
    } catch (error) {
      toast.error('Failed to export configuration');
    } finally {
      setIsExporting(false);
    }
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const config = JSON.parse(e.target?.result as string);
        importConfig(config);
        toast.success('Website configuration imported successfully!');
      } catch (error) {
        toast.error('Invalid configuration file');
      }
    };
    reader.readAsText(file);
    
    // Reset the input value so the same file can be imported again
    event.target.value = '';
  };

  const handleClearAll = () => {
    if (confirm('Are you sure you want to clear all sections? This action cannot be undone.')) {
      clearAll();
      toast.success('All sections cleared');
    }
  };

  return (
    <header className="glass-effect border-b border-white/20 px-4 md:px-6 py-4 shadow-modern">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <div className="gradient-primary p-2 rounded-xl shadow-lg">
              <Globe className="h-5 w-5 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold gradient-text">Mini Website Builder</h1>
              <p className="text-sm text-slate-600">Create beautiful websites with ease</p>
            </div>
            <div className="sm:hidden">
              <h1 className="text-lg font-bold gradient-text">Builder</h1>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <div className="hidden md:flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleExport}
              disabled={isExporting}
              className="flex items-center space-x-2 border-slate-200 hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 transition-all duration-200"
            >
              <Download className="h-4 w-4" />
              <span>Export</span>
            </Button>

            <div className="relative">
              <Input
                type="file"
                accept=".json"
                onChange={handleImport}
                className="sr-only"
                id="import-file"
              />
              <Button
                variant="outline"
                size="sm"
                asChild
                className="flex items-center space-x-2 border-slate-200 hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 transition-all duration-200"
              >
                <label htmlFor="import-file" className="cursor-pointer">
                  <Upload className="h-4 w-4" />
                  <span>Import</span>
                </label>
              </Button>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={handleClearAll}
              className="flex items-center space-x-2 text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200 transition-all duration-200"
            >
              <Trash2 className="h-4 w-4" />
              <span>Clear All</span>
            </Button>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Button
              variant="outline"
              size="sm"
              onClick={handleExport}
              disabled={isExporting}
              className="gradient-primary text-white border-0 shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile Actions Row */}
      <div className="md:hidden mt-3 flex items-center justify-center space-x-2">
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Input
              type="file"
              accept=".json"
              onChange={handleImport}
              className="sr-only"
              id="import-file-mobile"
            />
            <Button
              variant="outline"
              size="sm"
              asChild
              className="flex items-center space-x-1 text-xs border-slate-200"
            >
              <label htmlFor="import-file-mobile" className="cursor-pointer">
                <Upload className="h-3 w-3" />
                <span>Import</span>
              </label>
            </Button>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={handleClearAll}
            className="flex items-center space-x-1 text-xs text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
          >
            <Trash2 className="h-3 w-3" />
            <span>Clear</span>
          </Button>
        </div>
      </div>
    </header>
  );
}