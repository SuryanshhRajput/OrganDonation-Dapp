// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract OrganDonation {
    struct Donor {
        uint id;
        string name;
        string organ;
        bool isAvailable;
    }

    struct Receiver {
        uint id;
        string name;
        string organNeeded;
        bool isMatched;
    }

    mapping(uint => Donor) public donors;
    mapping(uint => Receiver) public receivers;

    uint public donorCount = 0;
    uint public receiverCount = 0;

    event DonorRegistered(uint id, string name, string organ);
    event ReceiverRegistered(uint id, string name, string organNeeded);
    event MatchFound(uint donorId, uint receiverId);

    // Register a new donor
    function registerDonor(string memory _name, string memory _organ) public {
        donorCount++;
        donors[donorCount] = Donor(donorCount, _name, _organ, true);
        emit DonorRegistered(donorCount, _name, _organ);
    }

    // Register a new receiver
    function registerReceiver(string memory _name, string memory _organNeeded) public {
        receiverCount++;
        receivers[receiverCount] = Receiver(receiverCount, _name, _organNeeded, false);
        emit ReceiverRegistered(receiverCount, _name, _organNeeded);
    }

    // Match a donor with a receiver based on the organ
    function matchDonorReceiver(uint _donorId, uint _receiverId) public {
        require(donors[_donorId].isAvailable, "Donor not available");
        require(!receivers[_receiverId].isMatched, "Receiver already matched");
        require(keccak256(abi.encodePacked(donors[_donorId].organ)) == keccak256(abi.encodePacked(receivers[_receiverId].organNeeded)), "Organ type mismatch");

        // Mark as matched and unavailable
        donors[_donorId].isAvailable = false;
        receivers[_receiverId].isMatched = true;

        emit MatchFound(_donorId, _receiverId);
    }

    // Check if a donor is available
    function isDonorAvailable(uint _donorId) public view returns (bool) {
        return donors[_donorId].isAvailable;
    }

    // Check if a receiver is matched
    function isReceiverMatched(uint _receiverId) public view returns (bool) {
        return receivers[_receiverId].isMatched;
    }
}
