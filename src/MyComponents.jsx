import React, { useState, useEffect, } from 'react';
import { GoogleMap, LoadScript, InfoWindowF } from '@react-google-maps/api';
import { MarkerF } from '@react-google-maps/api';
import axios from 'axios';


const containerStyle = {
  width: '100%',
  height: '400px'
};



function MyComponent(props) {
  const [trip, setTrip] = useState({places: []});
  
  const [tripId, setTripId] = useState([props.trips]);
  // console.log(trip.places);
  const centers = trip.places.map((place) => {
    return {
      lat: parseFloat(place.lat),
      lng: parseFloat(place.lng),
      id: place.id,
      name: place.name,
      address: place.address 
    };
  });
  // console.log(centers);

  const [activeMarker, setActiveMarker] = useState(null);

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  const handleLatLongShow = () => {
    axios
      .get(`http://localhost:3000/trips/${tripId[0].id}.json`)
      // .get("http://localhost:3000/trips/4.json")
      .then((response) => {
        setTrip(response.data);
        // setCoordinates(response.data);

      });
  };
  useEffect(handleLatLongShow, []);
  return (
    <div>

      <LoadScript
        googleMapsApiKey=""
      >
        <GoogleMap
          mapContainerStyle={containerStyle}

          center={centers[0]}
          // center={center}
          zoom={11}
        >
          
          {centers.map((center) =>
            <div key={center.id}>
              <MarkerF 
                key={center.id}
                position={center}
                onClick={() => handleActiveMarker(center.id)}
              >
                {activeMarker === center.id ? (
                  <InfoWindowF onCloseClick={() => setActiveMarker(null)}>
                    <div>
                      <>{center.name}</p>
                      <p>{center.address}</p>
                    </div>
                  </InfoWindowF>
                ) : null}
              </MarkerF>
            </div>
          )}
          


        </GoogleMap>
      </LoadScript>
    </div>

  )
}

export default React.memo(MyComponent);