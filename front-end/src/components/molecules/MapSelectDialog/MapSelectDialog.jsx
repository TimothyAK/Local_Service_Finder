import React, { useRef, useState } from 'react';
import { Map, Marker } from '@vis.gl/react-maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import './MapSelectDialog.css';

const MapSelectDialog = ({ onCancel, onConfirm }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  const defaultCenter = { latitude: -6.17545, longitude: 106.82702 };

  const handleMapClick = (e) => {
    const { lng, lat } = e.lngLat;
    setSelectedLocation({ latitude: lat, longitude: lng });
  };

  return (
    <div className="confirmation-dialog">
      <div className="dialog-content map-dialog-content">
        <p>Select a location on the map</p>

        <div className="map-wrapper">
          <Map
            ref={mapRef}
            initialViewState={{
              longitude: defaultCenter.longitude,
              latitude: defaultCenter.latitude,
              zoom: 12,
            }}
            mapStyle="https://tiles.openfreemap.org/styles/liberty"
            style={{ width: '100%', height: '300px' }}
            onClick={handleMapClick}
            onLoad={({ target }) => {
              mapInstanceRef.current = target;
            }}
          >
            {selectedLocation && (
              <Marker
                longitude={selectedLocation.longitude}
                latitude={selectedLocation.latitude}
              >
                <div className="marker-selected" title="Selected Location" />
              </Marker>
            )}
          </Map>
        </div>

        <div className="dialog-buttons">
          <button className="cancel-btn" onClick={onCancel}>Cancel</button>
          <button
            className="confirm-btn"
            onClick={() => onConfirm(selectedLocation)}
            disabled={!selectedLocation}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default MapSelectDialog;
