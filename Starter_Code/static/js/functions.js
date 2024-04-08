// Define colors and labels for the legend
const labels = ["-10-10", "10-30", "30-50", "50-70", "70-90", "90+"];
const colors = ["#FFEDA0", "#FEB24C", "#FD8D3C", "#FC4E2A", "#E31A1C", "#BD0026"];

// Function to get color based on depth
function getColor(depth) {
    //  Function to determine the color of the marker based on the depth of the earthquake
    return depth > 300 ? '#800026' :
        depth > 200 ? '#BD0026' :
            depth > 100 ? '#E31A1C' :
                depth > 50 ? '#FC4E2A' :
                    depth > 20 ? '#FD8D3C' :
                        depth > 10 ? '#FEB24C' :
                            '#FFEDA0';
}

function getMarkers(data) {
    // Create an array of the earthquake data
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
        let markerRadius = earthquake.magnitude * 6;

        L.circleMarker(earthquake.coordinates, {
            radius: markerRadius, // Use the magnitude to determine the radius
            color: 'blue',
            fillColor: getColor(earthquake.depth), // Use the depth to determine the color
            fillOpacity: 0.6,
            weight: 1
        })
            .bindPopup(`<h1>${earthquake.title}</h1> <hr> <h3>Magnitude: ${earthquake.magnitude}</h3> <h3>Depth: ${earthquake.depth}</h3>`)
            .addTo(myMap);
    }

}

function createLegend() {
    const legend = L.control({ position: 'bottomright' });
    legend.onAdd = function (map) {
        const div = L.DomUtil.create('div', 'info legend');
        // Loop through our labels and colors to add items to the legend
        labels.forEach((label, index) => {
            div.innerHTML +=
                '<i style="background:' + colors[index] + '"></i> ' +
                label + '<br>';
        });
        return div;
    };

    legend.addTo(myMap);
}