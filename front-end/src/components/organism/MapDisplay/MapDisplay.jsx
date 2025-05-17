import React from 'react';
import './MapDisplay.css';

const mapUrls = {
  'F&B': 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.5747399447137!2d-122.41941568468132!3d37.77492977975998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085808c635e2d23%3A0x9e1a3de39e0b9c38!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1616188898888!5m2!1sen!2sus',
  'Finance': 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3023.719845898402!2d-74.00601538459356!3d40.712775979331224!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a316d763fad%3A0xf9b9f1a67e8b73bc!2sWall%20Street%2C%20New%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1616188999999!5m2!1sen!2sus',
  'Shopping': 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.847520700837!2d-122.40743748468227!3d37.784173779757245!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858085e1d09a31%3A0x3ef3f063f78d7f90!2sUnion%20Square%2C%20San%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1616189000000!5m2!1sen!2sus',
  'Healthcare': 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3152.123067123879!2d-122.4064176846821!3d37.76935677975947!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809a4f7d83e1%3A0xc5a3ecbd10f15330!2sUCSF%20Medical%20Center!5e0!3m2!1sen!2sus!4v1616189000001!5m2!1sen!2sus',
  'Entertainment': 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3152.123067123879!2d-122.4064176846821!3d37.76935677975947!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085808bb77d51af%3A0x4c3d3f4c38d6332b!2sGolden%20Gate%20Park!5e0!3m2!1sen!2sus!4v1616189000002!5m2!1sen!2sus',
};

const MapDisplay = ({ serviceType }) => {
  const mapUrl = mapUrls[serviceType] || mapUrls['F&B'];

  return (
    <div className="map-container">
      <iframe
        src={mapUrl}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={`Map for ${serviceType}`}
      ></iframe>
    </div>
  );
};

export default MapDisplay;