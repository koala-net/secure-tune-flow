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

### Vercel Deployment

1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment

```bash
npm run build
npm run preview
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details
