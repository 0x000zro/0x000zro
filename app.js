document.addEventListener('DOMContentLoaded', () => {
    const connectButton = document.getElementById('connectButton');
    const accountDiv = document.getElementById('account');
    const balanceDiv = document.getElementById('balance');
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    let account;
    let web3;

    // MetaMask connection
    connectButton.addEventListener('click', async () => {
        if (typeof window.ethereum !== 'undefined') {
            web3 = new Web3(window.ethereum);
            try {
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                const accounts = await web3.eth.getAccounts();
                account = accounts[0];
                accountDiv.textContent = `Connected: ${account}`;
                const balance = await web3.eth.getBalance(account);
                balanceDiv.textContent = `Balance: ${web3.utils.fromWei(balance, 'ether')} ETH`;
            } catch (error) {
                console.error(error);
            }
        } else {
            alert('MetaMask not detected');
        }
    });

    // Dark mode toggle
    darkModeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
    });

    // Staking form submission
    const stakingForm = document.getElementById('stakingForm');
    const stakeMessage = document.getElementById('stakeMessage');
    stakingForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const stakeAmount = document.getElementById('stakeAmount').value;
        if (account && web3) {
            stakeMessage.textContent = `You have staked ${stakeAmount} RUPE tokens.`;
        } else {
            stakeMessage.textContent = 'Please connect your wallet first.';
        }
    });

    // Referral functionality
    const referralCodeDiv = document.getElementById('referralCode');
    const copyReferralButton = document.getElementById('copyReferralButton');
    const referralRewardsDiv = document.getElementById('referralRewards');
    
    function displayReferralCode() {
        const referralCode = `RUPE_${account.slice(0, 6)}`;
        referralCodeDiv.textContent = `Your referral code: ${referralCode}`;
        copyReferralButton.onclick = () => {
            const referralLink = `${window.location.origin}?ref=${referralCode}`;
            navigator.clipboard.writeText(referralLink);
            alert('Referral link copied!');
        };
    }

    async function fetchReferralRewards() {
        const rewards = 50;
        referralRewardsDiv.textContent = `You have earned: ${rewards} RUPE tokens from referrals.`;
    }
});