// --- Configuration ---
const PASSWORD_HASH = '69d4547eba893e1193421750098db5f0b61b6c3a3481eb31ab6e191873b79eea'; // Replace with your own SHA-256 hash
const redirectOnSuccess = null; // Optional: e.g. 'portfolio.html' to redirect instead of reveal content

// --- Utility: Convert text to SHA-256 hash ---
async function sha256(text) {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hashBuffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

// --- Main password check ---
async function checkPassword() {
  const input = document.getElementById('password-input').value;
  const status = document.getElementById('status');

  if (!input) {
    status.textContent = 'Please enter a password.';
    return;
  }

  const hash = await sha256(input);

  if (hash === PASSWORD_HASH) {
    sessionStorage.setItem('accessGranted', 'true');
    if (redirectOnSuccess) {
      window.location.href = redirectOnSuccess;
    } else {
      document.getElementById('password-gate').style.display = 'none';
      document.getElementById('protected-content').style.display = 'block';
    }
  } else {
    status.textContent = 'Incorrect password.';
  }
}

// --- Auto-unlock if already verified ---
window.addEventListener('DOMContentLoaded', () => {
  const gate = document.getElementById('password-gate');
  const content = document.getElementById('protected-content');

  if (sessionStorage.getItem('accessGranted') === 'true') {
    gate.style.display = 'none';
    content.style.display = 'block';
  } else {
    gate.style.display = 'block';
    content.style.display = 'none';
  }
});
