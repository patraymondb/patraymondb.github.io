// password-protect.js

const correctHash = '69d4547eba893e1193421750098db5f0b61b6c3a3481eb31ab6e191873b79eea'; // replace with your actual hash

console.log("Password script loaded");

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

    container.innerHTML = `
        <h1>Password Required</h1>
        <input type="password" id="password" placeholder="Enter password" autofocus />
        <br />
        <button id="submitBtn">Submit</button>
        <p id="status"></p>
    `;

    document.getElementById('submitBtn').addEventListener('click', async () => {
        const input = document.getElementById('password').value;
        console.log("Submit clicked, checking password:", input);
        const status = document.getElementById('status');
        const valid = await checkPassword(input);

        if (valid) {
            container.innerHTML = originalContent; // Show original content
        } else {
            status.textContent = "Incorrect password. Try again.";
            status.style.color = "red";
        }
    });

    document.getElementById('password').addEventListener('keydown', (e) => {
        if (e.key === "Enter") {
            document.getElementById('submitBtn').click();
        }
    });
});
