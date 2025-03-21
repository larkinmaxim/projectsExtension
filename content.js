// Content script for the Side Panel Extension
// Customer information in this file has been anonymized

// This script can be used to interact with the page from the side panel
// For example, you could add message listeners to receive commands from the side panel

// Listen for messages from the side panel
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Content script received message:", message, "from", sender);

  // Handle different actions from the side panel
  if (message.action === "get_page_info") {
    // Example: Get information about the current page
    const pageInfo = {
      title: document.title,
      url: window.location.href,
      domain: window.location.hostname,
    };
    sendResponse({ status: "success", data: pageInfo });
    return true; // Indicates we'll send a response asynchronously
  } else if (message.action === "highlight_element") {
    // Example: Highlight an element on the page
    try {
      const element = document.querySelector(message.selector);
      if (element) {
        // Add a highlight class or style
        element.style.outline = "2px solid red";
        setTimeout(() => {
          element.style.outline = "";
        }, 2000); // Remove highlight after 2 seconds
        sendResponse({ status: "success" });
      } else {
        sendResponse({ status: "error", message: "Element not found" });
      }
    } catch (error) {
      sendResponse({ status: "error", message: error.message });
    }
    return true;
  } else {
    sendResponse({ status: "unknown_action" });
  }
});

// Log that content script has loaded
console.log("Content script loaded on page:", window.location.href);
