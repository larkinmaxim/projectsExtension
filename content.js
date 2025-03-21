// This creates and manages the sidebar panel
let sidePanel = null;
let isOpen = false;
let isFullscreen = false;
let previousWidth = null; // Store previous width for restoring from fullscreen
let isAnimating = false; // Track animation state

function createSidePanel() {
  // Create the main panel container
  sidePanel = document.createElement("div");
  sidePanel.className = "sliding-panel";

  // Create resize handle
  const resizeHandle = document.createElement("div");
  resizeHandle.className = "panel-resize-handle";
  sidePanel.appendChild(resizeHandle);

  // Create header with title and buttons
  const header = document.createElement("div");
  header.className = "panel-header";

  const title = document.createElement("h3");
  title.textContent = ""; // Removed "ShortCut" text

  const toggleFullscreenBtn = document.createElement("button");
  toggleFullscreenBtn.innerHTML = '<i class="material-icons">fullscreen</i>';
  toggleFullscreenBtn.className = "panel-toggle-btn";
  toggleFullscreenBtn.addEventListener("click", toggleFullscreen);

  const closeBtn = document.createElement("button");
  closeBtn.innerHTML = "&times;";
  closeBtn.className = "panel-close-btn";
  closeBtn.addEventListener("click", togglePanel);

  // Position title on the left, toggle and close buttons on the right
  header.appendChild(title);
  header.appendChild(toggleFullscreenBtn);
  header.appendChild(closeBtn);

  // Create content container (empty but maintains structure)
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

  // Add to the document
  document.body.appendChild(sidePanel);

  // Add resize functionality
  let startX, startWidth;

  function startResize(e) {
    if (isFullscreen) return; // Disable resize in fullscreen mode
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

  function toggleFullscreen() {
    if (!sidePanel) return;

    isFullscreen = !isFullscreen;

    if (isFullscreen) {
      // Store current width before going fullscreen
      previousWidth = sidePanel.style.width || "500px";
      // Remove the inline width style to allow CSS to control width in fullscreen
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
      // Restore previous width
      if (previousWidth) {
        sidePanel.style.width = previousWidth;
      }
    }
  }

  resizeHandle.addEventListener("mousedown", startResize);

  // Force layout calculation before starting animation
  setTimeout(() => {
    sidePanel.classList.add("visible");
  }, 10);
}

let removeTimeout = null;

function togglePanel() {
  console.log("Toggle panel called. Current state:", {
    isOpen,
    isFullscreen,
    hasSidePanel: !!sidePanel,
    isAnimating,
  });

  // If animation is in progress, ignore the toggle
  if (isAnimating) {
    console.log("Animation in progress, ignoring toggle");
    return;
  }

  // Clear any pending removal timeout
  if (removeTimeout) {
    console.log("Clearing pending removal timeout");
    clearTimeout(removeTimeout);
    removeTimeout = null;
  }

  if (isOpen) {
    console.log("Closing panel");
    isAnimating = true;
    sidePanel.classList.remove("visible");

    // Reset all states immediately
    isOpen = false;
    isFullscreen = false;
    previousWidth = null;

    console.log("States reset, current state:", {
      isOpen,
      isFullscreen,
      hasSidePanel: !!sidePanel,
      isAnimating,
    });

    // Remove panel after animation
    removeTimeout = setTimeout(() => {
      if (sidePanel && sidePanel.parentNode) {
        console.log("Removing panel from DOM");
        sidePanel.parentNode.removeChild(sidePanel);
        sidePanel = null;
      }
      isAnimating = false;
      console.log("Panel removed, final state:", {
        isOpen,
        isFullscreen,
        hasSidePanel: !!sidePanel,
        isAnimating,
      });
    }, 300); // Match transition duration
  } else {
    console.log("Opening panel");
    isAnimating = true;

    // Ensure clean state
    if (sidePanel && sidePanel.parentNode) {
      console.log("Cleaning up existing panel");
      sidePanel.parentNode.removeChild(sidePanel);
      sidePanel = null;
    }

    createSidePanel();
    isOpen = true;

    // Reset animation state after panel is visible
    setTimeout(() => {
      isAnimating = false;
      console.log("Panel opened, animation complete:", {
        isOpen,
        isFullscreen,
        hasSidePanel: !!sidePanel,
        isAnimating,
      });
    }, 10);
  }
}

// Listen for messages from the background script
chrome.runtime.onMessage.addListener((message) => {
  console.log("Message received:", message);
  if (message.action === "toggle_panel") {
    console.log("Toggle panel message received");
    togglePanel();
  }
});
