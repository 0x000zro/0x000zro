document.addEventListener('DOMContentLoaded', () => {
    const connectButton = document.getElementById('connectButton');
    const accountDiv = document.getElementById('account');
    const balanceDiv = document.getElementById('balance');
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;

    let web3;
    let account;

    // MetaMask connection
    connectButton.addEventListener('click', async () => {
        if (typeof window.ethereum !== 'undefined') {
            web3 = new Web3(window.ethereum);
            try {
                const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
                account = accounts[0];
                accountDiv.textContent = `Connected: ${account}`;

                const balance = await web3.eth.getBalance(account);
                balanceDiv.textContent = `Balance: ${web3.utils.fromWei(balance, 'ether')} ETH`;

                // Listen for account changes
                ethereum.on('accountsChanged', (accounts) => {
                    account = accounts[0];
                    accountDiv.textContent = `Connected: ${account}`;
                });
            } catch (error) {
                console.error('Connection failed:', error);
                alert('MetaMask connection failed. Please try again.');
            }
        } else {
            alert('MetaMask not detected. Please install MetaMask.');
        }
    });

    // Dark mode toggle
    darkModeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        document.querySelectorAll('header, footer, nav ul li button').forEach(el => {
            el.classList.toggle('dark-mode');
        });
    });
});