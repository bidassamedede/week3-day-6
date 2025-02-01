export const CONTRACT_ADDRESS = "0x9D7f74d0C41E726EC95884E0e97Fa6129e3b5E99";

export const CONTRACT_ABI = [
    { 
        "inputs": [ { "internalType": "uint256", "name": "_id", "type": "uint256" }, 
                    { "internalType": "string", "name": "_name", "type": "string" } ],
        "name": "registerStudent",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    { 
        "inputs": [ { "internalType": "uint256", "name": "_id", "type": "uint256" } ],
        "name": "removeStudent",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getAllStudents",
        "outputs": [
            { "internalType": "uint256[]", "name": "", "type": "uint256[]" },
            { "internalType": "string[]", "name": "", "type": "string[]" }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];
