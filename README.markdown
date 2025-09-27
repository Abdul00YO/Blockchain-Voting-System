# 🗳️ Blockchain Voting System

A decentralized voting application (dApp) built using **Solidity**, **Remix IDE**, **MetaMask**, **Web3.js**, and **Flask** with **HTML/CSS/JS** frontend integration.  
This project allows users to vote securely and transparently on the Ethereum blockchain with real-time results visualization.

---

## 📂 Project Structure

BLOCKCHAIN VOTING SYSTEM/  
&emsp;├── static/  
&emsp;&emsp;└── app.js          # Frontend logic connecting MetaMask & smart contract  
&emsp;├── templates/  
&emsp;&emsp;├── index.html      # Main voting page  
&emsp;&emsp;├── results.html    # Real-time voting results page  
&emsp;&emsp;└── about.html      # About the project  
&emsp;├── app.py              # Flask backend server (routes & rendering templates)  
&emsp;├── styles.css          # Custom styling for frontend  
&emsp;├── LICENSE             # License file  
&emsp;└── README.md           # Project documentation

---

## 🚀 Features

- 🔐 **Secure Authentication** using MetaMask wallet.  
- 🗳️ **Decentralized Voting** stored on the Ethereum blockchain.  
- 📊 **Real-Time Results** with leading candidate detection (handles ties) and pie chart visualization.  
- 🌐 **Flask Backend** for serving HTML templates.  
- 🎨 **Responsive UI** with HTML, CSS, and JavaScript.  

---

## 🛠️ Tech Stack

**Smart Contract:** Solidity (`Voting.sol`) deployed via Remix IDE  
**Frontend:** HTML, CSS, JavaScript, Chart.js (for pie chart)  
**Blockchain Integration:** Web3.js + MetaMask  
**Backend:** Flask (Python)

---

## 📋 Prerequisites

Make sure you have installed:  
- Node.js  
- Python 3  
- Flask (`pip install flask`)  
- MetaMask browser extension  
- Remix IDE (for contract compilation & deployment)

---

## ⚡ Setup Instructions

1. Clone the repository  
    git clone https://github.com/your-username/blockchain-voting-system.git  
    cd blockchain-voting-system

2. Install Flask  
    pip install flask

3. Deploy Smart Contract  
   - Open Remix IDE (https://remix.ethereum.org/)  
   - Compile and deploy `Voting.sol` with your candidate list, for example: `["Alice","Bob","Charlie"]`  
   - Copy the deployed **contract address** and **ABI**

4. Configure the frontend (static/app.js)  
   - Open `static/app.js` and replace the placeholders:  
       const contractAddress = "YOUR_DEPLOYED_CONTRACT_ADDRESS";  
       const contractABI = [ /* YOUR ABI HERE */ ];

5. Run the Flask app  
    python app.py  
   - Open `http://127.0.0.1:5000/` in your browser

6. Connect MetaMask  
   - Switch MetaMask to the same testnet you used for deployment (e.g., Sepolia/Goerli)  
   - Connect your wallet on the frontend and cast a vote

---

## 📊 App Flow / How It Works

1. Smart contract is deployed with an initial candidate list.  
2. User visits the Flask-served front end and connects MetaMask.  
3. User selects a candidate and clicks **Vote** — MetaMask asks to sign the transaction.  
4. Smart contract enforces one vote per address and increments the candidate's vote count.  
5. Frontend fetches vote counts and updates the pie chart and leader(s) in real time.

---

## 🔐 Security Notes

- `hasVoted` mapping prevents double voting (one address → one vote).  
- Votes are recorded immutably on-chain — they cannot be changed after submission.  
- Always test on a testnet before deploying to mainnet.  
- Admin-only dangerous operations (like resetting votes) should be used only for demos and protected with proper access control.



---

## 🔮 Future Improvements

- Voter registration and eligibility checks (off-chain or on-chain).  
- Use zk-proofs for private/verifiable voting.  
- Add role-based admin panel (view-only vs admin actions).  
- Responsive UI improvements and mobile testing.  
- Export results (CSV) and historical election handling.

---

## 🤝 Contributing

1. Fork the repository  
2. Create a feature branch: `git checkout -b feature-name`  
3. Commit your changes: `git commit -m "Add some feature"`  
4. Push to the branch: `git push origin feature-name`  
5. Open a Pull Request

---

## 📜 License

This project is licensed under the MIT License — see the `LICENSE` file for details.

---

## 👨‍💻 Author

Abdullah Arshad — GitHub: https://github.com/Abdul00YO

---

If you want, I can:
- Replace placeholders with your real contract address & ABI,
- Produce a nice `README` screenshot or a PDF, or
- Add a short GitHub repo description and topics for the repo page.
