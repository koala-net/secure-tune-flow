# Secure Tune Flow

A decentralized music platform with FHE (Fully Homomorphic Encryption) security for protecting sensitive music data and royalty information.

## Features

- **FHE Encryption**: Core music data and royalty information are encrypted using Fully Homomorphic Encryption
- **Wallet Integration**: Connect with popular wallets like Rainbow, MetaMask, and more
- **Decentralized Storage**: Music files and metadata stored on IPFS
- **Smart Contracts**: Automated royalty distribution and licensing
- **Real-time Analytics**: Dashboard for tracking music performance and earnings

## Technologies Used

- **Frontend**: React, TypeScript, Vite, Tailwind CSS
- **UI Components**: shadcn/ui, Radix UI
- **Blockchain**: Ethereum, Sepolia Testnet
- **Wallet**: RainbowKit, Wagmi, Viem
- **Encryption**: FHE (Fully Homomorphic Encryption)
- **Storage**: IPFS for decentralized file storage

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/koala-net/secure-tune-flow.git
cd secure-tune-flow
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env.local
```

4. Configure environment variables:
```env
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=2ec9743d0d0cd7fb94dee1a7e6d33475
NEXT_PUBLIC_INFURA_API_KEY=b18fb7e6ca7045ac83c41157ab93f990
```

5. Start development server:
```bash
npm run dev
```

## Smart Contracts

The platform includes smart contracts for:
- Music licensing and distribution
- Automated royalty payments
- FHE-encrypted data storage
- Decentralized governance

## Security

- All sensitive data is encrypted using FHE
- Smart contracts are audited for security
- Decentralized storage prevents single points of failure
- Wallet-based authentication

## Deployment

### Quick Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/koala-net/secure-tune-flow)

### Manual Vercel Deployment

1. **Connect Repository**:
   ```bash
   # Push to GitHub first
   git push origin main
   ```

2. **Deploy to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository: `koala-net/secure-tune-flow`
   - Configure environment variables (see below)
   - Deploy!

3. **Required Environment Variables**:
   ```env
   # Blockchain Configuration
   NEXT_PUBLIC_CHAIN_ID=11155111
   NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990
   
   # Wallet Connect Configuration
   NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=2ec9743d0d0cd7fb94dee1a7e6d33475
   
   # Infura Configuration
   NEXT_PUBLIC_INFURA_API_KEY=b18fb7e6ca7045ac83c41157ab93f990
   
   # Alternative RPC URL (backup)
   NEXT_PUBLIC_RPC_URL_BACKUP=https://1rpc.io/sepolia
   ```

### Smart Contract Deployment

1. **Install Hardhat Dependencies**:
   ```bash
   cd contracts
   npm install
   ```

2. **Configure Environment**:
   ```bash
   # Add to .env.local
   SEPOLIA_PRIVATE_KEY=your_private_key_here
   NEXT_PUBLIC_INFURA_API_KEY=b18fb7e6ca7045ac83c41157ab93f990
   ```

3. **Deploy Contracts**:
   ```bash
   npx hardhat run scripts/deploy.js --network sepolia
   ```

4. **Update Contract Address**:
   - Copy the deployed contract address
   - Update `src/hooks/useContract.ts` with the new address

### Detailed Deployment Guide

For comprehensive deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)

### Alternative Deployment Options

- **Netlify**: Static site hosting with form handling
- **AWS S3 + CloudFront**: Scalable cloud hosting
- **GitHub Pages**: Free hosting for open source projects
- **Firebase Hosting**: Google's hosting platform

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details
