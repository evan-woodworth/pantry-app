import React from "react";
import { NavLink, Link } from "react-router-dom";
import SearchBar from "./SearchBar";

const Navbar = (props) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/"> ReciPantry </Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample07" aria-controls="#navbarsExample07" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse bg-dark" id="navbarsExample07">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">{" "}<NavLink className="nav-link" to="/about"> {" "}About{" "} </NavLink></li>
            <li className="nav-item">{" "}<NavLink className="nav-link" to="/shoppinglist"> {" "}Shopping List{" "} </NavLink></li>
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item"><SearchBar user={props.user}/></li>
          </ul>

          {props.isAuth ? (
            <ul className="navbar-nav ml-auto">
              <li className="nav-item"><NavLink className="nav-link" to="/pantry"> {" "}Pantry{" "} </NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to="/myrecipes"> {" "}My Recipes{" "} </NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to="/cooknow"> {" "}Cook Now{" "} </NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to="/profile"> {" "}Profile{" "} </NavLink></li>
              <li className="nav-item"><span onClick={props.handleLogout} className="nav-link logout-link"> {" "}Logout{" "} </span></li>
            </ul>
          ) : (
            <ul className="navbar-nav ml-auto">
              <li className="nav-item"><NavLink className="nav-link" to="/signup"> {" "}Create Account{" "} </NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to="/login"> {" "}Login{" "} </NavLink></li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
