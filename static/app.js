let web3;
let contract;
let currentAccount;
let chart;

// Replace with your deployed contract address
const contractAddress = "0x4e20481e82102AcdF33F03Ef837e0aD38B354190";

// Your contract ABI here (unchanged)
const contractABI = [
	{
		"inputs": [
			{
				"internalType": "string[]",
				"name": "_candidates",
				"type": "string[]"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_candidate",
				"type": "string"
			}
		],
		"name": "vote",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "admin",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
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
		"name": "candidates",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getCandidates",
		"outputs": [
			{
				"internalType": "string[]",
				"name": "",
				"type": "string[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getTotalVotes",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "total",
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
				"name": "voter",
				"type": "address"
			}
		],
		"name": "getVotedCandidate",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_candidate",
				"type": "string"
			}
		],
		"name": "getVotes",
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
				"internalType": "address",
				"name": "_voter",
				"type": "address"
			}
		],
		"name": "hasAlreadyVoted",
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
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "hasVoted",
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
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "votedCandidate",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "votes",
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

document.getElementById("vote-button").addEventListener("click", async () => {
  const name = document.getElementById("name").value.trim();
  const age = document.getElementById("age").value.trim();
  const candidate = document.getElementById("candidate-select").value;

  if (!name || !age || !candidate) {
    alert("Please fill all fields and select a candidate.");
    return;
  }

  const data = { name, age, vote: candidate };

  try {
    const response = await fetch("/api/vote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const result = await response.json();
    if (response.ok) {
      alert("Your vote has been cast successfully!");
      document.getElementById("your-vote").innerText = candidate;
    } else {
      alert("Error: " + result.error);
    }
  } catch (error) {
    alert("Network error");
    console.error(error);
  }
});

// On page load, initialize Web3 and contract, and setup event listeners
window.addEventListener("load", async () => {
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    contract = new web3.eth.Contract(contractABI, contractAddress);

    document.getElementById("connect-button").onclick = connectWallet;
    document.getElementById("vote-button").onclick = vote;
    document.getElementById("vote-button").disabled = true;

    window.ethereum.on("accountsChanged", async (accounts) => {
      if (accounts.length > 0) {
        currentAccount = accounts[0];
        document.getElementById("wallet-address").innerText = currentAccount;
        document.getElementById("vote-button").disabled = false;
        updateStatus("Account changed: " + currentAccount, "info");
        await displayUserVote();
        await updateAll();
      } else {
        currentAccount = null;
        document.getElementById("wallet-address").innerText = "Not connected";
        document.getElementById("vote-button").disabled = true;
        updateStatus("Please connect to MetaMask.", "info");
      }
    });

    await loadCandidates();
  } else {
    updateStatus("MetaMask is not installed. Please install it to use this app.", "error");
    document.getElementById("vote-button").disabled = true;
  }
});

const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      currentAccount = accounts[0];
      document.getElementById("wallet-address").innerText = currentAccount;
      document.getElementById("vote-button").disabled = false;
      updateStatus("Wallet connected: " + currentAccount, "success");
      await displayUserVote();
      await updateAll();
    } catch (error) {
      console.error('User denied account access');
      updateStatus("User denied account access", "error");
    }
  } else {
    alert('Please install MetaMask!');
  }
};

// vote(), loadCandidates(), updateAll(), displayUserVote(), updateStatus(), updateChart() remain unchanged except use updated currentAccount logic



// Load candidates from contract and populate select options + vote count display
async function loadCandidates() {
  try {
    const candidates = await contract.methods.getCandidates().call();
    const select = document.getElementById("candidate-select");
    const voteList = document.getElementById("vote-counts");
    select.innerHTML = "";
    voteList.innerHTML = "";

    for (const c of candidates) {
      // Add candidate option in dropdown
      const option = document.createElement("option");
      option.value = c;
      option.textContent = c;
      select.appendChild(option);

      // Add candidate vote count list item placeholder
      const li = document.createElement("li");
      li.id = `votes-${c}`;
      voteList.appendChild(li);
    }

    await updateAll();
  } catch (error) {
    updateStatus("Error loading candidates: " + error.message, "error");
  }
}

// Submit vote transaction to the blockchain
async function vote() {
  if (!currentAccount) {
    updateStatus("Please connect your wallet first.", "error");
    return;
  }

  const candidate = document.getElementById("candidate-select").value;
  if (!candidate) {
    updateStatus("Please select a candidate.", "error");
    return;
  }

  try {
    const hasVoted = await contract.methods.hasVoted(currentAccount).call();
    if (hasVoted) {
      updateStatus("You have already voted.", "error");
      return;
    }

    updateStatus("Submitting your vote...", "info");
    await contract.methods.vote(candidate).send({ from: currentAccount });

    updateStatus(`Vote for ${candidate} submitted successfully!`, "success");
    await updateAll();
    await displayUserVote();
  } catch (error) {
    updateStatus("Voting failed: " + (error.message || error), "error");
  }
}

// Update votes display, total votes, leader, and chart
async function updateAll() {
  try {
    const candidates = await contract.methods.getCandidates().call();
    const voteCounts = [];
    const labels = [];

    for (const candidate of candidates) {
      const count = await contract.methods.getVotes(candidate).call();
      voteCounts.push(Number(count));
      labels.push(candidate);
      const voteLi = document.getElementById(`votes-${candidate}`);
      if (voteLi) {
        voteLi.textContent = `${candidate}: ${count} vote(s)`;
      }
    }

    const total = await contract.methods.getTotalVotes().call();
    document.getElementById("total-votes").innerText = total;

    // Determine leader(s)
    const maxVotes = Math.max(...voteCounts);
    const leaders = candidates.filter((_, i) => voteCounts[i] === maxVotes);
    const leaderText = leaders.length > 1 ? `${leaders.join(", ")} (Tie with ${maxVotes} votes)` : leaders[0] || "No votes yet";
    document.getElementById("leading-candidate").innerText = leaderText;

    // Update chart
    updateChart(labels, voteCounts);
  } catch (error) {
    updateStatus("Error updating vote counts: " + error.message, "error");
  }
}

// Show what candidate the connected user voted for (if any)
async function displayUserVote() {
  if (!currentAccount) {
    document.getElementById("your-vote").innerText = "Not connected";
    return;
  }

  try {
    const votedCandidate = await contract.methods.getVotedCandidate(currentAccount).call();
    document.getElementById("your-vote").innerText = votedCandidate || "You have not voted yet";
  } catch (error) {
    document.getElementById("your-vote").innerText = "Error fetching your vote";
  }
}

// Update status message with styling
function updateStatus(message, type = "info") {
  const statusDiv = document.getElementById("status");
  statusDiv.innerText = message;
  statusDiv.className = "status-bar " + type;
}

// Update or create the Chart.js chart showing vote distribution
function updateChart(labels, data) {
  const ctx = document.getElementById("voteChart").getContext("2d");
  if (chart) {
    chart.data.labels = labels;
    chart.data.datasets[0].data = data;
    chart.update();
  } else {
    chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            label: "Votes",
            data,
            backgroundColor: "rgba(54, 162, 235, 0.7)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            title: { display: true, text: "Number of Votes" },
          },
          x: {
            title: { display: true, text: "Candidates" },
          },
        },
        plugins: {
          legend: { display: false },
          title: { display: true, text: "Vote Distribution" },
        },
      },
    });
  }
}
