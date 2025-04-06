
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PatternSelector from "./PatternSelector";
import GradientSelector from "./GradientSelector";
import WebsiteUrlGenerator from "./WebsiteUrlGenerator";
import ContentEditor from "./ContentEditor";
import { PatternSettings } from "@/lib/pattern-utils";

interface EditorPanelProps {
  pattern: PatternSettings;
  title: string;
  subtitle: string;
  logo?: string;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  handlePatternChange: (pattern: PatternSettings) => void;
  setTitle: (title: string) => void;
  setSubtitle: (subtitle: string) => void;
  setLogo: (logo?: string) => void;
  handleWebsiteContentGenerated: (title: string, subtitle: string, logo?: string) => void;
}

const EditorPanel = ({
  pattern,
  title,
  subtitle,
  logo,
  activeTab,
  setActiveTab,
  handlePatternChange,
  setTitle,
  setSubtitle,
  setLogo,
  handleWebsiteContentGenerated
}: EditorPanelProps) => {
  return (
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
  );
};

export default EditorPanel;
