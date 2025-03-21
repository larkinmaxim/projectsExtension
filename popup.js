// Customer information in this file has been anonymized
document.addEventListener("DOMContentLoaded", function () {
  // Get the toggle button element
  const toggleButton = document.getElementById("togglePanel");

  // Add click event listener to the button
  toggleButton.addEventListener("click", function () {
    // Query for the active tab
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      // Send a message to the content script
      chrome.tabs.sendMessage(
        tabs[0].id,
        { action: "toggle_panel" },
        function (response) {
          console.log(
            "Panel toggle status:",
            response ? response.status : "No response"
          );
        }
      );
    });

    // Close the popup after clicking the button
    window.close();
  });
});
