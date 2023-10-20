import React, { useState, useEffect, useRef } from 'react';
import { Wrapper } from "@googlemaps/react-wrapper";

function MultipleZipcodeMap({ zipcodes }) {
    const [map, setMap] = useState(null);
    const mapRef = useRef(null);
  
    const geocodeZipcode = (zipcode) => {
      const geocoder = new window.google.maps.Geocoder();
      return new Promise((resolve) => {
        geocoder.geocode({ address: zipcode }, (results, status) => {
          if (status === 'OK') {
            resolve({
              lat: results[0].geometry.location.lat(),
              lng: results[0].geometry.location.lng(),
            });
          } else {
            console.error(`Failed to geocode ${zipcode}`);
            resolve(null);
          }
        });
      });
    }
  
    useEffect(() => {
      if (zipcodes && zipcodes.length && !map) {
        const bounds = new window.google.maps.LatLngBounds();
        const promises = zipcodes.map(geocodeZipcode);
        
        Promise.all(promises).then(coordinatesArray => {
          const validCoordinates = coordinatesArray.filter(coord => coord !== null);
      
          if (validCoordinates.length === 0) {
            console.error("All addresses failed to geocode.");
            // Set a default view for Midtown Manhattan
            const defaultCoords = { lat: 40.7549, lng: -73.9840 };
            const createdMap = new window.google.maps.Map(mapRef.current);
            createdMap.setCenter(defaultCoords);
            createdMap.setZoom(10);
            setMap(createdMap);
            return;
          }

          const createdMap = new window.google.maps.Map(mapRef.current);
  
          validCoordinates.forEach(coords => {
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
  
          // Check if there's only one zipcode
          if (zipcodes.length === 1) {
            createdMap.setCenter(coordinatesArray[0]);
            createdMap.setZoom(12);
          } else {
              createdMap.fitBounds(bounds);
          }
  
          setMap(createdMap);
        });
      }
    }, [mapRef, map, zipcodes]);
  
    return (
      <div ref={mapRef} className="map" style={{ width: "52vw", height: "36vw" }}>
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

// return this in your component <MultipleZipcodeMapWrapper zipcodes={['NY 10013', 'NY 10003', 'NY 10012', 'NY 11201', 'NY 10023']} />