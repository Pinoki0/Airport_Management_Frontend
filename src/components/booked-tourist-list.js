import React, { Component } from 'react';
import axios from 'axios';



export default class BookedTouristList extends Component {

    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            firstName: '',
            lastName: '',
            flightsList: [],
            flight:Object
        };

    }

    componentDidMount() {
        axios.get('http://localhost:5000/api/tourist/read/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    flightsList: response.data.flightsList,
                    firstName: response.data.firstName,
                    lastName:response.data.lastName
                })
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    onSubmit(e) {
        e.preventDefault();

        const obj = {
            flight: this.state.flight,
        };
        console.log(obj);
        console.log(obj.flight._id);


        axios.all([
            axios.post('http://localhost:5000/api/tourist/deleteFlight/'+this.props.match.params.id,obj),
            axios.post('http://localhost:5000/api/flight/deleteTourist/'+obj.flight._id,this.props.match.params.id)
        ])
            .then(axios.spread((tRes, fRes) => {

            }));
        /*axios.post('http://localhost:5000/api/tourist/deleteFlight/'+this.props.match.params.id,obj)
            .then(res => console.log(res.data));
        */
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
            <h3>List of flights {this.state.firstName+" "+this.state.lastName}.</h3>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th>Departure Date</th>
                            <th>Arrival Date</th>
                            <th>Number Of Seats</th>
                            <th>Price Of Ticket [$]</th>
                            <th>Delete Flight</th>
                        </tr>
                    </thead>
                <tbody>
                {this.state.flightsList.map(el => (
                    <tr>
                        <td>{el.departureDate}</td>
                        <td>{el.arrivalDate}</td>
                        <td>{el.seatsNumber}</td>
                        <td>{el.ticketPrice}</td>
                        <button
                            onClick={this.copyFlight.bind(this, el)}
                            type="submit"
                        >Delete</button>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    </form>
        )
    }
}