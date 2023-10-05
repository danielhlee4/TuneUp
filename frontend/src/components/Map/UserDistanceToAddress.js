import React, { useEffect, useState } from 'react';
import DistanceCalculator from './DistanceCalculator';

function UserDistanceToAddress({ targetAddress }) {
    const [userLocation, setUserLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                const { latitude, longitude } = position.coords;
                const addressFormat = `${latitude},${longitude}`;
                setUserLocation(addressFormat);
            }, error => {
                setErrorMsg("Unable to retrieve your location");
            });
        } else {
            setErrorMsg("Geolocation is not supported by this browser");
        }
    }, []);

    return (
        <div>
            {errorMsg ? <p>{errorMsg}</p> : null}
            {userLocation ? 
                <DistanceCalculator address1={userLocation} address2={targetAddress} />
                : <p>Fetching your location...</p>}
        </div>
    );
}

export default UserDistanceToAddress;

// return this in your component <UserDistanceToAddress targetAddress="848 Columbus Cir, New York, NY 10019" />