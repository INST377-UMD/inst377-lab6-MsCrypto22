const map = L.map('map').setView([32.5, -95], 5); // Centered in the US

// Add the OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Function to generate random numbers within a range
function getRandomInRange(from, to, fixed) {
return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
}

// Generate 3 sets of random coordinates
const coordinates = [
{
lat: getRandomInRange(30, 35, 3),
lng: getRandomInRange(-90, -100, 3),
},
{
lat: getRandomInRange(30, 35, 3),
lng: getRandomInRange(-90, -100, 3),
},
{
lat: getRandomInRange(30, 35, 3),
lng: getRandomInRange(-90, -100, 3),
},
];

// Function to get locality from API
async function fetchLocality(lat, lng, markerId) {
const response = await fetch(
`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
);
const data = await response.json();
const locality = data.locality || 'Unknown locality';

// Update the HTML content for the respective marker
document.getElementById(markerId).innerText += `(${lat}, ${lng}) - ${locality}`;
}

// Add markers to the map and fetch localities
coordinates.forEach((coord, index) => {
const marker = L.marker([coord.lat, coord.lng]).addTo(map);
const markerId = `marker${index + 1}`;
fetchLocality(coord.lat, coord.lng, markerId);
});