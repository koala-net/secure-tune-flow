import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Music, Calendar, DollarSign, Eye } from "lucide-react";
import AudioWaveform from "./AudioWaveform";

interface RoyaltyCardProps {
  songTitle: string;
  artist: string;
  streams: number;
  encryptedAmount: string;
  payoutDate: string;
  isLocked: boolean;
}

const RoyaltyCard = ({ 
  songTitle, 
  artist, 
  streams, 
  encryptedAmount, 
  payoutDate, 
  isLocked 
}: RoyaltyCardProps) => {
  return (
    <Card className="bg-card/50 border-border hover:border-accent/50 transition-all duration-300 hover:glow-accent">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-primary p-2 rounded-lg">
              <Music className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <CardTitle className="text-lg text-foreground">{songTitle}</CardTitle>
              <p className="text-muted-foreground text-sm">{artist}</p>
            </div>
          </div>
          <Badge 
            variant={isLocked ? "destructive" : "default"}
            className={isLocked ? "bg-muted text-muted-foreground" : "bg-success text-success-foreground"}
          >
            {isLocked ? "Encrypted" : "Unlocked"}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Waveform */}
        <AudioWaveform locked={isLocked} className="h-16" bars={15} />
        
        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Total Streams</p>
            <p className="font-semibold text-foreground">{streams.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Royalty Amount</p>
            <p className="font-semibold text-royalty">
              {isLocked ? encryptedAmount : `$${Math.random() * 1000 + 100 | 0}`}
            </p>
          </div>
        </div>
        
        {/* Payout Date */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center text-muted-foreground">
            <Calendar className="h-4 w-4 mr-1" />
            Payout: {payoutDate}
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <Button variant="outline" size="sm" className="flex-1">
            <Eye className="h-4 w-4 mr-1" />
            Details
          </Button>
          {!isLocked && (
            <Button size="sm" className="bg-gradient-royalty text-royalty-foreground">
              <DollarSign className="h-4 w-4 mr-1" />
              Claim
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RoyaltyCard;