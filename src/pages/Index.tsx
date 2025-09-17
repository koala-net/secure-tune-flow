import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import SecuritySection from "../components/SecuritySection";
import Dashboard from "../components/Dashboard";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <SecuritySection />
      <Dashboard />
    </div>
  );
};

export default Index;
