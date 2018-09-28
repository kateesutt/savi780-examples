// This isn't necessary but it keeps the editor from thinking L is a typo
/* global L */

var map = L.map('map').setView([40.7254, -73.9771], 11);

// We define the GeoJSON layer here so we can access it multiple times later on.
// If we wanted to 
var complaintLayer = L.geoJson().addTo(map);

// Add base layer
L.tileLayer('https://stamen-tiles.a.ssl.fastly.net/toner/{z}/{x}/{y}.png', {
  maxZoom: 18
}).addTo(map);

function loadData(borough) {
  // First clear the data from our GeoJSON layer
  complaintLayer.clearLayers();
  
  fetch('https://data.cityofnewyork.us/resource/fhrw-4uyv.geojson?$limit=100&borough=' + borough)
    .then(function (response) {
      // Read data as JSON
      return response.json();
    })
    .then(function (data) {
      // Add data to the layer
      complaintLayer.addData(data);
    });
}

var boroughPicker = document.querySelector('.borough-picker');

// When the borough picker changes, load data for that borough
boroughPicker.addEventListener('change', function () {
  loadData(boroughPicker.value);
});