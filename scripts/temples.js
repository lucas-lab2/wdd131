// Dynamic footer year
document.getElementById('year').textContent = new Date().getFullYear();
// Last modified date
document.getElementById('lastModified').textContent = document.lastModified;
// Hamburger toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
hamburger.addEventListener('click', () => {
    const isVisible = navMenu.style.display === 'flex';
    navMenu.style.display = isVisible ? 'none' : 'flex';
});
