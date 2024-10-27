document.addEventListener('DOMContentLoaded', () => {
    const connectButton = document.getElementById('connectButton');
    const accountDiv = document.getElementById('account');
    const balanceDiv = document.getElementById('balance');
    const darkModeToggle = document.getElementById('darkModeToggle');
    const referralCodeDisplay = document.getElementById('referralCode');
    const copyReferralButton = document.getElementById('copyReferralButton');
    const copyStatus = document.getElementById('copyStatus');

    let web3;

    // Dark Mode Toggle
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
    });

    // Connect Wallet
    connectButton.addEventListener('click', async () => {
        if (typeof window.ethereum !== 'undefined') {
            web3 = new Web3(window.ethereum);
            try {
                const accounts = await web3.eth.requestAccounts();
                const account = accounts[0];
                accountDiv.textContent = `Connected: ${account}`;
                const balance = await web3.eth.getBalance(account);
                balanceDiv.textContent = `Balance: ${web3.utils.fromWei(balance, 'ether')} ETH`;
                generateReferralCode(account);
            } catch (error) {
                console.error(error);
            }
        } else {
            accountDiv.textContent = 'MetaMask not detected';
        }
    });

    // Generate Referral Code
    function generateReferralCode(account) {
        const code = `https://yourproject.com/?ref=${account}`;
        referralCodeDisplay.textContent = code;
    }

    // Copy Referral Code
    copyReferralButton.addEventListener('click', () => {
        navigator.clipboard.writeText(referralCodeDisplay.textContent)
            .then(() => {
                copyStatus.textContent = 'Referral link copied!';
                setTimeout(() => { copyStatus.textContent = ''; }, 2000);
            })
            .catch(err => console.error("Failed to copy text: ", err));
    });

    // Staking form submission
    const stakingForm = document.getElementById('stakingForm');
    const stakeMessage = document.getElementById('stakeMessage');

    stakingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const stakeAmount = document.getElementById('stake