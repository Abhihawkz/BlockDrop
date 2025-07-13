// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract FileLedger {
    struct FileRecord {
        bytes32 fileHash;
        bytes signature;
        bytes32 previousHash;
        uint256 timestamp;
        string fileName;
        uint256 fileSize;
    }
    
    mapping(address => FileRecord[]) private userFiles;
    mapping(bytes32 => bool) private fileExists;
    mapping(bytes32 => address) private fileOwner;
    
    event FileUploaded(
        address indexed user,
        bytes32 indexed fileHash,
        string fileName,
        uint256 fileSize,
        uint256 timestamp
    );
    
    event FileVerified(
        address indexed user,
        bytes32 indexed fileHash,
        bool isValid
    );
    
    function uploadFile(
        bytes32 _fileHash,
        bytes memory _signature,
        bytes32 _previousHash,
        string memory _fileName,
        uint256 _fileSize
    ) external {
        require(!fileExists[_fileHash], "File already exists");
        
        FileRecord memory newFile = FileRecord({
            fileHash: _fileHash,
            signature: _signature,
            previousHash: _previousHash,
            timestamp: block.timestamp,
            fileName: _fileName,
            fileSize: _fileSize
        });
        
        userFiles[msg.sender].push(newFile);
        fileExists[_fileHash] = true;
        fileOwner[_fileHash] = msg.sender;
        
        emit FileUploaded(msg.sender, _fileHash, _fileName, _fileSize, block.timestamp);
    }
    
    function verifyFile(bytes32 _fileHash) external returns (bool) {
        bool isValid = fileExists[_fileHash];
        emit FileVerified(msg.sender, _fileHash, isValid);
        return isValid;
    }
    
    function getUserFiles(address _user) external view returns (FileRecord[] memory) {
        return userFiles[_user];
    }
    
    function getFileCount(address _user) external view returns (uint256) {
        return userFiles[_user].length;
    }
    
    function isFileRegistered(bytes32 _fileHash) external view returns (bool) {
        return fileExists[_fileHash];
    }
    
    function getFileOwner(bytes32 _fileHash) external view returns (address) {
        require(fileExists[_fileHash], "File not found");
        return fileOwner[_fileHash];
    }
}
