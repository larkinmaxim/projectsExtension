# Side Panel Chrome Extension

A Chrome extension that adds a sliding side panel to any webpage. The panel slides in from the right side of the screen when you click the extension icon.

## Features

- Dark-themed sliding panel that appears on any webpage
- Resizable panel width (drag the left edge to adjust)
- Toggle by clicking the extension icon
- URL input with action buttons
- Shortcuts section
- Recent sites section
- Smooth sliding animation
- Clean, modern design with Material Icons

## Installation

1. Clone or download this repository to your local machine
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" by toggling the switch in the top right corner
4. Click "Load unpacked" and select the directory containing this extension
5. The extension should now be installed and visible in your Chrome toolbar

## Creating Icon Files

Before loading the extension, you need to create PNG icon files. You have two options:

### Option 1: Using the HTML Files

1. Open each of the HTML files in the `images` directory in a web browser:
   - `images/icon16.html`
   - `images/icon48.html`
   - `images/icon128.html`
2. Right-click on each icon and select "Save image as..."
3. Save each image with its corresponding name (icon16.png, icon48.png, icon128.png) in the `images` directory
4. Delete the HTML files after creating the PNG files

### Option 2: Using the Generator Script

If you have Node.js installed, you can use the included script to generate the icons automatically:

1. Install the required dependencies:
   ```
   npm install
   ```
   Or install just the canvas dependency:
   ```
   npm install canvas
   ```
2. Run the generator script:
   ```
   npm run generate-icons
   ```
   Or run it directly:
   ```
   node generate-icons.js
   ```
3. The script will create all three icon files in the `images` directory

## Usage

1. Click on the extension icon in the Chrome toolbar to toggle the side panel
2. Enter URLs in the input field at the top
3. Use the shortcuts section for quick access to frequently visited sites
4. View recently visited sites in the recent sites section
5. Close the panel by clicking the × button in the panel header

## Customization

You can customize the extension by modifying the following files:

- `styles.css`: Change the styling of the sliding panel
- `content.js`: Modify the panel content and functionality

### Changing Panel Content

To change the content of the sliding panel, edit the HTML in the `content.js` file. Look for the sections where different parts of the panel are defined:

```javascript
// URL input section
urlInput.innerHTML = `
  <div class="input-with-icon">
    <input type="text" placeholder="Please enter the url" class="url-input">
    <div class="input-actions">
      <button class="action-btn"><i class="material-icons">file_upload</i></button>
      <button class="action-btn"><i class="material-icons">bookmark</i></button>
      <button class="action-btn"><i class="material-icons">refresh</i></button>
    </div>
  </div>
`;

// Shortcuts section
shortcutSection.innerHTML = `
  <h3>ShortCut</h3>
  <div class="shortcuts-container">
    <div class="shortcut-item">
      <span>google.com</span>
    </div>
    <div class="shortcut-item add-shortcut">
      <i class="material-icons">add</i>
      <span>Add ShortCut</span>
    </div>
  </div>
`;

// Recent sites section
recentSection.innerHTML = `
  <h3>Recent Sites</h3>
  <div class="recent-sites">
    <div class="site-item">
      <img src="https://www.google.com/favicon.ico" alt="OpenAI">
      <span>OpenAI</span>
    </div>
    <!-- More sites... -->
  </div>
`;
```

### Changing Panel Appearance

To modify the appearance of the sliding panel, edit the `styles.css` file. You can change colors, sizes, animations, and other visual aspects.

### Adjusting Panel Size Limits

The panel is resizable by dragging the left edge. You can adjust the minimum and maximum width limits by modifying these values in the `styles.css` file:

```css
.extension-side-panel {
  /* ... other styles ... */
  width: 350px;      /* Default width */
  min-width: 250px;  /* Minimum width */
  max-width: 1200px; /* Maximum width */
  /* ... other styles ... */
}
```

You can also adjust the resize behavior in the `content.js` file by modifying the resize function:

```javascript
function resize(e) {
  if (sidePanel) {
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

This project includes examples of how to use Tailwind CSS with the sliding panel extension:

### Tailwind Documentation and Examples

- `tailwind-integration.md`: Detailed documentation on how to integrate Tailwind CSS with the extension
- `tailwind-panel-example.js`: Example implementation of the panel using Tailwind CSS classes
- `tailwind-test.html`: Test page demonstrating the Tailwind CSS implementation

### Benefits of Using Tailwind CSS

- No need to write custom CSS
- Consistent design system
- Faster development
- Easier to maintain
- Highly customizable

To test the Tailwind implementation, open `tailwind-test.html` in your browser.

## License

This project is open source and available for personal and commercial use.
