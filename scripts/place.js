// Static values
const temp = parseFloat(document.getElementById('temp').textContent);
const wind = parseFloat(document.getElementById('wind').textContent);

function calculateWindChill(t, s) {
  return 13.12 + 0.6215 * t - 11.37 * Math.pow(s, 0.16) + 0.3965 * t * Math.pow(s, 0.16);
}

window.addEventListener('DOMContentLoaded', () => {
  const wcElem = document.getElementById('windchill');
  if (temp <= 10 && wind > 4.8) {
    wcElem.textContent = calculateWindChill(temp, wind).toFixed(1);
  } else {
    wcElem.textContent = 'N/A';
  }
  document.getElementById('year').textContent = new Date().getFullYear();
  document.getElementById('lastmodified').textContent = document.lastModified;
});