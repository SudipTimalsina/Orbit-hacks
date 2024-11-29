import { useEffect, useRef, useState } from "react";
import leaflet from "leaflet";
import useLocalStorage from "../hooks/useLocalStorage";
import useGeolocation from "../hooks/useGeolocation";
import BookingForm from "./Booking";

export default function Map() {
  const mapRef = useRef();
  const userMarkerRef = useRef();

  const [userPosition, setUserPosition] = useLocalStorage("USER_MARKER", {
    latitude: 0,
    longitude: 0,
  });

  const location = useGeolocation();

  const [selectedLocation, setSelectedLocation] = useState(null);

  // Define nearby parking locations with names
  const parkingLocations = [
    {
      id: 1,
      name: "Milijuli Parking",
      latitude: 27.686319,
      longitude: 85.304462,
    },
    {
      id: 2,
      name: "City Center Garage",
      latitude: 27.687319,
      longitude: 85.305462,
    },
    {
      id: 3,
      name: "Bhatbatini Parking",
      latitude: 27.688319,
      longitude: 85.306462,
    },
    {
      id: 4,
      name: "Rajdhani Parking",
      latitude: 27.689319,
      longitude: 85.307462,
    },
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

    // Define a custom "P" icon for parking locations
    const parkingIcon = leaflet.divIcon({
      className: "custom-parking-icon",
      html: '<div class="flex items-center justify-center w-8 h-8 bg-blue-600 text-white text-lg font-bold rounded-full">P</div>',
      iconSize: [32, 32],
      iconAnchor: [16, 16],
    });

    // Add nearby parking markers to the map
    parkingLocations.forEach(({ id, name, latitude, longitude }) => {
      const marker = leaflet
        .marker([latitude, longitude], { icon: parkingIcon }) // Use the custom "P" icon
        .addTo(mapRef.current)
        .bindPopup(`Parking Name: ${name}`); // Display the name of the parking location

      // Add click event listener to the marker
      marker.on("click", () => {
        setSelectedLocation({ id, name, latitude, longitude });
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
      .bindPopup("Your Location");

    const el = userMarkerRef.current.getElement();
    if (el) {
      el.style.filter = "hue-rotate(120deg)";
    }

    // Set map view to user's current location
    mapRef.current.setView([location.latitude, location.longitude]);
  }, [location, userPosition.latitude, userPosition.longitude]);

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Map Section */}
      <div className="flex-1 relative">
        <div
          id="map"
          className="absolute inset-0"
          style={{ backgroundColor: "#e3f2fd" }}
        ></div>
        <div className="absolute bottom-4 left-4 bg-white/90 p-4 rounded-md shadow-lg text-sm text-blue-700 border border-blue-300">
          <p>
            Drag or click on the map to select a location. Selected location
            details will appear here.
          </p>
        </div>
      </div>

      {/* Booking Form Section */}
      <div className="w-full max-w-md p-6 bg-gradient-to-br from-blue-50 to-indigo-100 shadow-2xl rounded-lg border border-blue-200 lg:ml-6 lg:mr-6 mt-6 lg:mt-0">
        {/* Show the selected location details */}
        {selectedLocation ? (
          <div>
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-indigo-700 text-center">
                {selectedLocation.name}
              </h2>
            </div>
            <BookingForm selectedLocation={selectedLocation} />
          </div>
        ) : (
          <div className="text-center text-indigo-700">
            <p>Select a location on the map to see booking options.</p>
          </div>
        )}
      </div>
    </div>
  );
}
