import React, { useEffect, useState } from 'react';

function DistanceCalculator({ address1, address2 }) {
  const [distance, setDistance] = useState(null);

  const calculateDistance = async () => {
    const endpoint = `http://localhost:5001/api/distance/getDistance?address1=${encodeURIComponent(address1)}&address2=${encodeURIComponent(address2)}`;

    try {
      const response = await fetch(endpoint);
      const data = await response.json();

      if (data.rows[0].elements[0].status === "OK") {
        const miles = data.rows[0].elements[0].distance.text;
        const cleanedMiles = miles.replace(',', '');
        const roundedMiles = Math.round(parseFloat(cleanedMiles) * 10) / 10;
        setDistance(`${roundedMiles} mi`);
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
      {distance ? <p>{distance}</p> : <p>Calculating...</p>}
    </div>
  );
}

export default DistanceCalculator;

// <DistanceCalculator address1="90 5th Ave, New York, NY" address2="Columbus Cir, New York, NY" />