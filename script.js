document.getElementById('connect-wallet').addEventListener('click', function() {
if (typeof window.ethereum !== 'undefined') {
window.ethereum.request({ method: 'eth_requestAccounts' }).then(accounts => {
console.log('Wallet connected:', accounts[0]);
}).catch(err => {
console.error('Error connecting wallet:', err);
});
} else {
alert('Please install MetaMask or another web3 wallet.');
}
});