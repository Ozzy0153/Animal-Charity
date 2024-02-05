const express = require('express');
const Web3 = require('web3');
const fs = require('fs');

const app = express();
const port = 3000;

const web3 = new Web3('http://localhost:8545'); // Connect to local Ganache node

const contractAbi = JSON.parse(fs.readFileSync('MyERC20Token.json')).abi;
const contractAddress = '0x0974998AfcE08E73F096E5792a106b0663b9f2Cf'; // Replace with your deployed contract address
const myERC20Token = new web3.eth.Contract(contractAbi, contractAddress);

app.use(express.static('public'));

app.get('/balance/:address', async (req, res) => {
    const address = req.params.address;
    const balance = await myERC20Token.methods.balanceOf(address).call();
    res.json({ balance });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
