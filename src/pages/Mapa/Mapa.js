import React from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import { Button } from 'reactstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";

const Mapa = ({ onSave, setLocation, location, setModalMapa }) => {

  const handleMapClick = (e) => {
    const { latlng } = e;
    setLocation(latlng);
  }

  const handleSaveLocation = () => {
    if (location) {
      onSave(location);
      setModalMapa(false)
    }
  }

  const LocationMarker = () => {
    useMapEvents({
      click: handleMapClick,
    });

    return location ? <Marker position={location} /> : null;
  }

  return (
    <div>
      <MapContainer center={[7.8939100, -72.5078200]} zoom={13} style={{ height: '600px', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <LocationMarker />
      </MapContainer>
      <Button color="warning" className='mt-4' onClick={handleSaveLocation}>
        <FontAwesomeIcon icon={faFloppyDisk} className="me-2" />Guardar ubicación
      </Button>
    </div>
  );
};

export default Mapa;