/* filtered-temples.js */

/* Temple Data Array */
const temples = [
  {
    name: "Kirtland Temple",
    location: "Kirtland, Ohio, USA",
    dedicatedDate: "1836-03-27",
    area: 11186,
    imageUrl: "https://www.churchofjesuschrist.org/.../kirtland-temple.jpg"
  },
  {
    name: "St. George Temple",
    location: "St. George, Utah, USA",
    dedicatedDate: "1877-04-06",
    area: 18633,
    imageUrl: "https://www.churchofjesuschrist.org/.../st-george-temple.jpg"
  },
  {
    name: "Salt Lake Temple",
    location: "Salt Lake City, Utah, USA",
    dedicatedDate: "1893-04-06",
    area: 253000,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/9/93/Salt_Lake_Temple%2C_Utah_-_Sept_2004-2.jpg"
  },
  {
    name: "Laie Hawaii Temple",
    location: "Laie, Hawaii, USA",
    dedicatedDate: "1919-11-27",
    area: 72000,
    imageUrl: "https://www.churchofjesuschrist.org/.../laie-hawaii-temple.jpg"
  },
  {
    name: "Los Angeles Temple",
    location: "Los Angeles, California, USA",
    dedicatedDate: "1956-03-11",
    area: 79000,
    imageUrl: "https://www.churchofjesuschrist.org/.../la-temple.jpg"
  },
  {
    name: "Washington D.C. Temple",
    location: "Kensington, Maryland, USA",
    dedicatedDate: "1974-11-19",
    area: 160000,
    imageUrl: "https://www.churchofjesuschrist.org/.../dc-temple.jpg"
  },
  {
    name: "London England Temple",
    location: "Newchapel, Surrey, England",
    dedicatedDate: "1958-09-07",
    area: 21000,
    imageUrl: "https://www.churchofjesuschrist.org/.../london-temple.jpg"
  },
  {
    name: "Aba Nigeria Temple",
    location: "Aba, Nigeria",
    dedicatedDate: "2005-08-07",
    area: 11500,
    imageUrl: "https://www.churchofjesuschrist.org/.../aba-temple.jpg"
  },
  {
    name: "Accra Ghana Temple",
    location: "Accra, Ghana",
    dedicatedDate: "2004-01-11",
    area: 83000,
    imageUrl: "https://www.churchofjesuschrist.org/.../accra-temple.jpg"
  },
  {
    name: "Apia Samoa Temple",
    location: "Apia, Samoa",
    dedicatedDate: "1983-09-18",
    area: 6300,
    imageUrl: "https://www.churchofjesuschrist.org/.../apia-temple.jpg"
  }
];

/* Function to display an array of temples */
function displayTemples(templesToDisplay) {
  const container = document.getElementById("temple-cards");
  container.innerHTML = ""; // clear previous cards

  templesToDisplay.forEach((temple) => {
    // Create card elements
    const card = document.createElement("article");
    card.classList.add("temple-card");

    const title = document.createElement("h2");
    title.textContent = temple.name;

    const loc = document.createElement("p");
    loc.textContent = `Location: ${temple.location}`;

    const date = document.createElement("p");
    date.textContent = `Dedicated: ${temple.dedicatedDate}`;

    const area = document.createElement("p");
    area.textContent = `Area: ${temple.area.toLocaleString()} sq ft`;

    const img = document.createElement("img");
    img.src = temple.imageUrl;
    img.alt = temple.name;
    img.loading = "lazy";

    // Append elements
    card.appendChild(title);
    card.appendChild(loc);
    card.appendChild(date);
    card.appendChild(area);
    card.appendChild(img);

    container.appendChild(card);
  });
}

/* Filter logic based on nav clicks */
function filterTemples(filter) {
  let filtered = [];

  switch (filter) {
    case "old":
      filtered = temples.filter((t) => new Date(t.dedicatedDate) < new Date("1900-01-01"));
      break;
    case "new":
      filtered = temples.filter((t) => new Date(t.dedicatedDate) > new Date("2000-01-01"));
      break;
    case "large":
      filtered = temples.filter((t) => t.area > 90000);
      break;
    case "small":
      filtered = temples.filter((t) => t.area < 10000);
      break;
    default:
      filtered = temples.slice(); // all
  }

  displayTemples(filtered);
}

/* Setup event listeners after DOM loads */
document.addEventListener("DOMContentLoaded", () => {
  // Display all temples on load
  displayTemples(temples);

  // Footer: year and last modified
  document.getElementById("year").textContent = new Date().getFullYear();
  document.getElementById("lastModified").textContent = document.lastModified;

  // Nav filter clicks
  const links = document.querySelectorAll("#nav-menu a");
  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const filter = link.getAttribute("data-filter");
      filterTemples(filter);
    });
  });

  // Menu toggle for small screens
  const menuToggle = document.querySelector(".menu-toggle");
  const navMenu = document.getElementById("nav-menu");
  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("open");
  });
});
