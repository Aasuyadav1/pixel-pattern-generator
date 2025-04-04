
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Globe, ArrowRight, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface WebsiteUrlGeneratorProps {
  onContentGenerated: (title: string, subtitle: string, logoUrl?: string) => void;
}

const WebsiteUrlGenerator = ({ onContentGenerated }: WebsiteUrlGeneratorProps) => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const isValidUrl = (urlString: string): boolean => {
    try {
      // Check if it's a valid URL format
      const url = new URL(urlString);
      // Make sure protocol is http or https
      return url.protocol === 'http:' || url.protocol === 'https:';
    } catch (e) {
      return false;
    }
  };

  const handleGenerate = async () => {
    if (!url || !url.trim() || !isValidUrl(url)) {
      toast.error("Please enter a valid URL (e.g., https://example.com)");
      return;
    }

    setLoading(true);

    try {
      // This is a simulated response - in a real implementation, 
      // you would fetch data from the website and analyze it
      setTimeout(() => {
        try {
          // Safely extract domain from the URL
          const urlObj = new URL(url);
          const domain = urlObj.hostname.replace('www.', '');
          const wordParts = domain.split(/[.-]/);
          
          // Generate a title based on the domain name
          const capitalizedWords = wordParts.map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
          );
          
          const title = `${capitalizedWords.join(' ')} | Official OG Image`;
          const subtitle = `Share the best content from ${domain} with our custom social previews`;
          
          onContentGenerated(title, subtitle);
          toast.success("Content generated from website!");
        } catch (error) {
          console.error("Error processing URL:", error);
          toast.error("Could not process this URL. Please try another.");
        } finally {
          setLoading(false);
        }
      }, 1500);
    } catch (error) {
      console.error("Error generating content:", error);
      toast.error("Could not generate content from this URL. Please try another.");
      setLoading(false);
    }
  };

  return (
    <div className="space-y-2 mb-6">
      <h3 className="text-sm font-medium mb-2">Quick Content Generator</h3>
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Globe className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="pl-9 glass-morphism w-full"
            placeholder="Enter website URL (e.g., https://example.com)"
          />
        </div>
        <Button 
          onClick={handleGenerate}
          disabled={loading || !url}
          className="gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              Generate
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default WebsiteUrlGenerator;
