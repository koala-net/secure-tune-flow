import { Button } from "@/components/ui/button";
import { Play, DollarSign } from "lucide-react";
import AudioWaveform from "./AudioWaveform";
import heroWaveform from "@/assets/hero-waveform.jpg";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url(${heroWaveform})` }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-hero" />
      
      <div className="relative container mx-auto px-4 py-24 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Royalties Secured
            </span>
            <br />
            <span className="text-accent">with FHE</span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Stream royalties encrypted until payout, preventing manipulation by publishers. 
            Fully Homomorphic Encryption ensures your earnings stay secure and transparent.
          </p>
          
          {/* Waveform Visualization */}
          <div className="mb-12 flex justify-center">
            <AudioWaveform className="h-32 w-96" bars={30} locked={true} />
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/dashboard">
              <Button size="lg" className="bg-gradient-royalty text-royalty-foreground hover:opacity-90 glow-royalty min-w-48">
                <DollarSign className="h-5 w-5 mr-2" />
                Start Earning Secure Royalties
              </Button>
            </Link>
            
            <Button variant="outline" size="lg" className="border-accent text-accent hover:bg-accent/20 min-w-48">
              <Play className="h-5 w-5 mr-2" />
              See How It Works
            </Button>
          </div>
          
          {/* Stats */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-accent">100%</div>
              <div className="text-muted-foreground">Encrypted</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-success">$2.4M</div>
              <div className="text-muted-foreground">Protected Royalties</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-royalty">1,200+</div>
              <div className="text-muted-foreground">Artists Protected</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;