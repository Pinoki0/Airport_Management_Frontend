import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import NumericInput from 'react-numeric-input';
import axios from 'axios'
export default class CreateFlight extends Component {

    constructor(props) {
        super(props);

        this.onChangeDepartureDate = this.onChangeDepartureDate.bind(this);
        this.onChangeArrivalDate = this.onChangeArrivalDate.bind(this);
        this.onChangeSeatNumber = this.onChangeSeatNumber.bind(this);
        this.onChangeTicketPrice= this.onChangeTicketPrice.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            departureDate: new Date(),
            arrivalDate: new Date(),
            seatsNumber: '',
            touristsList:[],
            ticketPrice: '',

        }
    }

    onChangeDepartureDate(e) {
        this.setState({
            departureDate: e
        });
    }

    onChangeArrivalDate(e) {
        this.setState({
            arrivalDate: e
        });
    }

    onChangeSeatNumber(e) {
        this.setState({
            seatsNumber: e
        });
    }
    onChangeTicketPrice(e) {
        this.setState({
            ticketPrice: e
        });
    }


    onSubmit(e) {
        e.preventDefault();

        console.log(`Form submitted:`);
        console.log(`Departure Date: ${this.state.departureDate}`);
        console.log(`Arrival Date: ${this.state.arrivalDate}`);
        console.log(`Number of seats: ${this.state.seatsNumber}`);
        console.log(`Tourists List: ${this.state.touristsList}`);
        console.log(`Ticket Price: ${this.state.ticketPrice}`);

        this.setState({
            departureDate: new Date(),
            arrivalDate: new Date(),
            seatsNumber: '',
            touristsList:[],
            ticketPrice: '',

        })
        const newFlight = {
            departureDate: this.state.departureDate,
            arrivalDate: this.state.arrivalDate,
            seatsNumber: this.state.seatsNumber,
            touristsList: this.state.touristsList,
            ticketPrice:this.state.ticketPrice
        };

        axios.post('http://localhost:5000/api/flight/create', newFlight)
            .then(res => console.log(res.data))
    }


    render() {
        return (
            <div style={{marginTop: 10}}>
                <h3>Create Flight</h3>
                <form onSubmit={this.onSubmit}>
                    <div>
                        <label>Departure Date: </label>
                    </div>
                    <div className="form-group">
                    <DatePicker
                        selected={this.state.departureDate}
                        onChange={this.onChangeDepartureDate}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        dateFormat="MMMM d, yyyy h:mm aa"
                        timeCaption="time"
                    />
                    </div>
                    <div>
                        <label>Arrival Date: </label>
                    </div>
                    <div className="form-group">
                        <DatePicker
                            selected={this.state.arrivalDate}
                            onChange={this.onChangeArrivalDate}
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={15}
                            dateFormat="MMMM d, yyyy h:mm aa"
                            timeCaption="time"
                        />
                    </div>
                    <div >
                        <label>Number Of Seats: </label>
                        <NumericInput className="form-control"
                                      value={this.state.seatsNumber}
                                      min={0}
                                      onChange={this.onChangeSeatNumber}/>
                    </div>
                    <div className="form-group">
                        <label>Price Of Ticket [$]: </label>
                        <NumericInput className="form-control"
                                      value={this.state.ticketPrice}
                                      min={0}
                                      onChange={this.onChangeTicketPrice}
                                        />
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Create Flight" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }

}