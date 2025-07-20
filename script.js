const correctHash = '69d4547eba893e1193421750098db5f0b61b6c3a3481eb31ab6e191873b79eea'; // Replace with your actual SHA-256 hash

async function checkPassword(input) {
    const encoder = new TextEncoder();
    const data = encoder.encode(input);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    return hashHex === correctHash;
}

document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector('.container');
    container.innerHTML = `
        <h1>Password Required</h1>
        <input type="password" id="password" placeholder="Enter password" />
        <button onclick="verify()">Submit</button>
        <p id="status"></p>
    `;
});

async function verify() {
    const input = document.getElementById('password').value;
    const result = await checkPassword(input);
    const status = document.getElementById('status');

    if (result) {
        document.querySelector('.container').innerHTML = `
            <h1>Access Granted</h1>
            <p>Welcome to the portfolio preview.</p>
        `;
    } else {
        status.textContent = "Incorrect password. Try again.";
        status.style.color = "red";
    }
}
