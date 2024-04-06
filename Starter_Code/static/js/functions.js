// Function to get color based on depth
function getColor(depth) {
    // This is an example. Update it according to your preferred color scheme.
    return depth > 300 ? '#800026' :
        depth > 200 ? '#BD0026' :
            depth > 100 ? '#E31A1C' :
                depth > 50 ? '#FC4E2A' :
                    depth > 20 ? '#FD8D3C' :
                        depth > 10 ? '#FEB24C' :
                            '#FFEDA0';
}

function getMarkers(data) {
    let earthquakeArray = data.features.map(earthquake => ({
        coordinates: [earthquake.geometry.coordinates[1], earthquake.geometry.coordinates[0]],
        depth: earthquake.geometry.coordinates[2],
        title: earthquake.properties.title,
        magnitude: earthquake.properties.mag
    }));

    console.log("earthquakeArray", earthquakeArray);

    // Loop through the earthquakeArray and create one circle marker for each earthquake
    for (let i = 0; i < earthquakeArray.length; i++) {
        let earthquake = earthquakeArray[i];
        let markerRadius = earthquake.magnitude * 8; // Adjust multiplier as necessary

        L.circleMarker(earthquake.coordinates, {
            radius: markerRadius, // Use the magnitude to determine the radius
            color: 'blue', // Example color, change as needed
            fillColor: getColor(earthquake.depth), // Call a function to determine color based on depth
            fillOpacity: 0.6,
            weight: 1
        })
            .bindPopup(`<h1>${earthquake.title}</h1> <hr> <h3>Magnitude: ${earthquake.magnitude}</h3> <h3>Depth: ${earthquake.depth}</h3>`)
            .addTo(myMap);
    }

}

function createLegend() {

}