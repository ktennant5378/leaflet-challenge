function getMarkers(data) {
    let earthquakeArray = data.features.map(earthquake => ({
        coordinates: [earthquake.geometry.coordinates[1], earthquake.geometry.coordinates[0]],
        depth: earthquake.geometry.coordinates[2],
        title: earthquake.properties.title,
        magnitude: earthquake.properties.mag
    }));

    console.log("earthquakeArray", earthquakeArray);

    // Loop through the earthquakeArray and create one marker for each earthquake, bind a popup containing its title, and add it to the map.
    for (let i = 0; i < earthquakeArray.length; i++) {
        let earthquake = earthquakeArray[i];
        L.marker(earthquake.coordinates) // Fix the typo here and reference correctly
            .bindPopup(`<h1>${earthquake.title}</h1>`)
            .addTo(myMap);
    }
}

