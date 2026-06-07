// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/**
 * @title OrbitCityHub
 * @dev NFT contract for representing physical hubs in the OrbitCity ecosystem
 */
contract OrbitCityHub is ERC721, ERC721URIStorage, Ownable, ReentrancyGuard {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    struct Hub {
        string name;
        string city;
        string category;
        address owner;
        bool verified;
        uint256 registrationFee;
        uint256 createdAt;
    }

    mapping(uint256 => Hub) public hubs;
    mapping(address => uint256[]) public ownerHubs;
    
    uint256 public registrationFee = 0.1 ether;
    address public treasury;
    
    event HubRegistered(uint256 indexed tokenId, address indexed owner, string name, string city);
    event HubVerified(uint256 indexed tokenId);
    event RegistrationFeeUpdated(uint256 newFee);

    constructor(address _treasury) ERC721("OrbitCity Hub", "OCHUB") {
        treasury = _treasury;
    }

    /**
     * @dev Register a new hub as an NFT
     */
    function registerHub(
        string memory name,
        string memory city,
        string memory category,
        string memory tokenURI
    ) public payable nonReentrant {
        require(msg.value >= registrationFee, "Insufficient registration fee");
        
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, tokenURI);
        
        hubs[tokenId] = Hub({
            name: name,
            city: city,
            category: category,
            owner: msg.sender,
            verified: false,
            registrationFee: msg.value,
            createdAt: block.timestamp
        });
        
        ownerHubs[msg.sender].push(tokenId);
        
        // Transfer fee to treasury
        (bool success, ) = treasury.call{value: msg.value}("");
        require(success, "Transfer to treasury failed");
        
        emit HubRegistered(tokenId, msg.sender, name, city);
    }

    /**
     * @dev Verify a hub (only owner can call)
     */
    function verifyHub(uint256 tokenId) public onlyOwner {
        require(_exists(tokenId), "Hub does not exist");
        hubs[tokenId].verified = true;
        emit HubVerified(tokenId);
    }

    /**
     * @dev Update registration fee
     */
    function setRegistrationFee(uint256 _newFee) public onlyOwner {
        registrationFee = _newFee;
        emit RegistrationFeeUpdated(_newFee);
    }

    /**
     * @dev Get hubs owned by an address
     */
    function getHubsByOwner(address owner) public view returns (uint256[] memory) {
        return ownerHubs[owner];
    }

    /**
     * @dev Get hub details
     */
    function getHub(uint256 tokenId) public view returns (Hub memory) {
        require(_exists(tokenId), "Hub does not exist");
        return hubs[tokenId];
    }

    // Override functions
    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}