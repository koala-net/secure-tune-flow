import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { sepolia, mainnet } from 'wagmi/chains';
import { http } from 'viem';

// Get environment variables
const chainId = Number(process.env.NEXT_PUBLIC_CHAIN_ID) || 11155111;
const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL || 'https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990';
const walletConnectProjectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || '2ec9743d0d0cd7fb94dee1a7e6d33475';

// Configure chains
const chains = [sepolia, mainnet] as const;

// Create wagmi config
export const config = getDefaultConfig({
  appName: 'Secure Tune Flow',
  projectId: walletConnectProjectId,
  chains,
  transports: {
    [sepolia.id]: http(rpcUrl),
    [mainnet.id]: http(),
  },
  ssr: false, // If your dApp uses server side rendering (SSR)
});

export { chains };
