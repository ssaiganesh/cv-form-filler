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
testButton.addEventListener('click', async () => {
  statusDiv.innerText = "Scanning page for form fields...";

  // Get the current active browser tab
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
  if (!tab) {
    statusDiv.innerText = "Error: No active tab found.";
    return;
  }

  // Send a message to content.js on that webpage
  chrome.tabs.sendMessage(tab.id, { action: "scan_form" }, (response) => {
    if (chrome.runtime.lastError) {
      statusDiv.innerText = "Error: Refresh the target webpage first.";
      console.error(chrome.runtime.lastError);
      return;
    }

    if (response && response.fields.length > 0) {
      statusDiv.innerText = `Success! Found ${response.fields.length} fields on this page. Check console for details.`;
      console.log("Fields found:", response.fields);
    } else {
      statusDiv.innerText = "Connected, but found 0 text fields on this page.";
    }
  });
});