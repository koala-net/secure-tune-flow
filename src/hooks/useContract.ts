import { useReadContract, useWriteContract, useAccount } from 'wagmi';
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
  
  const { data: totalMusic, refetch: refetchTotalMusic } = useReadContract({
    address: SECURE_MUSIC_FLOW_ADDRESS as `0x${string}`,
    abi: SECURE_MUSIC_FLOW_ABI,
    functionName: 'getTotalMusic',
  });

  const { writeContract: writeContract, isPending: isRegistering } = useWriteContract();

  const registerMusic = (encryptedMetadata: string, ipfsHash: string, recipients: string[], percentages: number[]) => {
    writeContract({
      address: SECURE_MUSIC_FLOW_ADDRESS as `0x${string}`,
      abi: SECURE_MUSIC_FLOW_ABI,
      functionName: 'registerMusic',
      args: [encryptedMetadata, ipfsHash, recipients, percentages],
    });
  };

  const purchaseLicense = (musicId: number, licenseType: number, validUntil: number, value?: bigint) => {
    writeContract({
      address: SECURE_MUSIC_FLOW_ADDRESS as `0x${string}`,
      abi: SECURE_MUSIC_FLOW_ABI,
      functionName: 'purchaseLicense',
      args: [BigInt(musicId), BigInt(licenseType), BigInt(validUntil)],
      value: value,
    });
  };

  return {
    totalMusic,
    refetchTotalMusic,
    registerMusic,
    purchaseLicense,
    isRegistering,
  };
};

export const useFHEEncryption = () => {
  const { address } = useAccount();
  
  const { data: userKeyPair, refetch: refetchUserKeyPair } = useReadContract({
    address: FHE_ENCRYPTION_ADDRESS as `0x${string}`,
    abi: FHE_ENCRYPTION_ABI,
    functionName: 'getUserKeyPair',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  });

  const { writeContract: writeContract, isPending: isProcessing } = useWriteContract();

  const generateKeyPair = (publicKey: string, privateKeyHash: string) => {
    writeContract({
      address: FHE_ENCRYPTION_ADDRESS as `0x${string}`,
      abi: FHE_ENCRYPTION_ABI,
      functionName: 'generateFHEKeyPair',
      args: [publicKey, privateKeyHash],
    });
  };

  const encryptData = (data: string, dataHash: string, encryptedData: string) => {
    writeContract({
      address: FHE_ENCRYPTION_ADDRESS as `0x${string}`,
      abi: FHE_ENCRYPTION_ABI,
      functionName: 'encryptData',
      args: [data, dataHash, encryptedData],
    });
  };

  return {
    userKeyPair,
    refetchUserKeyPair,
    generateKeyPair,
    encryptData,
    isProcessing,
  };
};

export const useMusicData = (musicId: number) => {
  const { data: music, refetch: refetchMusic } = useReadContract({
    address: SECURE_MUSIC_FLOW_ADDRESS as `0x${string}`,
    abi: SECURE_MUSIC_FLOW_ABI,
    functionName: 'getMusic',
    args: musicId ? [BigInt(musicId)] : undefined,
    query: { enabled: !!musicId },
  });

  return {
    music,
    refetchMusic,
  };
};
