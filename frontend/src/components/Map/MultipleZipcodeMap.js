import React, { useState, useEffect, useRef } from 'react';
import ReactDOMServer from 'react-dom/server';
import { useSelector } from 'react-redux';
import { Wrapper } from "@googlemaps/react-wrapper";
import { getUsers } from '../../store/users';
import { getTuneUp } from '../../store/tuneUps';
import InstrumentIcon from '../../util/InstrumentIcon';
import { formatDateTime } from '../../util/dateUtils';

function MultipleZipcodeMap({ zipcodes }) {
    console.log(zipcodes)
    const [map, setMap] = useState(null);
    const mapRef = useRef(null);
    const users = useSelector(getUsers);
    const storeState = useSelector(state => state);
    const [tuneUps, setTuneUps] = useState({});

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
      setMap(null);
    }, [zipcodes]);

    useEffect(() => {
      let fetchedTuneUps = {};
      for (let tuneUpId of Object.keys(zipcodes)) {
        const currentTuneUp = getTuneUp(tuneUpId)(storeState);
        if (currentTuneUp) {
          fetchedTuneUps[tuneUpId] = currentTuneUp;
        }
      }
      setTuneUps(fetchedTuneUps);
    }, [zipcodes, storeState]);
    
    useEffect(() => {
      const zipArray = Object.values(zipcodes);
      if (zipArray && zipArray.length && !map) {
        const bounds = new window.google.maps.LatLngBounds();
        const promises = zipArray.map(geocodeZipcode);
        
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
          const infoWindow = new window.google.maps.InfoWindow();
  
          validCoordinates.forEach((coords, index) => {
            bounds.extend(coords);
  
            const circle = new window.google.maps.Circle({
              strokeColor: '#FF0000',
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: '#FF0000',
              fillOpacity: 0.35,
              map: createdMap,
              center: coords,
              radius: 800 // meters
            });

            const tuneUpId = Object.keys(zipcodes)[index];
            const currentTuneUp = tuneUps[tuneUpId];
            const hostUser = users[currentTuneUp?.host];
            const generateTooltipContent = (currentTuneUp, hostUser) => {
              const baseText = `${hostUser?.firstName}'s ${currentTuneUp?.genre} TuneUp`;
              const instrumentIcons = (currentTuneUp?.instruments || []).map(instrument => ReactDOMServer.renderToString(<InstrumentIcon instrument={instrument} tuneUp={currentTuneUp} />)).join(' ');
              return `${baseText} <br/> ${formatDateTime(currentTuneUp?.date)} <br/> ${instrumentIcons}`;
            };
  
            circle.addListener('mouseover', () => {
              infoWindow.setContent(generateTooltipContent(currentTuneUp, hostUser));
              infoWindow.setPosition(coords);
              infoWindow.open(createdMap);
            });
  
            circle.addListener('mouseout', () => {
              infoWindow.close();
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
    }, [mapRef, map, zipcodes, users, tuneUps]);
  
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