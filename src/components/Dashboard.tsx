import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DollarSign, Shield, TrendingUp, Music } from "lucide-react";
import RoyaltyCard from "./RoyaltyCard";
import AudioWaveform from "./AudioWaveform";

const Dashboard = () => {
  const mockRoyalties = [
    {
      songTitle: "Digital Dreams",
      artist: "CyberSound",
      streams: 125000,
      encryptedAmount: "████.██ ETH",
      payoutDate: "Dec 15, 2024",
      isLocked: true
    },
    {
      songTitle: "Neon Nights",
      artist: "SynthWave",
      streams: 89000,
      encryptedAmount: "████.██ ETH", 
      payoutDate: "Dec 1, 2024",
      isLocked: false
    },
    {
      songTitle: "Electric Pulse",
      artist: "BeatCrypto",
      streams: 156000,
      encryptedAmount: "████.██ ETH",
      payoutDate: "Dec 30, 2024", 
      isLocked: true
    }
  ];

  return (
    <section id="dashboard" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Your <span className="text-accent">Encrypted</span> Dashboard
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Monitor your royalties with complete transparency and security. 
            All amounts remain encrypted until payout date.
          </p>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card className="bg-gradient-security border-success/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-success-foreground">
                Total Encrypted
              </CardTitle>
              <Shield className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success-foreground">
                ████████ ETH
              </div>
              <p className="text-xs text-success/80">
                +20.1% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-royalty border-royalty/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-royalty-foreground">
                Available Now
              </CardTitle>
              <DollarSign className="h-4 w-4 text-royalty-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-royalty-foreground">
                $1,247.82
              </div>
              <p className="text-xs text-royalty-foreground/80">
                Ready to claim
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Streams
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                2.4M
              </div>
              <p className="text-xs text-muted-foreground">
                +12.5% this month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Active Songs
              </CardTitle>
              <Music className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                18
              </div>
              <p className="text-xs text-muted-foreground">
                3 new this month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs for different views */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="encrypted">Encrypted</TabsTrigger>
            <TabsTrigger value="available">Available</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Live Waveform */}
            <Card className="bg-card/50 border-accent/30">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 text-accent mr-2" />
                  Live Encryption Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center mb-4">
                  <AudioWaveform className="h-24 w-full max-w-md" bars={25} locked={true} />
                </div>
                <div className="text-center">
                  <Badge className="bg-accent text-accent-foreground">
                    FHE Active - All Royalties Secured
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Royalty Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockRoyalties.map((royalty, index) => (
                <RoyaltyCard key={index} {...royalty} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="encrypted">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockRoyalties
                .filter(r => r.isLocked)
                .map((royalty, index) => (
                  <RoyaltyCard key={index} {...royalty} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="available">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockRoyalties
                .filter(r => !r.isLocked)
                .map((royalty, index) => (
                  <RoyaltyCard key={index} {...royalty} />
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default Dashboard;