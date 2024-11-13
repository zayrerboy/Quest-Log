// Global map variable
let map;

// Function to initialize the map
function initMap() {
    // Set initial location for the map (You can change this to any location)
    const initialLocation = { lat: 37.7749, lng: -122.4194 }; // San Francisco

    // Create the map
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15, // Zoom level
        center: initialLocation, // Initial center point
        mapTypeId: 'terrain', // Show terrain features
        tilt: 45, // Enable 3D tilt effect (this is key for 3D view)
    });

    // Enable 3D buildings (part of the default map type)
    map.setOptions({
        styles: [{ featureType: 'all', elementType: 'geometry', stylers: [{ visibility: 'on' }] }],
        mapTypeId: google.maps.MapTypeId.ROADMAP, // For 3D buildings support
    });
}

// Fetch Strava activity data (Latitude and Longitude)
fetch('https://www.strava.com/api/v3/activities/12883629051', {
    method: 'GET',
    headers: {
        'Authorization': 'd1110f3647ceae2430fc24b9db0eb900aa04aa22', // Use your Strava access token
    }
})
.then(response => response.json())
.then(data => {
    console.log(data); // Log the data to inspect

    // Extract coordinates from Strava data
    const lat = data.location_latitude;
    const lon = data.location_longitude;

    // Create a marker for the Strava activity location
    const activityLocation = { lat, lng: lon };

    new google.maps.Marker({
        position: activityLocation,
        map: map,
        title: 'Strava Activity Location',
    });

    // Center the map at the activity location
    map.setCenter(activityLocation);
})
.catch(error => console.error('Error fetching activity:', error));
