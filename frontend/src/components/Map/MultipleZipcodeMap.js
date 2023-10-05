import React, { useState, useEffect, useRef } from 'react';
import { Wrapper } from "@googlemaps/react-wrapper";

function MultipleZipcodeMap({ zipcodes }) {
    const [map, setMap] = useState(null);
    const mapRef = useRef(null);
  
    const geocodeZipcode = (zipcode) => {
      const geocoder = new window.google.maps.Geocoder();
      return new Promise((resolve, reject) => {
        geocoder.geocode({ address: zipcode }, (results, status) => {
          if (status === 'OK') {
            resolve({
              lat: results[0].geometry.location.lat(),
              lng: results[0].geometry.location.lng(),
            });
          } else {
            reject(new Error('Failed to geocode zipcode'));
          }
        });
      });
    }
  
    useEffect(() => {
      if (zipcodes && zipcodes.length && !map) {
        const bounds = new window.google.maps.LatLngBounds();
        const promises = zipcodes.map(geocodeZipcode);
        
        Promise.all(promises).then(coordinatesArray => {
          const createdMap = new window.google.maps.Map(mapRef.current);
  
          coordinatesArray.forEach(coords => {
            bounds.extend(coords);
  
            new window.google.maps.Circle({
              strokeColor: '#FF0000',
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: '#FF0000',
              fillOpacity: 0.35,
              map: createdMap,
              center: coords,
              radius: 800 // meters
            });
          });
  
          createdMap.fitBounds(bounds);
  
          setMap(createdMap);
        });
      }
    }, [mapRef, map, zipcodes]);
  
    return (
      <div ref={mapRef} className="map" style={{ width: "700px", height: "600px" }}>
        Map
      </div>
    );
}
  
function MultipleZipcodeMapWrapper(props) {
    return (
      <Wrapper apiKey={process.env.REACT_APP_MAPS_API_KEY}>
        <MultipleZipcodeMap {...props} />
      </Wrapper>
    );
}
  
export default MultipleZipcodeMapWrapper;

// return this in your component <MultipleZipcodeMapWrapper zipcodes={['10013', '10003', '10012', '11201', '10023']} />