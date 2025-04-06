
import React from "react";
import { Button } from "@/components/ui/button";
import { PanelLeft, RefreshCw, ChevronUp } from "lucide-react";
import ThemeSwitcher from "./ThemeSwitcher";

interface HeaderProps {
  showSidebar: boolean;
  setShowSidebar: (show: boolean) => void;
  handleResetChanges: () => void;
  showLandingSection: boolean;
  scrollToTop: () => void;
}

const Header = ({
  showSidebar,
  setShowSidebar,
  handleResetChanges,
  showLandingSection,
  scrollToTop
}: HeaderProps) => {
  return (
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
  );
};

export default Header;
