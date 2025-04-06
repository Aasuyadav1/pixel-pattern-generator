import { useState, useRef, useEffect } from "react";
import { 
  PatternSettings, 
  defaultPatternSettings, 
  generatePatternUrl,
  Template,
  TEMPLATES
} from "@/lib/pattern-utils";
import { toast } from "sonner";
import LandingIntro from "./LandingIntro";
import Header from "./Header";
import EditorPanel from "./EditorPanel";
import PreviewPanel from "./PreviewPanel";

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
      <Header 
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
        handleResetChanges={handleResetChanges}
        showLandingSection={showLandingSection}
        scrollToTop={scrollToTop}
      />

      <div className="max-w-screen-2xl mx-auto">
        {/* Landing Section - conditionally rendered */}
        {showLandingSection && (
          <LandingIntro onGetStarted={scrollToEditor} />
        )}

        {/* Main content section */}
        <div className="p-6" ref={editorRef}>
          <div className="max-w-screen-xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Editor - Left panel on desktop, toggleable on mobile */}
              <div className={`${!showSidebar && 'hidden'} lg:block lg:col-span-5`}>
                <EditorPanel
                  pattern={pattern}
                  title={title}
                  subtitle={subtitle}
                  logo={logo}
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  handlePatternChange={handlePatternChange}
                  setTitle={setTitle}
                  setSubtitle={setSubtitle}
                  setLogo={setLogo}
                  handleWebsiteContentGenerated={handleWebsiteContentGenerated}
                />
              </div>
              
              {/* Right side with Templates and Preview */}
              <div className="lg:col-span-7">
                <PreviewPanel
                  patternUrl={patternUrl}
                  pattern={pattern}
                  title={title}
                  subtitle={subtitle}
                  logo={logo}
                  previewRef={previewRef}
                  handleTemplateSelect={handleTemplateSelect}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OGImageGenerator;
