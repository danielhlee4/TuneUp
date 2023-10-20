import React, { useEffect, useRef, useState } from "react";
import { Wrapper } from "@googlemaps/react-wrapper";

function AddressMap({ address }) { 
  const [map, setMap] = useState(null);
  const mapRef = useRef(null);

  const geocodeAddress = (address) => {
    const geocoder = new window.google.maps.Geocoder();
    return new Promise((resolve) => {
      geocoder.geocode({ address }, (results, status) => {
        if (status === 'OK') {
          resolve({
            lat: results[0].geometry.location.lat(),
            lng: results[0].geometry.location.lng(),
          });
        } else {
          console.error('Failed to geocode address', address);
          resolve(null);
        }
      });
    });
  }

  useEffect(() => {
    if (address && !map) {
      geocodeAddress(address).then(coords => {
        let shouldAddMarker = true;
        if (!coords) {
          console.error('Address could not be geocoded:', address);
          coords = { lat: 40.7549, lng: -73.9840 };
          shouldAddMarker = false;
        }
        const createdMap = new window.google.maps.Map(mapRef.current, {
          center: coords,
          zoom: 13,
          clickableIcons: false,
        });

        // Create a marker at the geocoded address
        if (shouldAddMarker) {
          new window.google.maps.Marker({
            map: createdMap,
            position: coords,
          });
        }

        setMap(createdMap);
      });
    }
  }, [mapRef, map, address]);

  return (
    <div ref={mapRef} className="map" style={{ width: "220px", height: "100px" }}>
      Map
    </div>
  );
}

function AddressMapWrapper(props) {
  return (
    <Wrapper apiKey={process.env.REACT_APP_MAPS_API_KEY}>
      <AddressMap {...props} />
    </Wrapper>
  );
}

export default AddressMapWrapper;

// return this in your component <AddressMapWrapper address="255 W 84th St" />