
import { useState } from "react";
import { PatternSettings, PatternType, generatePatternUrl } from "@/lib/pattern-utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { HelpCircle, Grid, Circle, Hash, TrendingUp, Hexagon, CloudFog } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface PatternSelectorProps {
  pattern: PatternSettings;
  onChange: (pattern: PatternSettings) => void;
}

const PatternSelector = ({ pattern, onChange }: PatternSelectorProps) => {
  const [currentPattern, setCurrentPattern] = useState<PatternSettings>(pattern);

  const handlePatternChange = (type: PatternType) => {
    const updatedPattern = { ...currentPattern, type };
    setCurrentPattern(updatedPattern);
    onChange(updatedPattern);
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedPattern = { ...currentPattern, color: e.target.value };
    setCurrentPattern(updatedPattern);
    onChange(updatedPattern);
  };

  const handleOpacityChange = (value: number[]) => {
    const updatedPattern = { ...currentPattern, opacity: value[0] };
    setCurrentPattern(updatedPattern);
    onChange(updatedPattern);
  };

  const handleScaleChange = (value: number[]) => {
    const updatedPattern = { ...currentPattern, scale: value[0] };
    setCurrentPattern(updatedPattern);
    onChange(updatedPattern);
  };

  const handleBackgroundChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedPattern = { ...currentPattern, background: e.target.value };
    setCurrentPattern(updatedPattern);
    onChange(updatedPattern);
  };

  const patternPreviewStyle = {
    backgroundImage: generatePatternUrl(currentPattern),
    backgroundSize: `${currentPattern.scale * 2}px`,
    background: currentPattern.background,
  };

  return (
    <div className="space-y-4 animate-slide-up">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-base font-medium">Background Pattern</h3>
          <TooltipProvider>
            <Tooltip delayDuration={300}>
              <TooltipTrigger asChild>
                <HelpCircle className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Select and customize your background pattern</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <Tabs defaultValue="grid" className="w-full" onValueChange={(value) => handlePatternChange(value as PatternType)}>
        <TabsList className="grid grid-cols-6 w-full mb-4">
          <TabsTrigger value="grid" className="flex flex-col items-center gap-1.5 p-2">
            <Grid className="h-4 w-4" />
            <span className="text-xs">Grid</span>
          </TabsTrigger>
          <TabsTrigger value="dots" className="flex flex-col items-center gap-1.5 p-2">
            <Circle className="h-4 w-4" />
            <span className="text-xs">Dots</span>
          </TabsTrigger>
          <TabsTrigger value="graph" className="flex flex-col items-center gap-1.5 p-2">
            <Hash className="h-4 w-4" />
            <span className="text-xs">Graph</span>
          </TabsTrigger>
          <TabsTrigger value="diagonal" className="flex flex-col items-center gap-1.5 p-2">
            <TrendingUp className="h-4 w-4" />
            <span className="text-xs">Lines</span>
          </TabsTrigger>
          <TabsTrigger value="honeycomb" className="flex flex-col items-center gap-1.5 p-2">
            <Hexagon className="h-4 w-4" />
            <span className="text-xs">Hex</span>
          </TabsTrigger>
          <TabsTrigger value="noise" className="flex flex-col items-center gap-1.5 p-2">
            <CloudFog className="h-4 w-4" />
            <span className="text-xs">Noise</span>
          </TabsTrigger>
        </TabsList>

        <div className="glass-morphism rounded-lg p-4 mb-4">
          <div 
            className="h-16 w-full rounded-md overflow-hidden mb-4 transition-all duration-300" 
            style={patternPreviewStyle as React.CSSProperties}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div>
                <Label htmlFor="pattern-color">Pattern Color</Label>
                <div className="flex gap-2 mt-1.5">
                  <div className="w-10 h-10 rounded border border-white/10 overflow-hidden">
                    <input 
                      type="color" 
                      id="pattern-color" 
                      value={currentPattern.color} 
                      onChange={handleColorChange}
                      className="h-12 w-12 -m-1 cursor-pointer"
                    />
                  </div>
                  <input 
                    type="text" 
                    value={currentPattern.color} 
                    onChange={handleColorChange}
                    className="flex-1 bg-black/20 border border-white/10 rounded px-3 text-sm"
                  />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1.5">
                  <Label htmlFor="pattern-opacity">Opacity</Label>
                  <span className="text-xs text-muted-foreground">{Math.round(currentPattern.opacity * 100)}%</span>
                </div>
                <Slider 
                  id="pattern-opacity"
                  min={0.01} 
                  max={0.5} 
                  step={0.01} 
                  value={[currentPattern.opacity]} 
                  onValueChange={handleOpacityChange}
                />
              </div>
            </div>
            
            <div className="space-y-3">
              <div>
                <Label htmlFor="pattern-bg">Background</Label>
                <input 
                  type="text" 
                  id="pattern-bg" 
                  value={currentPattern.background} 
                  onChange={handleBackgroundChange}
                  placeholder="Color or gradient"
                  className="w-full mt-1.5 bg-black/20 border border-white/10 rounded px-3 py-2 text-sm"
                />
              </div>
              
              <div>
                <div className="flex justify-between mb-1.5">
                  <Label htmlFor="pattern-scale">Pattern Size</Label>
                  <span className="text-xs text-muted-foreground">{currentPattern.scale}px</span>
                </div>
                <Slider 
                  id="pattern-scale"
                  min={5} 
                  max={50} 
                  step={1} 
                  value={[currentPattern.scale]} 
                  onValueChange={handleScaleChange}
                />
              </div>
            </div>
          </div>
        </div>
      </Tabs>
    </div>
  );
};

export default PatternSelector;
