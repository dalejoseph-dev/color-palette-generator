// Select the "Generate" button element from the DOM by its ID
const generateBtn = document.getElementById('generate-btn');

// Select the palette container element using its CSS class
const paletteContainer = document.querySelector('.palette-container');

// Attach a click event listener to the generate button.
// Every time it's clicked, it calls the generatePalette() function.
generateBtn.addEventListener('click', generatePalette);

// Use event delegation on the palette container to handle clicks on child elements.
// Instead of adding a listener to every button/color, we listen on the parent
// and check what was actually clicked using e.target.
paletteContainer.addEventListener('click', (e) => {

  // Check if the clicked element is a copy button
  if (e.target.classList.contains('.copy-btn')) {
    // Get the hex value from the sibling element right before the copy button
    const hexValue = e.target.previousElementSibling.textContent;

    // Write the hex value to the clipboard
    navigator.clipboard.writeText(hexValue)
      .then(() => showCopySuccess(e.target))  // On success, show the checkmark animation
      .catch((err) => alert(err));            // On failure, alert the error

  // Check if the clicked element is the color swatch/box itself
  } else if (e.target.classList.contains('.color')) {
    // Navigate to the sibling element and find the hex value text inside it
    const hexValue = e.target.nextElementSibling.querySelector('.hex-value').textContent;

    // Write the hex value to the clipboard
    navigator.clipboard.writeText(hexValue)
      .then(() => showCopySuccess(e.target.nextElementSibling.querySelector('.copy-btn'))) // Show success on the copy button
      .catch((err) => alert(err)); // On failure, alert the error
  }
});

// Temporarily changes the copy icon to a green checkmark to give the user
// visual feedback that the hex value was successfully copied.
function showCopySuccess(element) {
  // Remove the copy icon classes and replace with a checkmark icon (Font Awesome)
  element.classList.remove('far', 'fa-copy');
  element.classList.add('fas', 'fa-check');
  
  // Turn the icon green to reinforce the success state
  element.style.color = '#48bb78';
  
  // After 1.5 seconds, revert the icon back to the original copy icon
  setTimeout(() => {
    element.classList.remove('fas', 'fa-check');
    element.classList.add('far', 'fa-copy');
    element.style.color = ''; // Reset the color back to its default CSS value
  }, 1500);
}

// Generates a new palette by creating 5 random colors and displaying them.
function generatePalette() {
  const colors = [] // Empty array to store the generated hex color values
  
  // Loop 5 times to generate 5 random colors
  for (let i = 0; i < 5; i++) {
    colors.push(generateRandomColor()); // Generate a color and add it to the array
  }
  
  // Pass the array of colors to the display function to update the UI
  updatePaletteDisplay(colors);
}

// Generates and returns a single random hex color string (e.g., "#3A9F2C").
function generateRandomColor() {
  const letters = "0123456789ABCDEF"; // All valid characters in a hex color code
  let color = "#"; // Start the hex string with the '#' prefix
  
  // Pick 6 random characters from the letters string to form a valid hex color
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]; // Random index from 0–15
  }
  return color; // Return the completed hex color string, e.g. "#A3F1BC"
}

// Updates the color swatches in the UI to reflect the newly generated palette.
function updatePaletteDisplay(colors) {
  // Select all color box elements in the palette
  const colorBoxes = document.querySelectorAll('.color-box');
  
  // Loop through each box and apply the corresponding color from the array
  colorBoxes.forEach((box, index) => {
    const color = colors[index]; // Get the color for this specific box

    const colorDiv = box.querySelector('.color');      // The visual color swatch element
    const hexValue = box.querySelector('.hex-value');  // The text label showing the hex code
    
    colorDiv.style.backgroundColor = color; // Set the swatch background to the generated color
    hexValue.textContent = color;           // Display the hex code as text below the swatch
  });
}

// generatePalette();
// ⬆ This line is commented out. It was likely used to auto-generate a palette
// on page load during development. Uncomment it to run generatePalette()
// automatically when the script first loads.