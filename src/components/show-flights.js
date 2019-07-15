import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


const Flight = props => (
    <tr>
        <td>{props.flight.departureDate}</td>
        <td>{props.flight.arrivalDate}</td>
        <td>{props.flight.seatsNumber}</td>
        <td>{props.flight.ticketPrice}</td>
        <td>
            <Link to={"/flight/delete/"+props.flight._id}>Delete</Link>
        </td>
        <td>
            <Link to={"/flight/"+props.flight._id+"/tourists/passengers"}>Passengers</Link>
        </td>

    </tr>
)

export default class ShowFlights extends Component {

    constructor(props) {
        super(props);
        this.state = {flights: []};

    }

    componentDidMount() {
        axios.get('http://localhost:5000/api/flight/readAll')
            .then(response => {
                this.setState({ flights: response.data });
            })
            .catch(function (error){
                console.log(error);
            })
    }

    flightsList() {
        return this.state.flights.map(function(currentFlight, i){
            return <Flight flight={currentFlight} key={i} />;
        })
    }


    render() {
        return (
            <div>
                <h3>Flights</h3>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                    <tr>
                        <th>Departure Date</th>
                        <th>Arrival Date</th>
                        <th>Number Of Seats</th>
                        <th>Price Of Ticket [$]</th>
                        <th>Delete</th>
                        <th>Passengers</th>

                    </tr>
                    </thead>
                    <tbody>
                    { this.flightsList() }
                    </tbody>
                </table>

            </div>
        )
    }
}
