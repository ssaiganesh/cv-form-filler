// 1. DOM Elements
const cvTextArea = document.getElementById('cvText');
const testButton = document.getElementById('testBtn');
const statusDiv = document.getElementById('status');

// 2. Load Saved CV Text automatically when popup opens
chrome.storage.local.get(['savedCV'], (result) => {
  if (result.savedCV) {
    cvTextArea.value = result.savedCV;
    statusDiv.innerText = "Loaded saved CV from memory.";
  }
});

// 3. Auto-Save CV Text as the user types or pastes
cvTextArea.addEventListener('input', (e) => {
  chrome.storage.local.set({ savedCV: e.target.value });
});

// 4. Handle Button Click (Temporary Test Action)
testButton.addEventListener('click', () => {
  statusDiv.innerText = "Button clicked! JavaScript is linked.";
  console.log("Popup JS is working perfectly.");
});