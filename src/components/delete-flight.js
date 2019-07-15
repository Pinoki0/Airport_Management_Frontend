import React, { Component } from 'react';
import axios from 'axios';

export default class DeleteFlight extends Component {

    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            departureDate: new Date(),
            arrivalDate: new Date()

        }
    }
    componentDidMount() {
        axios.get('http://localhost:5000/api/flight/read/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    departureDate: response.data.departureDate,
                    arrivalDate: response.data.arrivalDate,

                })
            })
            .catch(function (error) {
                console.log(error);
            })
    }


    render() {
        return (

            <div style={{display: 'flex', justifyContent: 'center',alignItems:'center'}}>
                <form onSubmit={this.onSubmit}>
                    <p style={{ color: 'red' }}>
                        Do you want to remove a flight from
                        "{this.state.departureDate+" - "+this.state.arrivalDate}"? You will not be able to restore it.</p>
                    <div className="form-group" style={{display: 'flex', justifyContent: 'center'}}>
                        <input type="submit" value="Delete Flight" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }

    onSubmit(e) {
        e.preventDefault();
        const obj = {
            departureDate: this.state.departureDate,
            arrivalDate: this.state.arrivalDate

        };
        console.log(obj);
        axios.delete('http://localhost:5000/api/flight/delete/'+this.props.match.params.id, obj)
            .then(res => console.log(res.data));

        this.props.history.push('/');
    }





}
