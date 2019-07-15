import React, { Component } from 'react';
import axios from 'axios';

export default class AvailableTouristList extends Component {

    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {flights: [],
            flight:Object

        };

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



    onSubmit(e) {
        e.preventDefault();

        const obj = {
            flight: this.state.flight,
        };
        console.log(obj);
        /*
        does not work, when searching we search for id, when adding, we need the whole object to add it to the database
        sollutions: find by id object on backend or send by frontend object
        axios.all([
            axios.post('http://localhost:5000/api/tourist/addFlight/'+this.props.match.params.id,obj),
            axios.post('http://localhost:5000/api/flight/addTourist/'+obj.flight._id,this.props.match.params.id)
        ])
            .then(axios.spread((googleRes, appleRes) => {
                // do something with both responses
            }));*/

        axios.post('http://localhost:5000/api/tourist/addFlight/'+this.props.match.params.id,obj)
            .then(res => console.log(res.data));

        this.setState ( {
            flight:Object
        })
        this.props.history.push('/tourist/readAll');
    }

    copyFlight = (el) => {
        let flight=el;
        this.setState({ flight: flight });

    }
    render() {

        return (
            <form onSubmit={this.onSubmit} className="FormFields" >
            <div>

                <h3>Available Flights</h3>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                    <tr>
                        <th>Departure Date</th>
                        <th>Arrival Date</th>
                        <th>Number Of Seats</th>
                        <th>Price Of Ticket [$]</th>
                        <th>Add Flight</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.flights.map(el => (
                        <tr>
                            <td>{el.departureDate}</td>
                            <td>{el.arrivalDate}</td>
                            <td>{el.seatsNumber}</td>
                            <td>{el.ticketPrice}</td>
                            <button
                                onClick={this.copyFlight.bind(this, el)}
                                type="submit"
                            >Add</button>
                        </tr>
                    ))}
                    </tbody>
                </table>

            </div>
            </form>


        )
    }
}
