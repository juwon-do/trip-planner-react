import MyComponents from "./MyComponents";
import { useState } from "react";
import { BudgetShow } from "./BudgetShow";
import { DateTime } from "react-intl-datetime-format";
import { TripShow } from "./TripShow";
import { Modal } from "./Modal";
export function TripsIndex(props) {
  const [isTripShowVisible, setIsTripShowVisible] = useState(false);

  const handleHidePost = () => {
    setIsTripShowVisible(false);

  };

  const handleTripShow = () => {
    setIsTripShowVisible(true);
  };

  return (
    <div>
      <br />
      <h2><b>All Trips</b></h2>
      
      {props.trips.map((trip) => (
        <div key={trip.id}>

          <br />
          <a className="btn btn-dark" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
            {trip.title}
          </a>
 
          <TripShow trip={trip} />
        </div>
        
      ))}
    </div>
  );
}