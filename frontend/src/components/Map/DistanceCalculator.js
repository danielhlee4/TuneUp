import React, { useEffect, useState } from 'react';

function DistanceCalculator({ address1, address2 }) {
  const [distance, setDistance] = useState(null);

  const calculateDistance = async () => {
    const apiKey = process.env.REACT_APP_MAPS_API_KEY; 
    const endpoint = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${encodeURIComponent(address1)}&destinations=${encodeURIComponent(address2)}&key=${apiKey}`;
    
    try {
      const response = await fetch(endpoint);
      const data = await response.json();

      if (data.rows[0].elements[0].status === "OK") {
        const miles = data.rows[0].elements[0].distance.text;
        const roundedMiles = Math.round(parseFloat(miles) * 10) / 10;
        setDistance(`${roundedMiles} miles`);
      } else {
        setDistance("Unable to calculate distance.");
      }
    } catch (error) {
      setDistance("An error occurred. Please try again.");
    }
  };

  useEffect(() => {
    calculateDistance();
  }, [address1, address2]);

  return (
    <div>
      {distance ? <p>Distance: {distance}</p> : <p>Calculating...</p>}
    </div>
  );
}

export default DistanceCalculator;
