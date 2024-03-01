# Blockchain Animal Welfare Charity

This project is a blockchain-based application designed to support animal welfare through donations. It leverages Ethereum blockchain technology to create a transparent and secure system for managing and tracking donations.

## Features

- **Smart Contract for Donations**: Utilizes an Ethereum smart contract to handle and record ETH donations.
- **Web Interface**: A user-friendly web interface for donors to make donations and view information about the charity.
- **Transparency and Security**: Leveraging blockchain technology ensures transparency and security in the donation process.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/) (version 12.x or higher)
- [Truffle Suite](https://www.trufflesuite.com/) (for smart contract deployment and testing)
- [MetaMask](https://metamask.io/) (or any other Ethereum wallet for interacting with the blockchain)

### Installing

A step-by-step series of examples that tell you how to get a development environment running.

1. Clone the repository:
    ```bash
    git clone https://github.com/Ozzy0153/Animal-Charity.git
    ```

2. Install NPM packages:
    ```bash
    cd animal-charity
    npm install
    ```

3. Compile and deploy the smart contract (make sure you have Truffle installed and a blockchain network running):
    ```bash
    truffle migrate --reset
    ```

4. Start the server:
    ```bash
    npm start
    ```

5. Open your browser and navigate to `http://localhost:3000` to view the application.

## Usage

### Making a Donation

- Connect your MetaMask wallet.
- Enter the amount you wish to donate.
- Confirm the transaction in your wallet.

### Viewing Donations

- Navigate to the 'Donations' page to see a list of all donations made.

### Contact / Feedback

- Navigate to the Contact section.
- Fill out your name, email, and message.
- Submit the form. Your feedback and contact information will be securely stored in MongoDB Atlas.

## Authors

- **Orazaly Makambet** - [Ozzy0153](https://github.com/YourUsername)
