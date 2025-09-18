# 🎵 MelodyVault

> *Where Music Meets Privacy - A Decentralized Music Platform with Advanced Encryption*

MelodyVault is a revolutionary decentralized music platform that combines the power of blockchain technology with cutting-edge privacy protection. Built for artists who value both transparency and confidentiality in their creative journey.

## ✨ Key Features

- 🎼 **Private Music Creation**: Upload and manage your tracks with complete privacy
- 🔐 **Advanced Encryption**: Your creative data stays protected with state-of-the-art encryption
- 💰 **Fair Royalty Distribution**: Automated and transparent payment systems
- 🌐 **Global Access**: Connect from anywhere with our decentralized infrastructure
- 📊 **Analytics Dashboard**: Track your music's performance while maintaining privacy

## 🛠️ Tech Stack

- 🎨 **Frontend**: React, TypeScript, Vite, Tailwind CSS
- 🧩 **UI Components**: shadcn/ui, Radix UI
- ⛓️ **Blockchain**: Ethereum, Sepolia Testnet
- 💳 **Wallet**: RainbowKit, Wagmi, Viem
- 🔒 **Encryption**: Advanced Privacy Protection
- 📁 **Storage**: Decentralized File Storage

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
# Blockchain Configuration
NEXT_PUBLIC_CHAIN_ID=your_chain_id
NEXT_PUBLIC_RPC_URL=your_rpc_url

# Wallet Connect Configuration  
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_project_id

# API Configuration
NEXT_PUBLIC_INFURA_API_KEY=your_api_key
```

5. Start development server:
```bash
npm run dev
```

## 🎼 Smart Contracts

Our platform includes intelligent contracts for:
- 🎵 **Music Licensing**: Secure and automated licensing system
- 💰 **Royalty Payments**: Transparent and fair distribution
- 🔐 **Data Protection**: Advanced encryption for sensitive information
- 🏛️ **Governance**: Community-driven decision making

## 🔒 Security & Privacy

- 🛡️ **Advanced Encryption**: All sensitive data is protected with cutting-edge encryption
- 🔍 **Audited Contracts**: Smart contracts undergo rigorous security audits
- 🌐 **Decentralized Architecture**: No single point of failure
- 🔑 **Secure Authentication**: Wallet-based identity verification

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
   NEXT_PUBLIC_CHAIN_ID=your_chain_id
   NEXT_PUBLIC_RPC_URL=your_rpc_url
   
   # Wallet Connect Configuration
   NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_project_id
   
   # API Configuration
   NEXT_PUBLIC_INFURA_API_KEY=your_api_key
   
   # Alternative RPC URL (backup)
   NEXT_PUBLIC_RPC_URL_BACKUP=your_backup_rpc_url
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
   NEXT_PUBLIC_INFURA_API_KEY=your_api_key_here
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
