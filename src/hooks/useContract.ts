import { useContract, useContractRead, useContractWrite, useAccount } from 'wagmi';
import { useMemo } from 'react';

// Contract addresses (these should be set after deployment)
const SECURE_MUSIC_FLOW_ADDRESS = process.env.NEXT_PUBLIC_MUSIC_CONTRACT_ADDRESS || '';
const FHE_ENCRYPTION_ADDRESS = process.env.NEXT_PUBLIC_FHE_CONTRACT_ADDRESS || '';

// Contract ABIs (simplified for demo)
const SECURE_MUSIC_FLOW_ABI = [
  {
    "inputs": [
      {"internalType": "string", "name": "encryptedMetadata", "type": "string"},
      {"internalType": "string", "name": "ipfsHash", "type": "string"},
      {"internalType": "address[]", "name": "recipients", "type": "address[]"},
      {"internalType": "uint256[]", "name": "percentages", "type": "uint256[]"}
    ],
    "name": "registerMusic",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "musicId", "type": "uint256"},
      {"internalType": "uint256", "name": "licenseType", "type": "uint256"},
      {"internalType": "uint256", "name": "validUntil", "type": "uint256"}
    ],
    "name": "purchaseLicense",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "musicId", "type": "uint256"}],
    "name": "getMusic",
    "outputs": [
      {
        "components": [
          {"internalType": "uint256", "name": "id", "type": "uint256"},
          {"internalType": "address", "name": "artist", "type": "address"},
          {"internalType": "string", "name": "encryptedMetadata", "type": "string"},
          {"internalType": "string", "name": "ipfsHash", "type": "string"},
          {"internalType": "uint256", "name": "totalLicenses", "type": "uint256"},
          {"internalType": "uint256", "name": "totalRevenue", "type": "uint256"},
          {"internalType": "bool", "name": "isActive", "type": "bool"},
          {"internalType": "uint256", "name": "createdAt", "type": "uint256"}
        ],
        "internalType": "struct SecureMusicFlow.Music",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getTotalMusic",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  }
] as const;

const FHE_ENCRYPTION_ABI = [
  {
    "inputs": [
      {"internalType": "string", "name": "publicKey", "type": "string"},
      {"internalType": "string", "name": "privateKeyHash", "type": "string"}
    ],
    "name": "generateFHEKeyPair",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "string", "name": "data", "type": "string"},
      {"internalType": "string", "name": "dataHash", "type": "string"},
      {"internalType": "string", "name": "encryptedData", "type": "string"}
    ],
    "name": "encryptData",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address", "name": "user", "type": "address"}],
    "name": "getUserKeyPair",
    "outputs": [
      {
        "components": [
          {"internalType": "string", "name": "publicKey", "type": "string"},
          {"internalType": "string", "name": "privateKeyHash", "type": "string"},
          {"internalType": "uint256", "name": "createdAt", "type": "uint256"},
          {"internalType": "bool", "name": "isActive", "type": "bool"}
        ],
        "internalType": "struct FHEEncryption.FHEKeyPair",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
] as const;

export const useSecureMusicFlow = () => {
  const { address } = useAccount();
  
  const contract = useContract({
    address: SECURE_MUSIC_FLOW_ADDRESS as `0x${string}`,
    abi: SECURE_MUSIC_FLOW_ABI,
  });

  const { data: totalMusic, refetch: refetchTotalMusic } = useContractRead({
    address: SECURE_MUSIC_FLOW_ADDRESS as `0x${string}`,
    abi: SECURE_MUSIC_FLOW_ABI,
    functionName: 'getTotalMusic',
  });

  const registerMusic = useContractWrite({
    address: SECURE_MUSIC_FLOW_ADDRESS as `0x${string}`,
    abi: SECURE_MUSIC_FLOW_ABI,
    functionName: 'registerMusic',
  });

  const purchaseLicense = useContractWrite({
    address: SECURE_MUSIC_FLOW_ADDRESS as `0x${string}`,
    abi: SECURE_MUSIC_FLOW_ABI,
    functionName: 'purchaseLicense',
  });

  return {
    contract,
    totalMusic,
    refetchTotalMusic,
    registerMusic,
    purchaseLicense,
  };
};

export const useFHEEncryption = () => {
  const { address } = useAccount();
  
  const contract = useContract({
    address: FHE_ENCRYPTION_ADDRESS as `0x${string}`,
    abi: FHE_ENCRYPTION_ABI,
  });

  const { data: userKeyPair, refetch: refetchUserKeyPair } = useContractRead({
    address: FHE_ENCRYPTION_ADDRESS as `0x${string}`,
    abi: FHE_ENCRYPTION_ABI,
    functionName: 'getUserKeyPair',
    args: address ? [address] : undefined,
    enabled: !!address,
  });

  const generateKeyPair = useContractWrite({
    address: FHE_ENCRYPTION_ADDRESS as `0x${string}`,
    abi: FHE_ENCRYPTION_ABI,
    functionName: 'generateFHEKeyPair',
  });

  const encryptData = useContractWrite({
    address: FHE_ENCRYPTION_ADDRESS as `0x${string}`,
    abi: FHE_ENCRYPTION_ABI,
    functionName: 'encryptData',
  });

  return {
    contract,
    userKeyPair,
    refetchUserKeyPair,
    generateKeyPair,
    encryptData,
  };
};

export const useMusicData = (musicId: number) => {
  const { data: music, refetch: refetchMusic } = useContractRead({
    address: SECURE_MUSIC_FLOW_ADDRESS as `0x${string}`,
    abi: SECURE_MUSIC_FLOW_ABI,
    functionName: 'getMusic',
    args: musicId ? [BigInt(musicId)] : undefined,
    enabled: !!musicId,
  });

  return {
    music,
    refetchMusic,
  };
};
