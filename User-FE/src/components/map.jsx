import { useEffect, useRef } from "react";
import leaflet from "leaflet";
import useLocalStorage from "../hooks/useLocalStorage";
import useGeolocation from "../hooks/useGeolocation";

export default function Map() {
  const mapRef = useRef();
  const userMarkerRef = useRef();

  const [userPosition, setUserPosition] = useLocalStorage("USER_MARKER", {
    latitude: 0,
    longitude: 0,
  });

  const location = useGeolocation();

  // Define nearby parking locations (latitude, longitude pairs)
  const parkingLocations = [
    { latitude: 27.686319, longitude: 85.304462 }, // Example location 1
    { latitude: 27.687319, longitude: 85.305462 }, // Example location 2
    { latitude: 27.688319, longitude: 85.306462 }, // Example location 3
    { latitude: 27.689319, longitude: 85.307462 }, // Example location 4
  ];

  useEffect(() => {
    // Initialize map and set the view to the user's location
    mapRef.current = leaflet
      .map("map")
      .setView([userPosition.latitude, userPosition.longitude], 13);

    // Add OpenStreetMap tile layer
    leaflet
      .tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      })
      .addTo(mapRef.current);

    // Add nearby parking markers to the map
    parkingLocations.forEach(({ latitude, longitude }) => {
      const marker = leaflet
        .marker([latitude, longitude])
        .addTo(mapRef.current)
        .bindPopup(
          `Parking location: lat: ${latitude.toFixed(5)}, long: ${longitude.toFixed(5)}`
        );

      // Add click event listener to the marker inside the loop
      marker.on('click', () => {
        alert(`You clicked on the parking location at lat: ${latitude}, long: ${longitude}`);
      });
    });
  }, [userPosition.latitude, userPosition.longitude]);

  useEffect(() => {
    setUserPosition({ ...userPosition });

    if (userMarkerRef.current) {
      mapRef.current.removeLayer(userMarkerRef.current);
    }

    // Add user marker
    userMarkerRef.current = leaflet
      .marker([location.latitude, location.longitude])
      .addTo(mapRef.current)
      .bindPopup("User");

    const el = userMarkerRef.current.getElement();
    if (el) {
      el.style.filter = "hue-rotate(120deg)";
    }

    // Set map view to user's current location
    mapRef.current.setView([location.latitude, location.longitude]);
  }, [location, userPosition.latitude, userPosition.longitude]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col justify-center h-[500px] w-[500px] m-auto" id="map" ref={mapRef}></div>
    </div>
  );
}
