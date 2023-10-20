import React, { useEffect, useRef, useState } from "react";
import { Wrapper } from "@googlemaps/react-wrapper";

function ZipcodeMap({ zipcode }) {
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
          console.error('Failed to geocode zipcode');
          resolve(null);
        }
      });
    });
  }

  useEffect(() => {
    if (zipcode && !map) {
      geocodeZipcode(zipcode).then(coords => {
        if (!coords) {
          coords = { lat: 40.7549, lng: -73.9840 }; 
        }

        const createdMap = new window.google.maps.Map(mapRef.current, {
          center: coords,
          zoom: 13,
          clickableIcons: false,
        });

        // // Create a marker at the geocoded address
        // new window.google.maps.Marker({
        //   map: createdMap,
        //   position: coords,
        // });

        // Overlay circle
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

        setMap(createdMap);
      });
    }
  }, [mapRef, map, zipcode]);

  return (
    <div ref={mapRef} className="map" style={{ width: "220px", height: "125px" }}>
      Map
    </div>
  );
}

function ZipcodeMapWrapper(props) {
  return (
    <Wrapper apiKey={process.env.REACT_APP_MAPS_API_KEY}>
      <ZipcodeMap {...props} />
    </Wrapper>
  );
}

export default ZipcodeMapWrapper;

// return this in your component <ZipcodeMapWrapper zipcode="NY 10012" />