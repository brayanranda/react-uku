// import React, { useEffect, useRef, useState } from 'react';

// function Mapa() {
//   const mapRef = useRef(null);
//   const [map, setMap] = useState(null);
//   const [coordenadas, setCoordenadas] = useState({ lat: 0, lng: 0 });

//   useEffect(() => {
//     if (!map) {
//       const googleMapScript = document.createElement('script');
//       googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDPMXBBVsit4Wje5dwpgtIhbvQP9YmwcLg`;
//       window.document.body.appendChild(googleMapScript);
//       googleMapScript.addEventListener('load', () => {
//         const google = window.google;
//         const mapOptions = {
//           center: { lat: 0, lng: 0 },
//           zoom: 8,
//         };
//         const mapInstance = new google.maps.Map(mapRef.current, mapOptions);
//         setMap(mapInstance);
//       });
//     }
//   }, [map]);

//   useEffect(() => {
//     if (map) {
//       map.addListener('click', (event) => {
//         const { latLng } = event;
//         const lat = latLng.lat();
//         const lng = latLng.lng();
//         setCoordenadas({ lat, lng });
//       });
//     }
//   }, [map]);

//   return (
//     <div>
//       <div ref={mapRef} style={{ width: '500px', height: '400px' }}></div>
//       <p>Coordenadas seleccionadas: {coordenadas.lat}, {coordenadas.lng}</p>
//     </div>
//   );
// }

// export default Mapa;

import React, { useState } from 'react';
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';

const LocationMap = () => {
  const [location, setLocation] = useState(null);

  // Componente de evento personalizado para capturar la ubicación al hacer clic en el mapa
  const LocationMarker = () => {
    useMapEvents({
      click: (e) => {
        const { lat, lng } = e.latlng;
        setLocation([lat, lng]);
      },
    });

    return null;
  };

  return (
    <MapContainer center={[0, 0]} zoom={13} style={{ height: '400px', width: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <LocationMarker />
    </MapContainer>
  );
};

export default LocationMap;