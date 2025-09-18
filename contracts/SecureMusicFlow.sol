// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/**
 * @title SecureMusicFlow
 * @dev A smart contract for managing music licensing and royalty distribution with FHE encryption
 * @notice This contract handles encrypted music metadata and automated royalty payments
 */
contract SecureMusicFlow is ReentrancyGuard, Ownable {
    using Counters for Counters.Counter;
    
    // Events
    event MusicRegistered(
        uint256 indexed musicId,
        address indexed artist,
        string encryptedMetadata,
        uint256 timestamp
    );
    
    event LicensePurchased(
        uint256 indexed musicId,
        address indexed licensee,
        uint256 licenseType,
        uint256 price,
        uint256 timestamp
    );
    
    event RoyaltyDistributed(
        uint256 indexed musicId,
        address indexed recipient,
        uint256 amount,
        uint256 timestamp
    );
    
    event FHEKeyUpdated(
        address indexed updater,
        string newPublicKey,
        uint256 timestamp
    );
    
    // Structs
    struct Music {
        uint256 id;
        address artist;
        string encryptedMetadata; // FHE encrypted music data
        string ipfsHash;
        uint256 totalLicenses;
        uint256 totalRevenue;
        bool isActive;
        uint256 createdAt;
    }
    
    struct License {
        uint256 musicId;
        address licensee;
        uint256 licenseType; // 1: Personal, 2: Commercial, 3: Exclusive
        uint256 price;
        uint256 validUntil;
        bool isActive;
    }
    
    struct RoyaltyShare {
        address recipient;
        uint256 percentage; // Basis points (10000 = 100%)
    }
    
    // State variables
    Counters.Counter private _musicIds;
    Counters.Counter private _licenseIds;
    
    mapping(uint256 => Music) public musicRegistry;
    mapping(uint256 => License) public licenses;
    mapping(uint256 => RoyaltyShare[]) public royaltyShares;
    mapping(address => uint256[]) public artistMusic;
    mapping(address => uint256[]) public licenseeMusic;
    
    // FHE Configuration
    string public fhePublicKey;
    uint256 public constant MAX_ROYALTY_SHARES = 10;
    uint256 public constant BASIS_POINTS = 10000;
    
    // License types and pricing
    mapping(uint256 => uint256) public licensePrices;
    
    constructor() {
        // Set initial license prices (in wei)
        licensePrices[1] = 0.01 ether; // Personal license
        licensePrices[2] = 0.1 ether;  // Commercial license
        licensePrices[3] = 1 ether;    // Exclusive license
        
        // Initialize FHE public key (should be set by owner)
        fhePublicKey = "initial_key_placeholder";
    }
    
    /**
     * @dev Register new music with FHE encrypted metadata
     * @param encryptedMetadata FHE encrypted music metadata
     * @param ipfsHash IPFS hash of the music file
     * @param recipients Array of royalty recipients
     * @param percentages Array of royalty percentages (basis points)
     */
    function registerMusic(
        string memory encryptedMetadata,
        string memory ipfsHash,
        address[] memory recipients,
        uint256[] memory percentages
    ) external {
        require(bytes(encryptedMetadata).length > 0, "Encrypted metadata required");
        require(bytes(ipfsHash).length > 0, "IPFS hash required");
        require(recipients.length == percentages.length, "Recipients and percentages length mismatch");
        require(recipients.length <= MAX_ROYALTY_SHARES, "Too many royalty recipients");
        
        // Validate royalty percentages sum to 100%
        uint256 totalPercentage = 0;
        for (uint256 i = 0; i < percentages.length; i++) {
            require(percentages[i] > 0, "Invalid percentage");
            totalPercentage += percentages[i];
        }
        require(totalPercentage == BASIS_POINTS, "Royalty percentages must sum to 100%");
        
        _musicIds.increment();
        uint256 musicId = _musicIds.current();
        
        musicRegistry[musicId] = Music({
            id: musicId,
            artist: msg.sender,
            encryptedMetadata: encryptedMetadata,
            ipfsHash: ipfsHash,
            totalLicenses: 0,
            totalRevenue: 0,
            isActive: true,
            createdAt: block.timestamp
        });
        
        // Set up royalty shares
        for (uint256 i = 0; i < recipients.length; i++) {
            royaltyShares[musicId].push(RoyaltyShare({
                recipient: recipients[i],
                percentage: percentages[i]
            }));
        }
        
        artistMusic[msg.sender].push(musicId);
        
        emit MusicRegistered(musicId, msg.sender, encryptedMetadata, block.timestamp);
    }
    
    /**
     * @dev Purchase a license for music
     * @param musicId ID of the music
     * @param licenseType Type of license (1: Personal, 2: Commercial, 3: Exclusive)
     * @param validUntil Timestamp until which license is valid
     */
    function purchaseLicense(
        uint256 musicId,
        uint256 licenseType,
        uint256 validUntil
    ) external payable nonReentrant {
        require(musicRegistry[musicId].isActive, "Music not active");
        require(licenseType >= 1 && licenseType <= 3, "Invalid license type");
        require(validUntil > block.timestamp, "Invalid validity period");
        require(msg.value >= licensePrices[licenseType], "Insufficient payment");
        
        _licenseIds.increment();
        uint256 licenseId = _licenseIds.current();
        
        licenses[licenseId] = License({
            musicId: musicId,
            licensee: msg.sender,
            licenseType: licenseType,
            price: msg.value,
            validUntil: validUntil,
            isActive: true
        });
        
        // Update music statistics
        musicRegistry[musicId].totalLicenses++;
        musicRegistry[musicId].totalRevenue += msg.value;
        
        licenseeMusic[msg.sender].push(musicId);
        
        // Distribute royalties
        _distributeRoyalties(musicId, msg.value);
        
        emit LicensePurchased(musicId, msg.sender, licenseType, msg.value, block.timestamp);
    }
    
    /**
     * @dev Distribute royalties to recipients
     * @param musicId ID of the music
     * @param totalAmount Total amount to distribute
     */
    function _distributeRoyalties(uint256 musicId, uint256 totalAmount) internal {
        RoyaltyShare[] memory shares = royaltyShares[musicId];
        
        for (uint256 i = 0; i < shares.length; i++) {
            uint256 shareAmount = (totalAmount * shares[i].percentage) / BASIS_POINTS;
            
            if (shareAmount > 0) {
                payable(shares[i].recipient).transfer(shareAmount);
                
                emit RoyaltyDistributed(
                    musicId,
                    shares[i].recipient,
                    shareAmount,
                    block.timestamp
                );
            }
        }
    }
    
    /**
     * @dev Update FHE public key (only owner)
     * @param newPublicKey New FHE public key
     */
    function updateFHEPublicKey(string memory newPublicKey) external onlyOwner {
        require(bytes(newPublicKey).length > 0, "Invalid public key");
        fhePublicKey = newPublicKey;
        
        emit FHEKeyUpdated(msg.sender, newPublicKey, block.timestamp);
    }
    
    /**
     * @dev Update license prices (only owner)
     * @param licenseType Type of license
     * @param newPrice New price in wei
     */
    function updateLicensePrice(uint256 licenseType, uint256 newPrice) external onlyOwner {
        require(licenseType >= 1 && licenseType <= 3, "Invalid license type");
        require(newPrice > 0, "Invalid price");
        licensePrices[licenseType] = newPrice;
    }
    
    /**
     * @dev Get music information
     * @param musicId ID of the music
     * @return Music struct
     */
    function getMusic(uint256 musicId) external view returns (Music memory) {
        return musicRegistry[musicId];
    }
    
    /**
     * @dev Get license information
     * @param licenseId ID of the license
     * @return License struct
     */
    function getLicense(uint256 licenseId) external view returns (License memory) {
        return licenses[licenseId];
    }
    
    /**
     * @dev Get royalty shares for music
     * @param musicId ID of the music
     * @return Array of RoyaltyShare structs
     */
    function getRoyaltyShares(uint256 musicId) external view returns (RoyaltyShare[] memory) {
        return royaltyShares[musicId];
    }
    
    /**
     * @dev Get music IDs for an artist
     * @param artist Address of the artist
     * @return Array of music IDs
     */
    function getArtistMusic(address artist) external view returns (uint256[] memory) {
        return artistMusic[artist];
    }
    
    /**
     * @dev Get music IDs for a licensee
     * @param licensee Address of the licensee
     * @return Array of music IDs
     */
    function getLicenseeMusic(address licensee) external view returns (uint256[] memory) {
        return licenseeMusic[licensee];
    }
    
    /**
     * @dev Check if a license is valid
     * @param licenseId ID of the license
     * @return True if license is valid and active
     */
    function isLicenseValid(uint256 licenseId) external view returns (bool) {
        License memory license = licenses[licenseId];
        return license.isActive && license.validUntil > block.timestamp;
    }
    
    /**
     * @dev Get total number of registered music
     * @return Total count
     */
    function getTotalMusic() external view returns (uint256) {
        return _musicIds.current();
    }
    
    /**
     * @dev Get total number of licenses
     * @return Total count
     */
    function getTotalLicenses() external view returns (uint256) {
        return _licenseIds.current();
    }
    
    /**
     * @dev Emergency function to withdraw contract balance (only owner)
     */
    function emergencyWithdraw() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No balance to withdraw");
        payable(owner()).transfer(balance);
    }
}
