// grab static values from DOM
const temp = parseFloat(document.getElementById('temp').textContent);
const wind = parseFloat(document.getElementById('wind').textContent);

// one-line wind chill formula (°C)
function calculateWindChill(t, s) {
  return 13.12 + 0.6215*t - 11.37*Math.pow(s,0.16) + 0.3965*t*Math.pow(s,0.16);
}

window.addEventListener('DOMContentLoaded', () => {
  // footer year & last modified
  document.getElementById('year').textContent = new Date().getFullYear();
  document.getElementById('lastmodified').textContent = document.lastModified;

  // wind chill logic
  const wcEl = document.getElementById('windchill');
  if (temp <= 10 && wind > 4.8) {
    wcEl.textContent = calculateWindChill(temp, wind).toFixed(1) + ' °C';
  } else {
    wcEl.textContent = 'N/A';
  }
});
