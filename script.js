document.getElementById('submitBtn').addEventListener('click', () => {
    const password = document.getElementById('passwordInput').value.trim();

    if (!password) {
        showStatus('Please enter a password.');
        return;
    }

    // SHA256 hash of your correct password, for example: 'mypassword'
    // You can generate this with an online SHA256 tool.
    const correctHash = '69d4547eba893e1193421750098db5f0b61b6c3a3481eb31ab6e191873b79eea'; // hash for 'password'

    // Hash the entered password
    const enteredHash = CryptoJS.SHA256(password).toString();

    if (enteredHash === correctHash) {
        // Password is correct, redirect to portfolio.html
        window.location.href = 'portfolio.html';
    } else {
        showStatus('Incorrect password. Try again.');
    }
});

function showStatus(message) {
    document.getElementById('status').textContent = message;
}
