import { Button } from "@/components/ui/button";
import { Wallet, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "./Logo";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3">
          <Logo />
          <div>
            <h1 className="text-xl font-bold text-foreground">CryptoBeats</h1>
            <p className="text-xs text-muted-foreground">FHE Secured</p>
          </div>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link 
            to="/" 
            className={`text-muted-foreground hover:text-accent transition-colors ${
              location.pathname === '/' ? 'text-accent' : ''
            }`}
          >
            Home
          </Link>
          <Link 
            to="/dashboard" 
            className={`text-muted-foreground hover:text-accent transition-colors ${
              location.pathname === '/dashboard' ? 'text-accent' : ''
            }`}
          >
            Dashboard
          </Link>
        </nav>

        {/* Wallet Button & Mobile Menu */}
        <div className="flex items-center space-x-4">
          <Button variant="outline" className="bg-gradient-primary border-accent/50 text-accent-foreground hover:bg-accent/20 glow-accent">
            <Wallet className="h-4 w-4 mr-2" />
            Connect Wallet
          </Button>
          
          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-muted-foreground hover:text-accent"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-background border-b border-border shadow-lg">
            <nav className="flex flex-col p-4 space-y-4">
              <Link 
                to="/" 
                className={`text-muted-foreground hover:text-accent transition-colors ${
                  location.pathname === '/' ? 'text-accent' : ''
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/dashboard" 
                className={`text-muted-foreground hover:text-accent transition-colors ${
                  location.pathname === '/dashboard' ? 'text-accent' : ''
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;