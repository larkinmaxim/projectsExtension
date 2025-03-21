// Simple background script
console.log("Background script loaded");

// Listen for clicks on the extension icon
chrome.action.onClicked.addListener((tab) => {
  console.log("Extension icon clicked", tab);

  if (!tab || !tab.id) {
    console.error("Tab is undefined or missing id", tab);
    return;
  }

  // Check if the URL is a restricted URL
  const url = tab.url || "";
  if (
    url.startsWith("chrome://") ||
    url.startsWith("chrome-extension://") ||
    url.startsWith("devtools://") ||
    url.startsWith("edge://") ||
    url.startsWith("about:")
  ) {
    console.error("Cannot inject scripts into restricted page:", url);
    chrome.action.setBadgeText({ text: "!" });
    chrome.action.setBadgeBackgroundColor({ color: "#FF0000" });
    return;
  }

  // Reset badge if any
  chrome.action.setBadgeText({ text: "" });

  // Inject CSS and toggle panel
  chrome.scripting
    .insertCSS({
      target: { tabId: tab.id },
      files: ["styles.css", "panel.css"],
    })
    .then(() => {
      return chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: togglePanel,
      });
    })
    .then((results) => {
      console.log("Panel toggle results:", results);
    })
    .catch((error) => {
      console.error("Error toggling panel:", error);
    });
});

// Function to toggle the panel
function togglePanel() {
  // Check if Material Icons are loaded, if not, add them
  if (!document.querySelector('link[href*="fonts.googleapis.com/icon"]')) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/icon?family=Material+Icons";
    document.head.appendChild(link);
  }

  // Check if panel already exists
  let sidePanel = document.querySelector(".extension-side-panel");
  let isOpen = !!sidePanel && sidePanel.classList.contains("visible");

  if (isOpen) {
    // Close the panel
    sidePanel.classList.remove("visible");
    setTimeout(() => {
      if (sidePanel && sidePanel.parentNode) {
        sidePanel.parentNode.removeChild(sidePanel);
      }
    }, 300);
    return "Panel closed";
  } else {
    // Create and open the panel
    if (sidePanel && sidePanel.parentNode) {
      sidePanel.parentNode.removeChild(sidePanel);
    }

    // Create panel elements
    sidePanel = document.createElement("div");
    sidePanel.className = "extension-side-panel";

    // Create resize handle
    const resizeHandle = document.createElement("div");
    resizeHandle.className = "panel-resize-handle";
    sidePanel.appendChild(resizeHandle);

    // Create header with same background as footer
    const header = document.createElement("div");
    header.className = "panel-header";
    header.style.backgroundColor = "#2d2d2d"; // Same as footer

    const title = document.createElement("h3");
    title.textContent = "";

    const toggleFullscreenBtn = document.createElement("button");
    toggleFullscreenBtn.innerHTML = '<i class="material-icons">fullscreen</i>';
    toggleFullscreenBtn.className = "panel-toggle-btn";

    const closeBtn = document.createElement("button");
    closeBtn.innerHTML = "&times;";
    closeBtn.className = "panel-close-btn";

    header.appendChild(title);
    header.appendChild(toggleFullscreenBtn);
    header.appendChild(closeBtn);

    // Create content
    const content = document.createElement("div");
    content.className = "panel-content";

    // Create footer
    const footer = document.createElement("div");
    footer.className = "panel-footer";
    footer.innerHTML = `
      <p>Found a bug? Feature request? <a href="#" class="footer-link">Feedback form</a></p>
      <p>Made with ❤️ by AI</p>
    `;

    // Assemble the panel
    sidePanel.appendChild(header);
    sidePanel.appendChild(content);
    sidePanel.appendChild(footer);

    // Add to document
    document.body.appendChild(sidePanel);

    // Add event listeners
    closeBtn.addEventListener("click", function () {
      sidePanel.classList.remove("visible");
      setTimeout(() => {
        if (sidePanel && sidePanel.parentNode) {
          sidePanel.parentNode.removeChild(sidePanel);
        }
      }, 300);
    });

    let isFullscreen = false;
    let previousWidth = null;

    toggleFullscreenBtn.addEventListener("click", function () {
      isFullscreen = !isFullscreen;

      if (isFullscreen) {
        previousWidth = sidePanel.style.width || "500px";
        sidePanel.style.width = "";
        sidePanel.classList.add("fullscreen");
        toggleFullscreenBtn.innerHTML =
          '<i class="material-icons">fullscreen_exit</i>';
        resizeHandle.style.display = "none";
      } else {
        sidePanel.classList.remove("fullscreen");
        toggleFullscreenBtn.innerHTML =
          '<i class="material-icons">fullscreen</i>';
        resizeHandle.style.display = "block";
        if (previousWidth) {
          sidePanel.style.width = previousWidth;
        }
      }
    });

    // Add resize functionality
    let startX, startWidth;

    function startResize(e) {
      if (isFullscreen) return;
      startX = e.clientX;
      startWidth = parseInt(window.getComputedStyle(sidePanel).width, 10);
      resizeHandle.classList.add("dragging");
      document.addEventListener("mousemove", resize);
      document.addEventListener("mouseup", stopResize);
      e.preventDefault();
    }

    function resize(e) {
      if (sidePanel && !isFullscreen) {
        const width = startWidth - (e.clientX - startX);
        if (width >= 250 && width <= 1200) {
          sidePanel.style.width = width + "px";
        }
      }
    }

    function stopResize() {
      resizeHandle.classList.remove("dragging");
      document.removeEventListener("mousemove", resize);
      document.removeEventListener("mouseup", stopResize);
    }

    resizeHandle.addEventListener("mousedown", startResize);

    // Show panel
    setTimeout(() => {
      sidePanel.classList.add("visible");
    }, 10);

    return "Panel created and opened";
  }
}
