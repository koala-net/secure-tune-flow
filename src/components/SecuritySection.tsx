import { Card, CardContent } from "@/components/ui/card";
import { Shield, Lock, Eye, Zap } from "lucide-react";
import AudioWaveform from "./AudioWaveform";

const SecuritySection = () => {
  const features = [
    {
      icon: Lock,
      title: "Fully Homomorphic Encryption",
      description: "Perform calculations on encrypted data without ever decrypting it. Your royalty amounts stay hidden from publishers and intermediaries.",
      color: "text-accent"
    },
    {
      icon: Shield,
      title: "Zero-Knowledge Proofs",
      description: "Verify streaming counts and calculate royalties without revealing sensitive financial data or streaming patterns.",
      color: "text-success"
    },
    {
      icon: Eye,
      title: "Transparent Verification",
      description: "All transactions are verifiable on-chain while maintaining complete privacy of individual royalty amounts.",
      color: "text-royalty"
    },
    {
      icon: Zap,
      title: "Real-time Processing",
      description: "Stream data is processed and encrypted in real-time, ensuring immediate protection of your earnings.",
      color: "text-primary"
    }
  ];

  return (
    <section id="security" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Bulletproof <span className="text-accent">Security</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Built on cutting-edge cryptographic protocols to ensure your royalties 
            remain private and protected from manipulation at every step of the process.
          </p>
        </div>

        {/* Visual Encryption Demo */}
        <div className="mb-16">
          <Card className="bg-card/50 border-accent/30 max-w-4xl mx-auto">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-semibold text-foreground mb-2">
                  Live Encryption Visualization
                </h3>
                <p className="text-muted-foreground">
                  Watch your streaming data get encrypted in real-time
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="text-left">
                    <p className="text-sm text-muted-foreground">Raw Stream Data</p>
                    <p className="font-mono text-foreground">125,000 streams → $247.50</p>
                  </div>
                  <div className="flex-1 mx-4">
                    <AudioWaveform className="h-12" bars={20} locked={false} />
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">FHE Encrypted</p>
                    <p className="font-mono text-accent">████████ → ████.██</p>
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="inline-flex items-center space-x-2 bg-gradient-security px-4 py-2 rounded-full">
                    <Shield className="h-4 w-4 text-success" />
                    <span className="text-success-foreground text-sm font-medium">
                      Encryption Complete - Data Protected
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Security Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="bg-card/50 border-border hover:border-accent/50 transition-all duration-300 group">
              <CardContent className="p-8">
                <div className="flex items-start space-x-4">
                  <div className={`${feature.color} group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="h-8 w-8" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Technical Specs */}
        <div className="mt-16">
          <Card className="bg-gradient-to-r from-card/50 to-secondary/50 border-accent/30">
            <CardContent className="p-8">
              <h3 className="text-2xl font-semibold text-foreground mb-6 text-center">
                Technical Specifications
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent mb-2">256-bit</div>
                  <p className="text-muted-foreground">Encryption Standard</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-success mb-2">&lt;100ms</div>
                  <p className="text-muted-foreground">Encryption Latency</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-royalty mb-2">99.99%</div>
                  <p className="text-muted-foreground">Security Uptime</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default SecuritySection;