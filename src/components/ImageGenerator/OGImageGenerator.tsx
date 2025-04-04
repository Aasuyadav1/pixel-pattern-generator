
import { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { 
  Download, 
  RefreshCw, 
  Copy, 
  PanelLeft, 
  CheckCircle2,
  ChevronUp
} from "lucide-react";
import { toast } from "sonner";
import PatternSelector from "./PatternSelector";
import ContentEditor from "./ContentEditor";
import PlatformPreview from "./PlatformPreview";
import TemplateSelector from "./TemplateSelector";
import WebsiteUrlGenerator from "./WebsiteUrlGenerator";
import ThemeSwitcher from "./ThemeSwitcher";
import LandingIntro from "./LandingIntro";
import { 
  PatternSettings, 
  defaultPatternSettings, 
  generatePatternUrl,
  Template,
  TEMPLATES
} from "@/lib/pattern-utils";
import GradientSelector from "./GradientSelector";

const OGImageGenerator = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const [pattern, setPattern] = useState<PatternSettings>(defaultPatternSettings);
  const [title, setTitle] = useState("Create Beautiful OG Images");
  const [subtitle, setSubtitle] = useState("Generate perfect social media previews in seconds");
  const [logo, setLogo] = useState<string | undefined>(undefined);
  const [activeTab, setActiveTab] = useState("design");
  const [showLandingSection, setShowLandingSection] = useState(true);
  const editorRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  
  // Generate pattern URL
  const patternUrl = generatePatternUrl(pattern);

  // Handle pattern changes - only update the specific properties that changed
  const handlePatternChange = (updatedPattern: PatternSettings) => {
    setPattern(updatedPattern);
  };

  const handleTemplateSelect = (template: Template) => {
    // Apply template settings but preserve the background if it was already customized
    setPattern({
      ...template.pattern,
      // If the pattern already had a background, keep it
      background: pattern.background || template.pattern.background
    });
    setTitle(template.content.title);
    setSubtitle(template.content.subtitle);
    setLogo(template.content.logo);
    toast.success(`Applied template: ${template.name}`);
  };

  const handleResetChanges = () => {
    setPattern(defaultPatternSettings);
    setTitle("Create Beautiful OG Images");
    setSubtitle("Generate perfect social media previews in seconds");
    setLogo(undefined);
    toast.success("Reset to default settings");
  };

  const handleWebsiteContentGenerated = (newTitle: string, newSubtitle: string, newLogo?: string) => {
    setTitle(newTitle);
    setSubtitle(newSubtitle);
    if (newLogo) {
      setLogo(newLogo);
    }
  };

  const scrollToEditor = () => {
    setShowLandingSection(false);
    editorRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setShowLandingSection(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between p-6 border-b border-white/10 bg-background/80 backdrop-blur-lg">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowSidebar(!showSidebar)}
            className="lg:hidden"
          >
            <PanelLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold bg-gradient-to-br from-white via-white/90 to-white/70 bg-clip-text text-transparent">
            OG Image Generator
          </h1>
        </div>
        
        <div className="flex items-center gap-3">
          <ThemeSwitcher />
          <Button
            variant="outline"
            size="sm"
            onClick={handleResetChanges}
            className="gap-1.5"
          >
            <RefreshCw className="h-4 w-4" />
            <span className="hidden sm:inline">Reset</span>
          </Button>
          
          {!showLandingSection && (
            <Button
              variant="ghost"
              size="sm"
              onClick={scrollToTop}
              className="gap-1.5"
            >
              <ChevronUp className="h-4 w-4" />
              <span className="hidden sm:inline">Back to Top</span>
            </Button>
          )}
        </div>
      </header>

      <div className="max-w-screen-2xl mx-auto">
        {/* Landing Section - conditionally rendered */}
        {showLandingSection && (
          <LandingIntro onGetStarted={scrollToEditor} />
        )}

        {/* Main content section */}
        <div className="p-6" ref={editorRef}>
          {/* Template Carousel - Full Width */}
          <div className="pb-0">
            <div className="max-w-screen-xl mx-auto">
              <h2 className="text-lg font-medium mb-4">Templates</h2>
              <TemplateSelector onSelectTemplate={handleTemplateSelect} />
            </div>
          </div>

          {/* Main editor + preview area */}
          <div className="flex-1 overflow-y-auto mt-6">
            <div className="max-w-screen-xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Editor - Left panel on desktop, toggleable on mobile */}
                <div className={`${!showSidebar && 'hidden'} lg:block lg:col-span-5`}>
                  <div className="glass-morphism rounded-lg border border-white/10 mb-6 overflow-hidden">
                    <Tabs value={activeTab} onValueChange={setActiveTab}>
                      <TabsList className="w-full grid grid-cols-2">
                        <TabsTrigger value="design">Design</TabsTrigger>
                        <TabsTrigger value="content">Content</TabsTrigger>
                      </TabsList>
                      
                      <div className="p-6">
                        <TabsContent value="design" className="mt-0 space-y-6">
                          <PatternSelector pattern={pattern} onChange={handlePatternChange} />
                          <GradientSelector pattern={pattern} onChange={handlePatternChange} />
                        </TabsContent>
                        
                        <TabsContent value="content" className="mt-0 space-y-6">
                          <WebsiteUrlGenerator onContentGenerated={handleWebsiteContentGenerated} />
                          <ContentEditor
                            title={title}
                            subtitle={subtitle}
                            logo={logo}
                            onTitleChange={setTitle}
                            onSubtitleChange={setSubtitle}
                            onLogoChange={setLogo}
                          />
                        </TabsContent>
                      </div>
                    </Tabs>
                  </div>
                </div>
                
                {/* Live preview area - Always visible */}
                <div className="lg:col-span-7">
                  <div className="mb-6 sticky top-24">
                    <h2 className="text-lg font-medium mb-4">Preview</h2>
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
                  
                  {/* Platform previews - Full width grid layout */}
                  <div className="space-y-4 animate-slide-up">
                    <h3 className="text-base font-medium mb-3">Platform Previews</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                      <PlatformPreview 
                        canvasRef={previewRef}
                        pattern={patternUrl}
                        background={pattern.background}
                        title={title}
                        subtitle={subtitle}
                        logo={logo}
                        platform="twitter"
                        patternScale={pattern.scale}
                      />
                      
                      <PlatformPreview 
                        canvasRef={previewRef}
                        pattern={patternUrl}
                        background={pattern.background}
                        title={title}
                        subtitle={subtitle}
                        logo={logo}
                        platform="linkedin"
                        patternScale={pattern.scale}
                      />
                      
                      <PlatformPreview 
                        canvasRef={previewRef}
                        pattern={patternUrl}
                        background={pattern.background}
                        title={title}
                        subtitle={subtitle}
                        logo={logo}
                        platform="facebook"
                        patternScale={pattern.scale}
                      />
                      
                      <PlatformPreview 
                        canvasRef={previewRef}
                        pattern={patternUrl}
                        background={pattern.background}
                        title={title}
                        subtitle={subtitle}
                        logo={logo}
                        platform="discord"
                        patternScale={pattern.scale}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OGImageGenerator;
