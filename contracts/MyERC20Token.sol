// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract MyERC20Token {
    mapping(address => uint256) private _balances;
    mapping(address => Donor) public donors;
    uint256 private _totalSupply;
    address private owner;

    struct Donor {
        uint256 totalDonated;
        uint256 lastDonationAmount;
        uint256 donationCount;
    }

    event Transfer(address indexed from, address indexed to, uint256 value);
    event DonationReceived(address indexed donor, uint256 amount);
    event DonorUpdated(address indexed donor, uint256 totalDonated);
    event OwnershipTransferred(address indexed oldOwner, address indexed newOwner);
    event FundsWithdrawn(address indexed to, uint256 amount);

    constructor(uint256 initialSupply) {
        _totalSupply = initialSupply;
        _balances[msg.sender] = _totalSupply;
        owner = msg.sender;
        emit Transfer(address(0), msg.sender, _totalSupply);
    }

    uint256 public totalEthDonated;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action");
        _;
    }

    function totalSupply() public view returns (uint256) {
        return _totalSupply;
    }

    function balanceOf(address _owner) public view returns (uint256 balance) {
        return _balances[_owner];
    }

    function transfer(address _to, uint256 _value) public returns (bool success) {
        require(_balances[msg.sender] >= _value, "Insufficient balance");
        _balances[msg.sender] -= _value;
        _balances[_to] += _value;
        updateDonor(msg.sender, _value);
        emit Transfer(msg.sender, _to, _value);
        return true;
    }

    // Function to receive Ether donations
    receive() external payable {
        require(msg.value > 0, "Donation must be greater than 0");

        // Update total ETH donated
        totalEthDonated += msg.value;

        // Update donor information
        Donor storage donor = donors[msg.sender];
        donor.totalDonated += msg.value;
        donor.lastDonationAmount = msg.value;
        donor.donationCount += 0.001;

        emit DonationReceived(msg.sender, msg.value);
        emit DonorUpdated(msg.sender, donor.totalDonated);
    }


    function updateDonor(address _donor, uint256 _value) internal {
        Donor storage donor = donors[_donor];
        donor.totalDonated += _value;
        donor.lastDonationAmount = _value;
        donor.donationCount += 1;

        emit DonorUpdated(_donor, donor.totalDonated);
    }

    function withdrawFunds(address _to, uint256 _amount) public onlyOwner {
        require(_balances[address(this)] >= _amount, "Insufficient funds");
        _balances[address(this)] -= _amount;
        _balances[_to] += _amount;
        emit FundsWithdrawn(_to, _amount);
    }

    function transferOwnership(address newOwner) public onlyOwner {
        require(newOwner != address(0), "New owner is the zero address");
        emit OwnershipTransferred(owner, newOwner);
        owner = newOwner;
    }
}
