const contractAddress = "0xc4beb38cca8b6cbe3fc111be2ec2252e30bdaffd"; 
const contractABI = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "organ",
				"type": "string"
			}
		],
		"name": "DonorRegistered",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_donorId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_receiverId",
				"type": "uint256"
			}
		],
		"name": "matchDonorReceiver",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "donorId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "receiverId",
				"type": "uint256"
			}
		],
		"name": "MatchFound",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "organNeeded",
				"type": "string"
			}
		],
		"name": "ReceiverRegistered",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_organ",
				"type": "string"
			}
		],
		"name": "registerDonor",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_organNeeded",
				"type": "string"
			}
		],
		"name": "registerReceiver",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "donorCount",
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
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "donors",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "organ",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "isAvailable",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_donorId",
				"type": "uint256"
			}
		],
		"name": "isDonorAvailable",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_receiverId",
				"type": "uint256"
			}
		],
		"name": "isReceiverMatched",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "receiverCount",
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
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "receivers",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "organNeeded",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "isMatched",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}

    // Place the ABI here (I'll tell you how to get it below)
];

let web3;
let contract;

window.addEventListener('load', async () => {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' });

        contract = new web3.eth.Contract(contractABI, contractAddress);
    } else {
        alert("Please install MetaMask to use this DApp.");
    }
});

async function registerDonor() {
    const name = document.getElementById("donorName").value;
    const organ = document.getElementById("organ").value;
    const accounts = await web3.eth.getAccounts();

    await contract.methods.registerDonor(name, organ).send({ from: accounts[0] });
    document.getElementById("status").innerText = "Donor registered successfully!";
}

async function registerReceiver() {
    const name = document.getElementById("receiverName").value;
    const organNeeded = document.getElementById("organNeeded").value;
    const accounts = await web3.eth.getAccounts();

    await contract.methods.registerReceiver(name, organNeeded).send({ from: accounts[0] });
    document.getElementById("status").innerText = "Receiver registered successfully!";
}

async function matchDonorReceiver() {
    const donorId = document.getElementById("donorId").value;
    const receiverId = document.getElementById("receiverId").value;
    const accounts = await web3.eth.getAccounts();

    await contract.methods.matchDonorReceiver(donorId, receiverId).send({ from: accounts[0] });
    document.getElementById("status").innerText = "Match successful!";
}
