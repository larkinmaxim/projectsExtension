// This script generates PNG icons from SVG code
// Run this with Node.js: node generate-icons.js

const fs = require('fs');
const { createCanvas } = require('canvas');
const path = require('path');

// Create the images directory if it doesn't exist
const imagesDir = path.join(__dirname, 'images');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir);
}

// Function to create a simple icon
function createIcon(size, filename) {
  // Create a canvas with the specified size
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');
  
  // Draw the icon (blue square with white square inside and blue square inside that)
  // Background
  ctx.fillStyle = '#4285f4';
  ctx.fillRect(0, 0, size, size);
  
  // White square
  ctx.fillStyle = 'white';
  const whiteSquareSize = size / 2;
  const whiteSquarePos = size / 4;
  ctx.fillRect(whiteSquarePos, whiteSquarePos, whiteSquareSize, whiteSquareSize);
  
  // Inner blue square
  ctx.fillStyle = '#4285f4';
  const innerSquareSize = size / 4;
  const innerSquarePos = size * 3/8;
  ctx.fillRect(innerSquarePos, innerSquarePos, innerSquareSize, innerSquareSize);
  
  // Convert canvas to PNG buffer
  const buffer = canvas.toBuffer('image/png');
  
  // Write to file
  fs.writeFileSync(path.join(imagesDir, filename), buffer);
  console.log(`Created ${filename}`);
}

// Generate icons in different sizes
try {
  createIcon(16, 'icon16.png');
  createIcon(48, 'icon48.png');
  createIcon(128, 'icon128.png');
  console.log('All icons generated successfully!');
  console.log('You can now delete the HTML icon files if you wish.');
} catch (error) {
  console.error('Error generating icons:', error);
  console.log('Note: This script requires the "canvas" npm package.');
  console.log('Install it with: npm install canvas');
}
