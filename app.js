const express = require('express');
const mongoose = require('mongoose');
const Web3 = require('web3');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

const web3 = new Web3('http://127.0.0.1:8545');

const contractAbi = JSON.parse(fs.readFileSync('MyERC20Token.json', 'utf8')).abi;
const contractAddress = '0x6db3f445504C4b690c5c82C88274Bbb12Cabe4c2';
const myERC20Token = new web3.eth.Contract(contractAbi, contractAddress);

const uri = "mongodb+srv://Orazaly0153:OzzyCharity@charity.q6rft95.mongodb.net/?retryWrites=true&w=majority&appName=Charity";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

const messageSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    name: String,
    email: String,
    message: String
}, { strict: 'throw' });

const Feedback = mongoose.model('Feedback', messageSchema);

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/submit_form_destination', async (req, res) => {
    try {
        const feedbackData = req.body;
        const newFeedback = new Feedback(feedbackData);
        const savedFeedbacks = await newFeedback.save();
        console.log(`A document was inserted with the _id: ${savedFeedbacks._id}`);
        res.json({ message: 'Form data received and stored in MongoDB', _id: savedFeedbacks._id });
    } catch (err) {
        console.error("Error inserting document: ", err);
        res.status(500).json({ error: err.message });
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'views', 'index.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'views', 'about.html'));
});

app.get('/help', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'views', 'help.html'));
});

app.get('/animals', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'views', 'animals.html'));
});

app.get('/donation', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'views', 'donation.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'views', 'contact.html'));
});

app.get('/balance/:address', async (req, res) => {
    const address = req.params.address;
    const balance = await myERC20Token.methods.balanceOf(address).call();
    res.json({ balance });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
