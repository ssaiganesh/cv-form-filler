chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "scan_form") {
    // Look for standard text inputs and textareas on the webpage
    const inputs = document.querySelectorAll('input[type="text"], input[type="email"], textarea');
    const fieldsFound = [];

    inputs.forEach((input, index) => {
      // 1. Try to find a human-readable label for the text box
      let labelText = input.placeholder || "";
      const associatedLabel = input.labels?.[0] || document.querySelector(`label[for="${input.id}"]`);
      
      if (associatedLabel) {
        labelText = associatedLabel.innerText;
      }

      // 2. Fallback if the field has absolutely no identifier
      if (!input.id) {
        input.id = `ai-field-${index}`;
      }

      fieldsFound.push({
        id: input.id,
        label: labelText.trim() || `Unknown Field (${input.type})`
      });
    });

    // Send the list of discovered fields back to popup.js
    sendResponse({ fields: fieldsFound });
  }
});