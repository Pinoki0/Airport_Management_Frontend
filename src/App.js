import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import Home from "./components/home";
import CreateFlight from "./components/create-flight";
import CreateTourist from "./components/create-tourist"
import ShowTourists from "./components/show-tourists";
import logo from "./documents/logo.png";
import ShowFlights from "./components/show-flights";
import taskDescription from "./documents/taskDescription.pdf";
import DeleteTourist from "./components/delete-tourist";
import BookedTouristList from "./components/booked-tourist-list";
import AvailableTouristList from "./components/available-tourist-list";
import DeleteFlight from "./components/delete-flight";
import AvailableFlightList from "./components/available-flight-list";
import PassengersFlightList from "./components/passengers-flight-list";
class App extends Component {
  render() {
    return (
        <Router>
          <div className="container">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <a className="navbar-brand" href={taskDescription} target="_blank">
                <img src={logo} width="30" height="30" alt="localhost:3000/static/media/taskDescription"/>
              </a>
              <Link to="/" className="navbar-brand">Airport Management</Link>
              <div className="collpase navbar-collapse">
                <ul className="navbar-nav mr-auto">
                  <li className="navbar-item">
                    <Link to="/flight/create" className="nav-link">Create Flight</Link>
                  </li>
                  <li className="navbar-item">
                    <Link to="/tourist/create" className="nav-link">Create Tourist</Link>
                  </li>
                  <li className="navbar-item">
                    <Link to="/tourist/readAll" className="nav-link">Show Tourists</Link>
                  </li>
                  <li className="navbar-item">
                    <Link to="/flight/readAll" className="nav-link">Show Flights</Link>
                  </li>
                </ul>
              </div>
            </nav>
            <br/>
            <Route path="/" exact component={Home} />
            <Route path="/flight/create" component={CreateFlight} />
            <Route path="/tourist/create" component={CreateTourist} />
            <Route path="/tourist/readAll" component={ShowTourists} />
            <Route path="/flight/readAll" component={ShowFlights} />
            <Route path="/tourist/delete/:id" component={DeleteTourist} />
            <Route path="/flight/delete/:id" component={DeleteFlight} />
            <Route path="/tourist/:id/flights/booked" component={BookedTouristList} />
            <Route path="/tourist/:id/flights" component={AvailableTouristList} />
            <Route path="/flight/:id/tourists/passengers" component={PassengersFlightList} />
            <Route path="/flight/:id/tourists" component={AvailableFlightList} />
          </div>
        </Router>
    );
  }
}

export default App;