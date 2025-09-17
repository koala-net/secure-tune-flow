import { Button } from "@/components/ui/button";
import { Wallet, Shield, Music } from "lucide-react";

const Header = () => {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Music className="h-8 w-8 text-accent" />
            <Shield className="h-4 w-4 text-primary absolute -top-1 -right-1" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">RoyaltyFHE</h1>
            <p className="text-xs text-muted-foreground">Fully Homomorphic Encryption</p>
          </div>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#features" className="text-muted-foreground hover:text-accent transition-colors">
            Features
          </a>
          <a href="#security" className="text-muted-foreground hover:text-accent transition-colors">
            Security
          </a>
          <a href="#dashboard" className="text-muted-foreground hover:text-accent transition-colors">
            Dashboard
          </a>
        </nav>

        <Button variant="outline" className="bg-gradient-primary border-accent/50 text-accent-foreground hover:bg-accent/20 glow-accent">
          <Wallet className="h-4 w-4 mr-2" />
          Connect Wallet
        </Button>
      </div>
    </header>
  );
};

export default Header;