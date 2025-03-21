// Simple background script
// Customer information in this file has been anonymized
console.log("Background script loaded");

// Initialize the side panel
chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });

// Listen for clicks on the extension icon
chrome.action.onClicked.addListener((tab) => {
  console.log("Extension icon clicked", tab);

  if (!tab || !tab.id) {
    console.error("Tab is undefined or missing id", tab);
    return;
  }

  // Toggle the side panel
  // The side panel will be opened/closed automatically by Chrome
  // based on the openPanelOnActionClick setting
  console.log("Toggling side panel for tab:", tab.id);
});
