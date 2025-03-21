# Side Panel Chrome Extension

A Chrome extension that adds a sliding side panel to any webpage. The panel slides in from the right side of the screen when you click the extension icon.

## Features

- Dark-themed sliding panel that appears on any webpage
- Resizable panel width (drag the left edge to adjust)
- Toggle by clicking the extension icon
- Fullscreen toggle button to expand the panel to full width
- Smooth sliding animation
- Clean, modern design with Material Icons
- Minimalist header with toggle and close buttons

## Installation

1. Clone or download this repository to your local machine
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" by toggling the switch in the top right corner
4. Click "Load unpacked" and select the directory containing this extension
5. The extension should now be installed and visible in your Chrome toolbar


## Usage

1. Click on the extension icon in the Chrome toolbar to toggle the side panel
2. Resize the panel by dragging the left edge
3. Toggle fullscreen mode by clicking the fullscreen button in the header
4. Close the panel by clicking the × button in the panel header

## Customization

You can customize the extension by modifying the following files:

- `styles.css`: Change the styling of the sliding panel
- `content.js`: Modify the panel content and functionality

### Changing Panel Content

To change the content of the sliding panel, edit the `content.js` file. The panel is created with the following structure:

```javascript
// Create the main panel container
sidePanel = document.createElement("div");
sidePanel.className = "sliding-panel";

// Create resize handle
const resizeHandle = document.createElement("div");
resizeHandle.className = "panel-resize-handle";

// Create header with buttons
const header = document.createElement("div");
header.className = "panel-header";

const title = document.createElement("h3");
title.textContent = ""; // Empty title

const toggleFullscreenBtn = document.createElement("button");
toggleFullscreenBtn.innerHTML = '<i class="material-icons">fullscreen</i>';
toggleFullscreenBtn.className = "panel-toggle-btn";

const closeBtn = document.createElement("button");
closeBtn.innerHTML = "&times;";
closeBtn.className = "panel-close-btn";

// Create content container
const content = document.createElement("div");
content.className = "panel-content";

// Create footer
const footer = document.createElement("div");
footer.className = "panel-footer";
footer.innerHTML = `
  <p>Found a bug? Feature request? <a href="#" class="footer-link">Feedback form</a></p>
  <p>Made with ❤️ by extrastu (v1.0.11)</p>
`;
```

You can modify this structure to add your own content to the panel.

### Changing Panel Appearance

To modify the appearance of the sliding panel, edit the `styles.css` file. You can change colors, sizes, animations, and other visual aspects.

### Adjusting Panel Size Limits

The panel is resizable by dragging the left edge. You can adjust the minimum and maximum width limits by modifying these values in the `panel.css` and `styles.css` files:

In `panel.css`:
```css
.sliding-panel {
  /* ... other styles ... */
  width: 500px;      /* Default width */
  /* ... other styles ... */
}
```

In `styles.css`:
```css
.extension-side-panel {
  /* ... other styles ... */
  width: 800px;      /* Default width */
  min-width: 250px;  /* Minimum width */
  max-width: 1200px; /* Maximum width */
  /* ... other styles ... */
}
```

You can also adjust the resize behavior in the `content.js` file by modifying the resize function:

```javascript
function resize(e) {
  if (sidePanel && !isFullscreen) {
    const width = startWidth - (e.clientX - startX);
    if (width >= 250 && width <= 1200) {  // Min and max width limits
      sidePanel.style.width = width + 'px';
    }
  }
}
```

## Testing

You can test the sliding panel functionality without loading it as a Chrome extension by opening the `test-page.html` file in a web browser. This page includes all the necessary CSS and JavaScript to demonstrate how the panel works.

## Tailwind CSS Integration

The test page (`test-page.html`) uses Tailwind CSS for styling. You can leverage Tailwind CSS in your own implementation by including the CDN link in your HTML:

```html
<link href="https://cdn.tailwindcss.com" rel="stylesheet">
```

### Benefits of Using Tailwind CSS

- No need to write custom CSS
- Consistent design system
- Faster development
- Easier to maintain
- Highly customizable

## License

This project is open source and available for personal and commercial use.
