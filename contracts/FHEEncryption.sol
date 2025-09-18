// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/**
 * @title FHEEncryption
 * @dev Smart contract for managing FHE (Fully Homomorphic Encryption) operations
 * @notice This contract handles FHE key management and encrypted data operations
 */
contract FHEEncryption is Ownable, ReentrancyGuard {
    
    // Events
    event FHEKeyGenerated(
        address indexed generator,
        string publicKey,
        string privateKeyHash,
        uint256 timestamp
    );
    
    event DataEncrypted(
        address indexed encrypter,
        string encryptedData,
        string dataHash,
        uint256 timestamp
    );
    
    event DataDecrypted(
        address indexed decrypter,
        string decryptedData,
        string dataHash,
        uint256 timestamp
    );
    
    event KeyRotated(
        address indexed rotator,
        string oldPublicKey,
        string newPublicKey,
        uint256 timestamp
    );
    
    // Structs
    struct FHEKeyPair {
        string publicKey;
        string privateKeyHash; // Hash of private key for verification
        uint256 createdAt;
        bool isActive;
    }
    
    struct EncryptedData {
        string data;
        string hash;
        address owner;
        uint256 createdAt;
        bool isActive;
    }
    
    // State variables
    mapping(address => FHEKeyPair) public userKeys;
    mapping(string => EncryptedData) public encryptedDataRegistry;
    mapping(address => string[]) public userEncryptedData;
    
    string public globalPublicKey;
    string public globalPrivateKeyHash;
    uint256 public keyRotationInterval = 30 days; // Key rotation interval
    uint256 public lastKeyRotation;
    
    // Modifiers
    modifier onlyKeyOwner() {
        require(userKeys[msg.sender].isActive, "No active key pair");
        _;
    }
    
    modifier validEncryptedData(string memory dataHash) {
        require(encryptedDataRegistry[dataHash].isActive, "Encrypted data not found or inactive");
        _;
    }
    
    constructor() {
        lastKeyRotation = block.timestamp;
    }
    
    /**
     * @dev Generate FHE key pair for a user
     * @param publicKey FHE public key
     * @param privateKeyHash Hash of the private key
     */
    function generateFHEKeyPair(
        string memory publicKey,
        string memory privateKeyHash
    ) external {
        require(bytes(publicKey).length > 0, "Public key required");
        require(bytes(privateKeyHash).length > 0, "Private key hash required");
        require(!userKeys[msg.sender].isActive, "Key pair already exists");
        
        userKeys[msg.sender] = FHEKeyPair({
            publicKey: publicKey,
            privateKeyHash: privateKeyHash,
            createdAt: block.timestamp,
            isActive: true
        });
        
        emit FHEKeyGenerated(msg.sender, publicKey, privateKeyHash, block.timestamp);
    }
    
    /**
     * @dev Encrypt data using FHE
     * @param data Data to encrypt
     * @param dataHash Hash of the original data
     * @param encryptedData FHE encrypted data
     */
    function encryptData(
        string memory data,
        string memory dataHash,
        string memory encryptedData
    ) external onlyKeyOwner {
        require(bytes(data).length > 0, "Data required");
        require(bytes(dataHash).length > 0, "Data hash required");
        require(bytes(encryptedData).length > 0, "Encrypted data required");
        require(!encryptedDataRegistry[dataHash].isActive, "Data already encrypted");
        
        encryptedDataRegistry[dataHash] = EncryptedData({
            data: encryptedData,
            hash: dataHash,
            owner: msg.sender,
            createdAt: block.timestamp,
            isActive: true
        });
        
        userEncryptedData[msg.sender].push(dataHash);
        
        emit DataEncrypted(msg.sender, encryptedData, dataHash, block.timestamp);
    }
    
    /**
     * @dev Decrypt data using FHE
     * @param dataHash Hash of the encrypted data
     * @param decryptedData Decrypted data
     */
    function decryptData(
        string memory dataHash,
        string memory decryptedData
    ) external validEncryptedData(dataHash) {
        EncryptedData memory encryptedData = encryptedDataRegistry[dataHash];
        require(encryptedData.owner == msg.sender, "Not authorized to decrypt");
        
        emit DataDecrypted(msg.sender, decryptedData, dataHash, block.timestamp);
    }
    
    /**
     * @dev Rotate FHE keys (only owner)
     * @param newPublicKey New global public key
     * @param newPrivateKeyHash Hash of new private key
     */
    function rotateGlobalKeys(
        string memory newPublicKey,
        string memory newPrivateKeyHash
    ) external onlyOwner {
        require(bytes(newPublicKey).length > 0, "New public key required");
        require(bytes(newPrivateKeyHash).length > 0, "New private key hash required");
        require(
            block.timestamp >= lastKeyRotation + keyRotationInterval,
            "Key rotation interval not met"
        );
        
        string memory oldPublicKey = globalPublicKey;
        globalPublicKey = newPublicKey;
        globalPrivateKeyHash = newPrivateKeyHash;
        lastKeyRotation = block.timestamp;
        
        emit KeyRotated(msg.sender, oldPublicKey, newPublicKey, block.timestamp);
    }
    
    /**
     * @dev Update user's FHE key pair
     * @param newPublicKey New public key
     * @param newPrivateKeyHash Hash of new private key
     */
    function updateUserKeyPair(
        string memory newPublicKey,
        string memory newPrivateKeyHash
    ) external onlyKeyOwner {
        require(bytes(newPublicKey).length > 0, "New public key required");
        require(bytes(newPrivateKeyHash).length > 0, "New private key hash required");
        
        userKeys[msg.sender].publicKey = newPublicKey;
        userKeys[msg.sender].privateKeyHash = newPrivateKeyHash;
        
        emit FHEKeyGenerated(msg.sender, newPublicKey, newPrivateKeyHash, block.timestamp);
    }
    
    /**
     * @dev Deactivate user's key pair
     */
    function deactivateKeyPair() external onlyKeyOwner {
        userKeys[msg.sender].isActive = false;
    }
    
    /**
     * @dev Deactivate encrypted data
     * @param dataHash Hash of the data to deactivate
     */
    function deactivateEncryptedData(string memory dataHash) external {
        require(encryptedDataRegistry[dataHash].owner == msg.sender, "Not authorized");
        encryptedDataRegistry[dataHash].isActive = false;
    }
    
    /**
     * @dev Get user's FHE key pair
     * @param user Address of the user
     * @return FHEKeyPair struct
     */
    function getUserKeyPair(address user) external view returns (FHEKeyPair memory) {
        return userKeys[user];
    }
    
    /**
     * @dev Get encrypted data
     * @param dataHash Hash of the data
     * @return EncryptedData struct
     */
    function getEncryptedData(string memory dataHash) external view returns (EncryptedData memory) {
        return encryptedDataRegistry[dataHash];
    }
    
    /**
     * @dev Get user's encrypted data hashes
     * @param user Address of the user
     * @return Array of data hashes
     */
    function getUserEncryptedData(address user) external view returns (string[] memory) {
        return userEncryptedData[user];
    }
    
    /**
     * @dev Check if user has active key pair
     * @param user Address of the user
     * @return True if user has active key pair
     */
    function hasActiveKeyPair(address user) external view returns (bool) {
        return userKeys[user].isActive;
    }
    
    /**
     * @dev Check if encrypted data is active
     * @param dataHash Hash of the data
     * @return True if data is active
     */
    function isEncryptedDataActive(string memory dataHash) external view returns (bool) {
        return encryptedDataRegistry[dataHash].isActive;
    }
    
    /**
     * @dev Get global public key
     * @return Global public key
     */
    function getGlobalPublicKey() external view returns (string memory) {
        return globalPublicKey;
    }
    
    /**
     * @dev Set key rotation interval (only owner)
     * @param newInterval New interval in seconds
     */
    function setKeyRotationInterval(uint256 newInterval) external onlyOwner {
        require(newInterval > 0, "Invalid interval");
        keyRotationInterval = newInterval;
    }
    
    /**
     * @dev Check if key rotation is due
     * @return True if key rotation is due
     */
    function isKeyRotationDue() external view returns (bool) {
        return block.timestamp >= lastKeyRotation + keyRotationInterval;
    }
    
    /**
     * @dev Get time until next key rotation
     * @return Seconds until next rotation
     */
    function getTimeUntilKeyRotation() external view returns (uint256) {
        uint256 nextRotation = lastKeyRotation + keyRotationInterval;
        if (block.timestamp >= nextRotation) {
            return 0;
        }
        return nextRotation - block.timestamp;
    }
}
