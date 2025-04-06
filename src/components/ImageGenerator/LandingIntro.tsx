
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wand2, MonitorSmartphone, Download, Palette, ImagePlus, ChevronDown } from "lucide-react";

const LandingIntro = ({ onGetStarted }: { onGetStarted: () => void }) => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto text-center mb-12 animate-fade-in py-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
          Create Beautiful OG Images in Seconds
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Design stunning social media previews for your content with our powerful and easy-to-use OG image generator.
        </p>
        <Button 
          size="lg" 
          onClick={onGetStarted}
          className="rounded-full px-8 py-6 text-base bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 border-0"
        >
          Get Started <ImagePlus className="ml-2" />
        </Button>
      </div>

      {/* Features Section */}
      <div className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 animate-slide-up">
        <FeatureCard 
          icon={<Palette />}
          title="Beautiful Patterns"
          description="Choose from a variety of patterns and gradients or create your own custom design."
        />
        <FeatureCard 
          icon={<MonitorSmartphone />}
          title="Preview Your Design"
          description="See exactly how your OG image will look before you export it for use online."
        />
        <FeatureCard 
          icon={<Download />}
          title="Easy Export"
          description="Download your OG images in the perfect format ready for your website."
        />
      </div>

      {/* CTA Section */}
      <div className="w-full max-w-3xl mx-auto animate-scale-in mb-12">
        <Card className="border border-white/10 glass-morphism rounded-xl">
          <CardContent className="pt-6 pb-4 px-6">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0">
                <h3 className="text-xl font-semibold mb-2">Ready to create eye-catching OG images?</h3>
                <p className="text-muted-foreground">Try our generator now and enhance your content visibility.</p>
              </div>
              <Button 
                size="lg" 
                onClick={onGetStarted}
                className="rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 border-0"
              >
                Start Creating <Wand2 className="ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex justify-center animate-bounce mb-6">
        <ChevronDown className="h-8 w-8 text-muted-foreground" />
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { 
  icon: React.ReactNode; 
  title: string; 
  description: string 
}) => {
  return (
    <Card className="border border-white/10 glass-morphism h-full hover:scale-105 transition-transform duration-300 rounded-xl overflow-hidden">
      <CardHeader>
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 flex items-center justify-center mb-4">
          {icon}
        </div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardContent>
    </Card>
  );
};

export default LandingIntro;
