import {Link} from 'react-router-dom';
import {LogoutLink} from './LogoutLink';
import { useState, useEffect } from 'react';
import axios from "axios";

export function Header() {
  const [currentUser, setCurrentUser] = useState({name: ""});
  
  const getUser = () =>{
    // what url should i go to to see the user info?
    axios.get("http://localhost:3000/users/current_user.json").then(response => {
      // console.log(response.data.user);
      if (response.data.user) {
        setCurrentUser(response.data.user);
      }
    });
  };

  useEffect(getUser, []);

  if (localStorage.jwt === undefined) {
    // logged out
    var authenticationLinks = (
      <div>
        <h4><a href="/">Home</a> | <Link to="/login">Login</Link>  | <Link to="/signup">Sign up</Link>  </h4>

      </div>
    );
  } else {
    // logged in
    authenticationLinks = (
      <div>
        <h5>< a href="/">Home</a>  | Welcome {currentUser.email} | <LogoutLink /></h5>
      </div>
    );
  }


  return (
    <header>
      {authenticationLinks}
    </header> 
  );
}

export default Header;