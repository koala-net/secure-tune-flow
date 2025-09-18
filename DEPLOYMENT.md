# 🎵 MelodyVault - Deployment Guide

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub Repository**: Ensure your code is pushed to GitHub
3. **Environment Variables**: Prepare the required environment variables

## Step-by-Step Deployment Instructions

### Step 1: Connect to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your GitHub repository: `your-username/your-repo-name`
4. Select the repository and click "Import"

### Step 2: Configure Project Settings

#### Framework Preset
- **Framework Preset**: Vite
- **Root Directory**: `./` (default)
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### Step 3: Environment Variables Configuration

Add the following environment variables in Vercel dashboard:

#### Required Environment Variables

```bash
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

#### How to Add Environment Variables in Vercel:

1. In your Vercel project dashboard
2. Go to **Settings** → **Environment Variables**
3. Add each variable with the exact values above
4. Make sure to set them for **Production**, **Preview**, and **Development** environments

### Step 4: Build Configuration

#### Vite Configuration
The project uses Vite with the following configuration:
- **Build Tool**: Vite
- **TypeScript**: Enabled
- **Tailwind CSS**: Configured
- **shadcn/ui**: Integrated

#### Custom Build Settings (if needed)
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "installCommand": "npm install",
  "framework": "vite"
}
```

### Step 5: Domain Configuration

#### Custom Domain (Optional)
1. Go to **Settings** → **Domains**
2. Add your custom domain
3. Configure DNS records as instructed by Vercel

#### Default Vercel Domain
Your app will be available at: `https://secure-tune-flow-{random}.vercel.app`

### Step 6: Deploy

1. Click **Deploy** button
2. Wait for the build process to complete
3. Your app will be live at the provided URL

### Step 7: Post-Deployment Verification

#### Check the following:
1. **Wallet Connection**: Test RainbowKit wallet connection
2. **Network**: Ensure Sepolia testnet is properly configured
3. **Contract Interaction**: Verify smart contract functions work
4. **Responsive Design**: Test on different screen sizes

### Step 8: Smart Contract Deployment (Separate)

#### Deploy Smart Contracts to Sepolia:

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

### Step 9: Monitoring and Maintenance

#### Vercel Analytics
1. Enable Vercel Analytics in your project settings
2. Monitor performance and user interactions

#### Error Monitoring
1. Set up error tracking (optional)
2. Monitor console for any issues

## Troubleshooting

### Common Issues:

1. **Build Failures**:
   - Check environment variables are set correctly
   - Verify all dependencies are installed
   - Check for TypeScript errors

2. **Wallet Connection Issues**:
   - Verify `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID` is correct
   - Check RPC URL is accessible
   - Ensure network configuration matches

3. **Contract Interaction Issues**:
   - Verify contract is deployed
   - Check contract address is correct
   - Ensure user has sufficient ETH for gas

### Support

For issues related to:
- **Vercel Deployment**: Check Vercel documentation
- **Smart Contracts**: Verify Hardhat configuration
- **Wallet Integration**: Check RainbowKit documentation

## Security Notes

- Never commit private keys to the repository
- Use environment variables for sensitive data
- Regularly rotate API keys
- Monitor for unauthorized access

## Performance Optimization

- Enable Vercel's Edge Functions for better performance
- Use CDN for static assets
- Optimize images and assets
- Monitor Core Web Vitals

---

**Deployment Status**: ✅ Ready for Production
**Last Updated**: December 2024
**Version**: 1.0.0
