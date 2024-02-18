const express = require('express');
const Web3 = require('web3');
const fs = require('fs');

const app = express();
const port = 3000;

const web3 = new Web3('HTTP://127.0.0.1:8545'); // Connect to local Ganache node

const contractAbi = JSON.parse(fs.readFileSync('MyERC20Token.json')).abi;
const contractAddress = '0x6db3f445504C4b690c5c82C88274Bbb12Cabe4c2'; // Replace with your deployed contract address
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
