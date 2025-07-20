// password-protect.js

// Replace this with your SHA-256 hash of the password (lowercase hex)
const correctHash = '69d4547eba893e1193421750098db5f0b61b6c3a3481eb31ab6e191873b79eea'; // example hash, replace with yours

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
    const originalContent = container.innerHTML; // Save original content

    // Show password prompt initially
    container.innerHTML = `
        <h1>Password Required</h1>
        <input type="password" id="password" placeholder="Enter password" autofocus />
        <br />
        <button id="submitBtn">Submit</button>
        <p id="status"></p>
    `;

    document.getElementById('submitBtn').addEventListener('click', async () => {
        const input = document.getElementById('password').value;
        const status = document.getElementById('status');
        const valid = await checkPassword(input);

        if (valid) {
            container.innerHTML = originalContent; // Show original content
        } else {
            status.textContent = "Incorrect password. Try again.";
            status.style.color = "red";
        }
    });
});

