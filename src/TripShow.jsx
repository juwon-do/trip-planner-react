import MyComponents from "./MyComponents";
import { useState } from "react";
import { BudgetShow } from "./BudgetShow";
import { DateTime } from "react-intl-datetime-format";
import axios from "axios";
export function TripShow (props) {
  const handleDeleteTrip = (event) => {
    axios.delete(`http://localhost:3000/trips/${event.target.id}.json`).then((response) => {
      console.log(response.data);
      refreshPage();
    });
  };
  const handleDeletePlace = (event) => {
    axios.delete(`http://localhost:3000/places/${event.target.id}.json`).then((response) => {
      console.log(response.data);
      refreshPage();
    });
  };
  function refreshPage() {
    window.location.reload(false);
  }

  return (
    <div key= {props.trip.id} className="collapse" id="collapseExample">
      {/* <div key= {props.trip.id} > */}
      <div className="card card-body">
        <br />
        <h3>Trip ID: {props.trip.id} <button id={props.trip.id} onClick={handleDeleteTrip} type="button" className="btn btn-outline-dark mr-1 btn-sm"> X</button></h3>
        <DateTime locale="en-US">{props.trip.start_time}</DateTime> ~ <DateTime locale="en-US">{props.trip.end_time}</DateTime>
        <img src={props.trip.image_url} max-width="200" height="200" />
        <MyComponents trips={props.trip}/>
        {props.trip.places.map((place) => (
          <div key={place.id}>
            <br />
            <br />
            <h3>Name: {place.name} <button id={place.id} onClick={handleDeletePlace} type="button" className="btn btn-outline-dark mr-1 btn-sm"> X</button></h3>
            <p>Address: {place.address}</p>
            <DateTime locale="en-US">{place.start_time}</DateTime> ~ <DateTime locale="en-US">{place.end_time}</DateTime>
            
            <img src={place.image_url} max-width="200" height="200" />
          </div>
        ))}
        <h5>Trip ID: {props.trip.id}</h5>
        <BudgetShow id ={props.trip.id}/>
      </div>
      
    </div>
  )
}