import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet'; // Import Leaflet library

function Map() {
  // Initialize state for user's location
  const [userLocation, setUserLocation] = React.useState(null);

  // Fetch the user's location when the component mounts
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation([latitude, longitude]);
      });
    }
  }, []);

  return (
    <div className="map-container">
      <MapContainer
        center={userLocation || [51.505, -0.09]} // Center on user location or fallback coordinates
        zoom={13} // Initial zoom level
        style={{ width: '100%', height: '500px' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {userLocation && (
          <UserLocationMarker userLocation={userLocation} />
        )}
      </MapContainer>
    </div>
  );
}

function UserLocationMarker({ userLocation }) {
  const map = useMap(); // Access the map instance

  useEffect(() => {
    // Center the map on the user's location
    map.setView(userLocation, 13);
  }, [map, userLocation]);

  // Create a custom marker icon with the provided URL
  const customIcon = new L.Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    iconSize: [25, 41], // Width and height of the icon
    iconAnchor: [12, 41], // Anchor point of the icon
    popupAnchor: [1, -34], // Popup anchor relative to the icon
  });

  return (
    <Marker position={userLocation} icon={customIcon}>
      <Popup>
        Your location.
      </Popup>
    </Marker>
  );
}

export default Map;
