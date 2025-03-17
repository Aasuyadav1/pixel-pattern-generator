
import { Template, TEMPLATES } from "@/lib/pattern-utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { generatePatternUrl } from "@/lib/pattern-utils";

interface TemplateSelectorProps {
  onSelectTemplate: (template: Template) => void;
}

const TemplateSelector = ({ onSelectTemplate }: TemplateSelectorProps) => {
  return (
    <div className="space-y-4 animate-slide-up">
      <h3 className="text-base font-medium">Choose a Template</h3>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {TEMPLATES.map((template) => {
          const patternStyle = {
            backgroundImage: generatePatternUrl(template.pattern),
            background: template.pattern.background,
          };

          return (
            <Card 
              key={template.id}
              className="overflow-hidden cursor-pointer border-white/10 hover:border-white/30 transition-all duration-200 transform hover:scale-[1.02]"
              onClick={() => onSelectTemplate(template)}
            >
              <div 
                className="h-24 relative"
                style={patternStyle as React.CSSProperties}
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center p-2 text-center">
                  <p className="text-xs font-medium text-white leading-tight">{template.content.title}</p>
                  <p className="text-[10px] text-white/70 mt-1">{template.content.subtitle}</p>
                </div>
              </div>
              <CardContent className="p-2 bg-black/40">
                <p className="text-xs text-center">{template.name}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default TemplateSelector;
