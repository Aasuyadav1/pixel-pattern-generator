
import React from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import TemplateSelector from "./TemplateSelector";
import { Template } from "@/lib/pattern-utils";

interface PreviewPanelProps {
  patternUrl: string;
  pattern: any;
  title: string;
  subtitle: string;
  logo?: string;
  previewRef: React.RefObject<HTMLDivElement>;
  handleTemplateSelect: (template: Template) => void;
}

const PreviewPanel = ({
  patternUrl,
  pattern,
  title,
  subtitle,
  logo,
  previewRef,
  handleTemplateSelect
}: PreviewPanelProps) => {
  return (
    <>
      {/* Template Section - Now on top of the preview */}
      <div className="mb-6">
        <h2 className="text-lg font-medium mb-4">Templates</h2>
        <div className="glass-morphism rounded-lg border border-white/10 p-4">
          <TemplateSelector onSelectTemplate={handleTemplateSelect} />
        </div>
      </div>
      
      {/* Live preview area - Resized to be more compact */}
      <div className="mb-6 sticky top-24">
        <h2 className="text-lg font-medium mb-4">Preview</h2>
        <div className="glass-morphism rounded-xl border border-white/10 p-4 shadow-lg">
          <div 
            ref={previewRef}
            className="aspect-[1200/630] w-full rounded-lg overflow-hidden border border-white/10 shadow-xl animate-scale-in"
            style={{ 
              backgroundImage: patternUrl,
              background: pattern.background,
              backgroundBlendMode: 'normal',
              backgroundSize: `${pattern.scale * 2}px, cover`,
            } as React.CSSProperties}
          >
            <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center">
              {logo && (
                <div className="mb-6 max-w-[30%] max-h-[15%]">
                  <img src={logo} alt="Logo" className="max-h-full max-w-full object-contain" />
                </div>
              )}
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white leading-tight mb-3 transition-all">{title}</h2>
              <p className="text-sm sm:text-base text-white/80 transition-all">{subtitle}</p>
            </div>
          </div>
        </div>
        
        {/* Export button for the preview */}
        <div className="flex justify-end mt-4">
          <Button
            variant="outline"
            className="gap-1.5 rounded-full"
          >
            <Download className="h-4 w-4" />
            <span>Export Image</span>
          </Button>
        </div>
      </div>
    </>
  );
};

export default PreviewPanel;
