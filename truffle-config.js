module.exports = {

  compilers: {
    solc: {
      version: "^0.8.0",    // Fetch exact version or use range
      // Additional settings here...
    }
  },

  networks: {
    development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 7545,            // Standard Ganache UI port (change if needed)
      network_id: "*",       // Any network (default: none)
    },
  },
  // Other configurations...
};
