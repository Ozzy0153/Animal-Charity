const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');
const contractAbi = [
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "initialSupply",
                "type": "uint256"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "donor",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "DonationReceived",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "donor",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "totalDonated",
                "type": "uint256"
            }
        ],
        "name": "DonorUpdated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "FundsWithdrawn",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "oldOwner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "OwnershipTransferred",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "transfer",
        "outputs": [
            {
                "internalType": "bool",
                "name": "success",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "transferOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_amount",
                "type": "uint256"
            }
        ],
        "name": "withdrawFunds",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "stateMutability": "payable",
        "type": "receive"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_owner",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "balance",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "donors",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "totalDonated",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "lastDonationAmount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "donationCount",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "totalEthDonated",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];
const contractAddress = '0x1673dad5b4cd09f3f695361a01b676e369abba6d';
const myContract = new web3.eth.Contract(contractAbi, contractAddress);

async function updateBalance() {
    const totalEthDonatedWei = await myContract.methods.totalEthDonated().call();
    const totalEthDonated = web3.utils.fromWei(totalEthDonatedWei, 'ether');

    document.getElementById('totalTokens').innerText = `${totalEthDonated} ETH`;

    const goal = 100;
    const progressPercent = (parseFloat(totalEthDonated) / goal) * 100;
    document.getElementById('donationProgress').innerText = `${progressPercent.toFixed(2)}%`;
}

async function updateDonorDetails(donorAddress) {
    const donorInfo = await myContract.methods.donors(donorAddress).call();
    const lastDonationEth = web3.utils.fromWei(donorInfo.lastDonationAmount, 'ether');
    const totalDonationsEth = web3.utils.fromWei(donorInfo.totalDonated, 'ether');

    document.getElementById('lastDonation').innerText = `${lastDonationEth} ETH`;
    document.getElementById('totalDonations').innerText = `${totalDonationsEth} ETH`;
}

async function makeDonation() {
    const amount = document.getElementById('donationAmount').value; // Get the donation amount
    if (!amount) return; // If no amount is entered, do nothing

    try {
        // Request account access if needed
        const accounts = await web3.eth.requestAccounts(); // Changed from .getAccounts() for modern dApp browsers

        // Trigger MetaMask to confirm the transaction
        await web3.eth.sendTransaction({
            from: accounts[0],
            to: contractAddress,
            value: web3.utils.toWei(amount, 'ether'),
        });

        // Update UI: this can be replaced with actual UI update logic
        alert('Donation successful!');
        await updateBalance();
        await updateDonorDetails(accounts[0]);
    } catch (error) {
        console.error("Donation error:", error);
        alert('There was an error with your donation');
    }
}

async function loadWeb3() {
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' }); // Modern dApp browsers
    } else {
        alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
}

window.addEventListener('load', async () => {
    await loadWeb3();
    await updateBalance(); // Consider updating donor details based on user input or login
});
