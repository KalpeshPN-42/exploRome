const map = new maplibregl.Map({
    container: "map",
    style: "https://tiles.openfreemap.org/styles/liberty",
    center: coordinates,
    zoom: 8,
    attributionControl: false,
});

// 1. Define popup configuration and HTML content
const popup = new maplibregl.Popup({
    offset: 25, // Distance from the top of the marker
    closeOnClick: true, // Close popup when clicking elsewhere on the map
}).setHTML(`
    <div style="padding: 5px;">
        <h6 style="margin: 0 0 5px 0; font-weight: bold;">${listingLocation}</h6>
        <p style="margin: 0; font-size: 13px;">Exact location provided after booking</p>
    </div>
`);

new maplibregl.Marker({ color: "#a50591" }).setLngLat(coordinates).setPopup(popup).addTo(map);
