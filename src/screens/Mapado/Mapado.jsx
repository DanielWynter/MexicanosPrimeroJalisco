import React, { useRef, useState, useEffect } from "react";
import {
  LoadScript,
  GoogleMap,
  StandaloneSearchBox,
  Marker,
} from "@react-google-maps/api";
import "./style.css";

const containerStyle = {
  width: "100%",
  height: "calc(100vh - 150px)", // Todo el alto de la pantalla menos tu barra
};

const centerDefault = {
  lat: 20.6597,
  lng: -103.3496, // Centro default (Guadalajara) mientras carga ubicación real
};

export const Mapado = () => {
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
              radius: 5000, // Radio de 5km
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
      <div className="overlap-59">
        <div className="mexicanos-primero-wrapper">
          <div className="mexicanos-primero-2">
            Mexicanos Primero
            <br />
            Jalisco
          </div>
        </div>

        <div className="nav-menu-2">
          <div className="text-wrapper-86">Inicio</div>
          <div className="text-wrapper-87">Novedades</div>
          <div className="text-wrapper-88">Nosotros</div>
          <div className="text-wrapper-89">Contacto</div>
          <div className="group-14">
            <div className="text-wrapper-90">Legal</div>
          </div>
        </div>

        <div className="text-wrapper-91">Iniciar Sesión</div>
        <button className="button-11">
          <div className="text-wrapper-92">Regístrate</div>
        </button>

        <div className="overlap-60">
          <div className="rectangle-21" />
          <div className="ellipse-10" />
          <img
            className="image-13"
            alt="Logo Mexicanos Primero Jalisco"
            src="/img/image-13.png" // usa tu logo de public/img
          />
        </div>
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
                  boxSizing: `border-box`,
                  border: `1px solid transparent`,
                  width: `300px`,
                  height: `40px`,
                  padding: `0 12px`,
                  borderRadius: `20px`,
                  fontSize: `16px`,
                  outline: `none`,
                  position: "absolute",
                  top: "20px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  zIndex: "10",
                }}
              />
            </StandaloneSearchBox>

            {/* Marcadores de escuelas */}
            {schoolMarkers.map((position, index) => (
              <Marker key={index} position={position} />
            ))}

          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
};
