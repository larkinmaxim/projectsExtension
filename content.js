// This creates and manages the sidebar panel
let sidePanel = null;
let isOpen = false;
let isFullscreen = false;
let previousWidth = null; // Store previous width for restoring from fullscreen

function createSidePanel() {
  if (sidePanel) return;
  
  // Create the main panel container
  sidePanel = document.createElement('div');
  sidePanel.className = 'sliding-panel';
  
  // Create resize handle
  const resizeHandle = document.createElement('div');
  resizeHandle.className = 'panel-resize-handle';
  sidePanel.appendChild(resizeHandle);
  
  // Create header with title and buttons
  const header = document.createElement('div');
  header.className = 'panel-header';
  
  const title = document.createElement('h3');
  title.textContent = 'ShortCut';
  
  const toggleFullscreenBtn = document.createElement('button');
  toggleFullscreenBtn.innerHTML = '<i class="material-icons">fullscreen</i>';
  toggleFullscreenBtn.className = 'panel-toggle-btn';
  toggleFullscreenBtn.addEventListener('click', toggleFullscreen);

  const closeBtn = document.createElement('button');
  closeBtn.innerHTML = '&times;';
  closeBtn.className = 'panel-close-btn';
  closeBtn.addEventListener('click', togglePanel);
  
  header.appendChild(title);
  header.appendChild(toggleFullscreenBtn);
  header.appendChild(closeBtn);
  
  // Create content container (empty but maintains structure)
  const content = document.createElement('div');
  content.className = 'panel-content';
  
  // Create footer
  const footer = document.createElement('div');
  footer.className = 'panel-footer';
  footer.innerHTML = `
    <p>Found a bug? Feature request? <a href="#" class="footer-link">Feedback form</a></p>
    <p>Made with ❤️ by extrastu (v1.0.11)</p>
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
    resizeHandle.classList.add('dragging');
    document.addEventListener('mousemove', resize);
    document.addEventListener('mouseup', stopResize);
    e.preventDefault();
  }
  
  function resize(e) {
    if (sidePanel && !isFullscreen) {
      const width = startWidth - (e.clientX - startX);
      if (width >= 250 && width <= 1200) {
        sidePanel.style.width = width + 'px';
      }
    }
  }
  
  function stopResize() {
    resizeHandle.classList.remove('dragging');
    document.removeEventListener('mousemove', resize);
    document.removeEventListener('mouseup', stopResize);
  }

  function toggleFullscreen() {
    if (!sidePanel) return;

    isFullscreen = !isFullscreen;
    
    if (isFullscreen) {
      // Store current width before going fullscreen
      previousWidth = sidePanel.style.width || '500px';
      sidePanel.classList.add('fullscreen');
      toggleFullscreenBtn.innerHTML = '<i class="material-icons">fullscreen_exit</i>';
      resizeHandle.style.display = 'none';
    } else {
      sidePanel.classList.remove('fullscreen');
      toggleFullscreenBtn.innerHTML = '<i class="material-icons">fullscreen</i>';
      resizeHandle.style.display = 'block';
      // Restore previous width
      if (previousWidth) {
        sidePanel.style.width = previousWidth;
      }
    }
  }
  
  resizeHandle.addEventListener('mousedown', startResize);
  
  // Force layout calculation before starting animation
  setTimeout(() => {
    sidePanel.classList.add('visible');
  }, 10);
}

function togglePanel() {
  if (!sidePanel) {
    createSidePanel();
    isOpen = true;
    return;
  }
  
  if (isOpen) {
    sidePanel.classList.remove('visible');
    isOpen = false;
    isFullscreen = false; // Reset fullscreen state when closing
    
    // Wait for animation to complete before removing
    setTimeout(() => {
      if (!isOpen && sidePanel && sidePanel.parentNode) {
        sidePanel.parentNode.removeChild(sidePanel);
        sidePanel = null;
      }
    }, 300); // Match transition duration
  } else {
    createSidePanel();
    isOpen = true;
  }
}

// Listen for messages from the background script
chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "toggle_panel") {
    togglePanel();
  }
});
