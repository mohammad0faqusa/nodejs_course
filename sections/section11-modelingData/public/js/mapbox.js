
console.log('hello from the client side :D')
const locations = JSON.parse(document.getElementById('map').dataset.locations) 
console.log(locations); 

mapboxgl.accessToken = 'pk.eyJ1IjoibW9oYW1tYWRmYXF1c2EiLCJhIjoiY203eTk0a284MDZvajJrcjYydGRrMDk0NCJ9.MLixoJKmX_v1VRrxxvTz1g';
const map = new mapboxgl.Map({
	container: 'map', // container ID
	style: 'mapbox://styles/mapbox/streets-v12', // style URL
	center: [-74.5, 40], // starting position [lng, lat]
	zoom: 9, // starting zoom
});