import { Button } from "@/components/ui/button";
import { ShieldCheck, Sparkles, Zap } from "lucide-react";
import ImageProcessor from "./components/ImageProcessor";
import CarouselDisplay from "./components/CarouselDisplay";

export default function App() {
  const scrollToApp = () => {
    document.getElementById("app-section")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div className="bg-gradient-to-br from-purple-100 via-white to-blue-100">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 md:py-24">
        <div className="text-center space-y-8">
          <h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"
            style={{ lineHeight: "normal" }}
          >
            Remove Foreground
          </h1>

          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-800">
            In One Click, All Free
          </h2>

          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Revolutionary AI technology that intelligently removes foreground
            elements, leaving you with clean, professional backgrounds. Perfect
            for photographers, designers, and content creators.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={scrollToApp}
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 text-lg cursor-pointer"
            >
              <Sparkles className="mr-2 h-5 w-5" />
              Try It Now
            </Button>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              No signup required • 100% free
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="text-center space-y-3">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
              <Zap className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-lg">Lightning Fast</h3>
            <p className="text-gray-600">
              Process images in seconds with our advanced AI
            </p>
          </div>
          <div className="text-center space-y-3">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
              <Sparkles className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-lg">AI Powered</h3>
            <p className="text-gray-600">
              State-of-the-art machine learning algorithms
            </p>
          </div>
          <div className="text-center space-y-3">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <ShieldCheck className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-lg">Privacy First</h3>
            <p className="text-gray-600">
              Your images are processed securely and never stored
            </p>
          </div>
        </div>
      </section>

      {/* Carousel Section */}
      <CarouselDisplay />

      {/* App Section */}
      <ImageProcessor />

      {/* Footer */}
      <footer className="border-t bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-gray-600">
            <p>&copy; 2024 AI Foreground Remover. Made with ❤️ for creators.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
