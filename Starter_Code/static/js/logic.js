//URL for all earthquakes in the past week
const url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Empty object to store JSON data 
let allData
let bbox;
let features
let metadata;

// Create initial map object using Los Angeles coordinates
let myMap = L.map("map", {
    center: [34.05, -118.24],
    zoom: 6
});

// Add tiles into LA_Map object
// Use topical, not street view
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Fetch the JSON data, store and console.log into allData object
d3.json(url).then(function (data) {
    // Store and Console.log the data
    allData = data
    bbox = allData.bbox
    features = allData.features
    metadata = allData.metadata

    console.log("allData", allData);
    console.log("bbox", bbox);
    console.log("features", features);
    console.log("metadata", metadata);

    // Run function to getMarkers and createLegend
    getMarkers(data)
    createLegend()


});