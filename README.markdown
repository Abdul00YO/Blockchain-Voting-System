# 🗳️ Blockchain Voting System

A decentralized, secure, and transparent voting application built on the Ethereum blockchain. This project leverages **Solidity**, **Remix IDE**, **Web3.js**, and **MetaMask** to ensure tamper-proof voting with real-time results visualization.

---

## ✨ Features

- **Secure Voting**: Each Ethereum address can cast only one vote, ensuring fairness.  
- **Real-Time Results**: Displays live vote counts with a dynamic Pie Chart.  
- **Transparency**: Votes are immutably recorded on the blockchain.  
- **Voter Verification**: Users can verify their own vote.  
- **Admin Controls**: Admin can reset the voting session without altering past votes.  
- **MetaMask Integration**: Seamless wallet authentication for voters.  

---

## 🛠️ Tech Stack

- **Smart Contract**: Solidity (`Voting.sol`)  
- **Blockchain**: Ethereum Testnet (Sepolia/Goerli) via Remix IDE  
- **Frontend**: HTML, CSS, JavaScript  
- **Web3 Integration**: Web3.js with MetaMask for wallet interactions  
- **Visualization**: Chart.js for vote distribution Pie Chart  

---

## 📂 Project Structure

```
📦 Blockchain-Voting-System
├── 📜 index.html         # Frontend UI
├── 📜 style.css         # Styling for the frontend
├── 📜 app.js            # Web3.js logic for blockchain interaction
├── 📜 Voting.sol        # Solidity smart contract
└── 📜 README.md         # Project documentation
```

---

## ⚙️ Smart Contract Details

- **Contract Address**: `0xcFcc32d5d1e413a7C9Ed5a02FC3F3f210AbD6036`  
- **Key Functions**:
  - `vote(string _candidate)`: Cast a vote for a specific candidate.  
  - `getCandidates()`: Retrieve the list of candidates.  
  - `getVotes(string _candidate)`: Get the vote count for a candidate.  
  - `getTotalVotes()`: Return the total number of votes cast.  
  - `getVotedCandidate(address voter)`: Check which candidate a voter selected.  
  - `hasAlreadyVoted(address voter)`: Verify if a voter has already voted.  
  - `admin()`: Return the admin address of the contract.  

---

## 🚀 Getting Started

### Prerequisites
- **MetaMask**: Installed as a browser extension.  
- **Ethereum Testnet**: Access to Sepolia or Goerli testnet with test ETH.  
- **Node.js**: For local development (optional).  
- **Remix IDE**: For deploying the smart contract.  
- **Browser**: Chrome or Firefox recommended for MetaMask compatibility.  

### Installation
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/YourGitHub/Blockchain-Voting-System.git
   cd Blockchain-Voting-System
   ```

2. **Deploy the Smart Contract**:
   - Open `Voting.sol` in [Remix IDE](https://remix.ethereum.org/).  
   - Set the candidate list (e.g., `["Alice", "Bob", "Charlie"]`) in the constructor.  
   - Deploy to Sepolia/Goerli testnet using MetaMask.  
   - Copy the deployed contract address and update `app.js` with it.

3. **Run the Frontend**:
   - Open `index.html` in a browser with MetaMask installed.  
   - Alternatively, serve locally using a simple server:
     ```bash
     npx http-server
     ```
   - Access at `http://localhost:8080`.

### Usage
1. **Connect Wallet**:
   - Click **Connect Wallet** in the UI to link MetaMask.  
2. **Cast Vote**:
   - Select a candidate from the dropdown and click **Vote**.  
   - Approve the transaction in MetaMask.  
3. **View Results**:
   - Check total votes, leading candidate, and your vote.  
   - The Pie Chart updates in real-time to show vote distribution.  

---

## 📸 Screenshots

*(Add screenshots here, e.g., UI, Pie Chart, MetaMask transaction confirmation)*  
- Voting interface  
- Real-time vote distribution chart  
- MetaMask wallet connection  

---

## 🔒 Security Features

- **Single-Vote Restriction**: Enforced by the smart contract to prevent double voting.  
- **Immutable Votes**: Blockchain ensures votes cannot be altered or deleted.  
- **Transparent Results**: All vote data is publicly verifiable on the blockchain.  
- **Admin Restrictions**: Admin can reset the session but cannot modify votes.  

---

## 🔮 Future Enhancements

- **Voter Registration**: Add eligibility checks for voters.  
- **Private Voting**: Implement Zero-Knowledge Proofs (zk-SNARKs) for anonymity.  
- **Mainnet Deployment**: Scale to Ethereum Mainnet for real-world use.  
- **Advanced Analytics**: Build a dashboard for detailed vote insights.  
- **Improved UI/UX**: Enhance responsiveness and accessibility.  

---

## 📜 License

This project is licensed under the [MIT License](LICENSE) – free to use, modify, and distribute.

---

## 🤝 Contributing

We welcome contributions to improve the project!  
1. Fork the repository.  
2. Create a feature branch: `git checkout -b feature/your-feature`.  
3. Commit your changes: `git commit -m "Add your feature"`.  
4. Push to the branch: `git push origin feature/your-feature`.  
5. Open a Pull Request.  

---

## 👨‍💻 Author

- **Your Name**  
- GitHub: [YourGitHub](https://github.com/YourGitHub)  
- Email: your.email@example.com  

---

## ⭐ Support

If you find this project useful, please **star the repository** on GitHub! Your support helps us grow and improve.