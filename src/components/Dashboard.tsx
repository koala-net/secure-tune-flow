import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DollarSign, Music, TrendingUp, Headphones, Plus, Mic } from "lucide-react";
import RoyaltyCard from "./RoyaltyCard";
import AudioWaveform from "./AudioWaveform";
import { useSecureMusicFlow, useMusicData } from "../hooks/useContract";
import { useEncryptedData } from "../hooks/useEncryptedData";
import { useState } from "react";

const Dashboard = () => {
  const [newTrackTitle, setNewTrackTitle] = useState("");
  const [newTrackIpfsHash, setNewTrackIpfsHash] = useState("");
  const [newTrackRoyaltyData, setNewTrackRoyaltyData] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  
  const { registerMusic, isRegistering } = useSecureMusicFlow();
  const { music } = useMusicData(1); // Get first track as example
  const { registerEncryptedMusic, generateKeyPair, isProcessing } = useEncryptedData();

  const handleRegisterTrack = async () => {
    if (!newTrackTitle || !newTrackIpfsHash || !newTrackRoyaltyData) {
      alert("Please fill in all fields");
      return;
    }
    
    setIsRegistering(true);
    try {
      // First generate encryption key if not exists
      await generateKeyPair();
      
      // Register music with encrypted data
      await registerEncryptedMusic(
        newTrackTitle,
        "Encrypted music track",
        newTrackIpfsHash,
        [], // recipients
        [] // percentages
      );
      
      alert("Music track registered successfully with encryption!");
    } catch (err) {
      console.error("Failed to register track:", err);
      alert("Failed to register track. Please try again.");
    } finally {
      setIsRegistering(false);
    }
  };

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
            Your <span className="text-accent">Music</span> Dashboard
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Track your music performance and earnings with complete privacy. 
            Your creative data stays protected while you grow your audience.
          </p>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card className="bg-gradient-to-br from-purple-500/10 to-blue-600/10 border-purple-500/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-600">
                Total Earnings
              </CardTitle>
              <Music className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">
                $2,847.32
              </div>
              <p className="text-xs text-purple-600/80">
                +20.1% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500/10 to-emerald-600/10 border-green-500/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-600">
                Available Now
              </CardTitle>
              <DollarSign className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                $1,247.82
              </div>
              <p className="text-xs text-green-600/80">
                Ready to claim
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-600/10 border-blue-500/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-600">
                Total Streams
              </CardTitle>
              <Headphones className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                2.4M
              </div>
              <p className="text-xs text-blue-600/80">
                +12.5% this month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500/10 to-red-600/10 border-orange-500/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-orange-600">
                Active Songs
              </CardTitle>
              <Mic className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">
                18
              </div>
              <p className="text-xs text-orange-600/80">
                3 new this month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Register New Track Form */}
        <Card className="bg-card/50 border-accent/30 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Plus className="h-5 w-5 text-accent mr-2" />
              Register New Music Track
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Track Title
                </label>
                <input
                  type="text"
                  value={newTrackTitle}
                  onChange={(e) => setNewTrackTitle(e.target.value)}
                  placeholder="Enter track title"
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  IPFS Hash
                </label>
                <input
                  type="text"
                  value={newTrackIpfsHash}
                  onChange={(e) => setNewTrackIpfsHash(e.target.value)}
                  placeholder="Enter IPFS hash"
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Encrypted Royalty Data
                </label>
                <input
                  type="text"
                  value={newTrackRoyaltyData}
                  onChange={(e) => setNewTrackRoyaltyData(e.target.value)}
                  placeholder="Enter encrypted royalty data"
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                />
              </div>
            </div>
            <button
              onClick={handleRegisterTrack}
              disabled={isRegistering || isProcessing}
              className="w-full bg-accent text-accent-foreground px-4 py-2 rounded-md hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isRegistering || isProcessing ? "Encrypting & Registering..." : "🎵 Register Encrypted Track"}
            </button>
            {isRegistering && (
              <div className="mt-2 text-sm text-blue-500">
                🔐 Encrypting your music data...
              </div>
            )}
          </CardContent>
        </Card>

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
                  <Music className="h-5 w-5 text-accent mr-2" />
                  Live Music Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center mb-4">
                  <AudioWaveform className="h-24 w-full max-w-md" bars={25} locked={true} />
                </div>
                <div className="text-center">
                  <Badge className="bg-accent text-accent-foreground">
                    🎵 Music Protected - Privacy Active
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