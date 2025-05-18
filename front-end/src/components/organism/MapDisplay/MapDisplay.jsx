import React, { useEffect, useRef } from 'react';
import './MapDisplay.css';

const markerData = {
  'F&B': [
    { lat: 37.7749, lng: -122.4194, title: 'San Francisco - F&B Spot' },
  ],
  'Finance': [
    { lat: 40.7128, lng: -74.0060, title: 'Wall Street - Finance Center' },
  ],
  'Shopping': [
    { lat: 37.7842, lng: -122.4074, title: 'Union Square - Shopping' },
  ],
  'Healthcare': [
    { lat: 37.7694, lng: -122.4064, title: 'UCSF Medical Center' },
  ],
  'Entertainment': [
    { lat: 37.7694, lng: -122.4862, title: 'Golden Gate Park' },
  ],
};

const MapDisplay = ({ serviceType = 'F&B' }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    const loadMap = () => {
      const center = markerData[serviceType]?.[0] || { lat: 37.7749, lng: -122.4194 };
      const map = new window.google.maps.Map(mapRef.current, {
        zoom: 13,
        center,
      });

      const infoWindow = new window.google.maps.InfoWindow();

      markerData[serviceType]?.forEach((place) => {
        const marker = new window.google.maps.Marker({
          position: { lat: place.lat, lng: place.lng },
          map,
          title: place.title,
        });

        marker.addListener('click', () => {
          infoWindow.setContent(`<strong>${place.title}</strong>`);
          infoWindow.open(map, marker);
        });
      });
    };

    if (window.google && window.google.maps) {
      loadMap();
    } else {
      const script = document.createElement('script');
      script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAWOlucqp9MAMgDC7zY--oBFiUpxBJybAw';
      script.async = true;
      script.defer = true;
      script.onload = loadMap;
      document.body.appendChild(script);
    }
  }, [serviceType]);

  return <div className="map-container" ref={mapRef} />;
};

export default MapDisplay;
