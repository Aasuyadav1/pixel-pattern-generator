
import { memo, useRef, useEffect } from "react";
import { PLATFORM_DIMENSIONS } from "@/lib/pattern-utils";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { toast } from "sonner";

interface PlatformPreviewProps {
  canvasRef: React.RefObject<HTMLDivElement>;
  pattern: string;
  background: string;
  title: string;
  subtitle: string;
  logo?: string;
}

const PlatformPreview = memo(({
  canvasRef,
  pattern,
  background,
  title,
  subtitle,
  logo
}: PlatformPreviewProps) => {
  const downloadCanvas = (platform: keyof typeof PLATFORM_DIMENSIONS) => {
    if (!canvasRef.current) return;
    
    try {
      // Create a canvas to draw our image
      const canvas = document.createElement('canvas');
      const { width, height } = PLATFORM_DIMENSIONS[platform];
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        toast.error("Unable to create canvas context");
        return;
      }
      
      // Draw background with pattern
      const img = new Image();
      const div = canvasRef.current;
      
      // First, draw the background
      ctx.fillStyle = background;
      ctx.fillRect(0, 0, width, height);
      
      // Create temporary image for the pattern
      const patternImg = new Image();
      patternImg.onload = () => {
        const patternCanvas = document.createElement('canvas');
        patternCanvas.width = width;
        patternCanvas.height = height;
        const patternCtx = patternCanvas.getContext('2d');
        
        if (patternCtx) {
          const pattern = patternCtx.createPattern(patternImg, 'repeat');
          if (pattern) {
            patternCtx.fillStyle = pattern;
            patternCtx.fillRect(0, 0, width, height);
            ctx.drawImage(patternCanvas, 0, 0);
          }
          
          // Draw the content
          // Draw title
          ctx.font = `bold ${width * 0.05}px Inter, sans-serif`;
          ctx.fillStyle = 'white';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          
          // Split title into multiple lines if needed
          const titleLines = wrapText(ctx, title, width * 0.8, width * 0.05);
          let titleY = height * 0.4;
          if (logo) titleY = height * 0.5;
          
          titleLines.forEach((line, i) => {
            ctx.fillText(line, width / 2, titleY + (i * width * 0.06));
          });
          
          // Draw subtitle
          ctx.font = `${width * 0.025}px Inter, sans-serif`;
          ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
          
          const subtitleLines = wrapText(ctx, subtitle, width * 0.7, width * 0.025);
          let subtitleY = titleY + (titleLines.length * width * 0.06) + width * 0.04;
          
          subtitleLines.forEach((line, i) => {
            ctx.fillText(line, width / 2, subtitleY + (i * width * 0.035));
          });
          
          // Draw logo if exists
          if (logo) {
            const logoImg = new Image();
            logoImg.onload = () => {
              const logoMaxHeight = height * 0.15;
              const logoMaxWidth = width * 0.3;
              
              let logoWidth = logoImg.width;
              let logoHeight = logoImg.height;
              
              if (logoWidth > logoMaxWidth) {
                logoHeight = (logoHeight * logoMaxWidth) / logoWidth;
                logoWidth = logoMaxWidth;
              }
              
              if (logoHeight > logoMaxHeight) {
                logoWidth = (logoWidth * logoMaxHeight) / logoHeight;
                logoHeight = logoMaxHeight;
              }
              
              const logoX = (width - logoWidth) / 2;
              const logoY = height * 0.25;
              
              ctx.drawImage(logoImg, logoX, logoY, logoWidth, logoHeight);
              
              // Download the image
              finishDownload(canvas, platform);
            };
            logoImg.src = logo;
          } else {
            // Download the image
            finishDownload(canvas, platform);
          }
        }
      };
      
      // Create a data URL from the div's background
      const bgCanvas = document.createElement('canvas');
      bgCanvas.width = 10;
      bgCanvas.height = 10;
      const bgCtx = bgCanvas.getContext('2d');
      if (bgCtx) {
        bgCtx.fillStyle = 'transparent';
        bgCtx.fillRect(0, 0, 10, 10);
      }
      
      // Extract pattern from the computed style
      const computedStyle = window.getComputedStyle(div);
      const bgImage = computedStyle.backgroundImage;
      
      // If we have a pattern
      if (bgImage && bgImage !== 'none') {
        const patternUrlMatch = bgImage.match(/url\("([^"]+)"\)/);
        if (patternUrlMatch && patternUrlMatch[1]) {
          patternImg.src = patternUrlMatch[1];
        } else {
          // No pattern, just proceed
          finishDownload(canvas, platform);
        }
      } else {
        // No pattern, just proceed
        finishDownload(canvas, platform);
      }
    } catch (error) {
      console.error("Error generating canvas:", error);
      toast.error("Failed to generate image");
    }
  };

  const wrapText = (ctx: CanvasRenderingContext2D, text: string, maxWidth: number, fontSize: number): string[] => {
    const words = text.split(' ');
    const lines: string[] = [];
    let currentLine = words[0];

    for (let i = 1; i < words.length; i++) {
      const word = words[i];
      const width = ctx.measureText(currentLine + ' ' + word).width;
      if (width < maxWidth) {
        currentLine += ' ' + word;
      } else {
        lines.push(currentLine);
        currentLine = word;
      }
    }
    lines.push(currentLine);
    return lines;
  };

  const finishDownload = (canvas: HTMLCanvasElement, platform: keyof typeof PLATFORM_DIMENSIONS) => {
    const link = document.createElement('a');
    link.download = `og-image-${platform}.png`;
    link.href = canvas.toDataURL('image/png');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success(`${PLATFORM_DIMENSIONS[platform].label} image downloaded`);
  };

  return (
    <div className="space-y-4 animate-slide-up">
      <div className="flex justify-between items-center">
        <h3 className="text-base font-medium">Platform Previews</h3>
      </div>
      
      <Tabs defaultValue="twitter" className="w-full">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="twitter">
            <span className="hidden sm:inline">X / Twitter</span>
            <span className="sm:hidden">X</span>
          </TabsTrigger>
          <TabsTrigger value="linkedin">
            <span className="hidden sm:inline">LinkedIn</span>
            <span className="sm:hidden">LI</span>
          </TabsTrigger>
          <TabsTrigger value="facebook">
            <span className="hidden sm:inline">Facebook</span>
            <span className="sm:hidden">FB</span>
          </TabsTrigger>
          <TabsTrigger value="discord">
            <span className="hidden sm:inline">Discord</span>
            <span className="sm:hidden">DS</span>
          </TabsTrigger>
        </TabsList>
        
        {Object.entries(PLATFORM_DIMENSIONS).map(([platform, { width, height, label }]) => (
          <TabsContent key={platform} value={platform} className="mt-4">
            <Card className="border-white/10 overflow-hidden">
              <div className="glass-morphism p-6 flex flex-col items-center gap-4">
                <div className="flex justify-between items-center w-full">
                  <div>
                    <p className="text-sm font-medium">{label}</p>
                    <p className="text-xs text-muted-foreground">{width} × {height}px</p>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="gap-1.5"
                    onClick={() => downloadCanvas(platform as keyof typeof PLATFORM_DIMENSIONS)}
                  >
                    <Download className="h-4 w-4" />
                    <span>Download</span>
                  </Button>
                </div>
                
                <div className="w-full rounded-lg overflow-hidden border border-white/10 shadow-xl">
                  <div 
                    className="aspect-[1200/630] w-full relative flex items-center justify-center"
                    style={{ 
                      backgroundImage: pattern,
                      background: background,
                    } as React.CSSProperties}
                  >
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                      {logo && (
                        <div className="mb-4 max-w-[30%] max-h-[15%]">
                          <img src={logo} alt="Logo" className="max-h-full max-w-full object-contain" />
                        </div>
                      )}
                      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white leading-tight mb-2">{title}</h2>
                      <p className="text-sm sm:text-base text-white/80">{subtitle}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
});

PlatformPreview.displayName = "PlatformPreview";

export default PlatformPreview;
