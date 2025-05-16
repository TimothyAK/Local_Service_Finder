import React, { useEffect, useState } from 'react';
import Text from '../../atoms/Text/Text';

const MapDisplay = ({ location }) => {
  const [mapUrl, setMapUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (location) {
      loadMap(location);
    }
  }, [location]);

  const loadMap = async (location) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Replace with your actual map API call
      const response = await fetch(`https://maps.googleapis.com/maps/api/staticmap?center=${encodeURIComponent(location)}&zoom=14&size=800x400&maptype=roadmap&key=YOUR_API_KEY`);
      
      if (!response.ok) throw new Error('Map load failed');
      
      setMapUrl(response.url);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="map-display">
      {isLoading && <Text>Loading map...</Text>}
      {error && <Text color="error">{error}</Text>}
      {mapUrl && <img src={mapUrl} alt={`Map of ${location}`} />}
      {!location && <Text>Enter a location to view the map</Text>}
    </div>
  );
};

export default MapDisplay;