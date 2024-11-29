import { useEffect, useRef, useState } from "react";
import leaflet from "leaflet";
import useLocalStorage from "../hooks/useLocalStorage";
import useGeolocation from "../hooks/useGeolocation";
import BookingForm from "./Booking";
import "leaflet-routing-machine"; // Import Leaflet Routing Machine

export default function Map() {
  const mapRef = useRef();
  const userMarkerRef = useRef();
  const routingControlRef = useRef(null); // To store the routing control instance

  const [userPosition, setUserPosition] = useLocalStorage("USER_MARKER", {
    latitude: 0,
    longitude: 0,
  });

  const location = useGeolocation(); // Get user's current location

  const [selectedLocation, setSelectedLocation] = useState(null);
  const [carouselIndex, setCarouselIndex] = useState(0);

  // Define nearby parking locations with names
  const parkingLocations = [
    {
      id: 1,
      name: "Milijuli Parking",
      latitude: 27.689497, 
      longitude: 85.303075,
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
      latitude: 27.688677, 
      longitude: 85.298928,
    },
    {
      id: 4,
      name: "Rajdhani Parking",
      latitude: 27.693590,
      longitude: 85.302131,
    },
  ];

  // Carousel Messages
  const carouselMessages = [
    {
      title: "DISCOVER AMAZING SPACES",
      description: "Find parking anywhere, for now or for later.",
    },
    {
      title: "RESERVE, PREPAY & SAVE",
      description: "Plan your trips better by securing your spot in advance.",
    },
    {
      title: "DRIVE, ARRIVE & PARK",
      description: "Seamlessly arrive and park with ease and confidence.",
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
        .marker([latitude, longitude], { icon: parkingIcon })
        .addTo(mapRef.current)
        .bindPopup(`Parking Name: ${name}`);

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

  // Effect to show route when a location is selected
  useEffect(() => {
    if (selectedLocation && location.latitude && location.longitude) {
      // Remove previous route if it exists
      if (routingControlRef.current) {
        mapRef.current.removeControl(routingControlRef.current);
      }

      // Create a new route from user's location to the selected parking spot
      routingControlRef.current = leaflet.Routing.control({
        waypoints: [
          leaflet.latLng(location.latitude, location.longitude), // User's current location
          leaflet.latLng(selectedLocation.latitude, selectedLocation.longitude), // Selected parking location
        ],
        routeWhileDragging: true, // Allow dragging the route
        show: true, // Show the route on the map
      }).addTo(mapRef.current);
    }
  }, [selectedLocation, location.latitude, location.longitude]);

  // Carousel autoplay effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIndex(
        (prevIndex) => (prevIndex + 1) % carouselMessages.length
      );
    }, 3000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

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
      <div className="w-full max-w-md p-6 bg-gradient-to-br from-blue-50 to-indigo-100 shadow-2xl rounded-lg border border-blue-200 mt-2 lg:mt-0">
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
          // Carousel Component
          <div className="flex flex-col items-center text-center m-28">
            <h2 className="text-4xl lg:text-6xl font-extrabold text-indigo-700 animate-glow mb-2">
              {carouselMessages[carouselIndex].title}
            </h2>
            <p className="text-sm text-gray-600">
              {carouselMessages[carouselIndex].description}
            </p>
            {/* Navigation Dots */}
            <div className="flex space-x-2 mt-4">
              {carouselMessages.map((_, index) => (
                <span
                  key={index}
                  className={`w-3 h-3 rounded-full ${
                    carouselIndex === index ? "bg-blue-600" : "bg-gray-400"
                  }`}
                ></span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
