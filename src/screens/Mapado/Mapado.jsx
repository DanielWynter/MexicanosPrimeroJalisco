import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LoadScript,
  GoogleMap,
  StandaloneSearchBox,
  Marker,
} from "@react-google-maps/api";
import "./style.css";

const containerStyle = {
  width: "100%",
  height: "calc(100vh - 150px)", // Alto de pantalla menos barra
};

const centerDefault = {
  lat: 20.6597,
  lng: -103.3496, // Guadalajara
};

export const Mapado = () => {
  const navigate = useNavigate();
  const searchBoxRef = useRef(null);
  const mapRef = useRef(null);
  const [mapCenter, setMapCenter] = useState(centerDefault);
  const [schoolMarkers, setSchoolMarkers] = useState([]);

  const onLoadSearchBox = (ref) => {
    searchBoxRef.current = ref;
  };

  const onPlacesChanged = () => {
    const places = searchBoxRef.current.getPlaces();
    if (places.length > 0) {
      const location = places[0].geometry.location;
      setMapCenter({ lat: location.lat(), lng: location.lng() });
      mapRef.current.panTo({ lat: location.lat(), lng: location.lng() });
    }
  };

  const onLoadMap = (map) => {
    mapRef.current = map;
    findNearbySchools(map);
  };

  const findNearbySchools = (map) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setMapCenter(userLocation);
          map.panTo(userLocation);

          const service = new window.google.maps.places.PlacesService(map);

          service.nearbySearch(
            {
              location: userLocation,
              radius: 5000,
              type: ["school"],
            },
            (results, status) => {
              if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                const locations = results.map((place) => ({
                  lat: place.geometry.location.lat(),
                  lng: place.geometry.location.lng(),
                }));
                setSchoolMarkers(locations);
              }
            }
          );
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation not supported.");
    }
  };

  return (
    <div className="mapado">
      {/* Barra de navegación */}
      <div className="centered-menu">
  <div className="ellipse-4" />
  <img className="image-2" alt="Logo" src="/img/image-13.png" />

  <div className="logo">
    <div className="mexicanos-primero">
      Mexicanos Primero
      <br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Jalisco
    </div>
  </div>

  <div className="nav-menu">
    <div className="text-wrapper-4" onClick={() => navigate("/")}>Inicio</div>
    <div className="text-wrapper-5">Novedades</div>
    <div className="text-wrapper-6">Nosotros</div>
    <div className="text-wrapper-7" onClick={() => navigate("formulario-aliado-1")}>Contacto</div>
    <div className="group-4">
      <div className="text-wrapper-8">Legal</div>
    </div>
  </div>

  <div className="text-wrapper-9" onClick={() => navigate("formulario-escuela-1")}>Iniciar Sesión</div>

  <button className="button-2" onClick={() => navigate("register")}>
    <div className="text-wrapper-10">Regístrate</div>
  </button>
</div>


      {/* Mapa */}
      <div className="mapa">
        <LoadScript
          googleMapsApiKey="AIzaSyAGwAt8JqeIXC1aciulFN4h7omF3fK6cqU"
          libraries={["places"]}
        >
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={mapCenter}
            zoom={13}
            onLoad={onLoadMap}
          >
            {/* Buscador flotante */}
            <StandaloneSearchBox
              onLoad={onLoadSearchBox}
              onPlacesChanged={onPlacesChanged}
            >
              <input
                type="text"
                placeholder="Buscar lugar..."
                style={{
                  boxSizing: "border-box",
                  border: "1px solid transparent",
                  width: "300px",
                  height: "40px",
                  padding: "0 12px",
                  borderRadius: "20px",
                  fontSize: "16px",
                  outline: "none",
                  position: "absolute",
                  top: "20px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  zIndex: "10",
                }}
              />
            </StandaloneSearchBox>

            {schoolMarkers.map((position, index) => (
              <Marker key={index} position={position} />
            ))}
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
};
