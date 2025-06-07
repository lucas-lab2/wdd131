// script.js
const products = [
  { id: 'p1', name: 'Widget Pro' },
  { id: 'p2', name: 'Gadget Plus' },
  { id: 'p3', name: 'Doohickey Deluxe' },
  { id: 'p4', name: 'Thingamajig Elite' }
];
const select = document.getElementById('productSelect');
products.forEach(prod => {
  const opt = document.createElement('option');
  opt.value = prod.id;
  opt.textContent = prod.name;
  select.appendChild(opt);
});
document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('lastmodified').textContent = document.lastModified;
