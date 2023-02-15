import { useEffect, useState } from "react";
import {  Routes, Route } from "react-router-dom";
import { Signup } from "./Signup";
import { Login } from "./Login";
import { TripsIndex } from "./TripsIndex";
import axios from "axios";
import { TripNew } from "./TripNew";
import { PlaceNew } from "./PlaceNew";
import { Modal } from "./Modal";

export function Content() {
  const [trips, setTrips] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [isTripNewVisible, setIsTripNewVisible] = useState(false);
  const [isPlaceNewVisible, setIsPlaceNewVisible] = useState(false);

  const handleHidePost = () => {
    setIsTripNewVisible(false);
    setIsPlaceNewVisible(false);
  };

  const handleTripNew = () => {
    setIsTripNewVisible(true);
  };
  const handlePlaceNew = () => {

    setIsPlaceNewVisible(true);
  };

  const handleTripsIndex = () => {
    axios.get("http://localhost:3000/trips").then((response) => {
      // console.log(response.data);
      setTrips(response.data);
    });
  };

  useEffect(handleTripsIndex, []);

  const handleCreateTrip = (params) => {
    // console.log(params, "Handle Create TRip");
    axios.post("http://localhost:3000/trips", params).then((response) => {
      // console.log(response.data);
      refreshPage();
    });
  };

  const handleCreatePlace = (params) => {
    axios.post("http://localhost:3000/places", params).then((response) => {
      // console.log(response.data);
      refreshPage();
    });
  };
 
  const handleShowIndexBudget = () => {
    axios.get("http://localhost:3000/budgets.json").then((response) => {
      // console.log(response.data);
      setBudgets(response.data);
    });
  };
  useEffect(handleShowIndexBudget, []);

  function refreshPage() {
    window.location.reload(false);
  }

  const renderSignIn = () => {
    if (localStorage.jwt === undefined) {
      return (
        <div className="container-div">
          <img src= "https://www.tripsavvy.com/thmb/pT_ZAje6cYUx8w2b4nsCk3FrxRU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/car-traveling-along-winding-road--maui--hawaii--america--usa-737142515-9d7096b173654472968075d805273c8f.jpg" align-items = "center"  width="900" max-height="600"/>
        </div>
      );
    } else {
      return (
        <div>
          <br />
          <button onClick={handleTripNew} type="button" className="btn btn-secondary mr-1">New Trip</button>
          <button onClick={handlePlaceNew} type="button" className="btn btn-secondary mr-1">New Place</button>
          <Modal show={isTripNewVisible} onClose={handleHidePost}>
            <TripNew onCreateTrip = {handleCreateTrip}/>
          </Modal>
          <Modal show={isPlaceNewVisible} onClose={handleHidePost}>
            <PlaceNew onCreatePlace = {handleCreatePlace}/>
          </Modal>

          <TripsIndex trips={trips}/>
        </div>
      );
    }
  }

  return (
    <div>
      <Routes>
        <Route
          index                                    
          element={<div></div>}
        />

        <Route path="/signup" element={<Signup /> } />
        <Route path="/login" element={<Login /> } />
      </Routes>
      <hr />
      <br />
      <h1><b>Welcome to Trip Planner</b></h1>
      {renderSignIn()}
    </div>
  );
}