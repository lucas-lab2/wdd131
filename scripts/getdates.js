// Populate current year
const yearSpan = document.getElementById('currentyear');
yearSpan.textContent = new Date().getFullYear();

// Populate last modified date
const lastModP = document.getElementById('lastModified');
lastModP.textContent = `Last Modification: ${document.lastModified}.`;
